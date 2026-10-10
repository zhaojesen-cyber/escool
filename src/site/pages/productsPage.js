export function productsPage({
  filtered,
  T,
  t,
  esc,
  I,
  state,
  PRODUCTS,
  CATEGORIES,
  heading,
  cta,
  productionNote,
  productGrid,
}) {
  return `<div class="wrap">${heading("PRODUCTS", T("制冰设备", "Ice makers", "Mesin es"), T("按产冰量、储冰量和进水方式选机器，也可以把不同型号放在一起对比。", "Explore countertop, commercial and modular models, product photographs and specifications. Select two or three machines to compare.", "Lihat model meja, komersial, dan modular beserta foto serta spesifikasi. Pilih dua atau tiga mesin untuk dibandingkan."))}<div class="filterbar"><div class="tabs" aria-label="${T("产品分类", "Product categories", "Kategori produk")}">${CATEGORIES.map(([id, n]) => `<button data-action="category" data-value="${id}" class="${state.category === id ? "active" : ""}" aria-pressed="${state.category === id}">${t(n)}</button>`).join("")}</div><label class="searchbox">${I("search")}<input type="search" id="product-search" value="${esc(state.query)}" placeholder="${T("搜索型号或产能", "Search model or capacity", "Cari model atau kapasitas")}" aria-label="${T("搜索产品", "Search products", "Cari produk")}"></label></div><div class="catalogue-note"><p class="note">${productionNote()}</p><span id="product-count" class="kicker">${filtered().length} ${T("款型号", "models", "model")}</span></div><div class="cards three" id="product-grid">${productGrid()}</div><section class="section tight">${cta()}</section></div>`;
}
