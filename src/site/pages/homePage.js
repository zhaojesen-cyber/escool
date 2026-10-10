export function homePage({
  T,
  t,
  I,
  find,
  SCENARIOS,
  heroCarousel,
  iceSceneMarkup,
  buyerFeedback,
  sectionHead,
  link,
  stores,
  card,
  cta,
  inlet,
}) {
  return `<div class="wrap"><section class="hero"><div class="hero-copy"><div class="eyebrow">${T("家用与商用制冰机", "Home & commercial ice makers", "Mesin es untuk rumah dan usaha")}</div><h1>${T('随时有冰用，<br><span class="em">忙时更省心。</span>', 'Ice when you need it.<br><span class="em">Less worry when it’s busy.</span>', 'Es selalu siap.<br><span class="em">Lebih tenang saat ramai.</span>')}</h1><p class="lead">${T("家用、商用、分体式制冰机，按用冰量选合适的机器。需要其他型号或配置，也可以联系我们定制。", "Countertop, commercial and modular ice makers. Choose by the amount of ice you use, or contact us for a custom model or configuration.", "Mesin es meja, komersial, dan modular. Pilih sesuai kebutuhan es Anda, atau hubungi kami untuk model dan konfigurasi khusus.")}</p><div class="hero-actions">${link("products", T("查看产品", "Explore products", "Lihat produk"), "primary")}${link("solutions", T("按需求选型", "Find your machine", "Pilih sesuai kebutuhan"), "secondary")}</div><div class="hero-stores"><span>${T("官方店铺", "Shop online", "Toko online")}</span>${stores()}</div><div class="hero-micro"><span>${I("factory")}${T("研发与制造", "R&D & manufacturing", "R&D & manufaktur")}</span><span>${I("pin")}${T("印尼团队", "Indonesia team", "Tim Indonesia")}</span><span>${I("tool")}${T("使用与售后支持", "Product support", "Dukungan produk")}</span></div></div>${iceSceneMarkup("hero-ice")}</section><div class="trust-strip">${[
    [
      "snow",
      T("多种机型", "A machine for your needs", "Pilihan sesuai kebutuhan"),
      T(
        "家用 · 商用 · 项目",
        "Home · business · projects",
        "Rumah · usaha · proyek",
      ),
    ],
    [
      "layers",
      T("按需定制", "Customisation", "Kustomisasi"),
      T(
        "不限目录机型，按需求沟通",
        "Custom models and configurations",
        "Model dan konfigurasi sesuai kebutuhan",
      ),
    ],
    [
      "pin",
      T("立足印尼", "Based in Indonesia", "Berbasis di Indonesia"),
      T(
        "销售咨询与使用支持",
        "Sales advice & product support",
        "Konsultasi & dukungan produk",
      ),
    ],
    [
      "people",
      T("采购与合作", "Purchasing & partnerships", "Pembelian & kemitraan"),
      T(
        "经销 · 项目 · OEM",
        "Distribution · projects · OEM",
        "Distribusi · proyek · OEM",
      ),
    ],
  ]
    .map(
      ([ic, h, p]) =>
        `<div class="trust-item">${I(ic)}<div><strong>${h}</strong><small>${p}</small></div></div>`,
    )
    .join(
      "",
    )}</div><section class="section">${sectionHead("PRODUCT RANGE", T("家用、商用、分体机，满足不同用冰需求。", "For your home, shop or larger ice supply.", "Untuk rumah, toko, dan suplai es skala besar."), T("查看不同产能、储冰量和进水方式，按实际需求比较型号。", "Compare production, storage and inlet options for your needs.", "Bandingkan produksi, penyimpanan, dan suplai air sesuai kebutuhan."), link("products", T("全部产品", "All products", "Semua produk")))}<div class="cards three">${["es12b", "es48b", "es200f"].map((id) => card(find(id))).join("")}</div></section><section class="split-feature"><div class="feature-copy"><h2>${T("用多少冰，<br>就选多大的机器。", "How much ice do you use?<br>Let’s find the right size.", "Berapa banyak es yang dipakai?<br>Pilih kapasitas yang pas.")}</h2><p class="lead">${T("店里每天卖多少杯、最忙的时候用多少冰、机器放在哪里？把这些告诉我们，再一起看看产能、储冰量和进水方式。", "How many drinks do you sell, how much ice do you need at peak time, and where will the machine go? Share these details and we’ll help check output, storage and water supply.", "Berapa minuman yang terjual, berapa es saat ramai, dan di mana mesin ditempatkan? Sampaikan detailnya agar kami membantu memeriksa produksi, penyimpanan, dan suplai air.")}</p><div class="quick-industries">${SCENARIOS.map((s) => `<button data-action="scenario-go" data-value="${s.id}">${t(s.name)}</button>`).join("")}</div><div class="mt24">${link("solutions", T("使用选型工具", "Open selection tools", "Buka alat pemilihan"), "white")}</div></div>${heroCarousel()}</section><section class="section home-manufacturing"><div><h2>${T("在中国生产，<br>在印尼为您服务。", "Manufactured in China.<br>Supported in Indonesia.", "Produksi di Tiongkok.<br>Layanan di Indonesia.")}</h2><p class="lead">${T("中国团队负责研发与制造，印尼团队提供选购与使用支持。型号、安装条件或售后问题，都可以直接联系我们。", "Our China teams develop and manufacture the equipment. Our Indonesia team helps with purchasing, installation requirements and product support.", "Tim Tiongkok mengembangkan dan memproduksi mesin. Tim Indonesia membantu pemilihan, kebutuhan pemasangan, dan dukungan penggunaan.")}</p>${link("about", T("了解 SOOCOOL", "About SOOCOOL", "Tentang SOOCOOL"))}</div><div class="manufacturing-photos"><figure><img src="/assets/factory-jiumai.webp" width="354" height="199" loading="lazy" alt="${T("宁波久迈电器生产现场", "Ningbo Jiumai production facility", "Fasilitas produksi Ningbo Jiumai")}"><figcaption>${T("宁波久迈电器 · 整机制造", "Ningbo Jiumai · machine manufacturing", "Ningbo Jiumai · manufaktur mesin")}</figcaption></figure><figure><img src="/assets/factory-haoyuan.webp" width="297" height="193" loading="lazy" alt="${T("宁波皓源智能科技生产现场", "Ningbo Haoyuan production facility", "Fasilitas produksi Ningbo Haoyuan")}"><figcaption>${T("宁波皓源智能科技 · 控制研发", "Ningbo Haoyuan · control development", "Ningbo Haoyuan · pengembangan kontrol")}</figcaption></figure></div></section><section class="section home-services">${sectionHead("BEYOND THE MACHINE", T("选购、安装、维护，都可以找我们。", "Help with purchasing, installation and care.", "Bantuan pembelian, pemasangan, dan perawatan."))}<div class="cards three">${[
    [
      "partners",
      "people",
      T("批量采购与 OEM", "Bulk purchasing & OEM", "Grosir & OEM"),
      T(
        "按型号、台数和收货城市报价，沟通品牌与包装需求。",
        "Request a quote by model, quantity and city. Discuss branding and packaging.",
        "Minta penawaran sesuai model, jumlah, dan kota. Bahas merek serta kemasan.",
      ),
    ],
    [
      "support",
      "tool",
      T("安装与售后", "Installation & service", "Pemasangan & purnajual"),
      T(
        "核对供排水、配电和设备空间，提交设备问题与购买信息。",
        "Check water, power and space. Share machine issues and purchase information.",
        "Periksa air, listrik, dan ruang. Sampaikan masalah mesin serta pembelian.",
      ),
    ],
    [
      "resources",
      "book",
      T("产品目录与指南", "Catalogue & guides", "Katalog & panduan"),
      T(
        "下载完整型号目录，阅读选型、安装和日常维护指南。",
        "Download the model catalogue and read selection, installation and care guides.",
        "Unduh katalog model dan baca panduan pemilihan, pemasangan, serta perawatan.",
      ),
    ],
  ]
    .map(
      ([pg, ic, h, p]) =>
        `<article class="simple-card"><div class="icon-box">${I(ic)}</div><h3>${h}</h3><p>${p}</p>${link(pg, T("查看内容", "Explore", "Lihat informasi"))}</article>`,
    )
    .join("")}</div></section>${buyerFeedback()}${cta()}</div>`;
}
