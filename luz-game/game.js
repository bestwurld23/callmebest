// game.js — Main Game Engine | LUZ — Energy Ranger
// callmebest.com | Built for Jordan Bester

// ── AUDIO ENGINE ─────────────────────────────────────────────────
class AudioEngine {
  constructor() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.enabled = true;
    } catch (e) {
      this.enabled = false;
    }
    this.bgNode = null;
    this.bgGain = null;
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  playTone(freq, type, dur, vol = 0.3, delay = 0) {
    if (!this.enabled) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = type;
      osc.frequency.value = freq;
      const start = this.ctx.currentTime + delay;
      gain.gain.setValueAtTime(vol, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
      osc.start(start);
      osc.stop(start + dur);
    } catch (e) {}
  }

  shoot() {
    this.playTone(880, 'sine', 0.08, 0.2);
    this.playTone(440, 'square', 0.06, 0.1, 0.04);
  }

  enemyDie() {
    this.playTone(200, 'sawtooth', 0.15, 0.3);
    this.playTone(150, 'sine', 0.2, 0.25, 0.05);
    this.playTone(300, 'square', 0.1, 0.15, 0.1);
  }

  playerHit() {
    this.playTone(80, 'sawtooth', 0.3, 0.4);
    this.playTone(60, 'square', 0.3, 0.35, 0.1);
  }

  bossDie() {
    [523, 659, 784, 1047].forEach((f, i) => {
      this.playTone(f, 'sine', 0.4, 0.35, i * 0.12);
    });
    this.playTone(130, 'sawtooth', 0.6, 0.5, 0);
  }

  collectOrb() {
    this.playTone(1047, 'sine', 0.15, 0.25);
    this.playTone(1319, 'sine', 0.15, 0.15, 0.08);
  }

  knowledgeCard() {
    [523, 659, 784].forEach((f, i) => this.playTone(f, 'sine', 0.3, 0.2, i * 0.1));
  }

  startBossMusic() { /* Could add looping beat with Web Audio */ }

  startBgBeat(worldIndex) {
    if (!this.enabled) return;
    this.stopBgBeat();
    // Simple dembow-inspired rhythm loop
    const bpm = 95 + worldIndex * 5;
    const interval = (60 / bpm) / 2 * 1000;
    let beat = 0;
    const patterns = [
      [1, 0, 0.5, 0, 1, 0, 0.5, 0.5], // Loíza
      [1, 0, 0.5, 1, 0, 0.5, 1, 0],   // Englewood
      [1, 0.5, 0, 1, 0.5, 0, 1, 0.5], // Houston
      [1, 0, 0.7, 0, 1, 0.7, 0, 1],   // Navajo
      [1, 0.5, 0.7, 0.3, 1, 0.5, 0.7, 1], // DC
    ];
    const pat = patterns[worldIndex] || patterns[0];

    this._beatInterval = setInterval(() => {
      const vol = pat[beat % pat.length];
      if (vol > 0) {
        this.playTone(beat % 4 === 0 ? 60 : 120, 'sine', 0.08, vol * 0.12);
        if (beat % 2 === 1) this.playTone(200, 'square', 0.05, vol * 0.06);
      }
      beat++;
    }, interval);
  }

  stopBgBeat() {
    if (this._beatInterval) { clearInterval(this._beatInterval); this._beatInterval = null; }
  }

  victory() {
    [523, 659, 784, 1047, 1319].forEach((f, i) => this.playTone(f, 'sine', 0.5, 0.3, i * 0.1));
  }
}

// ── SCREEN SHAKE ─────────────────────────────────────────────────
class ScreenShake {
  constructor() { this.intensity = 0; this.duration = 0; }
  trigger(intensity, duration) {
    this.intensity = Math.max(this.intensity, intensity);
    this.duration = Math.max(this.duration, duration);
  }
  update() {
    if (this.duration > 0) this.duration--;
    else this.intensity *= 0.85;
  }
  get offset() {
    if (this.intensity < 0.5) return { x: 0, y: 0 };
    return {
      x: (Math.random() - 0.5) * this.intensity * 2,
      y: (Math.random() - 0.5) * this.intensity * 2
    };
  }
}

