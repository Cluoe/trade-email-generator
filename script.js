const form = document.querySelector("#profileForm");
const statusMessage = document.querySelector("#statusMessage");
const summaryPanel = document.querySelector("#summaryPanel");
const profileResults = document.querySelector("#profileResults");
const copyAllButton = document.querySelector("#copyAllButton");

const fields = {
  country: document.querySelector("#country"),
  product: document.querySelector("#product"),
  positioning: document.querySelector("#positioning"),
  priceInfo: document.querySelector("#priceInfo"),
  moq: document.querySelector("#moq"),
  advantages: document.querySelector("#advantages"),
  autoRecommend: document.querySelector("#autoRecommend")
};

const positioningProfiles = {
  low: {
    label: "entry-level",
    market: "price-sensitive and fast-moving",
    buyerFocus: "landed cost, fast turnover, and simple reliable quality",
    supplierTone: "cost control and stable basic quality"
  },
  mid: {
    label: "mid-range",
    market: "balanced between price, quality, and repeat sales",
    buyerFocus: "reliable quality, workable margin, and steady restocking",
    supplierTone: "balanced value, consistent quality, and practical margins"
  },
  midHigh: {
    label: "upper-mid-range",
    market: "quality-focused with room for better design and packaging",
    buyerFocus: "differentiation, stable quality, and better presentation",
    supplierTone: "better materials, stronger presentation, and dependable supply"
  },
  high: {
    label: "premium",
    market: "quality-driven and brand-sensitive",
    buyerFocus: "product details, brand image, compliance awareness, and long-term consistency",
    supplierTone: "premium positioning, customization, and strict quality control"
  }
};

const countryInsights = {
  "united states": "US buyers usually care about clear specs, stable quality, packaging details, and fast response",
  usa: "US buyers usually care about clear specs, stable quality, packaging details, and fast response",
  germany: "German buyers usually value precise product details, consistent quality, and dependable delivery",
  "united kingdom": "UK buyers often look for clear communication, retail-friendly presentation, and reliable restocking",
  france: "French buyers often care about presentation, design taste, and a polished retail feeling",
  canada: "Canadian buyers usually value quality consistency, flexible logistics, and long-term supplier reliability",
  australia: "Australian buyers often need dependable supply, clear product information, and manageable lead time",
  japan: "Japanese buyers usually pay close attention to detail, packaging quality, and consistent standards",
  "south korea": "Korean buyers often respond well to updated designs, fast samples, and clear product positioning",
  "united arab emirates": "UAE buyers often look for attractive presentation, flexible order support, and responsive service",
  "saudi arabia": "Saudi buyers often value steady supply, suitable packaging, and quick commercial response",
  brazil: "Brazilian buyers usually care about competitive pricing, stable lead time, and practical import support",
  mexico: "Mexican buyers often need flexible order support, competitive pricing, and reliable follow-up"
};

