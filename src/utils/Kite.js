import { GAME_CONFIG, PLAYER_CONFIG, AI_CONFIG, KITE_COLORS } from './constants';
import { clamp, normalizeAngle, randomChoice, random, inBounds } from './helpers';
import { drawPakistaniKite, BASANT_COLORS } from './KiteDesigns';


export class Kite {
  constructor(x, y, isPlayer = false) {
    this.x = x;
    this.y = y;
    this.isPlayer = isPlayer;
    
    // Visual properties
    this.size = isPlayer ? PLAYER_CONFIG.SIZE : AI_CONFIG.SIZE;
    this.color = isPlayer ? PLAYER_CONFIG.COLOR : randomChoice(KITE_COLORS);
   
    // this.color = isPlayer ? PLAYER_CONFIG.COLOR : randomChoice(BASANT_COLORS);
    
    // Physics
    this.vx = 0;
    this.vy = 0;
    this.angle = random(0, Math.PI * 2);
    this.speed = isPlayer ? PLAYER_CONFIG.SPEED : AI_CONFIG.BASE_SPEED;
    
    // Trail system
    this.trail = [];
    this.trailLength = isPlayer ? PLAYER_CONFIG.TRAIL_LENGTH : AI_CONFIG.TRAIL_LENGTH;
    
    // AI properties
    if (!isPlayer) {
      this.targetX = x;
      this.targetY = y;
      this.wanderAngle = random(0, Math.PI * 2);
      this.directionChangeTimer = 0;
    }
    
    // State
    this.alive = true;
    this.fadeOut = 0;
  }
  
  update(deltaTime, wind = { x: 0, y: 0 }, difficultyMultiplier = 1) {
    if (!this.alive) {
      this.fadeOut = Math.min(1, this.fadeOut + deltaTime / 500);
      return;
    }
    
    // Apply wind
    this.vx += wind.x;
    this.vy += wind.y;
    
    // AI movement
    if (!this.isPlayer) {
      this.updateAI(deltaTime, difficultyMultiplier);
    }
    
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    
    // Boundary handling with soft bounce
    const margin = this.size;
    if (this.x < margin) {
      this.x = margin;
      this.vx = Math.abs(this.vx) * 0.5;
    } else if (this.x > GAME_CONFIG.WIDTH - margin) {
      this.x = GAME_CONFIG.WIDTH - margin;
      this.vx = -Math.abs(this.vx) * 0.5;
    }
    
    if (this.y < margin) {
      this.y = margin;
      this.vy = Math.abs(this.vy) * 0.5;
    } else if (this.y > GAME_CONFIG.HEIGHT - margin) {
      this.y = GAME_CONFIG.HEIGHT - margin;
      this.vy = -Math.abs(this.vy) * 0.5;
    }
    
    // Update angle based on velocity
    if (this.vx !== 0 || this.vy !== 0) {
      this.angle = Math.atan2(this.vy, this.vx);
    }
    
    // Update trail
    this.trail.push({ x: this.x, y: this.y, alpha: 1 });
    if (this.trail.length > this.trailLength) {
      this.trail.shift();
    }
    
    // Decay trail alpha
    this.trail.forEach((point, i) => {
      point.alpha = i / this.trail.length;
    });
    
    // Apply friction
    this.vx *= 0.96;
    this.vy *= 0.96;
  }
  
  updateAI(deltaTime, difficultyMultiplier) {
    this.directionChangeTimer += deltaTime;
    
    // Change direction periodically
    if (this.directionChangeTimer > AI_CONFIG.DIRECTION_CHANGE_INTERVAL) {
      this.directionChangeTimer = 0;
      this.wanderAngle += random(-Math.PI / 2, Math.PI / 2);
      this.wanderAngle = normalizeAngle(this.wanderAngle);
      
      // Set new target
      const distance = AI_CONFIG.WANDER_RADIUS;
      this.targetX = this.x + Math.cos(this.wanderAngle) * distance;
      this.targetY = this.y + Math.sin(this.wanderAngle) * distance;
      
      // Keep target in bounds
      this.targetX = clamp(this.targetX, 100, GAME_CONFIG.WIDTH - 100);
      this.targetY = clamp(this.targetY, 100, GAME_CONFIG.HEIGHT - 100);
    }
    
    // Move towards target
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist > 5) {
      const adjustedSpeed = this.speed * difficultyMultiplier;
      this.vx += (dx / dist) * adjustedSpeed * 0.1;
      this.vy += (dy / dist) * adjustedSpeed * 0.1;
    }
    
