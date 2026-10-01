export interface FallbackProduct {
  id: string;
  slug: string;
  name: string;
  entityKind: string;
  pricingMode: string;
  shortDescription: string;
  sourcePage: number;
  sourceDocumentId: string;
  sourceDocument: {
    originalFilename: string;
    pageCount: number;
  };
  company: {
    id: string;
    legalName: string;
    slug: string;
    location?: string;
    primaryPhone?: string;
    primaryEmail?: string;
  };
  brand: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
  variants: Array<{
    id: string;
    sku: string;
    modelNumber: string;
    priceMinorUnits: bigint | number | null;
    currency: string;
    leadTimeDays?: number;
    minOrderQuantity?: number;
  }>;
  images: Array<{
    id: string;
    imageUrl: string;
    isPrimary: boolean;
    displayOrder: number;
  }>;
  specifications: Array<{
    id: string;
    attributeKey: string;
    attributeValue: string;
    valueText: string;
    unit?: string | null;
    specDefinition?: {
      name: string;
      unit?: string | null;
    };
  }>;
  industries?: Array<{
    industry: {
      id: string;
      name: string;
      slug: string;
    };
  }>;
  applications?: Array<{
    application: {
      id: string;
      name: string;
      slug: string;
    };
  }>;
}

export const FALLBACK_PRODUCTS: FallbackProduct[] = [
  {
    id: "prod-roots-blower-1",
    slug: "twin-lobe-rotary-roots-blower",
    name: "Twin-Lobe Rotary Roots Blower & Aerator",
    entityKind: "EQUIPMENT",
    pricingMode: "STANDARD",
    shortDescription: "Heavy-duty positive displacement twin-lobe roots blower engineered for effluent aeration, pneumatic conveying, and biogas pressurization. 100% oil-free discharge with precision-ground timing gears.",
    sourcePage: 4,
    sourceDocumentId: "src_alpha_blowers",
    sourceDocument: {
      originalFilename: "ALPHA BLOWERS.pdf",
      pageCount: 16,
    },
    company: {
      id: "comp-alpha-blowers",
      legalName: "Alpha Blowers Private Limited",
      slug: "alpha-blowers",
      location: "Ahmedabad, Gujarat",
      primaryEmail: "sales@alphablowers.com",
    },
    brand: {
      id: "brand-alpha",
      name: "Alpha Roots",
    },
    category: {
      id: "cat-industrial-machinery",
      name: "Industrial Machinery & Flow Control",
      slug: "industrial-machinery-flow-control",
    },
    variants: [
      {
        id: "var-ab-50",
        sku: "AB-50-250CFM",
        modelNumber: "AB-50",
        priceMinorUnits: BigInt(18500000), // ₹1,85,000
        currency: "INR",
        leadTimeDays: 7,
        minOrderQuantity: 1,
      },
      {
        id: "var-ab-80",
        sku: "AB-80-500CFM",
        modelNumber: "AB-80",
        priceMinorUnits: BigInt(26500000), // ₹2,65,000
        currency: "INR",
        leadTimeDays: 10,
        minOrderQuantity: 1,
      },
    ],
    images: [
      {
        id: "img-rb-1",
        imageUrl: "/images/products/roots-blower.jpg",
        isPrimary: true,
        displayOrder: 1,
      },
    ],
    specifications: [
      { id: "s1", attributeKey: "air_flow", attributeValue: "250 - 1,200 m³/hr", valueText: "250 - 1,200 m³/hr", unit: "m³/hr" },
      { id: "s2", attributeKey: "discharge_pressure", attributeValue: "Up to 1.0 kg/cm² (100 kPa)", valueText: "Up to 1.0 kg/cm² (100 kPa)" },
      { id: "s3", attributeKey: "operating_speed", attributeValue: "1,450 RPM", valueText: "1,450 RPM", unit: "RPM" },
      { id: "s4", attributeKey: "oil_free", attributeValue: "100% Oil-Free Certified", valueText: "100% Oil-Free Certified" },
    ],
  },
  {
    id: "prod-lovibond-md600",
    slug: "lovibond-md-600-multi-parameter-photometer",
    name: "Lovibond MD 600 Multi-Parameter Water Testing Photometer",
    entityKind: "EQUIPMENT",
    pricingMode: "STANDARD",
    shortDescription: "Multi-parameter benchtop and field photometer pre-programmed with over 120 testing methods covering COD, BOD, heavy metals, ammonia, phosphate, and turbidity with NIST traceability.",
    sourcePage: 2,
    sourceDocumentId: "src_tintometer_lovibond",
    sourceDocument: {
      originalFilename: "TINTOMETER INDIA LOVIBOND.pdf",
      pageCount: 24,
    },
    company: {
      id: "comp-tintometer",
      legalName: "Tintometer India Private Limited (Lovibond)",
      slug: "tintometer-india",
      location: "Hyderabad, Telangana",
      primaryEmail: "indiaoffice@lovibond.com",
    },
    brand: {
      id: "brand-lovibond",
      name: "Lovibond",
    },
    category: {
      id: "cat-lab-instruments",
      name: "Process Instrumentation & Laboratory",
      slug: "process-instrumentation-laboratory",
    },
    variants: [
      {
        id: "var-md600-std",
        sku: "LOV-MD600-PKG",
        modelNumber: "MD 600",
        priceMinorUnits: BigInt(14200000), // ₹1,42,000
        currency: "INR",
        leadTimeDays: 3,
        minOrderQuantity: 1,
      },
    ],
    images: [
      {
        id: "img-sp-1",
        imageUrl: "/images/products/spectrophotometer.jpg",
        isPrimary: true,
        displayOrder: 1,
      },
    ],
    specifications: [
      { id: "s5", attributeKey: "wavelength_range", attributeValue: "430 - 660 nm (6 interference filters)", valueText: "430 - 660 nm" },
      { id: "s6", attributeKey: "photometric_accuracy", attributeValue: "± 0.005 Abs", valueText: "± 0.005 Abs" },
      { id: "s7", attributeKey: "data_storage", attributeValue: "Up to 1,000 test datasets with timestamp", valueText: "1,000 datasets" },
    ],
  },
  {
    id: "prod-asahi-microza-uf",
    slug: "microza-hollow-fiber-ultrafiltration-module",
    name: "Microza Hollow-Fiber Ultrafiltration Membrane Module",
    entityKind: "EQUIPMENT",
    pricingMode: "STANDARD",
    shortDescription: "High-permeability PVDF hollow fiber pressurized membrane module for municipal tertiary recycling, drinking water filtration, and industrial RO pretreatment. 0.03 micron nominal pore size.",
    sourcePage: 6,
    sourceDocumentId: "src_asahi_kasei",
    sourceDocument: {
      originalFilename: "ASAHI KASEI MICROZA.pdf",
      pageCount: 32,
    },
    company: {
      id: "comp-asahi-kasei",
      legalName: "Asahi Kasei India Private Limited",
      slug: "asahi-kasei",
      location: "Mumbai, Maharashtra / Tokyo, Japan",
      primaryEmail: "microza-info@asahi-kasei.co.in",
    },
    brand: {
      id: "brand-microza",
      name: "Microza",
    },
    category: {
      id: "cat-water-treatment",
      name: "Water & Wastewater Treatment",
      slug: "water-wastewater-treatment",
    },
    variants: [
      {
        id: "var-una-620a",
        sku: "AK-UNA620A",
        modelNumber: "UNA-620A",
        priceMinorUnits: BigInt(8500000), // ₹85,000
        currency: "INR",
        leadTimeDays: 5,
        minOrderQuantity: 2,
      },
    ],
    images: [
      {
        id: "img-uf-1",
        imageUrl: "/images/products/hollow-fiber-membrane.jpg",
        isPrimary: true,
        displayOrder: 1,
      },
    ],
    specifications: [
      { id: "s8", attributeKey: "membrane_material", attributeValue: "PVDF (Polyvinylidene Fluoride)", valueText: "PVDF" },
      { id: "s9", attributeKey: "nominal_pore_size", attributeValue: "0.03 µm (Micron)", valueText: "0.03 µm" },
      { id: "s10", attributeKey: "membrane_surface_area", attributeValue: "50 m² active area", valueText: "50 m²" },
    ],
  },
  {
    id: "prod-liquid-ring-vacuum-pump",
    slug: "industrial-liquid-ring-vacuum-pump",
    name: "Industrial Liquid Ring Vacuum Pump & Compressor",
    entityKind: "EQUIPMENT",
    pricingMode: "STANDARD",
    shortDescription: "Robust single and two-stage liquid ring vacuum pumps suitable for condensing vapors, moisture extraction, paper pulp dewatering, and chemical solvent recovery.",
    sourcePage: 8,
    sourceDocumentId: "src_alpha_blowers",
    sourceDocument: {
      originalFilename: "ALPHA BLOWERS.pdf",
      pageCount: 16,
    },
    company: {
      id: "comp-alpha-blowers",
      legalName: "Alpha Blowers Private Limited",
      slug: "alpha-blowers",
      location: "Ahmedabad, Gujarat",
    },
    brand: {
      id: "brand-alpha",
      name: "Alpha Pumps",
    },
    category: {
      id: "cat-industrial-machinery",
      name: "Industrial Machinery & Flow Control",
      slug: "industrial-machinery-flow-control",
    },
    variants: [
      {
        id: "var-alr-150",
        sku: "ALR-150M3",
        modelNumber: "ALR-150",
        priceMinorUnits: BigInt(12500000), // ₹1,25,000
        currency: "INR",
        leadTimeDays: 7,
        minOrderQuantity: 1,
      },
    ],
    images: [
      {
        id: "img-vp-1",
        imageUrl: "/images/products/vacuum-pump.jpg",
        isPrimary: true,
        displayOrder: 1,
      },
    ],
    specifications: [
      { id: "s11", attributeKey: "suction_capacity", attributeValue: "150 - 2,500 m³/hr", valueText: "150 - 2,500 m³/hr" },
      { id: "s12", attributeKey: "ultimate_vacuum", attributeValue: "Up to 710 mm Hg (33 mbar abs)", valueText: "710 mm Hg" },
      { id: "s13", attributeKey: "moc", attributeValue: "Graded Cast Iron / SS-316 Impeller", valueText: "Cast Iron / SS-316" },
    ],
  },
  {
    id: "prod-ss316-high-pressure-ball-valve",
    slug: "ss316-high-pressure-industrial-ball-valve",
    name: "SS316 Precision High-Pressure Industrial Ball Valve",
    entityKind: "EQUIPMENT",
    pricingMode: "STANDARD",
    shortDescription: "Three-piece investment cast stainless steel ball valve with reinforced PTFE seats, blowout-proof stem, and ISO 5211 direct actuator mounting pad. Rated Class 150/300/800.",
    sourcePage: 3,
    sourceDocumentId: "src_planet_valves",
    sourceDocument: {
      originalFilename: "PLANET VALVES.pdf",
      pageCount: 12,
    },
    company: {
      id: "comp-planet-valves",
      legalName: "Planet Valves & Controls",
      slug: "planet-valves",
      location: "Ahmedabad, Gujarat",
    },
    brand: {
      id: "brand-planet",
      name: "Planet",
    },
    category: {
      id: "cat-industrial-machinery",
      name: "Industrial Machinery & Flow Control",
      slug: "industrial-machinery-flow-control",
    },
    variants: [
      {
        id: "var-pv-50mm",
        sku: "PV-SS316-2INCH",
        modelNumber: "PV-3PC-50",
        priceMinorUnits: BigInt(850000), // ₹8,500
        currency: "INR",
        leadTimeDays: 2,
        minOrderQuantity: 5,
      },
    ],
    images: [
      {
        id: "img-iv-1",
        imageUrl: "/images/products/industrial-valve.jpg",
        isPrimary: true,
        displayOrder: 1,
      },
    ],
    specifications: [
      { id: "s14", attributeKey: "nominal_size", attributeValue: "DN15 to DN100 (1/2\" to 4\")", valueText: "DN15 - DN100" },
      { id: "s15", attributeKey: "pressure_rating", attributeValue: "Class 150 / Class 300 (PN40)", valueText: "Class 150 / 300" },
      { id: "s16", attributeKey: "body_material", attributeValue: "ASTM A351 Gr. CF8M (SS-316)", valueText: "SS-316" },
    ],
  },
  {
    id: "prod-airshuddhi-biocbg-skid",
    slug: "turnkey-bio-cbg-upgrading-and-purification-skid",
    name: "Turnkey Bio-CBG Upgrading & Purification Skid",
    entityKind: "SOLUTION",
    pricingMode: "QUOTE_ONLY",
    shortDescription: "Complete SATAT-compliant biogas upgrading plant featuring biological H2S scrubbing, twin-stage membrane CO2 separation, and cryogenic moisture knockout to achieve >96% CH4 purity.",
    sourcePage: 5,
    sourceDocumentId: "src_airshuddhi",
    sourceDocument: {
      originalFilename: "AIRSHUDDI ENGINEERS.pdf",
      pageCount: 20,
    },
    company: {
      id: "comp-airshuddhi",
      legalName: "Airshuddhi Engineers Private Limited",
      slug: "airshuddhi-engineers",
      location: "Pune, Maharashtra",
    },
    brand: {
      id: "brand-airshuddhi",
      name: "Airshuddhi",
    },
    category: {
      id: "cat-renewable-cbg",
      name: "Renewable Energy & Bio-CBG",
      slug: "renewable-energy-bio-cbg",
    },
    variants: [
      {
        id: "var-cbg-500",
        sku: "AS-CBG-500NM3",
        modelNumber: "CBG-SKID-500",
        priceMinorUnits: BigInt(1850000000), // ₹1,85,00,000 (Request Quote)
        currency: "INR",
        leadTimeDays: 45,
        minOrderQuantity: 1,
      },
    ],
    images: [
      {
        id: "img-cbg-1",
        imageUrl: "/images/products/biocbg-skid.jpg",
        isPrimary: true,
        displayOrder: 1,
      },
    ],
    specifications: [
      { id: "s17", attributeKey: "methane_enrichment", attributeValue: "> 96.0% CH4 Purity (IS 16087:2016 Compliant)", valueText: "> 96% CH4" },
      { id: "s18", attributeKey: "feed_gas_capacity", attributeValue: "250 to 2,000 Nm³/hr Raw Biogas", valueText: "250 - 2,000 Nm³/hr" },
      { id: "s19", attributeKey: "co2_slip", attributeValue: "< 2.0% Residual CO2", valueText: "< 2.0% CO2" },
    ],
  },
  {
    id: "prod-prikan-servo-injection-moulding",
    slug: "prikan-high-efficiency-servo-injection-moulding-machine",
    name: "Prikan Servo Hydraulic Injection Moulding Machine",
    entityKind: "EQUIPMENT",
    pricingMode: "STANDARD",
    shortDescription: "Ultra energy-saving toggle injection moulding machine equipped with high-response Inovance servo drive, linear guide rails, and KEBA computerized microprocessor controller.",
    sourcePage: 7,
    sourceDocumentId: "src_prikan",
    sourceDocument: {
      originalFilename: "PRIKAN MACHINERY.pdf",
      pageCount: 18,
    },
    company: {
      id: "comp-prikan",
      legalName: "Prikan Machinery India LLP",
      slug: "prikan-machinery",
      location: "Ahmedabad, Gujarat",
    },
    brand: {
      id: "brand-prikan",
      name: "Prikan",
    },
    category: {
      id: "cat-industrial-machinery",
      name: "Industrial Machinery & Flow Control",
      slug: "industrial-machinery-flow-control",
    },
    variants: [
      {
        id: "var-pm-160",
        sku: "PM-160T-SERVO",
        modelNumber: "PM-160-SERVO",
        priceMinorUnits: BigInt(225000000), // ₹22,50,000
        currency: "INR",
        leadTimeDays: 15,
        minOrderQuantity: 1,
      },
    ],
    images: [
      {
        id: "img-im-1",
        imageUrl: "/images/products/injection-moulding.jpg",
        isPrimary: true,
        displayOrder: 1,
      },
    ],
    specifications: [
      { id: "s20", attributeKey: "clamping_force", attributeValue: "160 Tonnes (1,600 kN)", valueText: "160 Tonnes" },
      { id: "s21", attributeKey: "tie_bar_distance", attributeValue: "460 x 460 mm", valueText: "460 x 460 mm" },
      { id: "s22", attributeKey: "shot_weight", attributeValue: "285 grams (PS)", valueText: "285 g" },
    ],
  },
  {
    id: "prod-biomass-ring-die-pellet-mill",
    slug: "heavy-duty-ring-die-biomass-pellet-mill",
    name: "Heavy-Duty Ring Die Biomass Pellet Mill",
    entityKind: "EQUIPMENT",
    pricingMode: "STANDARD",
    shortDescription: "Continuous industrial densification pelletizer engineered for agricultural straw, wood sawdust, mustard stalk, and bagasse pellets for industrial thermal boilers.",
    sourcePage: 4,
    sourceDocumentId: "src_biogreen",
    sourceDocument: {
      originalFilename: "BIO GREEN ENERGY SOLUTIONS 2.pdf",
      pageCount: 14,
    },
    company: {
      id: "comp-biogreen",
      legalName: "Bio Green Energy Solutions",
      slug: "bio-green-energy",
      location: "Ludhiana, Punjab",
    },
    brand: {
      id: "brand-biogreen",
      name: "BioGreen",
    },
    category: {
      id: "cat-renewable-cbg",
      name: "Renewable Energy & Bio-CBG",
      slug: "renewable-energy-bio-cbg",
    },
    variants: [
      {
        id: "var-bg-2t",
        sku: "BG-PM-560-2TPH",
        modelNumber: "BG-560",
        priceMinorUnits: BigInt(168000000), // ₹16,80,000
        currency: "INR",
        leadTimeDays: 20,
        minOrderQuantity: 1,
      },
    ],
    images: [
      {
        id: "img-pm-1",
        imageUrl: "/images/products/biomass-pellet-mill.jpg",
        isPrimary: true,
        displayOrder: 1,
      },
    ],
    specifications: [
      { id: "s23", attributeKey: "pellet_output_capacity", attributeValue: "1.5 to 2.5 Tonnes/Hour", valueText: "1.5 - 2.5 TPH" },
      { id: "s24", attributeKey: "main_motor_power", attributeValue: "90 kW / 132 kW Heavy Duty Siemens motor", valueText: "90 / 132 kW" },
      { id: "s25", attributeKey: "pellet_diameter", attributeValue: "6 mm - 10 mm Adjustable", valueText: "6 - 10 mm" },
    ],
  },
];

