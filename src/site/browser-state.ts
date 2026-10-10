import { products, locales, getPagePath, type Locale } from "./routes";
type StorageLike = Pick<Storage, "getItem" | "setItem">;
const categories = ["all", "compact", "commercial", "industrial", "specialty"];
const scenarios = ["cafe", "hotel", "chain", "home"];
const compareKey = "soocool-compare";
function validCompare(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [
    ...new Set(
      value.filter(
        (id): id is string =>
          typeof id === "string" &&
          products.some((product) => product.id === id),
      ),
    ),
  ].slice(0, 3);
}
export function readEntryState(search: string, storage?: StorageLike | null) {
  const query = new URLSearchParams(search);
  const category = query.get("category") || "all",
    scenario = query.get("scenario") || "cafe";
  let compare: string[] = [];
  try {
    compare = validCompare(JSON.parse(storage?.getItem(compareKey) || "[]"));
  } catch {
    /* Storage can be disabled or contain obsolete data. */
  }
  return {
    category: categories.includes(category) ? category : "all",
    scenario: scenarios.includes(scenario) ? scenario : "cafe",
    compare,
  };
}
export function saveCompare(
  storage: StorageLike | null | undefined,
  ids: unknown,
): void {
  try {
    storage?.setItem(compareKey, JSON.stringify(validCompare(ids)));
  } catch {
    /* Browsing still works when storage is unavailable. */
  }
}
export function getChoicePath(
  locale: Locale,
  page: "products" | "solutions",
  value: string,
): string {
  const key = page === "products" ? "category" : "scenario";
  const allowed = page === "products" ? categories : scenarios;
  return (
    getPagePath({ locale, page, id: "" }) +
    "?" +
    new URLSearchParams({ [key]: allowed.includes(value) ? value : allowed[0] })
  );
}
export function getSavedLocale(storage?: StorageLike | null): Locale | null {
  try {
    const value = storage?.getItem("soocool-language");
    return locales.includes(value as Locale) ? (value as Locale) : null;
  } catch {
    return null;
  }
}
