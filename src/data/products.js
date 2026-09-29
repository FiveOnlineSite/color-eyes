const categories = [
  {
    id: "clearthin",
    name: "ClearThin",
    price: "₹999.00",
    names: ["ClearThin Air", "ClearThin Lite", "ClearThin Pure", "ClearThin Edge", "ClearThin Ultra", "ClearThin Sleek", "ClearThin Crystal", "ClearThin Prime", "ClearThin Nova", "ClearThin Aura", "ClearThin Optima", "ClearThin Elite"],
  },
  {
    id: "polylite",
    name: "Polylite",
    price: "₹1,499.00",
    names: ["Polylite Air", "Polylite Flex", "Polylite Crystal", "Polylite Swift", "Polylite Clear", "Polylite Active", "Polylite Feather", "Polylite Vision", "Polylite Prime", "Polylite Comfort", "Polylite Shield", "Polylite Ultra"],
  },
  {
    id: "celebration",
    name: "Celebration",
    price: "₹399.00",
    names: [
      "Celebration Clear 38 Torics – Yearly",
      "Celebration Clear – Monthly",
      "Celebration Clear Toric – Monthly",
      "Celebration Daily Disposable Soft Contact Lens",
      "Celebration Weekly Color – Weekly",
      "Celebration Disposable Color Toric – Monthly",
      "Celebration Colors Toric – Yearly",
      "Celebration Colors – Yearly",
      "Celebration Disposable Color – Monthly",
    ],
  },
];

const productsWithoutColorVariants = new Set([
  "Celebration Clear 38 Torics – Yearly",
  "Celebration Clear – Monthly",
  "Celebration Clear Toric – Monthly",
  "Celebration Daily Disposable Soft Contact Lens",
]);

const productsWithoutSafetyCaution = new Set([
  "Celebration Clear 38 Torics – Yearly",
]);

const productPrices = {
  "Celebration Daily Disposable Soft Contact Lens": "₹850 – ₹2,500",
  "Celebration Weekly Color – Weekly": "₹900",
  "Celebration Disposable Color Toric – Monthly": "₹2,100",
  "Celebration Colors Toric – Yearly": "₹4,500",
  "Celebration Colors – Yearly": "₹1,800",
  "Celebration Clear Toric – Monthly": "₹1,095",
  "Celebration Disposable Color – Monthly": "₹998",
  "Celebration Clear 38 Torics – Yearly": "₹2,700",
  "Celebration Clear – Monthly": "₹899",
};

const productFeaturedImages = {
  "Celebration Clear 38 Torics – Yearly": "/assets/products/celebration-clear-products/clear-38-toric-yearly.png",
  "Celebration Clear – Monthly": "/assets/products/celebration-clear-products/clear-monthly.png",
  "Celebration Clear Toric – Monthly": "/assets/products/celebration-clear-products/clear-toric-monthly.png",
  "Celebration Daily Disposable Soft Contact Lens": "/assets/products/celebration-clear-products/daily-disposable.webp",
  "Celebration Weekly Color – Weekly": "/assets/products/celebration-weekly-color-weekly/featured.png",
  "Celebration Disposable Color Toric – Monthly": "/assets/products/celebration-disposable-color-toric-monthly/featured.png",
  "Celebration Colors Toric – Yearly": "/assets/products/celebration-colors-yearly/featured.png",
  "Celebration Colors – Yearly": "/assets/products/celebration-colors-yearly/featured.png",
  "Celebration Disposable Color – Monthly": "/assets/products/celebration-disposable-color-monthly/featured.webp",
};

const productPowerRanges = {
  "Celebration Clear 38 Torics – Yearly": {
    spherical: ["0.00 to -5.00 (0.25 Steps)", "-5.50 to -9.00 (0.50 Steps)"],
    cylindrical: "-0.75 / -1.25 / -1.75 / -2.25 / -2.75",
    axis: ["10, 20, 40, 60, 80, 90, 100", "120, 140, 160, 170, 180"],
  },
  "Celebration Weekly Color – Weekly": {
    headers: ["PLANO", "0.25 Steps", "0.50 Steps"],
    rows: [["Green, Honey, Turquoise", "-0.50 to -5.00", "-5.50 to -6.00"]],
  },
};

