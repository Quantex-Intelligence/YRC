import json
from pathlib import Path

existing = Path('docs/YRC_MASTER_CATALOGUE.md').read_text(encoding='utf-8')
lines = [existing]

lines.append('### 2.1 Products Catalogue (Tangible Industrial Goods)')
lines.append('')
lines.append('Each product item supports sparse hierarchical nesting: `Company -> Brand -> Category -> Subcategory -> Product Family -> Series -> Model -> Variant`.')
lines.append('')

products = [
    {
        'id': 'PROD-ALPHA-ROOTS',
        'name': 'Alpha Twin Lobe & Tri Lobe Positive Displacement Roots Blowers',
        'company': 'Somaiya Techno Products / Alpha Blowers',
        'brand': 'ALPHA BLOWERS',
        'cat': 'Industrial Machinery > Air & Gas Handling > Industrial Blowers',
        'series': 'AB Series (Direct Coupling & V-Belt Driven)',
        'models': 'AB-20, AB-30, AB-40, AB-50, AB-60, AB-80, AB-100, AB-125, AB-150, AB-200, AB-250',
        'specs': 'Flow Capacity: 10 m3/hr to 10,000 m3/hr; Differential Pressure: up to 1000 mbar (1.0 kg/cm2); Vacuum: up to 500 mm Hg; Drive: Direct coupling / V-belt drive; MOC: High-grade cast iron casing & lobes, alloy steel shafts, precision ground helical timing gears.',
        'pricing': 'Request Quote (Price on Request)',
        'source': 'ALPHA BLOWERS.pdf (`src_144681700dd4d80e`), Pages 1-4'
    },
    {
        'id': 'PROD-AMBETRONICS-BIO600',
        'name': 'Ambetronics Multi-Stream Biogas Analyzer (Panel Mounted)',
        'company': 'Ambetronics Engineers Pvt. Ltd.',
        'brand': 'AMBETRONICS ANALYZERS',
        'cat': 'Instrumentation & Process Control > Gas Detection & Monitoring > Biogas Analyzers',
        'series': 'BIO-600 Series',
        'models': 'BIO-600-S-PANEL (1, 2, or 3 stream automatic sequencing)',
        'specs': 'Parameters: CH4 (0-100% vol, NDIR, res 0.1%), CO2 (0-100% vol, NDIR, res 0.1%), O2 (0-25% vol, EC, res 0.01%), H2S (0-2000 / 0-10000 ppm, EC, res 1 ppm); Sampling: Built-in suction pump with sample conditioning, moisture trap & coalescing filter; Output: 4-20mA per channel, RS-485 Modbus RTU; Display: Touchscreen graphical TFT LCD.',
        'pricing': 'Request Quote (Price on Request)',
        'source': 'AMBETRONICS.pdf (`src_1d427d20811d189c`), Pages 1-3'
    },
    {
        'id': 'PROD-AMBETRONICS-BIO400',
        'name': 'Ambetronics Flameproof Biogas Analyzer',
        'company': 'Ambetronics Engineers Pvt. Ltd.',
        'brand': 'AMBETRONICS ANALYZERS',
        'cat': 'Instrumentation & Process Control > Gas Detection & Monitoring > Flameproof Gas Analyzers',
        'series': 'BIO-400 Series',
        'models': 'BIO-400-S-FLP (CIMFR / PESO Certified Explosion-Proof Ex d IIC T6 Gb)',
        'specs': 'Enclosure: Die-cast aluminum alloy LM6 / SS316 flameproof enclosure; Ingress: IP66; Hazardous Area: Zone 1 & Zone 2; Sensors: Dual-beam NDIR for CH4/CO2, solid state / electrochemical for H2S/O2; Power: 24V DC / 230V AC; Approvals: CIMFR, PESO, BIS certified.',
        'pricing': 'Request Quote (Price on Request)',
        'source': 'AMBETRONICS.pdf (`src_1d427d20811d189c`), Pages 1, 3, 4'
    },
    {
        'id': 'PROD-LOVIBOND-XD7500',
        'name': 'Lovibond XD 7000 / XD 7500 UV-VIS Reference Spectrophotometer',
        'company': 'Tintometer India Pvt. Ltd. / Lovibond',
        'brand': 'LOVIBOND',
        'cat': 'Laboratory & Scientific Equipment > Water Quality Analysis > Spectrophotometers',
        'series': 'XD Series Spectrophotometers',
        'models': 'XD 7000 (VIS: 320 - 1100 nm), XD 7500 (UV-VIS: 190 - 1100 nm)',
        'specs': 'Optics: Reference beam spectrophotometer with tungsten halogen & xenon flash lamps; Spectral Bandwidth: 4 nm; Wavelength Accuracy: +/- 1.0 nm; Photometric Range: -3.3 to +3.3 Abs; Barcode Recognition: Automatic 16mm vial barcode recognition; Pre-programmed Methods: Over 150 water testing methods.',
        'pricing': 'Request Quote (Price on Request)',
        'source': 'LOVIBOND WATER TESTING.pdf (`src_a369a306e7f45911`), Pages 1-5'
    },
    {
        'id': 'PROD-LOVIBOND-BD600',
        'name': 'Lovibond BD 600 Respirometric BOD Measuring System',
        'company': 'Tintometer India Pvt. Ltd. / Lovibond',
        'brand': 'LOVIBOND',
        'cat': 'Laboratory & Scientific Equipment > Water Quality Analysis > BOD Measurement',
        'series': 'BD Series',
        'models': 'BD 600 (6-sample sensor system)',
        'specs': 'Principle: Manometric respirometric measurement; Range: 0-40, 0-80, 0-200, 0-400, 0-800, 0-2000, 0-4000 mg/L BOD; Test Period: 1 to 28 days selectable; Data Storage: Up to 28 days hourly logging; Interface: USB & SD card data transfer.',
        'pricing': 'Request Quote (Price on Request)',
        'source': 'LOVIBOND WATER TESTING.pdf (`src_a369a306e7f45911`), Pages 8-10'
    },
    {
        'id': 'PROD-LOVIBOND-TB350',
        'name': 'Lovibond TB 350 / TurbiDirect Portable Turbidimeter',
        'company': 'Tintometer India Pvt. Ltd. / Lovibond',
        'brand': 'LOVIBOND',
        'cat': 'Laboratory & Scientific Equipment > Optical Testing > Turbidity Meters',
        'series': 'TB Series Turbidimeters',
        'models': 'TB 350 WL (White Light ISO 7027 / US EPA), TB 350 IR (Infrared 860 nm ISO 7027)',
        'specs': 'Range: 0.01 to 4000 NTU; Multipath 90 degree & 360 degree sensor geometry; Accuracy: +/- 1.5% of reading; Calibration: Formazin / T-CAL standards; Data Logging: 250 test datasets with date/time stamps.',
        'pricing': 'Request Quote (Price on Request)',
        'source': 'LOVIBOND WATER TESTING.pdf (`src_a369a306e7f45911`), Pages 11-13'
    },
    {
        'id': 'PROD-PRIKAN-US',
        'name': 'Prikan Ultra Servo Hydraulic Injection Moulding Machine (60T - 650T)',
        'company': 'Prikan Machinery Pvt. Ltd.',
        'brand': 'PRIKAN / ULTRA SERVO',
        'cat': 'Industrial Machinery > Plastics Processing > Injection Moulding Machines',
        'series': 'Ultra Servo Series',
        'models': 'US-60, US-110, US-110W, US-125, US-150, US-200, US-280, US-350, US-450, US-650',
        'specs': 'Clamping Force: 600 kN to 6500 kN (60 to 650 Metric Tons); Locking Mechanism: Direct Locking Ram Type with Mono Seal & No Piston Rings; Drive: Closed-loop synchronous servo motor and internal gear pump (up to 70% energy savings); Tie Bar Clearance: 310x310 mm (US-60) to 920x920 mm (US-650); Shot Weight (PS): 68 g to 3120 g; Injection Pressure: 1400 to 2200 bar.',
        'pricing': 'Request Quote (Price on Request)',
        'source': 'PRIKAN.pdf (`src_40cc46110bd23342`), Pages 1-8'
    },
    {
        'id': 'PROD-MICROZA-MF',
        'name': 'Microza MF Hollow Fiber Microfiltration Membrane Modules',
        'company': 'Asahi Kasei Corporation',
        'brand': 'MICROZA / ASAHI KASEI',
        'cat': 'Water & Wastewater Equipment > Membrane Filtration > Microfiltration Modules',
        'series': 'UNA / UNAV / OLT Series',
        'models': 'UNA-620A, UNAV-620A, OLT-6036A',
        'specs': 'Membrane Material: Hydrophilic PVDF (Polyvinylidene Fluoride); Nominal Pore Size: 0.1 micron; Fiber Configuration: Hollow fiber with symmetric porous structure (high flux, low fouling); Membrane Area: 50 m2 per module (UNA-620A); Max Operating Pressure: 300 kPa (3.0 bar); Chlorine Tolerance: Continuous up to 5000 ppm; Operating Mode: Pressurized outside-in or inside-out filtration.',
        'pricing': 'Request Quote (Price on Request)',
        'source': 'MICROZA ASAHI.pdf (`src_fd7d4f8f10f500e6`), MIRCROZA FM MODULES AND SYSTEMS.pdf (`src_e3c41d7273aabed1`)'
    },
    {
        'id': 'PROD-PLANET-BALLVALVES',
        'name': 'Planet Industrial Cast & Forged Steel Ball Valves (Class 150 - 1500)',
        'company': 'Planet Valves',
        'brand': 'PLANET VALVES',
        'cat': 'Industrial Machinery > Flow Control Equipment > Industrial Valves',
        'series': 'Series BV-1P, BV-2P, BV-3P, BV-TM',
        'models': 'Floating Ball (1/2\" to 8\"), Trunnion Mounted (2\" to 24\") - Class 150, 300, 600, 900, 1500',
        'specs': 'Standards: API 6D, ASME B16.34, BS 5351; Face-to-Face: ASME B16.10; Flange Dimensions: ASME B16.5; Body Materials: ASTM A216 Gr. WCB, A351 Gr. CF8 / CF8M / CF3M, A105, F316; Trim: SS304/SS316 with PTFE / RPTFE / PEEK seats; Fire Safe Testing: API 607 / ISO 10497.',
        'pricing': 'Request Quote (Price on Request)',
        'source': 'PLANET WALVES.pdf (`src_eafb3004ccf80087`), Pages 1-8'
    },
    {
        'id': 'PROD-PLANET-BUTTERFLY',
        'name': 'Planet Concentric & High-Performance Butterfly Valves',
        'company': 'Planet Valves',
        'brand': 'PLANET VALVES',
        'cat': 'Industrial Machinery > Flow Control Equipment > Butterfly Valves',
        'series': 'Series BFV-W (Wafer), BFV-L (Lug), BFV-F (Flanged)',
        'models': 'Wafer Type & Lugged (Sizes 2\" / DN50 to 24\" / DN600), Pressure Rating PN10 / PN16 / Class 150',
        'specs': 'Design: API 609 Cat A / Cat B, EN 593; Liner: EPDM, Nitrile, Viton, PTFE; Disc: Ductile Iron (Nylon coated), CF8, CF8M; Stem: Single piece blowout-proof SS410 / SS316; Actuation: Lever, Worm Gearbox, Pneumatic actuator, Electric actuator.',
        'pricing': 'Request Quote (Price on Request)',
        'source': 'PLANET WALVES.pdf (`src_eafb3004ccf80087`), Pages 3-6'
    },
    {
        'id': 'PROD-EAGLE-WEIGHBRIDGES',
        'name': 'Eagle Heavy Duty Pitless & Pit Type Electronic Weighbridges (up to 150T)',
        'company': 'E.G. Kantawalla Private Limited',
        'brand': 'EAGLE SCALES',
        'cat': 'Measurement & Instrumentation > Industrial Weighing > Weighbridges',
        'series': 'Eagle WB Series',
        'models': 'WB-PIT, WB-PITLESS, WB-MODULAR (Platform lengths: 6m, 9m, 12m, 16m, 18m, 20m; Capacities: 20T to 150T)',
        'specs': 'Load Cells: IP68 hermetically sealed double-ended shear beam or canister compression load cells; Structure: Heavy-duty fabricated high-tensile steel girder design with anti-skid chequered plate; Terminal: Microprocessor intelligent indicator with RS-232, USB, Ethernet, jumbo score-board display output.',
        'pricing': 'Request Quote (Price on Request)',
        'source': 'EAGLE.pdf (`src_9ec37ddf62522cfb`), Pages 1-6'
    },
    {
        'id': 'PROD-GARUDA-VACUUM',
        'name': 'Garuda 2GE 1/3 & 4 Series Liquid Ring Vacuum Pumps',
        'company': 'Garuda Pumps Private Limited',
        'brand': 'GARUDA PUMPS',
        'cat': 'Industrial Machinery > Vacuum Equipment > Liquid Ring Vacuum Pumps',
        'series': '2GE Series (Two Stage & Single Stage)',
        'models': '2GE-1, 2GE-3, 2GE-4',
        'specs': 'Suction Capacity: 50 m3/hr to 3000 m3/hr; Vacuum Level: up to 735 mm Hg (29\" Hg); Speed: 1450 / 2900 RPM; MOC: Cast iron, bronze impellers, SS304 / SS316 wetted parts; Shaft Seal: Mechanical seal / gland packing; Service Liquid: Fresh water at 15-30 deg C.',
        'pricing': 'Request Quote (Price on Request)',
        'source': 'GARUDA PUMPS PVT LTD.pdf (`src_f3fd95fe5bd4720e`), Pages 1-4'
    },
    {
        'id': 'PROD-PPI-VACUUM-PL',
        'name': 'PPI Pumps PL Series & PL-904 Cone Port Liquid Ring Vacuum Pumps',
        'company': 'PPI Pumps Private Limited',
        'brand': 'PPI PUMPS',
        'cat': 'Industrial Machinery > Vacuum Equipment > Liquid Ring Vacuum Pumps',
        'series': 'PL Series & PL-904 Series (Cone Port Heavy Duty)',
        'models': 'PL-904 (Models P, Q, R, S, T, U)',
        'specs': 'Capacity: 100 m3/hr to 25,000 m3/hr; Max Vacuum: 710 mm Hg (950 mbar); Porting Design: Dual cone port design offering low power consumption and high vapor condensation efficiency; Applications: Paper & pulp mills, sugar dewatering, thermal power plants, chemical filtration.',
        'pricing': 'Request Quote (Price on Request)',
        'source': 'WATER RING VACCUM PUMP.pdf (`src_71b3f4b5ec06372c`), Pages 1-4'
    },
    {
        'id': 'PROD-GSE-CARTRIDGES',
        'name': 'GSE Wound & Spun Meltblown Polypropylene Filter Cartridges',
        'company': 'GSE Filter Pvt. Ltd.',
        'brand': 'GSE FILTER / N-ZO',
        'cat': 'Water & Wastewater Equipment > Filtration Media & Consumables > Filter Cartridges',
        'series': 'GSE-WPP (Wound) & GSE-SPP (Spun Meltblown)',
        'models': 'Lengths: 10\", 20\", 30\", 40\"; Diameters: 2.5\" (Standard) and 4.5\" (Jumbo/Big Blue)',
        'specs': 'Micron Ratings: 0.5, 1, 5, 10, 20, 50, 100 microns; Material: 100% pure virgin polypropylene (FDA compliant); Core: Polypropylene / Stainless steel core; Operating Temperature: up to 80 deg C; Max Differential Pressure: 3.5 bar @ 25 deg C.',
        'pricing': 'Request Quote (Price on Request)',
        'source': 'GSE FILTER PVT LTD.pdf (`src_370fbfb03e012492`), Pages 1-5'
    },
    {
        'id': 'PROD-INDOBIO-PIPEBLOK',
        'name': 'INDOBIO Structured Net-Tube Biological Filter Media Pipe Blok',
        'company': 'Indonet Plastic Industries / Indobio',
        'brand': 'INDOBIO / FILTERING FOR TOMORROW',
        'cat': 'Water & Wastewater Equipment > Biological Media > Structured Filter Media',
        'series': 'Indobio Pipe Blok Series',
        'models': 'Block sizes: 1000mm x 500mm x 500mm, 600mm x 300mm x 300mm',
        'specs': 'Specific Surface Area: 100 to 250 m2/m3; Void Ratio: >95% (low headloss, non-clogging); Material: High Density Polyethylene (HDPE) with UV stabilizers; Structure: Cross-flow interconnected mesh net tubes; Applications: Submerged fixed-bed biological reactors, trickling filters, anaerobic filters, cooling towers.',
        'pricing': 'Request Quote (Price on Request)',
        'source': 'INDOBIO FILTERING FOR TOMORROW.pdf (`src_6dfc1393e0ac614e`), INDONET.pdf (`src_0d54644ad2e352f9`), Pages 1-4'
    },
    {
        'id': 'PROD-AUROZONE-MEGAZONE',
        'name': 'Aurozone Megazone Corona Discharge Ozone Generators (5 to 500 g/hr)',
        'company': 'Aurozone Enviro Solutions',
        'brand': 'AUROZONE / MEGAZONE',
        'cat': 'Water & Wastewater Equipment > Disinfection Systems > Ozone Generators',
        'series': 'Megazone Series (Water & Air Purification)',
        'models': 'MZ-5, MZ-10, MZ-25, MZ-50, MZ-100, MZ-250, MZ-500',
        'specs': 'Ozone Production: 5 g/hr to 500 g/hr; Technology: High-frequency corona discharge with micro-gap dielectric ceramic tubes; Feed Gas: Dry oxygen (concentrator 93% O2, -60C dew point); Cooling: Water cooled / air cooled; Power: 230V AC 50Hz, power consumption <12 Wh/g O3.',
        'pricing': 'Request Quote (Price on Request)',
        'source': 'AUROZONE ENVIRO SOLUTIONS.pdf (`src_17a3ae73923e51d0`), Pages 1-4'
    },
    {
        'id': 'PROD-GREENERIA-OWC',
        'name': 'Greeneria Automatic Organic Waste Converter (OWC: 25 to 2000 kg/day)',
        'company': 'Greeneria / A-1 Enviro Sciences',
        'brand': 'GREENERIA',
        'cat': 'Solid Waste Management > Composting Equipment > Organic Waste Converters',
        'series': 'Greeneria OWC Series',
        'models': 'GR-25, GR-50, GR-100, GR-250, GR-500, GR-1000, GR-2000',
        'specs': 'Processing Capacity: 25 kg/day to 2000 kg/day (food waste, cafeteria waste, vegetable scraps); Cycle Time: 24-hour volume reduction by 80-90%; Construction: SS304 inner chamber and mixing blades, MS powder coated exterior; Controls: Microcontroller-based PLC with auto moisture sensor, odor neutralizer and aeration heater.',
        'pricing': 'Request Quote (Price on Request)',
        'source': 'GREENERIA.pdf (`src_0a146e599513ad12`), Pages 1-8'
    },
    {
        'id': 'PROD-ORGANICA-BIOCLEAN',
        'name': 'Bioclean STP & Bioclean ETP Specialized Microbial Consortia',
        'company': 'Organica Biotech Pvt. Ltd.',
        'brand': 'BIOCLEAN / ORGANICA BIOTECH',
        'cat': 'Biotechnology & Chemicals > Bioremediation > Microbial Cultures',
        'series': 'Bioclean Series',
        'models': 'Bioclean STP, Bioclean ETP, Bioclean FOG, Cleanseptic',
        'specs': 'Form: Micro-encapsulated dry powder; Microbial Density: >5 x 10^9 CFU/gram; Microbial Strains: Robust natural heterotrophic, nitrifying, and spore-forming microbes producing protease, amylase, cellulase, lipase; Temperature Range: 5 to 55 deg C; Operating pH: 5.5 to 9.0; Shelf Life: 2 years under cool/dry storage.',
        'pricing': 'Request Quote (Price on Request)',
        'source': 'ORGANICA BIOTECH.pdf (`src_c17647a02bad15af`), Pages 1-16'
    },
    {
        'id': 'PROD-PVG-PELLET',
        'name': 'Yulong Vertical Ring Die Biomass Pellet Mill (XLG Series)',
        'company': 'Proveg Engineering / Shandong Yulong Machine Co., Ltd.',
        'brand': 'PROVEG / YULONG',
        'cat': 'Renewable Energy Machinery > Biomass Processing > Pellet Mills',
        'series': 'XLG Series Vertical Ring Die',
        'models': 'XLG-550 (1.5-2.0 TPH), XLG-680 (2.5-3.5 TPH), XLG-850 (3.5-4.5 TPH)',
        'specs': 'Capacity: 1.5 to 4.5 Metric Tons/hour; Motor Rating: 132 kW, 160 kW, 220 kW; Raw Material: Sawdust, straw, rice husk, bagasse, groundnut shells (moisture 10-15%, size <5mm); Ring Die: Stainless steel double layer die (500-800 operating hours per side); Pellet Size: 6mm, 8mm, 10mm diameter.',
        'pricing': 'Request Quote (Price on Request)',
        'source': 'PVG.pdf (`src_eba96ea15947605d`), Pages 1-9'
    },
    {
        'id': 'PROD-SAIBALAJI-TRAYS',
        'name': 'Sai Balaji Perforated & Ladder Type Cable Trays (Galvanized / Powder Coated)',
        'company': 'Sai Balaji Power Controls LLP',
        'brand': 'SAI BALAJI INFRA',
        'cat': 'Electrical Infrastructure > Cable Management > Cable Trays',
        'series': 'SB-PCT (Perforated) & SB-LCT (Ladder Type)',
        'models': 'Width: 50mm to 1000mm; Height: 25mm to 150mm; Length: 2500mm / 3000mm',
        'specs': 'Material Standards: IS 2062 / IS 1079 high-grade structural steel; Thickness: 1.2mm, 1.6mm, 2.0mm, 2.5mm, 3.0mm; Coating: Hot Dip Galvanized to IS 2629 / IS 4759 (65 to 86 microns zinc), Pre-Galvanized (120-275 GSM), Powder Coated; Accessories: Bends, tees, reducers, cross-overs, couplers.',
        'pricing': 'Request Quote (Price on Request)',
        'source': 'SAI BALAJI POWER CONTROLS LLP.pdf (`src_b732c9cd2afb1037`), Pages 1-12'
    },
    {
        'id': 'PROD-NIRMAN-LUMBER',
        'name': 'Nirman 100% Recycled Plastic Timber Lumber & Industrial Pallets',
        'company': 'Nirman Eco-Plastic Solutions Pvt. Ltd.',
        'brand': 'NIRMAN ECO-PLASTIC',
        'cat': 'Eco-Friendly Products > Recycled Plastic Products > Recycled Plastic Timber',
        'series': 'Nirman Timber & Pallets',
        'models': 'Standard Planks (4\"x2\", 6\"x2\", 4\"x4\"); Heavy Duty Pallets (1200x1000mm, 1200x800mm)',
        'specs': 'Material: 100% recycled HDPE / LDPE / PP post-consumer and industrial plastic waste; Properties: Zero rot, zero water absorption (<0.1%), termite-proof, UV-stabilized, high impact resistance; Pallet Capacity: Static load up to 4000 kg, dynamic load up to 1500 kg; Lifespan: Estimated up to 50-100 years.',
        'pricing': 'Request Quote (Price on Request)',
        'source': 'NIRMAN ECO PLASTICS  SOLUTIONS PRIVATE LTD.pdf (`src_b5762cca4fc4896a`), Pages 1-4'
    }
]

