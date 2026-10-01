# YRC Global Source Inventory

Status: Complete Phase 0 Source Inventory and Document Verification.

Every discovered PDF brochure, catalogue, proposal, and image in the YRC repository has been identified, cryptographically hashed, and fully processed through OCR extraction. Extraction outputs are retained in `data/extractions/` with 1-based page coordinates, raw text, and OCR TSVs. All extracted candidate records remain in **NEEDS_REVIEW** status until authorized human review.

## Executive Summary

- **Total Discovered PDF Files**: 36
- **Unique Document Entities**: 35 (1 exact SHA-256 duplicate identified)
- **Total Physical Pages**: 320 pages across all PDF files
- **Unique Pages Extracted**: 316 unique physical pages
- **Total Extracted Characters**: 292,896 text characters
- **Failed / Corrupted Pages**: 0 (100% extraction completion)
- **Non-PDF Source Assets**: 3 JPEG images (`PHOTO-2026-09-23-17-12-32.jpg`, `PHOTO-2026-09-30-10-16-36.jpg`, `PHOTO-2026-09-30-10-16-36 2.jpg`)

### Duplicate Document Detection

| Source File 1 | Source File 2 | SHA-256 Checksum | Handling |
|---|---|---|---|
| `BIO GREEN ENERGY SOLUTIONS 2.pdf` | `BIO GREEN ENERGY SOLUTIONS.pdf` | `8868dc31adf1b860647f127c37f128060d670ed239de0baf58e06fd3530316d3` | Shared extraction artifacts in `src_8868dc31adf1b860`. Both file paths are recorded in provenance. |

### Non-PDF Brand & Planning Assets

| File Name | Resolution | Description & Role in System |
|---|---|---|
| `PHOTO-2026-09-23-17-12-32.jpg` | 1254 × 1254 | **Official Brand Asset**: Navy globe with metallic gold detailing and white/gold lettering: **YRC EXPO MARKETING PRIVATE LIMITED**, tagline **CONNECTING BRANDS, CREATING IMPACT**. Serves as the primary source for visual tokens and brand color palette (`#102A46` navy, `#BB944C` gold, `#0B1D33` ink). |
| `PHOTO-2026-09-30-10-16-36.jpg` | 899 × 1599 | **Handwritten Ecosystem Planning Note**: Outlines key business modules including MSME schemes, channel partner networks, manufacturing units, franchises, and doorstep services. |
| `PHOTO-2026-09-30-10-16-36 2.jpg` | 899 × 1599 | **Handwritten Strategic Scope Note**: Outlines eco-friendly products marketplace, best deals engine, business directory, advertising placements, and sector current affairs hub. |

---

## Comprehensive Document Inventory

### 1. AIRSHUDDI ENGINEERS.pdf

- **Source Document ID**: `src_48feff1722e03816`
- **SHA-256 Checksum**: `48feff1722e03816c9bea478080a6642a0927f498c388a8c964eeaab1e41c9a5`
- **Detected Company / Legal Entity**: Airshuddhi Engineers Pvt. Ltd.
- **Brands Identified**: AIRSHUDDHI, PURITY OF THOUGHTS
- **Contact / Location Details**: info@airshuddhi.com; Pune, Maharashtra, India
- **Document Classification**: Engineering Capability & Turnkey Product Catalogue
- **Physical Page Count**: 16 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 6567 characters across 16 processed pages
- **Categories Represented**: Biogas Purification & Upgradation, Renewable Energy, Gas Compression & Bottling, Gas Flare Systems
- **Core Products / Solutions / Services Discovered**:
  - Biogas Purification & Bottling Plant (Turnkey EPC)
  - H2S Biological & Chemical Scrubbers
  - Membrane Biogas Upgrading System (Bio-CBG)
  - PSA Separation Systems
  - High-Pressure Biogas Compressors (200-250 bar)
  - Open & Enclosed Gas Flares
- **Technical Tables, Curves & Diagrams**: Flow rate capacity matrices (50 to 5000 Nm3/hr), methane purity specs (>96%), pressure charts, P&ID process diagrams, piping layouts.
- **Traceability Directory**: [`data/extractions/src_48feff1722e03816`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_48feff1722e03816)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Engineering specs must be reviewed against page 4-12 P&IDs. Ensure methane recovery rates (>98%) and power consumption are validated.

### 2. ALPHA BLOWERS.pdf

- **Source Document ID**: `src_144681700dd4d80e`
- **SHA-256 Checksum**: `144681700dd4d80e7afeb4c32c36c6d10910ecaefdd6fea093dffc851cb03138`
- **Detected Company / Legal Entity**: Somaiya Techno Products / Alpha Blowers (Est. 1989, ISO 9001:2015)
- **Brands Identified**: ALPHA BLOWERS
- **Contact / Location Details**: absales@alphablowers.com, www.alphablowers.com; Ahmedabad, Gujarat, India
- **Document Classification**: Technical Product Catalogue & Engineering Datasheet
- **Physical Page Count**: 4 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 6256 characters across 4 processed pages
- **Categories Represented**: Industrial Blowers, Positive Displacement Blowers, Aeration Equipment, Pneumatic Conveying
- **Core Products / Solutions / Services Discovered**:
  - Twin Lobe Roots Blowers
  - Tri Lobe Roots Blowers
  - Direct Coupled Blowers
  - V-Belt Driven Blowers
  - Acoustic Enclosures / Hoods
- **Technical Tables, Curves & Diagrams**: Direct coupling range performance table (Page 3) with model sizes AB-20 through AB-250, motor kW, RPM, flow rate (m3/hr) and differential pressure (mm WG / kg/cm2).
- **Traceability Directory**: [`data/extractions/src_144681700dd4d80e`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_144681700dd4d80e)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Maintain exact row/column geometry of Page 3 performance table. Flow rates are at standard intake conditions.

### 3. AMBETRONICS.pdf

- **Source Document ID**: `src_1d427d20811d189c`
- **SHA-256 Checksum**: `1d427d20811d189ce5452eac3d0be4d9ab0eb192986ef17558e956c43b59f4df`
- **Detected Company / Legal Entity**: Ambetronics Engineers Pvt. Ltd.
- **Brands Identified**: AMBETRONICS ANALYZERS
- **Contact / Location Details**: sales11@ambetronics.com, www.ambetronics.com; Mumbai, Maharashtra, India
- **Document Classification**: Industrial Instrumentation Catalogue & Datasheet
- **Physical Page Count**: 4 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 8431 characters across 4 processed pages
- **Categories Represented**: Gas Detection & Monitoring, Process Instrumentation, Biogas Analyzers, Environmental Monitoring
- **Core Products / Solutions / Services Discovered**:
  - Multi-Stream Biogas Analyzer (BIO-600-S-PANEL, up to 3 streams)
  - Flameproof Biogas Analyzer (BIO-400-S-FLP, CIMFR / PESO)
  - Portable Biogas Analyzer (P-BIO-100)
  - Online Dew Point Meters
  - Calibration & AMC Services
