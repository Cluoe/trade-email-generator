const ASSET_BASE = "assets/company/";
const STORAGE_KEYS = {
  company: "ai_trade_company_assets_v1",
  leads: "ai_trade_leads_v1"
};

const STATUS_OPTIONS = [
  "New Lead",
  "Contacted",
  "Replied",
  "Quotation Sent",
  "Sample Sent",
  "Negotiating",
  "Won",
  "Lost"
];

const DEFAULT_COMPANY = {
  name: "Inner Mongolia Heyuan Cat Litter",
  website: "",
  alibaba: "",
  whatsapp: "",
  email: ""
};

const ASSETS = {
  logo: { label: "Company Logo", type: "image", path: `${ASSET_BASE}logo.png` },
  catalog: { label: "Product Catalog PDF", type: "pdf", path: `${ASSET_BASE}cat-litter-catalog.pdf` },
  products: [
    { label: "Raw Crushed Cat Litter - Gray", type: "image", path: `${ASSET_BASE}raw-crushed-gray.png` },
    { label: "Raw Crushed Cat Litter - White", type: "image", path: `${ASSET_BASE}raw-crushed-white.png` },
    { label: "Raw Crushed Cat Litter - Yellow", type: "image", path: `${ASSET_BASE}raw-crushed-yellow.png` },
    { label: "Millet Cat Litter", type: "image", path: `${ASSET_BASE}millet-cat-litter.png` },
    { label: "Water Soluble Cat Litter", type: "image", path: `${ASSET_BASE}water-soluble-cat-litter.png` },
    { label: "Activated Carbon Ball Cat Litter", type: "image", path: `${ASSET_BASE}activated-carbon-ball-cat-litter.png` },
    { label: "Activated Carbon Crushed Cat Litter", type: "image", path: `${ASSET_BASE}activated-carbon-crushed-cat-litter.png` },
    { label: "Mixed Cat Litter", type: "image", path: `${ASSET_BASE}mixed-cat-litter.png` },
    { label: "Crushed Cat Litter", type: "image", path: `${ASSET_BASE}crushed-cat-litter.png` },
    { label: "Product Specification Sheet", type: "image", path: `${ASSET_BASE}product-spec-sheet.png` },
    { label: "Customization Options", type: "image", path: `${ASSET_BASE}customization.avif` },
    { label: "Product Detail 1", type: "image", path: `${ASSET_BASE}product-detail-1.avif` },
    { label: "Product Detail 2", type: "image", path: `${ASSET_BASE}product-detail-2.avif` },
    { label: "Product Detail 3", type: "image", path: `${ASSET_BASE}product-detail-3.png` },
    { label: "Product Detail 4", type: "image", path: `${ASSET_BASE}product-detail-4.avif` }
  ],
  productPhotos: [
    "product-photo-1.jpg",
    "product-photo-2.jpg",
    "product-photo-3.jpg",
    "product-photo-4.jpg",
    "product-photo-5.jpg",
    "product-photo-6.png",
    "product-photo-7.jpg",
    "product-photo-8.jpg",
    "product-photo-9.jpg",
    "product-photo-10.jpg"
  ].map((file, index) => ({ label: `Product Photo ${index + 1}`, type: "image", path: `${ASSET_BASE}${file}` })),
  factory: [
    { label: "Company Photo", type: "image", path: `${ASSET_BASE}company-photo.avif` },
    { label: "Factory Photo", type: "image", path: `${ASSET_BASE}factory-1.avif` },
    { label: "Factory Real View", type: "image", path: `${ASSET_BASE}factory-real.png` },
    { label: "Production Photo", type: "image", path: `${ASSET_BASE}production-photo.png` },
    { label: "Trade Show Photo", type: "image", path: `${ASSET_BASE}trade-show.avif` },
    { label: "Trade Show Booth", type: "image", path: `${ASSET_BASE}trade-show-1.avif` }
  ],
  productionVideos: [
    { label: "Raw Crushed Cat Litter Video", type: "video", path: `${ASSET_BASE}raw-crushed-cat-litter.mp4` },
    { label: "Water Soluble Cat Litter Video", type: "video", path: `${ASSET_BASE}water-soluble-cat-litter.mp4` },
    { label: "Activated Carbon Production Video", type: "video", path: `${ASSET_BASE}activated-carbon-crushed-process.mp4` },
    { label: "Mixed Cat Litter Video", type: "video", path: `${ASSET_BASE}mixed-cat-litter.mp4` }
  ],
  productVideos: [
    { label: "Activated Carbon Cat Litter Product Video", type: "video", path: `${ASSET_BASE}activated-carbon-crushed-cat-litter.mp4` }
  ],
  certificates: [
    { label: "Certification File", type: "image", path: `${ASSET_BASE}certificate.avif` }
  ]
};