// ── COLLISION ────────────────────────────────────────────────────
function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

// ── GAME STATE ───────────────────────────────────────────────────
const STATE = {
  TITLE: 'title',
  WORLD_MAP: 'worldmap',
  PLAYING: 'playing',
  BOSS: 'boss',
  QUIZ: 'quiz',
  KNOWLEDGE_CARD: 'card',
  PAUSED: 'paused',
  GAME_OVER: 'gameover',
  VICTORY: 'victory'
};

// ── MAIN GAME CLASS ──────────────────────────────────────────────
class LuzGame {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.audio = new AudioEngine();
    this.shake = new ScreenShake();

    this.state = STATE.TITLE;
    this.currentWorld = 0;
    this.score = 0;        // "Watts Generated"
    this.enemiesKilled = 0;
    this.enemiesNeeded = 0;
    this.totalEnemiesKilled = 0;

    this.luz = null;
    this.enemies = [];
    this.orbs = [];
    this.particles = [];
    this.boss = null;
    this.bossDefeated = false;
    this.spawnTimer = 0;
    this.scrollX = 0;
    this.stars = generateStars(60, this.canvas.width, this.canvas.height);

    this.keys = {};
    this.mobileInput = { up: false, down: false, left: false, right: false, shoot: false, shield: false };

    this.pendingCard = null;
    this.floatingTexts = [];

    this._bindInput();
    this._bindUI();
    this._checkMobile();
    this._scaleGame();
    window.addEventListener('resize', () => this._scaleGame());

