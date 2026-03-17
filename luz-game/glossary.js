// =====================
// LUZ — Energy Glossary
// =====================

const glossaryData = [

  // ── ENERGY SOURCES ──────────────────────────────────────
  { category: "Energy Sources", icon: "☀️", term: "Solar PV (Photovoltaic)",
    definition: "Converts sunlight directly into electricity using semiconductor cells. Panels last 25–30 years with minimal maintenance. Most common form of rooftop and utility-scale solar.",
    caseStudy: "Germany generates 60%+ of its electricity from solar on peak days — despite having less sun than Chicago. It's about quantity of panels, not just sunshine.",
    learnMore: "Search: 'NREL solar basics' or 'EnergySage solar explained'" },

  { category: "Energy Sources", icon: "🌡️", term: "Solar Thermal",
    definition: "Uses the sun's heat — not light — to warm water or drive turbines. Common in rooftop water heaters and large concentrated solar power (CSP) plants in deserts.",
    caseStudy: "The Ivanpah Solar Electric Generating System in the Mojave Desert uses 173,500 mirrors to focus sunlight and power 140,000 homes.",
    learnMore: "Search: 'DOE concentrating solar power'" },

  { category: "Energy Sources", icon: "💨", term: "Wind Energy",
    definition: "Turbines capture kinetic energy from wind and convert it to electricity. Onshore wind is now the cheapest source of electricity in history. Offshore wind is more powerful and consistent.",
    caseStudy: "Iowa generates 60% of its electricity from wind. Texas has more wind power capacity than most countries on Earth.",
    learnMore: "Search: 'WindExchange DOE' or 'AWEA wind energy basics'" },

  { category: "Energy Sources", icon: "💧", term: "Hydropower",
    definition: "Uses flowing or falling water — rivers, dams — to spin turbines. The oldest and largest source of renewable electricity in the U.S., providing about 6% of total generation.",
    caseStudy: "Hoover Dam has powered the American Southwest since 1936. Grand Coulee Dam in Washington is the largest power plant in the U.S.",
    learnMore: "Search: 'EIA hydropower explained'" },

  { category: "Energy Sources", icon: "🌋", term: "Geothermal Energy",
    definition: "Taps heat from inside the Earth to generate electricity or heat buildings. Provides 24/7 baseload power with zero fuel cost. Works best near volcanic or tectonic regions.",
    caseStudy: "Iceland runs on nearly 100% renewable energy — geothermal heats 90% of homes. El Salvador gets 25% of electricity from geothermal plants.",
    learnMore: "Search: 'GEA geothermal basics' or 'DOE geothermal energy'" },

  { category: "Energy Sources", icon: "🌿", term: "Biomass / Bioenergy",
    definition: "Burns organic material — wood, crops, animal waste — to generate heat and electricity. Considered renewable if managed sustainably. Common in rural areas and industrial facilities.",
    caseStudy: "Finland gets 30% of its energy from biomass, mostly forest residues. U.S. paper mills frequently run entirely on wood waste, making them energy self-sufficient.",
    learnMore: "Search: 'DOE biomass basics'" },

  { category: "Energy Sources", icon: "🌊", term: "Tidal / Wave Energy",
    definition: "Harnesses the movement of ocean tides and waves to generate electricity. Still emerging — less than 0.1% of global electricity — but massive untapped potential along coastlines.",
    caseStudy: "Scotland's Pentland Firth tidal project (MeyGen) powers 4,000 homes from underwater turbines. The U.S. has 2,500 TWh/year of offshore wave potential.",
    learnMore: "Search: 'DOE marine energy' or 'ORPC tidal energy'" },

  { category: "Energy Sources", icon: "⚛️", term: "Nuclear Energy",
    definition: "Splits uranium atoms to produce heat that drives turbines. Low carbon emissions but generates radioactive waste. Provides stable 24/7 power with a 90%+ capacity factor.",
    caseStudy: "France gets 70% of its electricity from nuclear — giving it some of Europe's lowest carbon emissions and cheapest electricity prices.",
    learnMore: "Search: 'NRC nuclear basics' or 'World Nuclear Association'" },

  { category: "Energy Sources", icon: "🏭", term: "Fossil Fuels (Coal, Oil, Gas)",
    definition: "Burned to generate energy, releasing CO₂ and pollutants. Cause climate change and local air quality damage. Coal and gas plants are disproportionately located near low-income communities of color.",
    caseStudy: "Chicago's Southeast Side fought for years to shut down two massive petcoke storage facilities. After sustained community organizing, they won in 2019.",
    learnMore: "Search: 'NRDC fossil fuel health impacts' or 'EPA EJScreen'" },

  // ── KEY CONCEPTS ─────────────────────────────────────────
  { category: "Key Concepts", icon: "🔄", term: "Net Metering",
    definition: "A billing policy that credits solar panel owners for extra electricity they send back to the grid. Your meter runs backward when you produce more than you use — reducing your bill.",
    caseStudy: "Illinois' net metering policy lets homeowners earn bill credits for solar production. Utilities in many states have lobbied hard to reduce or eliminate these credits.",
    learnMore: "Search: 'SEIA net metering by state'" },

  { category: "Key Concepts", icon: "🏘️", term: "Community Solar",
    definition: "A shared solar array that lets people subscribe to a portion of a larger project — even renters or those who can't install rooftop panels. Subscribers receive credits on their utility bills.",
    caseStudy: "Illinois' Community Solar program has a dedicated low-income track. Renters in Englewood can subscribe with zero upfront cost and reduce bills 10–15% per year.",
    learnMore: "Search: 'Illinois Shines community solar' or 'EnergySage community solar'" },

  { category: "Key Concepts", icon: "⚖️", term: "Energy Burden",
    definition: "The percentage of household income spent on energy costs. Low-income households and households of color often carry an 8–10%+ energy burden — nearly 3x the national average of 3%.",
    caseStudy: "ACEEE's landmark report found Black households face a 43% higher energy burden than white households — a direct result of older housing stock, redlining, and discriminatory lending history.",
    learnMore: "Search: 'ACEEE energy burden report 2020'" },

  { category: "Key Concepts", icon: "🔌", term: "Microgrid",
    definition: "A small, local power grid that can operate independently from the main grid. Usually runs on solar + batteries. Critical for resilience — keeps lights on when the central grid fails.",
    caseStudy: "After Hurricane Maria devastated Puerto Rico's grid, community microgrids powered hospitals and shelters for months while the main grid stayed down.",
    learnMore: "Search: 'Rocky Mountain Institute microgrids' or 'HOMER microgrid'" },

  { category: "Key Concepts", icon: "🔋", term: "Battery Energy Storage (BESS)",
    definition: "Large battery systems that store electricity produced by solar or wind for use when the sun isn't shining or the wind isn't blowing. Solves the intermittency problem.",
    caseStudy: "Tesla's 100 MW battery in South Australia was built in 100 days. It has saved the state hundreds of millions of dollars by stabilizing the grid during peak demand.",
    learnMore: "Search: 'DOE energy storage basics' or 'BloombergNEF storage tracker'" },

  { category: "Key Concepts", icon: "🌐", term: "Smart Grid",
    definition: "An upgraded electricity network using sensors, digital tech, and automation to manage energy flow in real time. Enables two-way communication between utilities and customers.",
    caseStudy: "Austin, TX deployed a smart grid that lets residents monitor real-time usage and automatically adjust appliances — cutting bills and preventing blackouts.",
    learnMore: "Search: 'DOE smart grid overview'" },

  { category: "Key Concepts", icon: "📜", term: "Renewable Energy Credits (RECs)",
    definition: "Certificates representing 1 MWh of electricity generated from a renewable source. Companies buy RECs to claim they use clean energy — even if their actual power comes from the grid.",
    caseStudy: "Many large corporations advertise '100% renewable energy' by purchasing RECs without changing their actual power source. This practice has sparked major greenwashing debates.",
    learnMore: "Search: 'EPA green power RECs explained'" },

  { category: "Key Concepts", icon: "🤝", term: "Power Purchase Agreement (PPA)",
    definition: "A long-term contract where a buyer (school, government, business) purchases electricity directly from a solar or wind developer at a fixed price. No upfront installation cost.",
    caseStudy: "Chicago Public Schools signed a solar PPA that saves millions annually and lets students learn about clean energy using their school as a living classroom.",
    learnMore: "Search: 'SEIA PPA explained' or 'NREL PPA guide'" },

  { category: "Key Concepts", icon: "📉", term: "Decarbonization",
    definition: "Removing carbon dioxide emissions from an economic sector or the entire economy. Done by switching from fossil fuels to clean electricity across power, transportation, buildings, and industry.",
    caseStudy: "Illinois' CEJA law set a goal of 100% clean electricity by 2050, with equity provisions ensuring frontline communities like Englewood benefit from the transition.",
    learnMore: "Search: 'RMI decarbonization' or 'Princeton Net-Zero America'" },

  { category: "Key Concepts", icon: "📊", term: "Capacity Factor",
    definition: "How much electricity a plant actually produces vs. its maximum possible output. Solar: ~22%. Wind: 30–45%. Natural gas: 55%. Nuclear: 90%+. Higher = more reliable output.",
    caseStudy: "A 1 MW solar array in Illinois produces about 1,750 MWh/year — enough to power ~160 homes. That equals a capacity factor of roughly 20%.",
    learnMore: "Search: 'EIA capacity factor by fuel type'" },

  { category: "Key Concepts", icon: "⚡", term: "Energy Units: kWh / MW / GW",
    definition: "kWh (kilowatt-hour): what your home uses daily (~30 kWh). MW (megawatt): powers ~750 homes. GW (gigawatt): powers a mid-size city. U.S. total capacity is about 1,200 GW.",
    caseStudy: "A typical Chicago home uses 650 kWh/month. One MW of solar generates enough for ~750 homes per year in Illinois.",
    learnMore: "Search: 'EIA electricity explained units'" },

  { category: "Key Concepts", icon: "✊", term: "Energy Justice",
    definition: "The principle that all communities — especially those burdened by pollution and high energy costs — deserve equal access to clean, affordable, and reliable energy.",
    caseStudy: "LVEJO (Little Village Environmental Justice Organization) organized to close Chicago's Fisk and Crawford coal plants in 2012. After closure, neighborhood asthma rates declined measurably.",
    learnMore: "Search: 'WE ACT energy justice' or 'Earthjustice energy equity'" },

  // ── POLICY & PROGRAMS ─────────────────────────────────────
  { category: "Policy & Programs", icon: "🏛️", term: "Inflation Reduction Act (IRA)",
    definition: "Signed in 2022. The largest U.S. climate investment ever — $369 billion for clean energy. Includes 30% tax credits for solar, EVs, heat pumps, and prioritizes low-income and disadvantaged communities.",
    caseStudy: "The IRA's solar tax credit means a $20,000 home solar system only costs $14,000 after credits. Low-income households can qualify for an extra 10–20% bonus on top of that.",
    learnMore: "Search: 'Rewiring America IRA savings calculator' or 'IRS clean energy credits'" },

  { category: "Policy & Programs", icon: "🌱", term: "Climate & Equitable Jobs Act (CEJA)",
    definition: "Illinois' 2021 landmark climate law. 100% clean electricity by 2050. Creates 40,000+ clean energy jobs. Directs 40% of benefits to environmental justice communities.",
    caseStudy: "CEJA created the Illinois Solar for All program and a clean energy workforce pipeline targeting communities like Englewood, North Lawndale, and Pilsen.",
    learnMore: "Search: 'IEC CEJA Illinois' or 'ELPC CEJA overview'" },

  { category: "Policy & Programs", icon: "🌞", term: "Illinois Solar for All",
    definition: "A state program making solar accessible to low-income households, renters, and nonprofits. Provides bill credits through community solar with no upfront cost required.",
    caseStudy: "Illinois Solar for All has enrolled thousands of low-income Chicago households, saving each an average of $300–$600 per year on electricity.",
    learnMore: "Search: 'Illinois Shines Solar for All' or 'Elevate Energy Chicago'" },

  { category: "Policy & Programs", icon: "💰", term: "Solar Investment Tax Credit (ITC)",
    definition: "A federal tax credit equal to 30% of the cost of a solar installation. Extended through 2032 by the IRA. One of the biggest drivers of U.S. solar industry growth since 2006.",
    caseStudy: "The ITC helped grow the U.S. solar industry 200x since 2006. Before the ITC, solar was cost-prohibitive for most homeowners and businesses.",
    learnMore: "Search: 'SEIA investment tax credit' or 'EnergySage ITC guide'" },

  { category: "Policy & Programs", icon: "⚖️", term: "Justice40 Initiative",
    definition: "A federal commitment that 40% of benefits from clean energy investments go to disadvantaged communities. Applies to EPA, DOE, HUD, and other major agency programs.",
    caseStudy: "Justice40 shaped how billions in IRA funding flows — requiring programs like EPA's Greenhouse Gas Reduction Fund to prioritize low-income communities of color.",
    learnMore: "Search: 'CEQ Justice40 communities' or 'EPA EJScreen tool'" },

  { category: "Policy & Programs", icon: "🏦", term: "Greenhouse Gas Reduction Fund (GGRF)",
    definition: "A $27 billion EPA program from the IRA that capitalizes community lenders, green banks, and nonprofits to finance clean energy in low-income communities.",
    caseStudy: "Chicago's Elevate Energy received GGRF-connected funding to expand solar, weatherization, and efficiency upgrades for low-income Illinois households.",
    learnMore: "Search: 'EPA Greenhouse Gas Reduction Fund' or 'Coalition for Green Capital'" },

  { category: "Policy & Programs", icon: "💵", term: "Feed-in Tariff (FiT)",
    definition: "A policy requiring utilities to buy electricity from small renewable generators — like rooftop solar — at a guaranteed fixed price. Stronger than net metering because it guarantees income.",
    caseStudy: "Germany's early feed-in tariff launched a solar boom in the 2000s that drove down global panel prices for everyone — including the U.S.",
    learnMore: "Search: 'IRENA feed-in tariff guide'" },

  // ── CASE STUDIES ─────────────────────────────────────────
  { category: "Case Studies", icon: "🇵🇷", term: "Puerto Rico After Hurricane Maria",
    definition: "Hurricane Maria (2017) destroyed Puerto Rico's fragile centralized grid. 3.4 million people lost power — some for over a year. Exposed decades of underinvestment and corruption at PREPA, the utility.",
    caseStudy: "Puerto Rico gets more sun than Germany but has 10x less solar. Community microgrids and solar kept hospitals running when the main grid failed for months. As of 2024, reliability remains a crisis.",
    learnMore: "Search: 'IEEFA Puerto Rico grid' or 'Grist Puerto Rico solar' or 'PREPA bankruptcy'" },

  { category: "Case Studies", icon: "🇩🇪", term: "Germany's Energiewende",
    definition: "Germany's 'energy transition' — a national policy launched in 2000 to shift entirely to renewables. Germany now generates 60%+ of electricity from clean sources and created 300,000+ jobs.",
    caseStudy: "German citizens and cooperatives OWN 40% of renewable capacity — not just corporations. Their feed-in tariff drove down global solar panel prices that benefited the entire world.",
    learnMore: "Search: 'Clean Energy Wire Energiewende' or 'Fraunhofer energy charts Deutschland'" },

  { category: "Case Studies", icon: "🏙️", term: "Englewood, Chicago — Solar Equity",
    definition: "Englewood has the same solar resource as Los Angeles but installed solar at a fraction of the rate — due to decades of disinvestment, redlining, and ownership gaps.",
    caseStudy: "Greater Englewood Chamber of Commerce (GECC) trained residents as solar installers earning $45K–$65K/year. Illinois Solar for All expanded into Englewood to provide bill credits for low-income households.",
    learnMore: "Search: 'GECC solar Englewood' or 'Elevate Energy Chicago solar'" },

  { category: "Case Studies", icon: "🏆", term: "Little Village, Chicago — Coal Plant Victory",
    definition: "Little Village and Pilsen residents organized for years to close the Fisk and Crawford coal plants — two of the nation's most polluting facilities — located in their backyards.",
    caseStudy: "The plants closed in 2012 after sustained organizing by LVEJO. Studies linked them to 40+ premature deaths and 550 ER visits per year. After closure, asthma rates in the area declined.",
    learnMore: "Search: 'LVEJO coal plant victory Chicago' or 'CNT Fisk Crawford health study'" },

  { category: "Case Studies", icon: "🌴", term: "Babcock Ranch, FL — Solar-Powered City",
    definition: "America's first solar-powered city. 700 acres of solar panels power all 2,000+ homes. During Hurricane Ian in 2022, it was the only Florida community that didn't lose power.",
    caseStudy: "When Hurricane Ian devastated Florida, Babcock Ranch kept all power due to underground lines, solar, and battery storage. It's now being studied as a model for future hurricane-resilient communities.",
    learnMore: "Search: 'Babcock Ranch hurricane Ian solar' or 'Kitson solar city'" },

  { category: "Case Studies", icon: "🌵", term: "Navajo Nation — Energy Sovereignty",
    definition: "The Navajo Nation is rich in coal and uranium — yet 15,000+ homes lack electricity. Decades of resource extraction enriched energy companies while residents faced pollution and poverty.",
    caseStudy: "The Navajo Generating Station coal plant closed in 2019. Now Navajo Power is developing tribally-owned utility-scale solar to replace those jobs and reclaim energy sovereignty.",
    learnMore: "Search: 'Navajo Power solar' or 'NREL tribal energy sovereignty'" },

  { category: "Case Studies", icon: "👷", term: "Powering Chicago — Union Solar Jobs",
    definition: "IBEW Local 134's Powering Chicago program trains union electricians in solar installation, connecting Chicago South and West Side residents to clean energy careers with full benefits.",
    caseStudy: "Union solar installers in Illinois earn $60,000–$90,000+ with full benefits. CEJA created pathways for formerly incarcerated individuals to enter the clean energy workforce.",
    learnMore: "Search: 'Powering Chicago IBEW solar' or 'CEJA workforce development Illinois'" },

  { category: "Case Studies", icon: "📊", term: "Rooftop Solar Racial Gap (NREL Study)",
    definition: "A landmark NREL study found Black and Hispanic neighborhoods install 69% less rooftop solar than average — even when income levels are the same. The gap traces back to redlining and ownership rates.",
    caseStudy: "Low homeownership rates in communities of color limit solar access. Community solar programs exist specifically to close this gap. The study directly shaped equity provisions in CEJA and the IRA.",
    learnMore: "Search: 'NREL rooftop solar racial equity study' or 'Groundswell community solar'" }
];