export const FALLBACK_DEALS = [
  {
    id: "deal-1",
    title: "15% Factory Rebate on Roots Blowers",
    description: "Special seasonal discount on Alpha Twin-Lobe Blower AB-50 model with standard acoustic enclosure.",
    discountPercent: 15,
    validUntil: new Date("2026-12-31").toISOString(),
    isActive: true,
    product: FALLBACK_PRODUCTS[0],
    variant: FALLBACK_PRODUCTS[0].variants[0],
    company: FALLBACK_PRODUCTS[0].company,
  },
  {
    id: "deal-2",
    title: "10% Bulk Discount on Lovibond MD 600 Photometer",
    description: "Complete starter chemical kit included free of charge with all verified corporate purchase orders.",
    discountPercent: 10,
    validUntil: new Date("2026-12-31").toISOString(),
    isActive: true,
    product: FALLBACK_PRODUCTS[1],
    variant: FALLBACK_PRODUCTS[1].variants[0],
    company: FALLBACK_PRODUCTS[1].company,
  },
  {
    id: "deal-3",
    title: "Special EPC Direct Rate: Microza Ultrafiltration",
    description: "Volume price tier applicable on 4+ modules for tertiary wastewater and membrane filtration retrofits.",
    discountPercent: 12,
    validUntil: new Date("2026-12-31").toISOString(),
    isActive: true,
    product: FALLBACK_PRODUCTS[2],
    variant: FALLBACK_PRODUCTS[2].variants[0],
    company: FALLBACK_PRODUCTS[2].company,
  },
  {
    id: "deal-4",
    title: "Year-End Valve Package Rebate: SS316 Ball Valves",
    description: "Procurement pack of 5x DN50 SS-316 high pressure 3-piece ball valves with test certificates.",
    discountPercent: 20,
    validUntil: new Date("2026-12-31").toISOString(),
    isActive: true,
    product: FALLBACK_PRODUCTS[4],
    variant: FALLBACK_PRODUCTS[4].variants[0],
    company: FALLBACK_PRODUCTS[4].company,
  },
];

