import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { prisma } from "../src/lib/db";

export async function seedCatalogue() {
  console.log("=== Starting Comprehensive YRC Global Catalogue Ingestion (All 32 Companies) ===");

  // 1. Ingest Documents from Manifest
  console.log("Ingesting canonical source documents...");
  const manifestPath = path.resolve(process.cwd(), "data/source-manifest.json");
  const manifestRaw = fs.readFileSync(manifestPath, "utf-8");
  const manifest = JSON.parse(manifestRaw);

  const documentMap = new Map<string, string>(); // source_document_id -> db document.id

  const fileSizeMap = new Map<string, number>();
  for (const f of manifest.files as Array<{ sha256: string; size_bytes: number }>) {
    fileSizeMap.set(f.sha256, f.size_bytes);
  }

  for (const doc of manifest.documents as any[]) {
    const existing = await prisma.document.findUnique({
      where: { sha256: doc.sha256 },
    });

    const sizeBytes = fileSizeMap.get(doc.sha256) || 102400;
    const filename = doc.canonical_path || doc.original_files?.[0] || `${doc.id}.pdf`;

    let docId = existing?.id;
    if (!existing) {
      const created = await prisma.document.create({
        data: {
          sha256: doc.sha256,
          originalFilename: filename,
          storageKey: `sources/${filename}`,
          fileSizeBytes: BigInt(sizeBytes),
          pageCount: doc.page_count || 1,
          mimeType: "application/pdf",
          extractionStatus: "EXTRACTED",
          reviewStatus: "APPROVED",
        },
      });
      docId = created.id;
    }
    documentMap.set(doc.id, docId!);
  }
  console.log(`Ingested / Verified ${documentMap.size} source documents in database.`);

  // 2. Ingest Categories
  console.log("Ingesting product categories...");
  const categoryDefs = [
    {
      name: "Water & Wastewater Treatment",
      slug: "water-wastewater-treatment",
      description: "Industrial membrane filtration, biological aeration, dosing pumps, ozone disinfection, and turnkey STP/ETP systems.",
      subcategories: [
        { name: "Membrane Filtration & RO", slug: "membrane-filtration-ro", description: "Hollow fiber microfiltration, ultrafiltration, and reverse osmosis elements." },
        { name: "Biological Media & Aeration", slug: "biological-media-aeration", description: "MBBR media, tube settler chevrons, and surface aeration equipment." },
        { name: "Filtration Cartridges & FRP Vessels", slug: "cartridge-filtration-vessels", description: "Spun meltblown, wound cartridges, and composite pressure vessels." },
        { name: "Ozone Generation & Disinfection", slug: "ozone-disinfection", description: "Corona discharge ozone generators and water treatment systems." },
        { name: "Packaged STP & ETP Plants", slug: "packaged-stp-etp", description: "Prefabricated containerized sewage and effluent treatment plants." },
      ],
    },
    {
      name: "Renewable Energy & Bio-CBG",
      slug: "renewable-energy-bio-cbg",
      description: "Biogas purification, anaerobic digesters, gas compression cascades, and biomass densification pellet lines.",
      subcategories: [
        { name: "Biogas Scrubbers & Upgrading", slug: "biogas-scrubbers-upgrading", description: "Biological and chemical H2S scrubbers, membrane upgrading skids." },
        { name: "Gas Compression & Dispensing", slug: "gas-compression-dispensing", description: "High-pressure 250-bar reciprocating gas compressors and CBG cascades." },
        { name: "Biomass Pellet Mills & Chippers", slug: "biomass-pellet-machinery", description: "Vertical ring die pelletizers, wood chippers, and rotary dryers." },
      ],
    },
    {
      name: "Industrial Machinery & Flow Control",
      slug: "industrial-machinery-flow-control",
      description: "High-pressure blowers, vacuum pumps, industrial gearboxes, servo injection moulding, and heavy process valves.",
      subcategories: [
        { name: "Roots Blowers & Aerators", slug: "roots-blowers-aerators", description: "Twin-lobe and tri-lobe positive displacement rotary blowers." },
        { name: "Liquid Ring Vacuum Pumps", slug: "liquid-ring-vacuum-pumps", description: "Heavy-duty water ring vacuum pumps and compressors." },
        { name: "Plastic Injection Moulding Machines", slug: "injection-moulding-machines", description: "Energy-efficient ultra-servo hydraulic plastic machinery." },
        { name: "Industrial Process Valves", slug: "industrial-process-valves", description: "Ball, butterfly, gate, globe, and check valves in SS304/SS316." },
        { name: "Industrial Gearboxes", slug: "industrial-gearboxes", description: "Helical, planetary, and bevel gear transmission drives." },
      ],
    },
    {
      name: "Process Instrumentation & Laboratory",
      slug: "process-instrumentation-laboratory",
      description: "Optical spectrophotometers, flameproof gas analyzers, online turbidimeters, and laboratory testing incubators.",
      subcategories: [
        { name: "Biogas & Hazardous Gas Analyzers", slug: "biogas-gas-analyzers", description: "Fixed and flameproof NDIR/EC multi-channel gas analyzers." },
        { name: "Water Quality Testing & Optical", slug: "water-quality-testing", description: "UV-VIS spectrophotometers, turbidimeters, and BOD/COD testers." },
        { name: "Laboratory Heaters & Autoclaves", slug: "lab-heaters-autoclaves", description: "Muffle furnaces, hot air ovens, incubators, and autoclaves." },
        { name: "Industrial Weighing Systems", slug: "industrial-weighing-systems", description: "Pit and pitless weighbridges, crane scales, and platform scales." },
      ],
    },
    {
      name: "Waste Management & Circular Cleantech",
      slug: "waste-management-circular-cleantech",
      description: "Organic waste converters, decentralized food bio-digesters, trommel screeners, and bio-mining conveyors.",
      subcategories: [
        { name: "Organic Waste Converters (OWC)", slug: "organic-waste-converters", description: "Fully automated decentralized composting machines." },
        { name: "Solid Waste Trommels & Screeners", slug: "solid-waste-trommels", description: "Heavy rotary trommels and sorting conveyors for legacy waste." },
      ],
    },
    {
      name: "Electrical Infrastructure & Mounting",
      slug: "electrical-infrastructure-mounting",
      description: "Perforated and ladder cable trays, raceways, solar module mounting structures, and sub-station support.",
      subcategories: [
        { name: "Cable Management Systems", slug: "cable-management-trays", description: "GI perforated trays, ladder trays, and trunking raceways." },
        { name: "Solar PV Mounting Structures", slug: "solar-pv-mounting-structures", description: "Hot-dip galvanized rooftop and ground-mount PV brackets." },
      ],
    },
    {
      name: "Biotechnology & Specialized Chemicals",
      slug: "biotechnology-specialized-chemicals",
      description: "Microbial biocultures for ETP/STP, organic bio-enzymes, eco-friendly descaling chemicals, and defoamers.",
      subcategories: [
        { name: "Microbial Wastewater Inoculants", slug: "microbial-wastewater-inoculants", description: "High-potency bacterial cultures for COD/BOD reduction." },
        { name: "Eco Descaling Formulations", slug: "eco-descaling-chemicals", description: "Non-corrosive chemical solutions for heat exchanger descaling." },
      ],
    },
    {
      name: "Sustainable & Recycled Materials",
      slug: "sustainable-recycled-materials",
      description: "Recycled polymeric lumber, heavy-duty industrial plastic pallets, and eco-infrastructure furniture.",
      subcategories: [
        { name: "Recycled Plastic Timber & Pallets", slug: "recycled-plastic-timber-pallets", description: "Zero-maintenance synthetic wood planks and warehouse pallets." },
      ],
    },
    {
      name: "MSME Development & Professional Services",
      slug: "msme-development-professional-services",
      description: "Government subsidy navigation, institutional project incubation, NABL calibration, and ESG carbon audits.",
      subcategories: [
        { name: "Institutional Incubation Schemes", slug: "institutional-incubation-schemes", description: "MSME central and state incentive guidance, CED ALEAP programs." },
        { name: "Decarbonization & ESG Advisory", slug: "decarbonization-esg-advisory", description: "Net-zero roadmap, carbon accounting, and BRSR reporting." },
      ],
    },
  ];

  const categoryMap = new Map<string, string>(); // slug -> id

  for (const cat of categoryDefs) {
    const parent = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description },
      create: { name: cat.name, slug: cat.slug, description: cat.description },
    });
    categoryMap.set(cat.slug, parent.id);

    for (const sub of cat.subcategories) {
      const child = await prisma.category.upsert({
        where: { slug: sub.slug },
        update: { name: sub.name, description: sub.description, parentId: parent.id },
        create: { name: sub.name, slug: sub.slug, description: sub.description, parentId: parent.id },
      });
      categoryMap.set(sub.slug, child.id);
    }
  }
  console.log(`Ingested ${categoryMap.size} categories and subcategories.`);

  // 3. Ingest Industries
  console.log("Ingesting target industries...");
  const industryDefs = [
    { code: "IND-WATER", name: "Water & Wastewater Infrastructure", slug: "water-wastewater" },
    { code: "IND-BIOGAS", name: "Bio-CNG & Renewable Fuels", slug: "bio-cng-renewable-fuels" },
    { code: "IND-CHEM", name: "Chemical & Petrochemical", slug: "chemical-petrochemical" },
    { code: "IND-PHARMA", name: "Pharmaceuticals & Biotechnology", slug: "pharma-biotech" },
    { code: "IND-SUGAR", name: "Sugar Mills & Distilleries", slug: "sugar-distilleries" },
    { code: "IND-PAPER", name: "Paper & Pulp Manufacturing", slug: "paper-pulp" },
    { code: "IND-FOOD", name: "Food Processing & Dairy", slug: "food-processing-dairy" },
    { code: "IND-STEEL", name: "Power Generation & Heavy Steel", slug: "power-steel" },
    { code: "IND-TEXTILE", name: "Textile Processing & Dyeing", slug: "textile-processing" },
    { code: "IND-MUNICIPAL", name: "Municipal & Smart Cities", slug: "municipal-smart-cities" },
    { code: "IND-PLASTIC", name: "Plastics & Polymer Processing", slug: "plastics-polymer" },
    { code: "IND-COMMERCIAL", name: "Hospitality, Hospitals & Real Estate", slug: "hospitality-commercial" },
    { code: "IND-SOLAR", name: "Solar PV & Distributed Power", slug: "solar-pv-power" },
  ];

  const industryMap = new Map<string, string>();
  for (const ind of industryDefs) {
    const created = await prisma.industry.upsert({
      where: { code: ind.code },
      update: { name: ind.name, slug: ind.slug },
      create: ind,
    });
    industryMap.set(ind.code, created.id);
  }

  // 4. Ingest Applications
  console.log("Ingesting process applications...");
  const applicationDefs = [
    { code: "APP-AERATION", name: "Wastewater Aeration & Agitation", slug: "wastewater-aeration" },
    { code: "APP-MEMBRANE", name: "Crossflow Micro & Ultrafiltration", slug: "crossflow-membrane-filtration" },
    { code: "APP-GAS-ANALYSIS", name: "Continuous Multi-Stream Gas Analysis", slug: "multi-stream-gas-analysis" },
    { code: "APP-DISINFECTION", name: "High-Volume Ozone Disinfection", slug: "ozone-disinfection" },
    { code: "APP-PNEUMATIC", name: "Pneumatic Bulk Material Conveying", slug: "pneumatic-conveying" },
    { code: "APP-VACUUM", name: "Evaporative Vacuum Condensation", slug: "vacuum-condensation" },
    { code: "APP-MOULDING", name: "High-Precision Injection Moulding", slug: "injection-moulding" },
    { code: "APP-PELLETIZING", name: "Agricultural Biomass Pelletizing", slug: "biomass-pelletizing" },
    { code: "APP-COMPOSTING", name: "Decentralized Rapid Organic Composting", slug: "organic-composting" },
    { code: "APP-DESCALING", name: "In-Situ Circulatory Descaling", slug: "circulatory-descaling" },
    { code: "APP-CABLE-RUN", name: "Heavy Industrial Cable Routing", slug: "cable-routing" },
    { code: "APP-SPECTRO", name: "Reference UV-VIS Spectral Photometry", slug: "uv-vis-photometry" },
    { code: "APP-WEIGHING", name: "Multi-Axle Truck Weighbridge Operations", slug: "truck-weighing" },
    { code: "APP-UPGRADING", name: "Bio-Methane 96%+ Scrubbing & Upgradation", slug: "bio-methane-upgrading" },
    { code: "APP-TURBINE", name: "Flue Gas Desulfurization & Scrubbing", slug: "flue-gas-scrubbing" },
    { code: "APP-LAB-TESTING", name: "Bacteriological & Thermal Lab Testing", slug: "lab-testing" },
    { code: "APP-TROMMEL-SCREEN", name: "Legacy Waste Bio-Mining & Separation", slug: "trommel-screening" },
  ];

  const applicationMap = new Map<string, string>();
  for (const app of applicationDefs) {
    const created = await prisma.application.upsert({
      where: { code: app.code },
      update: { name: app.name, slug: app.slug },
      create: app,
    });
    applicationMap.set(app.code, created.id);
  }

  // 5. Ingest All 32 Verified Companies & Brands
  console.log("Ingesting all 32 verified commercial enterprises and manufacturers...");
  const companyDefs = [
    {
      legalName: "Somaiya Techno Products / Alpha Blowers",
      tradeName: "Alpha Blowers",
      slug: "alpha-blowers",
      companyType: "Manufacturer",
      description: "Premier Indian manufacturer of Twin Lobe and Tri Lobe Positive Displacement Roots Blowers, ISO 9001:2015 certified, serving water treatment, aquaculture, cement, and chemical industries since 1989.",
      email: "absales@alphablowers.com",
      websiteUrl: "https://www.alphablowers.com",
      brand: "ALPHA BLOWERS",
    },
    {
      legalName: "Ambetronics Engineers Pvt. Ltd.",
      tradeName: "Ambetronics Process Instrumentation",
      slug: "ambetronics-engineers",
      companyType: "Manufacturer",
      description: "Pioneering Indian manufacturer of portable and online gas detection systems, multi-stream biogas analyzers, temperature controllers, and IoT dataloggers with PESO / CIMFR certifications.",
      email: "sales11@ambetronics.com",
      websiteUrl: "https://www.ambetronics.com",
      brand: "AMBETRONICS",
    },
    {
      legalName: "Tintometer India Pvt. Ltd. / Lovibond",
      tradeName: "Lovibond Water Testing",
      slug: "lovibond-tintometer",
      companyType: "Manufacturer",
      description: "German-engineered, world-leading optical analytical instruments, spectrophotometers, colorimeters, turbidimeters, and accredited reagent chemicals for water and wastewater testing.",
      email: "indiaoffice@lovibond.in",
      websiteUrl: "https://www.lovibond.in",
      brand: "LOVIBOND",
    },
    {
      legalName: "Asahi Kasei Corporation",
      tradeName: "Microza Membranes",
      slug: "asahi-kasei-microza",
      companyType: "Manufacturer",
      description: "Global technological benchmark for hollow-fiber PVDF microfiltration and ultrafiltration membrane modules for municipal drinking water, desalination pre-treatment, and high-purity industrial reuse.",
      email: "membrane@om.asahi-kasei.co.jp",
      websiteUrl: "https://www.microza.com",
      brand: "MICROZA",
    },
    {
      legalName: "Prikan Machinery Pvt. Ltd.",
      tradeName: "Prikan Machinery",
      slug: "prikan-machinery",
      companyType: "Manufacturer",
      description: "State-of-the-art manufacturer of heavy-duty ultra-servo plastic injection moulding machines (60 Ton to 650 Ton), equipped with high-response servo motors, KEBA controllers, and precision linear guides.",
      email: "sales@prikanakar.com",
      websiteUrl: "https://www.prikanakar.com",
      brand: "PRIKAN",
    },
    {
      legalName: "Planet Valves",
      tradeName: "Planet Valves & Flow Control",
      slug: "planet-valves",
      companyType: "Manufacturer",
      description: "Comprehensive industrial valve manufacturer specializing in precision investment casting ball valves, wafer butterfly valves, non-return check valves, and pneumatic automated valves.",
      email: "sales@planetvalves.com",
      websiteUrl: "https://www.planetvalves.com",
      brand: "PLANET VALVES",
    },
    {
      legalName: "Garuda Pumps Private Limited",
      tradeName: "Garuda Pumps",
      slug: "garuda-pumps",
      companyType: "Manufacturer",
      description: "Recognized Star Export House and leading Indian producer of cone-type and flat-plate liquid ring vacuum pumps and compressors for sugar mills, paper mills, and chemical distillation plants.",
      email: "north@garudapumps.com",
      websiteUrl: "https://www.garudapumps.com",
      brand: "GARUDA PUMPS",
    },
    {
      legalName: "E.G. Kantawalla Private Limited",
      tradeName: "Eagle Scales & Weighing Solutions",
      slug: "eagle-scales",
      companyType: "Manufacturer",
      description: "Leading manufacturer of heavy-duty pit and pitless electronic weighbridges, digital crane scales, floor scales, and dynamic weighing indicators with OIML and NABL compliant metrology.",
      email: "sales@egkantawalla.com",
      websiteUrl: "https://www.eaglescales.in",
      brand: "EAGLE",
    },
    {
      legalName: "Proveg Engineering / Shandong Yulong",
      tradeName: "Proveg Biomass Engineering",
      slug: "proveg-engineering",
      companyType: "Manufacturer",
      description: "Specialized biomass machinery manufacturer providing industrial vertical ring die pellet mills, high-capacity drum wood chippers, hammer mills, and rotary triple-pass drying plants.",
      email: "provegengineering@gmail.com",
      websiteUrl: "https://www.provegengg.com",
      brand: "PROVEG",
    },
    {
      legalName: "Sai Balaji Power Controls LLP",
      tradeName: "Sai Balaji Infra & Power",
      slug: "sai-balaji-infra",
      companyType: "Manufacturer",
      description: "ISO 9001:2015 certified infrastructure equipment manufacturer producing perforated GI cable trays, ladder trays, raceways, and pre-galvanized solar PV module mounting structures.",
      email: "info@saibalajiinfra.com",
      websiteUrl: "https://www.saibalajiinfra.com",
      brand: "SAI BALAJI INFRA",
    },
    {
      legalName: "GSE Filter Pvt. Ltd.",
      tradeName: "GSE Filter",
      slug: "gse-filter",
      companyType: "Manufacturer",
      description: "Leading manufacturer and stocking distributor of PP spun meltblown cartridges, pleated high-flow elements, filter bags, FRP composite pressure vessels, and ion exchange resins.",
      email: "chennai@gsefilter.com",
      websiteUrl: "https://www.gsefilter.com",
      brand: "GSE FILTER",
    },
    {
      legalName: "Aurozone Enviro Solutions",
      tradeName: "Aurozone Enviro",
      slug: "aurozone-enviro",
      companyType: "Manufacturer",
      description: "Specialized manufacturer of corona discharge ozone generators, oxygen concentrators, and ozone dissolution systems for industrial effluent decolorization and municipal disinfection.",
      email: "aurozone@gmail.com",
      websiteUrl: "https://www.aurozone.in",
      brand: "AUROZONE",
    },
    {
      legalName: "Organica Biotech Pvt. Ltd.",
      tradeName: "Organica Biotech",
      slug: "organica-biotech",
      companyType: "Manufacturer",
      description: "Pioneering biotechnology firm creating specialized microbial consortia, biocultures, and enzyme formulations for STP/ETP shock load handling and organic degradation.",
      email: "wwdomestic@organicabiotech.com",
      websiteUrl: "https://www.organicabiotech.com",
      brand: "ORGANICA BIOTECH",
    },
    {
      legalName: "Greeneria / A-1 Enviro Sciences",
      tradeName: "Greeneria Composting",
      slug: "greeneria-enviro",
      companyType: "Manufacturer",
      description: "Manufacturer of decentralized fully automatic organic waste converters, commercial food waste composting machines, and bio-mechanical digesters for hotels, hospitals, and societies.",
      email: "sales@greeneria.in",
      websiteUrl: "https://www.greeneria.in",
      brand: "GREENERIA",
    },
    {
      legalName: "Bio Green Energy Solutions",
      tradeName: "Bio Green Energy",
      slug: "bio-green-energy",
      companyType: "EPC Contractor",
      description: "Turnkey EPC contractor executing multi-ton agricultural residue Bio-CBG (Compressed Biogas) plants, continuous digesters, biological scrubbers, and organic FOM fertilizer bottling lines.",
      email: "info@biogreenenergysolutions.com",
      websiteUrl: "https://www.biogreenenergysolutions.com",
      brand: "BIO GREEN ENERGY",
    },
    {
      legalName: "PTC Watertech LLP",
      tradeName: "PTC Watertech",
      slug: "ptc-watertech",
      companyType: "EPC Contractor",
      description: "Turnkey water and wastewater engineering contractor designing and commissioning containerized STP, complex ETP, industrial RO, and Zero Liquid Discharge (ZLD) plants.",
      email: "sales@ptcwatertech.com",
      websiteUrl: "https://www.ptcwatertech.com",
      brand: "PTC WATERTECH",
    },
    {
      legalName: "Nirman Eco-Plastic Solutions Pvt. Ltd.",
      tradeName: "Nirman Eco-Plastic",
      slug: "nirman-eco-plastic",
      companyType: "Manufacturer",
      description: "Innovative manufacturer transforming post-consumer recycled polyolefin plastics into waterproof, termite-proof recycled plastic timber, heavy warehouse pallets, and municipal furniture.",
      email: "rishii@nirmaneco.in",
      websiteUrl: "https://www.nirmaneco.in",
      brand: "NIRMAN ECO",
    },
    {
      legalName: "Indonet Plastic Industries / Indobio",
      tradeName: "Indobio Filter Media",
      slug: "indobio-plastic",
      companyType: "Manufacturer",
      description: "Pioneering producer of structured Pipe Blok biological filter media, high-surface-area MBBR bio-carriers, and tube settler media for biological wastewater reactors.",
      email: "info@indobio.in",
      websiteUrl: "https://www.indobio.in",
      brand: "INDOBIO",
    },
    {
      legalName: "Anand Scientific Company",
      tradeName: "Anand Scientific",
      slug: "anand-scientific",
      companyType: "Manufacturer",
      description: "Established laboratory instrumentation manufacturer specializing in digital hot air ovens, bacteriological incubators, vertical autoclaves, and high-temperature muffle furnaces.",
      email: "anandscientific123@gmail.com",
      websiteUrl: "https://www.anandscientific.com",
      brand: "ANAND SCIENTIFIC",
    },
    {
      legalName: "Airshuddhi Engineers Pvt. Ltd.",
      tradeName: "Airshuddhi Engineers",
      slug: "airshuddhi-engineers",
      companyType: "EPC Contractor",
      description: "Turnkey EPC contractor specializing in biological H2S scrubbing towers, 3-stage membrane biogas upgrading packages, and 250-bar cascade bottling systems.",
      email: "info@airshuddhi.com",
      websiteUrl: "https://www.airshuddhi.com",
      brand: "AIRSHUDDHI",
    },
    {
      legalName: "Amalgam Biotech",
      tradeName: "Amalgam Biotech & Solutions",
      slug: "amalgam-biotech",
      companyType: "Biotech EPC",
      description: "Biotech and environmental engineering provider delivering advanced microbial cultures, electro-coagulation skids, and Zero Liquid Discharge (ZLD) treatment packages.",
      email: "sales@amalgambiotech.com",
      websiteUrl: "https://www.amalgambiotech.com",
      brand: "AMALGAM BIOTECH",
    },
    {
      legalName: "JK Engineering & Technology",
      tradeName: "EcoTreat & Power Flush",
      slug: "jk-engineering",
      companyType: "Manufacturer",
      description: "Specialized manufacturer of non-acidic eco descaling formulations and high-flow Power Flush descaling pumps for industrial heat exchangers, boilers, and cooling towers.",
      email: "sales@jket.in",
      websiteUrl: "https://www.jket.in",
      brand: "ECOTREAT",
    },
    {
      legalName: "Jainum FW Projects Limited",
      tradeName: "Jainum Projects",
      slug: "jainum-projects",
      companyType: "EPC Contractor",
      description: "Heavy engineering EPC provider of heavy rotary trommels, ballistic separators, sorting belt conveyors, and legacy waste bio-mining plants.",
      email: "projects@jainumprojects.com",
      websiteUrl: "https://www.jainumprojects.com",
      brand: "JAINUM",
    },
    {
      legalName: "Precision Gear Transmissions",
      tradeName: "Precision Gear",
      slug: "precision-gear",
      companyType: "Manufacturer",
      description: "ISO 9001:2015 certified heavy gear transmission producer manufacturing hardened and ground helical gearboxes, planetary speed reducers, and custom industrial drives.",
      email: "info@precisiongear.in",
      websiteUrl: "https://www.precisiongear.in",
      brand: "PRECISION GEAR",
    },
    {
      legalName: "Roar Engineers Water Solutions",
      tradeName: "Roar Engineers",
      slug: "roar-engineers",
      companyType: "Manufacturer",
      description: "Custom manufacturer of packaged STP plants, industrial RO skids, sand/carbon pressure filters, and automatic commercial water softeners.",
      email: "inforoarengineers@gmail.com",
      websiteUrl: "https://www.roarengineers.com",
      brand: "ROAR ENGINEERS",
    },
    {
      legalName: "Uzzala Bio Energy / The Gas Bank",
      tradeName: "The Gas Bank",
      slug: "the-gas-bank",
      companyType: "EPC Contractor",
      description: "Innovative clean energy provider executing Napier grass Bio-CBG turnkey plants and mobile cascade cylinder gas distribution logistics.",
      email: "uzzalabio@gmail.com",
      websiteUrl: "https://www.thegasbank.in",
      brand: "THE GAS BANK",
    },
    {
      legalName: "PPI Pumps Private Limited",
      tradeName: "PPI Pumps",
      slug: "ppi-pumps",
      companyType: "Manufacturer",
      description: "Specialist producer of water ring vacuum pumps, high-capacity two-stage vacuum units, and gas compressors for harsh chemical and pulp processes.",
      email: "sales@ppipumps.com",
      websiteUrl: "https://www.ppipumps.com",
      brand: "PPI PUMPS",
    },
    {
      legalName: "Miura Bio Power Pvt. Ltd.",
      tradeName: "Miura Bio Power",
      slug: "miura-bio-power",
      companyType: "Manufacturer",
      description: "Clean thermal power solutions provider manufacturing industrial downdraft biomass gasifiers and multi-fuel industrial steam boilers.",
      email: "enquiries@miurabiopower.com",
      websiteUrl: "https://www.miurabiopower.com",
      brand: "MIURA",
    },
    {
      legalName: "Gattuwala Energy Solutions Pvt. Ltd.",
      tradeName: "Gattuwala Energy",
      slug: "gattuwala-energy",
      companyType: "Manufacturer & EPC",
      description: "Producer of high-calorific biomass agricultural pellets and turnkey EPC contractor for commercial and industrial solar rooftop installations.",
      email: "akola@gattuwala.com",
      websiteUrl: "https://www.gattuwala.com",
      brand: "GATTUWALA",
    },
    {
      legalName: "YIMBY (Yes In My Backyard) / Reclevo Infotech",
      tradeName: "YIMBY Cleantech",
      slug: "yimby-cleantech",
      companyType: "Technology Provider",
      description: "Smart waste governance and decentralized community composting stations integrated with digital IoT traceability SaaS.",
      email: "info@yimby.in",
      websiteUrl: "https://www.yimby.in",
      brand: "YIMBY",
    },
    {
      legalName: "NetXeroC Private Limited",
      tradeName: "NetXeroC Sustainability",
      slug: "netxeroc",
      companyType: "Consultancy & Advisory",
      description: "Specialized cleantech advisory firm providing corporate carbon accounting, Scope 1-3 footprint measurement, Net-Zero roadmaps, and BRSR sustainability assurance.",
      email: "contact@netxeroc.com",
      websiteUrl: "https://www.netxeroc.com",
      brand: "NETXEROC",
    },
    {
      legalName: "Centre for Entrepreneurship Development (CED) - ALEAP",
      tradeName: "CED ALEAP",
      slug: "ced-aleap",
      companyType: "Institutional Body",
      description: "Apex MSME promotion body providing industrial incubation, credit guarantee subsidy navigation, and certified entrepreneurship development training.",
      email: "ced.aleap@gmail.com",
      websiteUrl: "https://www.aleap.org",
      brand: "CED ALEAP",
    },
  ];

  const companyMap = new Map<string, { id: string; brandId: string }>();

  for (const c of companyDefs) {
    const comp = await prisma.company.upsert({
      where: { slug: c.slug },
      update: {
        legalName: c.legalName,
        tradeName: c.tradeName,
        companyType: c.companyType,
        description: c.description,
        email: c.email,
        websiteUrl: c.websiteUrl,
        isVerified: true,
      },
      create: {
        legalName: c.legalName,
        tradeName: c.tradeName,
        slug: c.slug,
        companyType: c.companyType,
        description: c.description,
        email: c.email,
        websiteUrl: c.websiteUrl,
        isVerified: true,
      },
    });

    const brandSlug = c.brand.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const brand = await prisma.brand.upsert({
      where: { slug: brandSlug },
      update: { name: c.brand, companyId: comp.id },
      create: { name: c.brand, slug: brandSlug, companyId: comp.id },
    });

    companyMap.set(c.slug, { id: comp.id, brandId: brand.id });
  }
  console.log(`Ingested all ${companyMap.size} verified companies and brands.`);

  // 6. Specification Definitions Helper
  const specDefMap = new Map<string, string>();
  async function getOrCreateSpecDef(categorySlug: string, name: string, unit: string | null, dataType: string = "TEXT") {
    const catId = categoryMap.get(categorySlug);
    if (!catId) return null;
    const key = `${catId}:${name}`;
    if (specDefMap.has(key)) return specDefMap.get(key)!;

    const existing = await prisma.specificationDefinition.findFirst({
      where: { categoryId: catId, name },
    });
    if (existing) {
      specDefMap.set(key, existing.id);
      return existing.id;
    }

    const created = await prisma.specificationDefinition.create({
      data: {
        categoryId: catId,
        name,
        dataType,
        unit,
        groupName: "Technical Parameters",
        isFilterable: true,
        isComparable: true,
      },
    });
    specDefMap.set(key, created.id);
    return created.id;
  }

  // 7. Master Products Across All 32 Suppliers
  console.log("Ingesting authentic products with previews across all 32 companies...");

  const productData = [
    // 1. Alpha Roots Blowers (Hero 3D Image)
    {
      companySlug: "alpha-blowers",
      categorySlug: "roots-blowers-aerators",
      name: "Alpha Twin & Tri Lobe Positive Displacement Roots Blowers",
      slug: "alpha-roots-blowers-ab-series",
      entityKind: "PRODUCT",
      pricingMode: "PRICE_ON_REQUEST",
      shortDescription: "Heavy-duty rotary positive displacement air blowers with twin/tri lobe rotors, flow rates up to 10,000 m³/hr and pressure up to 1000 mbar.",
      fullDescription: "Manufactured from high-grade close-grained cast iron casings and lobes with precision-ground alloy steel timing gears. Designed for continuous heavy-duty service in aeration for ETP/STP, pneumatic conveying, aquaculture aeration, and cement blending.",
      sourceDocId: "src_144681700dd4d80e",
      sourcePage: 2,
      heroImage: "/images/products/roots-blower.jpg",
      industryCodes: ["IND-WATER", "IND-CHEM", "IND-SUGAR", "IND-PAPER"],
      applicationCodes: ["APP-AERATION", "APP-PNEUMATIC"],
      variants: [
        { sku: "AB-20-BELT", modelNumber: "AB-20", variantName: "AB-20 V-Belt Drive (10-60 m³/hr)", priceMinor: null, stock: null },
        { sku: "AB-50-BELT", modelNumber: "AB-50", variantName: "AB-50 V-Belt Drive (80-250 m³/hr)", priceMinor: null, stock: null },
        { sku: "AB-100-DIRECT", modelNumber: "AB-100", variantName: "AB-100 Direct Coupled (400-1200 m³/hr)", priceMinor: null, stock: null },
        { sku: "AB-200-HEAVY", modelNumber: "AB-200", variantName: "AB-200 Heavy Industrial (2500-6000 m³/hr)", priceMinor: null, stock: null },
      ],
      specs: [
        { name: "Flow Capacity", valueText: "10 to 10,000 m³/hr", valueNumeric: 10000, unit: "m³/hr" },
        { name: "Differential Pressure", valueText: "Up to 1000 mbar (1.0 kg/cm²)", valueNumeric: 1000, unit: "mbar" },
        { name: "Drive Type", valueText: "Direct Coupling or V-Belt Drive", unit: null },
        { name: "Material of Construction", valueText: "Graded Cast Iron FG-260, Alloy Steel 40Cr shafts", unit: null },
      ],
    },

    // 2. Ambetronics Multi-Stream Biogas Analyzer
    {
      companySlug: "ambetronics-engineers",
      categorySlug: "biogas-gas-analyzers",
      name: "Ambetronics Multi-Stream Biogas Online Analyzer (Panel Mount)",
      slug: "ambetronics-bio-600-biogas-analyzer",
      entityKind: "PRODUCT",
      pricingMode: "PRICE_ON_REQUEST",
      shortDescription: "Online continuous sequencing biogas analyzer monitoring CH4, CO2, O2, and H2S with integrated sample conditioning and touchscreen display.",
      fullDescription: "The BIO-600 Series is engineered specifically for Bio-CNG / CBG upgradation plants, digesters, and landfills. Features dual-beam NDIR sensors for methane and carbon dioxide with electrochemical sensors for oxygen and high-range H2S up to 10,000 ppm. Integrated sampling pump, moisture condensation trap, and Modbus RTU / 4-20mA telemetry.",
      sourceDocId: "src_1d427d20811d189c",
      sourcePage: 2,
      heroImage: null,
      industryCodes: ["IND-BIOGAS", "IND-CHEM", "IND-SUGAR"],
      applicationCodes: ["APP-GAS-ANALYSIS", "APP-UPGRADING"],
      variants: [
        { sku: "BIO-600-1STREAM", modelNumber: "BIO-600-S1", variantName: "Single Stream Sampling Skid", priceMinor: null, stock: null },
        { sku: "BIO-600-3STREAM", modelNumber: "BIO-600-S3", variantName: "Three-Stream Automatic Sequencing Skid", priceMinor: null, stock: null },
        { sku: "BIO-400-FLP", modelNumber: "BIO-400-FLP", variantName: "Flameproof Ex d IIC T6 Certified Unit", priceMinor: null, stock: null },
      ],
      specs: [
        { name: "Measured Gases", valueText: "CH4, CO2, O2, H2S (Multi-channel)", unit: null },
        { name: "Methane (CH4) Range", valueText: "0 to 100% Vol (NDIR, ±1% accuracy)", valueNumeric: 100, unit: "% vol" },
        { name: "Hydrogen Sulfide (H2S) Range", valueText: "0 to 2,000 / 10,000 ppm", valueNumeric: 10000, unit: "ppm" },
      ],
    },

    // 3. Lovibond Spectrophotometer (Hero 3D Image)
    {
      companySlug: "lovibond-tintometer",
      categorySlug: "water-quality-testing",
      name: "Lovibond XD 7500 UV-VIS Reference Spectrophotometer",
      slug: "lovibond-xd-7500-spectrophotometer",
      entityKind: "PRODUCT",
      pricingMode: "FIXED_PRICE",
      shortDescription: "Premium German UV-VIS reference spectrophotometer with split-beam optics, pre-programmed with over 150 water testing methods and barcode recognition.",
      fullDescription: "The XD 7500 combines reference-grade split-beam spectrophotometry with intelligent automatic cuvette recognition via bar-code reader. Spans 190 to 1100 nm wavelength range with a xenon flash lamp. Pre-loaded with water, wastewater, and industrial effluent parameters (COD, Nitrate, Phosphate, Heavy Metals).",
      sourceDocId: "src_a369a306e7f45911",
      sourcePage: 3,
      heroImage: "/images/products/spectrophotometer.jpg",
      industryCodes: ["IND-WATER", "IND-PHARMA", "IND-CHEM", "IND-FOOD"],
      applicationCodes: ["APP-SPECTRO"],
      variants: [
        { sku: "LOVI-XD-7500-UV", modelNumber: "XD 7500", variantName: "XD 7500 UV-VIS (190 - 1100 nm)", priceMinor: BigInt(87500000), stock: 8 },
        { sku: "LOVI-XD-7000-VIS", modelNumber: "XD 7000", variantName: "XD 7000 VIS Only (320 - 1100 nm)", priceMinor: BigInt(54000000), stock: 12 },
      ],
      specs: [
        { name: "Optical System", valueText: "Split-beam with Reference Detector & Xenon Flash Lamp", unit: null },
        { name: "Wavelength Range", valueText: "190 to 1100 nm", valueNumeric: 1100, unit: "nm" },
        { name: "Photometric Accuracy", valueText: "± 0.003 A (at 0.5 A)", valueNumeric: 0.003, unit: "%" },
      ],
    },

    // 4. Prikan Servo Plastic Injection Moulding Machine (Hero 3D Image)
    {
      companySlug: "prikan-machinery",
      categorySlug: "injection-moulding-machines",
      name: "Prikan Ultra Servo Energy-Saving Plastic Injection Moulding Machine",
      slug: "prikan-ultra-servo-injection-moulding-machine",
      entityKind: "PRODUCT",
      pricingMode: "PRICE_ON_REQUEST",
      shortDescription: "Heavy-duty servo-hydraulic injection moulding machines ranging from 60 Ton to 650 Ton clamping force with Austrian KEBA computer control.",
      fullDescription: "Engineered with double-toggle 5-point clamping geometry, high-response Inovance/Phase servo drive systems, and nitrided bimetallic barrel-screw assemblies. Up to 60% energy savings compared to conventional fixed pump machines, with precision repeatability for automotive, medical, packaging, and industrial fittings.",
      sourceDocId: "src_40cc46110bd23342",
      sourcePage: 2,
      heroImage: "/images/products/injection-moulding.jpg",
      industryCodes: ["IND-PLASTIC", "IND-CHEM", "IND-COMMERCIAL"],
      applicationCodes: ["APP-MOULDING"],
      variants: [
        { sku: "PRIKAN-60T", modelNumber: "PAS-60", variantName: "PAS-60 (60 Ton Clamping, 30mm Screw)", priceMinor: null, stock: null },
        { sku: "PRIKAN-110T", modelNumber: "PAS-110", variantName: "PAS-110 (110 Ton Clamping, 40mm Screw)", priceMinor: null, stock: null },
        { sku: "PRIKAN-160T", modelNumber: "PAS-160", variantName: "PAS-160 (160 Ton Clamping, 45mm Screw)", priceMinor: null, stock: null },
        { sku: "PRIKAN-250T", modelNumber: "PAS-250", variantName: "PAS-250 (250 Ton Clamping, 55mm Screw)", priceMinor: null, stock: null },
        { sku: "PRIKAN-450T", modelNumber: "PAS-450", variantName: "PAS-450 (450 Ton Clamping, 75mm Screw)", priceMinor: null, stock: null },
      ],
      specs: [
        { name: "Clamping Force", valueText: "600 kN to 6,500 kN", valueNumeric: 6500, unit: "kN" },
        { name: "Screw Diameter", valueText: "25 mm to 85 mm", valueNumeric: 85, unit: "mm" },
        { name: "Drive System", valueText: "Dynamic Servo Motor & Internal Gear Pump Closed Loop", unit: null },
      ],
    },

    // 5. Planet Industrial Valves (Hero 3D Image)
    {
      companySlug: "planet-valves",
      categorySlug: "industrial-process-valves",
      name: "Planet Heavy-Duty Investment Cast Stainless Steel Ball & Butterfly Valves",
      slug: "planet-industrial-ball-butterfly-valves",
      entityKind: "PRODUCT",
      pricingMode: "FIXED_PRICE",
      shortDescription: "Class 150/300 flanged ball valves and wafer butterfly valves manufactured in CF8M (SS316) / WCB for corrosive chemical and water applications.",
      fullDescription: "Precision investment cast ball valves with blowout-proof stems, PTFE/RPTFE seats, and ISO 5211 mounting pads for direct actuator coupling. Fire-safe tested and compliant with ASME B16.34 standards for high pressure and thermal cycling.",
      sourceDocId: "src_eafb3004ccf80087",
      sourcePage: 1,
      heroImage: "/images/products/industrial-valve.jpg",
      industryCodes: ["IND-CHEM", "IND-WATER", "IND-SUGAR", "IND-PHARMA"],
      applicationCodes: ["APP-PNEUMATIC"],
      variants: [
        { sku: "PV-BV-SS-25", modelNumber: "PV-BV-100", variantName: "1-inch (25 NB) SS316 Ball Valve Class 150 Flanged", priceMinor: BigInt(450000), stock: 45 },
        { sku: "PV-BV-SS-50", modelNumber: "PV-BV-200", variantName: "2-inch (50 NB) SS316 Ball Valve Class 150 Flanged", priceMinor: BigInt(980000), stock: 30 },
        { sku: "PV-BV-SS-80", modelNumber: "PV-BV-300", variantName: "3-inch (80 NB) SS316 Ball Valve Class 150 Flanged", priceMinor: BigInt(1650000), stock: 20 },
        { sku: "PV-BFV-100", modelNumber: "PV-BFV-400", variantName: "4-inch (100 NB) Wafer Butterfly Valve with EPDM Liner", priceMinor: BigInt(1120000), stock: 25 },
      ],
      specs: [
        { name: "Valve Type", valueText: "2-Piece & 3-Piece Full Bore Flanged Ball Valve", unit: null },
        { name: "Size Range", valueText: "15 NB to 200 NB (1/2\" to 8\")", unit: "NB / mm" },
        { name: "Pressure Class", valueText: "ASME Class 150, Class 300, PN 16/40", unit: "# / PN" },
      ],
    },

    // 6. Asahi Kasei Microza Membranes
    {
      companySlug: "asahi-kasei-microza",
      categorySlug: "membrane-filtration-ro",
      name: "Asahi Kasei Microza UNA-620A Hollow Fiber Ultrafiltration Module",
      slug: "asahi-microza-una-620a-uf-module",
      entityKind: "PRODUCT",
      pricingMode: "PRICE_ON_REQUEST",
      shortDescription: "Pressurized hollow fiber PVDF membrane filtration module with 50 m² membrane area, 0.1 µm pore size, and exceptional chemical resistance.",
      fullDescription: "World-class Microza pressurized modules feature thermally induced phase separation (TIPS) PVDF hollow fibers. Delivers ultra-low turbidity (<0.1 NTU), 4-log pathogen removal, high flux recovery during backwash, and long mechanical lifespan in municipal and industrial pre-RO applications.",
      sourceDocId: "src_fd7d4f8f10f500e6",
      sourcePage: 1,
      heroImage: null,
      industryCodes: ["IND-WATER", "IND-MUNICIPAL", "IND-POWER", "IND-PHARMA"],
      applicationCodes: ["APP-MEMBRANE"],
      variants: [
        { sku: "MICROZA-UNA-620A", modelNumber: "UNA-620A", variantName: "UNA-620A Standard 50 m² Module", priceMinor: null, stock: null },
        { sku: "MICROZA-UNAV-620A", modelNumber: "UNAV-620A", variantName: "UNAV-620A High-Flux Enhanced Module", priceMinor: null, stock: null },
      ],
      specs: [
        { name: "Membrane Material", valueText: "TIPS Hollow Fiber Polyvinylidene Fluoride (PVDF)", unit: null },
        { name: "Nominal Pore Size", valueText: "0.1 µm nominal", valueNumeric: 0.1, unit: "µm" },
        { name: "Effective Membrane Area", valueText: "50 m² active filtration area", valueNumeric: 50, unit: "m²" },
      ],
    },

    // 7. Garuda Liquid Ring Vacuum Pumps
    {
      companySlug: "garuda-pumps",
      categorySlug: "liquid-ring-vacuum-pumps",
      name: "Garuda High-Performance Liquid Ring Vacuum Pump (GVP Series)",
      slug: "garuda-gvp-liquid-ring-vacuum-pump",
      entityKind: "PRODUCT",
      pricingMode: "PRICE_ON_REQUEST",
      shortDescription: "Cone-type heavy-duty liquid ring vacuum pumps and compressors delivering suction capacities up to 15,000 m³/hr and vacuum up to 710 mm Hg.",
      fullDescription: "Proven track record in sugar pans, black liquor evaporators, paper machine wire boxes, power plant condenser exhausting, and pharmaceutical solvent extraction. Available in graded cast iron, phosphor bronze, and complete SS316 construction.",
      sourceDocId: "src_f3fd95fe5bd4720e",
      sourcePage: 2,
      heroImage: null,
      industryCodes: ["IND-SUGAR", "IND-PAPER", "IND-CHEM", "IND-STEEL"],
      applicationCodes: ["APP-VACUUM"],
      variants: [
        { sku: "GVP-100", modelNumber: "GVP-100", variantName: "GVP-100 (150 m³/hr, 7.5 kW)", priceMinor: null, stock: null },
        { sku: "GVP-250", modelNumber: "GVP-250", variantName: "GVP-250 (450 m³/hr, 22 kW)", priceMinor: null, stock: null },
        { sku: "GVP-500", modelNumber: "GVP-500", variantName: "GVP-500 (1,200 m³/hr, 45 kW)", priceMinor: null, stock: null },
      ],
      specs: [
        { name: "Suction Capacity", valueText: "100 to 15,000 m³/hr", valueNumeric: 15000, unit: "m³/hr" },
        { name: "Ultimate Vacuum", valueText: "Up to 710 mm of Hg (940 mbar)", valueNumeric: 710, unit: "mm Hg" },
      ],
    },

    // 8. E.G. Kantawalla (Eagle Weighbridges & Scales)
    {
      companySlug: "eagle-scales",
      categorySlug: "industrial-weighing-systems",
      name: "Eagle Heavy Duty Electronic Pitless Weighbridges (50T - 150T)",
      slug: "eagle-heavy-duty-electronic-weighbridge",
      entityKind: "PRODUCT",
      pricingMode: "PRICE_ON_REQUEST",
      shortDescription: "NABL & OIML approved structural steel pit and pitless truck weighbridges with IP68 hermetically sealed stainless steel load cells.",
      fullDescription: "Designed for rugged operation in mining, cement, steel, ports, and bulk commodity logistics. Features modular deck construction, lightning surge protection, and automated digital indicator with PC weighing software.",
      sourceDocId: "src_9ec37ddf62522cfb",
      sourcePage: 2,
      heroImage: null,
      industryCodes: ["IND-STEEL", "IND-SUGAR", "IND-MUNICIPAL"],
      applicationCodes: ["APP-WEIGHING"],
      variants: [
        { sku: "EAGLE-WB-60T", modelNumber: "EWB-60", variantName: "60 Ton Pitless Weighbridge (9m x 3m Deck)", priceMinor: null, stock: null },
        { sku: "EAGLE-WB-100T", modelNumber: "EWB-100", variantName: "100 Ton Pitless Weighbridge (18m x 3m Deck)", priceMinor: null, stock: null },
        { sku: "EAGLE-CRANE-10T", modelNumber: "ECS-10", variantName: "10 Ton Heavy Digital Crane Scale", priceMinor: BigInt(6500000), stock: 15 },
      ],
      specs: [
        { name: "Capacity", valueText: "50 Ton to 150 Ton multi-axle", unit: "Ton" },
        { name: "Load Cells", valueText: "OIML R60 C3 Certified SS316 Compression / Rocker Pin", unit: null },
      ],
    },

    // 9. Proveg Biomass Pellet Mill
    {
      companySlug: "proveg-engineering",
      categorySlug: "biomass-pellet-machinery",
      name: "Proveg Vertical Ring Die Biomass Pellet Mill (Yulong Line)",
      slug: "proveg-vertical-ring-die-pellet-mill",
      entityKind: "PRODUCT",
      pricingMode: "PRICE_ON_REQUEST",
      shortDescription: "High-throughput vertical centrifugal ring die pelletizer producing 1.5 to 4.0 TPH of dense biomass pellets from sawdust, crop stalks, and bagasse.",
      fullDescription: "Features a vertically positioned die with roller assembly spinning inside, ensuring uniform gravity feeding without clogging. Built with high-reduction helical gearbox, automatic grease lubrication pump, and wear-resistant alloy ring die.",
      sourceDocId: "src_eba96ea15947605d",
      sourcePage: 3,
      heroImage: null,
      industryCodes: ["IND-BIOGAS", "IND-STEEL", "IND-FOOD"],
      applicationCodes: ["APP-PELLETIZING"],
      variants: [
        { sku: "PROVEG-XGJ-560", modelNumber: "XGJ-560", variantName: "XGJ-560 Pellet Mill (1.5-2.0 TPH, 132 kW)", priceMinor: null, stock: null },
        { sku: "PROVEG-XGJ-850", modelNumber: "XGJ-850", variantName: "XGJ-850 Pellet Mill (3.0-4.0 TPH, 220 kW)", priceMinor: null, stock: null },
      ],
      specs: [
        { name: "Pellet Production Capacity", valueText: "1.5 to 4.0 Tonnes Per Hour", valueNumeric: 4, unit: "TPH" },
        { name: "Main Drive Power", valueText: "132 kW to 220 kW Siemens/ABB motor", valueNumeric: 220, unit: "kW" },
      ],
    },

    // 10. Sai Balaji Cable Trays
    {
      companySlug: "sai-balaji-infra",
      categorySlug: "cable-management-trays",
      name: "Sai Balaji Heavy Duty Perforated & Ladder GI Cable Trays",
      slug: "sai-balaji-perforated-ladder-cable-trays",
      entityKind: "PRODUCT",
      pricingMode: "FIXED_PRICE",
      shortDescription: "Pre-galvanized and hot-dip galvanized perforated and ladder cable trays manufactured to IS 2062/IS 4759 standards with matching couplers and bends.",
      fullDescription: "Engineered for high mechanical load deflection resistance across solar power plants, substations, process chemical factories, and commercial high-rises. Thickness options from 1.2 mm to 3.0 mm, widths from 50 mm to 1000 mm.",
      sourceDocId: "src_b732c9cd2afb1037",
      sourcePage: 2,
      heroImage: null,
      industryCodes: ["IND-SOLAR", "IND-STEEL", "IND-COMMERCIAL", "IND-MUNICIPAL"],
      applicationCodes: ["APP-CABLE-RUN"],
      variants: [
        { sku: "SB-TRAY-PERF-150", modelNumber: "SB-P-150", variantName: "150mm Width x 50mm Height Perforated GI (2.5m length)", priceMinor: BigInt(125000), stock: 150 },
        { sku: "SB-TRAY-PERF-300", modelNumber: "SB-P-300", variantName: "300mm Width x 50mm Height Perforated GI (2.5m length)", priceMinor: BigInt(210000), stock: 100 },
        { sku: "SB-TRAY-LADD-450", modelNumber: "SB-L-450", variantName: "450mm Width x 75mm Height Ladder GI (2.5m length)", priceMinor: BigInt(340000), stock: 80 },
      ],
      specs: [
        { name: "Tray Type", valueText: "Perforated Sheet & Heavy Ladder Construction", unit: null },
        { name: "Finish / Coating", valueText: "Hot Dip Galvanized (65-80 microns) / Pre-Galvanized", unit: null },
      ],
    },

    // 11. GSE Filter Spun Cartridges & Vessels
    {
      companySlug: "gse-filter",
      categorySlug: "cartridge-filtration-vessels",
      name: "GSE High-Purity PP Meltblown Filter Cartridges (10\" - 40\")",
      slug: "gse-pp-spun-meltblown-filter-cartridges",
      entityKind: "PRODUCT",
      pricingMode: "FIXED_PRICE",
      shortDescription: "100% virgin polypropylene thermal bonded sediment filter cartridges with graded density pore structure and superior dirt holding capacity.",
      fullDescription: "Complies with FDA requirements for food and beverage contact. Graded pore structure traps coarse particles on outer surface and fine silt near core, preventing premature surface blinding. Available from 1 to 50 microns.",
      sourceDocId: "src_370fbfb03e012492",
      sourcePage: 2,
      heroImage: null,
      industryCodes: ["IND-WATER", "IND-FOOD", "IND-PHARMA"],
      applicationCodes: ["APP-MEMBRANE"],
      variants: [
        { sku: "GSE-SPUN-10-5M", modelNumber: "GSE-MB-10", variantName: "10\" Standard Spun Cartridge 5 Micron (Box of 50)", priceMinor: BigInt(450000), stock: 80 },
        { sku: "GSE-SPUN-20-5M", modelNumber: "GSE-MB-20", variantName: "20\" Standard Spun Cartridge 5 Micron (Box of 25)", priceMinor: BigInt(420000), stock: 60 },
        { sku: "GSE-JUMBO-20-5M", modelNumber: "GSE-BB-20", variantName: "20\" Jumbo Big Blue 5 Micron (Pack of 8)", priceMinor: BigInt(560000), stock: 40 },
      ],
      specs: [
        { name: "Micron Rating", valueText: "1 µm, 5 µm, 10 µm, 20 µm, 50 µm", valueNumeric: 5, unit: "µm" },
        { name: "Cartridge Length", valueText: "10\", 20\", 30\", 40\" options", valueNumeric: 20, unit: "inch" },
      ],
    },

    // 12. Aurozone Corona Discharge Ozone Generator
    {
      companySlug: "aurozone-enviro",
      categorySlug: "ozone-disinfection",
      name: "Aurozone Megazone Industrial Corona Discharge Ozone Generator",
      slug: "aurozone-megazone-ozone-generator",
      entityKind: "PRODUCT",
      pricingMode: "FIXED_PRICE",
      shortDescription: "High-output air and water ozone generators delivering 10 g/hr to 500 g/hr ozone output with high-frequency IGBT inverter and oxygen concentrator.",
      fullDescription: "Equipped with precision ceramic dielectric tubes and SS316 electrodes. Ideal for textile dye wastewater decolorization, cooling tower biocide replacement, municipal swimming pools, and pharmaceutical clean-in-place (CIP) water disinfection.",
      sourceDocId: "src_17a3ae73923e51d0",
      sourcePage: 2,
      heroImage: null,
      industryCodes: ["IND-WATER", "IND-TEXTILE", "IND-PHARMA", "IND-FOOD"],
      applicationCodes: ["APP-DISINFECTION"],
      variants: [
        { sku: "AURO-O3-10G", modelNumber: "O3-GEN-10", variantName: "10 g/hr Commercial Ozone Unit", priceMinor: BigInt(6500000), stock: 20 },
        { sku: "AURO-O3-50G", modelNumber: "O3-GEN-50", variantName: "50 g/hr Industrial Ozone Generator Skid", priceMinor: BigInt(18500000), stock: 12 },
      ],
      specs: [
        { name: "Ozone Output", valueText: "10 g/hr to 500 g/hr", valueNumeric: 500, unit: "g/hr" },
        { name: "Cooling Medium", valueText: "Water Cooled Ceramic Dielectric", unit: null },
      ],
    },

    // 13. Organica Biotech Bioclean Enzymes
    {
      companySlug: "organica-biotech",
      categorySlug: "microbial-wastewater-inoculants",
      name: "Organica Bioclean STP & ETP High-Potency Bacterial Consortia",
      slug: "organica-bioclean-stp-etp-biocultures",
      entityKind: "PRODUCT",
      pricingMode: "FIXED_PRICE",
      shortDescription: "Proprietary microbial consortium of natural non-pathogenic bacteria and free enzymes for rapid shock load recovery, COD/BOD reduction, and sludge reduction in biological reactors.",
      fullDescription: "Contains micro-encapsulated strains adapted to high TDS, heavy organic shock loads, and varying pH. Rapidly establishes healthy mixed liquor suspended solids (MLSS), degrades stubborn recalcitrant aromatics, and minimizes foaming.",
      sourceDocId: "src_c17647a02bad15af",
      sourcePage: 2,
      heroImage: null,
      industryCodes: ["IND-WATER", "IND-TEXTILE", "IND-CHEM", "IND-FOOD"],
      applicationCodes: ["APP-AERATION"],
      variants: [
        { sku: "ORG-STP-10KG", modelNumber: "BIOCLEAN-STP", variantName: "Bioclean STP Powder (10 kg Drum)", priceMinor: BigInt(1850000), stock: 35 },
        { sku: "ORG-ETP-25KG", modelNumber: "BIOCLEAN-ETP", variantName: "Bioclean ETP Industrial (25 kg Drum)", priceMinor: BigInt(4200000), stock: 25 },
      ],
      specs: [
        { name: "Target Application", valueText: "STP & ETP Aeration Tank, SBR, MBR, and MBBR systems", unit: null },
        { name: "Physical Form", valueText: "Dry concentrated powder with microbial stabilizing carrier", unit: null },
      ],
    },

    // 14. Greeneria Automatic Composting Machine
    {
      companySlug: "greeneria-enviro",
      categorySlug: "organic-waste-converters",
      name: "Greeneria Fully Automated In-Vessel Organic Waste Converter (OWC)",
      slug: "greeneria-automated-organic-waste-converter",
      entityKind: "PRODUCT",
      pricingMode: "PRICE_ON_REQUEST",
      shortDescription: "Decentralized automatic food and horticulture waste composting machines converting organic solid waste into rich manure within 24 hours.",
      fullDescription: "Features PLC automated multi-stage shredding, thermal aeration jacket, bio-catalyst heating, and built-in exhaust deodorization scrubbers. Capacities range from 50 kg/day up to 2,000 kg/day for zero-waste residential townships and commercial complexes.",
      sourceDocId: "src_0a146e599513ad12",
      sourcePage: 1,
      heroImage: null,
      industryCodes: ["IND-COMMERCIAL", "IND-MUNICIPAL", "IND-FOOD"],
      applicationCodes: ["APP-COMPOSTING"],
      variants: [
        { sku: "GRN-OWC-100", modelNumber: "OWC-100", variantName: "OWC-100 (100 kg/day capacity)", priceMinor: null, stock: null },
        { sku: "GRN-OWC-250", modelNumber: "OWC-250", variantName: "OWC-250 (250 kg/day capacity)", priceMinor: null, stock: null },
        { sku: "GRN-OWC-500", modelNumber: "OWC-500", variantName: "OWC-500 (500 kg/day capacity)", priceMinor: null, stock: null },
      ],
      specs: [
        { name: "Processing Capacity", valueText: "100 kg/day to 2,000 kg/day", valueNumeric: 2000, unit: "kg/day" },
      ],
    },

    // 15. Bio Green Commercial Bio-CBG Turnkey EPC Plant
    {
      companySlug: "bio-green-energy",
      categorySlug: "biogas-scrubbers-upgrading",
      name: "Bio Green Energy Commercial Bio-CBG Greenfield Turnkey Plant",
      slug: "bio-green-turnkey-bio-cbg-plant",
      entityKind: "TURNKEY_PROJECT",
      pricingMode: "PRICE_ON_REQUEST",
      shortDescription: "Complete EPC turnkey installation of 5 to 50 TPD compressed biogas plants based on pressmud, paddy straw, and Napier grass feedstocks.",
      fullDescription: "Comprehensive EPC execution encompassing feedstock receiving yards, anaerobic CSTR digesters, biological desulfurization, membrane gas upgrading to 96%+ methane, 250-bar gas compression, cascade bottling, and certified organic FOM fertilizer granulation lines.",
      sourceDocId: "src_8868dc31adf1b860",
      sourcePage: 1,
      heroImage: null,
      industryCodes: ["IND-BIOGAS", "IND-SUGAR", "IND-MUNICIPAL"],
      applicationCodes: ["APP-UPGRADING"],
      variants: [
        { sku: "BGE-CBG-5TPD", modelNumber: "CBG-5TPD", variantName: "5 TPD Bio-CBG Turnkey Facility", priceMinor: null, stock: null },
        { sku: "BGE-CBG-20TPD", modelNumber: "CBG-20TPD", variantName: "20 TPD Large Commercial Bio-CBG Facility", priceMinor: null, stock: null },
      ],
      specs: [
        { name: "Target Application", valueText: "Commercial SATAT-Compliant Bio-CBG & Organic Fertilizer Production", unit: null },
      ],
    },

    // 16. PTC Watertech Modular STP/ETP Solutions
    {
      companySlug: "ptc-watertech",
      categorySlug: "packaged-stp-etp",
      name: "PTC Watertech Containerized Packaged STP & Industrial ETP Systems",
      slug: "ptc-watertech-packaged-stp-etp-systems",
      entityKind: "SOLUTION",
      pricingMode: "PRICE_ON_REQUEST",
      shortDescription: "Modular plug-and-play containerized wastewater treatment systems utilizing MBBR and MBR technologies for rapid on-site commissioning.",
      fullDescription: "Engineered inside standard ISO shipping containers for minimal civil construction footprint. Features automated PLC control, quiet low-vibration blowers, high-flux hollow fiber membranes, and UV/Ozone tertiary polishing yielding NGT/CPCB compliant discharge.",
      sourceDocId: "src_65169b8241541cd4",
      sourcePage: 2,
      heroImage: null,
      industryCodes: ["IND-WATER", "IND-COMMERCIAL", "IND-PHARMA", "IND-TEXTILE"],
      applicationCodes: ["APP-AERATION", "APP-MEMBRANE"],
      variants: [
        { sku: "PTC-STP-50KLD", modelNumber: "C-STP-50", variantName: "50 KLD Containerized MBBR-STP", priceMinor: null, stock: null },
        { sku: "PTC-STP-150KLD", modelNumber: "C-STP-150", variantName: "150 KLD Containerized MBR-STP", priceMinor: null, stock: null },
      ],
      specs: [
        { name: "Treatment Capacity", valueText: "25 KLD to 500 KLD containerized units", unit: "KLD" },
      ],
    },

    // 17. Nirman Eco-Plastic Recycled Timber
    {
      companySlug: "nirman-eco-plastic",
      categorySlug: "recycled-plastic-timber-pallets",
      name: "Nirman Eco-Plastic Heavy Duty Recycled Polymeric Timber & Pallets",
      slug: "nirman-recycled-plastic-timber-pallets",
      entityKind: "PRODUCT",
      pricingMode: "FIXED_PRICE",
      shortDescription: "Zero-maintenance circular synthetic wood planks and 4-way heavy warehouse pallets molded from 100% recycled industrial plastics.",
      fullDescription: "Impervious to water, fungal rot, marine borers, and chemical spills. Ideal replacement for natural wood in cooling tower packing, outdoor boardwalks, warehouse storage racks, and logistics distribution.",
      sourceDocId: "src_b5762cca4fc4896a",
      sourcePage: 2,
      heroImage: null,
      industryCodes: ["IND-COMMERCIAL", "IND-MUNICIPAL", "IND-CHEM"],
      applicationCodes: ["APP-PNEUMATIC"],
      variants: [
        { sku: "NIR-PLANK-4X2", modelNumber: "NEP-PL-100", variantName: "4\" x 2\" Solid Recycled Timber Plank (8 ft length)", priceMinor: BigInt(85000), stock: 200 },
        { sku: "NIR-PALLET-HEAVY", modelNumber: "NEP-PAL-1210", variantName: "1200 x 1000 mm 4-Way Heavy Duty Rackable Pallet (2-Ton load)", priceMinor: BigInt(285000), stock: 75 },
      ],
      specs: [
        { name: "Material", valueText: "100% Recycled Polyolefin (HDPE/PP Composite)", unit: null },
      ],
    },

    // 18. Indonet / Indobio Biological Filter Media
    {
      companySlug: "indobio-plastic",
      categorySlug: "biological-media-aeration",
      name: "Indobio Pipe Blok Structured Media & MBBR Virgin Bio-Carriers",
      slug: "indobio-pipe-blok-mbbr-media",
      entityKind: "PRODUCT",
      pricingMode: "FIXED_PRICE",
      shortDescription: "High-surface area structured Pipe Blok media and virgin HDPE MBBR bio-carrier media for high-rate biological wastewater reactors.",
      fullDescription: "Manufactured from 100% virgin polypropylene and HDPE. Pipe Blok offers structured vertical flow preventing biomass bridging with 100 to 200 m²/m³ specific area. MBBR rings provide 400 to 800 m²/m³ protected active surface area.",
      sourceDocId: "src_6dfc1393e0ac614e",
      sourcePage: 1,
      heroImage: null,
      industryCodes: ["IND-WATER", "IND-TEXTILE", "IND-CHEM"],
      applicationCodes: ["APP-AERATION"],
      variants: [
        { sku: "INDO-MBBR-1BAG", modelNumber: "MBBR-800", variantName: "MBBR Virgin Media Rings (1 m³ Bag)", priceMinor: BigInt(1250000), stock: 50 },
        { sku: "INDO-PIPEBLOK-M3", modelNumber: "PB-150", variantName: "Pipe Blok Structured Media Modules (Per m³)", priceMinor: BigInt(850000), stock: 100 },
      ],
      specs: [
        { name: "Specific Surface Area", valueText: "400 to 800 m²/m³ active protected area", valueNumeric: 800, unit: "m²/m³" },
      ],
    },

    // 19. Anand Scientific Lab Heaters & Autoclaves
    {
      companySlug: "anand-scientific",
      categorySlug: "lab-heaters-autoclaves",
      name: "Anand Scientific Digital Laboratory Oven & Vertical Autoclave",
      slug: "anand-scientific-lab-oven-autoclave",
      entityKind: "PRODUCT",
      pricingMode: "FIXED_PRICE",
      shortDescription: "Precision micro-processor controlled hot air ovens (up to 250°C) and vertical high-pressure radial locking steam autoclaves for QC labs.",
      fullDescription: "Heavy-gauge stainless steel SS304 inner chamber with mineral wool thermal insulation. Digital PID controller with dual display, safety over-temperature thermostat, and calibrated pressure release valves.",
      sourceDocId: "src_f27ffa7ded2350b5",
      sourcePage: 2,
      heroImage: null,
      industryCodes: ["IND-PHARMA", "IND-FOOD", "IND-WATER"],
      applicationCodes: ["APP-LAB-TESTING"],
      variants: [
        { sku: "ANAND-OV-18X18", modelNumber: "AS-OV-18", variantName: "Digital Hot Air Oven 18\"x18\"x18\" (SS304)", priceMinor: BigInt(3400000), stock: 15 },
        { sku: "ANAND-AUTO-VERTICAL", modelNumber: "AS-AC-1220", variantName: "Vertical Steam Autoclave 12\"x20\" (Radial Lock)", priceMinor: BigInt(5200000), stock: 10 },
      ],
      specs: [
        { name: "Temperature Range", valueText: "Ambient +5°C to 250°C (PID Control)", unit: "°C" },
      ],
    },

    // 20. Airshuddhi Biogas Upgrading Package
    {
      companySlug: "airshuddhi-engineers",
      categorySlug: "biogas-scrubbers-upgrading",
      name: "Airshuddhi High-Purity Bio-CNG Membrane Separation & Bottling Skid",
      slug: "airshuddhi-biocng-membrane-bottling-skid",
      entityKind: "SOLUTION",
      pricingMode: "PRICE_ON_REQUEST",
      shortDescription: "Engineered multi-stage polymer membrane gas separation package achieving >96.5% CH4 purity with 250-bar automated cascade bottling.",
      fullDescription: "Integrates biological H2S scrubbing towers with multi-stage hollow-fiber polyimide membrane permeation. Guarantees methane loss <0.5%, complete CO2 separation, and automatic moisture dew-point drying compliant with IS 16087 automotive standards.",
      sourceDocId: "src_48feff1722e03816",
      sourcePage: 2,
      heroImage: null,
      industryCodes: ["IND-BIOGAS", "IND-SUGAR", "IND-MUNICIPAL"],
      applicationCodes: ["APP-UPGRADING"],
      variants: [
        { sku: "AIR-UPG-250NM3", modelNumber: "AS-UPG-250", variantName: "250 Nm³/hr Bio-CNG Membrane Skid", priceMinor: null, stock: null },
        { sku: "AIR-UPG-1000NM3", modelNumber: "AS-UPG-1000", variantName: "1,000 Nm³/hr Large Upgrading Package", priceMinor: null, stock: null },
      ],
      specs: [
        { name: "Methane Product Purity", valueText: "> 96.5% CH4 (IS 16087 Compliant)", valueNumeric: 96.5, unit: "% vol" },
      ],
    },

    // 21. JK Engineering Eco Descaling Pump & Chemicals
    {
      companySlug: "jk-engineering",
      categorySlug: "eco-descaling-chemicals",
      name: "JK Engineering EcoTreat Chemical & Power Flush Descaling Pump",
      slug: "jket-ecotreat-power-flush-descaling-system",
      entityKind: "PRODUCT",
      pricingMode: "FIXED_PRICE",
      shortDescription: "Non-hazardous, non-fuming organic descaling chemical paired with acid-proof chemical circulation pump for rapid limescale removal.",
      fullDescription: "EcoTreat safely dissolves calcium carbonate, rust, and silica scales from PHE plates, shell-and-tube condensers, and injection moulding cooling channels without attacking base metallurgy (copper, brass, SS, aluminum).",
      sourceDocId: "src_32bdd39b07440c8d",
      sourcePage: 2,
      heroImage: null,
      industryCodes: ["IND-PLASTIC", "IND-CHEM", "IND-COMMERCIAL"],
      applicationCodes: ["APP-DESCALING"],
      variants: [
        { sku: "JKET-PF-PUMP-50", modelNumber: "PF-50", variantName: "Power Flush Chemical Circulation Pump (50 LPM)", priceMinor: BigInt(3800000), stock: 20 },
        { sku: "JKET-ECOTREAT-30KG", modelNumber: "ET-30", variantName: "EcoTreat Descaling Chemical (30 kg Carboy)", priceMinor: BigInt(750000), stock: 60 },
      ],
      specs: [
        { name: "Corrosion Rate", valueText: "Zero attack on Copper, Brass, SS304/316, Mild Steel", unit: null },
      ],
    },

    // 22. Jainum FW Projects Rotary Trommel Screener
    {
      companySlug: "jainum-projects",
      categorySlug: "solid-waste-trommels",
      name: "Jainum Heavy Industrial Rotary Trommel Screener for Legacy Waste",
      slug: "jainum-heavy-rotary-trommel-screener",
      entityKind: "PRODUCT",
      pricingMode: "PRICE_ON_REQUEST",
      shortDescription: "Rugged trommel drum screeners for municipal solid waste segregation, legacy dumpsite bio-mining, and RDF separation up to 100 TPH.",
      fullDescription: "Constructed with wear-resistant high-carbon manganese punch mesh screens, heavy support trunnion rollers, anti-spill discharge hoppers, and variable frequency drives (VFD) for adjustable screening fractions (4mm, 16mm, 35mm).",
      sourceDocId: "src_b8f191dc7a0a40d6",
      sourcePage: 2,
      heroImage: null,
      industryCodes: ["IND-MUNICIPAL", "IND-COMMERCIAL"],
      applicationCodes: ["APP-TROMMEL-SCREEN"],
      variants: [
        { sku: "JAI-TR-1800", modelNumber: "TR-1800", variantName: "1.8m Dia x 6m Length Trommel (30-50 TPH)", priceMinor: null, stock: null },
        { sku: "JAI-TR-2500", modelNumber: "TR-2500", variantName: "2.5m Dia x 9m Length Heavy Trommel (75-100 TPH)", priceMinor: null, stock: null },
      ],
      specs: [
        { name: "Screening Throughput", valueText: "30 to 100 Tonnes Per Hour", valueNumeric: 100, unit: "TPH" },
      ],
    },

    // 23. Precision Gear Transmissions
    {
      companySlug: "precision-gear",
      categorySlug: "industrial-gearboxes",
      name: "Precision Gear Heavy Industrial Helical & Planetary Speed Reducers",
      slug: "precision-gear-helical-planetary-speed-reducers",
      entityKind: "PRODUCT",
      pricingMode: "PRICE_ON_REQUEST",
      shortDescription: "Custom precision ground case-hardened alloy steel helical and planetary industrial gearboxes for agitators, kilns, extruders, and conveyors.",
      fullDescription: "Manufactured from 18CrNiMo7-6 forged alloy steel gears, carburized and precision tooth-profile ground to AGMA / DIN Class 6 accuracy. Cast iron housing optimized with internal cooling ribs and high-load SKF/FAG bearings.",
      sourceDocId: "src_43a9dfb5a351705c",
      sourcePage: 1,
      heroImage: null,
      industryCodes: ["IND-STEEL", "IND-SUGAR", "IND-PLASTIC"],
      applicationCodes: ["APP-PNEUMATIC"],
      variants: [
        { sku: "PG-HELICAL-H1", modelNumber: "PG-H1", variantName: "Single Stage Helical Gearbox (Ratio 1.5:1 to 5:1)", priceMinor: null, stock: null },
        { sku: "PG-PLANETARY-P2", modelNumber: "PG-P2", variantName: "High Torque Planetary Reducer (Torque up to 50,000 Nm)", priceMinor: null, stock: null },
      ],
      specs: [
        { name: "Gear Material", valueText: "18CrNiMo7-6 Forged Case Hardened Alloy Steel (58-62 HRC)", unit: null },
      ],
    },

    // 24. Roar Engineers Water Solutions
    {
      companySlug: "roar-engineers",
      categorySlug: "packaged-stp-etp",
      name: "Roar Engineers Commercial Packaged STP & Industrial RO Systems",
      slug: "roar-engineers-packaged-stp-industrial-ro",
      entityKind: "PRODUCT",
      pricingMode: "PRICE_ON_REQUEST",
      shortDescription: "Compact prefabricated sewage treatment units and skid-mounted reverse osmosis plants with low energy footprint and high recovery.",
      fullDescription: "Delivers comprehensive tertiary filtration with sand media, activated carbon, and optional ultrafiltration membranes. Skid-mounted configuration enables minimal installation footprint for hotels, schools, and industrial parks.",
      sourceDocId: "src_093b4aef1bf931fd",
      sourcePage: 2,
      heroImage: null,
      industryCodes: ["IND-WATER", "IND-COMMERCIAL", "IND-PHARMA"],
      applicationCodes: ["APP-MEMBRANE"],
      variants: [
        { sku: "ROAR-STP-20KLD", modelNumber: "R-STP-20", variantName: "20 KLD Packaged Compact STP", priceMinor: null, stock: null },
        { sku: "ROAR-RO-2000LPH", modelNumber: "R-RO-2000", variantName: "2000 LPH Skid Mounted Industrial RO", priceMinor: BigInt(45000000), stock: 8 },
      ],
      specs: [
        { name: "Recovery Rate", valueText: "Up to 75% on High TDS Brackish Water", unit: "%" },
      ],
    },

    // 25. Uzzala / The Gas Bank
    {
      companySlug: "the-gas-bank",
      categorySlug: "gas-compression-dispensing",
      name: "The Gas Bank Mobile CBG Cylinder Storage & Transportation Cascade",
      slug: "the-gas-bank-cbg-transport-cascade",
      entityKind: "PRODUCT",
      pricingMode: "PRICE_ON_REQUEST",
      shortDescription: "Type-1 seamless steel cylinder transport cascades mounted on PESO-approved skids for bulk Compressed Biogas distribution.",
      fullDescription: "Complies with IS 7285 and Gas Cylinder Rules 2016. High-pressure manifold testing up to 375 bar with burst discs, pneumatic isolation valves, and third-party inspection certifications.",
      sourceDocId: "src_2d6d5c7b28d053de",
      sourcePage: 2,
      heroImage: null,
      industryCodes: ["IND-BIOGAS"],
      applicationCodes: ["APP-UPGRADING"],
      variants: [
        { sku: "TGB-CAS-3000L", modelNumber: "TGB-3000", variantName: "3,000 Litre Water Capacity Transport Cascade (250 bar)", priceMinor: null, stock: null },
        { sku: "TGB-CAS-4500L", modelNumber: "TGB-4500", variantName: "4,500 Litre Water Capacity Heavy Cascade (250 bar)", priceMinor: null, stock: null },
      ],
      specs: [
        { name: "Working Pressure", valueText: "200 to 250 bar (Test Pressure 375 bar)", valueNumeric: 250, unit: "bar" },
      ],
    },

    // 26. PPI Pumps Heavy Vacuum Pump
    {
      companySlug: "ppi-pumps",
      categorySlug: "liquid-ring-vacuum-pumps",
      name: "PPI Pumps Heavy Duty Two-Stage Liquid Ring Vacuum Pump",
      slug: "ppi-pumps-heavy-two-stage-liquid-ring-vacuum-pump",
      entityKind: "PRODUCT",
      pricingMode: "PRICE_ON_REQUEST",
      shortDescription: "Two-stage high-vacuum liquid ring pumps delivering deep vacuum up to 735 mm Hg for chemical evaporation and vacuum distillation.",
      fullDescription: "Two impellers working in series deliver higher vacuum at low suction pressures without cavitation. Available in ASTM A216 WCB, SS304, and SS316.",
      sourceDocId: "src_71b3f4b5ec06372c",
      sourcePage: 1,
      heroImage: null,
      industryCodes: ["IND-CHEM", "IND-PHARMA", "IND-SUGAR"],
      applicationCodes: ["APP-VACUUM"],
      variants: [
        { sku: "PPI-TS-150", modelNumber: "TS-150", variantName: "PPI TS-150 Two-Stage Vacuum Pump (250 m³/hr)", priceMinor: null, stock: null },
        { sku: "PPI-TS-300", modelNumber: "TS-300", variantName: "PPI TS-300 Two-Stage Vacuum Pump (600 m³/hr)", priceMinor: null, stock: null },
      ],
      specs: [
        { name: "Max Vacuum", valueText: "Up to 735 mm Hg (33 mbar abs)", valueNumeric: 735, unit: "mm Hg" },
      ],
    },

    // 27. Miura Bio Power Gasifier
    {
      companySlug: "miura-bio-power",
      categorySlug: "renewable-energy-bio-cbg",
      name: "Miura Industrial Downdraft Biomass Gasifier System",
      slug: "miura-industrial-downdraft-biomass-gasifier",
      entityKind: "SOLUTION",
      pricingMode: "PRICE_ON_REQUEST",
      shortDescription: "High-efficiency thermal biomass gasifier replacing diesel and furnace oil in industrial furnaces, kilns, and boilers.",
      fullDescription: "Converts woody biomass, coconut shells, and briquettes into clean producer gas with >80% thermal conversion efficiency. Reduces fuel operating costs by up to 50%.",
      sourceDocId: "src_c85bf48cde6e9942",
      sourcePage: 2,
      heroImage: null,
      industryCodes: ["IND-STEEL", "IND-FOOD", "IND-CHEM"],
      applicationCodes: ["APP-TURBINE"],
      variants: [
        { sku: "MIURA-GAS-250KW", modelNumber: "MBP-250", variantName: "250 kCal/hr Biomass Gasifier Package", priceMinor: null, stock: null },
      ],
      specs: [
        { name: "Thermal Efficiency", valueText: "> 80% Conversion Efficiency", unit: "%" },
      ],
    },

    // 28. Gattuwala Energy Biomass Pellets
    {
      companySlug: "gattuwala-energy",
      categorySlug: "biomass-pellet-machinery",
      name: "Gattuwala High-Calorific White Coal Biomass Pellets & Briquettes",
      slug: "gattuwala-biomass-pellets-white-coal",
      entityKind: "PRODUCT",
      pricingMode: "FIXED_PRICE",
      shortDescription: "Dense 8mm biomass fuel pellets manufactured from soybean, cotton stalk, and sawdust with GCV > 4,000 kCal/kg for industrial boilers.",
      fullDescription: "Eco-friendly coal alternative compliant with Ministry of Power co-firing mandates. Low moisture (<8%), low ash (<5%), and high bulk density.",
      sourceDocId: "src_708304493baf5742",
      sourcePage: 2,
      heroImage: null,
      industryCodes: ["IND-STEEL", "IND-FOOD", "IND-POWER"],
      applicationCodes: ["APP-PELLETIZING"],
      variants: [
        { sku: "GATTU-PELLET-1TON", modelNumber: "GATTU-8MM", variantName: "8mm Premium Biomass Pellets (1 Ton Jumbo Bag)", priceMinor: BigInt(850000), stock: 500 },
      ],
      specs: [
        { name: "Gross Calorific Value", valueText: "4,000 to 4,400 kCal/kg", valueNumeric: 4200, unit: "kCal/kg" },
      ],
    },

    // 29. YIMBY Decentralized Composting
    {
      companySlug: "yimby-cleantech",
      categorySlug: "organic-waste-converters",
      name: "YIMBY Decentralized Smart Community Composting Station",
      slug: "yimby-decentralized-smart-community-composter",
      entityKind: "PRODUCT",
      pricingMode: "FIXED_PRICE",
      shortDescription: "Modular odorless decentralized composting bins with microbial accelerator for gated communities, IT parks, and corporate campuses.",
      fullDescription: "Aerobic natural composting system requiring zero electricity. Processes 50 kg to 500 kg per day with zero leachate runoff.",
      sourceDocId: "src_41d516ba3a2b79af",
      sourcePage: 2,
      heroImage: null,
      industryCodes: ["IND-COMMERCIAL", "IND-MUNICIPAL"],
      applicationCodes: ["APP-COMPOSTING"],
      variants: [
        { sku: "YIMBY-BOX-50", modelNumber: "Y-50", variantName: "YIMBY Aerobic Composting Box (50 kg/day)", priceMinor: BigInt(3500000), stock: 25 },
      ],
      specs: [
        { name: "Daily Capacity", valueText: "50 kg/day kitchen & garden organic waste", unit: "kg/day" },
      ],
    },

    // 30. NetXeroC Carbon Accounting & Net-Zero Advisory
    {
      companySlug: "netxeroc",
      categorySlug: "decarbonization-esg-advisory",
      name: "NetXeroC Corporate GHG Accounting & Net-Zero Transition Roadmap",
      slug: "netxeroc-corporate-ghg-carbon-accounting",
      entityKind: "SERVICE",
      pricingMode: "PRICE_ON_REQUEST",
      shortDescription: "End-to-end Scope 1, 2, and 3 greenhouse gas auditing, CBAM compliance, and SEBI BRSR reporting for industrial exporters.",
      fullDescription: "Accredited GHG protocol carbon accounting with lifecycle assessment (LCA) tools, enabling manufacturing enterprises to benchmark carbon emissions, identify energy conservation measures, and achieve export CBAM compliance.",
      sourceDocId: "src_838c5252edc876c5",
      sourcePage: 2,
      heroImage: null,
      industryCodes: ["IND-STEEL", "IND-CHEM", "IND-TEXTILE"],
      applicationCodes: ["APP-TURBINE"],
      variants: [
        { sku: "NXC-AUDIT-PLANT", modelNumber: "NXC-GHG", variantName: "Factory Scope 1 & 2 Carbon Footprint Audit", priceMinor: null, stock: null },
      ],
      specs: [
        { name: "Standard", valueText: "ISO 14064 & GHG Protocol Corporate Standard", unit: null },
      ],
    },

    // 31. CED ALEAP Incubation & MSME Scheme Guidance
    {
      companySlug: "ced-aleap",
      categorySlug: "institutional-incubation-schemes",
      name: "CED ALEAP Industrial MSME Incubation & Subsidy Advisory",
      slug: "ced-aleap-msme-incubation-subsidy-advisory",
      entityKind: "SERVICE",
      pricingMode: "PRICE_ON_REQUEST",
      shortDescription: "Institutional advisory assisting manufacturing MSMEs in securing central & state capital investment subsidies and incubation infrastructure.",
      fullDescription: "Comprehensive handholding for CGTMSE collateral-free loans, PMEGP capital subsidies, industrial park land allotments, and women entrepreneur incentive schemes.",
      sourceDocId: "src_bd0f8ff637ea4e3d",
      sourcePage: 1,
      heroImage: null,
      industryCodes: ["IND-COMMERCIAL", "IND-MUNICIPAL"],
      applicationCodes: ["APP-TURBINE"],
      variants: [
        { sku: "CED-INCUBATION-1YR", modelNumber: "CED-INC", variantName: "1-Year Industrial Incubation & Advisory Support", priceMinor: null, stock: null },
      ],
      specs: [
        { name: "Advisory Scope", valueText: "CGTMSE, PMEGP, SATAT, and State Industrial Policy Incentives", unit: null },
      ],
    },
  ];

  let totalProductsCreated = 0;
  let totalVariantsCreated = 0;

  for (const item of productData) {
    const compData = companyMap.get(item.companySlug);
    const catId = categoryMap.get(item.categorySlug);

    if (!compData || !catId) {
      console.warn(`Skipping ${item.slug}: missing company (${item.companySlug}) or category (${item.categorySlug})`);
      continue;
    }

    const docId = documentMap.get(item.sourceDocId);

    const product = await prisma.product.upsert({
      where: { slug: item.slug },
      update: {
        name: item.name,
        shortDescription: item.shortDescription,
        fullDescription: item.fullDescription,
        pricingMode: item.pricingMode as any,
        entityKind: item.entityKind as any,
        isPublished: true,
        verificationStatus: "APPROVED",
        sourceDocumentId: docId,
        sourcePage: item.sourcePage,
      },
      create: {
        name: item.name,
        slug: item.slug,
        shortDescription: item.shortDescription,
        fullDescription: item.fullDescription,
        pricingMode: item.pricingMode as any,
        entityKind: item.entityKind as any,
        isPublished: true,
        verificationStatus: "APPROVED",
        companyId: compData.id,
        brandId: compData.brandId,
        categoryId: catId,
        sourceDocumentId: docId,
        sourcePage: item.sourcePage,
      },
    });
    totalProductsCreated++;

    // Attach Product Images (Primary + Scanned Catalogue Preview)
    await prisma.productImage.deleteMany({ where: { productId: product.id } });

    const primaryImage =
      item.heroImage ||
      `/api/catalogue-preview?docId=${item.sourceDocId}&page=${item.sourcePage || 1}`;

    await prisma.productImage.create({
      data: {
        productId: product.id,
        imageUrl: primaryImage,
        altText: `${product.name} visual preview`,
        isPrimary: true,
        displayOrder: 0,
      },
    });

    if (item.heroImage) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          imageUrl: `/api/catalogue-preview?docId=${item.sourceDocId}&page=${item.sourcePage || 1}`,
          altText: `Official OEM Catalogue Page ${item.sourcePage || 1}`,
          isPrimary: false,
          displayOrder: 1,
        },
      });
    }

    // Attach Variants
    for (const v of item.variants) {
      await prisma.productVariant.upsert({
        where: { sku: v.sku },
        update: {
          variantName: v.variantName,
          modelNumber: v.modelNumber,
          priceMinorUnits: v.priceMinor,
          stockQuantity: v.stock,
          productId: product.id,
        },
        create: {
          productId: product.id,
          sku: v.sku,
          modelNumber: v.modelNumber,
          variantName: v.variantName,
          priceMinorUnits: v.priceMinor,
          stockQuantity: v.stock,
        },
      });
      totalVariantsCreated++;
    }

    // Attach Specifications
    for (const s of item.specs) {
      const specDefId = await getOrCreateSpecDef(item.categorySlug, s.name, s.unit || null);
      if (specDefId) {
        await prisma.productSpecification.create({
          data: {
            productId: product.id,
            specDefinitionId: specDefId,
            valueText: s.valueText,
            valueNumeric: (s as any).valueNumeric ?? null,
            unit: s.unit || null,
            sourceDocumentId: docId,
            sourcePage: item.sourcePage,
            verificationStatus: "APPROVED",
          },
        });
      }
    }

    // Attach Industries
    for (const indCode of item.industryCodes) {
      const indId = industryMap.get(indCode);
      if (indId) {
        await prisma.productIndustry.upsert({
          where: { productId_industryId: { productId: product.id, industryId: indId } },
          update: {},
          create: { productId: product.id, industryId: indId },
        });
      }
    }

    // Attach Applications
    for (const appCode of item.applicationCodes) {
      const appId = applicationMap.get(appCode);
      if (appId) {
        await prisma.productApplication.upsert({
          where: { productId_applicationId: { productId: product.id, applicationId: appId } },
          update: {},
          create: { productId: product.id, applicationId: appId },
        });
      }
    }
  }

  console.log(`Successfully ingested ${totalProductsCreated} products and ${totalVariantsCreated} variants across all 32 companies.`);

  // 8. Ingest MSME Schemes from CED ALEAP source
  console.log("Ingesting government and institutional MSME schemes...");
  const msmeSchemes = [
    {
      schemeName: "Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)",
      slug: "cgtmse-credit-guarantee-scheme",
      departmentMinistry: "Ministry of Micro, Small and Medium Enterprises (MoMSME)",
      description: "Collateral-free credit facility for new and existing micro and small manufacturing units up to ₹5 Crore guarantee coverage with subsidized credit.",
      eligibilityCriteria: "New and existing Micro and Small Enterprises engaged in manufacturing or service activities.",
      benefitsSummary: "Guarantees up to 85% for micro-enterprises and women-owned units, enabling seamless bank loan sanctions without collateral.",
      subsidyPercentage: 85.0,
      officialUrl: "https://www.cgtmse.in",
      lastVerifiedAt: new Date(),
    },
    {
      schemeName: "Prime Minister's Employment Generation Programme (PMEGP)",
      slug: "pmegp-employment-generation-programme",
      departmentMinistry: "Ministry of MSME / KVIC",
      description: "Credit-linked subsidy programme to generate self-employment opportunities through establishment of micro-enterprises in non-farm sectors.",
      eligibilityCriteria: "Individuals aged 18+ with at least 8th standard pass for manufacturing projects over ₹10 Lakh.",
      benefitsSummary: "Capital subsidy of 15% to 35% on project costs up to ₹50 Lakh for manufacturing enterprises.",
      subsidyPercentage: 35.0,
      officialUrl: "https://www.kviconline.gov.in/pmegpeportal",
      lastVerifiedAt: new Date(),
    },
    {
      schemeName: "Sustainable Alternative Towards Affordable Transportation (SATAT - CBG)",
      slug: "satat-bio-cbg-initiative",
      departmentMinistry: "Ministry of Petroleum and Natural Gas (MoPNG)",
      description: "National initiative establishing commercial Bio-CNG plants with guaranteed long-term commercial off-take agreements from Indian Oil, HPCL, and BPCL.",
      eligibilityCriteria: "Entrepreneurs and industrial consortiums establishing agricultural residue / organic waste CBG plants.",
      benefitsSummary: "Fixed pricing off-take indexation, Central Financial Assistance (CFA) capital subsidies up to ₹5 Crore, and priority pipeline connectivity.",
      subsidyPercentage: 20.0,
      officialUrl: "https://satat.co.in",
      lastVerifiedAt: new Date(),
    },
  ];

  for (const scheme of msmeSchemes) {
    await prisma.msmeScheme.upsert({
      where: { slug: scheme.slug },
      update: scheme,
      create: scheme,
    });
  }
  console.log(`Ingested ${msmeSchemes.length} MSME development schemes.`);

  console.log("=== Comprehensive Catalogue Ingestion Complete! ===");
}

// Execute if run directly
if (process.argv[1]?.endsWith("seed_catalogue.ts")) {
  seedCatalogue()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}
