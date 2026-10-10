import { test } from "node:test";
import assert from "node:assert/strict";
import {
  readEntryState,
  saveCompare,
  getChoicePath,
} from "../src/site/browser-state.ts";
import { getPageFromPath } from "../src/site/routes.ts";
const store = (initial: string | null = null) => {
  let value = initial;
  return {
    getItem: () => value,
    setItem: (_key: string, next: string) => {
      value = next;
    },
  };
};
test("cross-page choices are encoded and restored by the destination", () => {
  for (const [page, value, key] of [
    ["products", "commercial", "category"],
    ["solutions", "hotel", "scenario"],
    ["solutions", "chain", "scenario"],
    ["solutions", "home", "scenario"],
  ] as const) {
    const url = new URL(getChoicePath("zh", page, value), "https://escool.id");
    assert.equal(getPageFromPath(url.pathname).page, page);
    assert.equal(readEntryState(url.search)[key], value);
  }
  assert.equal(
    readEntryState("?category=fake&scenario=unknown").category,
    "all",
  );
  assert.equal(
    readEntryState("?category=fake&scenario=unknown").scenario,
    "cafe",
  );
});
test("selections survive product-page navigation and reject untrusted IDs", () => {
  const storage = store();
  saveCompare(storage, ["es12b"]);
  let restored = readEntryState("", storage);
  assert.deepEqual(restored.compare, ["es12b"]);
  saveCompare(storage, [...restored.compare, "es48b"]);
  restored = readEntryState("", storage);
  assert.deepEqual(restored.compare, ["es12b", "es48b"]);
  assert.deepEqual(
    readEntryState(
      "",
      store('["es12b","fake","es12b","es48b","es200f","es250f"]'),
    ).compare,
    ["es12b", "es48b", "es200f"],
  );
  assert.deepEqual(readEntryState("", store("broken json")).compare, []);
  assert.deepEqual(readEntryState("", store("{}")).compare, []);
  const blocked = {
    getItem: () => {
      throw Error("Blocked");
    },
    setItem: () => {
      throw Error("Blocked");
    },
  };
  assert.deepEqual(readEntryState("", blocked).compare, []);
  assert.doesNotThrow(() => saveCompare(blocked, ["es12b"]));
});
