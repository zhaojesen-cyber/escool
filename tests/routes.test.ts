import assert from "node:assert/strict";
import { test } from "node:test";
import {
  getPageFromPath,
  getPagePath,
  getLocalizedPagePath,
  allPages,
} from "../src/site/routes.ts";

test("canonical product and translated pages preserve their identity", () => {
  const product = getPageFromPath("/products/es-12b/");
  assert.equal(product.page, "product");
  assert.equal(product.id, "es12b");
  assert.equal(product.locale, "id");
  assert.equal(getLocalizedPagePath(product, "zh"), "/zh/products/es-12b/");
  assert.equal(getPageFromPath("/zh/about/").page, "about");
  assert.equal(
    getPagePath(getPageFromPath("/id/products/es-12b/")),
    "/products/es-12b/",
  );
});
test("unknown paths and products are never a valid homepage", () => {
  assert.equal(getPageFromPath("/products/fake/").page, "404");
  assert.equal(getPageFromPath("/zh/unknown/").page, "404");
  assert.equal(getPageFromPath("/zh/about/extra/").page, "404");
});
test("all enumerated pages roundtrip without duplication", () => {
  assert.equal(allPages.length, 81);
  assert.equal(new Set(allPages.map(getPagePath)).size, allPages.length);
  for (const page of allPages)
    assert.deepEqual(getPageFromPath(getPagePath(page)), page);
});
