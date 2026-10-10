export function aboutPage({
  T,
  t,
  I,
  PRODUCTS,
  CATEGORIES,
  sectionHead,
  heading,
  link,
  btn,
  card,
  cta,
}) {
  return `<div class="wrap">${heading("ABOUT SOOCOOL", T("做适合您使用的制冰机。", "Ice makers that fit the way you use them.", "Mesin es yang sesuai dengan pemakaian Anda."), T("SOOCOOL 面向印尼家庭和商业客户提供制冰设备。中国研发与制造团队和印尼运营团队协作，把产品选型、采购和后续使用连接起来。", "SOOCOOL supplies ice makers for homes and businesses in Indonesia. Chinese development and manufacturing teams work with Indonesian operations on selection, purchasing and ongoing use.", "SOOCOOL menyediakan mesin es untuk rumah serta usaha di Indonesia. Tim pengembangan dan manufaktur Tiongkok bekerja bersama operasi Indonesia dalam pemilihan, pembelian, serta penggunaan."))}<section class="brand-banner"><div><h2>${T("家里用、店里用，<br>选合适的就好。", "For your home or your business.<br>Choose a machine that fits.", "Untuk rumah atau usaha.<br>Pilih mesin yang pas.")}</h2><p>${T("每天用多少冰、机器放在哪、水源怎么接，都会影响机型选择。现有目录里没有您要的型号，也可以联系我们定制，配置和交付按实际需求确认。", "Daily ice use, placement and water supply all affect the choice. If the catalogue doesn’t include the model you need, contact us for customisation. We’ll agree the configuration and delivery for your requirements.", "Pemakaian es harian, tempat, dan suplai air memengaruhi pilihan mesin. Jika model yang dibutuhkan belum ada di katalog, hubungi kami untuk kustomisasi. Konfigurasi serta pengiriman disepakati sesuai kebutuhan.")}</p></div><div class="brand-stat"><div>${I("sliders")}<strong>${T("按需定制", "Made to fit", "Sesuai kebutuhan")}</strong><small>${T("不限目录机型，型号与配置按您的需求沟通", "Models and configurations beyond the catalogue", "Model dan konfigurasi di luar katalog")}</small></div><div>${I("pin")}<strong>${T("本地服务", "Local support", "Dukungan lokal")}</strong><small>${T("印尼团队，选型、采购与售后可直接联系", "Contact our Indonesia team for purchasing and service", "Hubungi tim Indonesia untuk pembelian dan layanan")}</small></div></div></section><section class="section">${sectionHead("MANUFACTURING & LOCAL OPERATIONS", T("研发、制造与印尼运营", "Development, manufacturing and Indonesia operations", "Pengembangan, manufaktur, dan operasi Indonesia"))}<div class="cards three"><article class="simple-card"><img class="company-photo" src="/assets/factory-jiumai.webp" alt="${T("宁波久迈电器生产现场", "Ningbo Jiumai production facility", "Fasilitas produksi Ningbo Jiumai")}" loading="lazy"><h3>${T("宁波久迈电器有限公司", "Ningbo Jiumai Electric Appliance Co., Ltd.", "Ningbo Jiumai Electric Appliance Co., Ltd.")}</h3><p>${T("负责制冰设备整机制造，衔接产品装配与生产交付。", "Complete-machine manufacturing, product assembly and production delivery.", "Manufaktur mesin lengkap, perakitan produk, dan pengiriman produksi.")}</p></article><article class="simple-card"><img class="company-photo" src="/assets/factory-haoyuan.webp" alt="${T("宁波皓源智能科技生产现场", "Ningbo Haoyuan facility", "Fasilitas Ningbo Haoyuan")}" loading="lazy"><h3>${T("宁波皓源智能科技有限公司", "Ningbo Haoyuan Intelligent Technology Co., Ltd.", "Ningbo Haoyuan Intelligent Technology Co., Ltd.")}</h3><p>${T("负责主控电路板和控制程序研发，配合设备制造与产品配置。", "Control-board and control-software development for equipment manufacturing and configuration.", "Pengembangan papan kontrol serta perangkat lunak untuk manufaktur dan konfigurasi mesin.")}</p></article><article class="simple-card"><div class="icon-box">${I("pin")}</div><h3>PT ESCOOL ELECTRONIC INDONESIA</h3><p>${T("面向印尼市场开展品牌运营、产品销售、采购咨询和使用支持。", "Brand operations, product sales, purchasing enquiries and product support in Indonesia.", "Operasi merek, penjualan produk, konsultasi pembelian, serta dukungan penggunaan di Indonesia.")}</p>${link("contact", T("联系印尼团队", "Contact the Indonesia team", "Hubungi tim Indonesia"))}</article></div></section><section class="section tight">${sectionHead("OUR PRODUCTS", T("用冰多或少，都有适合的选择。", "A choice for lighter or heavier ice demand.", "Pilihan untuk kebutuhan es kecil maupun besar."))}<div class="cards four">${CATEGORIES.slice(
    1,
  )
    .map(
      ([id, n]) =>
        `<article class="simple-card"><div class="icon-box">${I("snow")}</div><h3>${t(n)}</h3><p>${T("查看现有机型，也可咨询您需要的型号与配置。", "Explore current models or ask for the model and configuration you need.", "Lihat model saat ini atau tanyakan model dan konfigurasi yang Anda butuhkan.")}</p>${btn(T("浏览产品", "Browse products", "Lihat produk"), "category-go", id, "text")}</article>`,
    )
    .join("")}</div></section>${cta()}</div>`;
}
