import { Kite } from './Kite';
import { ParticleSystem } from './ParticleSystem';
import { 
  GAME_CONFIG, 
  GAME_STATES, 
  PHYSICS,
  AI_CONFIG,
  SCORE_CONFIG,
  CONTROLS
} from './constants';
import { 
  randomPosition, 
  random,
  saveHighScore,
  getHighScore 
} from './helpers';

export class GameEngine {
  constructor(canvasRef) {
    this.canvas = canvasRef;
    this.ctx = canvasRef.getContext('2d');
    
    // Game state
    this.state = GAME_STATES.MENU;
    this.score = 0;
    this.highScore = getHighScore();
    this.lives = GAME_CONFIG.INITIAL_LIVES;
    this.combo = 0;
    this.comboTimer = 0;
    
    // Game objects
    this.player = null;
    this.aiKites = [];
    this.particles = new ParticleSystem();
    
    // Physics
    this.wind = { x: 0, y: 0 };
    this.windTimer = 0;
    
    // Difficulty
    this.difficultyMultiplier = 1;
    this.difficultyTimer = 0;
    this.spawnTimer = 0;
    
    // Controls
    this.keys = {};
    this.mouseX = 0;
    this.mouseY = 0;
    this.touchActive = false;
    
    // Animation
    this.lastTime = 0;
    this.animationId = null;
    
    // Callbacks
    this.onStateChange = null;
    this.onScoreChange = null;
    this.onLivesChange = null;
    this.onComboChange = null;
    
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    // Keyboard
    window.addEventListener('keydown', (e) => {
      this.keys[e.key] = true;
      
      // Pause on Escape
      if (CONTROLS.PAUSE.includes(e.key) && this.state === GAME_STATES.PLAYING) {
        this.pause();
      }
    });
    
    window.addEventListener('keyup', (e) => {
      this.keys[e.key] = false;
    });
    
    // Mouse
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });
    
    // Touch
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.touchActive = true;
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      this.mouseX = touch.clientX - rect.left;
      this.mouseY = touch.clientY - rect.top;
    });
    
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (this.touchActive) {
        const rect = this.canvas.getBoundingClientRect();
        const touch = e.touches[0];
        this.mouseX = touch.clientX - rect.left;
        this.mouseY = touch.clientY - rect.top;
      }
    });
    
    this.canvas.addEventListener('touchend', () => {
      this.touchActive = false;
    });
  }
  
  startGame() {
    this.state = GAME_STATES.PLAYING;
    this.score = 0;
    this.lives = GAME_CONFIG.INITIAL_LIVES;
    this.combo = 0;
    this.comboTimer = 0;
    this.difficultyMultiplier = 1;
    this.difficultyTimer = 0;
    this.spawnTimer = 0;
    
    // Create player kite
    const center = { x: GAME_CONFIG.WIDTH / 2, y: GAME_CONFIG.HEIGHT / 2 };
    this.player = new Kite(center.x, center.y, true);
    
    // Create initial AI kites
    this.aiKites = [];
    for (let i = 0; i < GAME_CONFIG.INITIAL_AI_KITES; i++) {
      this.spawnAIKite();
    }
    
    // Clear particles
    this.particles.clear();
    
    // Notify state change
    if (this.onStateChange) this.onStateChange(this.state);
    if (this.onScoreChange) this.onScoreChange(this.score, this.highScore);
    if (this.onLivesChange) this.onLivesChange(this.lives);
    
    // Start game loop
    this.lastTime = performance.now();
    this.gameLoop();
  }
  
  pause() {
    if (this.state === GAME_STATES.PLAYING) {
      this.state = GAME_STATES.PAUSED;
      if (this.onStateChange) this.onStateChange(this.state);
    }
  }
  
  resume() {
    if (this.state === GAME_STATES.PAUSED) {
      this.state = GAME_STATES.PLAYING;
      if (this.onStateChange) this.onStateChange(this.state);
      this.lastTime = performance.now();
      this.gameLoop();
    }
  }
  
  gameOver() {
    this.state = GAME_STATES.GAME_OVER;
    
    // Save high score
    const newRecord = saveHighScore(this.score);
    if (newRecord) {
      this.highScore = this.score;
    }
    
    if (this.onStateChange) this.onStateChange(this.state);
  }
  
  spawnAIKite() {
    if (this.aiKites.length >= GAME_CONFIG.MAX_AI_KITES) return;
    
    // Spawn from edges
    const pos = randomPosition(GAME_CONFIG.WIDTH, GAME_CONFIG.HEIGHT, 100);
    const edge = Math.floor(random(0, 4));
    
    switch (edge) {
      case 0: pos.y = 50; break; // Top
      case 1: pos.y = GAME_CONFIG.HEIGHT - 50; break; // Bottom
      case 2: pos.x = 50; break; // Left
      case 3: pos.x = GAME_CONFIG.WIDTH - 50; break; // Right
    }
    
    const kite = new Kite(pos.x, pos.y, false);
    this.aiKites.push(kite);
  }
  
  updateWind(deltaTime) {
    this.windTimer += deltaTime;
    
    if (this.windTimer > PHYSICS.WIND_CHANGE_INTERVAL) {
      this.windTimer = 0;
      
      // Generate new wind direction
      const angle = random(0, Math.PI * 2);
      const strength = random(0, PHYSICS.WIND_STRENGTH);
      
      this.wind.x = Math.cos(angle) * strength;
      this.wind.y = Math.sin(angle) * strength;
    }
  }
  
  updateDifficulty(deltaTime) {
    this.difficultyTimer += deltaTime;
    
    if (this.difficultyTimer > GAME_CONFIG.DIFFICULTY_INCREASE_INTERVAL) {
      this.difficultyTimer = 0;
      this.difficultyMultiplier += 0.15;
    }
  }
  
  updateSpawning(deltaTime) {
    this.spawnTimer += deltaTime;
    
    const spawnInterval = GAME_CONFIG.AI_SPAWN_INTERVAL / this.difficultyMultiplier;
    
    if (this.spawnTimer > spawnInterval) {
      this.spawnTimer = 0;
      this.spawnAIKite();
    }
  }
  
  handlePlayerMovement() {
    if (!this.player || !this.player.alive) return;
    
    let dx = 0;
    let dy = 0;
    
    // Keyboard controls
    if (CONTROLS.UP.some(k => this.keys[k])) dy -= 1;
    if (CONTROLS.DOWN.some(k => this.keys[k])) dy += 1;
    if (CONTROLS.LEFT.some(k => this.keys[k])) dx -= 1;
    if (CONTROLS.RIGHT.some(k => this.keys[k])) dx += 1;
    
    // Normalize diagonal movement
    if (dx !== 0 && dy !== 0) {
      const len = Math.sqrt(dx * dx + dy * dy);
      dx /= len;
      dy /= len;
    }
    
    if (dx !== 0 || dy !== 0) {
      this.player.moveTowards(dx, dy);
    }
  }
  
  checkCollisions() {
    if (!this.player || !this.player.alive) return;
    
    for (let i = this.aiKites.length - 1; i >= 0; i--) {
      const aiKite = this.aiKites[i];
      
      if (!aiKite.alive) {
        // Remove dead kites after fade out
        if (aiKite.fadeOut >= 1) {
          this.aiKites.splice(i, 1);
        }
        continue;
      }
      
      // Check collision with player
      if (this.player.checkCollision(aiKite)) {
        // Player cuts AI kite
        aiKite.cut();
        this.particles.emit(aiKite.x, aiKite.y, aiKite.color, 20);
        
        // Update score and combo
        this.combo++;
        this.comboTimer = SCORE_CONFIG.COMBO_TIMEOUT;
        const points = SCORE_CONFIG.CUT_BASE + (this.combo - 1) * SCORE_CONFIG.COMBO_MULTIPLIER;
        this.score += points;
        
        if (this.onScoreChange) this.onScoreChange(this.score, this.highScore);
        if (this.onComboChange) this.onComboChange(this.combo);
      }
    }
    
    // Check if AI kites collide with each other (player loses life)
    for (let i = 0; i < this.aiKites.length; i++) {
      for (let j = i + 1; j < this.aiKites.length; j++) {
        const kite1 = this.aiKites[i];
        const kite2 = this.aiKites[j];
        
        if (kite1.alive && kite2.alive && kite1.checkCollision(kite2)) {
          // One AI kite cuts another - player loses a life
          kite2.cut();
          this.particles.emit(kite2.x, kite2.y, kite2.color, 15);
          
          this.lives--;
          if (this.onLivesChange) this.onLivesChange(this.lives);
          
          if (this.lives <= 0) {
            this.gameOver();
          }
          
          break;
        }
      }
    }
  }
  
  update(deltaTime) {
    if (this.state !== GAME_STATES.PLAYING) return;
    
    // Update timers
    this.updateWind(deltaTime);
    this.updateDifficulty(deltaTime);
    this.updateSpawning(deltaTime);
    
    // Handle input
    this.handlePlayerMovement();
    
    // Update player
    if (this.player) {
      this.player.update(deltaTime, this.wind);
    }
    
    // Update AI kites
    this.aiKites.forEach(kite => {
      kite.update(deltaTime, this.wind, this.difficultyMultiplier);
    });
    
    // Update particles
    this.particles.update(deltaTime);
    
    // Check collisions
    this.checkCollisions();
    
    // Update combo timer
    if (this.combo > 0) {
      this.comboTimer -= deltaTime;
      if (this.comboTimer <= 0) {
        this.combo = 0;
        if (this.onComboChange) this.onComboChange(this.combo);
      }
    }
  }
  
  draw() {
    const ctx = this.ctx;
    
    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, '#0a0e27');
    gradient.addColorStop(0.5, '#1a1f3a');
    gradient.addColorStop(1, '#2a1f3a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw stars/background effects
    this.drawStars(ctx);
    
    // Draw particles
    this.particles.draw(ctx);
    
    // Draw AI kites
    this.aiKites.forEach(kite => kite.draw(ctx));
    
    // Draw player
    if (this.player) {
      this.player.draw(ctx);
    }
  }
  
  drawStars(ctx) {
    // Simple animated stars
    const time = performance.now() / 1000;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    
    for (let i = 0; i < 50; i++) {
      const x = (i * 137.508) % this.canvas.width;
      const y = (i * 97.332) % this.canvas.height;
      const size = (Math.sin(time + i) + 1) * 1.5;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  gameLoop() {
    if (this.state !== GAME_STATES.PLAYING) return;
    
    const currentTime = performance.now();
    const deltaTime = Math.min(currentTime - this.lastTime, 100);
    this.lastTime = currentTime;
    
    this.update(deltaTime);
    this.draw();
    
    this.animationId = requestAnimationFrame(() => this.gameLoop());
  }
  
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    GAME_CONFIG.WIDTH = width;
    GAME_CONFIG.HEIGHT = height;
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }
}
