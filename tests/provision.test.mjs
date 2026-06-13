import { test } from "node:test";
import assert from "node:assert/strict";
import { tmpdir } from "node:os";
import { mkdtemp, rm, readFile, readdir } from "node:fs/promises";
import path from "node:path";

import { provisionMissing, writeMapAtomic, toToml } from "../scripts/sync-nostalgic-bbs.mjs";

// no-wait sleep: provisionMissing routes pacing + backoff through sleepImpl, so
// injecting this keeps the whole flow synchronous with zero real waiting.
const noWaitSleep = async () => {};

// Build a fetchImpl that answers batchLookup from a fixed table and answers
// create per-url from a map of responses. Each response is a fetch-shaped
// object. `createResponder` receives the parsed request body so per-url
// behaviour (e.g. permanent failure on the 2nd url) can be expressed.
function makeFetch({ lookupData, createResponder }) {
  return async (url, opts) => {
    const action = new URL(url).searchParams.get("action");
    const body = JSON.parse(opts.body);
    if (action === "batchLookup") {
      return { ok: true, status: 200, json: async () => ({ success: true, data: lookupData(body.urls) }) };
    }
    if (action === "create") {
      return createResponder(body.url);
    }
    throw new Error(`unexpected action ${action}`);
  };
}

function okCreate(id) {
  return { ok: true, status: 200, json: async () => ({ success: true, id }) };
}

function badCreate(status) {
  return { ok: false, status, json: async () => ({ success: false, error: "nope" }) };
}

// A writeMap spy that snapshots the map at each call so we can inspect the
// progressive persistence (the atomic-write contract under test).
function makeWriteSpy() {
  const snapshots = [];
  return {
    snapshots,
    writeMap: async (m) => {
      snapshots.push({ ...m });
    },
  };
}

test("provisionMissing: existing + new resolves both and persists progressively", async () => {
  const missing = [
    { pagePath: "/posts/old/", url: "https://x/posts/old/" },
    { pagePath: "/posts/new/", url: "https://x/posts/new/" },
  ];
  const next = {};
  const { snapshots, writeMap } = makeWriteSpy();

  const fetchImpl = makeFetch({
    lookupData: (urls) =>
      urls.map((u) =>
        u.endsWith("/old/") ? { url: u, exists: true, id: "existing-id" } : { url: u, exists: false }
      ),
    createResponder: () => okCreate("created-id"),
  });

  const result = await provisionMissing(missing, next, {
    fetchImpl,
    sleepImpl: noWaitSleep,
    writeMap,
    lookupLimit: 10,
  });

  assert.equal(result["/posts/old/"], "existing-id");
  assert.equal(result["/posts/new/"], "created-id");
  // Persisted at least after the create and at chunk end.
  assert.ok(snapshots.length >= 2, "expected multiple persistence points");
  // The very last snapshot contains both ids.
  const last = snapshots[snapshots.length - 1];
  assert.equal(last["/posts/old/"], "existing-id");
  assert.equal(last["/posts/new/"], "created-id");
});

test("provisionMissing: progress is persisted before a later create fails (crash safety)", async () => {
  const missing = [
    { pagePath: "/posts/a/", url: "https://x/posts/a/" },
    { pagePath: "/posts/b/", url: "https://x/posts/b/" },
  ];
  const next = {};
  const { snapshots, writeMap } = makeWriteSpy();

  const fetchImpl = makeFetch({
    lookupData: (urls) => urls.map((u) => ({ url: u, exists: false })),
    createResponder: (url) => (url.endsWith("/a/") ? okCreate("id-a") : badCreate(400)),
  });

  await assert.rejects(
    () => provisionMissing(missing, next, { fetchImpl, sleepImpl: noWaitSleep, writeMap, lookupLimit: 10 }),
    /BBS create failed/
  );

  // The first create's id must already be in a persisted snapshot even though
  // the run aborted on the second create.
  assert.ok(
    snapshots.some((snap) => snap["/posts/a/"] === "id-a"),
    "first created id must be persisted before the failing create"
  );
});

