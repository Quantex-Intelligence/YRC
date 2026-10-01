import json
from pathlib import Path

content = """# YRC Global Product, Solution & Service Taxonomy

Status: Phase 0 Taxonomy Specification. Derived strictly from the complete corpus of 36 source PDF files and physical document extractions in the YRC repository.

## 1. Architectural Taxonomy Principles

1. **Four Fundamental Entity Kinds**:
   - `PRODUCT`: Manufactured physical equipment, instrumentation, filtration components, valves, and consumables.
   - `SOLUTION`: Engineered process systems, tailored packages, and circular environmental schemes.
   - `SERVICE`: Technical operations, NABL calibration, AMC/CMC maintenance, chemical descaling, and ESG/MSME consulting.
   - `PROJECT / TURNKEY SYSTEM`: Multi-stage greenfield/brownfield EPC plants, capital installations, and utility franchises.

2. **Sparse Hierarchy Representation**:
   Products do not conform to a single rigid tier. The taxonomy model supports sparse multi-level resolution:
   `Company -> Brand -> Category -> Subcategory -> Product Family -> Product -> Series -> Model -> Variant -> Technical Specifications`.
   *Example*: A standard filter cartridge has `Product -> Model -> Variant (Micron/Length)`, whereas an injection moulding machine uses `Product -> Series -> Model -> Variant (Screw Type)`.

3. **Orthogonal Dimensionality**:
   Categories, Industries, and Applications are strictly decoupled:
   - **Category**: What the product/solution *is* (e.g. `Liquid Ring Vacuum Pumps`, `Biogas Analyzers`).
   - **Industry**: The economic sector *using* the entity (e.g. `Sugar Mills`, `Paper & Pulp`, `Pharmaceuticals`).
   - **Application**: The functional process *performed* by the entity (e.g. `Vapor Extraction`, `Air Scrubbing`, `Bio-Mining`).

---

## 2. Master Category & Family Hierarchy

```mermaid
graph TD
    Root[YRC Global Marketplace Taxonomy]
    Root --> WWT[Water & Wastewater Treatment]
    Root --> RE[Renewable Energy & Bio-CBG]
    Root --> IM[Industrial Machinery & Flow Control]
    Root --> INST[Process Instrumentation & Laboratory]
    Root --> WM[Waste Management & Circular Cleantech]
    Root --> ELEC[Electrical Infrastructure & Mounting]
    Root --> BIO[Biotechnology & Specialized Chemicals]
    Root --> ECO[Sustainable & Recycled Materials]
    Root --> MSME[MSME Schemes & Professional Services]
```

### 2.1 Category Group 1: Water & Wastewater Treatment

- **Cat-1.1: Membrane Filtration & Ultrafiltration**
  - *Subcategories*: Hollow Fiber Microfiltration (MF), Ultrafiltration (UF), Membrane Bioreactors (MBR), Reverse Osmosis (RO) Elements
  - *Product Families*: Pressurized Modules, Submerged Cassettes, Sea Water RO Pre-Treatment Skids
  - *Source Evidence*: Microza Asahi (`src_fd7d4f8f10f500e6`), Microza MF Modules (`src_e3c41d7273aabed1`), GSE Filter (`src_370fbfb03e012492`)
- **Cat-1.2: Biological Filtration Media & Settlers**
  - *Subcategories*: Structured Tube Media, Moving Bed Biofilm Reactor (MBBR) Media, Tube Settler Chevrons, Trickling Filter Media
  - *Product Families*: Extruded Pipe Blok Media, Virgin HDPE Media Rings, High Surface Area Modules (100 - 800 m2/m3)
  - *Source Evidence*: Indobio (`src_6dfc1393e0ac614e`), Indonet (`src_0d54644ad2e352f9`)
- **Cat-1.3: Cartridge Filtration & Vessels**
  - *Subcategories*: Wound Polypropylene Cartridges, Spun Meltblown Cartridges, Pleated High-Flow Cartridges, Filter Bags (Size 1 & 2), FRP Pressure Vessels, Ion Exchange Resins (Cation/Anion)
  - *Product Families*: 10\" to 40\" Standard and Jumbo/Big Blue Elements, Composite Pressure Tanks (0817 to 6386)
  - *Source Evidence*: GSE Filter Pvt Ltd (`src_370fbfb03e012492`)
- **Cat-1.4: Disinfection & Advanced Oxidation**
  - *Subcategories*: Corona Discharge Ozone Generators, UV Disinfection, Oxygen Concentrators, Ozone Destructors
  - *Product Families*: Megazone Air/Water O3 Units (5 g/hr to 500 g/hr), Venturi Injection Skids
  - *Source Evidence*: Aurozone Enviro Solutions (`src_17a3ae73923e51d0`)
- **Cat-1.5: Engineered Water & Wastewater Plants (Solutions & Turnkey)**
  - *Subcategories*: Packaged & Civil Sewage Treatment Plants (STP), Industrial Effluent Treatment Plants (ETP), Water Treatment Plants (WTP), Industrial Reverse Osmosis (RO), Zero Liquid Discharge (ZLD), Electro-Coagulation (EC)
  - *Product Families*: Modular Containerized STP Skids, High-TDS ZLD Evaporators, Industrial Softeners
  - *Source Evidence*: PTC Watertech (`src_65169b8241541cd4`), Roar Engineers (`src_093b4aef1bf931fd`), Biotech Amalgam (`src_923800a86d29dc47`)

### 2.2 Category Group 2: Renewable Energy, Biogas & Bio-CBG

- **Cat-2.1: Biogas Purification & Upgrading Systems**
  - *Subcategories*: Biological H2S Scrubbers, Chemical Dry Scrubbers, 3-Stage Membrane Gas Separation Skids, Pressure Swing Adsorption (PSA) Units
  - *Product Families*: High-Purity Bio-CNG / CBG Upgradation Packages (50 to 5000 Nm3/hr, CH4 > 96%)
  - *Source Evidence*: Airshuddhi Engineers (`src_48feff1722e03816`), Bio Green Energy (`src_8868dc31adf1b860`)
- **Cat-2.2: Gas Compression, Bottling & Storage**
  - *Subcategories*: High-Pressure Reciprocating Gas Compressors (200-250 bar), Storage Cylinder Cascades, Electronic Mass-Flow CBG Dispensers, Open & Enclosed Gas Flares
  - *Product Families*: Station Cascade Banks (3-bank high pressure), Automated Truck Loading Arms
  - *Source Evidence*: Airshuddhi Engineers (`src_48feff1722e03816`), Uzzala The Gas Bank (`src_2d6d5c7b28d053de`)
- **Cat-2.3: Biomass Densification & Pelletizing Machinery**
  - *Subcategories*: Vertical Ring Die Pellet Mills, Drum Wood Chippers, High-Speed Hammer Mills, Rotary Triple-Pass Dryers, Counterflow Pellet Coolers
  - *Product Families*: Industrial Pellet Lines (1.5 to 20 TPH), Agricultural Residue Briquette Presses
  - *Source Evidence*: Proveg / Shandong Yulong (`src_eba96ea15947605d`), Gattwala Energy (`src_708304493baf5742`)
- **Cat-2.4: Biomass Gasification & Waste-to-Energy**
  - *Subcategories*: Downdraft Biomass Gasifiers, Fluidized Bed Gasifiers, Syngas Cleanup Skids, Biomass-Fired Steam Boilers
  - *Product Families*: Decentralized Gasifier Power Plants (100 kWe to 1.5 MWe)
  - *Source Evidence*: Miura Bio Power (`src_c85bf48cde6e9942`)
- **Cat-2.5: Solar Power & Agricultural Pumping**
  - *Subcategories*: Rooftop Commercial Solar PV, Ground-Mount Utility Solar, Solar Agricultural Pumping Systems, Solar Inverters
  - *Product Families*: Grid-Tied PV Systems (50 kWp to 2000 kWp), Off-Grid Solar Pumping Kits (3 HP to 10 HP)
  - *Source Evidence*: Gattwala Energy (`src_708304493baf5742`), Sai Balaji Infra (`src_b732c9cd2afb1037`)

### 2.3 Category Group 3: Industrial Machinery & Flow Control

- **Cat-3.1: Positive Displacement Blowers & Air Systems**
  - *Subcategories*: Twin Lobe Roots Blowers, Tri Lobe Roots Blowers, Direct-Coupled Blower Skids, V-Belt Blowers, Acoustic Hood Enclosures
  - *Product Families*: AB Series Blowers (10 to 10,000 m3/hr, up to 1000 mbar differential pressure)
  - *Source Evidence*: Alpha Blowers (`src_144681700dd4d80e`)
- **Cat-3.2: Liquid Ring Vacuum Pumps & Compressors**
  - *Subcategories*: Two-Stage Liquid Ring Vacuum Pumps, Single-Stage Flat Disc Vacuum Pumps, Heavy-Duty Cone Port Vacuum Pumps, Chemical Centrifugal Pumps
  - *Product Families*: 2GE Series (Garuda), PL & PL-904 Heavy Duty Series (PPI Pumps, up to 25,000 m3/hr)
  - *Source Evidence*: Garuda Pumps (`src_f3fd95fe5bd4720e`), PPI Pumps (`src_71b3f4b5ec06372c`)
- **Cat-3.3: Plastics Processing & Moulding Machinery**
  - *Subcategories*: Servo-Hydraulic Injection Moulding Machines, Direct Locking Ram Machines, Energy-Saving Servo Pump Skids
  - *Product Families*: Prikan Ultra Servo Series (US-60 to US-650 Ton clamping force)
  - *Source Evidence*: Prikan Machinery (`src_40cc46110bd23342`)
- **Cat-3.4: Industrial Valves & Fluid Flow Control**
  - *Subcategories*: Floating Ball Valves, Trunnion Mounted Ball Valves, Wafer/Lug Butterfly Valves, Gate Valves, Globe Valves, Dual Plate Check Valves
  - *Product Families*: API 6D Class 150 to Class 1500 Valves, Forged & Cast Steel Valve Lines (DN15 to DN600)
  - *Source Evidence*: Planet Valves (`src_eafb3004ccf80087`)
- **Cat-3.5: Mechanical Power Transmission & Gearboxes**
  - *Subcategories*: Helical Gearboxes, Bevel Helical Gearboxes, Planetary Speed Reducers, Extruder Duty Gearboxes, Worm Reduction Gearboxes
  - *Product Families*: Heavy Industrial Reduction Drives (Ratios 1.25:1 to 500:1, Torque up to 50,000 Nm)
  - *Source Evidence*: Precision Gear Transmissions (`src_43a9dfb5a351705c`)

### 2.4 Category Group 4: Process Instrumentation, Analytical & Laboratory

- **Cat-4.1: Industrial Gas Detection & Biogas Analyzers**
  - *Subcategories*: Panel-Mounted Multi-Stream Gas Analyzers, Flameproof Hazardous Area Analyzers (Ex d), Portable Gas Detectors, Online Dew Point Transmitters
  - *Product Families*: BIO-600 Series (Ambetronics), BIO-400-S-FLP (CIMFR certified), NDIR multi-channel analyzers
  - *Source Evidence*: Ambetronics Engineers (`src_1d427d20811d189c`)
- **Cat-4.2: Water Quality & Optical Analytical Instruments**
  - *Subcategories*: UV-VIS Reference Spectrophotometers, Multi-Parameter Photometers, Portable & Benchtop Turbidimeters, Respirometric BOD Systems, COD Thermoreactors & Vials, Pocket Testers (pH, EC, TDS)
  - *Product Families*: XD 7000/7500, MD 100/200, TB 350, BD 600, SD Series (Lovibond / Tintometer)
  - *Source Evidence*: Lovibond Water Testing (`src_a369a306e7f45911`)
- **Cat-4.3: Industrial Heavy Duty Weighing Systems**
  - *Subcategories*: Electronic Weighbridges (Pit & Pitless), Heavy Platform Scales, Wireless Crane Scales, Flameproof Weighing Indicators, Precision Balances
  - *Product Families*: Eagle WB Modular Weighbridges (20T to 150T), Heavy-duty platform scales (50 kg to 5000 kg)
  - *Source Evidence*: Eagle Scales / E.G. Kantawalla (`src_9ec37ddf62522cfb`)
- **Cat-4.4: Laboratory Thermal & Sterilization Equipment**
  - *Subcategories*: BOD Incubators, Bacteriological Incubators, Laboratory Hot Air Ovens, High-Temp Muffle Furnaces (1200C), Vertical Autoclaves, Water Stills, Flocculators
  - *Product Families*: Precision temperature-controlled laboratory chambers (45L to 300L)
  - *Source Evidence*: Anand Scientific Company (`src_f27ffa7ded2350b5`)

### 2.5 Category Group 5: Waste Management & Circular Cleantech

- **Cat-5.1: Organic Waste Converters & Bio-Digesters**
  - *Subcategories*: Fully Automated Organic Waste Converters (OWC), Commercial Food Waste Digesters, Composting Accelerators
  - *Product Families*: Greeneria OWC Series (25 kg/day to 2000 kg/day)
  - *Source Evidence*: Greeneria (`src_0a146e599513ad12`), YIMBY (`src_41d516ba3a2b79af`)
- **Cat-5.2: Municipal Solid Waste (MSW) Machinery**
  - *Subcategories*: Rotary Trommel Screens, Bio-Mining Waste Screeners, Belt & Inclined Conveyors, Hopper Feeders, Bag Loaders, Industrial Roasters & Dryers
  - *Product Families*: Heavy Trommel Drums (1500mm to 2500mm diameter), Material handling conveyors
  - *Source Evidence*: Jainum Projects (`src_b8f191dc7a0a40d6`)
- **Cat-5.3: Digital Cleantech Platforms & SaaS**
  - *Subcategories*: Municipal Waste Collection GPS/RFID Tracking, Waste Circularity Accounting SaaS, Community Waste Governance Portals
  - *Product Families*: Reclevo Municipal Platform
  - *Source Evidence*: YIMBY / Reclevo (`src_41d516ba3a2b79af`)

### 2.6 Category Group 6: Electrical Infrastructure & Cable Systems

- **Cat-6.1: Cable Management Systems**
  - *Subcategories*: Perforated Cable Trays, Ladder Type Heavy Duty Trays, Cable Raceways & Wireways, Unistrut Channels & Cantilever Brackets
  - *Product Families*: Hot Dip Galvanized (IS 2629), Pre-Galvanized, and Powder Coated Cable Trays (Widths 50mm to 1000mm)
  - *Source Evidence*: Sai Balaji Power Controls (`src_b732c9cd2afb1037`)
- **Cat-6.2: Solar Module Mounting Structures (MMS)**
  - *Subcategories*: Ground-Mount Solar Structures, Industrial Rooftop Purlin Clamps, Solar Carports
  - *Product Families*: Cold-Formed Galvanized High-Tensile Steel Profiles
  - *Source Evidence*: Sai Balaji Power Controls (`src_b732c9cd2afb1037`)

### 2.7 Category Group 7: Biotechnology & Specialized Chemicals

- **Cat-7.1: Microbial Consortia & Bioremediation**
  - *Subcategories*: Biological Sewage Digestors (STP), Industrial Effluent Biocultures (ETP), Grease Trap & FOG Digestors, Septic Tank Inoculants, Biotoilet Bacterial Strains
  - *Product Families*: Bioclean Series (Organica Biotech), Biotech Amalgam Microbial Formulations
  - *Source Evidence*: Organica Biotech (`src_c17647a02bad15af`), Biotech Amalgam (`src_923800a86d29dc47`)
- **Cat-7.2: Descaling Equipment & Eco Chemicals**
  - *Subcategories*: Portable Circulation Descaling Skids, Biodegradable Descaling Chemicals, Boiler Scale Inhibitors, Rust Removers
  - *Product Families*: Power Flush Units, ECOTREAT Non-Corrosive Formulations
  - *Source Evidence*: JK Engineering & Technology (`src_32bdd39b07440c8d`)

### 2.8 Category Group 8: Sustainable & Recycled Materials

- **Cat-8.1: Recycled Plastic Infrastructure**
  - *Subcategories*: Recycled Plastic Lumber / Planks, Industrial Chemical-Resistant Plastic Pallets, Eco Park Benches, Tree Guards, Modular Toilet Cabins
  - *Product Families*: 100% Post-Consumer Polyolefin Structural Planks (Zero Rot, 50+ Year Life)
  - *Source Evidence*: Nirman Eco-Plastics (`src_b5762cca4fc4896a`)
- **Cat-8.2: Agricultural Residue Biofuels**
  - *Subcategories*: High-Density Biomass Pellets, Agricultural Crop Residue Briquettes
  - *Product Families*: GCV > 4000 kcal/kg Standard Industrial Heating Fuel
  - *Source Evidence*: Gattwala Energy (`src_708304493baf5742`)

### 2.9 Category Group 9: Professional & MSME Services

- **Cat-9.1: Environmental & Sustainability Advisory**
  - *Subcategories*: Corporate Carbon Footprint Audits (Scope 1/2/3), Net-Zero Roadmaps, BRSR & ESG Regulatory Filings, Carbon Credit Advisory
  - *Service Offerings*: NetXeroC Corporate Advisory Packages
  - *Source Evidence*: NetXeroC (`src_838c5252edc876c5`)
- **Cat-9.2: MSME Incubation & Institutional Programs**
  - *Subcategories*: Entrepreneurship Development Programs (EDP), Skill Training, Common Facility Center (CFC) Access, Government Subsidy Facilitation (PMEGP, Stand-Up India)
  - *Service Offerings*: CED ALEAP Training & Incubation Framework
  - *Source Evidence*: CED ALEAP (`src_bd0f8ff637ea4e3d`)

---

## 3. Independent Industry Taxonomy

Industries represent the vertical customer sectors purchasing or commissioning solutions:

| Industry Code | Industry Name | Key Source Applications & Demand Drivers | Discovered Suppliers |
|---|---|---|---|
| `IND-WATER` | **Water, Wastewater & Municipal Utilities** | Municipal STP, drinking water filtration, sewer desilting, water quality compliance | PTC, Roar, Asahi Microza, Lovibond, Indobio, GSE Filter |
| `IND-ENERGY` | **Renewable Energy & Biofuels** | Bio-CBG production, biomass pelletizing, solar power, gas bottling | Airshuddhi, Bio Green Energy, Uzzala, Proveg, Gattwala |
| `IND-CHEM` | **Chemical & Petrochemical Processing** | Corrosive effluent treatment, flameproof gas monitoring, API valves, vacuum distillation | Planet Valves, Ambetronics, Garuda Pumps, PPI Pumps |
| `IND-PHARMA` | **Pharmaceutical & Biotechnology** | High purity water (PW/WFI), lab incubator testing, sterile filtration, cleanroom O3 | Anand Scientific, Lovibond, Asahi Microza, Planet Valves |
| `IND-FOOD` | **Food, Beverage & Dairy Processing** | Effluent BOD reduction, grease digestion, packaging machinery, steam descaling | Organica Biotech, Prikan, JK Engineering, Jainum Projects |
| `IND-SUGAR` | **Sugar Mills & Distilleries** | Pressmud CBG digestion, heavy vacuum filtration, spent wash ZLD, bagasse pelleting | Airshuddhi, Bio Green Energy, PPI Pumps, Proveg |
| `IND-TEXTILE` | **Textiles & Dyeing** | Color removal, salt recovery, ZLD systems, high-temperature fluid control | Biotech Amalgam, PTC Watertech, Planet Valves |
| `IND-PAPER` | **Paper & Pulp Manufacturing** | Heavy dewatering, vacuum couch rolls, aeration blowers, fiber recovery | Alpha Blowers, PPI Pumps, Garuda Pumps, GSE Filter |
| `IND-POWER` | **Thermal & Hydro Power Utilities** | Cooling tower conditioning, boiler descaling, high pressure valves, cable routing | Sai Balaji Infra, JK Engineering, Planet Valves, Alpha Blowers |
| `IND-STEEL` | **Steel, Mining & Heavy Engineering** | Weighbridges, heavy conveyor sorting, slag slurry pumps, robust gear transmission | Eagle Scales, Precision Gear, Garuda Pumps, Jainum |
| `IND-PLASTIC` | **Plastics, Packaging & Polymers** | Servo injection moulding, plastic waste recycling, pallet manufacturing | Prikan Machinery, Nirman Eco-Plastics, Indonet |
| `IND-MSME` | **MSME & Small Industrial Enterprises** | Cluster manufacturing, government subsidy access, incubation, common testing | CED ALEAP, Sai Balaji, Anand Scientific |
| `IND-HOSP` | **Hospitality, Commercial & Healthcare** | Food waste conversion, localized STP recycling, decentralized composting, solar rooftop | Greeneria, YIMBY, PTC Watertech, Gattwala Energy |

---

## 4. Independent Application Taxonomy

Applications define the specific process operations performed by equipment and solutions:

| Application Code | Application Name | Compatible Entity Types | Example Entities |
|---|---|---|---|
| `APP-STP` | **Sewage Treatment & Water Recycling** | Products, Solutions, Services | PTC Packaged STP, Roar STP, Indobio Pipe Blok, Bioclean STP |
| `APP-ETP` | **Industrial Effluent Neutralization** | Products, Solutions, Services | Biotech Amalgam EC, PTC ETP, GSE Cartridges, Organica Bioclean |
| `APP-ZLD` | **Zero Liquid Discharge & Salt Recovery** | Solutions, Turnkey Projects | Amalgam ZLD, High-TDS MEE Evaporators |
| `APP-CBG-UPG` | **Biogas Upgradation to Bio-CNG (CBG)** | Products, Turnkey Projects | Airshuddhi Membrane Skids, Bio Green Energy CBG, Uzzala Plug-Flow |
| `APP-GAS-ANA` | **Hazardous Gas Analysis & Detection** | Products, Services | Ambetronics BIO-600, BIO-400-S-FLP flameproof detector |
| `APP-O3-DIS` | **Ozone Water & Air Disinfection** | Products | Aurozone Megazone Series, Venturi Injectors |
| `APP-VAC-DEW` | **Liquid Ring Vacuum Dewatering & Suction** | Products | PPI Pumps PL-904, Garuda 2GE vacuum pumps |
| `APP-AIR-AER` | **Wastewater Biological Aeration** | Products | Alpha Blowers Twin Lobe & Tri Lobe Roots Blowers |
| `APP-INJ-MOLD`| **Precision Plastics Injection Moulding** | Products | Prikan Ultra Servo US-60 to US-650 Ton machines |
| `APP-WEIGH` | **Bulk Vehicle & Material Weighing** | Products, Turnkey Projects | Eagle Pitless Weighbridges (150T), Heavy platform scales |
| `APP-PELLET` | **Biomass Densification & Pellet Fuel Making** | Products, Turnkey Projects | Proveg / Yulong XLG-550/850, Gattwala pellet mills |
| `APP-FOOD-COMP`| **Commercial Food Waste Fast Composting** | Products, Solutions | Greeneria OWC-25 to OWC-2000, YIMBY Bio-Bins |
| `APP-DESCAL` | **Boiler & Chiller Chemical Descaling** | Products, Services | Power Flush Skids, ECOTREAT descaling chemicals |
| `APP-CABLE-MGMT`| **Industrial Cable Routing & Support** | Products | Sai Balaji Perforated & Ladder Trays, Raceways |
| `APP-WATER-TEST`| **Laboratory & Field Water Quality Testing** | Products | Lovibond XD 7500, TurbiDirect, BD 600, Anand Scientific |
| `APP-CARBON-ACC`| **Scope 1/2/3 Corporate Carbon Accounting** | Services | NetXeroC GHG Auditing & BRSR advisory |
| `APP-MSME-INC` | **MSME Entrepreneurship Training & Incubation** | Services | CED ALEAP EDP Programs, CFC support |
"""

Path('docs/YRC_PRODUCT_TAXONOMY.md').write_text(content, encoding='utf-8')
print('Successfully generated docs/YRC_PRODUCT_TAXONOMY.md! Length:', len(content))
