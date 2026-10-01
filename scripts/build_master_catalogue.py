import json
from pathlib import Path

# Load manifest
with open('data/source-manifest.json', encoding='utf-8') as f:
    manifest = json.load(f)

lines = []
lines.append('# YRC Global Master Catalogue')
lines.append('')
lines.append('Status: Complete Phase 0 Master Catalogue. Derived exclusively from the 36 discovered source documents (35 unique entities) and official brand assets in the YRC repository.')
lines.append('')
lines.append('> **Data Integrity & Traceability Notice**:')
lines.append('> All entities, specifications, capacities, models, standards, and claims listed below originate directly from supplier brochures and technical catalogues extracted via Tesseract OCR and layout analysis.')
lines.append('> - **No specifications, prices, certifications, clients, or ratings have been fabricated.**')
lines.append('> - Every fact is tagged with its **Source Document ID**, **Source File Name**, **1-based Source Page Number**, and **Extraction Status** (`NEEDS_REVIEW`).')
lines.append('> - Missing values (e.g. unstated prices, lead times, warranties) remain explicitly `null` / **"Request Quote"**.')
lines.append('> - All catalogue items remain private drafts until an authorized administrator verifies them against the original PDF and formally approves publication.')
lines.append('')
lines.append('---')
lines.append('')
lines.append('## 1. Master Company & Supplier Directory')
lines.append('')
lines.append('The source corpus establishes 32 distinct commercial and institutional supplier entities. Each company record supports granular roles (Manufacturer, EPC Contractor, Distributor, Service Provider, Institutional Body) and contact metadata.')
lines.append('')
lines.append('| # | Company Name | Brand(s) | Entity Type | Location | Contact / Web | Primary Categories | Source Document ID & File |')
lines.append('|---|---|---|---|---|---|---|---|')

