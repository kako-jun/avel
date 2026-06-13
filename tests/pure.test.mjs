import { test } from "node:test";
import assert from "node:assert/strict";

import {
  normalizePath,
  parseScalar,
  parseBool,
  extractFrontmatter,
  readLanguageCodes,
  splitLanguageSuffix,
  pagePathForFile,
  readBaseUrl,
  parseExistingMap,
  toToml,
} from "../scripts/sync-nostalgic-bbs.mjs";

// --- normalizePath: wraps in slashes, collapses surrounding ones, trims -------

test("normalizePath: bare path gains leading and trailing slash", () => {
  assert.equal(normalizePath("foo/bar"), "/foo/bar/");
});

test("normalizePath: already-slashed path is idempotent", () => {
  assert.equal(normalizePath("/foo/bar/"), "/foo/bar/");
});

test("normalizePath: collapses repeated leading/trailing slashes", () => {
  assert.equal(normalizePath("///foo///"), "/foo/");
});

test("normalizePath: trims surrounding whitespace", () => {
  assert.equal(normalizePath("  foo  "), "/foo/");
});

// --- parseScalar: strips quotes, anchors per line -----------------------------

test('parseScalar: strips double quotes from value', () => {
  assert.equal(parseScalar('title = "Hello"', "title"), "Hello");
});

test("parseScalar: strips single quotes from value", () => {
  assert.equal(parseScalar("title = 'Hello'", "title"), "Hello");
});

test("parseScalar: returns bare unquoted value", () => {
  assert.equal(parseScalar("slug = my-post", "slug"), "my-post");
});

test("parseScalar: missing key yields empty string", () => {
  assert.equal(parseScalar("title = \"Hello\"", "slug"), "");
});

test("parseScalar: line anchor prevents partial-key mismatch", () => {
  // "subtitle" must not satisfy a query for "title".
  assert.equal(parseScalar('subtitle = "Sub"', "title"), "");
});

// --- parseBool: only literal true, anchored -----------------------------------

test("parseBool: true literal is true", () => {
  assert.equal(parseBool("draft = true", "draft"), true);
});

test("parseBool: false literal is false", () => {
  assert.equal(parseBool("draft = false", "draft"), false);
});

test("parseBool: missing key is false", () => {
  assert.equal(parseBool("title = \"x\"", "draft"), false);
});

test("parseBool: uppercase TRUE is not matched", () => {
  assert.equal(parseBool("draft = TRUE", "draft"), false);
});

test("parseBool: partial-key does not falsely match", () => {
  // "undraft = true" must not satisfy "draft".
  assert.equal(parseBool("undraft = true", "draft"), false);
});

// --- extractFrontmatter: +++ delimited block ----------------------------------

test("extractFrontmatter: extracts content between +++ fences", () => {
  const src = "+++\ntitle = \"x\"\nslug = \"y\"\n+++\nbody";
  assert.equal(extractFrontmatter(src), 'title = "x"\nslug = "y"');
});

test("extractFrontmatter: source not starting with +++ yields empty", () => {
  assert.equal(extractFrontmatter("title = \"x\"\n+++\n"), "");
});

test("extractFrontmatter: unterminated frontmatter yields empty", () => {
  assert.equal(extractFrontmatter("+++\ntitle = \"x\"\nno closing fence"), "");
});

// --- readLanguageCodes --------------------------------------------------------

test("readLanguageCodes: collects all [languages.X] codes", () => {
  const toml = "[languages.en]\nfoo = 1\n[languages.ja]\nbar = 2";
  assert.deepEqual(readLanguageCodes(toml), new Set(["en", "ja"]));
});

test("readLanguageCodes: no language tables yields empty set", () => {
  assert.deepEqual(readLanguageCodes("base_url = \"x\""), new Set());
});

test("readLanguageCodes: allows hyphen in code", () => {
  assert.deepEqual(readLanguageCodes("[languages.zh-Hans]"), new Set(["zh-Hans"]));
});

test("readLanguageCodes: subkey table does not add a separate code", () => {
  // [languages.en.translations] must still register only "en".
  const toml = "[languages.en]\n[languages.en.translations]\nfoo = \"bar\"";
  assert.deepEqual(readLanguageCodes(toml), new Set(["en"]));
});

// --- splitLanguageSuffix ------------------------------------------------------

const LANGS = new Set(["en", "ja"]);

test("splitLanguageSuffix: separates registered language suffix", () => {
  assert.deepEqual(splitLanguageSuffix("posts/hello.en", LANGS), { rel: "posts/hello", lang: "en" });
});

