import {
  getPagePath,
  getLocalizedPagePath,
  locales,
  products,
  type Locale,
  type SitePageContext,
} from "./routes";
const names: Record<string, Record<Locale, string>> = {
  home: {
    zh: "家用与商用制冰设备",
    en: "Home & commercial ice makers",
    id: "Mesin es rumah & komersial",
  },
  products: { zh: "产品中心", en: "Ice makers", id: "Produk mesin es" },
  solutions: {
    zh: "选型与用冰方案",
    en: "Ice supply & model selection",
    id: "Solusi & pemilihan mesin",
  },
  partners: {
    zh: "采购与品牌合作",
    en: "Purchasing & OEM partnerships",
    id: "Pembelian & kemitraan OEM",
  },
  about: { zh: "关于 SOOCOOL", en: "About SOOCOOL", id: "Tentang SOOCOOL" },
  support: {
    zh: "安装与售后支持",
    en: "Installation & product support",
    id: "Pemasangan & purnajual",
  },
  resources: {
    zh: "产品目录与使用指南",
    en: "Catalogue & practical guides",
    id: "Katalog & panduan penggunaan",
  },
  contact: {
    zh: "联系印尼团队",
    en: "Contact our Indonesia team",
    id: "Hubungi tim Indonesia",
  },
  "404": {
    zh: "页面未找到",
    en: "Page not found",
    id: "Halaman tidak ditemukan",
  },
};
export function resolveSiteUrl(
  value = process.env.SITE_URL || "https://escool.id",
): string {
  const url = new URL(value);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  )
    throw new Error("SITE_URL must be an HTTPS origin");
  return url.origin;
}
export function getPageSeo(page: SitePageContext, siteUrl: string) {
  const product = products.find((item) => item.id === page.id);
  const label =
    page.page === "product" && product
      ? `${product.code} · ${{ zh: "制冰机", en: "Ice maker", id: "Mesin es" }[page.locale]}`
      : names[page.page][page.locale];
  const generic = {
    zh: "SOOCOOL 家用、台式、商用与分体式制冰设备。查看型号、日产量、储冰量和安装要求，联系印尼团队咨询选型、采购与报价。",
    en: "SOOCOOL countertop, commercial and modular ice makers. Explore models, daily production, storage and installation. Contact our Indonesia team for product selection and quotations.",
    id: "Mesin es meja, komersial, dan modular SOOCOOL. Lihat model, produksi harian, penyimpanan, dan pemasangan. Hubungi tim Indonesia untuk pemilihan mesin serta penawaran.",
  };
  const description = product
    ? `${product.code}: ${product.production} kg / 24h · ${product.storage} kg. ${generic[page.locale]}`
    : `${label}. ${generic[page.locale]}`;
  return {
    title: `${label} | SOOCOOL (Escool)`,
    description,
    url: siteUrl + getPagePath(page),
    image: siteUrl + (product?.image || "/assets/product-row-8.webp"),
    alternates: locales.map((locale) => ({
      locale,
      href: siteUrl + getLocalizedPagePath(page, locale),
    })),
  };
}
export function getStructuredData(
  page: SitePageContext,
  siteUrl: string,
): unknown[] {
  const seo = getPageSeo(page, siteUrl);
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SOOCOOL",
    legalName: "PT ESCOOL ELECTRONIC INDONESIA",
    url: siteUrl,
    telephone: "+62-852-8100-8881",
    email: "nianze1010@gmail.com",
    sameAs: [
      "https://shopee.co.id/soocool.mall",
      "https://www.tiktok.com/@soocool.indonesia",
      "https://www.instagram.com/soocool.indonesia",
      "https://www.youtube.com/@SOOCOOL.INDONESIA",
      "https://www.facebook.com/profile.php?id=61581101786961",
    ],
  };
  const product = products.find((item) => item.id === page.id);
  if (page.page !== "product" || !product)
    return [
      organization,
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: seo.title,
        url: seo.url,
        inLanguage: page.locale,
      },
    ];
  return [
    organization,
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: `SOOCOOL ${product.code}`,
      model: product.code,
      image: seo.image,
      description: seo.description,
      url: seo.url,
      brand: { "@type": "Brand", name: "SOOCOOL" },
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Daily production",
          value: `${product.production} kg / 24h`,
        },
        {
          "@type": "PropertyValue",
          name: "Ice storage",
          value: `${product.storage} kg`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: names.products[page.locale],
          item:
            siteUrl +
            getLocalizedPagePath(
              { ...page, page: "products", id: "" },
              page.locale,
            ),
        },
        { "@type": "ListItem", position: 2, name: product.code, item: seo.url },
      ],
    },
  ];
}