- **Technical Tables, Curves & Diagrams**: Gas measurement range tables (CH4: 0-100%, CO2: 0-100%, O2: 0-25%, H2S: 0-10,000 ppm), sensor tech (NDIR, Electrochemical), accuracy (+/-1%), ingress IP65/IP66.
- **Traceability Directory**: [`data/extractions/src_1d427d20811d189c`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_1d427d20811d189c)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: PESO / CIMFR flameproof certification claims require verification against certificate numbers.

### 4. ANAND SCIENTIFIC COMPANY.pdf

- **Source Document ID**: `src_f27ffa7ded2350b5`
- **SHA-256 Checksum**: `f27ffa7ded2350b5488c100dc32f587cc407210d82af52daa311537671837945`
- **Detected Company / Legal Entity**: Anand Scientific Company
- **Brands Identified**: ANAND SCIENTIFIC
- **Contact / Location Details**: anandscientific123@gmail.com; Chennai, Tamil Nadu, India
- **Document Classification**: Laboratory Equipment & Scientific Instruments Catalogue
- **Physical Page Count**: 15 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 7432 characters across 15 processed pages
- **Categories Represented**: Laboratory Instruments, Water Quality Testing, Thermal Equipment, Sterilization Equipment
- **Core Products / Solutions / Services Discovered**:
  - Laboratory pH / Conductivity / TDS Meters
  - BOD Incubators
  - Hot Air Ovens
  - Muffle Furnaces (up to 1200C)
  - Vertical Autoclaves
  - Water Distillation Stills
  - Flocculators / Jar Test Apparatus
- **Technical Tables, Curves & Diagrams**: Dimensional charts, temperature range tables (ambient to 250C / 1200C), chamber volumes in liters (45L to 300L), wattage ratings.
- **Traceability Directory**: [`data/extractions/src_f27ffa7ded2350b5`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_f27ffa7ded2350b5)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Verify model numbers, chamber capacities and wattage across all 15 pages.

### 5. AUROZONE ENVIRO SOLUTIONS.pdf

- **Source Document ID**: `src_17a3ae73923e51d0`
- **SHA-256 Checksum**: `17a3ae73923e51d0070d54f32691abb9c096b7fbeb19d9322bf648fab19637f0`
- **Detected Company / Legal Entity**: Aurozone Enviro Solutions
- **Brands Identified**: AUROZONE, MEGAZONE
- **Contact / Location Details**: aurozone@gmail.com, www.aurozone.in; Chennai, Tamil Nadu, India
- **Document Classification**: Product Brochure & Engineering Specifications
- **Physical Page Count**: 4 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 1871 characters across 4 processed pages
- **Categories Represented**: Ozone Generation, Water & Air Purification, Disinfection Systems, Advanced Oxidation
- **Core Products / Solutions / Services Discovered**:
  - Megazone Series Ozone Generators
  - Corona Discharge Ozone Systems (5 to 500 g/hr)
  - Oxygen Concentrators
  - Venturi Injector Systems
  - Ozone Destructors
- **Technical Tables, Curves & Diagrams**: Ozone output vs oxygen flow rate curves, feed gas requirements, cooling water flow rates, power consumption per gram O3.
- **Traceability Directory**: [`data/extractions/src_17a3ae73923e51d0`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_17a3ae73923e51d0)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Confirm ozone production ratings at specified oxygen purity (90-93% O2).

### 6. BIO GREEN ENERGY SOLUTIONS 2.pdf

- **Source Document ID**: `src_8868dc31adf1b860`
- **SHA-256 Checksum**: `8868dc31adf1b860647f127c37f128060d670ed239de0baf58e06fd3530316d3`
- **Detected Company / Legal Entity**: Bio Green Energy Solutions
- **Brands Identified**: BIO GREEN ENERGY
- **Contact / Location Details**: info@biogreenenergysolutions.com, www.biogreenenergysolutions.com; Hyderabad, Telangana, India
- **Document Classification**: Turnkey EPC Project Proposal & Technical Scope
- **Physical Page Count**: 4 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 4149 characters across 4 processed pages
- **Categories Represented**: Bio-CBG Turnkey Plants, Anaerobic Digestion, Biomass Valorization, Organic Fertilizers
- **Core Products / Solutions / Services Discovered**:
  - Compressed Bio-Gas (CBG) Plants EPC
  - CSTR Anaerobic Digesters
  - Biogas Cleaning & Upgrading Systems
  - Fermented Organic Manure (FOM) Plants
  - Liquid FOM Processing
- **Technical Tables, Curves & Diagrams**: Mass balance diagrams, feedstock-to-gas conversion ratios, scope of work boundary matrix (battery limits).
- **Traceability Directory**: [`data/extractions/src_8868dc31adf1b860`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_8868dc31adf1b860)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Commercial terms and supply boundaries are proposal-specific and must remain unverified until project agreement.

### 7. BIO GREEN ENERGY SOLUTIONS.pdf

- **Source Document ID**: `src_8868dc31adf1b860`
- **SHA-256 Checksum**: `8868dc31adf1b860647f127c37f128060d670ed239de0baf58e06fd3530316d3`
- **Duplicate Note**: Byte-for-byte duplicate of `BIO GREEN ENERGY SOLUTIONS 2.pdf`. Extraction shared at `data/extractions/src_8868dc31adf1b860`.
- **Detected Company / Legal Entity**: Bio Green Energy Solutions
- **Brands Identified**: BIO GREEN ENERGY
- **Contact / Location Details**: info@biogreenenergysolutions.com, www.biogreenenergysolutions.com; Hyderabad, Telangana, India
- **Document Classification**: Turnkey EPC Project Proposal (Duplicate File)
- **Physical Page Count**: 4 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 4149 characters across 4 processed pages
- **Categories Represented**: Bio-CBG Turnkey Plants, Anaerobic Digestion, Biomass Valorization, Organic Fertilizers
- **Core Products / Solutions / Services Discovered**:
  - Compressed Bio-Gas (CBG) Plants EPC (Identical to BIO GREEN ENERGY SOLUTIONS 2.pdf)
- **Technical Tables, Curves & Diagrams**: Identical to BIO GREEN ENERGY SOLUTIONS 2.pdf.
- **Traceability Directory**: [`data/extractions/src_8868dc31adf1b860`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_8868dc31adf1b860)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Byte-for-byte duplicate of BIO GREEN ENERGY SOLUTIONS 2.pdf. Deduplicated in ingestion pipeline.

### 8. BIOTECH AMALGAM.pdf

- **Source Document ID**: `src_923800a86d29dc47`
- **SHA-256 Checksum**: `923800a86d29dc473a24a9080f729de3c27bfd5da62ca60900f6a7ea80f19d2c`
- **Detected Company / Legal Entity**: Amalgam Biotech
- **Brands Identified**: AMALGAM BIOTECH, BIOTECH AMALGAM
- **Contact / Location Details**: sales@amalgambiotech.com, www.amalgambiotech.com; Pune, Maharashtra, India
- **Document Classification**: Solutions Brochure & Technical Capability Profile
- **Physical Page Count**: 16 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 20368 characters across 16 processed pages
- **Categories Represented**: Wastewater Treatment Solutions, Bioremediation & Bacterial Cultures, Electro-Coagulation, ZLD Systems
- **Core Products / Solutions / Services Discovered**:
  - Specialized Bio-Cultures for STP/ETP
  - Electro-Coagulation (EC) Systems
  - MBBR & MBR Systems
  - Dissolved Air Flotation (DAF)
  - Zero Liquid Discharge (ZLD) Systems
  - Sludge Dewatering Filter Presses