    // Limit AI speed
    const maxSpeed = Math.min(AI_CONFIG.MAX_SPEED, AI_CONFIG.BASE_SPEED + difficultyMultiplier);
    const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (currentSpeed > maxSpeed) {
      this.vx = (this.vx / currentSpeed) * maxSpeed;
      this.vy = (this.vy / currentSpeed) * maxSpeed;
    }
  }
  
  moveTowards(dx, dy) {
    if (!this.isPlayer) return;
    
    this.vx += dx * 0.8;
    this.vy += dy * 0.8;
    
    // Limit player speed
    const maxSpeed = PLAYER_CONFIG.SPEED;
    const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (currentSpeed > maxSpeed) {
      this.vx = (this.vx / currentSpeed) * maxSpeed;
      this.vy = (this.vy / currentSpeed) * maxSpeed;
    }
  }
  
  draw(ctx) {
    const alpha = this.alive ? 1 : (1 - this.fadeOut);
    
    // Draw trail
    if (this.trail.length > 1) {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = alpha * 0.5;
      
      ctx.beginPath();
      ctx.moveTo(this.trail[0].x, this.trail[0].y);
      
      for (let i = 1; i < this.trail.length; i++) {
        const point = this.trail[i];
        ctx.globalAlpha = alpha * point.alpha * 0.5;
        ctx.lineTo(point.x, point.y);
      }
      
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    
    // Draw string (line from kite to below)
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = alpha * 0.4;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.size * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
    
    // Draw kite (diamond shape)
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle + Math.PI / 4);
    
    // Glow effect
    ctx.shadowColor = this.color;
    ctx.shadowBlur = this.isPlayer ? 20 : 15;
    ctx.globalAlpha = alpha;
    
    // Main kite body
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(0, -this.size / 2);
    ctx.lineTo(this.size / 2, 0);
    ctx.lineTo(0, this.size / 2);
    ctx.lineTo(-this.size / 2, 0);
    ctx.closePath();
    ctx.fill();
    
    // Inner detail
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, -this.size / 2);
    ctx.lineTo(0, this.size / 2);
    ctx.moveTo(-this.size / 2, 0);
    ctx.lineTo(this.size / 2, 0);
    ctx.stroke();
    
    ctx.restore();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

//   draw(ctx) {
//   const alpha = this.alive ? 1 : (1 - this.fadeOut);
  
//   // Draw trail (same as before)
//   if (this.trail.length > 1) {
//     ctx.strokeStyle = this.color;
//     ctx.lineWidth = 2;
//     ctx.globalAlpha = alpha * 0.5;
    
//     ctx.beginPath();
//     ctx.moveTo(this.trail[0].x, this.trail[0].y);
    
//     for (let i = 1; i < this.trail.length; i++) {
//       const point = this.trail[i];
//       ctx.globalAlpha = alpha * point.alpha * 0.5;
//       ctx.lineTo(point.x, point.y);
//     }
    
//     ctx.stroke();
//     ctx.globalAlpha = 1;
//   }
  
//   // Draw string (دور - Dor)
//   ctx.strokeStyle = this.color;
//   ctx.lineWidth = 2;
//   ctx.globalAlpha = alpha * 0.6;
//   ctx.beginPath();
//   ctx.moveTo(this.x, this.y);
//   ctx.lineTo(this.x, this.y + this.size * 2.5);
//   ctx.stroke();
//   ctx.globalAlpha = 1;
  
//   // Use Pakistani design
//   ctx.globalAlpha = alpha;
//   ctx.shadowColor = this.color;
//   ctx.shadowBlur = this.isPlayer ? 15 : 10;
  
//   drawPakistaniKite(ctx, this.x, this.y, this.size, this.color, this.angle);
  
//   ctx.shadowBlur = 0;
//   ctx.globalAlpha = 1;
// }
  
  checkCollision(other) {
    if (!this.alive || !other.alive) return false;
    
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    return distance < (this.size / 2 + other.size / 2);
  }
  
  cut() {
    this.alive = false;
  }
}