const POSITIONING = {
  low: {
    label: "entry-level",
    focus: "price, fast turnover, and simple reliable quality",
    buyer: "price-sensitive buyers"
  },
  mid: {
    label: "mid-range",
    focus: "balanced cost, stable quality, and repeat orders",
    buyer: "buyers who need margin and reliability"
  },
  midHigh: {
    label: "upper-mid-range",
    focus: "better quality, improved presentation, and product differentiation",
    buyer: "buyers who want a stronger retail or brand image"
  },
  high: {
    label: "premium",
    focus: "quality details, brand value, customization, and long-term consistency",
    buyer: "premium buyers and brand-focused accounts"
  }
};

const CUSTOMER_TYPES = [
  {
    name: "Importer / Distributor",
    needs: ["stable factory supply", "clear export documents", "repeatable quality", "reasonable MOQ for distribution"],
    pains: ["unstable lead time", "quality difference between sample and bulk order", "slow supplier response"],
    angle: "Position the factory as a stable supply partner with catalog, factory photos, and production video to reduce sourcing risk.",
    google: ["{product} importer {country}", "{product} distributor {country}", "{product} wholesale supplier {country}"],
    linkedin: ["{product} importer {country}", "sourcing manager {product} {country}", "import manager pet supplies {country}"],
    b2b: ["{product} buyer directory {country}", "{product} importers list {country}", "pet supplies distributor {country}"]
  },
  {
    name: "Wholesaler",
    needs: ["workable margin", "bulk supply", "simple packaging", "fast reorder support"],
    pains: ["low profit after freight", "price changes", "stock shortage during peak season"],
    angle: "Lead with price range, MOQ, product photos, and fast-selling product options.",
    google: ["{product} wholesaler {country}", "{product} bulk buyer {country}", "pet product wholesaler {country}"],
    linkedin: ["wholesale buyer {product} {country}", "pet supplies wholesaler {country}", "purchasing manager wholesale {country}"],
    b2b: ["{product} wholesale marketplace {country}", "{product} bulk import {country}", "pet wholesale directory {country}"]
  },
  {
    name: "Retail Chain / Store Buyer",
    needs: ["retail-ready products", "clear product selling points", "stable restocking", "packaging suitable for shelves"],
    pains: ["weak packaging presentation", "unclear specifications", "supplier quality inconsistency"],
    angle: "Use product photos, specification sheet, and catalog to show retail readiness and reduce buyer evaluation work.",
    google: ["pet store buyer {country}", "{product} retail chain buyer {country}", "pet shop supplier {country}"],
    linkedin: ["category buyer pet supplies {country}", "retail buyer {product} {country}", "pet retail purchasing {country}"],
    b2b: ["pet store chain {country}", "{product} retailer directory {country}", "retail buyer list pet supplies {country}"]
  },
  {
    name: "E-commerce Seller",
    needs: ["easy product testing", "clear photos and specs", "selling points for listings", "safe packaging for delivery"],
    pains: ["high MOQ for testing", "poor listing materials", "bad reviews caused by packaging or dust"],
    angle: "Keep the message short and offer photos, video, and a small first-order discussion.",
    google: ["{product} Amazon seller {country}", "{product} online store {country}", "pet supplies ecommerce seller {country}"],
    linkedin: ["ecommerce seller pet supplies {country}", "marketplace seller {product}", "online retailer {product} {country}"],
    b2b: ["{product} online retailer {country}", "pet ecommerce directory {country}", "marketplace seller pet products {country}"]
  },
  {
    name: "Private Label Brand",
    needs: ["OEM packaging", "logo customization", "consistent quality", "long-term product development"],
    pains: ["standard products lack differentiation", "custom packaging MOQ is unclear", "supplier cannot support brand details"],
    angle: "Sell customization, quality control, product videos, and factory credibility instead of only price.",
    google: ["private label {product} brand {country}", "pet brand owner {country}", "OEM {product} buyer {country}"],
    linkedin: ["founder pet brand {country}", "private label buyer pet supplies", "brand manager {product} {country}"],
    b2b: ["private label pet supplies {country}", "OEM pet product buyer {country}", "{product} brand directory {country}"]
  }
];

