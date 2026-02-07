import { random, randomInt } from './helpers';
import { PARTICLE_CONFIG } from './constants';

export class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    
    // Random velocity
    const angle = random(0, Math.PI * 2);
    const speed = random(PARTICLE_CONFIG.SPEED_RANGE[0], PARTICLE_CONFIG.SPEED_RANGE[1]);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    
    // Visual properties
    this.size = random(PARTICLE_CONFIG.SIZE_RANGE[0], PARTICLE_CONFIG.SIZE_RANGE[1]);
    this.lifetime = PARTICLE_CONFIG.LIFETIME;
    this.age = 0;
    this.rotation = random(0, Math.PI * 2);
    this.rotationSpeed = random(-0.1, 0.1);
  }
  
  update(deltaTime) {
    this.age += deltaTime;
    
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    
    // Apply gravity
    this.vy += 0.15;
    
    // Apply friction
    this.vx *= 0.98;
    this.vy *= 0.98;
    
    // Rotate
    this.rotation += this.rotationSpeed;
    
    return this.age < this.lifetime;
  }
  
  draw(ctx) {
    const life = 1 - (this.age / this.lifetime);
    const alpha = life;
    
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = alpha;
    
    // Glow effect
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    
    // Draw particle
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    
    ctx.restore();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }
}

export class ParticleSystem {
  constructor() {
    this.particles = [];
  }
  
  emit(x, y, color, count = PARTICLE_CONFIG.COUNT) {
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(x, y, color));
    }
  }
  
  update(deltaTime) {
    this.particles = this.particles.filter(particle => particle.update(deltaTime));
  }
  
  draw(ctx) {
    this.particles.forEach(particle => particle.draw(ctx));
  }
  
  clear() {
    this.particles = [];
  }
}