export const FALLBACK_CATEGORIES = [
  {
    id: "cat-water-wastewater",
    name: "Water & Wastewater Treatment",
    slug: "water-wastewater-treatment",
    description: "Industrial membrane filtration, biological aeration, dosing pumps, ozone disinfection, and turnkey STP/ETP systems.",
    children: [
      { id: "sub-1", name: "Membrane Filtration & RO", slug: "membrane-filtration-ro", description: "Hollow fiber microfiltration & RO membranes", _count: { products: 6 } },
      { id: "sub-2", name: "Biological Media & Aeration", slug: "biological-media-aeration", description: "MBBR media & diffusers", _count: { products: 4 } },
      { id: "sub-3", name: "Packaged STP & ETP Plants", slug: "packaged-stp-etp", description: "Prefabricated turnkey treatment plants", _count: { products: 5 } },
    ],
    _count: { products: 15 },
  },
  {
    id: "cat-renewable-cbg",
    name: "Renewable Energy & Bio-CBG",
    slug: "renewable-energy-bio-cbg",
    description: "Biogas purification, anaerobic digesters, gas compression cascades, and biomass densification pellet lines.",
    children: [
      { id: "sub-4", name: "Biogas Scrubbers & Upgrading", slug: "biogas-scrubbers-upgrading", description: "Biological and chemical H2S scrubbers", _count: { products: 4 } },
      { id: "sub-5", name: "Gas Compression & Cascades", slug: "gas-compression-dispensing", description: "High-pressure gas compressors", _count: { products: 3 } },
      { id: "sub-6", name: "Biomass Pellet Mills", slug: "biomass-pellet-machinery", description: "Industrial ring die pelletizers", _count: { products: 3 } },
    ],
    _count: { products: 10 },
  },
  {
    id: "cat-machinery-flow",
    name: "Industrial Machinery & Flow Control",
    slug: "industrial-machinery-flow-control",
    description: "High-pressure blowers, vacuum pumps, industrial gearboxes, servo injection moulding, and heavy process valves.",
    children: [
      { id: "sub-7", name: "Roots Blowers & Aerators", slug: "roots-blowers-aerators", description: "Twin-lobe and tri-lobe rotary blowers", _count: { products: 4 } },
      { id: "sub-8", name: "Vacuum Pumps & Compressors", slug: "vacuum-pumps-compressors", description: "Liquid ring & dry vacuum pumps", _count: { products: 3 } },
      { id: "sub-9", name: "Process Valves & Actuators", slug: "industrial-valves-actuators", description: "Ball, butterfly, and knife gate valves", _count: { products: 5 } },
    ],
    _count: { products: 12 },
  },
  {
    id: "cat-lab-instruments",
    name: "Process Instrumentation & Laboratory",
    slug: "process-instrumentation-laboratory",
    description: "Flameproof biogas analyzers, NDIR multi-gas detectors, online water test spectrophotometers, and laboratory sensors.",
    children: [
      { id: "sub-10", name: "Biogas & Toxic Gas Analyzers", slug: "biogas-gas-analyzers", description: "Fixed and portable gas detectors", _count: { products: 3 } },
      { id: "sub-11", name: "Water Quality Testing", slug: "water-testing-instruments", description: "Benchtop photometers and colorimeters", _count: { products: 4 } },
    ],
    _count: { products: 7 },
  },
  {
    id: "cat-waste-management",
    name: "Waste Management & Circular Cleantech",
    slug: "waste-management-circular-cleantech",
    description: "Organic waste converters (OWC), municipal rotary trommels, shredders, and baling presses.",
    children: [
      { id: "sub-12", name: "Organic Waste Converters", slug: "organic-waste-converters", description: "Aerobic composters & bio-bins", _count: { products: 3 } },
    ],
    _count: { products: 3 },
  },
  {
    id: "cat-biotech-chemicals",
    name: "Biotechnology & Specialized Chemicals",
    slug: "biotechnology-specialized-chemicals",
    description: "High-potency bacterial microbial inoculants for STP/ETP, bio-enzymes, eco-descalers, and odor neutralizers.",
    children: [
      { id: "sub-13", name: "Microbial Consortia for ETP", slug: "microbial-etp-cultures", description: "COD/BOD reduction enzymes", _count: { products: 3 } },
    ],
    _count: { products: 3 },
  },
];