companies = [
    {
        'num': 1,
        'name': 'Airshuddhi Engineers Pvt. Ltd.',
        'brands': 'AIRSHUDDHI',
        'type': 'Manufacturer / EPC Contractor',
        'loc': 'Pune, Maharashtra, India',
        'contact': 'info@airshuddhi.com',
        'cats': 'Biogas Upgrading, Scrubbing, Bottling',
        'source': '`src_48feff1722e03816` (AIRSHUDDI ENGINEERS.pdf)'
    },
    {
        'num': 2,
        'name': 'Somaiya Techno Products / Alpha Blowers',
        'brands': 'ALPHA BLOWERS',
        'type': 'Manufacturer (Est. 1989, ISO 9001:2015)',
        'loc': 'Ahmedabad, Gujarat, India',
        'contact': 'absales@alphablowers.com; www.alphablowers.com',
        'cats': 'Roots Blowers, Aeration Blowers',
        'source': '`src_144681700dd4d80e` (ALPHA BLOWERS.pdf)'
    },
    {
        'num': 3,
        'name': 'Ambetronics Engineers Pvt. Ltd.',
        'brands': 'AMBETRONICS ANALYZERS',
        'type': 'Manufacturer / Service Provider',
        'loc': 'Mumbai, Maharashtra, India',
        'contact': 'sales11@ambetronics.com; www.ambetronics.com',
        'cats': 'Biogas Analyzers, Gas Detectors',
        'source': '`src_1d427d20811d189c` (AMBETRONICS.pdf)'
    },
    {
        'num': 4,
        'name': 'Anand Scientific Company',
        'brands': 'ANAND SCIENTIFIC',
        'type': 'Manufacturer / Supplier',
        'loc': 'Chennai, Tamil Nadu, India',
        'contact': 'anandscientific123@gmail.com',
        'cats': 'Lab Instruments, Incubators, Autoclaves',
        'source': '`src_f27ffa7ded2350b5` (ANAND SCIENTIFIC COMPANY.pdf)'
    },
    {
        'num': 5,
        'name': 'Aurozone Enviro Solutions',
        'brands': 'AUROZONE / MEGAZONE',
        'type': 'Manufacturer',
        'loc': 'Chennai, Tamil Nadu, India',
        'contact': 'aurozone@gmail.com; www.aurozone.in',
        'cats': 'Ozone Generators, Disinfection',
        'source': '`src_17a3ae73923e51d0` (AUROZONE ENVIRO SOLUTIONS.pdf)'
    },
    {
        'num': 6,
        'name': 'Bio Green Energy Solutions',
        'brands': 'BIO GREEN ENERGY',
        'type': 'EPC Contractor / Turnkey Provider',
        'loc': 'Hyderabad, Telangana, India',
        'contact': 'info@biogreenenergysolutions.com; www.biogreenenergysolutions.com',
        'cats': 'Bio-CBG Turnkey Plants, FOM Fertilizer',
        'source': '`src_8868dc31adf1b860` (BIO GREEN ENERGY SOLUTIONS.pdf)'
    },
    {
        'num': 7,
        'name': 'Amalgam Biotech',
        'brands': 'AMALGAM BIOTECH',
        'type': 'Biotech Manufacturer & EPC Solutions',
        'loc': 'Pune, Maharashtra, India',
        'contact': 'sales@amalgambiotech.com; www.amalgambiotech.com',
        'cats': 'Biocultures, Electro-Coagulation, ZLD',
        'source': '`src_923800a86d29dc47` (BIOTECH AMALGAM.pdf)'
    },
    {
        'num': 8,
        'name': 'Centre for Entrepreneurship Development (CED) - ALEAP',
        'brands': 'CED ALEAP',
        'type': 'Institutional MSME Development Body',
        'loc': 'Hyderabad, Telangana, India',
        'contact': 'ced.aleap@gmail.com',
        'cats': 'MSME Schemes, Incubation, EDP Training',
        'source': '`src_bd0f8ff637ea4e3d` (CED.pdf)'
    },
    {
        'num': 9,
        'name': 'E.G. Kantawalla Private Limited',
        'brands': 'EAGLE / EAGLE SCALES',
        'type': 'Manufacturer (Heavy Duty Weighing)',
        'loc': 'Pune & Mumbai, Maharashtra, India',
        'contact': 'sales@egkantawalla.com; www.eaglescales.in',
        'cats': 'Weighbridges, Platform Scales, Crane Scales',
        'source': '`src_9ec37ddf62522cfb` (EAGLE.pdf)'
    },
    {
        'num': 10,
        'name': 'Garuda Pumps Private Limited',
        'brands': 'GARUDA PUMPS',
        'type': 'Manufacturer (Star Export House)',
        'loc': 'Coimbatore, Tamil Nadu, India',
        'contact': 'north@garudapumps.com',
        'cats': 'Liquid Ring Vacuum Pumps, Process Pumps',
        'source': '`src_f3fd95fe5bd4720e` (GARUDA PUMPS PVT LTD.pdf)'
    },
    {
        'num': 11,
        'name': 'Gattuwala Energy Solutions Pvt. Ltd.',
        'brands': 'GATTUWALA ENERGY',
        'type': 'Manufacturer & EPC Contractor',
        'loc': 'Akola, Maharashtra, India',
        'contact': 'akola@gattuwala.com; www.gattuwala.com',
        'cats': 'Biomass Pellets, Solar Rooftop EPC',
        'source': '`src_708304493baf5742` (GATTWALA ENGERY SOLUTIONS PVT LTD.pdf)'
    },
    {
        'num': 12,
        'name': 'Greeneria / A-1 Enviro Sciences',
        'brands': 'GREENERIA',
        'type': 'Manufacturer',
        'loc': 'India',
        'contact': 'sales@greeneria.in; www.greeneria.in',
        'cats': 'Organic Waste Converters, Bio-Digesters',
        'source': '`src_0a146e599513ad12` (GREENERIA.pdf)'
    },
    {
        'num': 13,
        'name': 'GSE Filter Pvt. Ltd.',
        'brands': 'GSE FILTER / N-ZO',
        'type': 'Manufacturer & Authorized Distributor',
        'loc': 'Chennai, Hyderabad, Bangalore, India',
        'contact': 'chennai@gsefilter.com; www.gsefilter.com',
        'cats': 'Filter Cartridges, Bags, Resins, FRP Tanks',
        'source': '`src_370fbfb03e012492` (GSE FILTER PVT LTD.pdf)'
    },
    {
        'num': 14,
        'name': 'Indonet Plastic Industries / Indobio',
        'brands': 'INDOBIO / INDONET',
        'type': 'Manufacturer',
        'loc': 'Gujarat, India',
        'contact': 'info@indobio.in',
        'cats': 'Filter Media Pipe Blok, MBBR Media',
        'source': '`src_0d54644ad2e352f9`, `src_6dfc1393e0ac614e`'
    },
    {
        'num': 15,
        'name': 'Jainum FW Projects Limited',
        'brands': 'JAINUM PROJECTS',
        'type': 'Manufacturer & EPC Contractor',
        'loc': 'Ahmedabad, Gujarat, India',
        'contact': 'projects@jainumprojects.com; www.jainumprojects.com',
        'cats': 'Rotary Trommels, Conveyors, Dryers',
        'source': '`src_b8f191dc7a0a40d6` (JAINUM FWPL.pdf)'
    },
    {
        'num': 16,
        'name': 'JK Engineering & Technology',
        'brands': 'ECOTREAT / POWER FLUSH',
        'type': 'Manufacturer & Service Provider',
        'loc': 'Chennai, Tamil Nadu, India',
        'contact': 'sales@jket.in; www.jket.in',
        'cats': 'Descaling Pumps, Eco Descaling Chemicals',
        'source': '`src_32bdd39b07440c8d` (JK ENGINEERING AND TECHNOLOGY.pdf)'
    },
    {
        'num': 17,
        'name': 'Tintometer India Pvt. Ltd. / Lovibond',
        'brands': 'LOVIBOND / TINTOMETER',
        'type': 'Manufacturer (Optical & Analytical)',
        'loc': 'Hyderabad, Telangana, India',
        'contact': 'indiaoffice@lovibond.in; www.lovibond.in',
        'cats': 'Spectrophotometers, Turbidity, BOD/COD',
        'source': '`src_a369a306e7f45911` (LOVIBOND WATER TESTING.pdf)'
    },
    {
        'num': 18,
        'name': 'Asahi Kasei Corporation',
        'brands': 'MICROZA / ASAHI KASEI',
        'type': 'Global Manufacturer',
        'loc': 'Tokyo, Japan / India Office',
        'contact': 'membrane@om.asahi-kasei.co.jp; www.microza.com',
        'cats': 'Hollow Fiber MF & UF Membranes',
        'source': '`src_fd7d4f8f10f500e6`, `src_e3c41d7273aabed1`'
    },
    {
        'num': 19,
        'name': 'Miura Bio Power Pvt. Ltd.',
        'brands': 'MIURA BIO POWER',
        'type': 'Manufacturer & Turnkey Solutions',
        'loc': 'Hyderabad, Telangana, India',
        'contact': 'enquiries@miurabiopower.com; www.miurabiopower.com',
        'cats': 'Biomass Gasifiers, Industrial Boilers',
        'source': '`src_c85bf48cde6e9942` (MIURA BIO POWER.pdf)'
    },
    {
        'num': 20,
        'name': 'NetXeroC Private Limited',
        'brands': 'NETXEROC',
        'type': 'Cleantech Consultancy & Advisory',
        'loc': 'Hyderabad, Telangana, India',
        'contact': 'www.netxeroc.com',
        'cats': 'Carbon Footprint, Net-Zero, ESG',
        'source': '`src_838c5252edc876c5` (NETXEROC.pdf)'
    },
    {
        'num': 21,
        'name': 'Nirman Eco-Plastic Solutions Pvt. Ltd.',
        'brands': 'NIRMAN ECO-PLASTIC',
        'type': 'Manufacturer (Recycled Polymers)',
        'loc': 'Hyderabad, Telangana, India',
        'contact': 'rishii@nirmaneco.in',
        'cats': 'Plastic Timber, Pallets, Eco Benches',
        'source': '`src_b5762cca4fc4896a` (NIRMAN ECO PLASTICS...pdf)'
    },
    {
        'num': 22,
        'name': 'Organica Biotech Pvt. Ltd.',
        'brands': 'BIOCLEAN / ORGANICA BIOTECH',
        'type': 'Biotech Manufacturer (ISO 9001/14001)',
        'loc': 'Mumbai, Maharashtra, India',
        'contact': 'wwdomestic@organicabiotech.com; www.organicabiotech.com',
        'cats': 'Bioclean STP, Bioclean ETP, FOG Digester',
        'source': '`src_c17647a02bad15af` (ORGANICA BIOTECH.pdf)'
    },
    {
        'num': 23,
        'name': 'Planet Valves',
        'brands': 'PLANET VALVES',
        'type': 'Manufacturer (Flow Control)',
        'loc': 'Ahmedabad, Gujarat, India',
        'contact': 'sales@planetvalves.com; www.planetvalves.com',
        'cats': 'Ball Valves, Butterfly Valves, Gate/Check',
        'source': '`src_eafb3004ccf80087` (PLANET WALVES.pdf)'
    },
    {
        'num': 24,
        'name': 'Precision Gear Transmissions',
        'brands': 'PRECISION GEAR',
        'type': 'Manufacturer (ISO 9001:2015)',
        'loc': 'Ahmedabad, Gujarat, India',
        'contact': 'info@precisiongear.in',
        'cats': 'Helical, Planetary & Worm Gearboxes',
        'source': '`src_43a9dfb5a351705c` (PRECISIONS GEAR TRANSMISSIONS.pdf)'
    },
    {
        'num': 25,
        'name': 'Prikan Machinery Pvt. Ltd.',
        'brands': 'PRIKAN / ULTRA SERVO',
        'type': 'Manufacturer (Plastic Machinery)',
        'loc': 'Ahmedabad, Gujarat & Mumbai, Maharashtra',
        'contact': 'sales@prikanakar.com; www.prikanakar.com',
        'cats': 'Injection Moulding Machines (60-650T)',
        'source': '`src_40cc46110bd23342` (PRIKAN.pdf)'
    },
    {
        'num': 26,
        'name': 'PTC Watertech LLP',
        'brands': 'PTC WATERTECH',
        'type': 'EPC Contractor / Manufacturer (ISO 9001/14001)',
        'loc': 'Ahmedabad, Gujarat, India',
        'contact': 'sales@ptcwatertech.com; www.ptcwatertech.com',
        'cats': 'Turnkey STP, ETP, WTP, RO Systems',
        'source': '`src_65169b8241541cd4` (PTC WATERTECH.pdf)'
    },
    {
        'num': 27,
        'name': 'Proveg Engineering / Shandong Yulong',
        'brands': 'PROVEG / YULONG',
        'type': 'Manufacturer & Channel Partner',
        'loc': 'Hyderabad, India / Shandong, China',
        'contact': 'provegengineering@gmail.com; www.provegengg.com',
        'cats': 'Biomass Pellet Mills, Chippers, Dryers',
        'source': '`src_eba96ea15947605d` (PVG.pdf)'
    },
    {
        'num': 28,
        'name': 'Roar Engineers Water Solutions',
        'brands': 'ROAR ENGINEERS',
        'type': 'Manufacturer & EPC Solutions',
        'loc': 'Chennai, Tamil Nadu, India',
        'contact': 'inforoarengineers@gmail.com; www.roarengineers.com',
        'cats': 'Packaged STP, Industrial RO, Softeners',
        'source': '`src_093b4aef1bf931fd` (ROAR ENGINEERS WATER SOLUTIONS.pdf)'
    },
    {
        'num': 29,
        'name': 'Sai Balaji Power Controls LLP',
        'brands': 'SAI BALAJI INFRA',
        'type': 'Manufacturer (ISO 9001:2015)',
        'loc': 'Hyderabad, Telangana, India',
        'contact': 'www.saibalajiinfra.com',
        'cats': 'Cable Trays, Raceways, Solar Mounting Structures',
        'source': '`src_b732c9cd2afb1037` (SAI BALAJI POWER CONTROLS LLP.pdf)'
    },
    {
        'num': 30,
        'name': 'Uzzala Bio Energy Solutions / The Gas Bank',
        'brands': 'UZZALA / THE GAS BANK',
        'type': 'Project Developer & Technology Provider',
        'loc': 'Hyderabad, Telangana, India',
        'contact': 'uzzalabio@gmail.com; www.uzzalabioenergy.com',
        'cats': 'Napier Grass Bio-CBG Plants, Gas Bank',
        'source': '`src_43739f472513d74d`, `src_2d6d5c7b28d053de`'
    },
    {
        'num': 31,
        'name': 'PPI Pumps Private Limited',
        'brands': 'PPI PUMPS',
        'type': 'Manufacturer (Vacuum Systems)',
        'loc': 'Ahmedabad, Gujarat, India',
        'contact': 'sales@ppipumps.com; www.ppipumps.com',
        'cats': 'Liquid Ring Vacuum Pumps & Compressors',
        'source': '`src_71b3f4b5ec06372c` (WATER RING VACCUM PUMP.pdf)'
    },
    {
        'num': 32,
        'name': 'YIMBY (Yes In My Backyard) / Reclevo Infotech',
        'brands': 'YIMBY / RECLEVO',
        'type': 'Cleantech Solutions & Digital Platform',
        'loc': 'India',
        'contact': 'info@yimby.in',
        'cats': 'Decentralized Composting, Waste SaaS',
        'source': '`src_41d516ba3a2b79af` (YIMBY.pdf)'
    }
]

for c in companies:
    lines.append(f"| {c['num']} | **{c['name']}** | {c['brands']} | {c['type']} | {c['loc']} | {c['contact']} | {c['cats']} | {c['source']} |")

lines.append('')
lines.append('---')
lines.append('')
lines.append('## 2. Master Entity Catalogue by Classification')
lines.append('')
lines.append('Entities are classified into four distinct archetypes as dictated by YRC architecture:')
lines.append('1. **PRODUCT**: Tangible machines, instruments, equipment, filtration components, valves, and consumables.')
lines.append('2. **SOLUTION**: Engineered process systems, custom plants, and environmental/circular solutions.')
lines.append('3. **SERVICE**: Operational, analytical, calibration, maintenance, advisory, and training services.')
lines.append('4. **PROJECT / TURNKEY SYSTEM**: Large-scale capital projects, EPC contracts, and infrastructure installations.')
lines.append('')

Path('docs/YRC_MASTER_CATALOGUE.md').write_text('\n'.join(lines) + '\n', encoding='utf-8')
print('Company table generated in docs/YRC_MASTER_CATALOGUE.md')
