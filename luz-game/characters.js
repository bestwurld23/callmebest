// characters.js — Luz, Enemies, Don Voltio | LUZ Game

// ── PLAYER: LUZ ─────────────────────────────────────────────────
class Luz {
  constructor(canvas) {
    this.canvas = canvas;
    this.w = 44;
    this.h = 52;
    this.x = 80;
    this.y = canvas.height / 2 - this.h / 2;
    this.vx = 0;
    this.vy = 0;
    this.speed = 4.5;
    this.hp = 5;
    this.maxHp = 5;
    this.invincible = 0;      // frames of invincibility after hit
    this.blasts = [];
    this.shootCooldown = 0;
    this.animFrame = 0;
    this.animTimer = 0;
    this.wingAngle = 0;
    this.shieldActive = false;
    this.shieldTimer = 0;
  }

  update(keys, mobileInput) {
    // Movement
    const up    = keys['ArrowUp']    || keys['w'] || mobileInput.up;
    const down  = keys['ArrowDown']  || keys['s'] || mobileInput.down;
    const left  = keys['ArrowLeft']  || keys['a'] || mobileInput.left;
    const right = keys['ArrowRight'] || keys['d'] || mobileInput.right;

    this.vx = (left ? -this.speed : 0) + (right ? this.speed : 0);
    this.vy = (up   ? -this.speed : 0) + (down  ? this.speed : 0);

    // Diagonal normalise
    if (this.vx !== 0 && this.vy !== 0) {
      this.vx *= 0.707;
      this.vy *= 0.707;
    }

    this.x = Math.max(0, Math.min(this.canvas.width  - this.w, this.x + this.vx));
    this.y = Math.max(0, Math.min(this.canvas.height - this.h, this.y + this.vy));

    // Shoot
    if ((keys[' '] || mobileInput.shoot) && this.shootCooldown <= 0) {
      this.shoot();
      this.shootCooldown = 18;
    }
    if (this.shootCooldown > 0) this.shootCooldown--;

    // Shield
    if ((keys['Shift'] || mobileInput.shield) && !this.shieldActive && this.shieldTimer <= 0) {
      this.shieldActive = true;
      this.shieldTimer = 180; // 3 sec active
    }
    if (this.shieldActive) {
      this.shieldTimer--;
      if (this.shieldTimer <= 0) {
        this.shieldActive = false;
        this.shieldTimer = 300; // 5 sec cooldown
      }
    } else if (this.shieldTimer > 0) {
      this.shieldTimer--;
    }

    // Invincibility frames
    if (this.invincible > 0) this.invincible--;

    // Update blasts
    this.blasts = this.blasts.filter(b => b.x < this.canvas.width + 20);
    this.blasts.forEach(b => b.update());

    // Wing animation
    this.wingAngle = Math.sin(Date.now() / 200) * 0.3;

    // Anim cycle
    this.animTimer++;
    if (this.animTimer > 8) { this.animFrame = (this.animFrame + 1) % 4; this.animTimer = 0; }
  }

  shoot() {
    this.blasts.push(new SolarBlast(this.x + this.w, this.y + this.h / 2 - 4));
  }

  takeDamage() {
    if (this.invincible > 0 || this.shieldActive) return false;
    this.hp--;
    this.invincible = 90;
    return true;
  }

  heal(amount = 1) {
    this.hp = Math.min(this.maxHp, this.hp + amount);
  }