- **Technical Tables, Curves & Diagrams**: Inlet vs outlet wastewater parameter comparison tables (BOD, COD, TSS reduction % by industry), process flow schematics.
- **Traceability Directory**: [`data/extractions/src_923800a86d29dc47`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_923800a86d29dc47)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Performance reduction percentages are indicative supplier claims; require site-specific validation.

### 9. CED.pdf

- **Source Document ID**: `src_bd0f8ff637ea4e3d`
- **SHA-256 Checksum**: `bd0f8ff637ea4e3d0ed351151ecf0800866cf84127b1d4fb5512606e73841c87`
- **Detected Company / Legal Entity**: Centre for Entrepreneurship Development (CED) - ALEAP
- **Brands Identified**: CED ALEAP
- **Contact / Location Details**: ced.aleap@gmail.com; Hyderabad, Telangana, India
- **Document Classification**: Institutional & MSME Development Profile
- **Physical Page Count**: 4 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 3618 characters across 4 processed pages
- **Categories Represented**: MSME Schemes & Services, Incubation & Mentorship, Cluster Development, Skill Training
- **Core Products / Solutions / Services Discovered**:
  - Entrepreneurship Development Programs (EDP)
  - MSME Incubation Services
  - Common Facility Center (CFC) Access
  - Government Scheme Facilitation
  - Women Entrepreneurship Initiatives
- **Technical Tables, Curves & Diagrams**: Course curriculum outlines, facility equipment lists, cluster infrastructure highlights.
- **Traceability Directory**: [`data/extractions/src_bd0f8ff637ea4e3d`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_bd0f8ff637ea4e3d)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Government scheme guidelines and subsidy references must be cross-checked against official portals.

### 10. EAGLE.pdf

- **Source Document ID**: `src_9ec37ddf62522cfb`
- **SHA-256 Checksum**: `9ec37ddf62522cfbab2c9d91868756cb5d84b2a38f5bd1ce58a4d73fa6de09fd`
- **Detected Company / Legal Entity**: E.G. Kantawalla Private Limited
- **Brands Identified**: EAGLE, EAGLE SCALES
- **Contact / Location Details**: sales@egkantawalla.com, www.egkantawalla.com, www.eaglescales.in; Pune & Mumbai, Maharashtra, India
- **Document Classification**: Heavy Duty Weighing Solutions Catalogue
- **Physical Page Count**: 6 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 15713 characters across 6 processed pages
- **Categories Represented**: Industrial Weighing Systems, Weighbridges, Platform Scales, Crane Scales
- **Core Products / Solutions / Services Discovered**:
  - Pit & Pitless Electronic Weighbridges (up to 150 Ton)
  - Heavy Duty Platform Scales (50 kg to 5 Ton)
  - Wireless Crane Scales (1 to 30 Ton)
  - Flameproof Weighing Indicators
  - Precision Industrial Balances
- **Technical Tables, Curves & Diagrams**: Platform size vs capacity matrix, load cell specifications, IP rating charts, digital indicator display parameters.
- **Traceability Directory**: [`data/extractions/src_9ec37ddf62522cfb`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_9ec37ddf62522cfb)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Legal metrology verification and weights & measures model approval numbers must be recorded.

### 11. GARUDA PUMPS PVT LTD.pdf

- **Source Document ID**: `src_f3fd95fe5bd4720e`
- **SHA-256 Checksum**: `f3fd95fe5bd4720e119f0c45088fbd84a90658871815a8c0d30372e943c528cb`
- **Detected Company / Legal Entity**: Garuda Pumps Private Limited (Star Export House)
- **Brands Identified**: GARUDA PUMPS
- **Contact / Location Details**: north@garudapumps.com; Coimbatore, Tamil Nadu, India
- **Document Classification**: Pumping Machinery Catalogue & Datasheet
- **Physical Page Count**: 4 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 2504 characters across 4 processed pages
- **Categories Represented**: Industrial Pumps, Liquid Ring Vacuum Pumps, Submersible Sewage Pumps, Centrifugal Process Pumps
- **Core Products / Solutions / Services Discovered**:
  - 2GE 1/3 & 4 Series Liquid Ring Vacuum Pumps
  - Chemical End Suction Centrifugal Pumps
  - Non-Clog Submersible Pumps
  - Dewatering Slurry Pumps
- **Technical Tables, Curves & Diagrams**: Pump displacement curves (m3/hr vs vacuum in mm Hg), motor ratings (HP/kW), flange dimensions, MOC options (CI/SS304/SS316).
- **Traceability Directory**: [`data/extractions/src_f3fd95fe5bd4720e`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_f3fd95fe5bd4720e)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Ensure vacuum pump operating liquid flow rates and temperature limits are preserved.

### 12. GATTWALA ENGERY SOLUTIONS PVT LTD.pdf

- **Source Document ID**: `src_708304493baf5742`
- **SHA-256 Checksum**: `708304493baf57422f6243f8193fa9e0ff4feb122395cb8df6b24e96abe2fe4f`
- **Detected Company / Legal Entity**: Gattuwala Energy Solutions Private Limited
- **Brands Identified**: GATTUWALA ENERGY SOLUTIONS
- **Contact / Location Details**: akola@gattuwala.com, www.gattuwala.com; Akola, Maharashtra, India
- **Document Classification**: Renewable Energy & Biomass Machinery Catalogue
- **Physical Page Count**: 16 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 9582 characters across 16 processed pages
- **Categories Represented**: Biomass Pellets & Briquettes, Pellet Machinery, Solar Power EPC, Solar Water Pumping
- **Core Products / Solutions / Services Discovered**:
  - High-Calorific Biomass Pellets
  - Agricultural Residue Briquettes
  - Biomass Pellet Mills
  - Rooftop Solar & Ground Mount EPC
  - Solar Agricultural Pumping Systems
- **Technical Tables, Curves & Diagrams**: Biomass proximate analysis tables (Moisture %, Ash %, Volatile Matter %, GCV in kcal/kg), solar array sizing charts.
- **Traceability Directory**: [`data/extractions/src_708304493baf5742`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_708304493baf5742)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Biomass GCV and ash content values depend on raw material source; flag as typical specification.

### 13. GREENERIA.pdf