// ── UI Logic — Energy Scanner Terminal ───────────────────────────

const categories = ['All', ...new Set(glossaryData.map(t => t.category))];
let activeCategory = 'All';
let autoScrollInterval = null;
let isPaused = false;

function openGlossary() {
  const screen = document.getElementById('glossary-screen');
  screen.classList.add('open');
  document.getElementById('glossary-search').value = '';
  activeCategory = 'All';
  renderCategoryPills();
  renderTerms(glossaryData);
  startAutoScroll();
}

function closeGlossary() {
  document.getElementById('glossary-screen').classList.remove('open');
  stopAutoScroll();
}

function renderCategoryPills() {
  const el = document.getElementById('gs-cats');
  el.innerHTML = categories.map(cat => `
    <button class="gs-cat-pill ${cat === activeCategory ? 'active' : ''}"
      onclick="filterCategory('${cat}')">${cat}</button>
  `).join('');
}

function filterCategory(cat) {
  activeCategory = cat;
  renderCategoryPills();
  const q = document.getElementById('glossary-search').value.toLowerCase().trim();
  applyFilters(q);
}

function applyFilters(query) {
  let terms = glossaryData;
  if (activeCategory !== 'All') terms = terms.filter(t => t.category === activeCategory);
  if (query) terms = terms.filter(t =>
    t.term.toLowerCase().includes(query) ||
    t.definition.toLowerCase().includes(query) ||
    t.category.toLowerCase().includes(query)
  );
  renderTerms(terms);
}

