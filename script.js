const ASSET_BASE = "assets/company/";
const MAX_UPLOAD_BYTES = 1.2 * 1024 * 1024;

const STORAGE_KEYS = {
  company: "ai_trade_company_assets_v2",
  pool: "ai_trade_customer_pool_v2"
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
  catalogLink: "",
  videoLink: "",
  whatsapp: "",
  email: "",
  logo: null,
  uploads: {
    products: [],
    factories: [],
    certifications: [],
    catalogs: []
  }
};

const STATIC_ASSETS = {
  logo: { id: "static-logo", label: "Company Logo", category: "logo", type: "image", src: `${ASSET_BASE}logo.png` },
  catalogs: [
    { id: "static-catalog", label: "Product Catalog PDF", category: "catalogs", type: "pdf", src: `${ASSET_BASE}cat-litter-catalog.pdf` }
  ],
  products: [
    { label: "Raw Crushed Cat Litter - Gray", src: `${ASSET_BASE}raw-crushed-gray.png` },
    { label: "Raw Crushed Cat Litter - White", src: `${ASSET_BASE}raw-crushed-white.png` },
    { label: "Raw Crushed Cat Litter - Yellow", src: `${ASSET_BASE}raw-crushed-yellow.png` },
    { label: "Millet Cat Litter", src: `${ASSET_BASE}millet-cat-litter.png` },
    { label: "Water Soluble Cat Litter", src: `${ASSET_BASE}water-soluble-cat-litter.png` },
    { label: "Activated Carbon Ball Cat Litter", src: `${ASSET_BASE}activated-carbon-ball-cat-litter.png` },
    { label: "Activated Carbon Crushed Cat Litter", src: `${ASSET_BASE}activated-carbon-crushed-cat-litter.png` },
    { label: "Mixed Cat Litter", src: `${ASSET_BASE}mixed-cat-litter.png` },
    { label: "Crushed Cat Litter", src: `${ASSET_BASE}crushed-cat-litter.png` },
    { label: "Product Specification Sheet", src: `${ASSET_BASE}product-spec-sheet.png` },
    { label: "Customization Options", src: `${ASSET_BASE}customization.avif` },
    { label: "Product Photo 1", src: `${ASSET_BASE}product-photo-1.jpg` },
    { label: "Product Photo 2", src: `${ASSET_BASE}product-photo-2.jpg` },
    { label: "Product Photo 3", src: `${ASSET_BASE}product-photo-3.jpg` },
    { label: "Product Photo 4", src: `${ASSET_BASE}product-photo-4.jpg` },
    { label: "Product Photo 5", src: `${ASSET_BASE}product-photo-5.jpg` }
  ].map((asset, index) => ({ id: `static-product-${index}`, category: "products", type: "image", ...asset })),
  factories: [
    { label: "Company Photo", src: `${ASSET_BASE}company-photo.avif` },
    { label: "Factory Photo", src: `${ASSET_BASE}factory-1.avif` },
    { label: "Factory Real View", src: `${ASSET_BASE}factory-real.png` },
    { label: "Production Photo", src: `${ASSET_BASE}production-photo.png` },
    { label: "Trade Show Photo", src: `${ASSET_BASE}trade-show.avif` },
    { label: "Trade Show Booth", src: `${ASSET_BASE}trade-show-1.avif` }
  ].map((asset, index) => ({ id: `static-factory-${index}`, category: "factories", type: "image", ...asset })),
  productVideos: [
    { id: "static-product-video", label: "Activated Carbon Cat Litter Product Video", category: "productVideos", type: "video", src: `${ASSET_BASE}activated-carbon-crushed-cat-litter.mp4` }
  ],
  productionVideos: [
    { label: "Raw Crushed Cat Litter Video", src: `${ASSET_BASE}raw-crushed-cat-litter.mp4` },
    { label: "Water Soluble Cat Litter Video", src: `${ASSET_BASE}water-soluble-cat-litter.mp4` },
    { label: "Activated Carbon Production Video", src: `${ASSET_BASE}activated-carbon-crushed-process.mp4` },
    { label: "Mixed Cat Litter Video", src: `${ASSET_BASE}mixed-cat-litter.mp4` }
  ].map((asset, index) => ({ id: `static-production-video-${index}`, category: "productionVideos", type: "video", ...asset })),
  certifications: [
    { id: "static-certification", label: "Certification File", category: "certifications", type: "image", src: `${ASSET_BASE}certificate.avif` }
  ]
};

const POSITIONING = {
  low: {
    label: "entry-level",
    focus: "price, fast turnover, and basic stable quality",
    buyer: "price-sensitive buyers"
  },
  mid: {
    label: "mid-range",
    focus: "balanced cost, consistent quality, and repeat orders",
    buyer: "buyers who need margin and reliability"
  },
  midHigh: {
    label: "upper-mid-range",
    focus: "better quality, stronger presentation, and product differentiation",
    buyer: "buyers who want better retail or brand value"
  },
  high: {
    label: "premium",
    focus: "quality details, brand value, customization, and long-term consistency",
    buyer: "premium and brand-focused buyers"
  }
};