let company = loadCompany();
let leads = loadLeads();
let latestDevelopmentText = "";
let latestBatchText = "";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function loadCompany() {
  try {
    return { ...DEFAULT_COMPANY, ...JSON.parse(localStorage.getItem(STORAGE_KEYS.company)) };
  } catch (error) {
    return { ...DEFAULT_COMPANY };
  }
}

function saveCompany() {
  localStorage.setItem(STORAGE_KEYS.company, JSON.stringify(company));
}

function loadLeads() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.leads)) || [];
  } catch (error) {
    return [];
  }
}

function saveLeads() {
  localStorage.setItem(STORAGE_KEYS.leads, JSON.stringify(leads));
}

function cleanText(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function sentenceCase(text) {
  const clean = cleanText(text);
  return clean ? clean.charAt(0).toUpperCase() + clean.slice(1) : "";
}

function pick(items, seed = Math.random()) {
  return items[Math.floor(seed * items.length) % items.length];
}

function fill(template, data) {
  return template
    .replaceAll("{product}", data.product)
    .replaceAll("{Product}", sentenceCase(data.product))
    .replaceAll("{country}", data.country);
}

function makeId() {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function absoluteUrl(path) {
  try {
    return new URL(path, window.location.href).href;
  } catch (error) {
    return path;
  }
}

function normalizeUrl(value) {
  const clean = cleanText(value);
  if (!clean) {
    return "";
  }
  return /^https?:\/\//i.test(clean) ? clean : `https://${clean}`;
}

function contactLine() {
  const parts = [];
  if (company.website) parts.push(`Website: ${normalizeUrl(company.website)}`);
  if (company.alibaba) parts.push(`Alibaba Store: ${normalizeUrl(company.alibaba)}`);
  if (company.whatsapp) parts.push(`WhatsApp: ${company.whatsapp}`);
  if (company.email) parts.push(`Email: ${company.email}`);
  return parts.length ? parts.join("\n") : "Website / Alibaba / WhatsApp / Email: Please add in Company Assets";
}

function assetLinkBlock() {
  const productPhoto = ASSETS.products[0];
  const factoryPhoto = ASSETS.factory[2];
  const video = ASSETS.productionVideos[0];
  return [
    company.website ? `Company website: ${normalizeUrl(company.website)}` : "Company website: please add in Company Assets",
    company.alibaba ? `Alibaba store: ${normalizeUrl(company.alibaba)}` : "Alibaba store: please add in Company Assets",
    `Product catalog: ${absoluteUrl(ASSETS.catalog.path)}`,
    `Product photos: ${absoluteUrl(productPhoto.path)}`,
    `Factory photos: ${absoluteUrl(factoryPhoto.path)}`,
    `Factory / product video: ${absoluteUrl(video.path)}`,
    company.whatsapp ? `WhatsApp: ${company.whatsapp}` : "WhatsApp: please add in Company Assets"
  ].join("\n");
}

function setStatus(message) {
  const status = $("#statusMessage");
  if (status) status.textContent = message;
}

async function copyText(text) {
  if (!text) return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.left = "-999px";
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand("copy");
    field.remove();
    return copied;
  }
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function initTabs() {
  $$(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      $$(".tab-button").forEach((item) => item.classList.remove("active"));
      $$(".page").forEach((page) => page.classList.remove("active"));
      button.classList.add("active");
      $(`#${button.dataset.page}`).classList.add("active");
    });
  });
}

