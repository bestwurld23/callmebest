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

// ── MID-GAME QUIZ BANK ───────────────────────────────────────────────────
// One quiz per world, triggered at the halfway point of each level
const worldQuizzes = [
  {
    world: 1,
    location: "Loíza, Puerto Rico",
    question: "Puerto Rico gets more sunlight than Germany. How much MORE solar power does Germany have?",
    options: ["2x more", "5x more", "10x more"],
    correct: 2, // index 0-based
    fact: "Puerto Rico gets more sun than Germany — yet Germany has 10x more solar installed. That's not geography. That's politics and investment.",
    reward: "☀️ Solar Boost! +500 Watts"
  },
  {
    world: 2,
    location: "Englewood, Chicago",
    question: "Black neighborhoods install significantly less rooftop solar than average. By how much?",
    options: ["About 30% less", "About 50% less", "About 69% less"],
    correct: 2,
    fact: "Black neighborhoods install 69% less rooftop solar than average — even when income is equal. This is called the solar equity gap.",
    reward: "⚡ Community Power! +500 Watts"
  },
  {
    world: 3,
    location: "Houston, Texas",
    question: "How much MORE of their income do low-income Black households spend on energy vs. white households?",
    options: ["15% more", "29% more", "43% more"],
    correct: 2,
    fact: "Low-income Black households spend 43% more of their income on energy. Clean energy isn't just climate — it's economic justice.",
    reward: "🔋 Grid Justice! +500 Watts"
  },
  {
    world: 4,
    location: "Navajo Nation",
    question: "What is the fastest growing job in America through 2034?",
    options: ["Solar installer", "Wind turbine technician", "EV battery engineer"],
    correct: 1,
    fact: "Wind turbine technician is the #1 fastest growing job in America through 2034. The clean energy economy is hiring — right now.",
    reward: "🌬️ Wind Power! +500 Watts"
  },
  {
    world: 5,
    location: "Washington, D.C.",
    question: "How many new clean energy workers does the U.S. need by 2030?",
    options: ["50,000+", "500,000+", "5,000,000+"],
    correct: 1,
    fact: "The U.S. needs 500,000+ new clean energy workers by 2030. The opportunity is massive — and communities like yours need to be first in line.",
    reward: "🏛️ Policy Win! +500 Watts"
  }
];

function getWorldQuiz(worldIndex) {
  return worldQuizzes[worldIndex] || worldQuizzes[0];
}

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
