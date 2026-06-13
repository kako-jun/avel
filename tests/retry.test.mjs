import { test } from "node:test";
import assert from "node:assert/strict";

import {
  withRetry,
  backoffMs,
  isRetryableStatus,
  createBbs,
  batchLookupBbs,
  postJson,
  clampLookupLimit,
  clampCreateDelay,
  clampRetryBase,
  clampMaxRetries,
} from "../scripts/sync-nostalgic-bbs.mjs";

// A fake sleep that never actually waits; it just records the durations it was
// asked to wait so the backoff schedule can be asserted.
function makeSleepSpy() {
  const calls = [];
  return {
    calls,
    sleep: async (ms) => {
      calls.push(ms);
    },
  };
}

function retryableError(message = "temporary") {
  const e = new Error(message);
  e.retryable = true;
  return e;
}

// A fetchImpl mimicking the Web fetch contract used by postJson.
function fakeFetch({ ok = true, status = 200, body = {}, jsonThrows = false, fetchThrows = false } = {}) {
  return async () => {
    if (fetchThrows) throw new Error("network down");
    return {
      ok,
      status,
      json: async () => {
        if (jsonThrows) throw new Error("bad json");
        return body;
      },
    };
  };
}

// --- withRetry ----------------------------------------------------------------

test("withRetry: resolves on first try without sleeping", async () => {
  const { calls, sleep } = makeSleepSpy();
  let fnCalls = 0;
  const result = await withRetry(
    async () => {
      fnCalls += 1;
      return "value";
    },
    { label: "x", sleepImpl: sleep }
  );
  assert.equal(result, "value");
  assert.equal(fnCalls, 1);
  assert.equal(calls.length, 0);
});

test("withRetry: retryable error then success retries exactly once", async () => {
  const { calls, sleep } = makeSleepSpy();
  let fnCalls = 0;
  const result = await withRetry(
    async () => {
      fnCalls += 1;
      if (fnCalls === 1) throw retryableError();
      return "ok";
    },
    { label: "x", baseMs: 2000, sleepImpl: sleep }
  );
  assert.equal(result, "ok");
  assert.equal(fnCalls, 2);
  assert.deepEqual(calls, [backoffMs(0, 2000)]);
});

test("withRetry: non-retryable error throws immediately without retry", async () => {
  const { calls, sleep } = makeSleepSpy();
  let fnCalls = 0;
  await assert.rejects(
    () =>
      withRetry(
        async () => {
          fnCalls += 1;
          throw new Error("fatal");
        },
        { label: "x", sleepImpl: sleep }
      ),
    /fatal/
  );
  assert.equal(fnCalls, 1);
  assert.equal(calls.length, 0);
});

test("withRetry: exhausts maxRetries=2 with linear ascending backoff schedule", async () => {
  const { calls, sleep } = makeSleepSpy();
  let fnCalls = 0;
  const err = retryableError("still failing");
  await assert.rejects(
    () =>
      withRetry(
        async () => {
          fnCalls += 1;
          throw err;
        },
        { label: "x", maxRetries: 2, baseMs: 1000, sleepImpl: sleep }
      ),
    (e) => e === err
  );
  assert.equal(fnCalls, 3);
  // [baseMs*1, baseMs*2] — linear, ascending. Catches a *attempt mistake.
  assert.deepEqual(calls, [1000, 2000]);
});

test("withRetry: maxRetries=0 throws on first retryable error (boundary)", async () => {
  const { calls, sleep } = makeSleepSpy();
  let fnCalls = 0;
  await assert.rejects(
    () =>
      withRetry(
        async () => {
          fnCalls += 1;
          throw retryableError();
        },
        { label: "x", maxRetries: 0, sleepImpl: sleep }
      ),
    /temporary/
  );
  assert.equal(fnCalls, 1);
  assert.equal(calls.length, 0);
});

test("withRetry: backoff is driven by injected baseMs alone (independent of createDelay)", async () => {
  const { calls, sleep } = makeSleepSpy();
  let fnCalls = 0;
  await assert.rejects(
    () =>
      withRetry(
        async () => {
          fnCalls += 1;
          throw retryableError();
        },
        { label: "x", maxRetries: 2, baseMs: 100, sleepImpl: sleep }
      ),
    () => true
  );
  assert.deepEqual(calls, [100, 200]);
});

// --- backoffMs ----------------------------------------------------------------

test("backoffMs: base*(attempt+1) at attempt 0", () => {
  assert.equal(backoffMs(0, 2000), 2000);
});

test("backoffMs: base*(attempt+1) at attempt 1", () => {
  assert.equal(backoffMs(1, 2000), 4000);
});

