export function resourcesPage({
  GUIDES,
  T,
  t,
  I,
  sectionHead,
  heading,
  btn,
  card,
}) {
  return `<div class="wrap">${heading("RESOURCES", T("产品资料与使用指南", "Product documents & practical guides", "Dokumen produk & panduan penggunaan"), T("浏览完整型号目录，了解选型、安装、清洁维护、采购合作和售后联系方法。资料可在线阅读，也可下载保存。", "Browse the model catalogue and guides to selection, installation, care, purchasing and service. Read online or download for reference.", "Lihat katalog model serta panduan pemilihan, pemasangan, perawatan, pembelian, dan layanan. Baca online atau unduh untuk disimpan."))}<div class="cards three"><article class="resource-card">${I("layers")}<span class="badge">${T("产品目录", "Product catalogue", "Katalog produk")}</span><h3>${T("SOOCOOL 完整型号目录", "SOOCOOL model catalogue", "Katalog model SOOCOOL")}</h3><p>${T("查看现有机型的图片、产冰量、储冰量和规格。目录之外的机型与配置，也可按您的需求定制。", "View pictures, output, storage and specifications for current models. Models and configurations beyond the catalogue can be customised to your requirements.", "Lihat foto, produksi, penyimpanan, dan spesifikasi model saat ini. Model serta konfigurasi di luar katalog dapat disesuaikan dengan kebutuhan Anda.")}</p><span class="resource-type">HTML · CSV</span><div class="flex">${btn(T("在线阅读", "Read online", "Baca online"), "catalogue", "", "text", "book")}${btn(T("下载目录", "Download", "Unduh"), "download-catalogue", "", "text", "download")}</div></article>${Object.entries(
    GUIDES,
  )
    .map(
      ([id, g]) =>
        `<article class="resource-card">${I(id === "care" ? "tool" : id === "procurement" ? "factory" : id === "service" ? "shield" : "book")}<span class="badge">${T("实用指南", "Practical guide", "Panduan praktis")}</span><h3>${t(g.title)}</h3><p>${t(g.intro)}</p><span class="resource-type">TXT · ${T("当前语言", "CURRENT LANGUAGE", "BAHASA SAAT INI")}</span><div class="flex">${btn(T("在线阅读", "Read online", "Baca online"), "guide", id, "text", "book")}${btn(T("下载指南", "Download", "Unduh"), "download-guide", id, "text", "download")}</div></article>`,
    )
    .join(
      "",
    )}</div><section class="section">${sectionHead("MODEL DOCUMENTS", T("需要某一型号的说明书或资质文件？", "Need a model manual or compliance document?", "Perlu manual atau dokumen kepatuhan model?"), T("联系团队时提供型号和销售市场，以便查找适用的产品文件。随箱说明书对应实际设备，安装与操作时请一并使用。", "Share the model and sales market so the team can locate the relevant documents. Use the manual supplied with your exact machine for installation and operation.", "Sampaikan model serta pasar penjualan agar tim dapat mencari dokumen yang sesuai. Gunakan manual yang disertakan untuk pemasangan dan pengoperasian mesin."))}${btn(T("联系产品团队", "Contact the product team", "Hubungi tim produk"), "document-inquiry")}</section></div>`;
}