const targetProfiles = [
  {
    id: "importerDistributor",
    name: "Importer / Regional Distributor",
    fit: {
      low: 4,
      mid: 5,
      midHigh: 5,
      high: 3
    },
    moqFit: {
      low: 2,
      medium: 4,
      high: 5,
      unknown: 3
    },
    keywords: {
      capacity: 2,
      certificate: 1,
      qc: 1
    },
    needs: [
      "A supplier who can support repeat orders and stable shipment planning",
      "Clear pricing, packing details, and export documents",
      "Products that can be distributed across several local channels"
    ],
    pains: [
      "Unstable lead time from suppliers",
      "Quality differences between samples and bulk orders",
      "Slow quotation updates and unclear shipment information"
    ],
    angle: "Position the offer as a dependable supply source for regional distribution, with clear price, MOQ, and shipment support.",
    subject: [
      "{product} supply option for distributors in {country}",
      "Reliable {product} supplier for your {country} distribution channels",
      "Can we support your {product} imports?"
    ],
    emailOpening: [
      "I am reaching out because importers and regional distributors often need suppliers who can keep pricing, quality, and shipment timing under control.",
      "Your market looks suitable for a stable {product} supply program, especially for buyers handling repeat distribution.",
      "I wanted to introduce our {product} as a possible option for your import and distribution business."
    ],
    whatsappOpening: "Hi, this is [Your Name] from [Your Company]. We supply {product} for importers and regional distributors in markets like {country}.",
    followupOpening: "I wanted to follow up in case you are still reviewing new supply options for your distribution channels."
  },
  {
    id: "wholesaler",
    name: "Wholesaler / Cash & Carry Buyer",
    fit: {
      low: 5,
      mid: 5,
      midHigh: 3,
      high: 2
    },
    moqFit: {
      low: 2,
      medium: 4,
      high: 5,
      unknown: 3
    },
    keywords: {
      price: 2,
      stock: 2,
      fast: 1
    },
    needs: [
      "Fast-moving products with enough margin for resale",
      "Simple, clear packaging and stable repeat supply",
      "A price level that works for bulk purchasing"
    ],
    pains: [
      "Low margin after freight and local costs",
      "Suppliers changing prices too often",
      "Slow restocking during peak sales periods"
    ],
    angle: "Lead with margin, practical MOQ, and fast repeat supply. Avoid sounding too premium unless the product positioning supports it.",
    subject: [
      "{product} option with workable margin for {country} wholesalers",
      "Bulk supply idea for {product}",
      "Price and MOQ reference for {product}"
    ],
    emailOpening: [
      "I know wholesalers usually need products that are easy to sell again, not just nice on paper.",
      "For wholesale buyers, the key point is usually whether the product can move quickly with a workable margin.",
      "I am contacting you with a practical {product} supply option for bulk sales."
    ],
    whatsappOpening: "Hi, we supply {product} for wholesale buyers. The focus is workable price, stable quality, and repeat supply.",
    followupOpening: "Just following up to see whether a bulk supply option for {product} is useful for your current wholesale plan."
  },
  {
    id: "retailChain",
    name: "Retail Chain / Store Buyer",
    fit: {
      low: 2,
      mid: 5,
      midHigh: 5,
      high: 4
    },
    moqFit: {
      low: 4,
      medium: 4,
      high: 3,
      unknown: 3
    },
    keywords: {
      packaging: 2,
      design: 1,
      qc: 1
    },
    needs: [
      "Retail-ready products with clear selling points",
      "Consistent quality across repeat batches",
      "Packaging and product information suitable for shelves"
    ],
    pains: [
      "Products look good in photos but weak on store shelves",
      "Packaging does not match retail requirements",
      "Difficult reorder planning when supplier lead time changes"
    ],
    angle: "Sell the product as a retail-ready item with clear display value, stable supply, and fewer after-sale issues.",
    subject: [
      "Retail-ready {product} for the {country} market",
      "{product} options for store buyers in {country}",
      "New shelf-ready {product} supply idea"
    ],
    emailOpening: [
      "I am writing because retail buyers usually need products that are ready to sell, easy to explain, and stable for repeat orders.",
      "For store channels, product presentation and reliable restocking are just as important as price.",
      "I wanted to share a {product} option that may fit retail buyers in {country}."
    ],
    whatsappOpening: "Hi, we supply retail-ready {product} with clear specs and packing options for store channels.",
    followupOpening: "I wanted to follow up and see if retail-ready {product} options are relevant to your store buying plan."
  },
  {
    id: "ecommerceSeller",
    name: "E-commerce Seller / Marketplace Store",
    fit: {
      low: 4,
      mid: 5,
      midHigh: 4,
      high: 3
    },
    moqFit: {
      low: 5,
      medium: 4,
      high: 2,
      unknown: 3
    },
    keywords: {
      photo: 2,
      sample: 2,
      lowmoq: 2,
      packaging: 1
    },
    needs: [
      "Products that are easy to test and list online",
      "Clear specs, photos, and selling points",
      "Packing that can handle online order handling"
    ],
    pains: [
      "High MOQ makes product testing risky",
      "Poor product information slows down listing work",
      "Packaging issues lead to bad reviews or returns"
    ],
    angle: "Keep the message short and test-oriented. Emphasize sample support, listing materials, and a practical first order.",
    subject: [
      "{product} idea for your online store",
      "Testable {product} option for {country} e-commerce sellers",
      "Photos, specs, and price reference for {product}"
    ],
    emailOpening: [
      "I am contacting you because e-commerce sellers usually need products that can be tested quickly and explained clearly online.",
      "Online sellers care about good photos, reliable packing, and products that can earn repeat reviews.",
      "I wanted to share a practical {product} option for marketplace sellers in {country}."
    ],
    whatsappOpening: "Hi, we supply {product} that can be suitable for e-commerce testing and online listings.",
    followupOpening: "Just following up to see if you would like a few testable {product} options for your online store."
  },
  {
    id: "privateLabelBrand",
    name: "Private Label Brand Owner",
    fit: {
      low: 1,
      mid: 3,
      midHigh: 5,
      high: 5
    },
    moqFit: {
      low: 4,
      medium: 4,
      high: 3,
      unknown: 3
    },
    keywords: {
      oem: 3,
      odm: 3,
      custom: 3,
      logo: 2,
      packaging: 2,
      design: 2
    },
    needs: [
      "Customization options for logo, packaging, or product details",
      "Stable quality that protects brand reputation",
      "A supplier who can support long-term product development"
    ],
    pains: [
      "Factories only sell standard models with little flexibility",
      "Packaging and quality are not consistent enough for a brand",
      "Communication is slow when discussing custom details"
    ],
    angle: "Approach with customization, quality consistency, and brand protection rather than only price.",
    subject: [
      "Private label {product} support for your {country} market",
      "Custom {product} options for brand buyers",
      "{product} OEM idea with stable quality support"
    ],
    emailOpening: [
      "I am reaching out because private label buyers usually need more than a standard product list.",
      "For brand owners, product consistency, packaging, and customization details can decide whether a supplier is useful.",
      "I wanted to introduce our {product} as a possible private label option for the {country} market."
    ],
    whatsappOpening: "Hi, we support private label {product}, including logo and packaging options depending on your order plan.",
    followupOpening: "I wanted to follow up and see if private label or customized {product} is something you are reviewing."
  },
  {
    id: "discountChannel",
    name: "Discount Store / Value Retail Buyer",
    fit: {
      low: 5,
      mid: 4,
      midHigh: 2,
      high: 1
    },
    moqFit: {
      low: 2,
      medium: 4,
      high: 5,
      unknown: 3
    },
    keywords: {
      price: 3,
      cheap: 2,
      stock: 2
    },
    needs: [
      "A sharp price point for value-driven consumers",
      "Large quantity availability and simple packaging",
      "Stable supply for promotion or seasonal sales"
    ],
    pains: [
      "Product cost leaves little room for promotion",
      "Quality is too unstable for high-volume value channels",
      "Suppliers cannot support urgent quantity changes"
    ],
    angle: "Focus on price point, volume, and basic quality control. Keep the message direct and commercially practical.",
    subject: [
      "Value-focused {product} supply for {country}",
      "{product} option for discount and promotion channels",
      "Cost-effective {product} with MOQ reference"
    ],
    emailOpening: [
      "I am contacting you with a value-focused {product} option that may work for discount or promotion channels.",
      "For value retail buyers, the product needs to hit a practical price point without creating quality problems.",
      "I wanted to share a cost-effective {product} supply option for the {country} market."
    ],
    whatsappOpening: "Hi, we have a cost-effective {product} option for value retail and promotion channels.",
    followupOpening: "Following up to check whether a value-focused {product} offer could fit your upcoming buying plan."
  },
  {
    id: "premiumBoutique",
    name: "Premium Boutique / Specialty Store",
    fit: {
      low: 1,
      mid: 2,
      midHigh: 5,
      high: 5
    },
    moqFit: {
      low: 5,
      medium: 4,
      high: 1,
      unknown: 3
    },
    keywords: {
      design: 3,
      premium: 3,
      packaging: 2,
      quality: 2
    },
    needs: [
      "Better design, nicer finish, or stronger product story",
      "Smaller trial quantities with a premium presentation",
      "Reliable quality that supports a higher retail price"
    ],
    pains: [
      "Mass-market products look too common",
      "Premium packaging is hard to source at a reasonable MOQ",
      "Quality details are not stable enough for specialty buyers"
    ],
    angle: "Use a softer, quality-led message. Highlight differentiation, finish, and premium retail presentation.",
    subject: [
      "Premium {product} option for specialty stores",
      "Upper-range {product} for the {country} market",
      "A differentiated {product} idea for boutique buyers"
    ],
    emailOpening: [
      "I am reaching out because specialty stores often need products that feel different from standard mass-market options.",
      "For boutique buyers, the detail, finish, and presentation of a product can be more important than the lowest price.",
      "I wanted to introduce an upper-range {product} option that may fit premium retail channels in {country}."
    ],
    whatsappOpening: "Hi, we supply upper-range {product} with better presentation and quality details for specialty retail channels.",
    followupOpening: "I wanted to follow up to see if a more differentiated {product} option could be useful for your retail selection."
  },
  {
    id: "projectBuyer",
    name: "Project Buyer / Contractor",
    fit: {
      low: 2,
      mid: 4,
      midHigh: 5,
      high: 4
    },
    moqFit: {
      low: 2,
      medium: 4,
      high: 5,
      unknown: 3
    },
    keywords: {
      specification: 3,
      certificate: 2,
      qc: 2,
      waterproof: 1
    },
    needs: [
      "Stable specifications for project quotations",
      "Reliable lead time and clear technical details",
      "Supplier support for planned quantity and documentation"
    ],
    pains: [
      "Specs are unclear before quotation",
      "Delivery delay affects the whole project schedule",
      "After-sales risk is high when supplier quality is unstable"
    ],
    angle: "Speak in a project-support tone. Emphasize specifications, schedule, documentation, and risk control.",
    subject: [
      "{product} supply support for project buyers",
      "Stable {product} option for {country} projects",
      "Project-ready {product} with quotation details"
    ],
    emailOpening: [
      "I am contacting you because project buyers usually need clear specifications and dependable delivery, not just a low unit price.",
      "For project purchasing, supplier response speed and stable product details can save a lot of back-and-forth work.",
      "I wanted to share a project-ready {product} supply option for buyers in {country}."
    ],
    whatsappOpening: "Hi, we supply {product} for project buyers and can provide specs, packing details, MOQ, and price reference.",
    followupOpening: "I wanted to follow up and see if you need {product} details for any upcoming project quotation."
  },
  {
    id: "giftDistributor",
    name: "Gift & Promotional Product Distributor",
    fit: {
      low: 4,
      mid: 5,
      midHigh: 4,
      high: 2
    },
    moqFit: {
      low: 4,
      medium: 5,
      high: 4,
      unknown: 3
    },
    keywords: {
      logo: 3,
      custom: 2,
      fast: 2,
      packaging: 1
    },
    needs: [
      "Products suitable for campaigns, events, or corporate gifts",
      "Logo or packaging customization with clear lead time",
      "A supplier who can handle repeat promotional orders"
    ],
    pains: [
      "Logo proofing and production take too long",
      "MOQ is not practical for campaign orders",
      "Packaging does not match promotional use"
    ],
    angle: "Pitch the product as a campaign-friendly option with customization, clear MOQ, and fast sample confirmation.",
    subject: [
      "Promotional {product} idea for {country} buyers",
      "Custom {product} option for gift distributors",
      "{product} for campaigns and corporate gifts"
    ],
    emailOpening: [
      "I am writing because gift and promotional distributors often need products that can be customized and delivered within a clear schedule.",
      "For promotional orders, logo options, MOQ, and lead time usually matter as much as the product itself.",
      "I wanted to share a {product} option that may work for campaigns, events, or corporate gift channels."
    ],
    whatsappOpening: "Hi, we supply {product} for gift and promotional orders, with customization options depending on quantity.",
    followupOpening: "Following up to check whether customized {product} could fit any upcoming campaign or gift order."
  }
];

