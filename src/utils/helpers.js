// Random number between min and max
export const random = (min, max) => Math.random() * (max - min) + min;

// Random integer between min and max (inclusive)
export const randomInt = (min, max) => Math.floor(random(min, max + 1));

// Random element from array
export const randomChoice = (arr) => arr[randomInt(0, arr.length - 1)];

// Distance between two points
export const distance = (x1, y1, x2, y2) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
};

// Check if two circles collide
export const circlesCollide = (x1, y1, r1, x2, y2, r2) => {
  return distance(x1, y1, x2, y2) < r1 + r2;
};

// Clamp value between min and max
export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

// Normalize angle to 0-2π
export const normalizeAngle = (angle) => {
  while (angle < 0) angle += Math.PI * 2;
  while (angle >= Math.PI * 2) angle -= Math.PI * 2;
  return angle;
};

// Linear interpolation
export const lerp = (start, end, t) => start + (end - start) * t;

// Convert HSL to hex color
export const hslToHex = (h, s, l) => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

// Format score with leading zeros
export const formatScore = (score) => {
  return score.toString().padStart(6, '0');
};

// Check if point is within bounds
export const inBounds = (x, y, width, height, margin = 0) => {
  return x >= margin && 
         x <= width - margin && 
         y >= margin && 
         y <= height - margin;
};

// Get random position within bounds
export const randomPosition = (width, height, margin = 50) => {
  return {
    x: random(margin, width - margin),
    y: random(margin, height - margin),
  };
};

// Smooth easing function
export const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export const easeInOutCubic = (t) => 
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// Vector utilities
export const vectorLength = (vx, vy) => Math.sqrt(vx * vx + vy * vy);

export const normalizeVector = (vx, vy) => {
  const len = vectorLength(vx, vy);
  return len > 0 ? { x: vx / len, y: vy / len } : { x: 0, y: 0 };
};

export const dotProduct = (x1, y1, x2, y2) => x1 * x2 + y1 * y2;

// Local storage helpers
export const saveHighScore = (score) => {
  try {
    const current = getHighScore();
    if (score > current) {
      localStorage.setItem('basantKiteBattle_highScore', score.toString());
      return true;
    }
  } catch (e) {
    console.warn('LocalStorage not available');
  }
  return false;
};

export const getHighScore = () => {
  try {
    const score = localStorage.getItem('basantKiteBattle_highScore');
    return score ? parseInt(score, 10) : 0;
  } catch (e) {
    return 0;
  }
};

// Sound effect helpers (placeholder for future implementation)
export const playSound = (soundName) => {
  // Can be implemented with Web Audio API
  console.log(`Playing sound: ${soundName}`);
};

export const stopSound = (soundName) => {
  console.log(`Stopping sound: ${soundName}`);
};