- **Source Document ID**: `src_0a146e599513ad12`
- **SHA-256 Checksum**: `0a146e599513ad12ef44508d40fb35d977fefe841ddb709f757f33d9ce1c38f7`
- **Detected Company / Legal Entity**: Greeneria / A-1 Enviro Sciences
- **Brands Identified**: GREENERIA
- **Contact / Location Details**: sales@greeneria.in, www.greeneria.in; India
- **Document Classification**: Organic Waste Management Product Catalogue
- **Physical Page Count**: 8 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 11638 characters across 8 processed pages
- **Categories Represented**: Organic Waste Converters, Waste Management, Composting Machines, Bio-Digesters
- **Core Products / Solutions / Services Discovered**:
  - Automatic Organic Waste Converters (OWC: 25 to 2000 kg/day)
  - Commercial Food Waste Bio-Digesters
  - Compost Accelerators & Bacterial Strains
  - Waste Shredders & Curing Systems
- **Technical Tables, Curves & Diagrams**: Model capacity tables (kg/batch and kg/day), heater ratings, processing cycle time, dimensional specs.
- **Traceability Directory**: [`data/extractions/src_0a146e599513ad12`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_0a146e599513ad12)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Decomposition time claims (24 hours) require validation of moisture, organic fraction, and curing needs.

### 14. GSE FILTER PVT LTD.pdf

- **Source Document ID**: `src_370fbfb03e012492`
- **SHA-256 Checksum**: `370fbfb03e0124927d0a01ec5493464331d5aba2f60c1905fe61047b1fdc58b4`
- **Detected Company / Legal Entity**: GSE Filter Pvt. Ltd.
- **Brands Identified**: GSE FILTER, N-ZO
- **Contact / Location Details**: chennai@gsefilter.com, www.gsefilter.com; Chennai, Hyderabad, Bangalore, India
- **Document Classification**: Water Filtration Components & Media Catalogue
- **Physical Page Count**: 12 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 8811 characters across 12 processed pages
- **Categories Represented**: Filter Cartridges & Bags, Ion Exchange Resins, FRP Pressure Vessels, Water Treatment Components
- **Core Products / Solutions / Services Discovered**:
  - Wound Polypropylene Cartridge Filters (0.5 to 100 micron)
  - Spun Meltblown PP Filters
  - Pleated PP Micron Filters
  - Filter Bags (Size 1 & Size 2)
  - Cation & Anion Ion Exchange Resins
  - FRP Composite Vessels
  - RO Membranes & Lubi Pumps
- **Technical Tables, Curves & Diagrams**: Micron rating tables, cartridge length options (10"-40"), vessel dimension charts, resin exchange capacity (eq/L).
- **Traceability Directory**: [`data/extractions/src_370fbfb03e012492`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_370fbfb03e012492)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Distributor relationships with Lubi and RO membrane OEMs should be documented as claimed.

### 15. INDOBIO FILTERING FOR TOMORROW.pdf

- **Source Document ID**: `src_6dfc1393e0ac614e`
- **SHA-256 Checksum**: `6dfc1393e0ac614e0ab1219ed8c6d4c5bb3a1c5fed49144d30550d991e64e59b`
- **Detected Company / Legal Entity**: Indonet Plastic Industries / Indobio
- **Brands Identified**: INDOBIO, FILTERING FOR TOMORROW
- **Contact / Location Details**: info@indobio.in; Gujarat, India
- **Document Classification**: Biological Filter Media Technical Brochure
- **Physical Page Count**: 4 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 5432 characters across 4 processed pages
- **Categories Represented**: Biological Filter Media, Wastewater Treatment Components, Plastic Media, Trickling Filters
- **Core Products / Solutions / Services Discovered**:
  - INDOBIO Filter Media Pipe Blok
  - Structured Tube Media Blocks
  - MBBR Bio Carriers
  - Tube Settler Modules
- **Technical Tables, Curves & Diagrams**: Void ratio tables (>95%), specific surface area (m2/m3), compressive strength, HDPE material specs.
- **Traceability Directory**: [`data/extractions/src_6dfc1393e0ac614e`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_6dfc1393e0ac614e)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Compare specs with INDONET.pdf to confirm model line overlap.

### 16. INDONET.pdf

- **Source Document ID**: `src_0d54644ad2e352f9`
- **SHA-256 Checksum**: `0d54644ad2e352f9379d623e9a9369ccf651e7708cb2bde824242035fc7b3950`
- **Detected Company / Legal Entity**: Indonet Plastic Industries / Indobio
- **Brands Identified**: INDONET, INDOBIO
- **Contact / Location Details**: info@indobio.in; Gujarat, India
- **Document Classification**: Plastic Extrusion & Filter Media Catalogue
- **Physical Page Count**: 4 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 7125 characters across 4 processed pages
- **Categories Represented**: Plastic Filter Media, Extruded Polymer Meshes, MBBR Media, Tube Settlers
- **Core Products / Solutions / Services Discovered**:
  - Indobio Pipe Blok Filter Media
  - Extruded Polymer Netting
  - Tube Settler Chevron Packs
  - Biological Growth Carriers
- **Technical Tables, Curves & Diagrams**: Comparison tables: Indobio Pipe Block vs Traditional Stone / Plastic packing media, surface area charts.
- **Traceability Directory**: [`data/extractions/src_0d54644ad2e352f9`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_0d54644ad2e352f9)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Verify material data sheet: UV stabilization, chemical resistance and lifespan claims.

### 17. JAINUM FWPL.pdf

- **Source Document ID**: `src_b8f191dc7a0a40d6`
- **SHA-256 Checksum**: `b8f191dc7a0a40d6b45b346a06ea4437749f376d4703b1afb402d3db239ab616`
- **Detected Company / Legal Entity**: Jainum FW Projects Limited (formerly Jainum Food and Waste Projects Pvt. Ltd.)
- **Brands Identified**: JAINUM PROJECTS
- **Contact / Location Details**: projects@jainumprojects.com, www.jainumprojects.com; Ahmedabad, Gujarat, India
- **Document Classification**: Municipal Solid Waste Machinery Catalogue
- **Physical Page Count**: 8 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 6941 characters across 8 processed pages
- **Categories Represented**: Solid Waste Machinery, Trommel Screens, Conveying Equipment, Food Roasting & Drying
- **Core Products / Solutions / Services Discovered**:
  - Rotary Trommel Screens (Bio-mining & MSW separation)
  - Belt Conveyors & Inclined Feeders
  - Bag Loaders & Material Handling
  - Industrial Food Roasters & Continuous Dryers
- **Technical Tables, Curves & Diagrams**: Trommel drum diameters (1500mm to 2500mm), length specifications, mesh aperture options, throughput tons/hour.
- **Traceability Directory**: [`data/extractions/src_b8f191dc7a0a40d6`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_b8f191dc7a0a40d6)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Throughput capacity depends heavily on moisture content and waste density.

### 18. JK ENGINEERING AND TECHNOLOGY.pdf

- **Source Document ID**: `src_32bdd39b07440c8d`
- **SHA-256 Checksum**: `32bdd39b07440c8de809328afa61a2850cae7ececa30936e152276f8642047b9`
- **Detected Company / Legal Entity**: JK Engineering & Technology
- **Brands Identified**: ECOTREAT, POWER FLUSH
- **Contact / Location Details**: sales@jket.in, www.jket.in; Chennai, Tamil Nadu, India
- **Document Classification**: Chemical & Descaling Equipment Brochure
- **Physical Page Count**: 10 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 1444 characters across 10 processed pages
- **Categories Represented**: Descaling Equipment, Water Treatment Chemicals, Boiler Conditioning, Cooling Tower Maintenance
- **Core Products / Solutions / Services Discovered**:
  - Power Flush Descaling Pumps & Skids
  - ECOTREAT Biodegradable Descaling Chemicals
  - Scale & Rust Removers
  - Silica Dissolving Formulations
