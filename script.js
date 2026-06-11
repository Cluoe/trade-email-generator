const form = document.querySelector("#leadForm");
const statusMessage = document.querySelector("#statusMessage");
const copyButtons = document.querySelectorAll(".copy-button");

const fields = {
  country: document.querySelector("#country"),
  product: document.querySelector("#product"),
  customerType: document.querySelector("#customerType"),
  company: document.querySelector("#company"),
  painPoint: document.querySelector("#painPoint"),
  advantages: document.querySelector("#advantages"),
  tone: document.querySelector("#tone"),
  firstContact: document.querySelector("#firstContact")
};

const outputs = {
  subject: document.querySelector("#subjectOutput"),
  email: document.querySelector("#emailOutput"),
  linkedin: document.querySelector("#linkedinOutput"),
  whatsapp: document.querySelector("#whatsappOutput"),
  followup: document.querySelector("#followupOutput")
};

const customerProfiles = {
  wholesaler: {
    label: "wholesaler",
    decisionFocus: "stable supply, competitive pricing, and products that move well through local channels",
    angle: "help you expand your product range without adding supply risk",
    defaultBenefits: ["bulk order support", "competitive pricing", "flexible packing", "stable repeat supply"]
  },
  importer: {
    label: "importer",
    decisionFocus: "complete export documents, predictable delivery, and clear communication",
    angle: "make your sourcing process smoother from sample review to shipment",
    defaultBenefits: ["export-ready documents", "quality checks before shipment", "clear lead times", "logistics coordination"]
  },
  retailer: {
    label: "retailer",
    decisionFocus: "retail-ready presentation, reliable quality, and healthy margins",
    angle: "bring practical new options to your shelves or online store",
    defaultBenefits: ["retail packaging", "attractive product presentation", "small trial order support", "repeatable quality"]
  },
  brand: {
    label: "brand owner",
    decisionFocus: "customization, consistency, and long-term product development",
    angle: "support your brand with products that can be adjusted around your market positioning",
    defaultBenefits: ["OEM/ODM support", "logo and packaging customization", "consistent batch quality", "product upgrade suggestions"]
  },
  ecommerce: {
    label: "e-commerce seller",
    decisionFocus: "fast testing, clear selling points, and packaging that works for online orders",
    angle: "help you test and scale products with less friction",
    defaultBenefits: ["marketplace-friendly options", "quick sample support", "product photos and specs", "low MOQ discussion"]
  }
};

const toneProfiles = {
  formal: {
    greeting: ["Dear Purchasing Manager,", "Dear Sir or Madam,", "Dear Sourcing Team,"],
    opener: [
      "I hope this email finds you well.",
      "I am reaching out to explore a possible supply opportunity with your team.",
      "I wanted to introduce our company as a potential supplier for your product category."
    ],
    connector: "Based on your business type and market, I believe there may be a practical fit.",
    cta: [
      "Would you be open to receiving our catalog and quotation for review?",
      "May I send you more product details and price references?",
      "If this category is relevant, I would be glad to prepare more information for your evaluation."
    ],
    signoff: "Best regards,"
  },
  concise: {
    greeting: ["Hi,", "Hello,", "Hi there,"],
    opener: [
      "I will keep this short.",
      "Just a quick note from our sales team.",
      "I wanted to check if this product category is relevant to your current sourcing."
    ],
    connector: "We may be able to support you with a simple and reliable supply option.",
    cta: [
      "Can I send you a quick catalog and price reference?",
      "Would it be useful if I shared our main models?",
      "Are you open to checking a new supplier option?"
    ],
    signoff: "Regards,"
  },
  friendly: {
    greeting: ["Hi there,", "Hello,", "Hi,"],
    opener: [
      "Hope you are having a good week.",
      "I hope everything is going well on your side.",
      "I am writing with a simple idea that may be useful for your sourcing work."
    ],
    connector: "From what we see in the market, this product could be a practical option for your customers.",
    cta: [
      "Would you like me to send a few suitable options and prices?",
      "Happy to share photos, specs, and sample details if you are interested.",
      "If this sounds relevant, I can prepare a short product list for you."
    ],
    signoff: "Best regards,"
  },
  sales: {
    greeting: ["Hi,", "Hello,", "Dear Buyer,"],
    opener: [
      "I am contacting you because we are helping buyers improve cost, quality, and supply stability in this category.",
      "If you are looking for a stronger supplier option, our team may be worth a quick look.",
      "We are currently offering reliable supply options for buyers who want better margins and faster response."
    ],
    connector: "The main value is that you can compare quality, price, and response speed with your current supplier.",
    cta: [
      "May I send you our competitive offer this week?",
      "Would you like to compare our price and quality with your current supplier?",
      "If you send your target specs, I can prepare a quote quickly."
    ],
    signoff: "Best regards,"
  },
  expo: {
    greeting: ["Dear Sir or Madam,", "Hello,", "Dear Purchasing Manager,"],
    opener: [
      "We are preparing our latest product information and would like to invite you to connect with us.",
      "I am reaching out before our upcoming trade fair schedule to see if this category is of interest to you.",
      "Our team is arranging meetings with potential buyers and partners, and your market looks relevant to us."
    ],
    connector: "We can share product details in advance and arrange a short online or fair meeting if helpful.",
    cta: [
      "Would you be interested in receiving our catalog before a meeting?",
      "May I reserve a short meeting time and send our product list first?",
      "If you plan to review new suppliers soon, I would be glad to arrange a quick discussion."
    ],
    signoff: "Best regards,"
  }
};