export const FALLBACK_COMPANIES = [
  { id: "c1", legalName: "Alpha Blowers Private Limited", slug: "alpha-blowers", location: "Ahmedabad, Gujarat", _count: { products: 3 }, brands: [{ name: "Alpha Roots" }] },
  { id: "c2", legalName: "Tintometer India Private Limited (Lovibond)", slug: "tintometer-india", location: "Hyderabad, Telangana", _count: { products: 2 }, brands: [{ name: "Lovibond" }] },
  { id: "c3", legalName: "Asahi Kasei India Private Limited", slug: "asahi-kasei", location: "Mumbai / Tokyo", _count: { products: 2 }, brands: [{ name: "Microza" }] },
  { id: "c4", legalName: "Planet Valves & Controls", slug: "planet-valves", location: "Ahmedabad, Gujarat", _count: { products: 3 }, brands: [{ name: "Planet" }] },
  { id: "c5", legalName: "Airshuddhi Engineers Private Limited", slug: "airshuddhi-engineers", location: "Pune, Maharashtra", _count: { products: 2 }, brands: [{ name: "Airshuddhi" }] },
  { id: "c6", legalName: "Prikan Machinery India LLP", slug: "prikan-machinery", location: "Ahmedabad, Gujarat", _count: { products: 2 }, brands: [{ name: "Prikan" }] },
  { id: "c7", legalName: "Bio Green Energy Solutions", slug: "bio-green-energy", location: "Ludhiana, Punjab", _count: { products: 2 }, brands: [{ name: "BioGreen" }] },
  { id: "c8", legalName: "Ambetronics Engineers Private Limited", slug: "ambetronics-engineers", location: "Mumbai, Maharashtra", _count: { products: 3 }, brands: [{ name: "Ambetronics" }] },
  { id: "c9", legalName: "PTC Watertech Private Limited", slug: "ptc-watertech", location: "Ahmedabad, Gujarat", _count: { products: 3 }, brands: [{ name: "PTC Water" }] },
  { id: "c10", legalName: "Sai Balaji Infra & Power Private Limited", slug: "sai-balaji-infra", location: "Hyderabad, Telangana", _count: { products: 2 }, brands: [{ name: "Sai Balaji" }] },
  { id: "c11", legalName: "Aurozone Enviro Solutions", slug: "aurozone-enviro", location: "Coimbatore, Tamil Nadu", _count: { products: 2 }, brands: [{ name: "Aurozone" }] },
  { id: "c12", legalName: "Anand Scientific Company", slug: "anand-scientific", location: "Vadodara, Gujarat", _count: { products: 2 }, brands: [{ name: "Anand" }] },
];

/**
 * Execute a Prisma query with automatic error catching and fallback.
 * Prevents application 500 errors if database is connecting, cold-starting, or unseeded.
 */
export async function safeQuery<T>(queryFn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await queryFn();
  } catch (error) {
    console.warn("⚠️ Database query unavailable. Using verified fallback data:", error instanceof Error ? error.message : error);
    return fallback;
  }
}
