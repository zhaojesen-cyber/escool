export function productPage({
  dimensions,
  T,
  esc,
  path,
  find,
  state,
  route,
  heading,
  btn,
  cta,
  art,
  specs,
  productDesc,
  productTitle,
  productionNote,
  categoryName,
  inlet,
  guideBody,
  notFound,
}) {
  const p = find(route.id);
  if (!p) return notFound();
  return `<div class="wrap"><div class="page-heading"><div class="crumb"><a href="${path("products")}">${T("产品中心", "Products", "Produk")}</a><span>/</span>${p.code}</div></div><section class="product-detail-top"><div class="detail-art">${art(p, true)}${p.sharedPhoto ? `<span class="art-label">${T("同系列外观", "Series appearance", "Tampilan seri")}</span>` : ""}</div><div class="detail-info"><span class="kicker">${categoryName(p)}</span><h1>${p.code}</h1><h2>${productTitle(p)}</h2><p class="lead">${productDesc(p)}</p><div class="spec-mini"><div><small>${T("制冰量", "Daily production", "Produksi harian")}</small><strong>${p.production}<small> kg / 24h</small></strong></div><div><small>${T("储冰量", "Ice storage", "Penyimpanan es")}</small><strong>${p.storage}<small> kg</small></strong></div>${p.power ? `<div><small>${T("整机功率", "Machine power", "Daya mesin")}</small><strong>${p.power}<small> W</small></strong></div>` : ""}</div><div class="tech-points"><span>${inlet(p)}</span>${p.voltage ? `<span>${p.voltage}</span>` : ""}${p.iceSize ? `<span>${dimensions(p.iceSize)}</span>` : ""}</div><div class="flex mt24">${btn(T("咨询报价", "Request a quotation", "Minta penawaran"), "product-inquiry", p.id)}${btn(T("加入对比", "Add to comparison", "Tambahkan perbandingan"), "compare", p.id, "secondary", "compare")}</div><p class="note mt24">${productionNote()}</p></div></section><div class="tabs" role="tablist">${[
    ["specs", T("产品参数", "Specifications", "Spesifikasi")],
    ["installation", T("安装准备", "Installation", "Pemasangan")],
    ["downloads", T("产品资料", "Documents", "Dokumen")],
  ]
    .map(
      ([id, n]) =>
        `<button role="tab" aria-selected="${state.tab === id}" data-action="detail-tab" data-value="${id}" class="${state.tab === id ? "active" : ""}">${n}</button>`,
    )
    .join("")}</div><div class="detail-body">${
    state.tab === "specs"
      ? `<table class="spec-table">${specs(p)
          .map(
            ([k, v]) => `<tr><th scope="row">${k}</th><td>${esc(v)}</td></tr>`,
          )
          .join(
            "",
          )}</table>${p.iceImage ? `<div class="tech-points mt24"><img src="${esc(p.iceImage)}" alt="${T("冰块尺寸", "Ice dimensions", "Dimensi es")} ${dimensions(p.iceSize)}" style="width:180px;height:180px;object-fit:contain;border-radius:12px" loading="lazy"></div>` : ""}<p class="note mt16">${T("采购前可联系团队核对电气、安装与配套要求。设备铭牌和随箱说明书适用于具体设备。", "Contact our team before purchasing to check electrical, installation and accessory requirements. The nameplate and supplied manual apply to the exact machine.", "Hubungi tim sebelum membeli untuk memeriksa listrik, pemasangan, serta aksesori. Pelat nama dan manual berlaku untuk mesin yang bersangkutan.")}</p>`
      : state.tab === "installation"
        ? guideBody("installation")
        : `<h3>${T("产品规格与使用资料", "Specifications and guides", "Spesifikasi dan panduan")}</h3><p class="lead mt16">${T("下载此型号的规格摘要，或查看安装与日常维护指南。", "Download this model’s specification sheet or view installation and care guides.", "Unduh lembar spesifikasi model ini atau baca panduan pemasangan serta perawatan.")}</p><div class="flex mt24">${btn(T("下载规格摘要", "Download specifications", "Unduh spesifikasi"), "download-product", p.id, "secondary", "download")}${btn(T("安装准备指南", "Installation guide", "Panduan pemasangan"), "guide", "installation", "text", "book")}${btn(T("日常维护指南", "Care guide", "Panduan perawatan"), "guide", "care", "text", "book")}</div>`
  }</div><section class="section tight">${cta()}</section></div>`;
}