const CUSTOMER_RULES = {
  importer: {
    label: "Importer",
    needs: ["stable supply", "export experience", "delivery control", "documents support"],
    pains: ["supplier lead time is not stable", "documents are incomplete", "quality changes between sample and bulk order", "communication is slow before shipment"],
    angle: "Reduce import risk with factory supply, clear documents, stable lead time, and proof from catalog, factory photos, and video.",
    sellingPoints: ["export document support", "stable production capacity", "quality checks before shipment", "clear packing and lead time"],
    ctas: ["Would you like me to send a short quotation and sample plan?", "May I share our catalog and a few suitable models first?", "If this category is active for you, I can prepare price and packing details."],
    google: ["{product} importer {country}", "{product} distributor {country}", "pet supplies importer {country}", "{product} wholesale importer"],
    linkedin: ["{product} importer {country}", "import manager pet supplies {country}", "sourcing manager {product}", "purchasing manager pet products"],
    importyeti: ["{product}", "cat litter", "pet supplies", "bentonite"],
    b2b: ["{product} buyer {country}", "{product} importers list", "pet supplies distributor {country}", "{product} B2B buyer"]
  },
  distributor: {
    label: "Distributor",
    needs: ["profit space", "long-term cooperation", "stable replenishment", "clear product range"],
    pains: ["margin is squeezed by freight and unstable cost", "supplier cannot support repeat supply", "product range is not clear enough", "slow response affects local sales"],
    angle: "Talk about margin, repeat supply, fast-selling SKUs, and how factory materials help them sell to local channels.",
    sellingPoints: ["factory direct pricing", "repeat supply support", "sellable product range", "stable packaging options"],
    ctas: ["Can I send you our fast-moving models and distributor price reference?", "Would it help if I prepared a product list for your local channels?", "May I share our catalog and discuss a first trial order?"],
    google: ["{product} wholesaler {country}", "{product} distributor {country}", "pet product distributor {country}", "{product} bulk buyer"],
    linkedin: ["wholesale buyer {product}", "pet supplies distributor {country}", "distribution manager pet products", "purchasing manager wholesale {country}"],
    importyeti: ["pet supplies distributor", "{product} distributor", "cat litter distributor", "wholesale pet products"],
    b2b: ["{product} wholesale marketplace", "{product} bulk import {country}", "pet wholesale directory", "{product} distributor leads"]
  },
  brand: {
    label: "Brand Owner",
    needs: ["OEM support", "ODM development", "packaging customization", "stable quality"],
    pains: ["standard products look too similar", "custom packaging MOQ is unclear", "quality is not consistent enough for a brand", "factory communication is weak on details"],
    angle: "Lead with OEM/ODM, private label packaging, quality stability, and factory proof instead of a hard price pitch.",
    sellingPoints: ["OEM packaging", "ODM support", "stable batch quality", "custom logo and packing options"],
    ctas: ["Would you like to review our OEM options and packaging examples?", "May I send catalog, photos, and customization ideas for your brand?", "If you have target specs, I can suggest a private-label plan."],
    google: ["private label {product} {country}", "pet brand owner {country}", "OEM {product} buyer", "{product} brand owner"],
    linkedin: ["founder pet brand {country}", "brand manager pet supplies", "private label buyer pet products", "owner {product} brand"],
    importyeti: ["private label cat litter", "OEM pet supplies", "{product} brand", "pet product brand"],
    b2b: ["private label pet supplies buyer", "OEM {product} buyer", "{product} brand directory", "custom pet products buyer"]
  },
  ecommerce: {
    label: "E-commerce Seller",
    needs: ["small MOQ", "clear product selling points", "fast market testing", "photos and specs for listings"],
    pains: ["MOQ is too high for testing", "listing materials are weak", "packaging creates bad reviews", "supplier response is slow for small orders"],
    angle: "Keep it short and practical. Emphasize test orders, product photos, selling points, and fast sample discussion.",
    sellingPoints: ["low MOQ discussion", "product photos and specs", "clear selling points", "packing suitable for online orders"],
    ctas: ["Can I send photos and a small trial order suggestion?", "Would you like to test a few models first?", "May I share listing-friendly photos, specs, and price reference?"],
    google: ["{product} Amazon seller {country}", "{product} online store {country}", "pet supplies ecommerce seller", "{product} marketplace seller"],
    linkedin: ["ecommerce seller pet supplies", "marketplace seller {product}", "online retailer pet products", "Amazon seller pet supplies {country}"],
    importyeti: ["ecommerce pet supplies", "{product} online store", "marketplace pet products", "cat litter seller"],
    b2b: ["{product} online retailer", "pet ecommerce directory", "marketplace seller pet products", "{product} dropship wholesale"]
  },
  retail: {
    label: "Retail Chain",
    needs: ["standardized supply", "retail packaging", "replenishment ability", "stable shelf-ready quality"],
    pains: ["packaging is not retail-ready", "replenishment is slow", "specs are not standardized", "quality issues create store complaints"],
    angle: "Show shelf-ready presentation, catalog, product photos, standard specs, and replenishment capacity.",
    sellingPoints: ["retail packaging", "standardized specs", "replenishment support", "consistent quality for store channels"],
    ctas: ["Would you like me to send our retail-ready catalog and packing details?", "May I share product photos and replenishment information?", "If store channels are relevant, I can prepare a short SKU list for review."],
    google: ["pet store chain {country}", "{product} retail buyer {country}", "pet supplies retail chain", "{product} store buyer"],
    linkedin: ["category buyer pet supplies", "retail buyer {product}", "pet retail purchasing {country}", "chain store buyer pet products"],
    importyeti: ["retail pet supplies", "{product} retail", "pet store chain", "cat litter retailer"],
    b2b: ["pet store chain directory", "{product} retailer list", "retail buyer pet supplies", "{product} chain store buyer"]
  }
};

const PROSPECT_NAME_PARTS = {
  importer: ["Pet Import Partners", "Pet Supply Imports", "Home Pet Import Group", "Cat Care Import House", "Pet Goods Sourcing"],
  distributor: ["Pet Distribution Hub", "Wholesale Pet Supply", "Regional Pet Distributors", "Bulk Pet Goods", "Pet Channel Supply"],
  brand: ["Private Label Pet Co.", "Premium Cat Care Brand", "Pet Lifestyle Brands", "Custom Pet Goods", "Clean Home Pet Brand"],
  ecommerce: ["Online Pet Store", "Marketplace Pet Seller", "Pet Deals Online", "Cat Care E-commerce", "Pet Essentials Store"],
  retail: ["Pet Retail Chain", "Home & Pet Stores", "Pet Shop Group", "Retail Pet Buyers", "Cat Care Store Chain"]
};

