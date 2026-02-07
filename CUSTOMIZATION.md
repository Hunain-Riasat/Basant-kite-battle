# Features & Customization Guide

## 🎮 Game Features

### Core Gameplay
- **Single-player arcade action** - Fast-paced kite battles
- **AI opponents** - Computer-controlled kites with intelligent movement
- **Progressive difficulty** - Game gets harder over time
- **Lives system** - 3 lives to start, lose one when AI kites collide
- **Combo system** - Chain cuts for bonus multipliers
- **High score tracking** - Persistent scores saved locally

### Visual Features
- **Neon aesthetic** - Vibrant, eye-catching colors
- **Particle effects** - Explosions when kites are cut
- **Smooth animations** - 60 FPS canvas rendering
- **Kite trails** - Dynamic motion trails
- **Glow effects** - Neon glow on kites and UI
- **Responsive design** - Works on desktop, tablet, and mobile

### Control Systems
- **Keyboard** - WASD or Arrow keys
- **Mouse** - Move toward cursor (optional enhancement)
- **Touch** - Touch controls for mobile devices
- **Pause/Resume** - ESC key pauses game

### UI/UX Features
- **Main menu** - Clean start screen with instructions
- **HUD display** - Score, high score, lives, combo
- **Pause screen** - Resume or quit options
- **Game over screen** - Final score with play again option
- **Visual feedback** - Real-time combo indicators

## ⚙️ Customization Options

### 1. Difficulty Settings

Edit `src/utils/constants.js`:

```javascript
export const GAME_CONFIG = {
  INITIAL_LIVES: 3,              // Starting lives (1-10)
  INITIAL_AI_KITES: 3,           // Starting AI kites (1-10)
  MAX_AI_KITES: 12,              // Maximum kites (5-20)
  AI_SPAWN_INTERVAL: 8000,       // Spawn rate in ms (faster = harder)
  DIFFICULTY_INCREASE_INTERVAL: 15000, // How often difficulty increases
};
```

**Easy Mode:**
```javascript
INITIAL_AI_KITES: 2,
MAX_AI_KITES: 8,
AI_SPAWN_INTERVAL: 12000,
DIFFICULTY_INCREASE_INTERVAL: 20000,
```

**Hard Mode:**
```javascript
INITIAL_AI_KITES: 5,
MAX_AI_KITES: 20,
AI_SPAWN_INTERVAL: 5000,
DIFFICULTY_INCREASE_INTERVAL: 10000,
```

### 2. AI Behavior

```javascript
export const AI_CONFIG = {
  SIZE: 25,                      // Kite size (15-40)
  BASE_SPEED: 2,                 // Starting speed (1-5)
  SPEED_INCREMENT: 0.3,          // Speed increase per difficulty tick
  MAX_SPEED: 6,                  // Maximum AI speed
  DIRECTION_CHANGE_INTERVAL: 2000, // Movement pattern change (ms)
  WANDER_RADIUS: 100,            // How far AI kites roam
};
```

**Aggressive AI:**
```javascript
BASE_SPEED: 3,
SPEED_INCREMENT: 0.5,
DIRECTION_CHANGE_INTERVAL: 1000, // Change direction more often
```

**Passive AI:**
```javascript
BASE_SPEED: 1.5,
SPEED_INCREMENT: 0.2,
DIRECTION_CHANGE_INTERVAL: 3000,
```

### 3. Visual Customization

#### Color Scheme
Edit `src/index.css`:

```css
:root {
  /* Main theme colors */
  --neon-pink: #ff0080;
  --neon-cyan: #00ffff;
  --neon-green: #39ff14;
  --neon-orange: #ff6b00;
  --neon-purple: #bf00ff;
  --neon-yellow: #ffff00;
}
```

**Retro Theme:**
```css
--neon-pink: #ff6ec7;
--neon-cyan: #7afcff;
--neon-green: #7fff00;
--bg-night: #1a0033;
```

**Warm Theme:**
```css
--neon-pink: #ff4444;
--neon-cyan: #ffaa00;
--neon-green: #ffff44;
--bg-night: #2a1a0a;
```

#### Kite Colors
Edit `src/utils/constants.js`:

```javascript
export const KITE_COLORS = [
  '#ff0080',  // Add or remove colors
  '#00ffff',
  '#39ff14',
  // Add custom colors here
];
```

### 4. Physics & Movement

```javascript
export const PHYSICS = {
  WIND_STRENGTH: 0.3,            // Wind effect (0-1)
  WIND_CHANGE_INTERVAL: 5000,    // Wind pattern change (ms)
  GRAVITY: 0.05,                 // Downward pull (0-0.5)
  FRICTION: 0.98,                // Speed dampening (0.9-0.99)
};
```

**Windy Conditions:**
```javascript
WIND_STRENGTH: 0.6,
WIND_CHANGE_INTERVAL: 3000,
```

**Calm Sky:**
```javascript
WIND_STRENGTH: 0.1,
WIND_CHANGE_INTERVAL: 8000,
```

### 5. Player Controls

```javascript
export const PLAYER_CONFIG = {
  SIZE: 30,          // Player kite size
  SPEED: 6,          // Movement speed
  TRAIL_LENGTH: 15,  // Trail points
};
```

**Fast & Agile:**
```javascript
SPEED: 8,
SIZE: 25,
```

