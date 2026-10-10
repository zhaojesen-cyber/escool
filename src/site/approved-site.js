import { readEntryState, saveCompare, getChoicePath } from "./browser-state";
import * as pageTemplates from "./pages/index.js";
import { products as PRODUCTS, getPagePath } from "./routes";
import { GUIDES } from "./guides.js";
import { mountIceScene } from "./ice-scene.js";
const CATALOGUE_FILES = Object.fromEntries(
  ["zh", "en", "id"].map((locale) => [
    locale,
    `/documents/SOOCOOL_catalogue_${locale}.html`,
  ]),
);
let lang = "zh",
  route = { page: "home", id: "" },
  modal = null,
  lastFocus = null;
const state = {
  category: "all",
  query: "",
  compare: [],
  tab: "specs",
  scenario: "cafe",
  calc: { cups: 400, grams: 150, peak: 80, margin: 25 },
  draft: "",
  forms: { product: {}, service: {} },
};
const $ = (s) => document.querySelector(s);
const esc = (v) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const T = (zh, en, id) => [zh, en, id][{ zh: 0, en: 1, id: 2 }[lang]];
const t = (v) => (Array.isArray(v) ? v[{ zh: 0, en: 1, id: 2 }[lang]] : v);
const path = (page, id = "") => getPagePath({ locale: lang, page, id });
const find = (id) => PRODUCTS.find((p) => p.id === id);
const STORE_LINKS = [
  ["shopee", "Shopee", "https://shopee.co.id/soocool.mall"],
  ["tiktok", "TikTok Shop", "https://vt.tiktok.com/ZSHTYVj5fwj6j-kHOnd/"],
];
const SOCIAL_LINKS = [
  ["tiktok", "TikTok", "https://www.tiktok.com/@soocool.indonesia"],
  [
    "facebook",
    "Facebook",
    "https://www.facebook.com/profile.php?id=61581101786961",
  ],
  ["instagram", "Instagram", "https://www.instagram.com/soocool.indonesia"],
  ["youtube", "YouTube", "https://www.youtube.com/@SOOCOOL.INDONESIA"],
];
const HERO_MODELS = ["es12b", "es48b", "es200f"];
const CONTACT = {
  sales: "6285281008881",
  director: "62812806661",
  email: "nianze1010@gmail.com",
  address:
    "Gading Kirana Utara Blok A13 No. 33, RT.18/RW.8, Kelapa Gading Barat, Jakarta Utara 14240",
};
const NAV = [
  ["home", ["首页", "Home", "Beranda"]],
  ["products", ["产品中心", "Products", "Produk"]],
  ["solutions", ["解决方案", "Solutions", "Solusi"]],
  ["partners", ["合作方式", "Partnerships", "Kemitraan"]],
  ["about", ["关于我们", "About us", "Tentang kami"]],
  ["support", ["服务支持", "Support", "Dukungan"]],
  ["resources", ["资料中心", "Resources", "Pusat informasi"]],
];
const CATEGORIES = [
  ["all", ["全部产品", "All products", "Semua produk"]],
  ["compact", ["家用 / 台式", "Home & countertop", "Rumah & meja"]],
  ["commercial", ["商用一体式", "Self-contained", "Komersial terpadu"]],
  [
    "industrial",
    ["分体式 / 大产量", "Modular & high output", "Modular & kapasitas besar"],
  ],
  ["specialty", ["FT 系列", "FT series", "Seri FT"]],
];
const SCENARIOS = [
  {
    id: "cafe",
    name: ["咖啡与茶饮", "Cafés & tea shops", "Kafe & kedai teh"],
    title: [
      "店里每天卖多少杯？先算算需要多少冰。",
      "How many drinks do you serve? Let’s work out the ice.",
      "Berapa minuman yang terjual? Hitung dulu kebutuhan esnya.",
    ],
    desc: [
      "从杯量、每杯加冰量和营业高峰选择日产量与储冰配置。吧台水源有限时，可先查看支持桶装水和自来水的 ES-48A、ES-48B。",
      "Use drink counts, ice per serving and peak hours to plan production and storage. If mains water is limited, explore ES-48A and ES-48B with bottled or mains water supply.",
      "Gunakan jumlah minuman, es per sajian, dan jam sibuk untuk merencanakan produksi serta penyimpanan. Jika air keran terbatas, lihat ES-48A dan ES-48B yang mendukung air galon atau keran.",
    ],
    products: ["es48a", "es48b", "es100f"],
    points: [
      [
        "每天杯量与每杯加冰量",
        "Daily drinks and ice per serving",
        "Minuman harian dan es per sajian",
      ],
      [
        "高峰一小时的取冰需求",
        "Ice needed in the busiest hour",
        "Es pada satu jam tersibuk",
      ],
      [
        "吧台尺寸、进水与排水位置",
        "Counter dimensions, inlet and drainage",
        "Dimensi meja, air masuk, dan drainase",
      ],
    ],
  },
  {
    id: "hotel",
    name: ["酒店与餐饮", "Hotels & restaurants", "Hotel & restoran"],
    title: [
      "厨房、酒吧、宴会用冰，一起安排好。",
      "Plan ice for the kitchen, bar and banquets.",
      "Atur kebutuhan es dapur, bar, dan jamuan.",
    ],
    desc: [
      "分别统计餐厅、酒吧和宴会的用冰需求。集中供冰时，要同时考虑储冰、搬运距离和高峰补冰；200F、250F 与 LS 系列提供分体式配置。",
      "Measure restaurant, bar and banquet demand separately. Central ice supply requires storage, transport and peak replenishment planning. The 200F, 250F and LS series offer modular configurations.",
      "Hitung kebutuhan restoran, bar, dan jamuan secara terpisah. Suplai es terpusat membutuhkan rencana penyimpanan, pengangkutan, dan pengisian pada jam sibuk. Seri 200F, 250F, dan LS menawarkan konfigurasi modular.",
    ],
    products: ["es200f", "es250f", "es300f"],
    points: [
      [
        "各用冰点和营业时段",
        "Service points and operating hours",
        "Titik layanan dan jam operasional",
      ],
      [
        "主机与储冰桶的摆放空间",
        "Space for the head and ice bin",
        "Ruang unit utama dan bak es",
      ],
      [
        "取冰、搬运与清洁安排",
        "Dispensing, transport and cleaning",
        "Pengambilan, pengangkutan, dan pembersihan",
      ],
    ],
  },
  {
    id: "chain",
    name: [
      "连锁与批量采购",
      "Chains & bulk purchasing",
      "Jaringan & pembelian grosir",
    ],
    title: [
      "多家门店一起采购，选型和交付一起商量。",
      "Buying for several stores? Let’s plan models and delivery.",
      "Membeli untuk beberapa toko? Bahas model dan pengiriman bersama.",
    ],
    desc: [
      "同一品牌的门店，空间、水源和营业量也会不同。先确认标准店型的设备清单，再按城市和开店批次安排交付。",
      "Stores within one brand can differ in space, water supply and trading volume. Agree equipment for the standard store format, then plan delivery by city and opening batch.",
      "Toko dalam satu merek dapat berbeda dalam ruang, suplai air, dan penjualan. Sepakati mesin untuk format standar, lalu atur pengiriman per kota serta tahap pembukaan.",
    ],
    products: ["es48b", "es140f", "es200fa"],
    points: [
      [
        "门店数量、城市与交付批次",
        "Store count, cities and delivery batches",
        "Jumlah toko, kota, dan tahap pengiriman",
      ],
      [
        "标准配置与门店差异",
        "Standard equipment and store variations",
        "Mesin standar dan perbedaan toko",
      ],
      [
        "采购、安装与售后联系人",
        "Purchasing, installation and service contacts",
        "Kontak pembelian, pemasangan, dan layanan",
      ],
    ],
  },
  {
    id: "home",
    name: ["家庭与办公室", "Home & office", "Rumah & kantor"],
    title: [
      "家里、办公室想用冰，台式机就很方便。",
      "Easy ice at home or in the office.",
      "Es lebih praktis di rumah atau kantor.",
    ],
    desc: [
      "ES-12B 手动加水，适合轻量日常用冰；ES-20F 提供自吸水泵与手动加水两种进水方式。购买前核对台面尺寸和储冰容量。",
      "ES-12B uses manual filling for lighter daily demand. ES-20F supports self-priming pump or manual filling. Check counter dimensions and storage before purchase.",
      "ES-12B memakai pengisian manual untuk kebutuhan harian ringan. ES-20F mendukung pompa self-priming atau pengisian manual. Periksa ukuran meja serta penyimpanan sebelum membeli.",
    ],
    products: ["es12b", "es20f"],
    points: [
      [
        "使用人数与取冰频率",
        "Number of users and dispensing frequency",
        "Jumlah pengguna dan frekuensi pengambilan",
      ],
      [
        "台面尺寸与插座位置",
        "Counter dimensions and outlet position",
        "Dimensi meja dan posisi stopkontak",
      ],
      [
        "手动加水或水泵进水",
        "Manual filling or pump supply",
        "Pengisian manual atau pompa",
      ],
    ],
  },
];
const icons = {
  arrow: "M5 12h14m-6-6 6 6-6 6",
  snow: "M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M8 4l4 3 4-3M8 20l4-3 4 3",
  globe:
    "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M3 12h18M12 3c4 5 4 13 0 18-4-5-4-13 0-18",
  menu: "M3 6h18M3 12h18M3 18h18",
  close: "m6 6 12 12M6 18 18 6",
  search: "M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0m-1 5 6 6",
  compare: "M4 4v16M12 4v16M20 4v16M2 8h4m4 8h4m4-5h4",
  square: "M4 4h16v16H4Z",
  check: "m4 12 5 5 11-11",
  tickbox: "M4 4h16v16H4Zm3 8 3 3 7-7",
  factory: "M3 21V9l6 3V9l6 3V3h5v18ZM7 16v2m5-2v2m5-2v2",
  pin: "M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0ZM9 10a3 3 0 1 0 6 0 3 3 0 1 0-6 0",
  layers: "m3 7 9-5 9 5-9 5-9-5Zm0 5 9 5 9-5M3 17l9 5 9-5",
  people:
    "M16 21v-3a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v3M9 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8m9 1a4 4 0 0 1 0 7m0 3a4 4 0 0 1 4 4v3",
  tool: "m14 6 4 4 4-4a7 7 0 0 1-9 9l-7 7-4-4 7-7a7 7 0 0 1 5-9Z",
  file: "M5 2h9l5 5v15H5Zm9 0v6h5M8 12h8m-8 4h8",
  download: "M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4",
  book: "M3 3h7l2 2 2-2h7v17h-7l-2 2-2-2H3ZM12 5v17",
  mail: "M3 5h18v14H3Zm0 0 9 8 9-8",
  phone: "M8 3H4c-2 10 7 19 17 17v-4l-5-2-2 2-6-6 2-2Z",
  whatsapp:
    "M21 11.5a9 9 0 0 1-13.5 7.8L3 21l1.6-5A9 9 0 1 1 21 11.5ZM8 7l2 3-1 1 4 4 1-1 3 1",
  sliders: "M4 3v18M12 3v18M20 3v18M1 8h6M9 16h6M17 7h6",
  chip: "M6 6h12v12H6ZM9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4",
  shield: "m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6Zm-5 10 3 3 7-7",
};
const I = (name) =>
  `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${icons[name] || icons.snow}"/></svg>`;