    this.lastTime = 0;
    this.running = false;
  }

  // ── RESPONSIVE SCALING ────────────────────────────────────────
  _scaleGame() {
    const container = document.getElementById('game-container');
    const scaleX = window.innerWidth  / 800;
    const scaleY = window.innerHeight / 600;
    const scale  = Math.min(scaleX, scaleY); // fill viewport fully
    container.style.transform = `scale(${scale})`;
  }

  // ── INIT ──────────────────────────────────────────────────────
  start() {
    this.running = true;
    requestAnimationFrame(t => this._loop(t));
  }

  _loop(timestamp) {
    if (!this.running) return;
    const dt = Math.min((timestamp - this.lastTime) / 16.67, 3);
    this.lastTime = timestamp;
    this._update(dt);
    this._render();
    requestAnimationFrame(t => this._loop(t));
  }

  // ── INPUT ──────────────────────────────────────────────────────
  _bindInput() {
    window.addEventListener('keydown', e => {
      this.keys[e.key] = true;
      this.audio.resume();

      if (e.key === 'Escape' || e.key === 'p') {
        if (this.state === STATE.PLAYING || this.state === STATE.BOSS) this._togglePause();
      }
      // Start game from title
      if (e.key === 'Enter' && this.state === STATE.TITLE) this._goToWorldMap();
      e.preventDefault();
    });

    window.addEventListener('keyup', e => { this.keys[e.key] = false; });
  }

  _bindUI() {
    // Title
    document.getElementById('btn-start').addEventListener('click', () => {
      this.audio.resume();
      this._goToWorldMap();
    });

    // Knowledge card buttons
    document.getElementById('btn-card-collect').addEventListener('click', () => this._collectCard());
    document.getElementById('btn-card-continue').addEventListener('click', () => this._cardContinue());

    // Mid-level quiz
    document.getElementById('btn-quiz-continue').addEventListener('click', () => this._quizContinue());

    // Mobile: tap anywhere on overlay to continue (once result is showing)
    document.getElementById('quiz-overlay').addEventListener('click', e => {
      const continueBtn = document.getElementById('btn-quiz-continue');
      if (!continueBtn.classList.contains('hidden') && e.target !== continueBtn) {
        this._quizContinue();
      }
    });
    document.getElementById('knowledge-card').addEventListener('click', e => {
      const continueBtn = document.getElementById('btn-card-continue');
      const collectBtn  = document.getElementById('btn-card-collect');
      if (!continueBtn.classList.contains('hidden') &&
          e.target !== continueBtn && e.target !== collectBtn) {
        this._cardContinue();
      }
    });

    // End screen
    document.getElementById('btn-play-again').addEventListener('click', () => this._playAgain());
    document.getElementById('btn-share').addEventListener('click', () => this._share());
  }

  _checkMobile() {
    const controls = document.getElementById('mobile-controls');
    if (controls) this._bindDpad(controls);
    // Visibility controlled by _setGameplayMode() — not here
  }

  // Show/hide mobile controls by toggling .gameplay on the container
  _setGameplayMode(active) {
    const container = document.getElementById('game-container');
    if (active) {
      container.classList.add('gameplay');
    } else {
      container.classList.remove('gameplay');
    }
  }

  _bindDpad(controls) {
    const map = {
      'dpad-up':    'up',
      'dpad-down':  'down',
      'dpad-left':  'left',
      'dpad-right': 'right',
    };
    controls.querySelectorAll('.dpad-btn[data-dir]').forEach(btn => {
      const dir = btn.dataset.dir;
      btn.addEventListener('touchstart', e => { e.preventDefault(); this.mobileInput[dir] = true; this.audio.resume(); });
      btn.addEventListener('touchend',   e => { e.preventDefault(); this.mobileInput[dir] = false; });
    });
    const shootBtn = controls.querySelector('#btn-shoot');
    const shieldBtn = controls.querySelector('#btn-shield');
    if (shootBtn) {
      shootBtn.addEventListener('touchstart', e => { e.preventDefault(); this.mobileInput.shoot = true; this.audio.resume(); });
      shootBtn.addEventListener('touchend',   e => { e.preventDefault(); this.mobileInput.shoot = false; });
    }
    if (shieldBtn) {
      shieldBtn.addEventListener('touchstart', e => { e.preventDefault(); this.mobileInput.shield = true; });
      shieldBtn.addEventListener('touchend',   e => { e.preventDefault(); this.mobileInput.shield = false; });
    }
  }

  // ── STATE TRANSITIONS ─────────────────────────────────────────
  _showOnly(id) {
    ['title-screen','world-map-screen','knowledge-card','end-screen'].forEach(s => {
      document.getElementById(s).classList.add('hidden');
    });
    if (id) document.getElementById(id).classList.remove('hidden');
  }

  _goToWorldMap() {
    this.state = STATE.WORLD_MAP;
    this.audio.stopBgBeat();
    this._showOnly('world-map-screen');
    this._renderWorldMap();
    this._setGameplayMode(false);
  }

  _startWorld(worldIndex) {
    const world = WORLDS[worldIndex];
    if (!world.unlocked) return;
    this.currentWorld = worldIndex;
    this.enemies = [];
    this.orbs = [];
    this.particles = [];
    this.boss = null;
    this.bossDefeated = false;
    this.enemiesKilled = 0;
    this.enemiesNeeded = getEnemiesBeforeBoss(worldIndex);
    this.spawnTimer = 0;
    this.scrollX = 0;

    this.luz = new Luz(this.canvas);
    this.floatingTexts = [];
    this._quizShownThisWorld = false;
    this.state = STATE.PLAYING;
    this._showOnly(null);
    this._setGameplayMode(true);
    document.getElementById('pause-banner').style.display = 'none';
    this.audio.startBgBeat(worldIndex);
  }

  _togglePause() {
    if (this.state === STATE.PAUSED) {
      this.state = this._prevState;
      document.getElementById('pause-banner').style.display = 'none';
      this.audio.startBgBeat(this.currentWorld);
    } else {
      this._prevState = this.state;
      this.state = STATE.PAUSED;
      document.getElementById('pause-banner').style.display = 'block';
      this.audio.stopBgBeat();
    }
  }

  // ── MID-LEVEL QUIZ ─────────────────────────────────────────────
  _triggerQuiz() {
    this._prevState = this.state;
    this.state = STATE.QUIZ;
    this.audio.stopBgBeat();

    const quiz = getWorldQuiz(this.currentWorld);
    document.getElementById('quiz-location').textContent = `📍 ${quiz.location}`;
    document.getElementById('quiz-question').textContent = quiz.question;

    const optionsEl = document.getElementById('quiz-options');
    optionsEl.innerHTML = '';
    quiz.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = opt;
      btn.addEventListener('click', () => this._answerQuiz(i, quiz));
      optionsEl.appendChild(btn);
    });

    document.getElementById('quiz-result').classList.add('hidden');
    document.getElementById('btn-quiz-continue').classList.add('hidden');
    document.getElementById('quiz-overlay').classList.remove('hidden');
    this._showOnly('quiz-overlay');
  }

  _answerQuiz(chosen, quiz) {
    // Disable all buttons
    document.querySelectorAll('.quiz-option').forEach((btn, i) => {
      btn.disabled = true;
      if (i === quiz.correct) btn.classList.add('correct');
      else if (i === chosen && i !== quiz.correct) btn.classList.add('wrong');
    });

    const correct = chosen === quiz.correct;
    const resultEl = document.getElementById('quiz-result');
    resultEl.classList.remove('hidden');

    if (correct) {
      // ⚡ HEALTH REWARD for correct answer
      this.luz.heal(1);
      createHealthGainEffect(
        this.luz.x + this.luz.w / 2,
        this.luz.y + this.luz.h / 2,
        this.particles
      );
      this.floatingTexts.push(new FloatingText(
        this.luz.x + this.luz.w / 2,
        this.luz.y - 20,
        '+1 ⚡ SOLAR CHARGE!',
        '#00FF87', 20
      ));
      this.score += 500;
      document.getElementById('quiz-result-icon').textContent = '✅';
      document.getElementById('quiz-result-msg').textContent = '¡Wepa! Correct! +1 Health + 500 Watts!';
      document.getElementById('quiz-result-msg').style.color = '#00FF87';
      this.audio.collectOrb();
    } else {
      document.getElementById('quiz-result-icon').textContent = '❌';
      document.getElementById('quiz-result-msg').textContent = 'Not quite — but now you know!';
      document.getElementById('quiz-result-msg').style.color = '#FF3366';
    }

    document.getElementById('quiz-fact-reveal').textContent = `⚡ ${quiz.fact}`;
    document.getElementById('quiz-reward').textContent = correct ? quiz.reward : '';
    document.getElementById('btn-quiz-continue').classList.remove('hidden');
  }

  _quizContinue() {
    document.getElementById('quiz-overlay').classList.add('hidden');
    this.state = STATE.PLAYING;
    this.audio.startBgBeat(this.currentWorld);
    this._showOnly(null);
  }

  _triggerBoss() {
    this.boss = new DonVoltio(this.canvas, this.currentWorld, isFinalBoss(this.currentWorld));
    this.state = STATE.BOSS;
    this.enemies = [];
    this.audio.stopBgBeat();
    this.audio.startBossMusic();
    this.shake.trigger(6, 30);
  }

  _bossDefeated() {
    completeWorld(this.currentWorld);
    this.score += 500 + this.currentWorld * 200;
    this.audio.bossDie();
    this.shake.trigger(14, 45);

    // Explosion particles
    const cx = this.boss.x + this.boss.w / 2;
    const cy = this.boss.y + this.boss.h / 2;
    for (let i = 0; i < 60; i++) {
      const colors = ['#FFD700', '#00FF87', '#FF3366', '#ffffff'];
      this.particles.push(new Particle(cx, cy, colors[Math.floor(Math.random() * colors.length)]));
    }

    this.boss = null;
    this.pendingCard = getWorldFact(this.currentWorld);
    collectCard(this.currentWorld);

    // Show card after short delay
    setTimeout(() => this._showKnowledgeCard(), 1200);
  }

  _showKnowledgeCard() {
    this.state = STATE.KNOWLEDGE_CARD;
    this._showOnly('knowledge-card');
    this.audio.knowledgeCard();

    const card = this.pendingCard;
    document.getElementById('card-icon').textContent = card.icon;
    document.getElementById('card-fact').textContent = `⚡ "${card.fact}"`;
    document.getElementById('card-location').textContent = `📍 ${card.location}`;
    document.getElementById('card-count').textContent = `${getEnergyIQ()} / ${WORLDS.length} Cards Collected`;
  }

  _collectCard() {
    // Already collected on boss defeat — just visual feedback
    document.getElementById('btn-card-collect').textContent = '✅ Added!';
    document.getElementById('btn-card-collect').disabled = true;
    setTimeout(() => {
      document.getElementById('btn-card-collect').textContent = 'Add to My Deck';
      document.getElementById('btn-card-collect').disabled = false;
    }, 1500);
  }

  _cardContinue() {
    this._showOnly(null);
    // Check if all worlds complete or go to map
    if (WORLDS.every(w => w.completed)) {
      this._showVictory();
    } else {
      this._goToWorldMap();
    }
  }

  _showVictory() {
    this.state = STATE.VICTORY;
    this.audio.stopBgBeat();
    this.audio.victory();
    this._showOnly('end-screen');
    this._setGameplayMode(false);

    const iq = getEnergyIQ();
    document.getElementById('end-title').textContent = '⚡ COMUNIDAD LIBERADA ⚡';
    document.getElementById('end-title').style.color = '#00FF87';
    document.getElementById('iq-score').textContent = `${iq}/5`;
    document.getElementById('iq-label').textContent = 'Energy IQ Score';
    document.getElementById('end-cta').innerHTML =
      `"2 in 3 Americans can't explain clean vs dirty energy.<br>You just proved you're not one of them."<br><br>
       <em style="color:#FFD700">Apagaron las luces. Las encendiste tú.</em>`;
    document.getElementById('end-score').textContent = `${this.score.toLocaleString()} Watts Generated`;
  }

  _showGameOver() {
    this.state = STATE.GAME_OVER;
    this.audio.stopBgBeat();
    this._showOnly('end-screen');
    this._setGameplayMode(false);

    const iq = getEnergyIQ();
    document.getElementById('end-title').textContent = 'GRID DOWN';
    document.getElementById('end-title').style.color = '#FF3366';
    document.getElementById('iq-score').textContent = `${iq}/5`;
    document.getElementById('iq-label').textContent = 'Cards Collected';
    document.getElementById('end-cta').innerHTML =
      `GridLock Corp won this round.<br>
       But you know more than you did before.<br><br>
       <em style="color:#00FF87">Get up. Fight back.</em>`;
    document.getElementById('end-score').textContent = `${this.score.toLocaleString()} Watts Generated`;
  }

  _playAgain() {
    resetWorlds();
    collectedCards.clear();
    this.score = 0;
    this.totalEnemiesKilled = 0;
    this._showOnly('title-screen');
    this.state = STATE.TITLE;
  }

  _share() {
    const iq = getEnergyIQ();
    const watts = this.score.toLocaleString();
    const text = `I scored ${iq}/5 on energy literacy playing LUZ — the game by callmebest.com ⚡\n2 in 3 Americans can't explain clean vs dirty energy. Can you?\ncallmebest.com/luz-game`;
    if (navigator.share) {
      navigator.share({ title: 'LUZ — Energy Ranger', text, url: 'https://callmebest.com/luz-game' });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert('Score copied to clipboard! Share it with your community.');
      });
    }
  }

  // ── WORLD MAP UI ──────────────────────────────────────────────
  _renderWorldMap() {
    const container = document.getElementById('world-nodes');
    container.innerHTML = '';

    WORLDS.forEach((world, i) => {
      const node = document.createElement('div');
      node.className = `world-node ${!world.unlocked ? 'locked' : ''} ${world.completed ? 'completed' : ''}`;
      node.innerHTML = `
        <div class="world-num">${i + 1}</div>
        <div class="world-info">
          <div class="world-name">${world.emoji} ${world.name}</div>
          <div class="world-loc">${world.weapon} • vs ${world.bossName}</div>
        </div>
        <div class="world-badge">${world.completed ? '☀️' : world.unlocked ? '▶' : '🔒'}</div>
      `;
      if (world.unlocked) {
        node.addEventListener('click', () => {
          this._showOnly(null);
          this._startWorld(i);
        });
      }
      container.appendChild(node);
    });
  }

  // ── UPDATE ────────────────────────────────────────────────────
  _update(dt) {
    if (this.state === STATE.PAUSED || this.state === STATE.TITLE ||
        this.state === STATE.WORLD_MAP || this.state === STATE.KNOWLEDGE_CARD ||
        this.state === STATE.QUIZ || this.state === STATE.GAME_OVER ||
        this.state === STATE.VICTORY) return;

    this.shake.update();
    this.scrollX += 1.5;

    // Update stars
    this.stars.forEach(s => { s.x -= s.speed; if (s.x < 0) { s.x = this.canvas.width; s.y = Math.random() * this.canvas.height; } });

    // Update Luz
    this.luz.update(this.keys, this.mobileInput);

    // Spawn enemies
    if (this.state === STATE.PLAYING) {
      this.spawnTimer++;
      const rate = getSpawnRate(this.currentWorld);
      if (this.spawnTimer >= rate) {
        this.spawnTimer = 0;
        const world = WORLDS[this.currentWorld];
        let enemy;
        if (usesConfusionClouds(this.currentWorld) && Math.random() > 0.4) {
          enemy = new ConfusionCloud(this.canvas, this.currentWorld);
        } else {
          enemy = new GridLockDrone(this.canvas, this.currentWorld);
        }
        this.enemies.push(enemy);

        // Spawn orb occasionally
        if (Math.random() < 0.18) {
          this.orbs.push(new SolarOrb(this.canvas.width + 10, 80 + Math.random() * (this.canvas.height - 160)));
        }

        // Check if boss should spawn
        if (this.enemiesKilled >= this.enemiesNeeded && !this.boss) {
          this._triggerBoss();
        }
      }
    }

    // Update enemies
    this.enemies = this.enemies.filter(e => e.x > -80);
    this.enemies.forEach(e => e.update(
      this.luz.x + this.luz.w / 2,
      this.luz.y + this.luz.h / 2
    ));

    // Update boss
    if (this.boss) {
      this.boss.update(
        this.luz.x + this.luz.w / 2,
        this.luz.y + this.luz.h / 2
      );
    }

    // Update orbs
    this.orbs = this.orbs.filter(o => o.alive);
    this.orbs.forEach(o => o.update());

    // Update particles
    this.particles = this.particles.filter(p => p.alive);
    this.particles.forEach(p => p.update());

    // Update floating texts
    this.floatingTexts = this.floatingTexts.filter(t => t.alive);
    this.floatingTexts.forEach(t => t.update());

    // ── COLLISIONS ────────────────────────────────────────────
    const luzBounds = { x: this.luz.x + 8, y: this.luz.y + 8, w: this.luz.w - 16, h: this.luz.h - 16 };

    // Luz blasts vs enemies
    this.luz.blasts.forEach(blast => {
      this.enemies.forEach(enemy => {
        if (!blast._hit && rectsOverlap(blast.bounds, enemy.bounds)) {
          blast._hit = true;
          blast.x = -999; // remove blast
          const dead = enemy.takeDamage();
          if (dead) {
            enemy._dead = true;
            const ex = enemy.x + enemy.w / 2;
            const ey = enemy.y + enemy.h / 2;
            this._spawnEnemyExplosion(ex, ey);
            this.floatingTexts.push(new FloatingText(ex, ey - 10, `+${10 + this.currentWorld * 5}W`, '#FFD700', 16));
            this.audio.enemyDie();
            this.score += 10 + this.currentWorld * 5;
            this.enemiesKilled++;
            this.totalEnemiesKilled++;

            // Trigger mid-level quiz at halfway point (once per world)
            const halfway = Math.floor(this.enemiesNeeded / 2);
            if (this.enemiesKilled === halfway && !this._quizShownThisWorld) {
              this._quizShownThisWorld = true;
              setTimeout(() => this._triggerQuiz(), 400);
            }
          }
        }
      });

      // Blast vs boss
      if (this.boss && !blast._hit && rectsOverlap(blast.bounds, this.boss.bounds)) {
        blast._hit = true;
        blast.x = -999;
        this.shake.trigger(3, 8);
        const dead = this.boss.takeDamage();
        this.score += 25;
        this.floatingTexts.push(new FloatingText(this.boss.x + this.boss.w / 2, this.boss.y - 20, '-1 HP', '#FF3366', 14));
        if (dead) this._bossDefeated();
      }
    });

    // Remove dead enemies and hit blasts
    this.enemies = this.enemies.filter(e => !e._dead);
    this.luz.blasts = this.luz.blasts.filter(b => !b._hit);

    // Enemy projectiles vs Luz
    const allProjectiles = [
      ...this.enemies.flatMap(e => e.projectiles || []),
      ...(this.boss ? this.boss.projectiles : [])
    ];

    allProjectiles.forEach(proj => {
      if (proj.alive && rectsOverlap(proj.bounds, luzBounds)) {
        const hit = this.luz.takeDamage();
        if (hit) {
          proj.alive = false;
          this.shake.trigger(8, 20);
          this.audio.playerHit();
          this._spawnExplosion(this.luz.x + this.luz.w / 2, this.luz.y + this.luz.h / 2, '#FF3366', 8);
        }
      }
    });

    // Enemies touching Luz (rushers)
    this.enemies.forEach(enemy => {
      if (rectsOverlap(enemy.bounds, luzBounds)) {
        const hit = this.luz.takeDamage();
        if (hit) {
          this.shake.trigger(6, 18);
          this.audio.playerHit();
        }
      }
    });

    // Luz collect orbs
    this.orbs.forEach(orb => {
      if (orb.alive && rectsOverlap(orb.bounds, luzBounds)) {
        orb.alive = false;
        this.score += 30;
        this.audio.collectOrb();
        this._spawnExplosion(orb.x, orb.y, '#FFD700', 6);
      }
    });

    // Game over check
    if (this.luz.hp <= 0) this._showGameOver();
  }

  _spawnExplosion(x, y, color = '#00FF87', count = 12) {
    const colors = color === '#00FF87'
      ? ['#00FF87', '#FFD700', '#ffffff']
      : [color, '#ffffff', '#FFD700'];
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
    }
  }

  // Big enemy explosion with sparks + squares
  _spawnEnemyExplosion(x, y) {
    createEnemyExplosion(x, y, this.particles);
  }

  _spawnHealthGainEffect(x, y) {
    createHealthGainEffect(x, y, this.particles);
  }

  // ── RENDER ────────────────────────────────────────────────────
  _render() {
    const ctx = this.ctx;
    const { width: W, height: H } = this.canvas;

    if (this.state === STATE.TITLE || this.state === STATE.WORLD_MAP ||
        this.state === STATE.KNOWLEDGE_CARD || this.state === STATE.QUIZ ||
        this.state === STATE.GAME_OVER || this.state === STATE.VICTORY) {
      ctx.fillStyle = '#0A0A1A';
      ctx.fillRect(0, 0, W, H);
      return;
    }

    // Screen shake
    const shake = this.shake.offset;
    ctx.save();
    if (shake.x !== 0) ctx.translate(shake.x, shake.y);

    // Background
    drawMuralBg(ctx, this.currentWorld, W, H, this.scrollX);
    drawStars(ctx, this.stars);

    // Orbs
    this.orbs.forEach(o => o.draw(ctx));

    // Enemies
    this.enemies.forEach(e => e.draw(ctx));

    // Boss
    if (this.boss) this.boss.draw(ctx);

    // Luz
    if (this.luz) this.luz.draw(ctx);

    // Particles
    this.particles.forEach(p => p.draw(ctx));

    // Floating texts
    this.floatingTexts.forEach(t => t.draw(ctx));

    // HUD
    this._drawHUD(ctx, W, H);

    // Boss intro banner
    if (this.state === STATE.BOSS && this.boss && this.boss.animTimer < 120) {
      const alpha = Math.min(1, (120 - this.boss.animTimer) / 60);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(0, H / 2 - 48, W, 96);
      ctx.fillStyle = '#FF3366';
      ctx.font = 'bold 42px Bebas Neue, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(isFinalBoss(this.currentWorld) ? '⚡ BOSS: DON VOLTIO ⚡' : `⚡ BOSS: ${WORLDS[this.currentWorld].bossName.toUpperCase()} ⚡`, W / 2, H / 2 + 14);
      ctx.fillStyle = '#999';
      ctx.font = '12px Space Mono, monospace';
      ctx.fillText('"Energy illiteracy is my most profitable product."', W / 2, H / 2 + 38);
      ctx.globalAlpha = 1;
    }

    ctx.restore();
  }

  _drawHUD(ctx, W, H) {
    ctx.textAlign = 'left';

    // Solar charging bar (HP)
    const barW = 160;
    const barH = 16;
    const barX = 16;
    const barY = 16;

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.roundRect(barX - 2, barY - 2, barW + 52, barH + 4, 4);
    ctx.fill();

    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.roundRect(barX, barY, barW, barH, 3);
    ctx.fill();

    const hpRatio = Math.max(0, this.luz.hp / this.luz.maxHp);
    const hpColor = hpRatio > 0.5 ? '#00FF87' : hpRatio > 0.25 ? '#FFD700' : '#FF3366';
    ctx.fillStyle = hpColor;
    ctx.shadowBlur = 8;
    ctx.shadowColor = hpColor;
    ctx.beginPath();
    ctx.roundRect(barX, barY, barW * hpRatio, barH, 3);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Solar panel icon before bar
    ctx.font = '12px monospace';
    ctx.fillStyle = '#00FF87';
    ctx.fillText('☀', barX + barW + 6, barY + 12);

    // HP label
    ctx.fillStyle = '#888';
    ctx.font = '10px Space Mono, monospace';
    ctx.fillText('SOLAR CHARGE', barX, barY - 4);

    // Shield indicator
    if (this.luz.shieldActive) {
      ctx.fillStyle = '#00FF87';
      ctx.font = 'bold 11px Space Mono, monospace';
      ctx.fillText('🛡 SHIELD ACTIVE', barX, barY + barH + 14);
    } else if (this.luz.shieldTimer > 0 && !this.luz.shieldActive) {
      const pct = Math.round((this.luz.shieldTimer / 300) * 100);
      ctx.fillStyle = '#555';
      ctx.font = '10px Space Mono, monospace';
      ctx.fillText(`SHIELD RECHARGING ${pct}%`, barX, barY + barH + 14);
    } else {
      ctx.fillStyle = '#888';
      ctx.font = '10px Space Mono, monospace';
      ctx.fillText('SHIFT = SHIELD', barX, barY + barH + 14);
    }

    // Score (Watts Generated)
    ctx.textAlign = 'right';
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 18px Bebas Neue, sans-serif';
    ctx.fillText(`⚡ ${this.score.toLocaleString()}`, W - 16, 30);
    ctx.fillStyle = '#888';
    ctx.font = '10px Space Mono, monospace';
    ctx.fillText('WATTS GENERATED', W - 16, 46);

    // World indicator
    ctx.fillStyle = '#555';
    ctx.font = '10px Space Mono, monospace';
    ctx.fillText(`WORLD ${this.currentWorld + 1}/5`, W - 16, 62);

    // Enemy progress (playing state)
    if (this.state === STATE.PLAYING) {
      ctx.textAlign = 'center';
      const prog = Math.min(this.enemiesKilled / this.enemiesNeeded, 1);
      const pbarW = 200;
      const pbarX = W / 2 - pbarW / 2;
      const pbarY = H - 30;

      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(pbarX - 4, pbarY - 14, pbarW + 8, 28);

      ctx.fillStyle = '#333';
      ctx.fillRect(pbarX, pbarY, pbarW, 8);
      ctx.fillStyle = '#FF3366';
      ctx.fillRect(pbarX, pbarY, pbarW * prog, 8);
      ctx.fillStyle = '#aaa';
      ctx.font = '10px Space Mono, monospace';
      ctx.fillText(`BOSS IN: ${Math.max(0, this.enemiesNeeded - this.enemiesKilled)} ENEMIES`, W / 2, pbarY - 4);
    }

    // Cards collected indicator
    const cards = getEnergyIQ();
    if (cards > 0) {
      ctx.textAlign = 'left';
      ctx.fillStyle = '#FFD700';
      ctx.font = '11px Space Mono, monospace';
      ctx.fillText(`📚 ${cards}/5 Cards`, 16, H - 16);
    }

    // Pause hint
    ctx.textAlign = 'right';
    ctx.fillStyle = '#333';
    ctx.font = '10px Space Mono, monospace';
    ctx.fillText('ESC = PAUSE', W - 16, H - 16);
  }
}

// ── BOOT ─────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const game = new LuzGame();
  game.start();
  window._LUZ = game; // expose for debugging
});