function handleGlossSearch(val) {
  applyFilters(val.toLowerCase().trim());
}

function renderTerms(terms) {
  const list = document.getElementById('glossary-list');
  const count = document.getElementById('gs-count');
  count.textContent = `${terms.length} TERMS`;

  if (!terms.length) {
    list.innerHTML = '<p class="gloss-empty">NO TERMS FOUND — TRY: SOLAR · WIND · EQUITY · IRA · CHICAGO</p>';
    return;
  }

  list.innerHTML = terms.map((item, i) => {
    // Short preview — first 60 chars of definition
    const preview = item.definition.slice(0, 65) + '…';
    return `
      <div class="gloss-item" id="gloss-${i}">
        <div class="gloss-row" onclick="toggleTerm('gloss-${i}')">
          <span class="gloss-icon">${item.icon}</span>
          <span class="gloss-cat-badge">${item.category}</span>
          <span class="gloss-term-name">${item.term}</span>
          <span class="gloss-preview">${preview}</span>
          <span class="gloss-expand-icon">▼</span>
        </div>
        <div class="gloss-body">
          <p class="gloss-def">${item.definition}</p>
          <div class="gloss-case">📍 ${item.caseStudy}</div>
          <p class="gloss-learn">🔍 ${item.learnMore}</p>
        </div>
      </div>
    `;
  }).join('');

  // Pause scroll on hover
  list.addEventListener('mouseenter', () => { isPaused = true; });
  list.addEventListener('mouseleave', () => { isPaused = false; });
  list.scrollTop = 0;
}

function toggleTerm(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const wasOpen = el.classList.contains('expanded');
  // Close all others
  document.querySelectorAll('.gloss-item.expanded').forEach(e => e.classList.remove('expanded'));
  if (!wasOpen) {
    el.classList.add('expanded');
    // Pause auto-scroll while reading
    isPaused = true;
    // Resume after 6 seconds
    setTimeout(() => { isPaused = false; }, 6000);
  }
}

// Auto-scroll: slowly drifts down, resets to top when it reaches the bottom
function startAutoScroll() {
  stopAutoScroll();
  const list = document.getElementById('glossary-list');
  autoScrollInterval = setInterval(() => {
    if (isPaused || !list) return;
    list.scrollTop += 1;
    // Loop back to top when we reach the bottom
    if (list.scrollTop + list.clientHeight >= list.scrollHeight - 10) {
      list.scrollTop = 0;
    }
  }, 30);
}

function stopAutoScroll() {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
  }
}
