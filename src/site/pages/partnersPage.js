export function partnersPage({
  T,
  t,
  I,
  sectionHead,
  heading,
  btn,
  card,
  cta,
}) {
  const items = [
    [
      "dealer",
      "people",
      T("代理与经销", "Distribution", "Agen & distribusi"),
      T(
        "面向厨具设备商、渠道商和本地服务合作方。",
        "For kitchen-equipment businesses, distributors and local service partners.",
        "Untuk usaha peralatan dapur, distributor, dan mitra layanan lokal.",
      ),
      [
        [
          "经营区域和现有客户群",
          "Territory and customer base",
          "Wilayah dan pelanggan",
        ],
        [
          "采购计划、展示和推广安排",
          "Purchasing, display and promotion plans",
          "Pembelian, display, dan promosi",
        ],
        [
          "售后能力与备件需求",
          "Service capability and spare parts",
          "Kemampuan layanan dan suku cadang",
        ],
      ],
    ],
    [
      "project",
      "layers",
      T("项目与连锁采购", "Projects & chains", "Proyek & jaringan"),
      T(
        "按门店、城市和采购批次组织设备配置。",
        "Plan equipment by store, city and purchasing batch.",
        "Atur mesin per toko, kota, dan tahap pembelian.",
      ),
      [
        [
          "使用场景、产能和储冰要求",
          "Application, production and storage",
          "Penggunaan, produksi, dan penyimpanan",
        ],
        [
          "现场尺寸、供排水与配电",
          "Site dimensions, water and power",
          "Dimensi lokasi, air, dan listrik",
        ],
        [
          "交付城市、安装和验收安排",
          "Delivery, installation and acceptance",
          "Pengiriman, pemasangan, dan penerimaan",
        ],
      ],
    ],
    [
      "oem",
      "factory",
      T("OEM 品牌合作", "OEM partnerships", "Kemitraan OEM"),
      T(
        "沟通目标市场、品牌标识、产品配置和包装要求。",
        "Discuss target markets, branding, configuration and packaging.",
        "Bahas pasar sasaran, merek, konfigurasi, dan kemasan.",
      ),
      [
        [
          "目标市场与产品需求",
          "Target market and product brief",
          "Pasar sasaran dan kebutuhan produk",
        ],
        [
          "数量、包装语言与品牌文件",
          "Quantity, languages and brand assets",
          "Jumlah, bahasa, dan aset merek",
        ],
        [
          "样品确认、质量和交付要求",
          "Samples, quality and delivery",
          "Sampel, mutu, dan pengiriman",
        ],
      ],
    ],
  ];
  return `<div class="wrap">${heading("PARTNERSHIPS", T("批量采购与品牌合作", "Purchasing & brand partnerships", "Pembelian & kemitraan merek"), T("经销、项目采购和 OEM 按需求报价。提供型号、数量、市场与交付计划，团队会与你沟通适用方案。", "Distribution, project purchasing and OEM are quoted for your requirements. Share models, quantities, markets and delivery plans to discuss the right arrangement.", "Distribusi, proyek, dan OEM ditawarkan sesuai kebutuhan. Sampaikan model, jumlah, pasar, serta rencana pengiriman untuk membahas pengaturan yang sesuai."))}<div class="cards three">${items.map(([id, ic, h, p, points]) => `<article class="simple-card"><div class="icon-box">${I(ic)}</div><h3>${h}</h3><p>${p}</p><ol class="number-list">${points.map((n, i) => `<li><span class="step-num">0${i + 1}</span><span>${t(n)}</span></li>`).join("")}</ol>${btn(T("联系合作团队", "Discuss a partnership", "Bahas kemitraan"), "partner-inquiry", id, "primary small")}</article>`).join("")}</div><section class="section">${sectionHead("FROM BRIEF TO DELIVERY", T("想采购或定制？从您的需求开始聊。", "Buying or customising? Tell us what you need.", "Mau membeli atau kustom? Ceritakan kebutuhan Anda."))}<div class="cards three">${[
    [
      T("需求沟通", "Requirements", "Kebutuhan"),
      T(
        "明确型号、数量、城市、安装条件及品牌要求。",
        "Agree models, quantities, cities, site conditions and branding.",
        "Tentukan model, jumlah, kota, kondisi lokasi, serta merek.",
      ),
    ],
    [
      T("配置与报价", "Configuration & quotation", "Konfigurasi & penawaran"),
      T(
        "核对配置、样品、价格和订单条款。",
        "Confirm configuration, samples, pricing and order terms.",
        "Konfirmasikan konfigurasi, sampel, harga, serta ketentuan pesanan.",
      ),
    ],
    [
      T("交付与使用支持", "Delivery & support", "Pengiriman & dukungan"),
      T(
        "安排交货、验收和使用资料，明确售后联系渠道。",
        "Plan delivery, acceptance, usage documents and service contacts.",
        "Atur pengiriman, penerimaan, dokumen penggunaan, serta kontak layanan.",
      ),
    ],
  ]
    .map(
      ([h, p], i) =>
        `<article class="simple-card"><div class="eyebrow">0${i + 1}</div><h3>${h}</h3><p>${p}</p></article>`,
    )
    .join(
      "",
    )}</div><div class="mt24">${btn(T("阅读采购与 OEM 指南", "Read purchasing & OEM guide", "Baca panduan grosir & OEM"), "guide", "procurement", "secondary", "book")}</div></section>${cta()}</div>`;
}
