import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import { test } from "node:test";
import ts from "typescript";
import * as routes from "../src/site/routes.ts";
import * as browserState from "../src/site/browser-state.ts";

const requireActual = createRequire(import.meta.url);
const source = ts.transpileModule(
  readFileSync(new URL("../src/main.tsx", import.meta.url), "utf8"),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.React,
      esModuleInterop: true,
    },
  },
).outputText;

// Execute the real browser entry; replace only the DOM mounting boundary.
function enter(pathname: string, saved: string, hash = "") {
  const redirects: string[] = [];
  let mounted:
    | { props: { children: { props: { page: routes.SitePageContext } } } }
    | undefined;
  const render = (tree: typeof mounted) => {
    mounted = tree;
  };
  runInNewContext(source, {
    exports: {},
    require: (id: string) => {
      if (id === "react") return requireActual(id);
      if (id === "react-dom/client")
        return {
          createRoot: () => ({ render }),
          hydrateRoot: (_root: unknown, tree: typeof mounted) => render(tree),
        };
      if (id === "./App") return { __esModule: true, default: () => null };
      if (id === "./site/routes") return routes;
      if (id === "./site/browser-state") return browserState;
      if (id === "./index.css") return {};
      throw Error(`Unexpected dependency: ${id}`);
    },
    location: {
      pathname,
      search: "",
      hash,
      replace: (url: string) => redirects.push(url),
    },
    localStorage: { getItem: () => saved },
    document: {
      getElementById: (id: string) =>
        id === "root" ? { hasChildNodes: () => false } : null,
    },
  });
  return { redirects, page: mounted?.props.children.props.page };
}

test("root entry stays Indonesian after a previous language choice", () => {
  for (const saved of ["zh", "en", "id"]) {
    const result = enter("/", saved);
    assert.deepEqual(result.redirects, []);
    assert.equal(result.page?.locale, "id");
  }
});
test("explicit translated paths and prototype bookmarks still work", () => {
  assert.equal(enter("/zh/contact/", "en").page?.locale, "zh");
  assert.equal(enter("/en/products/es-12b/", "zh").page?.id, "es12b");
  assert.deepEqual(enter("/", "zh", "#/en/products").redirects, [
    "/en/products/",
  ]);
});