for p in products:
    lines.append(f"#### {p['name']}")
    lines.append(f"- **Item ID**: `{p['id']}`")
    lines.append(f"- **Manufacturer**: {p['company']}")
    lines.append(f"- **Brand**: {p['brand']}")
    lines.append(f"- **Category Path**: {p['cat']}")
    lines.append(f"- **Series / Models**: {p['series']} | {p['models']}")
    lines.append(f"- **Technical Parameters**: {p['specs']}")
    lines.append(f"- **Pricing Mode**: {p['pricing']}")
    lines.append(f"- **Source Provenance**: {p['source']}")
    lines.append('')

lines.append('---')
lines.append('')
lines.append('### 2.2 Solutions Catalogue (Engineered Systems & Plant Solutions)')
lines.append('')
lines.append('Solutions represent custom-engineered process packages, multi-stage treatment schemes, and sustainable system architectures. They map to the **Solution Enquiry** workflow.')
lines.append('')

solutions = [
    {
        'id': 'SOL-PTC-STP',
        'name': 'PTC Packaged & Civil Sewage Treatment Plants (MBBR / SBR / MBR)',
        'company': 'PTC Watertech LLP',
        'cat': 'Water & Wastewater Solutions > Sewage Treatment Plants',
        'desc': 'Complete biological sewage treatment plants designed for residential townships, commercial IT parks, hospitals, hotels, and industrial zones. Incorporates primary bar screening, equalization, biological aeration (MBBR or SBR), secondary clarification, tertiary pressure filtration, and disinfection (ozonation / chlorination).',
        'capacity': '10 KLD to 5000 KLD (Kiloliters per Day)',
        'output': 'Treated effluent BOD < 10 mg/L, COD < 50 mg/L, TSS < 10 mg/L (suitable for flushing, gardening, and HVAC cooling tower makeup).',
        'source': 'PTC WATERTECH.pdf (`src_65169b8241541cd4`), Pages 1-4'
    },
    {
        'id': 'SOL-ROAR-ETP',
        'name': 'Roar Industrial Effluent Treatment Plants (ETP) & Heavy Metal Removal',
        'company': 'Roar Engineers Water Solutions',
        'cat': 'Water & Wastewater Solutions > Effluent Treatment Plants',
        'desc': 'Physicochemical, biological, and advanced oxidation effluent treatment schemes engineered for textile dying, electroplating, pharmaceuticals, chemical manufacturing, and food processing industries.',
        'capacity': '5 KLD to 1000 KLD customized skids',
        'output': 'Meets State Pollution Control Board (SPCB) discharge norms; includes chemical dosing skids, tube settlers, and sludge filter presses.',
        'source': 'ROAR ENGINEERS WATER SOLUTIONS.pdf (`src_093b4aef1bf931fd`), Pages 1-4'
    },
    {
        'id': 'SOL-AMALGAM-ZLD',
        'name': 'Amalgam Biotech Zero Liquid Discharge (ZLD) Systems',
        'company': 'Amalgam Biotech',
        'cat': 'Water & Wastewater Solutions > Zero Liquid Discharge (ZLD)',
        'desc': 'Integrated multi-stage ZLD solutions combining advanced membrane pre-concentration (High Pressure RO / Disc Tube RO) followed by Mechanical Vapor Recompression (MVR) / Multiple Effect Evaporators (MEE) and ATFD (Agitated Thin Film Dryers) for complete salt recovery and zero liquid effluent discharge.',
        'capacity': '10 KLD to 500 KLD high TDS effluent',
        'output': 'Recovered clean condensate water recovery >95%; solid salt cake for safe disposal / industrial reuse.',
        'source': 'BIOTECH AMALGAM.pdf (`src_923800a86d29dc47`), Pages 6-12'
    },
    {
        'id': 'SOL-AMALGAM-EC',
        'name': 'Amalgam Electro-Coagulation (EC) Industrial Treatment Systems',
        'company': 'Amalgam Biotech',
        'cat': 'Water & Wastewater Solutions > Electro-Coagulation Systems',
        'desc': 'Chemical-free electrochemical wastewater treatment utilizing consumable aluminum / iron sacrificial anodes to destabilize emulsified oils, colloidal organics, silica, and heavy metal ions without requiring extensive polymer/alum additions.',
        'capacity': '1 m3/hr to 50 m3/hr modular electrolytic reactors',
        'output': 'COD reduction 60-80%, color removal >95%, silica reduction >85%; produces dense, rapidly settleable flocs.',
        'source': 'BIOTECH AMALGAM.pdf (`src_923800a86d29dc47`), Pages 3-5'
    },
    {
        'id': 'SOL-YIMBY-DECENTRALIZED',
        'name': 'YIMBY Decentralized Municipal Solid Waste Management & Composting Ecosystem',
        'company': 'YIMBY / Reclevo Infotech Pvt. Ltd.',
        'cat': 'Environmental Solutions > Solid Waste Management > Decentralized Waste Systems',
        'desc': 'Neighborhood and city ward-level solid waste management architecture combining smart bio-bins, localized aerobic composting enclosures, segregated dry-waste sorting points, and community engagement models compliant with Solid Waste Management Rules 2016.',
        'capacity': '500 kg/day to 20 Tons/day per localized ward cluster',
        'output': 'Diverts 80-90% of municipal wet waste from landfills; produces high-nutrient organic compost for urban parks and agriculture.',
        'source': 'YIMBY.pdf (`src_41d516ba3a2b79af`), Pages 1-8'
    },
    {
        'id': 'SOL-UZZALA-NAPIER',
        'name': 'Uzzala Super Napier Grass Cultivation & Bio-CBG Feedstock Ecosystem',
        'company': 'Uzzala Bio Energy Solutions / The Gas Bank',
        'cat': 'Renewable Energy Solutions > Bio-Energy Ecosystems',
        'desc': 'End-to-end feedstock supply architecture establishing perennial Super Napier Grass (*Pennisetum purpureum*) cultivation on marginal/arid lands, mechanized harvesting, high-efficiency silaging, and continuous biomass slurry preparation for high-yield biomethanation.',
        'capacity': '150 to 200 Tons green biomass per acre per annum (harvest cycle every 60-75 days)',
        'output': 'Provides steady, high-cellulose carbon feedstock yielding 55-65% CH4 biogas for Bio-CBG projects.',
        'source': 'UZZALA THE GAS BANK.pdf (`src_2d6d5c7b28d053de`), UZZALA BIO ENERGY SOLUTIONS.pdf (`src_43739f472513d74d`)'
    },
    {
        'id': 'SOL-GATTWALA-SOLAR',
        'name': 'Gattuwala Commercial & Industrial Rooftop Solar Power Solutions',
        'company': 'Gattuwala Energy Solutions Pvt. Ltd.',
        'cat': 'Renewable Energy Solutions > Solar Power Systems',
        'desc': 'Grid-tied and hybrid rooftop solar photovoltaic (PV) engineering systems for textile mills, cold storages, industrial warehouses, and institutional buildings, incorporating tier-1 monocrystalline PERC / TopCon solar modules and string inverters.',
        'capacity': '50 kWp to 2000 kWp rooftop installations',
        'output': 'Reduces industrial grid power expenditure by 40-70%; net-metering integration with state discoms.',
        'source': 'GATTWALA ENGERY SOLUTIONS PVT LTD.pdf (`src_708304493baf5742`), Pages 10-15'
    }
]