let generatedText = "";

function cleanText(value) {
  return value.trim().replace(/\s+/g, " ");
}

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function sentenceCase(text) {
  if (!text) {
    return "";
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
}

function fill(template, data) {
  return template
    .replaceAll("{product}", data.product)
    .replaceAll("{Product}", sentenceCase(data.product))
    .replaceAll("{country}", data.country)
    .replaceAll("{price}", data.priceInfo)
    .replaceAll("{moq}", data.moq);
}

function splitAdvantages(text) {
  return text
    .split(/[,，;；、\n]/)
    .map((item) => cleanText(item))
    .filter(Boolean)
    .slice(0, 6);
}

function getCountryInsight(country) {
  return countryInsights[country.toLowerCase()] || `buyers in ${country} usually value reliable quality, clear communication, and stable delivery`;
}

function getMoqTier(moq) {
  const match = moq.replace(/,/g, "").match(/\d+/);

  if (!match) {
    return "unknown";
  }

  const value = Number(match[0]);

  if (value <= 200) {
    return "low";
  }

  if (value <= 1500) {
    return "medium";
  }

  return "high";
}

function getMoqSignal(tier, moq) {
  const signals = {
    low: `The MOQ of ${moq} is friendly for trial orders and smaller first tests.`,
    medium: `The MOQ of ${moq} is practical for serious buyers who want to test and reorder.`,
    high: `The MOQ of ${moq} is better suited for buyers with regular volume or distribution capacity.`,
    unknown: `The MOQ is listed as ${moq}, so it should be explained clearly before quotation.`
  };

  return signals[tier];
}

function getAdvantageScore(profile, advantagesText) {
  const lower = advantagesText.toLowerCase();
  let score = 0;

  Object.keys(profile.keywords).forEach((keyword) => {
    if (lower.includes(keyword)) {
      score += profile.keywords[keyword];
    }
  });

  return score;
}

function collectData() {
  return {
    country: cleanText(fields.country.value),
    product: cleanText(fields.product.value),
    positioning: fields.positioning.value,
    priceInfo: cleanText(fields.priceInfo.value),
    moq: cleanText(fields.moq.value),
    advantagesText: cleanText(fields.advantages.value),
    autoRecommend: fields.autoRecommend.value
  };
}

function selectProfiles(data, signals) {
  const defaultIds = ["importerDistributor", "wholesaler", "retailChain", "ecommerceSeller", "privateLabelBrand"];

  if (data.autoRecommend === "no") {
    return defaultIds.map((id) => targetProfiles.find((profile) => profile.id === id));
  }

  return targetProfiles
    .map((profile) => ({
      profile,
      score:
        (profile.fit[data.positioning] || 0) +
        (profile.moqFit[signals.moqTier] || 0) +
        getAdvantageScore(profile, data.advantagesText) +
        Math.random() * 0.35
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((item) => item.profile);
}

function buildNeeds(profile, data, signals) {
  const positioning = positioningProfiles[data.positioning];

  return [
    ...profile.needs,
    `${sentenceCase(positioning.label)} ${data.product} positioned for a ${positioning.market} market`,
    `Price reference around ${data.priceInfo} and MOQ at ${data.moq}`
  ].slice(0, 5);
}

function buildPains(profile, data, signals) {
  const positioning = positioningProfiles[data.positioning];
  const dynamicPain =
    signals.moqTier === "high"
      ? "A high first order quantity can slow down buyer decisions if the offer is not clearly justified"
      : "Buyers may hesitate if the first order does not feel easy to test";

  return [...profile.pains, dynamicPain, `They may compare your ${positioning.label} positioning with cheaper alternatives`].slice(0, 5);
}

function buildAngle(profile, data, signals, advantages) {
  const positioning = positioningProfiles[data.positioning];
  const advantageText = advantages.slice(0, 3).join(", ");

  return `${profile.angle} For ${data.country}, connect the message with ${positioning.supplierTone}. Mention ${data.priceInfo}, MOQ ${data.moq}, and lead with these advantages: ${advantageText}. ${signals.moqSignal}`;
}

function buildEmail(profile, data, signals, advantages, needs, pains, angle) {
  const positioning = positioningProfiles[data.positioning];
  const subject = fill(pick(profile.subject), data);
  const opening = fill(pick(profile.emailOpening), data);
  const countryInsight = getCountryInsight(data.country);
  const advantageBullets = advantages.map((item) => `- ${sentenceCase(item)}`).join("\n");
  const needLine = needs[0].charAt(0).toLowerCase() + needs[0].slice(1);
  const painLine = pains[0].charAt(0).toLowerCase() + pains[0].slice(1);
  const ctaOptions = [
    "Would you be open to receiving our catalog, photos, and a short quotation for review?",
    "May I send you a few suitable models with price, MOQ, packing details, and lead time?",
    "If this category is relevant, I can prepare a quick product list for your market."
  ];

  return `Subject: ${subject}

Dear Purchasing Manager,

${opening}

For the ${data.country} market, ${countryInsight}. That is why I would position our ${data.product} as a ${positioning.label} option focused on ${positioning.buyerFocus}.

For your type of business, the likely need is ${needLine}. A common issue is ${painLine}. Our offer is meant to make this easier with a clear price reference (${data.priceInfo}) and MOQ (${data.moq}).

Main advantages:
${advantageBullets}

${signals.moqSignal}

${pick(ctaOptions)}

Best regards,
[Your Name]
[Your Company]
[Email / WhatsApp / Website]`;
}

function buildWhatsApp(profile, data, signals, advantages) {
  const positioning = positioningProfiles[data.positioning];
  const opening = fill(profile.whatsappOpening, data);
  const advantageText = advantages.slice(0, 2).join(", ");
  const options = [
    `${opening} Our current offer is ${data.priceInfo}, MOQ ${data.moq}. It may fit buyers looking for ${positioning.supplierTone}. Main points: ${advantageText}. May I send photos and details?`,
    `${opening} I think it may be useful if you are checking ${positioning.label} options. Price reference: ${data.priceInfo}; MOQ: ${data.moq}. Can I share a short catalog?`,
    `${opening} We can support ${advantageText}. If ${data.product} is on your sourcing list, I can send specs, packing details, and quotation.`
  ];

  return pick(options);
}

function buildFollowup(profile, data, signals, advantages) {
  const positioning = positioningProfiles[data.positioning];
  const subject = `Follow-up: ${sentenceCase(data.product)} for ${profile.name}`;
  const advantageText = advantages.slice(0, 3).join(", ");

  return `Subject: ${subject}

Dear Purchasing Manager,

${profile.followupOpening}

I believe this could still be relevant if you are looking for a ${positioning.label} ${data.product} option for the ${data.country} market. The current reference is ${data.priceInfo}, with MOQ ${data.moq}.

The main points I would suggest checking first are ${advantageText}. These are usually important when buyers compare suppliers and decide whether to test a first order.

Would it be helpful if I sent a short list with product photos, specifications, packing details, and quotation?

Best regards,
[Your Name]`;
}

function buildProfileResult(profile, data, signals, index) {
  const advantages = splitAdvantages(data.advantagesText);
  const needs = buildNeeds(profile, data, signals);
  const pains = buildPains(profile, data, signals);
  const angle = buildAngle(profile, data, signals, advantages);
  const email = buildEmail(profile, data, signals, advantages, needs, pains, angle);
  const whatsapp = buildWhatsApp(profile, data, signals, advantages);
  const followup = buildFollowup(profile, data, signals, advantages);
  const fitReason = `${profile.name} is suitable because your product is ${positioningProfiles[data.positioning].label}, the price reference is ${data.priceInfo}, and the MOQ is ${data.moq}.`;

  return {
    index,
    profile,
    fitReason,
    needs,
    pains,
    angle,
    email,
    whatsapp,
    followup
  };
}

function profileToText(result) {
  return `Target Customer ${result.index}: ${result.profile.name}

Possible Needs:
${result.needs.map((item) => `- ${item}`).join("\n")}

Common Pain Points:
${result.pains.map((item) => `- ${item}`).join("\n")}

Development Angle:
${result.angle}

English Development Email:
${result.email}

WhatsApp First Message:
${result.whatsapp}

Follow-up Email:
${result.followup}`;
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
}

function createCopyButton(text, label = "复制") {
  const button = createElement("button", "copy-inline", label);
  button.type = "button";
  button.addEventListener("click", async () => {
    const copied = await copyText(text);
    setStatus(copied ? "已复制到剪贴板。" : "复制失败，请手动选择内容。");
  });

  return button;
}

function createListBlock(title, items) {
  const block = createElement("div", "info-block");
  block.appendChild(createElement("h4", "", title));

  const list = createElement("ul");
  items.forEach((item) => {
    list.appendChild(createElement("li", "", item));
  });

  block.appendChild(list);
  return block;
}

function createTextAreaBlock(title, value, compact = false) {
  const block = createElement("div", compact ? "content-block compact" : "content-block");
  const head = createElement("div", "content-head");
  head.appendChild(createElement("h4", "", title));
  head.appendChild(createCopyButton(value));

  const area = createElement("textarea");
  area.readOnly = true;
  area.value = value;

  block.appendChild(head);
  block.appendChild(area);
  return block;
}

function renderResults(results, data, signals) {
  profileResults.innerHTML = "";
  generatedText = results.map(profileToText).join("\n\n------------------------------\n\n");

  summaryPanel.textContent = `${data.autoRecommend === "yes" ? "已自动推荐" : "已使用通用"} 5 类目标客户。定位：${positioningProfiles[data.positioning].label}；报价：${data.priceInfo}；MOQ：${data.moq}。${signals.moqSignal}`;

  results.forEach((result) => {
    const card = createElement("article", "profile-card");
    const header = createElement("div", "profile-card-header");
    const titleWrap = createElement("div");

    titleWrap.appendChild(createElement("span", "profile-number", String(result.index)));
    titleWrap.appendChild(createElement("h3", "", result.profile.name));
    titleWrap.appendChild(createElement("p", "fit-line", result.fitReason));

    header.appendChild(titleWrap);
    header.appendChild(createCopyButton(profileToText(result), "复制整张画像"));
    card.appendChild(header);

    const infoGrid = createElement("div", "profile-info-grid");
    infoGrid.appendChild(createListBlock("可能需求", result.needs));
    infoGrid.appendChild(createListBlock("常见痛点", result.pains));
    infoGrid.appendChild(createListBlock("建议优先沟通", shuffle(["Price and MOQ", "Product fit", "Packing", "Lead time", "Sample plan"]).slice(0, 3)));
    card.appendChild(infoGrid);

    const angleBlock = createElement("div", "angle-block");
    angleBlock.appendChild(createElement("h4", "", "开发角度"));
    angleBlock.appendChild(createElement("p", "", result.angle));
    card.appendChild(angleBlock);

    const contentGrid = createElement("div", "content-grid");
    contentGrid.appendChild(createTextAreaBlock("专属英文开发信", result.email));
    contentGrid.appendChild(createTextAreaBlock("专属 WhatsApp 首条消息", result.whatsapp, true));
    contentGrid.appendChild(createTextAreaBlock("专属 Follow-up 邮件", result.followup));
    card.appendChild(contentGrid);

    profileResults.appendChild(card);
  });

  copyAllButton.disabled = false;
}

function setStatus(message) {
  statusMessage.textContent = message;
}

async function copyText(text) {
  if (!text) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    const temporaryField = document.createElement("textarea");
    temporaryField.value = text;
    temporaryField.setAttribute("readonly", "");
    temporaryField.style.position = "fixed";
    temporaryField.style.left = "-999px";
    document.body.appendChild(temporaryField);
    temporaryField.select();
    const copied = document.execCommand("copy");
    temporaryField.remove();
    return copied;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = collectData();

  if (!data.country || !data.product || !data.priceInfo || !data.moq || !data.advantagesText) {
    setStatus("请先填写所有必填信息。");
    return;
  }

  const signals = {
    moqTier: getMoqTier(data.moq)
  };
  signals.moqSignal = getMoqSignal(signals.moqTier, data.moq);

  const selectedProfiles = selectProfiles(data, signals);
  const results = selectedProfiles.map((profile, index) => buildProfileResult(profile, data, signals, index + 1));

  renderResults(results, data, signals);
  setStatus("已生成 5 类客户画像和专属开发话术。再次点击会调整表达。");
});

copyAllButton.addEventListener("click", async () => {
  const copied = await copyText(generatedText);
  setStatus(copied ? "已复制全部客户画像和话术。" : "复制失败，请手动选择内容。");
});