const CUSTOMER_TYPE_ORDER = ["importer", "distributor", "brand", "ecommerce", "retail"];

const POSITION_TYPE_FIT = {
  low: { importer: 8, distributor: 10, brand: 3, ecommerce: 8, retail: 5 },
  mid: { importer: 9, distributor: 9, brand: 6, ecommerce: 8, retail: 8 },
  midHigh: { importer: 8, distributor: 7, brand: 10, ecommerce: 8, retail: 10 },
  high: { importer: 6, distributor: 5, brand: 10, ecommerce: 6, retail: 9 }
};

let company = loadCompany();
let customerPool = loadPool();
let currentProspects = [];
let latestBatchText = "";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function loadCompany() {
  try {
    return { ...DEFAULT_COMPANY, ...JSON.parse(localStorage.getItem(STORAGE_KEYS.company)) };
  } catch (error) {
    return structuredClone(DEFAULT_COMPANY);
  }
}

function saveCompany() {
  localStorage.setItem(STORAGE_KEYS.company, JSON.stringify(company));
}

function loadPool() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.pool)) || [];
  } catch (error) {
    return [];
  }
}

function savePool() {
  localStorage.setItem(STORAGE_KEYS.pool, JSON.stringify(customerPool));
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

function makeId() {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function sentenceCase(text) {
  const clean = cleanText(text);
  return clean ? clean.charAt(0).toUpperCase() + clean.slice(1) : "";
}

function normalizeUrl(value) {
  const clean = cleanText(value);
  if (!clean) return "";
  if (/^(https?:|data:|file:)/i.test(clean)) return clean;
  return `https://${clean}`;
}

function absoluteUrl(path) {
  if (!path) return "";
  if (/^(https?:|data:|file:)/i.test(path)) return path;
  try {
    return new URL(path, window.location.href).href;
  } catch (error) {
    return path;
  }
}

function fill(template, data) {
  return template
    .replaceAll("{product}", data.product)
    .replaceAll("{Product}", sentenceCase(data.product))
    .replaceAll("{country}", data.country);
}

function setStatus(message) {
  $("#statusMessage").textContent = message;
}

async function copyText(text) {
  if (!text) return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-999px";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
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
    button.addEventListener("click", () => switchPage(button.dataset.page));
  });
}

function switchPage(pageId) {
  $$(".tab-button").forEach((button) => button.classList.toggle("active", button.dataset.page === pageId));
  $$(".page").forEach((page) => page.classList.toggle("active", page.id === pageId));
}

function initCompanyAssets() {
  $("#companyName").value = company.name || "";
  $("#companyWebsite").value = company.website || "";
  $("#companyAlibaba").value = company.alibaba || "";
  $("#companyCatalogLink").value = company.catalogLink || "";
  $("#companyVideoLink").value = company.videoLink || "";
  $("#companyWhatsapp").value = company.whatsapp || "";
  $("#companyEmail").value = company.email || "";

  $("#companyForm").addEventListener("submit", (event) => {
    event.preventDefault();
    company.name = cleanText($("#companyName").value);
    company.website = cleanText($("#companyWebsite").value);
    company.alibaba = cleanText($("#companyAlibaba").value);
    company.catalogLink = cleanText($("#companyCatalogLink").value);
    company.videoLink = cleanText($("#companyVideoLink").value);
    company.whatsapp = cleanText($("#companyWhatsapp").value);
    company.email = cleanText($("#companyEmail").value);
    saveCompany();
    renderAssets();
    setStatus("公司资料已保存。");
  });

  bindUpload("#logoUpload", "logo", true);
  bindUpload("#productUpload", "products", false);
  bindUpload("#factoryUpload", "factories", false);
  bindUpload("#certUpload", "certifications", false);
  bindUpload("#catalogUpload", "catalogs", false);

  $("#clearUploadsButton").addEventListener("click", () => {
    if (!confirm("确定清空上传素材吗？默认项目素材不会删除。")) return;
    company.logo = null;
    company.uploads = { products: [], factories: [], certifications: [], catalogs: [] };
    saveCompany();
    renderAssets();
    setStatus("上传素材已清空。");
  });

  renderAssets();
}

function bindUpload(selector, bucket, single) {
  $(selector).addEventListener("change", async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    for (const file of files) {
      if (file.size > MAX_UPLOAD_BYTES) {
        setStatus(`${file.name} 文件较大，建议上传到网盘/官网后填写公开链接。`);
        continue;
      }

      const asset = await fileToAsset(file, bucket);
      if (single && bucket === "logo") {
        company.logo = asset;
      } else {
        company.uploads[bucket] = company.uploads[bucket] || [];
        company.uploads[bucket].push(asset);
      }
    }

    saveCompany();
    renderAssets();
    event.target.value = "";
    setStatus("素材已上传并保存到本地浏览器。");
  });
}