function initCompanyForm() {
  $("#companyName").value = company.name;
  $("#companyWebsite").value = company.website;
  $("#companyAlibaba").value = company.alibaba;
  $("#companyWhatsapp").value = company.whatsapp;
  $("#companyEmail").value = company.email;

  $("#companyForm").addEventListener("submit", (event) => {
    event.preventDefault();
    company = {
      name: cleanText($("#companyName").value),
      website: cleanText($("#companyWebsite").value),
      alibaba: cleanText($("#companyAlibaba").value),
      whatsapp: cleanText($("#companyWhatsapp").value),
      email: cleanText($("#companyEmail").value)
    };
    saveCompany();
    renderAssetSummary();
    setStatus("公司资料已保存，会自动引用到开发信。");
  });
}

function renderAssetSummary() {
  const counts = [
    ["产品图片", ASSETS.products.length + ASSETS.productPhotos.length],
    ["工厂图片", ASSETS.factory.length],
    ["视频素材", ASSETS.productionVideos.length + ASSETS.productVideos.length],
    ["认证/目录", 2]
  ];
  $("#assetSummary").innerHTML = counts
    .map(([label, count]) => `<div class="summary-tile"><strong>${count}</strong><span>${label}</span></div>`)
    .join("");
}

function renderAssetSections() {
  const sections = [
    ["产品目录", [ASSETS.catalog]],
    ["产品图片", [...ASSETS.products, ...ASSETS.productPhotos]],
    ["工厂图片", ASSETS.factory],
    ["生产过程视频", ASSETS.productionVideos],
    ["产品视频", ASSETS.productVideos],
    ["认证文件", ASSETS.certificates]
  ];

  $("#assetSections").innerHTML = "";
  sections.forEach(([title, assets]) => {
    const section = createElement("section", "asset-section");
    section.appendChild(createElement("h3", "", title));
    const grid = createElement("div", "asset-grid");
    assets.forEach((asset) => grid.appendChild(createAssetCard(asset)));
    section.appendChild(grid);
    $("#assetSections").appendChild(section);
  });
}

function createAssetCard(asset) {
  const card = createElement("article", "asset-card");
  const preview = createElement("button", "asset-preview");
  preview.type = "button";
  preview.addEventListener("click", () => openPreview(asset));

  if (asset.type === "image") {
    const image = document.createElement("img");
    image.src = asset.path;
    image.alt = asset.label;
    preview.appendChild(image);
  } else if (asset.type === "video") {
    const video = document.createElement("video");
    video.src = asset.path;
    video.muted = true;
    video.preload = "metadata";
    preview.appendChild(video);
  } else {
    preview.appendChild(createElement("span", "file-icon", "PDF"));
  }

  const actions = createElement("div", "asset-actions");
  const viewButton = createElement("button", "copy-small", "预览");
  viewButton.type = "button";
  viewButton.addEventListener("click", () => openPreview(asset));

  const openLink = document.createElement("a");
  openLink.href = asset.path;
  openLink.target = "_blank";
  openLink.rel = "noopener";
  openLink.textContent = "打开";

  actions.appendChild(viewButton);
  actions.appendChild(openLink);
  card.appendChild(preview);
  card.appendChild(createElement("strong", "", asset.label));
  card.appendChild(actions);
  return card;
}

function openPreview(asset) {
  $("#previewType").textContent = asset.type.toUpperCase();
  $("#previewTitle").textContent = asset.label;
  const body = $("#previewBody");
  body.innerHTML = "";

  if (asset.type === "image") {
    const image = document.createElement("img");
    image.src = asset.path;
    image.alt = asset.label;
    body.appendChild(image);
  } else if (asset.type === "video") {
    const video = document.createElement("video");
    video.src = asset.path;
    video.controls = true;
    video.playsInline = true;
    body.appendChild(video);
  } else {
    const iframe = document.createElement("iframe");
    iframe.src = asset.path;
    iframe.title = asset.label;
    body.appendChild(iframe);
  }

  $("#previewModal").classList.add("open");
  $("#previewModal").setAttribute("aria-hidden", "false");
}

