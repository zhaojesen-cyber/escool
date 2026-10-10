import assert from "node:assert/strict";
import { test } from "node:test";
import { renderPage } from "../src/render.tsx";
import { allPages } from "../src/site/routes.ts";

test("every approved page renders crawlable content and real links", async () => {
  for (const page of allPages) {
    const html = await renderPage(page);
    assert.match(html, /<h1[\s>]/, JSON.stringify(page));
    assert.match(html, /https:\/\/shopee.co.id\/soocool.mall/);
    assert.match(html, /https:\/\/www.instagram.com\/soocool.indonesia/);
    assert.doesNotMatch(html, /#\/(?:zh|en|id)\//);
    assert.doesNotMatch(
      html,
      /原型说明|待补资料|19款设备|网站语言\s*3|来源：Shopee/,
    );
    if (page.page === "product")
      assert.match(
        html,
        new RegExp(page.id === "es12b" ? "ES-12B" : "product-detail-top"),
      );
  }
});
test("home preserves ice first, three models, and no fabricated buyer quotes", async () => {
  const html = await renderPage({ locale: "zh", page: "home", id: "" });
  assert.match(html, /随时有冰用/);
  assert.match(html, /ice-scene hero-ice/);
  assert.match(html, /ES-12B/);
  assert.match(html, /ES-48B/);
  assert.match(html, /ES-200F/);
  assert.equal((html.match(/ice-scene-canvas/g) || []).length, 1);
  assert.ok(html.indexOf("hero-ice") < html.indexOf("hero-carousel"));
  assert.doesNotMatch(html, /Joko|Maria|David|Rp\s*[\d.,]+/);
});