test("backoffMs: base*(attempt+1) at attempt 4", () => {
  assert.equal(backoffMs(4, 2000), 10000);
});

test("backoffMs: uses attempt+1 not attempt (base 1, attempt 3 => 4)", () => {
  assert.equal(backoffMs(3, 1), 4);
});

// --- isRetryableStatus --------------------------------------------------------

test("isRetryableStatus: 429 is retryable", () => assert.equal(isRetryableStatus(429), true));
test("isRetryableStatus: 503 is retryable", () => assert.equal(isRetryableStatus(503), true));
test("isRetryableStatus: 200 is not retryable", () => assert.equal(isRetryableStatus(200), false));
test("isRetryableStatus: 400 is not retryable", () => assert.equal(isRetryableStatus(400), false));
test("isRetryableStatus: 404 is not retryable", () => assert.equal(isRetryableStatus(404), false));
test("isRetryableStatus: 500 is not retryable", () => assert.equal(isRetryableStatus(500), false));
test("isRetryableStatus: 502 is not retryable", () => assert.equal(isRetryableStatus(502), false));
test("isRetryableStatus: 0 is not retryable", () => assert.equal(isRetryableStatus(0), false));

// --- createBbs ----------------------------------------------------------------

test("createBbs: 200 with success+id returns the id", async () => {
  const id = await createBbs("https://x/a/", {
    fetchImpl: fakeFetch({ status: 200, body: { success: true, id: "abc" } }),
  });
  assert.equal(id, "abc");
});

test("createBbs: 429 throws retryable error", async () => {
  await assert.rejects(
    () => createBbs("https://x/a/", { fetchImpl: fakeFetch({ ok: false, status: 429, body: {} }) }),
    (e) => e.retryable === true
  );
});

test("createBbs: 503 throws retryable error", async () => {
  await assert.rejects(
    () => createBbs("https://x/a/", { fetchImpl: fakeFetch({ ok: false, status: 503, body: {} }) }),
    (e) => e.retryable === true
  );
});

test("createBbs: network failure throws retryable error", async () => {
  await assert.rejects(
    () => createBbs("https://x/a/", { fetchImpl: fakeFetch({ fetchThrows: true }) }),
    (e) => e.retryable === true
  );
});

test("createBbs: 200 with success:false throws non-retryable", async () => {
  await assert.rejects(
    () => createBbs("https://x/a/", { fetchImpl: fakeFetch({ status: 200, body: { success: false } }) }),
    (e) => e instanceof Error && e.retryable === undefined
  );
});

test("createBbs: 200 with success but no id throws", async () => {
  await assert.rejects(
    () => createBbs("https://x/a/", { fetchImpl: fakeFetch({ status: 200, body: { success: true } }) }),
    (e) => e instanceof Error && e.retryable === undefined
  );
});

test("createBbs: 400 throws non-retryable", async () => {
  await assert.rejects(
    () => createBbs("https://x/a/", { fetchImpl: fakeFetch({ ok: false, status: 400, body: {} }) }),
    (e) => e instanceof Error && e.retryable === undefined
  );
});

test("createBbs: 429 with success+id returns the id (no retry — prevents duplicate create)", async () => {
  // A gateway can stamp 429 onto a response that already created the BBS. The
  // usable result must win over the retryable status, or a retry would create a
  // second, duplicate BBS for the same URL.
  const id = await createBbs("https://x/a/", {
    fetchImpl: fakeFetch({ ok: false, status: 429, body: { success: true, id: "x" } }),
  });
  assert.equal(id, "x");
});

test("createBbs: 503 with success+id returns the id (no retry — prevents duplicate create)", async () => {
  const id = await createBbs("https://x/a/", {
    fetchImpl: fakeFetch({ ok: false, status: 503, body: { success: true, id: "y" } }),
  });
  assert.equal(id, "y");
});

// --- batchLookupBbs -----------------------------------------------------------

test("batchLookupBbs: 200 with success+data array returns data", async () => {
  const data = [{ url: "https://x/a/", exists: false }];
  const out = await batchLookupBbs([{ url: "https://x/a/" }], {
    fetchImpl: fakeFetch({ status: 200, body: { success: true, data } }),
  });
  assert.deepEqual(out, data);
});

test("batchLookupBbs: 429 throws retryable error", async () => {
  await assert.rejects(
    () => batchLookupBbs([{ url: "https://x/a/" }], { fetchImpl: fakeFetch({ ok: false, status: 429, body: {} }) }),
    (e) => e.retryable === true
  );
});