test("provisionMissing: pre-seeded keys in next are retained in the result", async () => {
  const missing = [{ pagePath: "/posts/new/", url: "https://x/posts/new/" }];
  const next = { "/posts/seed/": "seed-id" };
  const { writeMap } = makeWriteSpy();

  const fetchImpl = makeFetch({
    lookupData: (urls) => urls.map((u) => ({ url: u, exists: false })),
    createResponder: () => okCreate("new-id"),
  });

  const result = await provisionMissing(missing, next, {
    fetchImpl,
    sleepImpl: noWaitSleep,
    writeMap,
    lookupLimit: 10,
  });

  assert.equal(result["/posts/seed/"], "seed-id");
  assert.equal(result["/posts/new/"], "new-id");
});

test("provisionMissing: empty missing still writes once (always-write-once)", async () => {
  const next = { "/posts/seed/": "seed-id" };
  const { snapshots, writeMap } = makeWriteSpy();

  // fetchImpl must never be called when missing is empty.
  const fetchImpl = async () => {
    throw new Error("fetch must not be called for empty missing");
  };

  const result = await provisionMissing([], next, { fetchImpl, sleepImpl: noWaitSleep, writeMap, lookupLimit: 10 });

  assert.equal(snapshots.length, 1);
  assert.deepEqual(snapshots[0], { "/posts/seed/": "seed-id" });
  assert.equal(result["/posts/seed/"], "seed-id");
});

test("provisionMissing: lookup result order mismatch throws", async () => {
  const missing = [
    { pagePath: "/posts/a/", url: "https://x/posts/a/" },
    { pagePath: "/posts/b/", url: "https://x/posts/b/" },
  ];
  const { writeMap } = makeWriteSpy();

  const fetchImpl = makeFetch({
    // Return results in reversed order so result[0].url != item[0].url.
    lookupData: (urls) => [...urls].reverse().map((u) => ({ url: u, exists: false })),
    createResponder: () => okCreate("id"),
  });

  await assert.rejects(
    () => provisionMissing(missing, {}, { fetchImpl, sleepImpl: noWaitSleep, writeMap, lookupLimit: 10 }),
    /unexpected result order/
  );
});

test("provisionMissing: existing BBS not owned (authorized:false) throws", async () => {
  const missing = [{ pagePath: "/posts/a/", url: "https://x/posts/a/" }];
  const { writeMap } = makeWriteSpy();

  const fetchImpl = makeFetch({
    lookupData: (urls) => urls.map((u) => ({ url: u, exists: true, authorized: false, id: "x" })),
    createResponder: () => okCreate("id"),
  });

  await assert.rejects(
    () => provisionMissing(missing, {}, { fetchImpl, sleepImpl: noWaitSleep, writeMap, lookupLimit: 10 }),
    /not its owner token/
  );
});

test("provisionMissing: existing BBS without id throws", async () => {
  const missing = [{ pagePath: "/posts/a/", url: "https://x/posts/a/" }];
  const { writeMap } = makeWriteSpy();

  const fetchImpl = makeFetch({
    lookupData: (urls) => urls.map((u) => ({ url: u, exists: true })),
    createResponder: () => okCreate("id"),
  });

  await assert.rejects(
    () => provisionMissing(missing, {}, { fetchImpl, sleepImpl: noWaitSleep, writeMap, lookupLimit: 10 }),
    /without an id/
  );
});

// --- writeMapAtomic (minimal real I/O) ----------------------------------------

test("writeMapAtomic: writes toToml output and leaves no .tmp behind", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "avel-bbs-"));
  try {
    const target = path.join(dir, "nested", "nostalgic_bbs.toml");
    const map = { "/posts/a/": "id1", "/posts/b/": "id2" };

    await writeMapAtomic(map, target);

    const written = await readFile(target, "utf8");
    assert.equal(written, toToml(map));

    const entries = await readdir(path.dirname(target));
    assert.ok(!entries.some((e) => e.endsWith(".tmp")), "no temp file should remain after rename");
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
