// literacy.js — Energy Fact Database | LUZ Game

const energyFacts = [
  // ── HOW SOLAR WORKS ──────────────────────────────────────────────────────
  "Solar panels can power a home for 25+ years with almost zero maintenance.",
  "Solar panels work by converting sunlight into electricity using the photovoltaic effect — discovered in 1839 by a 19-year-old French scientist.",
  "A single hour of sunlight hitting Earth contains enough energy to power the entire planet for a full year.",
  "Solar panels still generate electricity on cloudy days — they just produce about 10–25% of their normal output.",
  "The Sun is 93 million miles away. Its light reaches your solar panel in about 8 minutes.",
  "Solar panels have no moving parts — that's why they last so long and rarely break.",
  "One acre of solar panels can generate enough electricity to power about 100 homes for a year.",
  "Solar energy is now the cheapest source of electricity in history — cheaper than coal, gas, or nuclear.",
  "Your electricity bill has 3 parts: generation, transmission, and distribution. Most people only know the total.",
  "A battery storage system paired with solar can keep your lights on even when the grid goes down.",

  // ── JOBS & CAREERS ───────────────────────────────────────────────────────
  "A solar installer earns $45,000–$65,000/year. No college degree required.",
  "Wind turbine technician is the #1 fastest growing job in America through 2034.",
  "The U.S. needs 500,000+ new clean energy workers by 2030. The jobs are real.",
  "Clean energy jobs grew 3x faster than the rest of the U.S. workforce in 2024.",
  "Solar electricians, energy auditors, battery storage technicians — these are brand new careers that didn't exist 20 years ago.",
  "You can become a NABCEP-certified solar installer in as little as 6 months of training.",
  "Clean energy employs more people than fossil fuels in the U.S. — and the gap is growing every year.",

  // ── EQUITY & JUSTICE ─────────────────────────────────────────────────────
  "2 in 3 Americans can't explain the difference between clean and dirty energy.",
  "Black neighborhoods install 69% less rooftop solar than average — even when income is equal.",
  "Low-income Black households spend 43% more of their income on energy than white households.",
  "PREPA — Puerto Rico's utility — has been in bankruptcy since 2017 while residents pay the highest rates.",
  "Puerto Rico gets more sun than Germany. Germany has 10x more solar. That's not an accident.",
  "Englewood, Chicago gets the same amount of sunlight as Los Angeles. Solar works here.",
  "Communities near coal plants have higher rates of asthma, heart disease, and cancer. Clean energy is a health issue.",
  "Only 2.6% of American households used clean energy tax credits in 2023 — most people don't know they exist.",

  // ── COMMUNITY SOLAR ──────────────────────────────────────────────────────
  "A community solar program can cut your energy bill by 10–15%. Most people have never heard of it.",
  "Community solar lets renters and people without sunny rooftops still benefit from solar power.",
  "Illinois Solar for All provides free solar energy to low-income households — no upfront cost.",
  "Microgrids are small local power networks that can run independently from the main grid — perfect for communities hit by disasters.",

  // ── CLIMATE & THE PLANET ─────────────────────────────────────────────────
  "Data centers use 1–2% of all global electricity and that number is growing fast — fueled by AI.",
  "Switching one home from fossil fuels to solar is like planting 150 trees — every single year.",
  "The average American home produces 7.5 tons of CO2 per year just from electricity. Solar can cut that to near zero.",
  "Electric vehicles charged by solar produce zero emissions — from the driveway to the highway.",
  "Wind and solar together now generate more electricity in the U.S. than coal for the first time in history.",

  // ── CUTTING EDGE RESEARCH ────────────────────────────────────────────────
  "NEW RESEARCH: Vertical solar panels — mounted straight up like a wall instead of flat on a roof — can be MORE efficient than traditional panels in many regions. They capture sunrise AND sunset light and work better in snowy climates since snow slides right off.",
  "Vertical 'bifacial' solar panels absorb sunlight from both sides, boosting energy output by up to 20% compared to standard flat panels.",
  "Vertical solar panels can double as fences, sound barriers, and building walls — generating power without taking up extra land.",
  "Scientists in 2024 found that east-west facing vertical solar arrays better match when people actually USE electricity — morning and evening — reducing strain on the grid."
];

// One fact per world (boss defeat) — indexed to match expanded energyFacts above
const worldFacts = [
  { world: 1, location: "Loíza, Puerto Rico",  fact: energyFacts[20], icon: "🌞" }, // PR gets more sun than Germany
  { world: 2, location: "Englewood, Chicago",  fact: energyFacts[21], icon: "⚡" }, // Englewood = same sun as LA
  { world: 3, location: "Houston, Texas",      fact: energyFacts[19], icon: "❄️" }, // Low-income energy burden
  { world: 4, location: "Navajo Nation",       fact: energyFacts[22], icon: "🌬️" }, // Coal plants & health
  { world: 5, location: "Washington, D.C.",    fact: energyFacts[17], icon: "🏛️" }  // 2 in 3 Americans stat
];

// Cards collected by player (indices into energyFacts)
const collectedCards = new Set();

function collectCard(worldIndex) {
  collectedCards.add(worldIndex);
}

function getEnergyIQ() {
  return collectedCards.size;
}

function getWorldFact(worldIndex) {
  return worldFacts[worldIndex] || worldFacts[0];
}

// Random bonus fact (for bonus orb pickups)
function getRandomFact() {
  const idx = Math.floor(Math.random() * energyFacts.length);
  return { fact: energyFacts[idx], icon: "⚡", location: "Energy Intel" };
}