  draw(ctx) {
    const cx = this.x + this.w / 2;
    const cy = this.y + this.h / 2;
    const flash = this.invincible > 0 && Math.floor(this.invincible / 5) % 2 === 0;
    if (flash) return;

    // Solar panel wings
    ctx.save();
    ctx.translate(cx, cy);

    // Back wing pair (solar panels)
    for (let s = -1; s <= 1; s += 2) {
      ctx.save();
      ctx.rotate(s * (0.4 + this.wingAngle));
      ctx.fillStyle = '#1a4a2a';
      ctx.beginPath();
      ctx.ellipse(-14, 0, 22, 8, 0.3 * s, 0, Math.PI * 2);
      ctx.fill();
      // Solar cell grid on wing
      ctx.strokeStyle = '#00FF87';
      ctx.lineWidth = 0.8;
      ctx.globalAlpha = 0.7;
      for (let i = -18; i <= -4; i += 7) {
        ctx.beginPath();
        ctx.moveTo(i, -6);
        ctx.lineTo(i, 6);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // Body
    ctx.fillStyle = '#2d7a3a';
    ctx.beginPath();
    ctx.roundRect(-14, -20, 28, 40, 6);
    ctx.fill();

    // Gold stripe
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(-14, -4, 28, 6);

    // Head
    ctx.fillStyle = '#8B5E3C';
    ctx.beginPath();
    ctx.arc(0, -24, 14, 0, Math.PI * 2);
    ctx.fill();

    // Natural hair (afro-ish)
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(0, -30, 16, Math.PI, Math.PI * 2);
    ctx.fill();
    // Hair puffs
    for (let hx = -16; hx <= 16; hx += 8) {
      ctx.beginPath();
      ctx.arc(hx, -38, 8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Eyes
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.ellipse(-4, -23, 4, 3, 0, 0, Math.PI * 2);
    ctx.ellipse(4,  -23, 4, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#00FF87';
    ctx.beginPath();
    ctx.arc(-4, -23, 2, 0, Math.PI * 2);
    ctx.arc(4,  -23, 2, 0, Math.PI * 2);
    ctx.fill();

    // Shield glow
    if (this.shieldActive) {
      ctx.globalAlpha = 0.25 + 0.1 * Math.sin(Date.now() / 80);
      ctx.strokeStyle = '#00FF87';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 32, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    ctx.restore();

    // Draw blasts
    this.blasts.forEach(b => b.draw(ctx));
  }
}

// ── SOLAR BLAST ──────────────────────────────────────────────────
class SolarBlast {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 9;
    this.vy = 0;
    this.r = 6;
    this.trail = [];
  }

  update() {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 8) this.trail.shift();
    this.x += this.vx;
  }

  draw(ctx) {
    // Trail
    this.trail.forEach((p, i) => {
      ctx.globalAlpha = (i / this.trail.length) * 0.4;
      ctx.fillStyle = '#00FF87';
      ctx.beginPath();
      ctx.arc(p.x, p.y, this.r * (i / this.trail.length), 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    // Core
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();

    // Glow
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#00FF87';
    ctx.fillStyle = '#00FF87';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  get bounds() {
    return { x: this.x - this.r, y: this.y - this.r, w: this.r * 2, h: this.r * 2 };
  }
}

// ── DRONE ENEMY ──────────────────────────────────────────────────
class GridLockDrone {
  constructor(canvas, worldIndex) {
    this.canvas = canvas;
    this.w = 36;
    this.h = 28;
    this.x = canvas.width + 20;
    this.y = 80 + Math.random() * (canvas.height - 160);
    this.speed = 1.8 + worldIndex * 0.3 + Math.random() * 1.2;
    this.hp = 1 + worldIndex;
    this.maxHp = this.hp;
    this.bobOffset = Math.random() * Math.PI * 2;
    this.shootTimer = Math.floor(Math.random() * 180);
    this.projectiles = [];
    this.worldIndex = worldIndex;
    this.type = Math.random() > 0.7 ? 'shooter' : 'rusher';
  }

  update(playerX, playerY) {
    this.x -= this.speed;
    this.y += Math.sin(Date.now() / 600 + this.bobOffset) * 0.8;

    // Shoot if shooter type
    if (this.type === 'shooter') {
      this.shootTimer--;
      if (this.shootTimer <= 0) {
        const dx = playerX - this.x;
        const dy = playerY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 500) {
          this.projectiles.push(new EnemyProjectile(this.x, this.y + this.h / 2, dx / dist * 4, dy / dist * 4));
        }
        this.shootTimer = 120 + Math.floor(Math.random() * 120);
      }
    }

    this.projectiles = this.projectiles.filter(p => p.alive);
    this.projectiles.forEach(p => p.update());
  }

  takeDamage() {
    this.hp--;
    return this.hp <= 0;
  }

  draw(ctx) {
    const cx = this.x + this.w / 2;
    const cy = this.y + this.h / 2;

    // Body
    ctx.fillStyle = '#8B0000';
    ctx.beginPath();
    ctx.roundRect(this.x, this.y + 6, this.w, this.h - 12, 4);
    ctx.fill();

    // Wings/rotors
    ctx.fillStyle = '#5a0000';
    ctx.fillRect(this.x - 8, this.y + 2, 12, 6);
    ctx.fillRect(this.x + this.w - 4, this.y + 2, 12, 6);
    ctx.fillRect(this.x - 8, this.y + this.h - 8, 12, 6);
    ctx.fillRect(this.x + this.w - 4, this.y + this.h - 8, 12, 6);

    // GridLock Corp logo (GLC)
    ctx.fillStyle = '#FF3333';
    ctx.font = 'bold 8px Space Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('GLC', cx, cy + 3);

    // Red eye
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(this.x + 8, cy, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#ff0000';
    ctx.fill();
    ctx.shadowBlur = 0;

    // HP bar
    if (this.maxHp > 1) {
      ctx.fillStyle = '#333';
      ctx.fillRect(this.x, this.y - 8, this.w, 4);
      ctx.fillStyle = '#ff4444';
      ctx.fillRect(this.x, this.y - 8, this.w * (this.hp / this.maxHp), 4);
    }

    // Draw projectiles
    this.projectiles.forEach(p => p.draw(ctx));
  }

  get bounds() {
    return { x: this.x, y: this.y, w: this.w, h: this.h };
  }
}

// ── CONFUSION CLOUD (World 5) ─────────────────────────────────────
class ConfusionCloud {
  constructor(canvas, worldIndex) {
    this.canvas = canvas;
    this.w = 60;
    this.h = 40;
    this.x = canvas.width + 20;
    this.y = 60 + Math.random() * (canvas.height - 120);
    this.speed = 1.2 + Math.random() * 0.8;
    this.hp = 2;
    this.maxHp = 2;
    this.bobOffset = Math.random() * Math.PI * 2;
    this.alpha = 0.7 + Math.random() * 0.3;
    this.projectiles = [];
    this.shootTimer = 90 + Math.floor(Math.random() * 90);
  }

  update(playerX, playerY) {
    this.x -= this.speed;
    this.y += Math.sin(Date.now() / 800 + this.bobOffset) * 1.2;
    this.alpha = 0.65 + 0.15 * Math.sin(Date.now() / 300 + this.bobOffset);

    this.shootTimer--;
    if (this.shootTimer <= 0) {
      // Shoot 3 spread shots
      for (let a = -0.3; a <= 0.3; a += 0.3) {
        this.projectiles.push(new EnemyProjectile(this.x, this.y + this.h / 2, -4 * Math.cos(a), -4 * Math.sin(a), '#9933ff'));
      }
      this.shootTimer = 150 + Math.floor(Math.random() * 100);
    }

    this.projectiles = this.projectiles.filter(p => p.alive);
    this.projectiles.forEach(p => p.update());
  }

  takeDamage() { this.hp--; return this.hp <= 0; }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = '#6600cc';
    ctx.beginPath();
    ctx.arc(this.x + 20, this.y + 20, 22, 0, Math.PI * 2);
    ctx.arc(this.x + 40, this.y + 18, 18, 0, Math.PI * 2);
    ctx.arc(this.x + 10, this.y + 22, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = '#cc44ff';
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('?!#%', this.x + 30, this.y + 24);
    ctx.restore();
    this.projectiles.forEach(p => p.draw(ctx));
  }

  get bounds() { return { x: this.x, y: this.y, w: this.w, h: this.h }; }
}

// ── ENEMY PROJECTILE ─────────────────────────────────────────────
class EnemyProjectile {
  constructor(x, y, vx, vy, color = '#ff4400') {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.r = 5;
    this.color = color;
    this.alive = true;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < -20 || this.x > 820 || this.y < -20 || this.y > 620) this.alive = false;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  get bounds() { return { x: this.x - this.r, y: this.y - this.r, w: this.r * 2, h: this.r * 2 }; }
}

// ── DON VOLTIO (BOSS) ────────────────────────────────────────────
class DonVoltio {
  constructor(canvas, worldIndex, isFinal) {
    this.canvas = canvas;
    this.isFinal = isFinal;
    this.w = isFinal ? 90 : 70;
    this.h = isFinal ? 110 : 88;
    this.x = canvas.width - this.w - 40;
    this.y = canvas.height / 2 - this.h / 2;
    this.hp = isFinal ? 20 : (8 + worldIndex * 2);
    this.maxHp = this.hp;
    this.phase = 1;
    this.projectiles = [];
    this.shootTimer = 60;
    this.moveTimer = 0;
    this.targetY = this.y;
    this.smokeParticles = [];
    this.worldIndex = worldIndex;
    this.animTimer = 0;
    this.tauntTimer = 300;
    this.currentTaunt = '';
    this.tauntAlpha = 0;

    this.taunts = [
      "Energy illiteracy is my most profitable product.",
      "Your community NEEDS my fossil fuels.",
      "Solar doesn't work for YOUR neighborhood...",
      "You can't afford to fight GridLock Corp!",
      "The grid belongs to ME.",
      "Sigue dependiendo de nosotros...",
    ];
  }

  update(playerX, playerY) {
    // Phase transition
    if (this.hp <= this.maxHp * 0.5 && this.phase === 1) this.phase = 2;
    if (this.hp <= this.maxHp * 0.25 && this.phase === 2) this.phase = 3;

    // Movement
    this.moveTimer++;
    if (this.moveTimer > 90) {
      this.targetY = 60 + Math.random() * (this.canvas.height - 120 - this.h);
      this.moveTimer = 0;
    }
    this.y += (this.targetY - this.y) * 0.03;

    // Shooting
    this.shootTimer--;
    const rate = this.phase === 3 ? 25 : this.phase === 2 ? 40 : 60;
    if (this.shootTimer <= 0) {
      this.fireAtPlayer(playerX, playerY);
      this.shootTimer = rate;
    }

    // Smoke particles
    if (Math.random() < 0.3) {
      this.smokeParticles.push({
        x: this.x + Math.random() * this.w,
        y: this.y + Math.random() * this.h,
        vx: -0.5 - Math.random(),
        vy: -0.5 + Math.random(),
        alpha: 0.5,
        r: 6 + Math.random() * 8
      });
    }
    this.smokeParticles = this.smokeParticles.filter(p => p.alpha > 0);
    this.smokeParticles.forEach(p => { p.x += p.vx; p.y += p.vy; p.alpha -= 0.008; });

    // Projectiles
    this.projectiles = this.projectiles.filter(p => p.alive);
    this.projectiles.forEach(p => p.update());

    // Taunts
    this.tauntTimer--;
    if (this.tauntTimer <= 0) {
      this.currentTaunt = this.taunts[Math.floor(Math.random() * this.taunts.length)];
      this.tauntAlpha = 1;
      this.tauntTimer = 200 + Math.floor(Math.random() * 200);
    }
    if (this.tauntAlpha > 0) this.tauntAlpha -= 0.005;

    this.animTimer++;
  }

  fireAtPlayer(px, py) {
    const cx = this.x;
    const cy = this.y + this.h / 2;
    const dx = px - cx;
    const dy = py - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (this.phase === 1) {
      // Single shot
      this.projectiles.push(new EnemyProjectile(cx, cy, dx / dist * 5, dy / dist * 5));
    } else if (this.phase === 2) {
      // 3-way spread
      for (let a = -0.35; a <= 0.35; a += 0.35) {
        const angle = Math.atan2(dy, dx) + a;
        this.projectiles.push(new EnemyProjectile(cx, cy, Math.cos(angle) * 5.5, Math.sin(angle) * 5.5));
      }
    } else {
      // 5-way spread + speed boost
      for (let a = -0.6; a <= 0.6; a += 0.3) {
        const angle = Math.atan2(dy, dx) + a;
        this.projectiles.push(new EnemyProjectile(cx, cy, Math.cos(angle) * 6.5, Math.sin(angle) * 6.5));
      }
    }
  }

  takeDamage() {
    this.hp--;
    return this.hp <= 0;
  }

  draw(ctx) {
    const cx = this.x + this.w / 2;
    const cy = this.y + this.h / 2;

    // Smoke
    this.smokeParticles.forEach(p => {
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = '#4a3000';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    // Shadow
    ctx.fillStyle = 'rgba(139,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(cx, this.y + this.h + 8, this.w * 0.6, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Suit body
    const suitColor = this.phase === 3 ? '#5a0000' : this.phase === 2 ? '#6b0000' : '#8B0000';
    ctx.fillStyle = suitColor;
    ctx.beginPath();
    ctx.roundRect(this.x + 8, this.y + 30, this.w - 16, this.h - 30, 6);
    ctx.fill();

    // Suit jacket lines
    ctx.strokeStyle = '#4a0000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, this.y + 30);
    ctx.lineTo(cx, this.y + this.h);
    ctx.stroke();

    // White shirt / tie
    ctx.fillStyle = '#eee';
    ctx.fillRect(cx - 6, this.y + 30, 12, 28);
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(cx - 3, this.y + 34, 6, 22);

    // Money symbols on suit
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('$', this.x + 18, this.y + 60);
    ctx.fillText('$', this.x + this.w - 18, this.y + 60);

    // Head
    ctx.fillStyle = '#c8956c';
    ctx.beginPath();
    ctx.arc(cx, this.y + 18, 22, 0, Math.PI * 2);
    ctx.fill();

    // Slicked hair
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.ellipse(cx, this.y + 4, 22, 14, 0, Math.PI, Math.PI * 2);
    ctx.fill();

    // Villain eyes (glowing red)
    ctx.fillStyle = '#ff0000';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ff0000';
    ctx.beginPath();
    ctx.ellipse(cx - 7, this.y + 16, 5, 4, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 7, this.y + 16, 5, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Smoke / fossil fuel aura in phase 2+
    if (this.phase >= 2) {
      ctx.globalAlpha = 0.15 + 0.05 * Math.sin(this.animTimer / 15);
      ctx.fillStyle = '#4a3000';
      ctx.beginPath();
      ctx.arc(cx, cy, 55, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // HP bar
    const barW = this.w + 20;
    const barX = this.x - 10;
    const barY = this.y - 20;
    ctx.fillStyle = '#333';
    ctx.fillRect(barX, barY, barW, 8);
    const hpRatio = this.hp / this.maxHp;
    ctx.fillStyle = hpRatio > 0.5 ? '#cc0000' : hpRatio > 0.25 ? '#ff6600' : '#ff0000';
    ctx.fillRect(barX, barY, barW * hpRatio, 8);
    ctx.strokeStyle = '#ff4444';
    ctx.lineWidth = 1;
    ctx.strokeRect(barX, barY, barW, 8);

    // Name label
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 11px Space Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(this.isFinal ? '★ DON VOLTIO ★' : 'DON VOLTIO JR.', cx, barY - 4);

    // Taunt
    if (this.tauntAlpha > 0) {
      ctx.globalAlpha = Math.min(1, this.tauntAlpha * 2);
      ctx.fillStyle = '#fff';
      ctx.font = '11px Caveat, cursive';
      ctx.textAlign = 'center';
      // Speech bubble
      const tw = Math.min(this.currentTaunt.length * 6.5, 220);
      const tx = Math.max(tw / 2 + 10, this.x - 10);
      const ty = this.y - 40;
      ctx.fillStyle = 'rgba(0,0,0,0.75)';
      ctx.beginPath();
      ctx.roundRect(tx - tw / 2 - 8, ty - 18, tw + 16, 26, 4);
      ctx.fill();
      ctx.fillStyle = '#ffcccc';
      ctx.font = '12px Caveat, cursive';
      ctx.fillText(`"${this.currentTaunt}"`, tx, ty);
      ctx.globalAlpha = 1;
    }

    // Projectiles
    this.projectiles.forEach(p => p.draw(ctx));
  }

  get bounds() {
    return { x: this.x + 8, y: this.y + 20, w: this.w - 16, h: this.h - 20 };
  }
}

// ── PARTICLE ─────────────────────────────────────────────────────
class Particle {
  constructor(x, y, color = '#00FF87', opts = {}) {
    this.x = x;
    this.y = y;
    const angle = opts.angle !== undefined ? opts.angle : Math.random() * Math.PI * 2;
    const speed = opts.speed !== undefined ? opts.speed : (1 + Math.random() * 5);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1;
    this.r = opts.r !== undefined ? opts.r : (2 + Math.random() * 4);
    this.color = color;
    this.gravity = opts.gravity !== undefined ? opts.gravity : 0.08;
    this.decay = opts.decay || 0.025;
    this.shape = opts.shape || 'circle'; // 'circle' | 'spark' | 'square'
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.vx *= 0.97;
    this.alpha -= this.decay;
    this.r *= 0.97;
  }

  get alive() { return this.alpha > 0; }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = this.color;

    if (this.shape === 'spark') {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - this.vx * 3, this.y - this.vy * 3);
      ctx.stroke();
    } else if (this.shape === 'square') {
      ctx.fillRect(this.x - this.r / 2, this.y - this.r / 2, this.r, this.r);
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.max(0.5, this.r), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

// ── FLOATING TEXT ─────────────────────────────────────────────────
class FloatingText {
  constructor(x, y, text, color = '#FFD700', size = 18) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = color;
    this.size = size;
    this.alpha = 1;
    this.vy = -1.8;
  }

  update() {
    this.y += this.vy;
    this.alpha -= 0.018;
  }

  get alive() { return this.alpha > 0; }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = this.color;
    ctx.font = `bold ${this.size}px Bebas Neue, sans-serif`;
    ctx.textAlign = 'center';
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fillText(this.text, this.x, this.y);
    ctx.restore();
  }
}

// ── EXPLOSION HELPERS ─────────────────────────────────────────────
function createEnemyExplosion(x, y, particleArray) {
  const colors = ['#FF3366', '#FFD700', '#FF6600', '#FF3366', '#FFFFFF', '#8B0000'];
  // 30-particle burst in all directions
  for (let i = 0; i < 30; i++) {
    const angle = (Math.PI * 2 / 30) * i + (Math.random() - 0.5) * 0.4;
    const speed = 3 + Math.random() * 7;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = Math.random() > 0.5 ? 'spark' : 'circle';
    particleArray.push(new Particle(x, y, color, {
      angle, speed,
      r: 2 + Math.random() * 5,
      gravity: 0.12,
      decay: 0.02 + Math.random() * 0.025,
      shape
    }));
  }
  // 8 square chunks flying outward
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI * 2 / 8) * i;
    particleArray.push(new Particle(x, y, '#FFD700', {
      angle, speed: 5 + Math.random() * 4,
      r: 6, gravity: 0.15, decay: 0.04, shape: 'square'
    }));
  }
}

function createHealthGainEffect(x, y, particleArray) {
  // Rising green sparkles
  for (let i = 0; i < 20; i++) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI;
    particleArray.push(new Particle(
      x + (Math.random() - 0.5) * 60,
      y,
      Math.random() > 0.4 ? '#00FF87' : '#FFD700',
      { angle, speed: 1.5 + Math.random() * 2.5, r: 3 + Math.random() * 3, gravity: -0.08, decay: 0.018, shape: 'circle' }
    ));
  }
}

// ── SOLAR ORB (collectible) ───────────────────────────────────────
class SolarOrb {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 10;
    this.bobOffset = Math.random() * Math.PI * 2;
    this.alive = true;
    this.vx = -1.5;
  }

  update() {
    this.x += this.vx;
    this.y += Math.sin(Date.now() / 400 + this.bobOffset) * 0.5;
    if (this.x < -30) this.alive = false;
  }

  draw(ctx) {
    const pulse = 0.85 + 0.15 * Math.sin(Date.now() / 200 + this.bobOffset);
    ctx.fillStyle = '#FFD700';
    ctx.shadowBlur = 14;
    ctx.shadowColor = '#FFD700';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r * pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('⚡', this.x, this.y + 4);
  }

  get bounds() { return { x: this.x - this.r, y: this.y - this.r, w: this.r * 2, h: this.r * 2 }; }
}