function closePreview() {
  $("#previewModal").classList.remove("open");
  $("#previewModal").setAttribute("aria-hidden", "true");
  $("#previewBody").innerHTML = "";
}

function initPreview() {
  $("#closePreviewButton").addEventListener("click", closePreview);
  $("#previewModal").addEventListener("click", (event) => {
    if (event.target.id === "previewModal") closePreview();
  });
}

function generateCustomerDevelopment(country, product, positioningKey) {
  const pos = POSITIONING[positioningKey];
  const data = { country, product };
  const profiles = CUSTOMER_TYPES.map((type) => {
    const google = type.google.map((item) => fill(item, data));
    const linkedin = type.linkedin.map((item) => fill(item, data));
    const b2b = type.b2b.map((item) => fill(item, data));
    return { ...type, google, linkedin, b2b };
  });

  latestDevelopmentText = profiles
    .map(
      (profile, index) => `${index + 1}. ${profile.name}
Needs: ${profile.needs.join("; ")}
Pain Points: ${profile.pains.join("; ")}
Development Angle: ${profile.angle}
Google Keywords: ${profile.google.join(" | ")}
LinkedIn Keywords: ${profile.linkedin.join(" | ")}
B2B Keywords: ${profile.b2b.join(" | ")}`
    )
    .join("\n\n");

  const profileHtml = profiles
    .map(
      (profile, index) => `<article class="profile-card">
        <h3>${index + 1}. ${escapeHtml(profile.name)}</h3>
        <p>定位建议：针对 ${escapeHtml(country)} 的 ${escapeHtml(pos.buyer)}，强调 ${escapeHtml(pos.focus)}。</p>
        <ul>
          <li><strong>客户需求：</strong>${escapeHtml(profile.needs.join("；"))}</li>
          <li><strong>常见痛点：</strong>${escapeHtml(profile.pains.join("；"))}</li>
          <li><strong>开发角度：</strong>${escapeHtml(profile.angle)}</li>
        </ul>
      </article>`
    )
    .join("");

  const keywordHtml = [
    ["Google搜索关键词", profiles.flatMap((profile) => profile.google)],
    ["LinkedIn搜索关键词", profiles.flatMap((profile) => profile.linkedin)],
    ["B2B搜索关键词", profiles.flatMap((profile) => profile.b2b)]
  ]
    .map(
      ([title, items]) => `<article class="keyword-card">
        <h3>${escapeHtml(title)}</h3>
        <ul>${items.slice(0, 12).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </article>`
    )
    .join("");

  $("#developmentOutput").innerHTML = `<div class="profile-grid">${profileHtml}</div><div class="keyword-grid">${keywordHtml}</div>`;
  $("#copyDevelopmentButton").disabled = false;
}

function initDevelopment() {
  $("#developmentForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const country = cleanText($("#devCountry").value);
    const product = cleanText($("#devProduct").value);
    const positioning = $("#devPositioning").value;
    if (!country || !product) return;
    generateCustomerDevelopment(country, product, positioning);
    setStatus("客户画像和搜索关键词已生成。");
  });

  $("#copyDevelopmentButton").addEventListener("click", async () => {
    const copied = await copyText(latestDevelopmentText);
    setStatus(copied ? "开发方案已复制。" : "复制失败，请手动选择内容。");
  });
}

function populateStatusOptions() {
  const leadStatus = $("#leadStatus");
  leadStatus.innerHTML = STATUS_OPTIONS.map((status) => `<option>${status}</option>`).join("");
}

