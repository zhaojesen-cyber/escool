import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getPageSeo,
  getStructuredData,
  resolveSiteUrl,
} from "../src/site/seo.ts";
import { allPages } from "../src/site/routes.ts";
test("all pages have distinct titles, absolute canonical and matching alternates", () => {
  const titles = new Set<string>();
  for (const page of allPages) {
    const seo = getPageSeo(page, "https://escool.id");
    assert.match(seo.url, /^https:\/\/escool.id\//);
    assert.equal(seo.alternates.length, 3);
    assert.ok(seo.description.length > 30);
    titles.add(seo.title);
  }
  assert.equal(titles.size, allPages.length);
});
test("product schema contains truthful specs without prices or invented reviews", () => {
  const schema = JSON.stringify(
    getStructuredData(
      { locale: "zh", page: "product", id: "es12b" },
      "https://escool.id",
    ),
  );
  assert.match(schema, /ES-12B/);
  assert.match(schema, /12 kg/);
  assert.doesNotMatch(schema, /price|aggregateRating|review/);
});
test("production URL must be a valid https origin", () => {
  assert.equal(resolveSiteUrl("https://escool.id/"), "https://escool.id");
  assert.throws(() => resolveSiteUrl("http://escool.id"));
  assert.throws(() => resolveSiteUrl("https://escool.id/unrelated"));
});