function fileToAsset(file, bucket) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        id: makeId(),
        label: file.name,
        category: bucket,
        type: file.type.includes("pdf") ? "pdf" : file.type.includes("video") ? "video" : "image",
        src: reader.result,
        uploaded: true,
        size: file.size
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function getAssets(category) {
  const uploaded = company.uploads?.[category] || [];
  if (category === "catalogs") {
    const linkAsset = company.catalogLink
      ? [{ id: "link-catalog", label: "Product Catalog Link", category, type: "pdf", src: normalizeUrl(company.catalogLink), external: true }]
      : [];
    return [...linkAsset, ...uploaded, ...STATIC_ASSETS.catalogs];
  }
  if (category === "productVideos") {
    const linkAsset = company.videoLink
      ? [{ id: "link-video", label: "Product / Factory Video Link", category, type: "video", src: normalizeUrl(company.videoLink), external: true }]
      : [];
    return [...linkAsset, ...STATIC_ASSETS.productVideos];
  }
  return [...uploaded, ...(STATIC_ASSETS[category] || [])];
}

function getLogoSrc() {
  return company.logo?.src || STATIC_ASSETS.logo.src;
}

function renderAssets() {
  $("#brandLogo").src = getLogoSrc();
  renderAssetSummary();
  renderAssetSections();
}

function renderAssetSummary() {
  const tiles = [
    ["产品图片", getAssets("products").length],
    ["工厂图片", getAssets("factories").length],
    ["视频素材", getAssets("productVideos").length + getAssets("productionVideos").length],
    ["认证/目录", getAssets("certifications").length + getAssets("catalogs").length]
  ];
  $("#assetSummary").innerHTML = tiles
    .map(([label, count]) => `<div class="summary-tile"><strong>${count}</strong><span>${label}</span></div>`)
    .join("");
}

function renderAssetSections() {
  const sections = [
    ["公司Logo", [company.logo || STATIC_ASSETS.logo]],
    ["产品目录", getAssets("catalogs")],
    ["产品图片", getAssets("products")],
    ["工厂图片", getAssets("factories")],
    ["产品视频", getAssets("productVideos")],
    ["生产过程视频", getAssets("productionVideos")],
    ["认证资料", getAssets("certifications")]
  ];

  $("#assetSections").innerHTML = sections
    .map(([title, assets]) => `<section class="asset-section">
      <h3>${escapeHtml(title)}</h3>
      <div class="asset-grid">${assets.map(assetCardHtml).join("")}</div>
    </section>`)
    .join("");

  $$("[data-preview-id]").forEach((button) => {
    button.addEventListener("click", () => openPreview(findAssetById(button.dataset.previewId)));
  });

  $$("[data-delete-asset]").forEach((button) => {
    button.addEventListener("click", () => deleteUploadedAsset(button.dataset.deleteAsset));
  });
}

function assetCardHtml(asset) {
  const preview =
    asset.type === "image"
      ? `<img src="${escapeHtml(asset.src)}" alt="${escapeHtml(asset.label)}" />`
      : asset.type === "video"
        ? `<video src="${escapeHtml(asset.src)}" muted preload="metadata"></video>`
        : `<span class="file-icon">PDF</span>`;

  const deleteButton = asset.uploaded
    ? `<button class="danger-button" type="button" data-delete-asset="${escapeHtml(asset.id)}">删除</button>`
    : `<a href="${escapeHtml(asset.src)}" target="_blank" rel="noopener">打开</a>`;

  return `<article class="asset-card">
    <button class="asset-preview" type="button" data-preview-id="${escapeHtml(asset.id)}">${preview}</button>
    <strong>${escapeHtml(asset.label)}</strong>
    <div class="asset-actions">
      <button class="copy-small" type="button" data-preview-id="${escapeHtml(asset.id)}">预览</button>
      ${deleteButton}
    </div>
  </article>`;
}

function allPreviewAssets() {
  return [
    company.logo || STATIC_ASSETS.logo,
    ...getAssets("catalogs"),
    ...getAssets("products"),
    ...getAssets("factories"),
    ...getAssets("productVideos"),
    ...getAssets("productionVideos"),
    ...getAssets("certifications")
  ];
}

function findAssetById(id) {
  return allPreviewAssets().find((asset) => asset && asset.id === id);
}

function deleteUploadedAsset(id) {
  if (company.logo?.id === id) {
    company.logo = null;
  }
  Object.keys(company.uploads).forEach((bucket) => {
    company.uploads[bucket] = (company.uploads[bucket] || []).filter((asset) => asset.id !== id);
  });
  saveCompany();
  renderAssets();
  setStatus("素材已删除。");
}

function openPreview(asset) {
  if (!asset) return;
  $("#previewType").textContent = asset.type.toUpperCase();
  $("#previewTitle").textContent = asset.label;
  const body = $("#previewBody");
  body.innerHTML = "";

  if (asset.type === "image") {
    const img = document.createElement("img");
    img.src = asset.src;
    img.alt = asset.label;
    body.appendChild(img);
  } else if (asset.type === "video") {
    const video = document.createElement("video");
    video.src = asset.src;
    video.controls = true;
    video.playsInline = true;
    body.appendChild(video);
  } else {
    const iframe = document.createElement("iframe");
    iframe.src = asset.src;
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

function initFinder() {
  $("#finderForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = {
      country: cleanText($("#finderCountry").value),
      product: cleanText($("#finderProduct").value),
      positioning: $("#finderPositioning").value
    };
    if (!data.country || !data.product) return;
    renderLeadFinder(data);
    setStatus("客户发现中心已生成目标客户列表、评分和搜索入口。");
  });

  $("#addSelectedProspectsButton").addEventListener("click", addSelectedProspectsToPool);
}

function renderLeadFinder(data) {
  const position = POSITIONING[data.positioning];
  const rules = CUSTOMER_TYPE_ORDER.map((key) => ({ key, ...CUSTOMER_RULES[key] }));
  renderProfileOutput(rules, position, data);
  renderKeywords(rules, data);
  currentProspects = generateProspects(rules, position, data);
  renderProspects();
  $("#addSelectedProspectsButton").disabled = false;
}