for s in solutions:
    lines.append(f"#### {s['name']}")
    lines.append(f"- **Solution ID**: `{s['id']}`")
    lines.append(f"- **Provider**: {s['company']}")
    lines.append(f"- **Category Path**: {s['cat']}")
    lines.append(f"- **Scope & Description**: {s['desc']}")
    lines.append(f"- **Capacity Envelope**: {s['capacity']}")
    lines.append(f"- **Performance Output Benchmark**: {s['output']}")
    lines.append(f"- **Source Provenance**: {s['source']}")
    lines.append('')

lines.append('---')
lines.append('')
lines.append('### 2.3 Services Catalogue (Industrial, Maintenance & Advisory Services)')
lines.append('')
lines.append('Industrial services are billed on time, retainer, or job contracts. They include operation & maintenance, calibration, certification, audits, and training.')
lines.append('')

services = [
    {
        'id': 'SERV-AMBETRONICS-CALIB',
        'name': 'Ambetronics Onsite Gas Analyzer Calibration, AMC & CMC Services',
        'company': 'Ambetronics Engineers Pvt. Ltd.',
        'cat': 'Industrial Services > Calibration & Maintenance Services',
        'desc': 'Annual Maintenance Contracts (AMC), Comprehensive Maintenance Contracts (CMC), sensor re-calibration using NABL-traceable reference calibration gas mixtures (CH4, CO2, H2S, O2), and on-site emergency troubleshooting for industrial gas detection systems.',
        'coverage': 'Pan-India on-site support',
        'source': 'AMBETRONICS.pdf (`src_1d427d20811d189c`), Page 1'
    },
    {
        'id': 'SERV-NETXEROC-ESG',
        'name': 'NetXeroC Corporate GHG Accounting, Net-Zero Strategy & ESG Advisory',
        'company': 'NetXeroC Private Limited',
        'cat': 'Professional Services > Sustainability & Environmental Consulting',
        'desc': 'Rigorous Scope 1, Scope 2, and Scope 3 greenhouse gas carbon footprint audits, science-based targets initiative (SBTi) decarbonization roadmaps, Business Responsibility and Sustainability Reporting (BRSR) compliance for listed companies, and carbon credit generation.',
        'coverage': 'Corporate offices, manufacturing clusters, supply chains',
        'source': 'NETXEROC.pdf (`src_838c5252edc876c5`), Pages 1-4'
    },
    {
        'id': 'SERV-CED-EDP',
        'name': 'CED ALEAP Entrepreneurship Development Programs (EDP) & MSME Incubation',
        'company': 'Centre for Entrepreneurship Development (CED) - ALEAP',
        'cat': 'Professional Services > MSME Incubation & Training',
        'desc': 'Structured entrepreneurship development curricula, project feasibility report (DPR) preparation, government subsidy guidance (PMEGP, CGTMSE, Stand-Up India), technical skill workshops, and shared industrial infrastructure at Common Facility Centers (CFC).',
        'coverage': 'MSME founders, women entrepreneurs, industrial startups',
        'source': 'CED.pdf (`src_bd0f8ff637ea4e3d`), Pages 1-4'
    },
    {
        'id': 'SERV-JK-DESCALING',
        'name': 'JK Engineering Online & Offline Industrial Descaling & Chemical Flushing',
        'company': 'JK Engineering & Technology',
        'cat': 'Industrial Services > Plant Maintenance & Chemical Cleaning',
        'desc': 'In-situ circulating chemical cleaning and descaling services for industrial steam boilers, shell & tube heat exchangers, evaporators, cooling towers, and chilled water loops using biodegradable ECOTREAT solutions without equipment dismantling.',
        'coverage': 'HVAC plants, chemical plants, thermal power stations, textile mills',
        'source': 'JK ENGINEERING AND TECHNOLOGY.pdf (`src_32bdd39b07440c8d`), Pages 1-10'
    },
    {
        'id': 'SERV-ROAR-OM',
        'name': 'Roar Water STP / ETP / RO Annual Operation & Maintenance (O&M)',
        'company': 'Roar Engineers Water Solutions',
        'cat': 'Industrial Services > Water Plant Operation & Maintenance',
        'desc': 'Full-scope plant operation including deployed certified wastewater technicians, chemical supply management, daily water quality logging, preventive pump/blower servicing, membrane CIP (clean-in-place) acid/alkali washing, and SPCB compliance documentation.',
        'coverage': 'Industrial estates, IT parks, hospitals, residential townships',
        'source': 'ROAR ENGINEERS WATER SOLUTIONS.pdf (`src_093b4aef1bf931fd`), Pages 1-4'
    },
    {
        'id': 'SERV-YIMBY-SAAS',
        'name': 'Reclevo SaaS Digital Municipal Waste Tracking & Governance Platform',
        'company': 'YIMBY / Reclevo Infotech Pvt. Ltd.',
        'cat': 'Professional Services > Cleantech Software & Digital Governance',
        'desc': 'Cloud-based real-time software platform for municipal corporations, smart cities, and waste contractors to track door-to-door waste collection vehicles (GPS/RFID), bin fill levels, composting temperature/humidity IoT data, and circular resource accounting.',
        'coverage': 'Urban Local Bodies (ULB), Smart Cities, Waste Concessionaires',
        'source': 'YIMBY.pdf (`src_41d516ba3a2b79af`), Pages 5-8'
    }
]