- **Technical Tables, Curves & Diagrams**: Chemical dosage tables, corrosion rate inhibition test data, descaling pump circulation rates.
- **Traceability Directory**: [`data/extractions/src_32bdd39b07440c8d`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_32bdd39b07440c8d)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Chemical safety data (MSDS) and environmental biodegradability certificates required.

### 19. LOVIBOND WATER TESTING.pdf

- **Source Document ID**: `src_a369a306e7f45911`
- **SHA-256 Checksum**: `a369a306e7f4591114fd944647674667f0d2e2930459857574a7fbbf35f2979e`
- **Detected Company / Legal Entity**: Tintometer India Pvt. Ltd. / Lovibond Water Testing
- **Brands Identified**: LOVIBOND, TINTOMETER
- **Contact / Location Details**: indiaoffice@lovibond.in, www.lovibond.in; Hyderabad, Telangana, India
- **Document Classification**: Comprehensive Water Testing Instruments Mini-Catalogue
- **Physical Page Count**: 26 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 24435 characters across 26 processed pages
- **Categories Represented**: Water Testing Instruments, Spectrophotometry, Colorimetry & Photometry, Turbidity Meters, Analytical Reagents
- **Core Products / Solutions / Services Discovered**:
  - SpectroDirect & XD Spectrophotometers
  - MD 100 & MD 200 Photometers
  - TurbiDirect & TB 350 Turbidimeters
  - RD 125 Thermoreactors & COD Vials
  - BD 600 Respirometric BOD Systems
  - SD Pocket Testers (pH, Cond, TDS)
  - Analytical Chemical Reagent Tablets
- **Technical Tables, Curves & Diagrams**: Comprehensive parameter matrices (26 pages) with measurement range, wavelength (nm), reagent system, method number, detection limits.
- **Traceability Directory**: [`data/extractions/src_a369a306e7f45911`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_a369a306e7f45911)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Unusually dense technical tables across 26 pages. Maintain wavelength, range, and reagent method cross-references.

### 20. MICROZA ASAHI.pdf

- **Source Document ID**: `src_fd7d4f8f10f500e6`
- **SHA-256 Checksum**: `fd7d4f8f10f500e6ca2a588a3770c0f2f21942fa0af0ae2ebbc389feb091fdb3`
- **Detected Company / Legal Entity**: Asahi Kasei Corporation
- **Brands Identified**: MICROZA, ASAHI KASEI
- **Contact / Location Details**: membrane@om.asahi-kasei.co.jp, www.microza.com; Tokyo, Japan / Asahi Kasei India
- **Document Classification**: Ultrafiltration & Microfiltration Membrane Technical Catalogue
- **Physical Page Count**: 18 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 30792 characters across 18 processed pages
- **Categories Represented**: Membrane Filtration, Hollow Fiber Membranes, Municipal Water Treatment, Industrial Water Reuse
- **Core Products / Solutions / Services Discovered**:
  - Microza MF Microfiltration Modules (0.1 micron PVDF)
  - Microza UF Ultrafiltration Modules (TIPS PVDF hollow fiber)
  - Pressurized & Submerged Membrane Filtration Systems
  - Pre-treatment for Sea Water RO (SWRO)
- **Technical Tables, Curves & Diagrams**: Detailed membrane specifications (surface area in m2, module length/diameter, fiber OD/ID, burst pressure, chlorine tolerance up to 5000 ppm).
- **Traceability Directory**: [`data/extractions/src_fd7d4f8f10f500e6`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_fd7d4f8f10f500e6)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Preserve Japanese/international engineering standards and TIPS PVDF membrane integrity metrics.

### 21. MIRCROZA FM MODULES AND SYSTEMS.pdf

- **Source Document ID**: `src_e3c41d7273aabed1`
- **SHA-256 Checksum**: `e3c41d7273aabed191059e4326bf953b1202e834784088bda2bd915b923a6118`
- **Detected Company / Legal Entity**: Asahi Kasei Corporation
- **Brands Identified**: MICROZA MF
- **Contact / Location Details**: membrane@om.asahi-kasei.co.jp, www.microza.com; Tokyo, Japan / Asahi Kasei India
- **Document Classification**: Microfiltration Modules & Systems Engineering Datasheet
- **Physical Page Count**: 8 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 5866 characters across 8 processed pages
- **Categories Represented**: Microfiltration Modules, Membrane Systems, Process Water Treatment, Tertiary Wastewater
- **Core Products / Solutions / Services Discovered**:
  - Microza MF Modules Series (UNA-620A, UNAV-620A, OLT-6036A)
  - Standardized Membrane Skid Systems
  - Air Scrubbing & Chemical Cleaning Systems
- **Technical Tables, Curves & Diagrams**: Module dimensions, filtration flux rates (LMH), housing materials, maximum operating pressure, chemical resistance guidelines.
- **Traceability Directory**: [`data/extractions/src_e3c41d7273aabed1`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_e3c41d7273aabed1)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Module model numbers and filtration flux curves must be checked against water temperature correction factors.

### 22. MIURA BIO POWER.pdf

- **Source Document ID**: `src_c85bf48cde6e9942`
- **SHA-256 Checksum**: `c85bf48cde6e9942c260910411a70329b7743c9746eeaf05dc479ecd958d27f1`
- **Detected Company / Legal Entity**: Miura Bio Power Pvt. Ltd.
- **Brands Identified**: MIURA BIO POWER
- **Contact / Location Details**: enquiries@miurabiopower.com, www.miurabiopower.com; Hyderabad, Telangana, India
- **Document Classification**: Waste-to-Energy & Biomass Gasification Profile
- **Physical Page Count**: 4 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 1756 characters across 4 processed pages
- **Categories Represented**: Waste-to-Energy, Biomass Gasification, Industrial Boilers, Decentralized Energy
- **Core Products / Solutions / Services Discovered**:
  - Biomass Gasification Systems (100 to 1000 kWe)
  - Biomass-Fired Steam Boilers
  - Waste Heat Recovery Units
  - Thermal Energy Gasifier Skids
- **Technical Tables, Curves & Diagrams**: Gasifier thermal efficiency charts, producer gas composition tables (CO, H2, CH4, N2), fuel consumption rates.
- **Traceability Directory**: [`data/extractions/src_c85bf48cde6e9942`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_c85bf48cde6e9942)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Confirm syngas calorific values and tar cleaning technology.

### 23. NETXEROC.pdf