**Slow & Steady:**
```javascript
SPEED: 4,
SIZE: 35,
```

### 6. Scoring System

```javascript
export const SCORE_CONFIG = {
  CUT_BASE: 100,         // Points per cut
  COMBO_MULTIPLIER: 50,  // Bonus per combo level
  COMBO_TIMEOUT: 3000,   // Time to maintain combo (ms)
};
```

**High Scoring:**
```javascript
CUT_BASE: 200,
COMBO_MULTIPLIER: 100,
COMBO_TIMEOUT: 4000,
```

**Low Scoring (longer games):**
```javascript
CUT_BASE: 50,
COMBO_MULTIPLIER: 25,
COMBO_TIMEOUT: 2000,
```

### 7. Visual Effects

```javascript
export const PARTICLE_CONFIG = {
  COUNT: 15,              // Particles per cut (5-30)
  LIFETIME: 600,          // Particle duration (ms)
  SPEED_RANGE: [1, 4],    // Particle velocity
  SIZE_RANGE: [2, 6],     // Particle size
};
```

**Epic Explosions:**
```javascript
COUNT: 30,
LIFETIME: 1000,
SPEED_RANGE: [2, 6],
SIZE_RANGE: [3, 8],
```

**Subtle Effects:**
```javascript
COUNT: 8,
LIFETIME: 400,
SPEED_RANGE: [1, 3],
SIZE_RANGE: [1, 4],
```

## 🎨 Advanced Customization

### Adding Difficulty Modes

Create `src/utils/difficultyModes.js`:

```javascript
export const DIFFICULTY_MODES = {
  EASY: {
    lives: 5,
    aiKites: 2,
    spawnInterval: 10000,
    aiSpeed: 1.5,
  },
  NORMAL: {
    lives: 3,
    aiKites: 3,
    spawnInterval: 8000,
    aiSpeed: 2,
  },
  HARD: {
    lives: 2,
    aiKites: 5,
    spawnInterval: 5000,
    aiSpeed: 3,
  },
};
```

### Custom Kite Skins

Add to `Kite.js`:

```javascript
const KITE_SKINS = {
  DEFAULT: { shape: 'diamond', pattern: 'solid' },
  STRIPED: { shape: 'diamond', pattern: 'striped' },
  BUTTERFLY: { shape: 'butterfly', pattern: 'gradient' },
};
```

### Power-Ups (Example)

Create `src/utils/PowerUp.js`:

```javascript
export class PowerUp {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type; // 'speed', 'shield', 'multiCut'
    this.duration = 5000;
  }
  
  apply(player) {
    switch(this.type) {
      case 'speed':
        player.speed *= 1.5;
        break;
      case 'shield':
        player.invincible = true;
        break;
      // ... more power-ups
    }
  }
}
```

## 🔧 Performance Tuning

### For Low-End Devices

```javascript
// Reduce visual effects
PARTICLE_CONFIG.COUNT = 5;
PLAYER_CONFIG.TRAIL_LENGTH = 8;
AI_CONFIG.TRAIL_LENGTH = 5;

// Lower max kites
GAME_CONFIG.MAX_AI_KITES = 8;
```

### For High-End Devices

```javascript
// Increase visual fidelity
PARTICLE_CONFIG.COUNT = 25;
PLAYER_CONFIG.TRAIL_LENGTH = 20;

// More challenging
GAME_CONFIG.MAX_AI_KITES = 20;
```

## 📱 Mobile Optimization

In `GameEngine.js`, add touch sensitivity:

```javascript
// Adjust for mobile
if (this.touchActive) {
  const dx = this.mouseX - this.player.x;
  const dy = this.mouseY - this.player.y;
  const distance = Math.sqrt(dx*dx + dy*dy);
  
  if (distance > 20) { // Dead zone
    this.player.moveTowards(dx/distance, dy/distance);
  }
}
```

## 🎵 Adding Sound Effects

1. Add audio files to `public/sounds/`
2. Update `helpers.js`:

```javascript
const sounds = {
  cut: new Audio('/sounds/cut.mp3'),
  combo: new Audio('/sounds/combo.mp3'),
  gameOver: new Audio('/sounds/gameover.mp3'),
};

export const playSound = (name) => {
  if (sounds[name]) {
    sounds[name].currentTime = 0;
    sounds[name].play();
  }
};
```

3. Call in game events:

```javascript
// In GameEngine.js checkCollisions()
aiKite.cut();
playSound('cut');
```

## 🎯 Quick Preset Configurations

### Casual Mode
```javascript
INITIAL_LIVES: 5
AI_SPAWN_INTERVAL: 12000
BASE_SPEED: 1.5
COMBO_TIMEOUT: 5000
```

### Arcade Mode
```javascript
INITIAL_LIVES: 3
AI_SPAWN_INTERVAL: 6000
BASE_SPEED: 2.5
COMBO_TIMEOUT: 2500
```

### Chaos Mode
```javascript
INITIAL_LIVES: 1
INITIAL_AI_KITES: 8
AI_SPAWN_INTERVAL: 3000
MAX_AI_KITES: 25
BASE_SPEED: 3
```

---

**Pro Tip:** After making changes, restart the dev server (`npm run dev`) to see your customizations!

For more technical details, see **DEVELOPMENT.md**