function renderProfileOutput(rules, position, data) {
  $("#profileOutput").classList.remove("empty-state");
  $("#profileOutput").innerHTML = `<div class="profile-detail">
    ${rules
      .map((rule) => {
        const scoreBase = calculateLeadScore(rule.key, data.positioning, 0);
        return `<article class="profile-block">
          <h3>${escapeHtml(rule.label)}</h3>
          <p><strong>建议评分区间：</strong>${scoreBase - 3}-${scoreBase + 8}</p>
          <ul>
            <li><strong>需求：</strong>${escapeHtml(rule.needs.slice(0, 3).join("; "))}</li>
            <li><strong>痛点：</strong>${escapeHtml(rule.pains.slice(0, 3).join("; "))}</li>
            <li><strong>角度：</strong>${escapeHtml(rule.angle)} For ${escapeHtml(data.country)}, emphasize ${escapeHtml(position.focus)}.</li>
          </ul>
        </article>`;
      })
      .join("")}
    <article class="profile-block score-system">
      <h3>客户评分系统</h3>
      <ul>
        <li>产品定位匹配：最高 10 分</li>
        <li>客户类型采购可能性：最高 28 分</li>
        <li>国家市场相关度：最高 18 分</li>
        <li>搜索可触达性：最高 18 分</li>
        <li>素材信任度：官网、目录、图片/视频加分</li>
      </ul>
    </article>
  </div>`;
}

function renderKeywords(rules, data) {
  const collect = (field) =>
    rules
      .flatMap((rule) => rule[field].map((template) => fill(template, data)))
      .filter((keyword, index, list) => list.indexOf(keyword) === index)
      .slice(0, 10);

  const groups = [
    ["Google", collect("google"), (keyword) => `https://www.google.com/search?q=${encodeURIComponent(keyword)}`],
    ["LinkedIn", collect("linkedin"), (keyword) => `https://www.linkedin.com/search/results/companies/?keywords=${encodeURIComponent(keyword)}`],
    ["ImportYeti", collect("importyeti"), (keyword) => `https://www.importyeti.com/search?q=${encodeURIComponent(keyword)}`],
    ["B2B平台", collect("b2b"), (keyword) => `https://www.alibaba.com/trade/search?SearchText=${encodeURIComponent(keyword)}`]
  ];

  $("#keywordOutput").classList.remove("empty-state");
  $("#keywordOutput").innerHTML = `<div class="keyword-grid">${groups
    .map(([title, templates, urlBuilder]) => {
      const rows = templates
        .map((template) => {
          const keyword = fill(template, data);
          return `<div class="keyword-row">
            <span>${escapeHtml(keyword)}</span>
            <a class="search-link" href="${escapeHtml(urlBuilder(keyword))}" target="_blank" rel="noopener">打开搜索</a>
          </div>`;
        })
        .join("");
      return `<article class="keyword-card"><h3>${escapeHtml(title)}</h3>${rows}</article>`;
    })
    .join("")}</div>`;
}

function calculateLeadScore(typeKey, positioning, index) {
  const positioningFit = POSITION_TYPE_FIT[positioning]?.[typeKey] || 6;
  const purchaseIntent = { importer: 27, distributor: 25, brand: 23, ecommerce: 22, retail: 24 }[typeKey] || 22;
  const reachability = 15 + ((index + typeKey.length) % 5);
  const assetTrust = Math.min(
    18,
    8 + getAssets("catalogs").length * 2 + (getAssets("products").length > 0 ? 4 : 0) + (getAssets("factories").length > 0 ? 4 : 0)
  );
  const freshness = 8 + (index % 4);
  return Math.min(98, positioningFit + purchaseIntent + reachability + assetTrust + freshness);
}

function scoreReason(typeKey, positioning, score) {
  const fit = POSITION_TYPE_FIT[positioning]?.[typeKey] || 6;
  return `Score ${score}: positioning fit ${fit}/10, buyer intent matched, searchable website lead, and company assets available for trust building.`;
}