const productDescriptions = {
  "Celebration Clear 38 Torics – Yearly": "Discover unparalleled clarity with Celebration 38 Clear Toric lenses, designed to address the unique needs of individuals with astigmatism. Engineered with precision and innovation, these lenses provide all-day comfort and stability. Say goodbye to blurriness and hello to enhanced visual acuity, empowering you to seize every opportunity with confidence and clarity. Embrace life’s every detail with Celebration 38 Clear Toric lenses, your passport to a world of sharp, clear vision.",
  "Celebration Weekly Color – Weekly": "Celebration brings to you this pair of colored contact lenses that not only gives you that tinge of color but also offers unmatched protection and comfort. Whether you want to enhance your natural eye color or are looking forward to completely changing it, these lenses will help you in both. Being light in weight, you can barely feel that you are wearing one. Long-lasting, these lenses could easily be worn all day long.",
};

const productDescriptionBenefits = {
  "Celebration Weekly Color – Weekly": [
    "For One Day Use",
    "Eyes more beautiful and more natural",
    "Comfortable to wear",
    "Easy to handle",
  ],
};

const productTaglines = {
  "Celebration Clear 38 Torics – Yearly": "Elevate your vision with Celebration 38 Clear Toric lenses. Crafted for those with astigmatism, these lenses offer exceptional clarity and comfort. Experience enhanced visual acuity and freedom from blurriness, allowing you to embrace every moment with confidence.",
};

const productSpecificationGroups = {
  "Celebration Clear 38 Torics – Yearly": [
    {
      title: "Lens",
      items: [
        ["Base Curve", "8.6mm"],
        ["Diameter", "14.20mm"],
        ["Water Content", "38%"],
      ],
    },
    {
      title: "Overview",
      items: [
        ["Product Type", "Contact Lens-Toric"],
        ["Gender", "Unisex"],
        ["Expiry", "Min. 1 year from date of purchase"],
        ["Usage Duration", "1 Year"],
      ],
    },
    {
      title: "General",
      items: [
        ["Packaging", "1 Lens/Bottle"],
        ["Made In", "Singapore"],
      ],
    },
  ],
  "Celebration Weekly Color – Weekly": [
    {
      title: "Lens",
      items: [
        ["Base Curve", "8.6mm"],
        ["Diameter", "14.20mm"],
        ["Water Content", "58%"],
        ["Lens Material", "Polyhema"],
      ],
    },
    {
      title: "Overview",
      items: [
        ["Product Type", "Contact Lens-Spherical"],
        ["Gender", "Unisex"],
        ["Expiry", "Min. 1 year from date of purchase"],
        ["Usage Duration", "1 Week"],
      ],
    },
    {
      title: "General",
      items: [
        ["Packaging", "10 Lens/Bottle"],
        ["Made In", "Korea"],
      ],
    },
  ],
};

