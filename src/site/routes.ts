import catalogue from "../catalogue/products.json";
export const locales = ["id", "en", "zh"] as const;
export type Locale = (typeof locales)[number];
export const pageNames = [
  "home",
  "products",
  "solutions",
  "partners",
  "about",
  "support",
  "resources",
  "contact",
] as const;
export type PageName = (typeof pageNames)[number] | "product" | "404";
export interface SitePageContext {
  locale: Locale;
  page: PageName;
  id: string;
}
export const products = catalogue;
export function getPagePath(context: SitePageContext): string {
  const prefix = context.locale === "id" ? "" : `/${context.locale}`;
  if (context.page === "home") return `${prefix}/`;
  if (context.page === "product") {
    const product = products.find((item) => item.id === context.id);
    return product
      ? `${prefix}/products/${product.code.toLowerCase()}/`
      : `${prefix}/404/`;
  }
  return `${prefix}/${context.page}/`;
}
export function getLocalizedPagePath(context: SitePageContext, locale: Locale) {
  return getPagePath({ ...context, locale });
}
export function getPageFromPath(pathname: string): SitePageContext {
  let parts: string[];
  try {
    parts = decodeURIComponent(pathname).split("/").filter(Boolean);
  } catch {
    return { locale: "id", page: "404", id: "" };
  }
  let locale: Locale = "id";
  if (locales.includes(parts[0] as Locale)) locale = parts.shift() as Locale;
  const fail: SitePageContext = { locale, page: "404", id: "" };
  if (!parts.length) return { locale, page: "home", id: "" };
  if (parts[0] === "products" && parts.length === 2) {
    const product = products.find(
      (item) => item.code.toLowerCase() === parts[1].toLowerCase(),
    );
    return product ? { locale, page: "product", id: product.id } : fail;
  }
  if (
    parts.length !== 1 ||
    !pageNames.includes(parts[0] as (typeof pageNames)[number]) ||
    parts[0] === "home"
  )
    return fail;
  return { locale, page: parts[0] as PageName, id: "" };
}
export function fromLegacyHash(hash: string): SitePageContext | null {
  const match = hash.match(
    /^#\/(id|en|zh)\/(home|products|product|solutions|partners|about|support|resources|contact)(?:\/([^/]+))?$/,
  );
  if (!match) return null;
  const locale = match[1] as Locale,
    page = match[2] as PageName;
  if (page === "product") {
    const product = products.find((item) => item.id === match[3]);
    return product ? { locale, page, id: product.id } : null;
  }
  return { locale, page, id: "" };
}
export const allPages: SitePageContext[] = locales.flatMap((locale) => [
  ...pageNames.map((page) => ({ locale, page, id: "" })),
  ...products.map((product) => ({
    locale,
    page: "product" as const,
    id: product.id,
  })),
]);