function generateProspects(rules, position, data) {
  const productTitle = sentenceCase(data.product).replace(/\b\w/g, (char) => char.toUpperCase());
  return rules
    .flatMap((rule, ruleIndex) => {
      const names = PROSPECT_NAME_PARTS[rule.key].slice(0, 4);
      return names.map((part, index) => {
        const sequence = ruleIndex * 4 + index;
        const score = calculateLeadScore(rule.key, data.positioning, sequence);
        const companyName = `${data.country} ${part}`;
        const query = `${companyName} ${data.product}`;
        return {
          id: makeId(),
          company: companyName,
          website: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
          country: data.country,
          type: rule.label,
          typeKey: rule.key,
          matchScore: score,
          scoreReason: scoreReason(rule.key, data.positioning, score),
          possibleNeeds: [rule.needs[index % rule.needs.length], rule.needs[(index + 1) % rule.needs.length]],
          possiblePains: [rule.pains[index % rule.pains.length], rule.pains[(index + 2) % rule.pains.length]],
          angle: `${rule.angle} Use ${position.label} positioning and lead with ${position.focus}.`,
          notes: `${productTitle}; ${rule.needs[index % rule.needs.length]}; ${rule.pains[index % rule.pains.length]}`
        };
      });
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}

function renderProspects() {
  const html = currentProspects
    .map(
      (lead) => `<article class="prospect-card">
        <label>
          <input type="checkbox" class="prospect-check" value="${escapeHtml(lead.id)}" />
          <span>${escapeHtml(lead.company)}</span>
        </label>
        <span class="score">Match ${lead.matchScore}</span>
        <div class="meta-list">
          <span><strong>Website:</strong> <a href="${escapeHtml(lead.website)}" target="_blank" rel="noopener">Open search</a></span>
          <span><strong>Country:</strong> ${escapeHtml(lead.country)}</span>
          <span><strong>Customer Type:</strong> ${escapeHtml(lead.type)}</span>
          <span><strong>Lead Score:</strong> ${escapeHtml(lead.matchScore)} - ${escapeHtml(lead.scoreReason)}</span>
          <span><strong>Possible Needs:</strong> ${escapeHtml(lead.possibleNeeds.join("; "))}</span>
          <span><strong>Possible Pain Points:</strong> ${escapeHtml(lead.possiblePains.join("; "))}</span>
          <span><strong>Recommended Angle:</strong> ${escapeHtml(lead.angle)}</span>
        </div>
        <div class="prospect-actions">
          <button class="secondary-button" type="button" data-add-prospect="${escapeHtml(lead.id)}">☑ 加入客户池</button>
        </div>
      </article>`
    )
    .join("");

  $("#prospectResults").classList.remove("empty-state");
  $("#prospectResults").innerHTML = html;

  $$("[data-add-prospect]").forEach((button) => {
    button.addEventListener("click", () => addProspectsToPool([button.dataset.addProspect], true));
  });
}

function addSelectedProspectsToPool() {
  const selectedIds = $$(".prospect-check:checked").map((input) => input.value);
  if (!selectedIds.length) {
    setStatus("请先勾选潜在客户。");
    return;
  }

  addProspectsToPool(selectedIds, true);
}

function addProspectsToPool(selectedIds, shouldNavigate = false) {
  const existingKeys = new Set(customerPool.map((lead) => `${lead.company}-${lead.country}`.toLowerCase()));
  const selected = currentProspects
    .filter((lead) => selectedIds.includes(lead.id))
    .filter((lead) => !existingKeys.has(`${lead.company}-${lead.country}`.toLowerCase()))
    .map((lead) => ({
      id: makeId(),
      company: lead.company,
      website: lead.website,
      country: lead.country,
      type: lead.type,
      matchScore: lead.matchScore,
      status: "New Lead",
      notes: `Needs: ${lead.possibleNeeds.join("; ")} | Pain: ${lead.possiblePains.join("; ")} | Angle: ${lead.angle} | ${lead.scoreReason}`
    }));

  customerPool = [...selected, ...customerPool];
  savePool();
  renderCustomerPool();
  if (shouldNavigate) {
    switchPage("poolPage");
  }
  setStatus(selected.length ? `已加入客户池 ${selected.length} 个客户。` : "客户已在客户池中，无需重复添加。");
}

function initCustomerPool() {
  populateStatusSelect("#manualStatus");

  $("#manualLeadForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const lead = {
      id: makeId(),
      company: cleanText($("#manualCompany").value),
      website: cleanText($("#manualWebsite").value),
      country: cleanText($("#manualCountry").value),
      type: $("#manualType").value,
      matchScore: Number($("#manualScore").value) || 70,
      status: $("#manualStatus").value,
      notes: cleanText($("#manualNotes").value)
    };
    if (!lead.company || !lead.country) return;
    customerPool.unshift(lead);
    savePool();
    renderCustomerPool();
    event.target.reset();
    populateStatusSelect("#manualStatus");
    $("#manualScore").value = 72;
    setStatus("客户已加入客户池。");
  });

  $("#importPoolCsvButton").addEventListener("click", () => {
    const imported = parsePoolCsv($("#poolCsvInput").value);
    customerPool = [...imported, ...customerPool];
    savePool();
    renderCustomerPool();
    $("#poolCsvInput").value = "";
    setStatus(`已导入 ${imported.length} 个客户。`);
  });

  $("#exportPoolButton").addEventListener("click", async () => {
    const copied = await copyText(poolToCsv(customerPool));
    setStatus(copied ? "客户池CSV已复制。" : "复制失败，请手动选择内容。");
  });

  $("#clearPoolButton").addEventListener("click", () => {
    if (!confirm("确定清空客户池吗？")) return;
    customerPool = [];
    savePool();
    renderCustomerPool();
    setStatus("客户池已清空。");
  });

  $("#selectAllPool").addEventListener("change", (event) => {
    $$(".pool-check").forEach((input) => {
      input.checked = event.target.checked;
    });
  });

  $("#goBatchButton").addEventListener("click", () => switchPage("batchPage"));

  renderCustomerPool();
}

function populateStatusSelect(selector, selected = "New Lead") {
  $(selector).innerHTML = STATUS_OPTIONS.map((status) => `<option ${status === selected ? "selected" : ""}>${status}</option>`).join("");
}