- **Source Document ID**: `src_838c5252edc876c5`
- **SHA-256 Checksum**: `838c5252edc876c5c60a4b45985b6ef0352b15fa1216bc1229c9f5ef0d9d27b5`
- **Detected Company / Legal Entity**: NetXeroC Private Limited
- **Brands Identified**: NETXEROC
- **Contact / Location Details**: www.netxeroc.com; Hyderabad, Telangana, India
- **Document Classification**: Cleantech & Sustainability Consulting Brochure
- **Physical Page Count**: 4 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 3291 characters across 4 processed pages
- **Categories Represented**: Carbon Accounting, Decarbonization Consulting, ESG Reporting, Sustainability Advisory
- **Core Products / Solutions / Services Discovered**:
  - Corporate Carbon Footprint (Scope 1, 2, 3 GHG Audits)
  - Net-Zero Transition Roadmaps
  - BRSR & ESG Regulatory Reporting
  - Carbon Offset Advisory
  - Energy Audits
- **Technical Tables, Curves & Diagrams**: Decarbonization step-ladder methodologies, ESG framework alignment matrices (GRI, TCFD, CDP).
- **Traceability Directory**: [`data/extractions/src_838c5252edc876c5`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_838c5252edc876c5)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Consulting services are non-tangible; inquiry flow must map to Solution / Service Enquiry.

### 24. NIRMAN ECO PLASTICS  SOLUTIONS PRIVATE LTD.pdf

- **Source Document ID**: `src_b5762cca4fc4896a`
- **SHA-256 Checksum**: `b5762cca4fc4896a1890c1259bd392beba5a7ca97fe6c080af529236c8150406`
- **Detected Company / Legal Entity**: Nirman Eco-Plastic Solutions Pvt. Ltd.
- **Brands Identified**: NIRMAN ECO-PLASTIC
- **Contact / Location Details**: rishii@nirmaneco.in; Hyderabad, Telangana, India
- **Document Classification**: Recycled Plastic Infrastructure Catalogue
- **Physical Page Count**: 4 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 607 characters across 4 processed pages
- **Categories Represented**: Recycled Plastic Infrastructure, Eco-Friendly Products, Plastic Timber, Sustainable Furniture
- **Core Products / Solutions / Services Discovered**:
  - Recycled Plastic Lumber / Planks
  - Industrial Heavy Duty Plastic Pallets
  - Eco Benches & Tree Guards
  - Recycled Plastic Fencing & Walkways
  - Pre-Fab Modular Restrooms
- **Technical Tables, Curves & Diagrams**: Plank cross-section dimensions, load bearing capacities (static & dynamic tons), weather resistance parameters.
- **Traceability Directory**: [`data/extractions/src_b5762cca4fc4896a`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_b5762cca4fc4896a)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: 100-year durability claim is a manufacturer marketing claim; cite as manufacturer claim.

### 25. ORGANICA BIOTECH.pdf

- **Source Document ID**: `src_c17647a02bad15af`
- **SHA-256 Checksum**: `c17647a02bad15af272506ad0a21eeff0b3b1932f97be8dfe2f32e9eaaa53877`
- **Detected Company / Legal Entity**: Organica Biotech Pvt. Ltd. (ISO 9001, ISO 14001)
- **Brands Identified**: BIOCLEAN, ORGANICA BIOTECH
- **Contact / Location Details**: wwdomestic@organicabiotech.com, www.organicabiotech.com; Mumbai, Maharashtra, India
- **Document Classification**: Biotechnology & Microbial Solutions Catalogue
- **Physical Page Count**: 16 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 10481 characters across 16 processed pages
- **Categories Represented**: Biotechnology, Microbial Inoculums, Biological Wastewater Treatment, Bioremediation
- **Core Products / Solutions / Services Discovered**:
  - Bioclean STP (Biological sewage digestor)
  - Bioclean ETP (Industrial effluent bio-culture)
  - Bioclean FOG (Oil & grease digester)
  - Cleanseptic (Septic tank inoculant)
  - Bio-toilet bacterial microbial solutions
- **Technical Tables, Curves & Diagrams**: Dosage schedules per m3/day influent, microbial colony forming units (CFU/g), enzyme profile breakdown, temperature and pH operating ranges.
- **Traceability Directory**: [`data/extractions/src_c17647a02bad15af`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_c17647a02bad15af)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Storage conditions (cool/dry) and shelf life parameters must be preserved.

### 26. PLANET WALVES.pdf

- **Source Document ID**: `src_eafb3004ccf80087`
- **SHA-256 Checksum**: `eafb3004ccf80087bd79c4111f20347dd4aa7cc23b8843e8b59eec38e0304049`
- **Detected Company / Legal Entity**: Planet Valves
- **Brands Identified**: PLANET VALVES
- **Contact / Location Details**: sales@planetvalves.com, www.planetvalves.com; Ahmedabad, Gujarat, India
- **Document Classification**: Industrial Flow Control & Valve Catalogue
- **Physical Page Count**: 8 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 8745 characters across 8 processed pages
- **Categories Represented**: Industrial Valves, Ball Valves, Butterfly Valves, Gate & Globe Valves, Check Valves
- **Core Products / Solutions / Services Discovered**:
  - Floating & Trunnion Mounted Ball Valves
  - Wafer & Lug Type Butterfly Valves
  - Cast Steel & Stainless Steel Gate Valves
  - Globe Valves
  - Dual Plate & Wafer Check Valves
- **Technical Tables, Curves & Diagrams**: Pressure-temperature ratings (Class 150 to Class 1500), body MOC options (WCB, CF8, CF8M, CF3M), face-to-face dimensions (ASME B16.10), testing standards (API 598).
- **Traceability Directory**: [`data/extractions/src_eafb3004ccf80087`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_eafb3004ccf80087)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Filename says WALVES; verified company name is PLANET VALVES. Testing standards include API 6D and API 598.

### 27. PRECISIONS GEAR TRANSMISSIONS.pdf

- **Source Document ID**: `src_43a9dfb5a351705c`
- **SHA-256 Checksum**: `43a9dfb5a351705c70c91bc3ec772b822f09fd5105ca0ce2e3f3968b6f04ec1a`
- **Detected Company / Legal Entity**: Precision Gear Transmissions (ISO 9001:2015)
- **Brands Identified**: PRECISION GEAR TRANSMISSIONS
- **Contact / Location Details**: info@precisiongear.in; Ahmedabad, Gujarat, India
- **Document Classification**: Mechanical Power Transmission Catalogue
- **Physical Page Count**: 4 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 2668 characters across 4 processed pages
- **Categories Represented**: Industrial Gearboxes, Power Transmission, Speed Reducers, Helical Drives
- **Core Products / Solutions / Services Discovered**:
  - Helical & Bevel Helical Gearboxes
  - Planetary Gearboxes
  - Extruder Duty Gearboxes
  - Worm Reduction Gearboxes
  - Agitator & Mixer Drives
- **Technical Tables, Curves & Diagrams**: Reduction ratios (1.25:1 to 500:1), thermal power ratings, torque capacities (Nm), shaft dimensions, mounting configurations.
- **Traceability Directory**: [`data/extractions/src_43a9dfb5a351705c`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_43a9dfb5a351705c)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Verify gear rating calculations conform to DIN / AGMA standards.

### 28. PRIKAN.pdf