function initLeadForm() {
  populateStatusOptions();
  $("#leadForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const lead = {
      id: makeId(),
      company: cleanText($("#leadCompany").value),
      website: cleanText($("#leadWebsite").value),
      email: cleanText($("#leadEmail").value),
      country: cleanText($("#leadCountry").value),
      type: $("#leadType").value,
      status: $("#leadStatus").value
    };

    if (!lead.company || !lead.country) return;
    leads.unshift(lead);
    saveLeads();
    renderLeads();
    event.target.reset();
    populateStatusOptions();
    setStatus("客户已添加。");
  });

  $("#importCsvButton").addEventListener("click", () => {
    const imported = parseCsvLeads($("#csvInput").value);
    leads = [...imported, ...leads];
    saveLeads();
    renderLeads();
    $("#csvInput").value = "";
    setStatus(`已导入 ${imported.length} 个客户。`);
  });

  $("#exportLeadsButton").addEventListener("click", async () => {
    const text = leadsToCsv(leads);
    const copied = await copyText(text);
    setStatus(copied ? "客户CSV已复制。" : "复制失败，请手动选择内容。");
  });

  $("#clearLeadsButton").addEventListener("click", () => {
    if (!confirm("确定清空客户名单吗？")) return;
    leads = [];
    saveLeads();
    renderLeads();
    setStatus("客户名单已清空。");
  });
}

function parseCsvLine(line) {
  const result = [];
  let value = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      result.push(value.trim().replace(/^"|"$/g, ""));
      value = "";
    } else {
      value += char;
    }
  }
  result.push(value.trim().replace(/^"|"$/g, ""));
  return result;
}

function parseCsvLeads(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (!lines.length) return [];

  const first = lines[0].toLowerCase();
  const rows = first.includes("company") && first.includes("country") ? lines.slice(1) : lines;

  return rows
    .map(parseCsvLine)
    .filter((cols) => cols[0])
    .map((cols) => ({
      id: makeId(),
      company: cleanText(cols[0]),
      website: cleanText(cols[1]),
      email: cleanText(cols[2]),
      country: cleanText(cols[3]),
      type: cleanText(cols[4]) || "Importer / Distributor",
      status: STATUS_OPTIONS.includes(cleanText(cols[5])) ? cleanText(cols[5]) : "New Lead"
    }));
}

function leadsToCsv(items) {
  const escape = (value) => `"${String(value || "").replaceAll('"', '""')}"`;
  return [
    "Company,Website,Email,Country,Type,Status",
    ...items.map((lead) =>
      [lead.company, lead.website, lead.email, lead.country, lead.type, lead.status].map(escape).join(",")
    )
  ].join("\n");
}