function renderCustomerPool() {
  const body = $("#poolTableBody");
  $("#selectAllPool").checked = false;

  if (!customerPool.length) {
    body.innerHTML = `<tr><td colspan="9">暂无客户。请从 Lead Finder 勾选加入，或手动添加/CSV导入。</td></tr>`;
    return;
  }

  body.innerHTML = customerPool
    .map(
      (lead) => `<tr>
        <td><input class="pool-check" type="checkbox" value="${escapeHtml(lead.id)}" /></td>
        <td>${escapeHtml(lead.company)}</td>
        <td>${lead.website ? `<a href="${escapeHtml(normalizeUrl(lead.website))}" target="_blank" rel="noopener">Open</a>` : ""}</td>
        <td>${escapeHtml(lead.country)}</td>
        <td>${escapeHtml(lead.type)}</td>
        <td>${escapeHtml(lead.matchScore)}</td>
        <td>
          <select data-pool-status="${escapeHtml(lead.id)}">
            ${STATUS_OPTIONS.map((status) => `<option ${status === lead.status ? "selected" : ""}>${status}</option>`).join("")}
          </select>
        </td>
        <td><textarea data-pool-notes="${escapeHtml(lead.id)}">${escapeHtml(lead.notes || "")}</textarea></td>
        <td><button class="danger-button" type="button" data-delete-pool="${escapeHtml(lead.id)}">删除</button></td>
      </tr>`
    )
    .join("");

  $$("[data-pool-status]").forEach((select) => {
    select.addEventListener("change", () => {
      const lead = customerPool.find((item) => item.id === select.dataset.poolStatus);
      if (lead) lead.status = select.value;
      savePool();
    });
  });

  $$("[data-pool-notes]").forEach((textarea) => {
    textarea.addEventListener("change", () => {
      const lead = customerPool.find((item) => item.id === textarea.dataset.poolNotes);
      if (lead) lead.notes = cleanText(textarea.value);
      savePool();
    });
  });

  $$("[data-delete-pool]").forEach((button) => {
    button.addEventListener("click", () => {
      customerPool = customerPool.filter((lead) => lead.id !== button.dataset.deletePool);
      savePool();
      renderCustomerPool();
      setStatus("客户已删除。");
    });
  });
}

function parseCsvLine(line) {
  const cells = [];
  let current = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      cells.push(current.trim().replace(/^"|"$/g, ""));
      current = "";
    } else {
      current += char;
    }
  }
  cells.push(current.trim().replace(/^"|"$/g, ""));
  return cells;
}

function parsePoolCsv(text) {
  const rows = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (!rows.length) return [];

  const dataRows = rows[0].toLowerCase().includes("company") ? rows.slice(1) : rows;
  return dataRows
    .map(parseCsvLine)
    .filter((cols) => cols[0])
    .map((cols) => ({
      id: makeId(),
      company: cleanText(cols[0]),
      website: cleanText(cols[1]),
      country: cleanText(cols[2]),
      type: cleanText(cols[3]) || "Importer",
      matchScore: Number(cols[4]) || 70,
      status: STATUS_OPTIONS.includes(cleanText(cols[5])) ? cleanText(cols[5]) : "New Lead",
      notes: cleanText(cols.slice(6).join(" "))
    }));
}

function poolToCsv(pool) {
  const esc = (value) => `"${String(value || "").replaceAll('"', '""')}"`;
  return [
    "Company,Website,Country,Type,Match Score,Status,Notes",
    ...pool.map((lead) => [lead.company, lead.website, lead.country, lead.type, lead.matchScore, lead.status, lead.notes].map(esc).join(","))
  ].join("\n");
}

function initBatch() {
  $("#batchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const selected = getSelectedPoolLeads();
    if (!selected.length) {
      $("#batchOutput").innerHTML = `<div class="empty-state">请先在客户池勾选一个或多个客户。</div>`;
      return;
    }

    const data = {
      product: cleanText($("#batchProduct").value),
      positioning: $("#batchPositioning").value,
      advantages: splitAdvantages($("#batchAdvantages").value)
    };

    if (!data.product) return;

    const emails = selected.map((lead, index) => buildOutreachEmail(lead, data, index));
    latestBatchText = emails.map((item) => `${item.lead.company}\n${item.email}`).join("\n\n------------------------------\n\n");
    renderBatchEmails(emails);
    renderEmailPreviewCenter(emails);
    $("#copyAllEmailsButton").disabled = false;
    $("#copyPreviewEmailsButton").disabled = false;
    switchPage("previewPage");
    setStatus("已为选中客户生成差异化开发信，并同步到预览中心。");
  });

  $("#copyAllEmailsButton").addEventListener("click", async () => {
    const copied = await copyText(latestBatchText);
    setStatus(copied ? "全部开发信已复制。" : "复制失败，请手动选择内容。");
  });

  $("#copyPreviewEmailsButton").addEventListener("click", async () => {
    const copied = await copyText(latestBatchText);
    setStatus(copied ? "预览中心全部邮件已复制。" : "复制失败，请手动选择内容。");
  });
}

function getSelectedPoolLeads() {
  const ids = $$(".pool-check:checked").map((input) => input.value);
  return customerPool.filter((lead) => ids.includes(lead.id));
}

function splitAdvantages(value) {
  return cleanText(value)
    .split(/[,，;；、\n]/)
    .map(cleanText)
    .filter(Boolean);
}

function ruleForLeadType(type) {
  const normalized = String(type || "").toLowerCase();
  if (normalized.includes("distributor") || normalized.includes("wholesale")) return CUSTOMER_RULES.distributor;
  if (normalized.includes("brand")) return CUSTOMER_RULES.brand;
  if (normalized.includes("e-commerce") || normalized.includes("ecommerce") || normalized.includes("online")) return CUSTOMER_RULES.ecommerce;
  if (normalized.includes("retail") || normalized.includes("chain")) return CUSTOMER_RULES.retail;
  return CUSTOMER_RULES.importer;
}

function pickByIndex(items, index, offset = 0) {
  return items[(index + offset) % items.length];
}

function emailAssetLine(asset) {
  if (!asset) return "";
  if (asset.src.startsWith("data:")) {
    return `${asset.label}: uploaded in Company Assets, please share a public link before sending`;
  }
  return `${asset.label}: ${absoluteUrl(asset.src)}`;
}