const productVariantColors = {
  "Celebration Weekly Color – Weekly": [
    ["Turquoise", "#3ed0c5", "/assets/products/celebration-weekly-color-weekly/turquoise.png"],
    ["Spicy Gray", "#9fa8aa", "/assets/products/celebration-weekly-color-weekly/spicy-gray.png"],
    ["Naughty Brown", "#9c806f", "/assets/products/celebration-weekly-color-weekly/naughty-brown.png"],
    ["Mystery Hazel", "#b6b96d", "/assets/products/celebration-weekly-color-weekly/mystery-hazel.png"],
    ["Icy Blue", "#60c9f0", "/assets/products/celebration-weekly-color-weekly/icy-blue.png"],
    ["Happy Honey", "#f1bd3d", "/assets/products/celebration-weekly-color-weekly/happy-honey.png"],
    ["Envy Green", "#4cc487", "/assets/products/celebration-weekly-color-weekly/envy-green.png"],
  ],
  "Celebration Disposable Color Toric – Monthly": [
    ["Groovy Gray", "#9da7aa", "/assets/products/celebration-disposable-color-toric-monthly/groovy-gray.png"],
    ["Jazzy Brown", "#9c806f", "/assets/products/celebration-disposable-color-toric-monthly/jazzy-brown.png"],
    ["Lively Hazel", "#c7c361", "/assets/products/celebration-disposable-color-toric-monthly/lively-hazel.png"],
  ],
  "Celebration Colors Toric – Yearly": [
    ["Breeze Blue", "#60c9f0", "/assets/products/celebration-colors-yearly/reference.webp", [0, 0]],
    ["Calypso Green", "#4cc487", "/assets/products/celebration-colors-yearly/reference.webp", [1, 1]],
    ["Hip Hop Hazel", "#d4df6e", "/assets/products/celebration-colors-yearly/reference.webp", [2, 0]],
    ["Honey Allure", "#f1bd3d", "/assets/products/celebration-colors-yearly/reference.webp", [0, 1]],
    ["Peppy Brown", "#b09c90", "/assets/products/celebration-colors-yearly/reference.webp", [1, 0]],
    ["Purple Aura", "#a72aff", "/assets/products/celebration-colors-yearly/reference.webp", [2, 1]],
  ],
  "Celebration Colors – Yearly": [
    ["Breeze Blue", "#60c9f0", "/assets/products/celebration-colors-yearly/reference.webp", [0, 0]],
    ["Calypso Green", "#4cc487", "/assets/products/celebration-colors-yearly/reference.webp", [1, 1]],
    ["Hip Hop Hazel", "#d4df6e", "/assets/products/celebration-colors-yearly/reference.webp", [2, 0]],
    ["Honey Allure", "#f1bd3d", "/assets/products/celebration-colors-yearly/reference.webp", [0, 1]],
    ["Peppy Brown", "#b09c90", "/assets/products/celebration-colors-yearly/reference.webp", [1, 0]],
    ["Purple Aura", "#a72aff", "/assets/products/celebration-colors-yearly/reference.webp", [2, 1]],
    ["Salsa Gray", "#a9c2c8", "/assets/products/celebration-colors-yearly/reference.webp", [3, 0]],
    ["Tropical Turquoise", "#3fd0bd", "/assets/products/celebration-colors-yearly/reference.webp", [3, 1]],
  ],
  "Celebration Disposable Color – Monthly": [
    ["Cute Honey", "#f2b83e", "/assets/products/celebration-disposable-color-monthly/cute-honey.png"],
    ["Dream Blue", "#0792ee", "/assets/products/celebration-disposable-color-monthly/dream-blue.png"],
    ["Glory Green", "#00a668", "/assets/products/celebration-disposable-color-monthly/glory-green.png"],
    ["Groovy Gray", "#9fa8aa", "/assets/products/celebration-disposable-color-monthly/groovy-gray.png"],
    ["Jazzy Brown", "#9c806f", "/assets/products/celebration-disposable-color-monthly/jazzy-brown.png"],
    ["Lively Hazel", "#c1bd68", "/assets/products/celebration-disposable-color-monthly/lively-hazel.png"],
    ["Posh Purple", "#9f5cf3", "/assets/products/celebration-disposable-color-monthly/posh-purple.jpg"],
    ["Trendy Turquoise", "#3ed0c1", "/assets/products/celebration-disposable-color-monthly/trendy-turquoise.png"],
  ],
};

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const defaultGallery = [
  ["98-652-imgImageHoneycombHazelPackOf2Bundle.png", "Contact lens product view"],
  ["98-652-imgImageHoneycombHazel.png", "Model wearing contact lenses"],
  ["98-652-imgImageHoneycombHazel1.png", "Contact lens portrait"],
  ["98-652-imgImageHoneycombHazel2-no-seam.png", "Contact lens portrait close-up"],
  ["98-652-imgImageHoneycombHazel3.png", "Contact lens lifestyle view"],
  ["98-652-imgImageHoneycombHazel4.png", "Contact lens close-up"],
  ["98-652-imgImageHoneycombHazelPackOf2Bundle1.png", "Contact lens product bundle"],
  ["98-652-imgImageHoneycombHazel5.png", "Contact lens portrait view"],
  ["98-652-imgImageHoneycombHazel6.png", "Contact lens portrait detail"],
];

const defaultFeatures = ["Natural Look", "Comfortable Wear", "Power Available"];

const productFeatures = {
  "Celebration Clear 38 Torics – Yearly": ["Aspheric Design", "UV Protection", "Easy to Care"],
};