test("batchLookupBbs: 503 throws retryable error", async () => {
  await assert.rejects(
    () => batchLookupBbs([{ url: "https://x/a/" }], { fetchImpl: fakeFetch({ ok: false, status: 503, body: {} }) }),
    (e) => e.retryable === true
  );
});

test("batchLookupBbs: network failure throws retryable error", async () => {
  await assert.rejects(
    () => batchLookupBbs([{ url: "https://x/a/" }], { fetchImpl: fakeFetch({ fetchThrows: true }) }),
    (e) => e.retryable === true
  );
});

test("batchLookupBbs: non-array data throws non-retryable", async () => {
  await assert.rejects(
    () =>
      batchLookupBbs([{ url: "https://x/a/" }], {
        fetchImpl: fakeFetch({ status: 200, body: { success: true, data: "x" } }),
      }),
    (e) => e instanceof Error && e.retryable === undefined
  );
});

test("batchLookupBbs: success:false throws non-retryable", async () => {
  await assert.rejects(
    () =>
      batchLookupBbs([{ url: "https://x/a/" }], { fetchImpl: fakeFetch({ status: 200, body: { success: false } }) }),
    (e) => e instanceof Error && e.retryable === undefined
  );
});

test("batchLookupBbs: 429 with success+data array returns data (no retry — consistent with createBbs)", async () => {
  const data = [{ url: "https://x/a/", exists: false }];
  const out = await batchLookupBbs([{ url: "https://x/a/" }], {
    fetchImpl: fakeFetch({ ok: false, status: 429, body: { success: true, data } }),
  });
  assert.deepEqual(out, data);
});

// --- postJson (network exception handling) ------------------------------------

test("postJson: fetch throwing yields networkError sentinel", async () => {
  const res = await postJson("create", {}, { fetchImpl: fakeFetch({ fetchThrows: true }) });
  assert.deepEqual(res, { ok: false, status: 0, networkError: true, json: {} });
});

test("postJson: response.json() rejecting falls back to empty json", async () => {
  const res = await postJson("create", {}, { fetchImpl: fakeFetch({ status: 200, jsonThrows: true }) });
  assert.equal(res.ok, true);
  assert.equal(res.status, 200);
  assert.equal(res.networkError, false);
  assert.deepEqual(res.json, {});
});

test("postJson: success path returns parsed json with status", async () => {
  const res = await postJson("create", {}, { fetchImpl: fakeFetch({ status: 200, body: { success: true, id: "z" } }) });
  assert.deepEqual(res, { ok: true, status: 200, networkError: false, json: { success: true, id: "z" } });
});

// --- clamp helpers ------------------------------------------------------------

test("clampLookupLimit: 0 falls back to 50", () => assert.equal(clampLookupLimit(0), 50));
test("clampLookupLimit: 1 is accepted (boundary)", () => assert.equal(clampLookupLimit(1), 1));
test("clampLookupLimit: finite 1.5 is accepted", () => assert.equal(clampLookupLimit(1.5), 1.5));
test("clampLookupLimit: NaN falls back to 50", () => assert.equal(clampLookupLimit(NaN), 50));
test("clampLookupLimit: -5 falls back to 50", () => assert.equal(clampLookupLimit(-5), 50));

test("clampCreateDelay: 0 is valid (boundary, pacing disabled)", () => assert.equal(clampCreateDelay(0), 0));
test("clampCreateDelay: -1 falls back to 1200", () => assert.equal(clampCreateDelay(-1), 1200));
test("clampCreateDelay: NaN falls back to 1200", () => assert.equal(clampCreateDelay(NaN), 1200));
test("clampCreateDelay: 500 is accepted", () => assert.equal(clampCreateDelay(500), 500));

test("clampRetryBase: NaN falls back to 2000", () => assert.equal(clampRetryBase(NaN), 2000));
test("clampRetryBase: 0 is floored to 500", () => assert.equal(clampRetryBase(0), 500));
test("clampRetryBase: 100 is floored to 500", () => assert.equal(clampRetryBase(100), 500));
test("clampRetryBase: 800 is accepted above floor", () => assert.equal(clampRetryBase(800), 800));
test('clampRetryBase: "" -> Number("") is 0 floored to 500', () => assert.equal(clampRetryBase(Number("")), 500));

test("clampMaxRetries: 0 falls back to 5", () => assert.equal(clampMaxRetries(0), 5));
test("clampMaxRetries: 1 is accepted (boundary)", () => assert.equal(clampMaxRetries(1), 1));
test("clampMaxRetries: NaN falls back to 5", () => assert.equal(clampMaxRetries(NaN), 5));
test("clampMaxRetries: finite 2.5 is accepted", () => assert.equal(clampMaxRetries(2.5), 2.5));