function renderLeads() {
  const body = $("#leadTableBody");
  if (!leads.length) {
    body.innerHTML = `<tr><td colspan="7">暂无客户，请手动添加或导入CSV。</td></tr>`;
    return;
  }

  body.innerHTML = "";
  leads.forEach((lead) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${escapeHtml(lead.company)}</td>
      <td>${lead.website ? `<a href="${escapeHtml(normalizeUrl(lead.website))}" target="_blank" rel="noopener">Open</a>` : ""}</td>
      <td>${escapeHtml(lead.email || "")}</td>
      <td>${escapeHtml(lead.country)}</td>
      <td>${escapeHtml(lead.type)}</td>
      <td>
        <select data-status-id="${lead.id}">
          ${STATUS_OPTIONS.map((status) => `<option ${status === lead.status ? "selected" : ""}>${status}</option>`).join("")}
        </select>
      </td>
      <td><button class="danger-button" type="button" data-delete-id="${lead.id}">删除</button></td>
    `;
    body.appendChild(row);
  });

  $$("[data-status-id]").forEach((select) => {
    select.addEventListener("change", () => {
      const lead = leads.find((item) => item.id === select.dataset.statusId);
      if (lead) lead.status = select.value;
      saveLeads();
    });
  });

  $$("[data-delete-id]").forEach((button) => {
    button.addEventListener("click", () => {
      leads = leads.filter((item) => item.id !== button.dataset.deleteId);
      saveLeads();
      renderLeads();
      setStatus("客户已删除。");
    });
  });
}

function buildBatchEmail(lead, data, index) {
  const pos = POSITIONING[data.positioning];
  const type = CUSTOMER_TYPES.find((item) => lead.type.toLowerCase().includes(item.name.split(" ")[0].toLowerCase())) || CUSTOMER_TYPES[index % CUSTOMER_TYPES.length];
  const subjectOptions = [
    `${sentenceCase(data.product)} supply option for ${lead.country || data.country || "your market"}`,
    `A practical ${data.product} offer for ${lead.type}`,
    `${sentenceCase(data.product)} catalog, factory photos and video`,
    `Can we support your ${data.product} sourcing?`
  ];
  const openingOptions = [
    `I came across ${lead.company} and thought your team may be interested in a reliable ${data.product} supply option.`,
    `I am reaching out because ${lead.type.toLowerCase()} buyers often need clear product details before checking a new supplier.`,
    `I wanted to share a short introduction from our factory, especially if ${data.product} is relevant to your current sourcing.`,
    `Instead of sending only a price, I would like to share our catalog, product photos, factory photos and videos for easier review.`
  ];
  const pain = pick(type.pains, (index + 1) / 7);
  const need = pick(type.needs, (index + 2) / 8);
  const advantageList = data.advantages.length ? data.advantages : ["factory direct supply", "stable quality", "product catalog and photos", "video introduction"];
  const sellingPoint = pick(advantageList, (index + 3) / 9);
  const subject = pick(subjectOptions, (index + 1) / 6);

  return {
    subject,
    body: `Subject: ${subject}

Dear Purchasing Manager,

${pick(openingOptions, (index + 4) / 10)}

For ${lead.country || "your market"}, ${lead.type.toLowerCase()} buyers usually care about ${need}. One common issue is ${pain}. That is why I would position our ${data.product} as a ${pos.label} option focused on ${pos.focus}.

Main point for your review: ${sellingPoint}.

To make the first check easier, I am including our sales materials below instead of only sending plain text:
${assetLinkBlock()}

If the product category is relevant, I can also prepare a short quotation, MOQ, packing details and sample plan for ${lead.company}.

Best regards,
[Your Name]
${company.name || "[Your Company]"}
${contactLine()}`
  };
}

function initBatch() {
  $("#batchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!leads.length) {
      $("#batchOutput").innerHTML = `<div class="empty-state">请先在“客户名单”里添加或导入客户。</div>`;
      return;
    }

    const data = {
      product: cleanText($("#batchProduct").value),
      positioning: $("#batchPositioning").value,
      advantages: cleanText($("#batchAdvantages").value)
        .split(/[,，;；、\n]/)
        .map(cleanText)
        .filter(Boolean)
    };

    if (!data.product) return;

    const emails = leads.map((lead, index) => ({ lead, ...buildBatchEmail(lead, data, index) }));
    latestBatchText = emails.map((item) => `${item.lead.company}\n${item.body}`).join("\n\n------------------------------\n\n");

    $("#batchOutput").innerHTML = `<div class="batch-list">${emails
      .map(
        (item, index) => `<article class="batch-card">
          <div class="section-head">
            <div>
              <h3>${index + 1}. ${escapeHtml(item.lead.company)}</h3>
              <p>${escapeHtml(item.lead.country)} / ${escapeHtml(item.lead.type)} / ${escapeHtml(item.lead.status)}</p>
            </div>
            <button class="copy-small" type="button" data-copy-batch="${index}">复制这封</button>
          </div>
          <textarea readonly>${escapeHtml(item.body)}</textarea>
        </article>`
      )
      .join("")}</div>`;

    $$("[data-copy-batch]").forEach((button) => {
      button.addEventListener("click", async () => {
        const copied = await copyText(emails[Number(button.dataset.copyBatch)].body);
        setStatus(copied ? "单封开发信已复制。" : "复制失败，请手动选择内容。");
      });
    });

    $("#copyBatchButton").disabled = false;
    setStatus("批量开发信已生成。每封邮件的标题、开头、痛点和卖点均有差异。");
  });

  $("#copyBatchButton").addEventListener("click", async () => {
    const copied = await copyText(latestBatchText);
    setStatus(copied ? "全部批量开发信已复制。" : "复制失败，请手动选择内容。");
  });
}

function init() {
  initTabs();
  initCompanyForm();
  initPreview();
  renderAssetSummary();
  renderAssetSections();
  initDevelopment();
  initLeadForm();
  renderLeads();
  initBatch();
}

init();