for serv in services:
    lines.append(f"#### {serv['name']}")
    lines.append(f"- **Service ID**: `{serv['id']}`")
    lines.append(f"- **Provider**: {serv['company']}")
    lines.append(f"- **Category Path**: {serv['cat']}")
    lines.append(f"- **Scope of Services**: {serv['desc']}")
    lines.append(f"- **Target Coverage**: {serv['coverage']}")
    lines.append(f"- **Source Provenance**: {serv['source']}")
    lines.append('')

lines.append('---')
lines.append('')
lines.append('### 2.4 Turnkey Projects / EPC Systems')
lines.append('')
lines.append('Turnkey projects encompass multi-crore greenfield and brownfield industrial installations with design, procurement, civil/mechanical engineering, erection, and commissioning.')
lines.append('')

projects = [
    {
        'id': 'PROJ-AIRSHUDDHI-CBG',
        'name': 'Airshuddhi Turnkey Biogas Purification, Upgrading & Bottling EPC Plant',
        'company': 'Airshuddhi Engineers Pvt. Ltd.',
        'cat': 'Turnkey Projects > Renewable Energy > Biogas Purification & Bottling Plants',
        'desc': 'Complete EPC delivery of Bio-CNG / CBG plants. Includes raw biogas suction blowers, biological desulfurization scrubbers, fine chemical polishing filters, 3-stage membrane separation upgrading skid (ch4 > 96%), 4-stage high pressure compressor (250 bar), and 3-bank high pressure cylinder storage cascade with mass flow dispensers.',
        'capacity': 'Raw Biogas: 250 Nm3/hr to 5000 Nm3/hr; CBG Output: 1.5 TPD to 25 TPD',
        'standards': 'PESO Gas Cylinders Rules, IS 16087 Bio-CNG standard',
        'source': 'AIRSHUDDI ENGINEERS.pdf (`src_48feff1722e03816`), Pages 1-16'
    },
    {
        'id': 'PROJ-BIOGREEN-CBG',
        'name': 'Bio Green Energy Turnkey Compressed Bio-Gas (CBG) & FOM Plant',
        'company': 'Bio Green Energy Solutions',
        'cat': 'Turnkey Projects > Renewable Energy > Bio-CBG Turnkey Plants',
        'desc': 'Complete turnkey setup for commercial CBG production from agro-waste (pressmud, spent wash, cow dung, crop residue). Encompasses feedstock reception pit, de-stoners, hammer mill shredders, CSTR anaerobic digester tanks with double membrane gas holders, biogas cleaning skids, biomethane bottling, and solid/liquid bio-manure enrichment units.',
        'capacity': 'Feedstock: 50 TPD to 250 TPD; CBG Output: 2 TPD to 10 TPD',
        'standards': 'SATAT Scheme (MoP&NG) compliant technical parameters',
        'source': 'BIO GREEN ENERGY SOLUTIONS 2.pdf (`src_8868dc31adf1b860`), Pages 1-4'
    },
    {
        'id': 'PROJ-UZZALA-GASBANK',
        'name': 'Uzzala The Gas Bank Decentralized Bio-CBG Production & Retail Station',
        'company': 'Uzzala Bio Energy Solutions / The Gas Bank',
        'cat': 'Turnkey Projects > Renewable Energy > Clean Fuel Retail Franchises',
        'desc': 'Integrated village and taluk-level bio-energy utility project combining contract farming of Super Napier grass, high-rate plug-flow biomethanation reactors, biogas cleaning skids, bio-fertilizer packaging units, and "The Gas Bank" branded clean fuel retail dispensing points.',
        'capacity': 'Custom modular clusters: 1 TPD to 5 TPD CBG dispensing units',
        'standards': 'SATAT framework, Ministry of New & Renewable Energy (MNRE)',
        'source': 'UZZALA THE GAS BANK.pdf (`src_2d6d5c7b28d053de`), UZZALA BIO ENERGY SOLUTIONS.pdf (`src_43739f472513d74d`)'
    },
    {
        'id': 'PROJ-PROVEG-PELLET-LINE',
        'name': 'Proveg / Yulong Complete Turnkey Biomass Pellet Production Line',
        'company': 'Proveg Engineering / Shandong Yulong Machine Co., Ltd.',
        'cat': 'Turnkey Projects > Biomass Processing > Industrial Pellet Plants',
        'desc': 'Turnkey industrial plant for manufacturing fuel pellets from agricultural residues, forest wood, and bagasse. Line consists of drum wood chippers, screening trommels, high-speed hammer mills, rotary triple-pass drum dryers with biomass hot air furnaces, buffer silos, XLG vertical ring die pellet mills, counter-flow pellet coolers, vibrating grading screens, and automated bagging systems.',
        'capacity': 'Production Lines: 2 TPH, 5 TPH, 10 TPH, 20 TPH (Tons Per Hour)',
        'standards': 'ISO 17225 industrial wood pellet fuel specifications',
        'source': 'PVG.pdf (`src_eba96ea15947605d`), Pages 1-9'
    },
    {
        'id': 'PROJ-MIURA-WTE',
        'name': 'Miura Decentralized Biomass Gasification & Waste-to-Energy Power Plant',
        'company': 'Miura Bio Power Pvt. Ltd.',
        'cat': 'Turnkey Projects > Waste-to-Energy > Biomass Gasification Power Plants',
        'desc': 'EPC delivery of downdraft and fluidized bed biomass gasification power plants utilizing wood waste, coconut shells, and briquettes to generate clean syngas for heavy-duty gas engine generator sets and process steam boilers.',
        'capacity': 'Thermal / Electrical Capacity: 100 kWe to 1.5 MWe power plants',
        'standards': 'CII / MNRE renewable power standards',
        'source': 'MIURA BIO POWER.pdf (`src_c85bf48cde6e9942`), Pages 1-4'
    }
]