- **Source Document ID**: `src_40cc46110bd23342`
- **SHA-256 Checksum**: `40cc46110bd2334200b716e4dddb59bc6f4c8e4f6799b0dd77a8e95102f18450`
- **Detected Company / Legal Entity**: Prikan Machinery Pvt. Ltd.
- **Brands Identified**: PRIKAN, ULTRA SERVO
- **Contact / Location Details**: sales@prikanakar.com, www.prikanakar.com; Ahmedabad, Gujarat & Mumbai, Maharashtra, India
- **Document Classification**: Plastics Machinery Technical Specification Catalogue
- **Physical Page Count**: 8 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 16374 characters across 8 processed pages
- **Categories Represented**: Plastics Machinery, Injection Moulding Machines, Servo Hydraulic Machinery, Industrial Machinery
- **Core Products / Solutions / Services Discovered**:
  - Ultra Servo Hydraulic Injection Moulding Machines (60 to 650 Ton clamping force)
  - Direct Locking Ram Mechanism
  - Servo Energy Saving Closed-Loop System
- **Technical Tables, Curves & Diagrams**: Two extensive master technical specification tables across Pages 5 & 6 covering clamping force, platen size, tie bar distance, shot weight (g), injection pressure (bar), motor power (kW), and oil tank capacity for 10 distinct models.
- **Traceability Directory**: [`data/extractions/src_40cc46110bd23342`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_40cc46110bd23342)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Critical technical data on Pages 5 and 6 must be preserved in structured specification tables.

### 29. PTC WATERTECH.pdf

- **Source Document ID**: `src_65169b8241541cd4`
- **SHA-256 Checksum**: `65169b8241541cd43ef3cbe104799b207f1da18b1afa4a2da6352437c63b2890`
- **Detected Company / Legal Entity**: PTC Watertech LLP (ISO 9001:2015, ISO 14001:2015)
- **Brands Identified**: PTC WATERTECH
- **Contact / Location Details**: sales@ptcwatertech.com, www.ptcwatertech.com; Ahmedabad, Gujarat, India
- **Document Classification**: Turnkey Water & Wastewater Systems Brochure
- **Physical Page Count**: 4 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 7156 characters across 4 processed pages
- **Categories Represented**: Water Treatment Plants, Sewage Treatment Plants, Effluent Treatment Plants, Reverse Osmosis Systems
- **Core Products / Solutions / Services Discovered**:
  - Turnkey Sewage Treatment Plants (STP - MBBR, SBR, MBR)
  - Effluent Treatment Plants (ETP)
  - Industrial Reverse Osmosis (RO) Plants
  - Water Softening & Demineralization (DM) Plants
  - Ultrafiltration (UF) Systems
- **Technical Tables, Curves & Diagrams**: Standard capacity sizing charts (10 KLD to 1000 KLD), footprint requirements, power consumption estimates, treated water quality benchmarks.
- **Traceability Directory**: [`data/extractions/src_65169b8241541cd4`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_65169b8241541cd4)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Treated water output parameters (BOD < 10, COD < 50, TSS < 10) require plant operational conditions.

### 30. PVG.pdf

- **Source Document ID**: `src_eba96ea15947605d`
- **SHA-256 Checksum**: `eba96ea15947605d026c2ed7c382629a11e103a3e64557b31b6dddb600867566`
- **Detected Company / Legal Entity**: Proveg Engineering & Food Processing Pvt. Ltd. (in collab with Shandong Yulong Machine Co., Ltd.)
- **Brands Identified**: PROVEG, YULONG
- **Contact / Location Details**: provegengineering@gmail.com, www.provegengg.com; Hyderabad, Telangana, India / Shandong, China
- **Document Classification**: Biomass Pellet & Torrefaction Machinery Catalogue
- **Physical Page Count**: 9 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 11172 characters across 9 processed pages
- **Categories Represented**: Biomass Pellet Machinery, Wood Chippers & Shredders, Hammer Mills, Biochar & Torrefaction
- **Core Products / Solutions / Services Discovered**:
  - Vertical Ring Die Biomass Pellet Machines (XLG-550, XLG-680, XLG-850)
  - Drum Wood Chippers & Log Splitters
  - High Efficiency Hammer Mills
  - Biomass Rotary Dryers & Coolers
  - Biochar & Torrefied Pellet Equipment
- **Technical Tables, Curves & Diagrams**: Pellet mill capacity tables (1.0 to 4.5 TPH), motor kW, ring die diameter, raw material moisture tolerance (<15%), wood chipper feed opening dimensions.
- **Traceability Directory**: [`data/extractions/src_eba96ea15947605d`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_eba96ea15947605d)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Document channel partner collaboration between Proveg Engineering (India) and Shandong Yulong (China).

### 31. ROAR ENGINEERS WATER SOLUTIONS.pdf

- **Source Document ID**: `src_093b4aef1bf931fd`
- **SHA-256 Checksum**: `093b4aef1bf931fd5940b3e9423d0d5cecbea97ff4379edd5de87d8d28f5af34`
- **Detected Company / Legal Entity**: Roar Engineers Water Solutions
- **Brands Identified**: ROAR ENGINEERS
- **Contact / Location Details**: inforoarengineers@gmail.com, www.roarengineers.com; Chennai, Tamil Nadu, India
- **Document Classification**: Water Treatment Solutions Brochure
- **Physical Page Count**: 4 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 1648 characters across 4 processed pages
- **Categories Represented**: Water Treatment Systems, STP / ETP / WTP / RO, Water Softeners, Operation & Maintenance
- **Core Products / Solutions / Services Discovered**:
  - Sewage Treatment Plants (Packaged STP)
  - Effluent Treatment Plants (ETP)
  - Industrial RO Plants & Desalination
  - Iron Removal Filters & Softeners
  - Annual Maintenance Contracts (AMC)
- **Technical Tables, Curves & Diagrams**: Flow process diagrams, skid layout footprints, membrane vessel configurations, treated water recovery ratios.
- **Traceability Directory**: [`data/extractions/src_093b4aef1bf931fd`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_093b4aef1bf931fd)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Verify website spelling (www.roarengineers.com) against brochure text.

### 32. SAI BALAJI POWER CONTROLS LLP.pdf

- **Source Document ID**: `src_b732c9cd2afb1037`
- **SHA-256 Checksum**: `b732c9cd2afb1037a18b136832c93e252ef0f4adbd1993cf61872babbc939e22`
- **Detected Company / Legal Entity**: Sai Balaji Power Controls LLP (ISO 9001:2015)
- **Brands Identified**: SAI BALAJI INFRA
- **Contact / Location Details**: www.saibalajiinfra.com; Hyderabad, Telangana, India
- **Document Classification**: Electrical Infrastructure & Cable Tray Catalogue
- **Physical Page Count**: 12 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 3400 characters across 12 processed pages
- **Categories Represented**: Cable Management Systems, Cable Trays, Raceways & Trunking, Solar Mounting Structures
- **Core Products / Solutions / Services Discovered**:
  - Perforated Cable Trays (Pre-Galvanized, Hot Dip Galvanized)
  - Ladder Type Cable Trays (Heavy Duty Welded)
  - Cable Raceways & Wireways
  - Solar Module Mounting Structures (MMS)
  - Unistrut Channels & Support Brackets