test("splitLanguageSuffix: no dot leaves rel untouched", () => {
  assert.deepEqual(splitLanguageSuffix("posts/hello", LANGS), { rel: "posts/hello", lang: "" });
});

test("splitLanguageSuffix: unregistered suffix is not split off", () => {
  assert.deepEqual(splitLanguageSuffix("posts/hello.de", LANGS), { rel: "posts/hello.de", lang: "" });
});

test("splitLanguageSuffix: dots in directory names are ignored", () => {
  // Only the basename's suffix is considered.
  assert.deepEqual(splitLanguageSuffix("v1.0/hello", LANGS), { rel: "v1.0/hello", lang: "" });
});

// --- pagePathForFile ----------------------------------------------------------

test("pagePathForFile: explicit path takes precedence", () => {
  const fm = 'path = "custom/page"';
  assert.equal(pagePathForFile("content/posts/hello.md", fm, LANGS), "/custom/page/");
});

test("pagePathForFile: bare relative path when no slug or lang", () => {
  assert.equal(pagePathForFile("content/posts/hello.md", "", LANGS), "/posts/hello/");
});

test("pagePathForFile: slug replaces the final segment", () => {
  const fm = 'slug = "world"';
  assert.equal(pagePathForFile("content/posts/hello.md", fm, LANGS), "/posts/world/");
});

test("pagePathForFile: language suffix becomes a path prefix", () => {
  assert.equal(pagePathForFile("content/posts/hello.en.md", "", LANGS), "/en/posts/hello/");
});

test("pagePathForFile: language prefix combined with slug", () => {
  const fm = 'slug = "world"';
  assert.equal(pagePathForFile("content/posts/hello.en.md", fm, LANGS), "/en/posts/world/");
});

test("pagePathForFile: empty slug falls back to bare rel", () => {
  const fm = 'slug = ""';
  assert.equal(pagePathForFile("content/posts/hello.md", fm, LANGS), "/posts/hello/");
});

test("pagePathForFile: empty explicit path falls back to bare rel", () => {
  const fm = 'path = ""';
  assert.equal(pagePathForFile("content/posts/hello.md", fm, LANGS), "/posts/hello/");
});

test("pagePathForFile: nested directories are preserved", () => {
  assert.equal(pagePathForFile("content/posts/2026/hello.md", "", LANGS), "/posts/2026/hello/");
});

// --- readBaseUrl --------------------------------------------------------------

test("readBaseUrl: strips trailing slash", () => {
  assert.equal(readBaseUrl('base_url = "https://example.com/"'), "https://example.com");
});

test("readBaseUrl: missing base_url throws", () => {
  assert.throws(() => readBaseUrl("title = \"x\""), /base_url/);
});

test("readBaseUrl: empty base_url throws", () => {
  assert.throws(() => readBaseUrl('base_url = ""'), /base_url/);
});

// --- parseExistingMap <-> toToml ---------------------------------------------

test("parseExistingMap: extracts only [posts] table entries", () => {
  const src = '[posts]\n"/a/" = "id1"\n"/b/" = "id2"';
  assert.deepEqual(parseExistingMap(src), { "/a/": "id1", "/b/": "id2" });
});

test("parseExistingMap: leaves [posts] when another table begins", () => {
  const src = '[posts]\n"/a/" = "id1"\n[other]\n"/b/" = "id2"';
  assert.deepEqual(parseExistingMap(src), { "/a/": "id1" });
});

test("parseExistingMap: handles CRLF line endings", () => {
  const src = '[posts]\r\n"/a/" = "id1"\r\n"/b/" = "id2"\r\n';
  assert.deepEqual(parseExistingMap(src), { "/a/": "id1", "/b/": "id2" });
});

test("toToml: sorts keys and JSON-quotes them", () => {
  const out = toToml({ "/b/": "id2", "/a/": "id1" });
  const aIdx = out.indexOf('"/a/"');
  const bIdx = out.indexOf('"/b/"');
  assert.ok(aIdx !== -1 && bIdx !== -1 && aIdx < bIdx, "keys must be sorted ascending");
  assert.match(out, /^"\/a\/" = "id1"$/m);
});

test("toToml: empty map still emits the [posts] header", () => {
  assert.match(toToml({}), /\[posts\]/);
});

test("parseExistingMap(toToml(x)) round-trips the mapping", () => {
  const original = { "/en/posts/hello/": "abc", "/posts/world/": "def" };
  assert.deepEqual(parseExistingMap(toToml(original)), original);
});