const countryInsights = {
  "united states": "buyers in the United States often care about stable quality, clear labeling, and responsive after-sales support",
  usa: "buyers in the United States often care about stable quality, clear labeling, and responsive after-sales support",
  germany: "German buyers usually value consistent quality, precise details, and dependable delivery schedules",
  "united kingdom": "UK buyers often look for clear communication, practical packaging, and reliable restocking",
  france: "French buyers often value product presentation, compliance awareness, and a polished retail feel",
  canada: "Canadian buyers usually care about quality consistency, flexible logistics, and long-term supplier reliability",
  australia: "Australian buyers often need dependable supply, clear product information, and manageable lead times",
  japan: "Japanese buyers usually pay close attention to detail, packaging quality, and consistent standards",
  "south korea": "Korean buyers often respond well to updated designs, quick samples, and clear product positioning",
  "united arab emirates": "UAE buyers often look for competitive supply, attractive presentation, and flexible order support",
  "saudi arabia": "Saudi buyers often value steady supply, suitable packaging, and quick commercial response",
  brazil: "Brazilian buyers usually care about competitive pricing, stable lead times, and practical import support",
  mexico: "Mexican buyers often need flexible order support, competitive pricing, and reliable follow-up"
};

const subjectPatterns = [
  "{product} supplier for the {country} market",
  "Supply options for {product} in {country}",
  "Can we support your {product} sourcing?",
  "A practical {product} option for {companyOrType}",
  "{product} proposal for your {customerType} business"
];

const proofLines = [
  "We can support samples, trial orders, and regular repeat orders depending on your plan.",
  "Our team can respond quickly with photos, specifications, packing details, and quotation sheets.",
  "Before shipment, we check product appearance, packing, and key order details to reduce avoidable issues.",
  "We are comfortable working with buyers who need both standard models and customized solutions."
];

let generationIndex = 0;

