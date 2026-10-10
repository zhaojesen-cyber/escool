export function supportPage({
  FAQ,
  T,
  t,
  I,
  sectionHead,
  heading,
  btn,
  card,
  cta,
}) {
  return `<div class="wrap">${heading("SUPPORT", T("安装、使用与售后支持", "Installation, use & after-sales support", "Pemasangan, penggunaan & purnajual"), T("查阅安装与日常维护指南。需要协助时，准备型号、所在城市和购买信息，联系团队。", "Read installation and care guides. For assistance, prepare the model, city and purchase details and contact the team.", "Baca panduan pemasangan serta perawatan. Untuk bantuan, siapkan model, kota, dan informasi pembelian lalu hubungi tim."))}<div class="support-top"><div class="simple-card"><div class="icon-box">${I("tool")}</div><h2>${T("机器到货前，把水、电和位置准备好。", "Get water, power and space ready before delivery.", "Siapkan air, listrik, dan tempat sebelum mesin tiba.")}</h2><ol class="number-list">${[
    [
      "核对通道、机器尺寸与取冰空间",
      "Check access, dimensions and dispensing space",
      "Periksa akses, dimensi, dan ruang mengambil es",
    ],
    [
      "按型号准备水源、过滤与排水",
      "Prepare model-appropriate water, filtration and drainage",
      "Siapkan air, filtrasi, dan drainase sesuai model",
    ],
    [
      "按铭牌核对电源与接地",
      "Check power and grounding against the nameplate",
      "Periksa listrik dan grounding sesuai pelat nama",
    ],
    [
      "保持水平和散热通道畅通",
      "Keep the unit level and ventilation clear",
      "Posisikan rata dan jaga ventilasi",
    ],
    [
      "保存说明书、序列号与购买凭证",
      "Keep the manual, serial number and purchase records",
      "Simpan manual, nomor seri, dan bukti pembelian",
    ],
  ]
    .map(
      (n, i) =>
        `<li><span class="step-num">0${i + 1}</span><span>${t(n)}</span></li>`,
    )
    .join(
      "",
    )}</ol><div class="flex mt24">${btn(T("安装准备指南", "Installation guide", "Panduan pemasangan"), "guide", "installation", "secondary", "book")}${btn(T("日常维护", "Routine care", "Perawatan rutin"), "guide", "care", "text", "book")}</div></div><div class="service-check"><h2>${T("机器使用中遇到问题？联系我们。", "A problem with your machine? Get in touch.", "Ada masalah dengan mesin? Hubungi kami.")}</h2><p>${T("把设备型号、故障现象、所在城市和购买渠道发给团队。照片、视频与故障代码有助于判断问题。", "Send the model, symptoms, city and seller. Photographs, video and error codes help the team assess the issue.", "Kirim model, gejala, kota, serta penjual. Foto, video, dan kode kesalahan membantu tim menilai masalah.")}</p><div class="mt24">${btn(T("填写售后咨询", "Prepare a service enquiry", "Siapkan permintaan layanan"), "service", "", "lime", "tool")}</div><p class="mt24">${T("上门、寄修和零件安排按所在城市与设备情况沟通。", "On-site, return-repair and parts arrangements depend on location and the machine.", "Kunjungan, pengiriman perbaikan, dan suku cadang disesuaikan dengan lokasi serta mesin.")}</p><div class="mt24">${btn(T("WhatsApp 联系", "Contact on WhatsApp", "Hubungi lewat WhatsApp"), "wa", "", "ghost", "whatsapp")}</div></div></div><section class="section">${sectionHead("QUESTIONS & ANSWERS", T("常见问题", "Frequently asked questions", "Pertanyaan umum"))}<div class="faq-list">${FAQ.map(([q, a]) => `<details><summary>${t(q)}</summary><p>${t(a)}</p></details>`).join("")}</div></section>${cta()}</div>`;
}