- **Technical Tables, Curves & Diagrams**: Cable tray width (50mm to 1000mm), height (25mm to 150mm), sheet thickness (1.2mm to 3.0mm), galvanized zinc coating thickness in microns (IS 2629 / IS 4759), load deflection tables.
- **Traceability Directory**: [`data/extractions/src_b732c9cd2afb1037`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_b732c9cd2afb1037)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Confirm galvanizing standards (IS 2629/IS 4759) and steel grades (IS 2062/IS 1079).

### 33. UZZALA BIO ENERGY SOLUTIONS.pdf

- **Source Document ID**: `src_43739f472513d74d`
- **SHA-256 Checksum**: `43739f472513d74d07be27ec3b5ee3737ec087337b68b0617a13941440c8c445`
- **Detected Company / Legal Entity**: Uzzala Bio Energy Solutions / The Gas Bank
- **Brands Identified**: UZZALA, THE GAS BANK
- **Contact / Location Details**: Uzzalabio@gmail.com, www.uzzalabioenergy.com; Hyderabad, Telangana, India
- **Document Classification**: Bio-CNG & CBG Turnkey Ecosystem Catalogue
- **Physical Page Count**: 20 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 14457 characters across 20 processed pages
- **Categories Represented**: Bio-CBG Turnkey Projects, Napier Grass Farming, Anaerobic Digesters, Bio-Fertilizer Plants
- **Core Products / Solutions / Services Discovered**:
  - Turnkey Bio-CBG Production Plants
  - Super Napier Grass Feedstock Ecosystem
  - Continuous Plug-Flow Anaerobic Digesters
  - Biogas Purification & Compression Cascades
  - Solid FOM & Liquid LFOM Bio-Fertilizer Plants
  - The Gas Bank CBG Retail Outlets
- **Technical Tables, Curves & Diagrams**: Napier grass yield per acre per year (150-200 Tons), biogas generation per ton feedstock, plant layout diagrams, Capex/Opex economic models across 20 pages.
- **Traceability Directory**: [`data/extractions/src_43739f472513d74d`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_43739f472513d74d)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Agro-economic yield and CBG payback projections are business estimates; label as unverified supplier projections.

### 34. UZZALA THE GAS BANK.pdf

- **Source Document ID**: `src_2d6d5c7b28d053de`
- **SHA-256 Checksum**: `2d6d5c7b28d053dec4d82243a886779a29a686542698fb1d18700bff12a4815f`
- **Detected Company / Legal Entity**: Uzzala Bio Energy Solutions / The Gas Bank
- **Brands Identified**: UZZALA, THE GAS BANK
- **Contact / Location Details**: uzzalabio@gmail.com, www.napierbiogasplant.com, www.plugflowdigester.com; Hyderabad, Telangana, India
- **Document Classification**: Napier Grass Bio-CBG Ecosystem Guide (Bilingual / Regional & English)
- **Physical Page Count**: 16 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 8761 characters across 16 processed pages
- **Categories Represented**: Napier Grass Cultivation, Bio-CBG Plants, Farmer Producer Networks, Clean Fuel Franchises
- **Core Products / Solutions / Services Discovered**:
  - Super Napier Grass (Pennisetum purpureum) Contract Farming
  - Decentralized Bio-CBG Production Units
  - The Gas Bank Franchise Model
  - Slurry Enrichment & Organic Farming Inputs
- **Technical Tables, Curves & Diagrams**: Agronomic calendar, water requirement comparison, cutting intervals (60-75 days), methane yield percentage (55-65%).
- **Traceability Directory**: [`data/extractions/src_2d6d5c7b28d053de`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_2d6d5c7b28d053de)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Document contains Telugu regional script alongside English technical terms. Preserve bilingual context.

### 35. WATER RING VACCUM PUMP.pdf

- **Source Document ID**: `src_71b3f4b5ec06372c`
- **SHA-256 Checksum**: `71b3f4b5ec06372cd4882a00f7f51be5bdf240896e96d2b1c3f5e439a3fdce2b`
- **Detected Company / Legal Entity**: PPI Pumps Private Limited
- **Brands Identified**: PPI PUMPS
- **Contact / Location Details**: sales@ppipumps.com, ppikalyan@gmai.com, www.ppipumps.com; Ahmedabad, Gujarat, India
- **Document Classification**: Vacuum Equipment Technical Catalogue & Datasheet
- **Physical Page Count**: 4 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 3625 characters across 4 processed pages
- **Categories Represented**: Liquid Ring Vacuum Pumps, Industrial Compressors, Vacuum Systems, Process Pumps
- **Core Products / Solutions / Services Discovered**:
  - PL Series Liquid Ring Vacuum Pumps (Cone Port Design)
  - PL-904 Series Heavy Duty Vacuum Pumps
  - Two-Stage & Single-Stage Vacuum Systems
- **Technical Tables, Curves & Diagrams**: Air capacity displacement curves (100 to 25,000 m3/hr), suction capacity vs vacuum levels up to 710 mm Hg, power curves (kW), seal liquid flow requirements.
- **Traceability Directory**: [`data/extractions/src_71b3f4b5ec06372c`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_71b3f4b5ec06372c)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Contact email has typo in source (gmai.com); preserve original observed string with review note.

### 36. YIMBY.pdf

- **Source Document ID**: `src_41d516ba3a2b79af`
- **SHA-256 Checksum**: `41d516ba3a2b79afcfcf6ebb990062535930d2dda168676e2b1c6817a8fb5ed8`
- **Detected Company / Legal Entity**: YIMBY (Yes In My Backyard) / Reclevo Infotech Pvt. Ltd.
- **Brands Identified**: YIMBY, RECLEVO
- **Contact / Location Details**: info@yimby.in; India
- **Document Classification**: Municipal Solid Waste Solutions & Digital Cleantech Profile
- **Physical Page Count**: 8 pages (SCANNED_IMAGE_BASED)
- **Extracted Text Volume**: 9780 characters across 8 processed pages
- **Categories Represented**: Municipal Solid Waste Management, Decentralized Composting, Cleantech Software, Waste-to-Resource
- **Core Products / Solutions / Services Discovered**:
  - Decentralized Community Waste Processing Systems
  - Bio-Bins & Aerobic Composting Enclosures
  - Reclevo Digital Waste Tracking & Governance SaaS
  - Material Recovery Facilities (MRF)
  - Municipal Advisory on Solid Waste Rules 2016
- **Technical Tables, Curves & Diagrams**: Waste flow circularity diagrams, municipal governance workflows, digital tracking dashboard previews.
- **Traceability Directory**: [`data/extractions/src_41d516ba3a2b79af`](file:///Users/satyaalugolu/Desktop/YRC/data/extractions/src_41d516ba3a2b79af)
- **Extraction Status**: `EXTRACTED` | **Review Status**: `NEEDS_REVIEW`
- **Confidence & Quality Requirements**: Public-Private Partnership (PPP) models and ULB collaboration frameworks require municipal regulatory compliance.

