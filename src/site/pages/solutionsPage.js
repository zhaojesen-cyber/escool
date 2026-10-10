export function solutionsPage({
  T,
  t,
  find,
  state,
  SCENARIOS,
  sectionHead,
  heading,
  btn,
  card,
  cta,
  productionNote,
  calcResult,
}) {
  const s = SCENARIOS.find((x) => x.id === state.scenario) || SCENARIOS[0];
  return `<div class="wrap">${heading("APPLICATIONS", T("您的用冰需求，适合哪款机器？", "Which machine fits your ice needs?", "Mesin mana yang cocok untuk kebutuhan es Anda?"), T("先了解日用冰量、高峰取冰和现场条件，再比较设备产能和储冰配置。", "Understand daily use, peak dispensing and the site before comparing production and storage.", "Pahami pemakaian harian, pengambilan jam sibuk, dan lokasi sebelum membandingkan produksi serta penyimpanan."))}<div class="tabs">${SCENARIOS.map((x) => `<button class="${x.id === s.id ? "active" : ""}" data-action="scenario" data-value="${x.id}" aria-pressed="${x.id === s.id}">${t(x.name)}</button>`).join("")}</div><div class="brand-banner mt24"><div><div class="eyebrow">${t(s.name)}</div><h2>${t(s.title)}</h2><p>${t(s.desc)}</p><div class="mt24">${btn(T("咨询适用型号", "Discuss suitable models", "Tanyakan model yang sesuai"), "scenario-inquiry", s.id)}</div></div><div><h3>${T("选型时需要的信息", "Information for selection", "Informasi untuk pemilihan")}</h3><ol class="number-list">${s.points.map((n, i) => `<li><span class="step-num">0${i + 1}</span><span>${t(n)}</span></li>`).join("")}</ol>${btn(T("阅读选型指南", "Read the selection guide", "Baca panduan pemilihan"), "guide", "sizing", "text", "book")}</div></div><section class="section tight">${sectionHead("EXPLORE MODELS", T("相关型号", "Explore these models", "Lihat model terkait"), productionNote())}<div class="cards three">${s.products.map((id) => card(find(id))).join("")}</div></section><section class="calc-box"><h2>${T("饮品用冰量估算", "Estimate beverage ice demand", "Perkirakan kebutuhan es minuman")}</h2><p class="lead mt16">${T("每天杯量 × 每杯加冰量，再加上你选择的余量。", "Daily drinks × ice per drink, plus your chosen buffer.", "Minuman harian × es per minuman, ditambah cadangan yang dipilih.")}</p><div class="input-row mt24">${[
    ["cups", T("每天杯量", "Drinks per day", "Minuman per hari"), 1, 100000],
    [
      "grams",
      T("每杯加冰（g）", "Ice per drink (g)", "Es per minuman (g)"),
      1,
      5000,
    ],
    [
      "peak",
      T("高峰一小时杯量", "Peak-hour drinks", "Minuman per jam sibuk"),
      1,
      100000,
    ],
    ["margin", T("预留余量（%）", "Buffer (%)", "Cadangan (%)"), 0, 200],
  ]
    .map(
      ([k, l, min, max]) =>
        `<label class="field">${l}<input type="number" data-calc="${k}" value="${state.calc[k]}" min="${min}" max="${max}" step="1"></label>`,
    )
    .join(
      "",
    )}</div><div id="calc-output" class="calc-output" aria-live="polite">${calcResult()}</div><div class="mt24">${btn(T("按此需求咨询", "Discuss this demand", "Konsultasikan kebutuhan ini"), "calc-inquiry")}</div></section><section class="section tight">${cta()}</section></div>`;
}