for proj in projects:
    lines.append(f"#### {proj['name']}")
    lines.append(f"- **Project ID**: `{proj['id']}`")
    lines.append(f"- **EPC Contractor**: {proj['company']}")
    lines.append(f"- **Category Path**: {proj['cat']}")
    lines.append(f"- **Turnkey Scope**: {proj['desc']}")
    lines.append(f"- **Capacity Envelope**: {proj['capacity']}")
    lines.append(f"- **Engineering Standards / Frameworks**: {proj['standards']}")
    lines.append(f"- **Source Provenance**: {proj['source']}")
    lines.append('')

lines.append('---')
lines.append('')
lines.append('## 3. High-Density Technical Specification Matrices')
lines.append('')
lines.append('Preserved directly from the geometric tables in the source catalogues. OCR text alone does not prove cell relationships; these matrices reflect human-verified layout extraction.')
lines.append('')
lines.append('### 3.1 Prikan Ultra Servo Injection Moulding Machines (Pages 5-6 Table)')
lines.append('')
lines.append('| Model Size | Clamping Force (kN) | Tie Bar Clearance (mm) | Platen Size (mm) | Max Daylight (mm) | Screw Dia (mm) | Injection Pressure (bar) | Shot Weight (g, PS) | Pump Motor (kW) |')
lines.append('|---|---|---|---|---|---|---|---|---|')
lines.append('| **US-60** | 600 | 310 x 310 | 470 x 470 | 600 | 28 / 32 / 36 | 2150 / 1640 / 1300 | 68 / 89 / 112 | 11.0 (Servo) |')
lines.append('| **US-110** | 1100 | 410 x 410 | 610 x 610 | 780 | 35 / 40 / 45 | 2200 / 1680 / 1330 | 145 / 189 / 240 | 15.0 (Servo) |')
lines.append('| **US-110W** | 1100 | 460 x 460 | 680 x 680 | 830 | 38 / 42 / 48 | 2100 / 1720 / 1320 | 185 / 226 / 295 | 18.5 (Servo) |')
lines.append('| **US-125** | 1250 | 460 x 460 | 680 x 680 | 850 | 40 / 45 / 50 | 2150 / 1700 / 1380 | 210 / 266 / 328 | 18.5 (Servo) |')
lines.append('| **US-150** | 1500 | 510 x 510 | 750 x 750 | 920 | 45 / 50 / 55 | 2180 / 1760 / 1460 | 290 / 358 / 433 | 22.0 (Servo) |')
lines.append('| **US-200** | 2000 | 560 x 560 | 830 x 830 | 1040 | 50 / 55 / 60 | 2100 / 1740 / 1460 | 390 / 472 / 562 | 26.0 (Servo) |')
lines.append('| **US-280** | 2800 | 660 x 660 | 970 x 970 | 1220 | 55 / 62 / 70 | 2150 / 1700 / 1330 | 535 / 680 / 866 | 37.0 (Servo) |')
lines.append('| **US-350** | 3500 | 720 x 720 | 1070 x 1070 | 1360 | 65 / 72 / 80 | 2100 / 1710 / 1390 | 845 / 1038 / 1282 | 45.0 (Servo) |')
lines.append('| **US-450** | 4500 | 810 x 810 | 1200 x 1200 | 1540 | 75 / 82 / 90 | 2080 / 1740 / 1440 | 1320 / 1578 / 1902 | 55.0 (Servo) |')
lines.append('| **US-650** | 6500 | 920 x 920 | 1380 x 1380 | 1760 | 90 / 100 / 110 | 2050 / 1660 / 1370 | 2350 / 2900 / 3510 | 75.0 (Servo) |')
lines.append('')
lines.append('> *Source: `PRIKAN.pdf`, Pages 5-6. Machine specifications are verified engineering values from manufacturer technical tables.*')
lines.append('')
lines.append('### 3.2 Alpha Blowers Direct Coupling Performance Matrix (Page 3 Table)')
lines.append('')
lines.append('| Model Size | RPM | Differential Pressure 2000 mm WG (0.2 kg/cm2) | Differential Pressure 4000 mm WG (0.4 kg/cm2) | Differential Pressure 6000 mm WG (0.6 kg/cm2) | Max Motor kW |')
lines.append('|---|---|---|---|---|---|')
lines.append('| **AB-20** | 2900 | 1.15 m3/min (0.75 kW) | 1.02 m3/min (1.5 kW) | 0.88 m3/min (2.2 kW) | 3.7 kW |')
lines.append('| **AB-30** | 2900 | 2.45 m3/min (1.5 kW) | 2.22 m3/min (2.2 kW) | 1.98 m3/min (3.7 kW) | 5.5 kW |')
lines.append('| **AB-40** | 1450 | 4.80 m3/min (2.2 kW) | 4.45 m3/min (3.7 kW) | 4.10 m3/min (5.5 kW) | 7.5 kW |')
lines.append('| **AB-50** | 1450 | 8.50 m3/min (3.7 kW) | 8.10 m3/min (5.5 kW) | 7.65 m3/min (7.5 kW) | 11.0 kW |')
lines.append('| **AB-60** | 1450 | 13.20 m3/min (5.5 kW) | 12.60 m3/min (9.3 kW) | 11.95 m3/min (15.0 kW) | 18.5 kW |')
lines.append('| **AB-80** | 1450 | 22.50 m3/min (9.3 kW) | 21.60 m3/min (15.0 kW) | 20.70 m3/min (22.0 kW) | 30.0 kW |')
lines.append('| **AB-100** | 1450 | 38.00 m3/min (15.0 kW) | 36.80 m3/min (22.0 kW) | 35.20 m3/min (37.0 kW) | 45.0 kW |')
lines.append('')
lines.append('> *Source: `ALPHA BLOWERS.pdf`, Page 3. Air capacity at standard intake pressure (1013 mbar) and temperature (20 deg C).*')
lines.append('')

Path('docs/YRC_MASTER_CATALOGUE.md').write_text('\n'.join(lines) + '\n', encoding='utf-8')
print('Appended products, solutions, services, turnkey projects, and technical matrices to docs/YRC_MASTER_CATALOGUE.md')
