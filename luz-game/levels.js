// levels.js — World & Level Data | LUZ Game

const WORLDS = [
  {
    id: 0,
    name: "Loíza, Puerto Rico",
    shortName: "Loíza, PR",
    emoji: "🌴",
    bossName: "Don Voltio Jr.",
    weapon: "Hurricane Drones",
    bgColors: ["#0a1a0a", "#0d2a0d"],
    accentColor: "#00FF87",
    enemySpeedBoost: 0,
    enemyHpBoost: 0,
    description: "The island went dark. 11 months without power.",
    unlocked: true,
    completed: false
  },
  {
    id: 1,
    name: "Englewood, Chicago",
    shortName: "Englewood, IL",
    emoji: "🏙️",
    bossName: "The Lobbyist",
    weapon: "Data Center Pollution",
    bgColors: ["#0a0a1a", "#0f0f2a"],
    accentColor: "#4488ff",
    enemySpeedBoost: 0.3,
    enemyHpBoost: 1,
    description: "Data centers drain the neighborhood. The community fights back.",
    unlocked: false,
    completed: false
  },
  {
    id: 2,
    name: "Houston, Texas",
    shortName: "Houston, TX",
    emoji: "❄️",
    bossName: "The Deregulator",
    weapon: "Frozen Grid Demons",
    bgColors: ["#0a1020", "#0f1830"],
    accentColor: "#88ccff",
    enemySpeedBoost: 0.6,
    enemyHpBoost: 2,
    description: "Winter Storm Uri. The grid failed. People died. GridLock profited.",
    unlocked: false,
    completed: false
  },
  {
    id: 3,
    name: "Navajo Nation",
    shortName: "Navajo Nation",
    emoji: "🌵",
    bossName: "The Fossil Baron",
    weapon: "Coal Smoke Spirits",
    bgColors: ["#1a0a05", "#2a1008"],
    accentColor: "#ff8833",
    enemySpeedBoost: 0.9,
    enemyHpBoost: 3,
    description: "Coal companies took the land. Now we take the power back.",
    unlocked: false,
    completed: false
  },
  {
    id: 4,
    name: "Washington, D.C.",
    shortName: "Washington, DC",
    emoji: "🏛️",
    bossName: "DON VOLTIO (FINAL BOSS)",
    weapon: "Misinformation Bots",
    bgColors: ["#0a001a", "#100025"],
    accentColor: "#cc44ff",
    enemySpeedBoost: 1.2,
    enemyHpBoost: 4,
    description: "The source of it all. Don Voltio himself. End this.",
    unlocked: false,
    completed: false
  }
];

// How many enemies before the boss appears
function getEnemiesBeforeBoss(worldIndex) {
  return 10 + worldIndex * 2;
}

// Spawn rate (frames between enemy spawns)
function getSpawnRate(worldIndex) {
  return Math.max(60, 120 - worldIndex * 12);
}

// Whether world uses confusion clouds (world 5)
function usesConfusionClouds(worldIndex) {
  return worldIndex === 4;
}

// Boss is final boss?
function isFinalBoss(worldIndex) {
  return worldIndex === 4;
}

// Unlock next world
function completeWorld(worldIndex) {
  WORLDS[worldIndex].completed = true;
  if (worldIndex + 1 < WORLDS.length) {
    WORLDS[worldIndex + 1].unlocked = true;
  }
}

// Reset progress
function resetWorlds() {
  WORLDS.forEach((w, i) => {
    w.completed = false;
    w.unlocked = (i === 0);
  });
}

// BG gradient for a world
function getWorldBg(ctx, worldIndex, w, h) {
  const world = WORLDS[worldIndex];
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, world.bgColors[0]);
  grad.addColorStop(1, world.bgColors[1]);
  return grad;
}

// Draw parallax background stars
function drawStars(ctx, stars) {
  stars.forEach(s => {
    ctx.globalAlpha = s.alpha;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

// Generate star field
function generateStars(count, w, h) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 0.3 + Math.random() * 1.2,
    alpha: 0.2 + Math.random() * 0.7,
    speed: 0.1 + Math.random() * 0.4
  }));
}

// Draw mural-style background stripes
function drawMuralBg(ctx, worldIndex, w, h, scrollX) {
  const world = WORLDS[worldIndex];
  ctx.fillStyle = getWorldBg(ctx, worldIndex, w, h);
  ctx.fillRect(0, 0, w, h);

  // Ground
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fillRect(0, h - 60, w, 60);

  // Mural stripe pattern
  ctx.globalAlpha = 0.04;
  ctx.fillStyle = world.accentColor;
  for (let i = 0; i < 8; i++) {
    const sx = ((scrollX * 0.3 + i * 140) % (w + 140)) - 140;
    ctx.beginPath();
    ctx.moveTo(sx, 0);
    ctx.lineTo(sx + 80, 0);
    ctx.lineTo(sx + 20, h);
    ctx.lineTo(sx - 60, h);
    ctx.closePath();
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // World location tag
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.font = 'bold 72px Bebas Neue, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(world.shortName.toUpperCase(), 20, h - 20);
}