const defaultFaqs = (name) => [
  [`Who is ${name} suitable for?`, `${name} is designed for comfortable everyday wear. Consult your eye-care professional for individual guidance.`],
  ["How often should these lenses be replaced?", "Follow the replacement schedule prescribed by your eye-care professional and the product instructions."],
  ["How should I care for the lenses?", "Clean and store lenses in fresh contact-lens solution after every use."],
  ["Will the result look the same on every eye?", "The final appearance can vary with natural eye colour, lighting and lens fit."],
];

const defaultRelatedProducts = Array.from({ length: 4 }, () => ({
  name: "AquaVeil Clear Lens",
  note: "For 6 month use only.",
  price: "₹2,999.00",
  image: "98-1088-imgRectangle1.png",
  imageAlt: "AquaVeil Clear Lens",
  variantsImage: "98-1088-imgFrame175.svg",
  href: "/products/celebration-toric-grey",
}));

function createProduct(name, category, price) {
  const hasColorVariants = !productsWithoutColorVariants.has(name);
  const variantColors = productVariantColors[name] ?? null;

  return {
    slug: slugify(name),
    name,
    category,
    productType: category === "Celebration" && hasColorVariants ? "Coloured Contact Lenses" : "Contact Lenses",
    lensType: /toric/i.test(name) ? "Toric" : "Spherical",
    tagline: productTaglines[name] ?? `${name} lenses designed for natural-looking comfort and confident everyday wear.`,
    price: productPrices[name] ?? price,
    note: "For 6 month use only.",
    rating: 4,
    featuredImage: productFeaturedImages[name] ?? null,
    powerRange: productPowerRanges[name] ?? null,
    galleryImages: defaultGallery,
    features: productFeatures[name] ?? defaultFeatures,
    hasColorVariants,
    shadeCount: variantColors?.length ?? 5,
    variantColors,
    marqueeFeatures: ["soft lens material", "high water content", "natural colour blend", "multiple shade options", "uv protection", "comfortable fit"],
    specifications: ["Lens Duration", "Eye Power"],
    specificationGroups: productSpecificationGroups[name] ?? null,
    description: productDescriptions[name] ?? `${name} contact lenses designed for natural-looking comfort and confident everyday wear.`,
    descriptionBenefits: productDescriptionBenefits[name] ?? null,
    safetyCautions: productsWithoutSafetyCaution.has(name)
      ? null
      : ["Never sleep in your lenses.", "Remove lenses immediately if irritation occurs.", "Replace lenses as recommended."],
    detailsImage: "98-760-imgImage73.png",
    beforeAfterImage: "98-813-imgRectangle37.png",
    selectedProductName: name,
    selectedProductSubtitle: "Premium Contact Lenses",
    faqs: defaultFaqs(name),
    relatedProducts: defaultRelatedProducts,
  };
}

const catalogueProducts = categories.flatMap((category) =>
  category.names.map((name) => createProduct(name, category.name, category.price)),
);

const celebrationToricGrey = {
  ...createProduct("Celebration Toric Grey", "Celebration", "₹399"),
  slug: "celebration-toric-grey",
  productType: "Coloured Contact Lenses",
  tagline: "Grey that shines and make you stand out.",
  note: "For 6 months use only.",
  description: "A dimensional grey coloured contact lens designed to add soft depth while maintaining a natural, expressive look.",
  selectedProductName: "Celebration Color Lenses",
  selectedProductSubtitle: "Premium Colored Contact Lenses",
  faqs: [
    ["Who is Celebration Colors Toric – Yearly suitable for?", "Celebration Colors Toric is designed for people who want colour enhancement with toric vision correction."],
    ["How often should these lenses be replaced?", "Celebration Colors Toric – Yearly follows a yearly replacement cycle, provided the lenses are cleaned, stored and maintained correctly."],
    ["How should I care for the lenses?", "Clean and store the lenses in fresh contact-lens solution after every use and follow your eye-care professional's guidance."],
    ["Will the colour look the same on every eye?", "The final shade varies naturally depending on your eye colour, lighting and how the lens settles on the eye."],
  ],
};

export const products = [...catalogueProducts, celebrationToricGrey];

export const productsBySlug = Object.fromEntries(products.map((product) => [product.slug, product]));

export const getProductBySlug = (slug) => productsBySlug[slug];