function coreAssetLines(index) {
  const catalog = getAssets("catalogs")[0] || STATIC_ASSETS.catalogs[0];
  const productPhotos = getAssets("products").map((asset) => ({ ...asset, label: `Product photo - ${asset.label}` }));
  const factoryPhotos = getAssets("factories").map((asset) => ({ ...asset, label: `Factory photo - ${asset.label}` }));
  const productVideos = getAssets("productVideos").map((asset) => ({ ...asset, label: `Product video - ${asset.label}` }));
  const useVideo = index % 3 === 1 && productVideos.length > 0;
  const optionals = useVideo
    ? [productVideos[index % productVideos.length]]
    : [
        productPhotos[index % productPhotos.length],
        factoryPhotos[index % factoryPhotos.length]
      ];

  return [
    company.website ? `Website: ${normalizeUrl(company.website)}` : "Website: please add your website in Company Assets",
    `Product catalog: ${absoluteUrl(catalog.src)}`,
    ...optionals.map(emailAssetLine).filter(Boolean)
  ];
}

function contactLines() {
  const lines = [];
  if (company.whatsapp) lines.push(`WhatsApp: ${company.whatsapp}`);
  if (company.email) lines.push(`Email: ${company.email}`);
  if (company.alibaba) lines.push(`Alibaba: ${normalizeUrl(company.alibaba)}`);
  return lines.length ? lines.join("\n") : "WhatsApp / Email: please add in Company Assets";
}

function buildOutreachEmail(lead, data, index) {
  const rule = ruleForLeadType(lead.type);
  const position = POSITIONING[data.positioning];
  const advantages = data.advantages.length ? data.advantages : rule.sellingPoints;
  const need = pickByIndex(rule.needs, index, 1);
  const pain = pickByIndex(rule.pains, index, 2);
  const sellingPoint = pickByIndex([...advantages, ...rule.sellingPoints], index, 3);
  const cta = pickByIndex(rule.ctas, index, 1);
  const subjectOptions = [
    `${sentenceCase(data.product)} option for ${lead.country} ${rule.label}s`,
    `A practical ${data.product} supplier for ${lead.company}`,
    `${sentenceCase(data.product)} catalog and factory reference`,
    `Can we support your ${data.product} sourcing?`
  ];
  const openingOptions = [
    `I noticed ${lead.company} may be a relevant ${rule.label.toLowerCase()} for ${data.product} in ${lead.country}.`,
    `I am reaching out because ${rule.label.toLowerCase()} buyers often need a supplier that understands ${need}.`,
    `Your market looks suitable for a ${position.label} ${data.product} option with clear product proof.`,
    `I wanted to send a short, practical note rather than a long supplier introduction.`
  ];
  const subject = pickByIndex(subjectOptions, index);
  const assetLines = coreAssetLines(index).join("\n");
  const body = `Subject: ${subject}

Dear Purchasing Manager,

${pickByIndex(openingOptions, index, 2)}

For a ${rule.label}, the key need is usually ${need}. A common issue is that ${pain}, which can slow down a first order or make supplier comparison difficult.

We supply ${data.product} as a ${position.label} option focused on ${position.focus}. For your review, I would mainly highlight ${sellingPoint}, together with ${advantages.slice(0, 2).join(" and ")}.

To make the first check easier, here are only the most useful materials:
${assetLines}

${cta}

Best regards,
[Your Name]
${company.name || "[Your Company]"}
${contactLines()}`;

  return {
    lead,
    subject,
    email: body,
    wordCount: countWords(body)
  };
}

function countWords(text) {
  return text
    .replace(/^Subject:.*$/m, "")
    .split(/\s+/)
    .filter((word) => /[A-Za-z0-9]/.test(word)).length;
}

function renderBatchEmails(emails) {
  $("#batchOutput").classList.remove("empty-state");
  $("#batchOutput").innerHTML = `<div class="batch-list">${emails
    .map(
      (item, index) => `<article class="batch-card">
        <div class="section-head compact">
          <div>
            <h3>${index + 1}. ${escapeHtml(item.lead.company)}</h3>
            <p class="word-count">${escapeHtml(item.lead.type)} / ${escapeHtml(item.lead.country)} / ${item.wordCount} words</p>
          </div>
          <button class="copy-small" type="button" data-copy-email="${index}">复制这封</button>
        </div>
        <textarea readonly>${escapeHtml(item.email)}</textarea>
      </article>`
    )
    .join("")}</div>`;

  $$("[data-copy-email]").forEach((button) => {
    button.addEventListener("click", async () => {
      const copied = await copyText(emails[Number(button.dataset.copyEmail)].email);
      setStatus(copied ? "单封开发信已复制。" : "复制失败，请手动选择内容。");
    });
  });
}

function renderEmailPreviewCenter(emails) {
  $("#emailPreviewOutput").classList.remove("empty-state");
  $("#emailPreviewOutput").innerHTML = `<div class="batch-list">${emails
    .map(
      (item, index) => `<article class="batch-card email-preview-card">
        <div class="section-head compact">
          <div>
            <h3>${index + 1}. ${escapeHtml(item.lead.company)}</h3>
            <p class="word-count">${escapeHtml(item.subject)} / ${item.wordCount} words</p>
          </div>
          <button class="copy-small" type="button" data-copy-preview-email="${index}">复制预览邮件</button>
        </div>
        <textarea readonly>${escapeHtml(item.email)}</textarea>
      </article>`
    )
    .join("")}</div>`;

  $$("[data-copy-preview-email]").forEach((button) => {
    button.addEventListener("click", async () => {
      const copied = await copyText(emails[Number(button.dataset.copyPreviewEmail)].email);
      setStatus(copied ? "预览邮件已复制。" : "复制失败，请手动选择内容。");
    });
  });
}

function initPreview() {
  $("#closePreviewButton").addEventListener("click", closePreview);
  $("#previewModal").addEventListener("click", (event) => {
    if (event.target.id === "previewModal") closePreview();
  });
}

function init() {
  initTabs();
  initCompanyAssets();
  initPreview();
  initFinder();
  initCustomerPool();
  initBatch();
}

init();