const socialIcon = (name) => {
  const shapes = {
    tiktok:
      '<path d="M14 3h3c.4 2.2 1.8 3.5 4 3.8v3a9 9 0 0 1-4-1.1v7.5a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3Z"/>',
    facebook:
      '<path d="M14 22v-9h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.5c-.6-.1-1.8-.3-3-.3-3 0-5 1.8-5 5.2V9H7v4h3v9Z"/>',
    instagram:
      '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.2"/>',
    youtube:
      '<path d="M21.6 6.1c-.2-1-1-1.7-2-2C17.8 3.6 12 3.6 12 3.6s-5.8 0-7.6.5c-1 .3-1.8 1-2 2C2 7.9 2 12 2 12s0 4.1.4 5.9c.2 1 1 1.7 2 2 1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5c1-.3 1.8-1 2-2 .4-1.8.4-5.9.4-5.9s0-4.1-.4-5.9Z"/><path d="m10 8 6 4-6 4Z" fill="var(--social-cutout,#edf3fa)"/>',
    shopee:
      '<path d="M5 8h14l1 13H4Z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 8V6a4 4 0 0 1 8 0v2M15 12c-4-3-8 1-3 3 5 2 1 6-3 3" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  };
  return `<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${shapes[name] || ""}</svg>`;
};
const externalLink = (item, cls = "store-link") =>
  `<a class="${cls}" href="${item[2]}" target="_blank" rel="noopener noreferrer">${socialIcon(item[0])}<span>${item[1]}</span>${cls === "store-link" ? I("arrow") : ""}</a>`;
function stores() {
  return `<div class="store-links">${STORE_LINKS.map((item) => externalLink(item)).join("")}</div>`;
}
const btn = (
  label,
  action,
  value = "",
  style = "primary",
  ic = "arrow",
  extra = "",
) =>
  `<button class="btn ${style}" data-action="${esc(action)}" data-value="${esc(value)}" ${extra}>${label}${ic ? I(ic) : ""}</button>`;
const link = (page, label, style = "text", id = "", ic = "arrow") =>
  `<a href="${path(page, id)}" class="btn ${style}">${label}${ic ? I(ic) : ""}</a>`;
const logo = () =>
  `<a class="brand" href="${path("home")}" aria-label="SOOCOOL ${T("首页", "home", "beranda")}"><strong>SOOCOOL</strong><small>ICE SOLUTIONS · INDONESIA</small></a>`;
const heading = (eye, h, p) =>
  `<div class="page-heading"><div class="crumb"><a href="${path("home")}">${T("首页", "Home", "Beranda")}</a><span>/</span><span>${h}</span></div><div class="eyebrow">${eye}</div><h1>${h}</h1><p class="lead">${p}</p></div>`;
const sectionHead = (eye, h, p = "", right = "") =>
  `<div class="section-head"><div><div class="eyebrow">${eye}</div><h2>${h}</h2>${p ? `<p class="lead">${p}</p>` : ""}</div>${right}</div>`;
const categoryName = (p) => t(CATEGORIES.find((c) => c[0] === p.category)[1]);
function inlet(p) {
  return {
    manual: T("手动加水", "Manual filling", "Pengisian manual"),
    pump: T(
      "自吸水泵 / 手动加水",
      "Self-priming pump / manual filling",
      "Pompa self-priming / pengisian manual",
    ),
    dual: T(
      "桶装水 / 自来水",
      "Bottled / mains water",
      "Air galon / air keran",
    ),
    tap: T("自来水直连", "Mains water connection", "Sambungan air keran"),
  }[p.inlet];
}
function productTitle(p) {
  return p.category === "compact"
    ? T("台式制冰机", "Countertop ice maker", "Mesin es meja")
    : p.category === "commercial"
      ? T(
          "商用一体式制冰机",
          "Self-contained ice maker",
          "Mesin es komersial terpadu",
        )
      : p.category === "specialty"
        ? T("FT 系列制冰机", "FT series ice maker", "Mesin es seri FT")
        : T(
            "大产量制冰机",
            "High-output ice maker",
            "Mesin es kapasitas besar",
          );
}
function productDesc(p) {
  return T(
    `日产冰 ${p.production} kg，储冰 ${p.storage} kg。${inlet(p)}${p.category === "compact" ? "，便于日常取冰。" : p.category === "commercial" ? "，面向门店日常供冰。" : "，用于集中供冰与项目采购。"}`,
    `${p.production} kg daily output and ${p.storage} kg storage. ${inlet(p)}.`,
    `${p.production} kg produksi harian dan ${p.storage} kg penyimpanan. ${inlet(p)}.`,
  );
}
function dimensions(value) {
  return value
    .replace(/主机/g, T("主机", "Ice head", "Unit utama"))
    .replace(/冰桶|箱体/g, T("储冰桶", "Ice bin", "Bak es"))
    .replace(/\*/g, " × ")
    .replace(/(\d)x(?=\d)/g, "$1 × ")
    .replace(/MM/gi, " mm")
    .replace(/[（]/g, "(")
    .replace(/[）]/g, ")");
}
const productionNote = () =>
  T(
    "实际产冰量受环境温度、进水温度、水质及安装条件影响。选型时请结合现场用冰需求。",
    "Actual production depends on ambient and inlet-water temperature, water quality and installation conditions. Size the machine for your site and demand.",
    "Produksi nyata bergantung pada suhu udara dan air masuk, mutu air, serta pemasangan. Pilih mesin sesuai lokasi dan kebutuhan es.",
  );
function specs(p) {
  return [
    [T("型号", "Model", "Model"), p.code],
    [
      T("制冰量", "Daily production", "Produksi harian"),
      p.production + " kg / 24h",
    ],
    [T("储冰量", "Ice storage", "Penyimpanan es"), p.storage + " kg"],
    ...(p.power
      ? [[T("整机功率", "Machine power", "Daya mesin"), p.power + " W"]]
      : []),
    [T("进水方式", "Water inlet", "Air masuk"), inlet(p)],
    ...(p.grid
      ? [[T("冰格数", "Ice grid", "Kisi es"), p.grid.replace(/\*/g, " × ")]]
      : []),
    ...(p.batch
      ? [
          [
            T("单次制冰数量", "Ice pieces per cycle", "Jumlah es per siklus"),
            String(p.batch),
          ],
        ]
      : []),
    ...(p.dimensions
      ? [
          [
            T(
              "机器尺寸（mm）",
              "Machine dimensions (mm)",
              "Dimensi mesin (mm)",
            ),
            dimensions(p.dimensions),
          ],
        ]
      : []),
    ...(p.packaging
      ? [
          [
            T("包装尺寸", "Packaging dimensions", "Dimensi kemasan"),
            dimensions(p.packaging),
          ],
        ]
      : []),
    ...(p.voltage ? [[T("电压", "Voltage", "Tegangan"), p.voltage]] : []),
    ...(p.iceSize
      ? [[T("冰块尺寸", "Ice dimensions", "Dimensi es"), dimensions(p.iceSize)]]
      : []),
  ];
}
function art(p, hero = false) {
  return `<div class="product-art"><img src="${esc(p.image)}" alt="SOOCOOL ${esc(p.code)} ${esc(productTitle(p))}${p.sharedPhoto ? " " + T("同系列外观", "series appearance", "tampilan seri") : ""}" ${hero ? 'fetchpriority="high"' : 'loading="lazy"'} width="700" height="900"></div>`;
}
function card(p) {
  return `<article class="product-card"><a class="product-visual" href="${path("product", p.id)}" aria-label="${esc(p.code)}">${art(p)}${p.sharedPhoto ? `<span class="art-label">${T("同系列外观", "Series appearance", "Tampilan seri")}</span>` : ""}</a><div class="product-info"><div class="kicker">${categoryName(p)}</div><h3><a href="${path("product", p.id)}">${p.code}</a></h3><p>${productDesc(p)}</p><div class="product-meta"><div><small>${T("制冰量", "Daily production", "Produksi harian")}</small><strong>${p.production} kg / 24h</strong></div><div><small>${T("储冰容量", "Ice storage", "Penyimpanan es")}</small><strong>${p.storage} kg</strong></div></div><div class="product-bottom">${link("product", T("查看详情", "View details", "Lihat detail"), "text", p.id)}<button class="check-button ${state.compare.includes(p.id) ? "selected" : ""}" data-action="compare" data-value="${p.id}" aria-pressed="${state.compare.includes(p.id)}">${I(state.compare.includes(p.id) ? "tickbox" : "square")}${T("对比", "Compare", "Bandingkan")}</button></div></div></article>`;
}
function header() {
  const nav = NAV.map(
    ([pg, n]) =>
      `<a class="nav-item ${route.page === pg || (route.page === "product" && pg === "products") ? "active" : ""}" href="${path(pg)}" ${route.page === pg ? 'aria-current="page"' : ""}>${t(n)}</a>`,
  ).join("");
  const topbar = `<div class="topbar"><div class="wrap"><span>${T("家用与商用制冰设备 · 印尼销售与服务", "Home & commercial ice makers · Indonesia", "Mesin es rumah & komersial · Indonesia")}</span><button data-action="wa" class="hide-small">${I("whatsapp")}${T("选型与报价咨询", "Product & quotation enquiries", "Konsultasi produk & penawaran")}</button></div></div>`;
  const header = `<div class="wrap header-inner">${logo()}<nav class="desktop-nav" aria-label="${T("主导航", "Main navigation", "Navigasi utama")}">${nav}</nav><div class="header-actions"><div class="lang-select">${I("globe")}<select data-language aria-label="${T("切换语言", "Change language", "Ubah bahasa")}"><option value="zh" ${lang === "zh" ? "selected" : ""}>中文</option><option value="en" ${lang === "en" ? "selected" : ""}>English</option><option value="id" ${lang === "id" ? "selected" : ""}>Indonesia</option></select></div>${link("contact", T("联系我们", "Contact", "Kontak"), "primary small", "", null)}<button class="menu-toggle" data-action="menu" aria-label="${T("展开菜单", "Open menu", "Buka menu")}" aria-expanded="false">${I("menu")}</button></div></div><nav class="mobile-nav" aria-label="${T("移动导航", "Mobile navigation", "Navigasi seluler")}">${nav}${link("contact", T("联系我们", "Contact", "Kontak"))}</nav>`;
  return { topbar, header };
}
function footer() {
  return `<footer class="footer"><div class="wrap"><div class="footer-top"><div>${logo()}<p class="footer-desc">${T("从家庭日常用冰到门店集中供冰，提供制冰设备、采购咨询与使用支持。", "Ice makers, purchasing advice and product support for homes, businesses and central ice supply.", "Mesin es, konsultasi pembelian, dan dukungan penggunaan untuk rumah, usaha, serta suplai es terpusat.")}</p><p class="note mt16">PT ESCOOL ELECTRONIC INDONESIA</p></div><div><h4>${T("产品与方案", "Products & solutions", "Produk & solusi")}</h4><div class="footer-links">${link("products", T("全部产品", "All products", "Semua produk"))}${link("solutions", T("产品选型", "Product selection", "Pemilihan produk"))}${link("partners", T("批量采购与 OEM", "Bulk purchasing & OEM", "Grosir & OEM"))}</div></div><div><h4>${T("服务与资料", "Support & resources", "Dukungan & informasi")}</h4><div class="footer-links">${link("about", T("关于 SOOCOOL", "About SOOCOOL", "Tentang SOOCOOL"))}${link("support", T("安装与售后", "Installation & service", "Pemasangan & purnajual"))}${link("resources", T("目录与使用指南", "Catalogue & guides", "Katalog & panduan"))}</div></div><div><h4>${T("联系我们", "Contact us", "Hubungi kami")}</h4><div class="footer-links"><button data-action="wa">WhatsApp 0852-8100-8881</button><a href="mailto:${CONTACT.email}">${CONTACT.email}</a>${link("contact", T("联系与来访", "Contacts & visits", "Kontak & kunjungan"))}${STORE_LINKS.map((item) => externalLink(item, "footer-store")).join("")}</div></div><div class="footer-social"><h4>${T("关注我们", "Follow us", "Ikuti kami")}</h4><div class="social-links">${SOCIAL_LINKS.map((item) => externalLink(item, "social-link")).join("")}</div></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} SOOCOOL · ${T("保留所有权利", "All rights reserved", "Hak cipta dilindungi")}</span><div><button data-action="legal" data-value="privacy">${T("隐私说明", "Privacy notice", "Privasi")}</button><button data-action="legal" data-value="terms">${T("使用条款", "Terms of use", "Ketentuan")}</button></div></div></div></footer>`;
}
function utilities() {
  return `<button class="floating-contact" data-action="wa" aria-label="${T("WhatsApp 咨询", "WhatsApp enquiry", "Konsultasi WhatsApp")}">${I("whatsapp")}</button>${state.compare.length ? `<div class="compare-dock"><span class="dock-title">${T("产品对比", "Compare", "Bandingkan")} · ${state.compare.length}/3</span><div class="dock-products">${state.compare.map((id) => `<span class="dock-chip">${find(id).code}<button data-action="compare" data-value="${id}" aria-label="${T("移除", "Remove", "Hapus")} ${find(id).code}">×</button></span>`).join("")}</div>${btn(T("开始对比", "Compare now", "Bandingkan"), "open-compare", "", "lime small", "compare", state.compare.length < 2 ? "disabled" : "")}</div>` : ""}`;
}
function cta() {
  return `<section class="cta-band"><div><h2>${T("不知道选哪款？我们帮您看看。", "Not sure which model to choose? Ask us.", "Belum tahu harus pilih model apa? Tanyakan kepada kami.")}</h2><p>${T("告诉我们使用场景、每天用冰量和所在城市。", "Share your application, daily ice demand and city.", "Sampaikan penggunaan, kebutuhan es harian, dan kota Anda.")}</p></div>${btn(T("联系产品团队", "Contact our team", "Hubungi tim kami"), "inquiry")}</section>`;
}
function heroCarousel() {
  return `<div class="hero-scene hero-carousel" role="region" aria-roledescription="${T("轮播", "carousel", "karusel")}" aria-label="${T("家用、商用与分体机", "Home, commercial and modular ice makers", "Mesin es rumah, komersial, dan modular")}"><div class="scene-ellipse"></div><div class="scene-top">${I("snow")} SOOCOOL · ICE MAKERS</div><div class="hero-slides" aria-live="off">${HERO_MODELS.map(
    (id, i) => {
      const p = find(id);
      return `<div class="hero-slide" data-slide-model="${id}" role="group" aria-roledescription="${T("幻灯片", "slide", "slide")}" aria-label="${i + 1} / ${HERO_MODELS.length} · ${p.code}" ${i ? "hidden" : ""}><div class="hero-art">${art(p, i === 0)}</div><div class="scene-tag"><small>${categoryName(p)}</small><strong>${p.production.replace(/-/g, "–")} kg / 24h</strong><small>${p.storage} kg ${T("储冰容量", "ice storage", "penyimpanan es")}</small></div><div class="scene-bottom"><div><strong>${p.code}</strong><small>${inlet(p)}</small>${p.sharedPhoto ? `<small>${T("产品图展示同系列外观", "Image shows the series appearance", "Gambar menunjukkan tampilan seri")}</small>` : ""}</div><a class="round-arrow" href="${path("product", id)}" aria-label="${T("查看", "View", "Lihat")} ${p.code}">${I("arrow")}</a></div></div>`;
    },
  ).join(
    "",
  )}</div><div class="hero-controls"><button data-action="hero-prev" aria-label="${T("上一款机型", "Previous model", "Model sebelumnya")}">‹</button><div class="hero-dots">${HERO_MODELS.map((id, i) => `<button data-action="hero-select" data-value="${i}" aria-label="${T("展示", "Show", "Tampilkan")} ${find(id).code}" aria-pressed="${i === 0}"><span></span></button>`).join("")}</div><button data-action="hero-next" aria-label="${T("下一款机型", "Next model", "Model berikutnya")}">›</button><button class="hero-pause" data-action="hero-pause" aria-label="${T("暂停自动轮播", "Pause automatic rotation", "Jeda putaran otomatis")}" aria-pressed="false">Ⅱ</button></div></div>`;
}
let stopHero = () => {},
  heroController = null;
function startHeroCarousel() {
  stopHero();
  heroController = null;
  const root = $(".hero-carousel");
  if (!root?.querySelectorAll) return;
  const slides = [...root.querySelectorAll(".hero-slide")],
    dots = [...root.querySelectorAll('[data-action="hero-select"]')],
    pause = root.querySelector('[data-action="hero-pause"]'),
    live = root.querySelector(".hero-slides");
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let current = 0,
    timer = null,
    userPaused = motion.matches,
    hovered = false,
    focused = false,
    visible = true;
  const clear = () => {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  };
  const show = (index, manual = false) => {
    current = (index + slides.length) % slides.length;
    live.setAttribute("aria-live", manual ? "polite" : "off");
    slides.forEach((slide, i) => (slide.hidden = i !== current));
    dots.forEach((dot, i) => dot.setAttribute("aria-pressed", i === current));
  };
  const sync = () => {
    clear();
    pause.setAttribute("aria-pressed", userPaused);
    pause.setAttribute(
      "aria-label",
      userPaused
        ? T(
            "开始自动轮播",
            "Start automatic rotation",
            "Mulai putaran otomatis",
          )
        : T(
            "暂停自动轮播",
            "Pause automatic rotation",
            "Jeda putaran otomatis",
          ),
    );
    pause.textContent = userPaused ? "▶" : "Ⅱ";
    if (
      !userPaused &&
      !hovered &&
      !focused &&
      !document.hidden &&
      visible &&
      !modal
    )
      timer = setInterval(() => show(current + 1), 5000);
  };
  const events = [];
  const on = (target, event, fn) => {
    target.addEventListener(event, fn);
    events.push(() => target.removeEventListener(event, fn));
  };
  on(root, "mouseenter", () => {
    hovered = true;
    sync();
  });
  on(root, "mouseleave", () => {
    hovered = false;
    sync();
  });
  on(root, "focusin", () => {
    focused = true;
    sync();
  });
  on(root, "focusout", (e) => {
    focused = root.contains(e.relatedTarget);
    sync();
  });
  on(document, "visibilitychange", sync);
  on(motion, "change", () => {
    if (motion.matches) userPaused = true;
    sync();
  });
  const observer =
    typeof IntersectionObserver === "function"
      ? new IntersectionObserver(
          (entries) => {
            visible = entries[0].isIntersecting;
            sync();
          },
          { threshold: 0.15 },
        )
      : null;
  observer?.observe(root);
  heroController = {
    select: (index) => {
      show(index, true);
      sync();
    },
    step: (delta) => {
      show(current + delta, true);
      sync();
    },
    toggle: () => {
      userPaused = !userPaused;
      sync();
    },
    sync,
  };
  stopHero = () => {
    clear();
    events.forEach((off) => off());
    observer?.disconnect();
  };
  sync();
}
// Public Shopee listing ratings, retrieved 2026-10-10. No review text or customer identity inferred.
const BUYER_RATINGS = [
  {
    label: [
      "Soocool Official Store",
      "Soocool Official Store",
      "Soocool Official Store",
    ],
    rating: "4.9",
    detail: ["Shopee 店铺评分", "Shopee store rating", "Penilaian toko Shopee"],
    url: "https://shopee.co.id/soocool.mall",
  },
  {
    label: ["12B 台式制冰机", "12B countertop ice maker", "Mesin es meja 12B"],
    rating: "4.9",
    detail: [
      "Shopee 商品评分",
      "Shopee product rating",
      "Penilaian produk Shopee",
    ],
    url: "https://shopee.co.id/SOOCOOL-12B-Mesin-Pembuat-Es-Batu-Ice-Maker-Mini-1-1-Liter-Mesin-Es-Batu-Portable-Praktis-Dapur-Kantor-i.1548175675.42568318608",
  },
  {
    label: [
      "200–250 kg 商用制冰机",
      "200–250 kg commercial ice maker",
      "Mesin es komersial 200–250 kg",
    ],
    rating: "4.8",
    detail: [
      "Shopee 商品评分",
      "Shopee product rating",
      "Penilaian produk Shopee",
    ],
    url: "https://shopee.co.id/Mesin-Es-Batu-Komersil-SOOCOOL-Ice-Makers-200-250-Kg-Mesin-Pembuat-Es-Batu-Kapasitas-Besar-i.1548175675.24297581354",
  },
];
function buyerFeedback() {
  return `<section class="section buyer-feedback" id="testimonials">${sectionHead("BUYER FEEDBACK", T("买过的人，怎么评价？", "What do buyers think?", "Bagaimana penilaian pembeli?"), T("看看 Shopee 买家评分，也可以到商品页阅读使用反馈。", "Check Shopee buyer ratings and read feedback on the product pages.", "Lihat penilaian pembeli Shopee dan baca ulasan di halaman produk."))}<div class="cards three">${BUYER_RATINGS.map((r) => `<article class="rating-card"><div class="rating-source">${socialIcon("shopee")} ${t(r.detail)}</div><h3>${t(r.label)}</h3><div class="rating-score" aria-label="${r.rating} ${T("分，满分5分", "out of 5", "dari 5")}"><strong>${r.rating}</strong><span>/ 5</span><span class="rating-stars" style="--rating-fill:${Number(r.rating) * 20}%" aria-hidden="true">★★★★★</span></div><a class="btn text" href="${r.url}" target="_blank" rel="noopener noreferrer">${T("到 Shopee 查看评价", "View feedback on Shopee", "Lihat ulasan di Shopee")}${I("arrow")}</a></article>`).join("")}</div></section>`;
}
function iceSceneMarkup(extraClass = "") {
  return `<div class="ice-scene ${extraClass}"><div class="ice-scene-art" role="img" aria-label="${T("三个冷蓝色立体粒子冰块", "Three blue three-dimensional particle ice cubes", "Tiga es batu partikel biru tiga dimensi")}"><canvas class="ice-scene-canvas" aria-hidden="true"></canvas><svg class="ice-scene-fallback" viewBox="0 0 460 400" aria-hidden="true"><defs><pattern id="ice-dot-pattern" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.1" fill="#3489eb"/></pattern></defs><g fill="url(#ice-dot-pattern)" stroke="#63b5f4" stroke-width="1.5"><path d="m80 68 51-28 50 29v58l-50 28-51-28Zm0 0 51 29 50-28m-50 28v58"/><path d="m181 189 76-42 74 43v86l-74 43-76-43Zm0 0 76 43 74-42m-74 42v86"/><path d="m330 65 43-24 43 25v50l-43 25-43-25Zm0 0 43 25 43-24m-43 24v51"/></g></svg></div><div class="ice-scene-wordmark"><span>SOOCOOL</span><strong>GOOD ICE.<br>EVERY DAY.</strong></div><button class="ice-motion-toggle" data-play="${T("播放冰块动画", "Play ice animation", "Putar animasi es")}" data-pause="${T("暂停冰块动画", "Pause ice animation", "Jeda animasi es")}" aria-label="${T("暂停冰块动画", "Pause ice animation", "Jeda animasi es")}" aria-pressed="false">Ⅱ</button></div>`;
}
let stopIceScene = () => {};
function homePage() {
  return pageTemplates.homePage(pageContext());
}
function filtered() {
  const q = state.query.trim().toLowerCase();
  return PRODUCTS.filter(
    (p) =>
      (state.category === "all" || p.category === state.category) &&
      (!q ||
        [p.code, productTitle(p), productDesc(p), p.production]
          .join(" ")
          .toLowerCase()
          .includes(q)),
  );
}
function productGrid() {
  const list = filtered();
  return list.length
    ? list.map(card).join("")
    : `<div class="empty-state">${I("search")}<h3>${T("没有匹配的产品", "No matching products", "Tidak ada produk yang cocok")}</h3><p>${T("尝试其他型号或清除筛选。", "Try another model or clear the filters.", "Coba model lain atau hapus filter.")}</p>${btn(T("清除筛选", "Clear filters", "Hapus filter"), "clear", "", "secondary")}</div>`;
}
function productsPage() {
  return pageTemplates.productsPage(pageContext());
}
function productPage() {
  return pageTemplates.productPage(pageContext());
}
function calcNumbers() {
  const { cups, grams, peak, margin } = state.calc;
  const valid =
    Object.values(state.calc).every(Number.isFinite) &&
    cups > 0 &&
    cups <= 100000 &&
    grams > 0 &&
    grams <= 5000 &&
    peak > 0 &&
    peak <= cups &&
    margin >= 0 &&
    margin <= 200;
  return {
    valid,
    daily: ((cups * grams) / 1000) * (1 + margin / 100),
    peak: (peak * grams) / 1000,
  };
}
function calcResult() {
  const n = calcNumbers();
  return n.valid
    ? `<strong>${n.daily.toLocaleString(lang, { maximumFractionDigits: 1 })} kg / ${T("天", "day", "hari")}</strong><p>${T("高峰一小时取冰", "Peak-hour ice demand", "Kebutuhan es satu jam sibuk")}: ${n.peak.toLocaleString(lang, { maximumFractionDigits: 1 })} kg</p><p>${T("按输入的杯量、单杯加冰量和余量估算，仅包含饮品用冰。需另计厨房及其他用冰，高峰供冰还需核对储冰与实际产冰速度。", "Estimate from the entered drink count, ice per drink and buffer; beverage use only. Add kitchen and other use separately, and check storage and actual replenishment for peak hours.", "Perkiraan dari jumlah minuman, es per minuman, serta cadangan; hanya penggunaan minuman. Tambahkan dapur dan penggunaan lain, lalu periksa penyimpanan serta pengisian saat jam sibuk.")}</p>`
    : `<p role="alert">${T("请填写有效数值。杯量和克数须大于0，高峰杯量不得超过每日杯量，余量为0–200%。", "Enter valid numbers. Drinks and grams must be positive, peak drinks cannot exceed daily drinks, and buffer must be 0–200%.", "Masukkan angka yang valid. Minuman dan gram harus positif, minuman jam sibuk tidak boleh melebihi harian, dan cadangan 0–200%.")}</p>`;
}
function solutionsPage() {
  return pageTemplates.solutionsPage(pageContext());
}
function partnersPage() {
  return pageTemplates.partnersPage(pageContext());
}
function aboutPage() {
  return pageTemplates.aboutPage(pageContext());
}
const FAQ = [
  [
    [
      "日产量和储冰量有什么区别？",
      "How do production and storage differ?",
      "Apa perbedaan produksi dan penyimpanan?",
    ],
    [
      "日产量是24小时的制冰能力，储冰量是桶内可暂存的冰量。高峰时段需要同时看储备和补冰速度；实际产能会随环境与进水条件变化。",
      "Production is the amount made over 24 hours; storage is the ice held in the bin. Peak demand requires both stored ice and replenishment. Actual output varies with ambient and water conditions.",
      "Produksi adalah es yang dibuat dalam 24 jam; penyimpanan adalah es yang ditampung. Kebutuhan puncak memerlukan stok serta pengisian. Produksi nyata berubah sesuai udara dan air.",
    ],
  ],
  [
    [
      "ES-48A 和 ES-48B 可以用桶装水吗？",
      "Can ES-48A and ES-48B use bottled water?",
      "Apakah ES-48A dan ES-48B bisa memakai air galon?",
    ],
    [
      "这两款支持桶装水和自来水两种进水方式。安装时按对应型号连接，并保持进水与排水通畅。",
      "Both support bottled and mains water supply. Follow the exact model connection instructions and keep inlet and drainage clear.",
      "Keduanya mendukung air galon dan air keran. Ikuti sambungan model dan jaga air masuk serta drainase lancar.",
    ],
  ],
  [
    [
      "如何查询价格和配送？",
      "How can I check prices and delivery?",
      "Bagaimana mengetahui harga dan pengiriman?",
    ],
    [
      "请提供型号、台数和收货城市。团队将按订单确认报价、税费、运费和交付安排。线上渠道的成交价格与活动以店铺页面为准。",
      "Share models, quantities and delivery city. The team will confirm the quote, taxes, shipping and delivery for the order. Online prices and promotions follow the store page.",
      "Sampaikan model, jumlah, dan kota tujuan. Tim akan mengonfirmasi penawaran, pajak, ongkir, serta pengiriman. Harga dan promosi online mengikuti halaman toko.",
    ],
  ],
  [
    [
      "如何申请售后支持？",
      "How do I request service?",
      "Bagaimana meminta layanan purnajual?",
    ],
    [
      "准备型号、序列号、购买凭证和问题描述，通过 WhatsApp 联系团队。保修范围按型号与购买条款核对，服务方式按设备所在城市安排。",
      "Prepare model, serial number, proof of purchase and issue details, then contact the team on WhatsApp. Warranty follows model and purchase terms; service arrangements depend on location.",
      "Siapkan model, nomor seri, bukti pembelian, dan masalah lalu hubungi tim melalui WhatsApp. Garansi mengikuti model serta ketentuan pembelian; layanan disesuaikan dengan lokasi.",
    ],
  ],
  [
    [
      "OEM 起订量和交期如何确认？",
      "How are OEM quantities and lead times agreed?",
      "Bagaimana menentukan MOQ dan waktu produksi OEM?",
    ],
    [
      "提供目标市场、产品、品牌和包装要求后，团队评估打样、采购量和生产安排，按书面报价与合同确认。",
      "Share the market, product, brand and packaging requirements. The team will assess samples, quantity and production, then agree the written quotation and contract.",
      "Sampaikan pasar, produk, merek, serta kemasan. Tim menilai sampel, jumlah, dan produksi lalu menyepakati penawaran serta kontrak tertulis.",
    ],
  ],
];
function supportPage() {
  return pageTemplates.supportPage(pageContext());
}
function guideBody(id) {
  const g = GUIDES[id];
  return `<p class="lead">${t(g.intro)}</p>${g.sections.map((s) => `<section class="guide-block"><h3>${t(s.h)}</h3><p>${t(s.p)}</p></section>`).join("")}`;
}
function resourcesPage() {
  return pageTemplates.resourcesPage(pageContext());
}
function form(service = false, prefill = "") {
  const current = state.forms[service ? "service" : "product"];
  const value = (key) => esc(current[key] || "");
  return `<form data-inquiry="${service ? "service" : "product"}" novalidate><div class="form-grid"><label class="field">${T("姓名", "Name", "Nama")} *<input name="name" value="${value("name")}" autocomplete="name" required maxlength="120"></label><label class="field">${T("城市", "City", "Kota")} *<input name="city" value="${value("city")}" required maxlength="120" placeholder="Jakarta / Surabaya / …"></label><label class="field">${T("联系方式", "Your contact", "Kontak Anda")} *<input name="contact" value="${value("contact")}" required maxlength="150" placeholder="${T("邮箱或含国家码的电话号码", "Email or phone with country code", "Email atau nomor dengan kode negara")}"></label><label class="field">${service ? T("型号 / 序列号", "Model / serial number", "Model / nomor seri") : T("公司 / 门店（选填）", "Company / store (optional)", "Perusahaan / toko (opsional)")}<input name="company" value="${value("company")}" maxlength="180"></label><label class="field full">${service ? T("故障现象与发生时间", "Symptoms and timing", "Gejala dan waktu") : T("采购或合作需求", "Purchasing or partnership needs", "Kebutuhan pembelian atau kemitraan")} *<textarea name="need" required maxlength="5000" rows="5">${value("need")}</textarea></label></div><label class="checkbox-line"><input type="checkbox" name="consent" ${current.consent ? "checked" : ""} required><span>${T("我同意将以上内容用于回复本次咨询。", "I agree to use these details to respond to this enquiry.", "Saya setuju informasi ini digunakan untuk menanggapi permintaan ini.")} <button type="button" data-action="legal" data-value="privacy" style="text-decoration:underline">${T("隐私说明", "Privacy notice", "Privasi")}</button></span></label><div class="form-error" role="alert" id="inquiry-error"></div><button class="btn primary full" type="submit">${T("继续发送咨询", "Continue to send", "Lanjutkan pengiriman")}${I("arrow")}</button><p class="form-hint">${T("下一步选择 WhatsApp 或邮件，确认消息后发送。", "Choose WhatsApp or email next, then confirm and send the message.", "Pilih WhatsApp atau email berikutnya, lalu konfirmasikan dan kirim pesan.")}</p></form>`;
}
function contactPage() {
  return pageTemplates.contactPage(pageContext());
}
function legal(type) {
  return type === "privacy"
    ? `<div class="legal-text"><h3>${T("咨询信息", "Enquiry details", "Informasi permintaan")}</h3><p>${T("你填写的姓名、城市、联系方式和需求用于本次咨询。填写时信息保留在当前页面，网站不自动上传表单。你选择 WhatsApp 或邮件并确认发送后，信息通过所选渠道发送给联系团队。", "Your name, city, contact and requirements are used for this enquiry. Entries remain in the current page; this website does not automatically upload the form. After you choose WhatsApp or email and confirm sending, the details are sent through that channel to the contact team.", "Nama, kota, kontak, serta kebutuhan digunakan untuk permintaan ini. Isian tetap berada pada halaman ini; situs tidak mengunggah formulir secara otomatis. Setelah memilih WhatsApp atau email dan mengonfirmasi pengiriman, informasi dikirim melalui kanal tersebut kepada tim.")}</p><h3>${T("语言偏好与第三方渠道", "Language preference and external services", "Preferensi bahasa dan layanan eksternal")}</h3><p>${T("网站在浏览器中保存语言偏好，便于下次访问使用同一语言。已选的对比型号保留到本次浏览结束。WhatsApp、邮件和电商平台按各自隐私规则处理信息。请勿在咨询中填写支付密码或其他敏感凭据。", "The website stores your language preference in the browser for future visits. Selected comparison models remain for this browsing session. WhatsApp, email and e-commerce platforms handle data under their own privacy rules. Do not include payment passwords or other sensitive credentials in enquiries.", "Situs menyimpan preferensi bahasa di browser untuk kunjungan berikutnya. Model pembanding tersimpan selama sesi penjelajahan ini. WhatsApp, email, serta platform e-commerce menangani data sesuai aturan privasi masing-masing. Jangan memasukkan kata sandi pembayaran atau kredensial sensitif.")}</p><h3>${T("联系", "Contact", "Kontak")}</h3><p>${T("关于已发送咨询信息的更正、删除或隐私问题，请联系：", "For corrections, deletion or privacy questions about sent enquiries, contact:", "Untuk koreksi, penghapusan, atau pertanyaan privasi terkait permintaan yang telah dikirim, hubungi:")} ${CONTACT.email}</p></div>`
    : `<div class="legal-text"><h3>${T("产品与交易", "Products and orders", "Produk dan pesanan")}</h3><p>${T("网站用于产品了解、选型和业务咨询。产冰量受环境、进水与安装条件影响；设备配置按对应型号、铭牌及随箱资料核对。价格、库存、税费、运费、交货和保修以实际订单、销售渠道及书面约定为准。", "This website provides product information, selection tools and business enquiries. Production depends on ambient, water and installation conditions. Check configuration against the exact model, nameplate and supplied documents. Pricing, stock, taxes, freight, delivery and warranty follow the order, sales channel and written agreement.", "Situs menyediakan informasi produk, alat pemilihan, dan permintaan bisnis. Produksi bergantung pada udara, air, serta pemasangan. Periksa konfigurasi sesuai model, pelat nama, dan dokumen. Harga, stok, pajak, ongkir, pengiriman, serta garansi mengikuti pesanan, kanal penjualan, dan perjanjian tertulis.")}</p><h3>${T("工具与资料", "Tools and documents", "Alat dan dokumen")}</h3><p>${T("用冰计算器根据访客输入估算饮品用冰量，不代替现场评估。指南用于采购和日常准备，具体安装、清洁及操作以对应设备说明书为准。", "The calculator estimates beverage demand from visitor inputs and does not replace a site assessment. Guides help with purchasing and preparation; use the exact machine manual for installation, cleaning and operation.", "Kalkulator memperkirakan kebutuhan minuman dari masukan pengunjung dan tidak menggantikan penilaian lokasi. Panduan membantu pembelian serta persiapan; gunakan manual mesin untuk pemasangan, pembersihan, dan operasi.")}</p><h3>${T("内容使用", "Content use", "Penggunaan konten")}</h3><p>${T("品牌标识、产品图片与资料属于相应权利人。商业转载或再发布请事先联系获得许可。", "Brand marks, product photographs and documents belong to their respective rights holders. Contact us for permission before commercial reuse or republication.", "Merek, foto produk, serta dokumen adalah milik pemegang hak masing-masing. Hubungi kami untuk izin sebelum penggunaan komersial atau publikasi ulang.")}</p></div>`;
}
function waURL(text = "", director = false) {
  return (
    "https://wa.me/" +
    (director ? CONTACT.director : CONTACT.sales) +
    "?text=" +
    encodeURIComponent(
      text ||
        T(
          "你好，我想咨询 SOOCOOL 制冰设备、价格与交付。",
          "Hello, I would like to ask about SOOCOOL ice makers, pricing and delivery.",
          "Halo, saya ingin bertanya tentang mesin es SOOCOOL, harga, dan pengiriman.",
        ),
    )
  );
}
function openModal(kind, context = {}) {
  if (
    (kind === "inquiry" || kind === "service") &&
    context.prefill !== undefined
  )
    state.forms[kind === "service" ? "service" : "product"].need =
      context.prefill;
  lastFocus = document.activeElement;
  modal = { kind, ...context };
  heroController?.sync();
  document.body.style.overflow = "hidden";
  drawModal();
  stopIceScene.refresh?.();
  requestAnimationFrame(() =>
    $("#modal-title")?.focus({ preventScroll: true }),
  );
}
function closeModal() {
  modal = null;
  $("#modal-root").innerHTML = "";
  document.body.style.overflow = "";
  if (lastFocus?.isConnected) lastFocus.focus({ preventScroll: true });
  heroController?.sync();
  stopIceScene.refresh?.();
}
function compareBody() {
  const ps = state.compare.map(find);
  return `<p class="lead">${productionNote()}</p><div class="table-scroll"><table class="compare-table"><thead><tr><th>${T("参数", "Specification", "Spesifikasi")}</th>${ps.map((p) => `<th>${p.code}</th>`).join("")}</tr></thead><tbody>${[
    [
      T("制冰量", "Daily production", "Produksi harian"),
      (p) => p.production + " kg / 24h",
    ],
    [T("储冰量", "Storage", "Penyimpanan"), (p) => p.storage + " kg"],
    [
      T("功率", "Power", "Daya"),
      (p) =>
        p.power
          ? p.power + " W"
          : T("请咨询此型号", "Ask about this model", "Tanyakan model ini"),
    ],
    [T("进水方式", "Inlet", "Air masuk"), inlet],
    [
      T("机器尺寸（mm）", "Dimensions (mm)", "Dimensi (mm)"),
      (p) =>
        p.dimensions
          ? dimensions(p.dimensions)
          : T("请咨询此型号", "Ask about this model", "Tanyakan model ini"),
    ],
  ]
    .map(
      ([k, fn]) =>
        `<tr><th scope="row">${k}</th>${ps.map((p) => `<td style="white-space:pre-line">${esc(fn(p))}</td>`).join("")}</tr>`,
    )
    .join(
      "",
    )}<tr><th>${T("报价", "Quotation", "Penawaran")}</th>${ps.map((p) => `<td>${btn(T("咨询报价", "Request quote", "Minta penawaran"), "product-inquiry", p.id, "secondary small", null)}</td>`).join("")}</tr></tbody></table></div>`;
}
function drawModal() {
  if (!modal) return;
  let title = "",
    body = "",
    foot = "",
    wide = false;
  switch (modal.kind) {
    case "inquiry":
    case "service":
      title =
        modal.kind === "service"
          ? T("售后咨询", "After-sales enquiry", "Permintaan purnajual")
          : T(
              "产品与业务咨询",
              "Product & business enquiry",
              "Permintaan produk & bisnis",
            );
      body = form(modal.kind === "service", modal.prefill || "");
      break;
    case "guide": {
      const g = GUIDES[modal.id];
      if (!g) {
        closeModal();
        return;
      }
      title = t(g.title);
      body = guideBody(modal.id);
      foot = btn(
        T("下载指南", "Download guide", "Unduh panduan"),
        "download-guide",
        modal.id,
        "secondary",
        "download",
      );
      break;
    }
    case "compare":
      title = T(
        "型号参数对比",
        "Compare specifications",
        "Bandingkan spesifikasi",
      );
      body = compareBody();
      wide = true;
      break;
    case "catalogue":
      title = T(
        "SOOCOOL 产品目录",
        "SOOCOOL product catalogue",
        "Katalog produk SOOCOOL",
      );
      wide = true;
      body = `<p class="lead">${productionNote()}</p><div class="table-scroll"><table class="compare-table"><thead><tr>${[T("型号", "Model", "Model"), T("日产量", "Daily output", "Produksi harian"), T("储冰量", "Storage", "Penyimpanan"), T("功率", "Power", "Daya"), T("进水", "Inlet", "Air masuk")].map((n) => `<th>${n}</th>`).join("")}</tr></thead><tbody>${PRODUCTS.map((p) => `<tr><td><a href="${path("product", p.id)}">${p.code}</a></td><td>${p.production} kg / 24h</td><td>${p.storage} kg</td><td>${p.power ? p.power + " W" : "—"}</td><td>${inlet(p)}</td></tr>`).join("")}</tbody></table></div><p class="note mt16">${T("点击型号查看详细参数；更多电气与安装信息可向团队咨询。", "Select a model for detailed specifications; ask the team for additional electrical and installation information.", "Pilih model untuk detail; tanyakan informasi listrik serta pemasangan tambahan kepada tim.")}</p>`;
      foot =
        btn(
          T("下载完整目录", "Download catalogue", "Unduh katalog"),
          "download-catalogue",
          "",
          "secondary",
          "download",
        ) +
        btn(
          T("下载 CSV 参数表", "Download CSV", "Unduh CSV"),
          "download-csv",
          "",
          "secondary",
          "download",
        );
      break;
    case "send":
      title = T(
        "确认咨询内容",
        "Review your enquiry",
        "Periksa permintaan Anda",
      );
      body = `<p class="lead">${T("选择联系渠道，打开消息草稿后确认发送。", "Choose a contact channel, then review and send the message.", "Pilih kanal kontak, lalu periksa dan kirim pesan.")}</p><pre class="summary-box">${esc(state.draft)}</pre>`;
      foot = `<a class="btn secondary" href="mailto:${CONTACT.email}?subject=${encodeURIComponent("SOOCOOL " + T("咨询", "Enquiry", "Permintaan"))}&body=${encodeURIComponent(state.draft)}">${T("通过邮件发送", "Send by email", "Kirim lewat email")}${I("mail")}</a><a class="btn primary" href="${waURL(state.draft, modal.director)}" target="_blank" rel="noopener noreferrer">${T("通过 WhatsApp 发送", "Send via WhatsApp", "Kirim lewat WhatsApp")}${I("whatsapp")}</a>`;
      break;
    case "wa":
      title = modal.director
        ? T("联系合作负责人", "Contact the director", "Hubungi direktur")
        : T(
            "联系产品与服务团队",
            "Contact products & service",
            "Hubungi produk & layanan",
          );
      body = `<p class="lead">${T("WhatsApp 将打开以下消息，确认后即可发送。", "WhatsApp will open this message for you to review and send.", "WhatsApp akan membuka pesan ini untuk diperiksa dan dikirim.")}</p><pre class="summary-box">${esc(modal.text || T("你好，我想咨询 SOOCOOL 制冰设备、价格与交付。", "Hello, I would like to ask about SOOCOOL ice makers, pricing and delivery.", "Halo, saya ingin bertanya tentang mesin es SOOCOOL, harga, dan pengiriman."))}</pre>`;
      foot = `<a class="btn primary" href="${waURL(modal.text, modal.director)}" target="_blank" rel="noopener noreferrer">${T("打开 WhatsApp", "Open WhatsApp", "Buka WhatsApp")}${I("whatsapp")}</a>`;
      break;
    case "legal":
      title =
        modal.id === "privacy"
          ? T("隐私说明", "Privacy notice", "Privasi")
          : T("使用条款", "Terms of use", "Ketentuan");
      body = legal(modal.id);
      if (modal.back)
        foot = btn(
          T("返回咨询", "Back to enquiry", "Kembali ke permintaan"),
          "back-inquiry",
          "",
          "secondary",
        );
      break;
    default:
      closeModal();
      return;
  }
  $("#modal-root").innerHTML =
    `<div class="modal-overlay" data-overlay><section class="modal ${wide ? "wide" : ""}" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header class="modal-header"><div><div class="kicker">SOOCOOL · ${T("产品与服务", "PRODUCTS & SERVICE", "PRODUK & LAYANAN")}</div><h2 id="modal-title" tabindex="-1">${title}</h2></div><button class="modal-close" data-action="close" aria-label="${T("关闭", "Close", "Tutup")}">${I("close")}</button></header><div class="modal-body">${body}</div>${foot ? `<footer class="modal-footer">${foot}</footer>` : ""}</section></div>`;
}
function download(text, name, type = "text/plain;charset=utf-8") {
  const blob = new Blob([type.startsWith("text/csv") ? "\ufeff" : "", text], {
    type,
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  toast(
    T("文件已准备下载。", "File ready for download.", "Berkas siap diunduh."),
  );
}
function guideText(id) {
  const g = GUIDES[id];
  return (
    `SOOCOOL · ${t(g.title)}\n\n${t(g.intro)}\n\n` +
    g.sections.map((s, i) => `${i + 1}. ${t(s.h)}\n${t(s.p)}`).join("\n\n") +
    `\n\nWhatsApp: 0852-8100-8881\nEmail: ${CONTACT.email}\n`
  );
}
function downloadCatalogue() {
  const a = document.createElement("a");
  a.href = CATALOGUE_FILES[lang];
  a.download = `SOOCOOL_catalogue_${lang}.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  toast(
    T("文件已准备下载。", "File ready for download.", "Berkas siap diunduh."),
  );
}
function productText(p) {
  return (
    `SOOCOOL · ${p.code}\n${productTitle(p)}\n\n` +
    specs(p)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n") +
    `\n\n${productionNote()}\n\n${T("报价与采购咨询", "Quotation enquiries", "Permintaan penawaran")}: WhatsApp 0852-8100-8881\n`
  );
}
function catalogueHTML() {
  return `<!doctype html><html lang="${lang === "zh" ? "zh-CN" : lang}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SOOCOOL ${T("产品目录", "Catalogue", "Katalog")}</title><style>body{font:15px Arial,sans-serif;color:#163451;max-width:1000px;margin:40px auto;padding:0 24px;line-height:1.8}h1{color:#1766cf}article{break-inside:avoid;border-top:1px solid #cbdceb;padding:24px 0}table{border-collapse:collapse;width:100%}th,td{padding:7px 12px;border:1px solid #dce5ef;text-align:left;white-space:pre-line}th{width:35%;background:#f1f7ff}@media print{body{margin:0}article{page-break-inside:avoid}}</style><h1>SOOCOOL · ${T("制冰设备产品目录", "Ice maker catalogue", "Katalog mesin es")}</h1><p>${esc(productionNote())}</p><p>WhatsApp 0852-8100-8881 · ${CONTACT.email}</p>${PRODUCTS.map(
    (p) =>
      `<article><h2>${p.code} · ${productTitle(p)}</h2>${p.sharedPhoto ? `<p style="font-size:12px;color:#66809b">${T("产品图展示同系列外观。", "Image shows the series appearance.", "Gambar menunjukkan tampilan seri.")}</p>` : ""}<img src="${esc(p.image)}" alt="${p.code}" style="width:160px;height:200px;object-fit:contain;float:right;margin:0 0 15px 20px"><p>${esc(productDesc(p))}</p><table>${specs(
        p,
      )
        .map(([k, v]) => `<tr><th>${k}</th><td>${esc(v)}</td></tr>`)
        .join("")}</table></article>`,
  ).join("")}</html>`;
}
function csv() {
  const rows = [
    [
      T("型号", "Model", "Model"),
      T("日产量 kg/24h", "Production kg/24h", "Produksi kg/24h"),
      T("储冰量 kg", "Storage kg", "Penyimpanan kg"),
      T("功率 W", "Power W", "Daya W"),
      T("进水方式", "Inlet", "Air masuk"),
      T("机器尺寸 mm", "Dimensions mm", "Dimensi mm"),
      T("电压", "Voltage", "Tegangan"),
    ],
    ...PRODUCTS.map((p) => [
      p.code,
      p.production,
      p.storage,
      p.power ?? "",
      inlet(p),
      dimensions(p.dimensions),
      p.voltage,
    ]),
  ];
  return rows
    .map((row) =>
      row.map((v) => '"' + String(v).replace(/"/g, '""') + '"').join(","),
    )
    .join("\r\n");
}
function toast(text) {
  $("#toast-root").innerHTML =
    `<div class="toast" role="status">${esc(text)}</div>`;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => ($("#toast-root").innerHTML = ""), 3500);
}
function notFound() {
  return `<div class="wrap section"><div class="empty-state"><h1>404</h1><p>${T("页面不存在，请返回产品中心。", "Page not found. Return to products.", "Halaman tidak ditemukan. Kembali ke produk.")}</p>${link("products", T("产品中心", "Products", "Produk"), "primary")}</div></div>`;
}
function render(preserve = false) {
  stopHero();
  stopIceScene();
  const y = scrollY;
  const chrome = header();
  $("#topbar").innerHTML = chrome.topbar;
  $("#header").innerHTML = chrome.header;
  $("#skip-link").textContent = T(
    "跳转到正文",
    "Skip to content",
    "Lewati ke konten",
  );
  const pages = {
    home: homePage,
    products: productsPage,
    product: productPage,
    solutions: solutionsPage,
    partners: partnersPage,
    about: aboutPage,
    support: supportPage,
    resources: resourcesPage,
    contact: contactPage,
  };
  $("#main").innerHTML = (pages[route.page] || notFound)();
  $("#footer").innerHTML = footer();
  $("#utility").innerHTML = utilities();
  document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
  window.scrollTo({ top: preserve ? y : 0, behavior: "instant" });
  startHeroCarousel();
  if (typeof mountIceScene === "function")
    stopIceScene = mountIceScene($(".ice-scene"));
}
function go(page, id = "") {
  location.assign(
    page === "products"
      ? getChoicePath(lang, page, state.category)
      : page === "solutions"
        ? getChoicePath(lang, page, state.scenario)
        : path(page, id),
  );
}
function compareStorage() {
  try {
    return sessionStorage;
  } catch {
    return null;
  }
}

function pageContext() {
  return {
    filtered,
    dimensions,
    GUIDES,
    FAQ,
    form,
    T,
    t,
    esc,
    I,
    path,
    find,
    state,
    route,
    CONTACT,
    PRODUCTS,
    CATEGORIES,
    SCENARIOS,
    HERO_MODELS,
    heroCarousel,
    iceSceneMarkup,
    buyerFeedback,
    sectionHead,
    heading,
    link,
    btn,
    stores,
    card,
    cta,
    art,
    specs,
    productDesc,
    productTitle,
    productionNote,
    categoryName,
    inlet,
    productGrid,
    calcNumbers,
    calcResult,
    guideBody,
    notFound,
  };
}

export function renderMarkup(context) {
  lang = context.locale;
  route = { page: context.page, id: context.id };
  const chrome = header();
  const pages = {
    home: homePage,
    products: productsPage,
    product: productPage,
    solutions: solutionsPage,
    partners: partnersPage,
    about: aboutPage,
    support: supportPage,
    resources: resourcesPage,
    contact: contactPage,
  };
  return `<a class="skip" href="#main" id="skip-link">${T("跳转到正文", "Skip to content", "Lewati ke konten")}</a><div id="topbar">${chrome.topbar}</div><header class="site-header" id="header">${chrome.header}</header><main id="main" tabindex="-1">${(pages[route.page] || notFound)()}</main><div id="footer">${footer()}</div><div id="utility">${utilities()}</div><div id="modal-root"></div><div id="toast-root" aria-live="polite"></div>`;
}
export function mountSite(context) {
  Object.assign(state, readEntryState(location.search, compareStorage()));
  lang = context.locale;
  route = { page: context.page, id: context.id };
  const abort = new AbortController();
  const listen = (target, event, handler) =>
    target.addEventListener(event, handler, { signal: abort.signal });
  listen(document, "click", (e) => {
    const el = e.target.closest("[data-action]");
    if (!el) {
      if (e.target.closest('a[href^="#/"]') && modal) closeModal();
      return;
    }
    const value = el.dataset.value || "";
    switch (el.dataset.action) {
      case "hero-prev":
        heroController?.step(-1);
        break;
      case "hero-next":
        heroController?.step(1);
        break;
      case "hero-select":
        if (/^[0-2]$/.test(value)) heroController?.select(Number(value));
        break;
      case "hero-pause":
        heroController?.toggle();
        break;
      case "menu": {
        const nav = $(".mobile-nav");
        nav.classList.toggle("open");
        el.setAttribute("aria-expanded", nav.classList.contains("open"));
        break;
      }
      case "close":
        closeModal();
        break;
      case "category":
        state.category = value;
        render(true);
        break;
      case "category-go":
        state.category = value;
        state.query = "";
        go("products");
        break;
      case "clear":
        state.category = "all";
        state.query = "";
        render(true);
        break;
      case "detail-tab":
        state.tab = value;
        render(true);
        break;
      case "scenario":
        state.scenario = value;
        render(true);
        break;
      case "scenario-go":
        state.scenario = value;
        go("solutions");
        break;
      case "compare": {
        if (!find(value)) break;
        const i = state.compare.indexOf(value);
        if (i >= 0) state.compare.splice(i, 1);
        else if (state.compare.length < 3) state.compare.push(value);
        else {
          toast(
            T(
              "最多对比三款，请先移除一款。",
              "Compare up to three models. Remove one first.",
              "Bandingkan maksimal tiga model. Hapus satu dahulu.",
            ),
          );
          break;
        }
        saveCompare(compareStorage(), state.compare);
        render(true);
        break;
      }
      case "open-compare":
        if (state.compare.length >= 2) openModal("compare");
        break;
      case "inquiry":
        openModal("inquiry");
        break;
      case "product-inquiry": {
        const p = find(value);
        if (p)
          openModal("inquiry", {
            prefill: T(
              `我想咨询 ${p.code} 的报价、安装要求与交付。`,
              `I would like a quotation, installation details and delivery information for ${p.code}.`,
              `Saya ingin penawaran, informasi pemasangan, dan pengiriman untuk ${p.code}.`,
            ),
          });
        break;
      }
      case "scenario-inquiry": {
        const s = SCENARIOS.find((x) => x.id === value);
        if (s)
          openModal("inquiry", {
            prefill: T(
              `使用场景：${t(s.name)}。请协助选型与报价。`,
              `Application: ${t(s.name)}. Please help with model selection and a quotation.`,
              `Penggunaan: ${t(s.name)}. Mohon bantu pemilihan model dan penawaran.`,
            ),
          });
        break;
      }
      case "partner-inquiry":
        openModal("inquiry", {
          director: true,
          prefill: T(
            `我想咨询${{ dealer: "代理经销", project: "项目与连锁采购", oem: "OEM 品牌合作" }[value] || "合作"}，请提供合作与报价信息。`,
            `I would like to discuss ${value === "oem" ? "OEM" : value === "dealer" ? "distribution" : "project purchasing"} requirements and pricing.`,
            `Saya ingin membahas ${value === "oem" ? "OEM" : value === "dealer" ? "distribusi" : "pembelian proyek"} dan penawaran.`,
          ),
        });
        break;
      case "service":
        openModal("service");
        break;
      case "document-inquiry":
        openModal("inquiry", {
          prefill: T(
            "请提供适用型号的说明书或产品文件。型号：\n销售市场：",
            "Please provide the relevant manual or product documents. Model:\nSales market:",
            "Mohon berikan manual atau dokumen produk yang sesuai. Model:\nPasar penjualan:",
          ),
        });
        break;
      case "calc-inquiry": {
        const n = calcNumbers();
        if (!n.valid) {
          toast(
            T(
              "请先填写有效数值。",
              "Please enter valid values first.",
              "Masukkan nilai yang valid terlebih dahulu.",
            ),
          );
          break;
        }
        openModal("inquiry", {
          prefill: T(
            `饮品用冰估算：${state.calc.cups} 杯/天，每杯 ${state.calc.grams} g，余量 ${state.calc.margin}%，合计 ${n.daily.toFixed(1)} kg/天，高峰 ${n.peak.toFixed(1)} kg/小时。请协助核对型号与储冰配置。`,
            `Beverage estimate: ${state.calc.cups} drinks/day, ${state.calc.grams} g/drink, ${state.calc.margin}% buffer, ${n.daily.toFixed(1)} kg/day and ${n.peak.toFixed(1)} kg in the peak hour. Please help check production and storage.`,
            `Perkiraan minuman: ${state.calc.cups}/hari, ${state.calc.grams} g/minuman, cadangan ${state.calc.margin}%, ${n.daily.toFixed(1)} kg/hari dan ${n.peak.toFixed(1)} kg saat jam sibuk. Mohon bantu periksa produksi dan penyimpanan.`,
          ),
        });
        break;
      }
      case "wa":
      case "director":
        openModal("wa", { director: el.dataset.action === "director" });
        break;
      case "visit":
        openModal("wa", {
          text: T(
            "你好，我想预约雅加达来访，请确认接待地点和时间。",
            "Hello, I would like to arrange a visit in Jakarta. Please confirm the meeting location and time.",
            "Halo, saya ingin membuat janji kunjungan di Jakarta. Mohon konfirmasi lokasi serta waktu.",
          ),
        });
        break;
      case "guide":
        openModal("guide", { id: value });
        break;
      case "legal":
        openModal("legal", {
          id: value,
          back:
            modal && ["inquiry", "service"].includes(modal.kind)
              ? { ...modal }
              : null,
        });
        break;
      case "back-inquiry": {
        const back = modal?.back;
        if (back) {
          delete back.prefill;
          openModal(back.kind, back);
        }
        break;
      }
      case "catalogue":
        openModal("catalogue");
        break;
      case "download-product": {
        const p = find(value);
        if (p) download(productText(p), `SOOCOOL_${p.code}_${lang}.txt`);
        break;
      }
      case "download-guide":
        if (GUIDES[value])
          download(guideText(value), `SOOCOOL_${value}_${lang}.txt`);
        break;
      case "download-catalogue":
        downloadCatalogue();
        break;
      case "download-csv":
        download(csv(), `SOOCOOL_specs_${lang}.csv`, "text/csv;charset=utf-8");
        break;
    }
  });
  listen(document, "input", (e) => {
    const f = e.target.closest("[data-inquiry]");
    if (f && e.target.name)
      state.forms[f.dataset.inquiry][e.target.name] =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (e.target.id === "product-search") {
      state.query = e.target.value;
      $("#product-grid").innerHTML = productGrid();
      $("#product-count").textContent =
        filtered().length + " " + T("款型号", "models", "model");
    }
    if (e.target.dataset.calc) {
      state.calc[e.target.dataset.calc] =
        e.target.value === "" ? NaN : Number(e.target.value);
      $("#calc-output").innerHTML = calcResult();
    }
  });
  listen(document, "change", (e) => {
    const f = e.target.closest("[data-inquiry]");
    if (f && e.target.name)
      state.forms[f.dataset.inquiry][e.target.name] =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (e.target.hasAttribute("data-language")) {
      const next = e.target.value;
      if (!["zh", "en", "id"].includes(next)) return;
      lang = next;
      try {
        localStorage.setItem("soocool-language", lang);
      } catch {}
      go(route.page, route.id);
    }
  });
  listen(document, "submit", (e) => {
    const f = e.target.closest("[data-inquiry]");
    if (!f) return;
    e.preventDefault();
    const v = Object.fromEntries(new FormData(f));
    const validContact =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.contact || "") ||
      (/^\+[\d ().-]{7,25}$/.test(v.contact || "") &&
        String(v.contact).replace(/\D/g, "").length >= 8 &&
        String(v.contact).replace(/\D/g, "").length <= 15);
    let error = "";
    if (
      !["name", "city", "contact", "need"].every((k) =>
        String(v[k] || "").trim(),
      )
    )
      error = T(
        "请填写姓名、城市、联系方式和需求。",
        "Please complete your name, city, contact and requirements.",
        "Lengkapi nama, kota, kontak, serta kebutuhan.",
      );
    else if (!validContact)
      error = T(
        "请填写有效邮箱或以 + 开头、包含国家码的电话号码。",
        "Enter a valid email or a phone number starting with + and the country code.",
        "Masukkan email yang valid atau nomor telepon diawali + dan kode negara.",
      );
    else if (!v.consent)
      error = T(
        "请同意将信息用于回复本次咨询。",
        "Please agree to use the details for this enquiry.",
        "Setujui penggunaan informasi untuk permintaan ini.",
      );
    else if (v.need.length > 5000)
      error = T(
        "需求说明请控制在5000字以内。",
        "Limit the requirements to 5,000 characters.",
        "Batasi kebutuhan hingga 5.000 karakter.",
      );
    if (error) {
      $("#inquiry-error").textContent = error;
      return;
    }
    const service = f.dataset.inquiry === "service";
    state.draft =
      `SOOCOOL · ${service ? T("售后咨询", "Service enquiry", "Permintaan layanan") : T("业务咨询", "Business enquiry", "Permintaan bisnis")}\n\n` +
      [
        [T("姓名", "Name", "Nama"), v.name],
        [T("城市", "City", "Kota"), v.city],
        [T("联系方式", "Contact", "Kontak"), v.contact],
        ...(v.company
          ? [
              [
                service
                  ? T("型号 / 序列号", "Model / serial", "Model / nomor seri")
                  : T("公司 / 门店", "Company / store", "Perusahaan / toko"),
                v.company,
              ],
            ]
          : []),
        [T("需求", "Requirements", "Kebutuhan"), v.need],
      ]
        .map(([k, v]) => k + ": " + String(v).trim())
        .join("\n");
    const director = modal?.director || false;
    openModal("send", { director });
  });
  listen(document, "keydown", (e) => {
    if (!modal) return;
    if (e.key === "Escape") {
      closeModal();
      return;
    }
    if (e.key === "Tab") {
      const elements = [
        ...$(".modal").querySelectorAll(
          "button:not([disabled]),a[href],input:not([disabled]),textarea,select",
        ),
      ].filter((el) => el.getClientRects().length);
      const first = elements[0],
        last = elements.at(-1);
      if (
        e.shiftKey &&
        (document.activeElement === first ||
          document.activeElement === $("#modal-title"))
      ) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
  });
  listen($("#modal-root"), "click", (e) => {
    if (e.target.hasAttribute("data-overlay")) closeModal();
  });
  listen($("#skip-link"), "click", (e) => {
    e.preventDefault();
    $("#main").focus();
    $("#main").scrollIntoView();
  });

  render(true);
  return () => {
    abort.abort();
    stopHero();
    stopIceScene();
    clearTimeout(toast.timer);
    document.body.style.overflow = "";
    modal = null;
  };
}