function cleanText(value) {
  return value.trim().replace(/\s+/g, " ");
}

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function rotatePick(items) {
  generationIndex += 1;
  return items[generationIndex % items.length];
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

function getCountryInsight(country) {
  const key = country.toLowerCase();
  return countryInsights[key] || `buyers in ${country} usually value reliable quality, clear communication, and stable delivery`;
}

function splitAdvantages(text, fallbackPoints) {
  if (!text) {
    return shuffle(fallbackPoints).slice(0, 3);
  }

  const points = text
    .split(/[,，;；、\n]/)
    .map((item) => cleanText(item))
    .filter(Boolean);

  return points.length ? points.slice(0, 4) : shuffle(fallbackPoints).slice(0, 3);
}

function formatBullets(points) {
  return points.map((point) => `- ${sentenceCase(point)}`).join("\n");
}

function buildSubject(data, profile) {
  const pattern = rotatePick(subjectPatterns);
  const companyOrType = data.company || `${profile.label}s`;

  return pattern
    .replace("{product}", sentenceCase(data.product))
    .replace("{country}", data.country)
    .replace("{companyOrType}", companyOrType)
    .replace("{customerType}", profile.label);
}

function buildPrimaryEmail(data, profile, toneProfile, advantages) {
  const greeting = pick(toneProfile.greeting);
  const opener = pick(toneProfile.opener);
  const companyLine = data.company
    ? `I came across ${data.company} and thought your team may be interested in new ${data.product} supply options.`
    : `I noticed your market may have demand for ${data.product}, so I wanted to reach out.`;
  const contactLine =
    data.firstContact === "yes"
      ? "This is my first time contacting you, so I will keep the introduction clear and practical."
      : "I wanted to follow up with a more specific note in case this product category is still on your sourcing list.";
  const painLine = data.painPoint
    ? `Regarding ${data.painPoint}, we can first review your exact requirements and then suggest a suitable specification, packing method, and price level.`
    : `For the ${data.country} market, ${getCountryInsight(data.country)}.`;
  const proofLine = pick(proofLines);
  const cta = pick(toneProfile.cta);

  return `${greeting}

${opener} ${companyLine}

${contactLine}

We supply ${data.product} for overseas B2B buyers, especially ${profile.label}s who care about ${profile.decisionFocus}. ${toneProfile.connector}

${painLine}

What we can offer:
${formatBullets(advantages)}

${proofLine}

${cta} I can send product photos, specifications, MOQ, lead time, and a quotation for your review.

${toneProfile.signoff}
[Your Name]
[Your Company]
[Email / WhatsApp / Website]`;
}

function buildLinkedInMessage(data, profile, toneProfile) {
  const companyPart = data.company ? ` at ${data.company}` : "";
  const painPart = data.painPoint ? ` I noticed many buyers are working on ${data.painPoint}, and we may be able to help.` : "";
  const firstLine =
    data.firstContact === "yes"
      ? `Hi, I work with ${data.product} suppliers for the ${data.country} market.`
      : `Hi, just following up here as well. We support ${profile.label}s with ${data.product}.`;

  if (data.tone === "concise") {
    return `${firstLine} We help ${profile.label}s with ${profile.angle}.${painPart} Open to connecting?`;
  }

  if (data.tone === "sales") {
    return `${firstLine} If you are comparing suppliers, we may help with better cost control, faster response, and more stable supply.${painPart} Could I send you a few suitable options?`;
  }

  if (data.tone === "expo") {
    return `Hi${companyPart}, we are preparing product information and meeting slots for buyers interested in ${data.product}. If this category is relevant for your ${data.country} business, I would be glad to connect and share details.`;
  }

  return `${firstLine} I thought it could be relevant for your work${companyPart}. We can share product photos, specs, and price references if you are open to checking a new supplier option.${painPart}`;
}

function buildWhatsAppMessage(data, profile) {
  const intro =
    data.firstContact === "yes"
      ? `Hi, this is [Your Name] from [Your Company].`
      : `Hi, this is [Your Name] again from [Your Company].`;
  const companyPart = data.company ? ` I wanted to contact ${data.company} about this.` : "";
  const painPart = data.painPoint ? ` We may help with ${data.painPoint}.` : "";

  if (data.tone === "concise") {
    return `${intro} We supply ${data.product} for ${profile.label}s in ${data.country}.${companyPart}${painPart} May I send you our catalog and price reference?`;
  }

  if (data.tone === "friendly") {
    return `${intro} Hope you are doing well. We supply ${data.product} and may have suitable options for your ${data.country} market.${companyPart}${painPart} Would you like me to share a few photos and prices?`;
  }

  if (data.tone === "expo") {
    return `${intro} We are arranging short meetings with buyers interested in ${data.product}.${companyPart} May I send our product list first and check if this category is relevant to you?`;
  }

  return `${intro} We are a supplier of ${data.product} and support ${profile.label}s with ${profile.decisionFocus}.${companyPart}${painPart} Can I share more details with you?`;
}

function buildFollowupEmail(data, profile, toneProfile) {
  const subject = `Follow-up: ${sentenceCase(data.product)} for ${data.country}`;
  const greeting = pick(toneProfile.greeting);
  const opener =
    data.firstContact === "yes"
      ? "I just wanted to follow up on my previous message."
      : "I wanted to check back in case this sourcing topic is still active on your side.";
  const painReminder = data.painPoint
    ? `If ${data.painPoint} is still something you want to improve, we can suggest a few practical options.`
    : `If you are still reviewing ${data.product} suppliers, we can prepare details based on your target market.`;

  return `Subject: ${subject}

${greeting}

${opener}

We supply ${data.product} for ${profile.label}s and can support your ${data.country} market with ${profile.decisionFocus}.

${painReminder}

Would it be helpful if I sent a short product list with photos, specifications, MOQ, and price reference?

${toneProfile.signoff}
[Your Name]`;
}

function collectData() {
  return {
    country: cleanText(fields.country.value),
    product: cleanText(fields.product.value),
    customerType: fields.customerType.value,
    company: cleanText(fields.company.value),
    painPoint: cleanText(fields.painPoint.value),
    advantagesText: cleanText(fields.advantages.value),
    tone: fields.tone.value,
    firstContact: fields.firstContact.value
  };
}

function generateContent(data) {
  const profile = customerProfiles[data.customerType];
  const toneProfile = toneProfiles[data.tone];
  const advantages = splitAdvantages(data.advantagesText, profile.defaultBenefits);

  return {
    subject: buildSubject(data, profile),
    email: buildPrimaryEmail(data, profile, toneProfile, advantages),
    linkedin: buildLinkedInMessage(data, profile, toneProfile),
    whatsapp: buildWhatsAppMessage(data, profile),
    followup: buildFollowupEmail(data, profile, toneProfile)
  };
}

function setStatus(message) {
  statusMessage.textContent = message;
}

function enableCopyButtons() {
  copyButtons.forEach((button) => {
    button.disabled = false;
  });
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

  if (!data.country || !data.product) {
    setStatus("请先填写目标国家和产品名称。");
    return;
  }

  const generated = generateContent(data);

  outputs.subject.value = generated.subject;
  outputs.email.value = generated.email;
  outputs.linkedin.value = generated.linkedin;
  outputs.whatsapp.value = generated.whatsapp;
  outputs.followup.value = generated.followup;

  enableCopyButtons();
  setStatus("已生成。再次点击会切换表达。");
});

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const targetId = button.dataset.copy;
    const target = document.querySelector(`#${targetId}`);
    const copied = await copyText(target.value);
    setStatus(copied ? "已复制到剪贴板。" : "复制失败，请手动选择内容。");
  });
});
