// Game Configuration
export const GAME_CONFIG = {
  WIDTH: window.innerWidth,
  HEIGHT: window.innerHeight,
  FPS: 60,
  INITIAL_LIVES: 3,
  INITIAL_AI_KITES: 3,
  MAX_AI_KITES: 12,
  AI_SPAWN_INTERVAL: 8000, // milliseconds
  DIFFICULTY_INCREASE_INTERVAL: 15000, // milliseconds
};

// Kite Colors
export const KITE_COLORS = [
  '#ff0080', // Pink
  '#00ffff', // Cyan
  '#39ff14', // Green
  '#ff6b00', // Orange
  '#bf00ff', // Purple
  '#ffff00', // Yellow
  '#ff3366', // Red
  '#00ff88', // Mint
];

// Player Kite Configuration
export const PLAYER_CONFIG = {
  SIZE: 90,
  SPEED: 6,
  COLOR: '#00ffff',
  TRAIL_LENGTH: 15,
};

// AI Kite Configuration
export const AI_CONFIG = {
  SIZE: 80,
  BASE_SPEED: 2,
  SPEED_INCREMENT: 0.3,
  MAX_SPEED: 6,
  TRAIL_LENGTH: 10,
  WANDER_RADIUS: 100,
  DIRECTION_CHANGE_INTERVAL: 2000,
};

// Particle Effects Configuration
export const PARTICLE_CONFIG = {
  COUNT: 15,
  LIFETIME: 600,
  SPEED_RANGE: [1, 4],
  SIZE_RANGE: [2, 6],
};

// Scoring Configuration
export const SCORE_CONFIG = {
  CUT_BASE: 100,
  COMBO_MULTIPLIER: 50,
  COMBO_TIMEOUT: 3000,
};

// Game States
export const GAME_STATES = {
  MENU: 'menu',
  PLAYING: 'playing',
  PAUSED: 'paused',
  GAME_OVER: 'gameOver',
};

// Physics
export const PHYSICS = {
  WIND_STRENGTH: 0.3,
  WIND_CHANGE_INTERVAL: 5000,
  GRAVITY: 0.05,
  FRICTION: 0.98,
};

// Controls
export const CONTROLS = {
  UP: ['ArrowUp', 'w', 'W'],
  DOWN: ['ArrowDown', 's', 'S'],
  LEFT: ['ArrowLeft', 'a', 'A'],
  RIGHT: ['ArrowRight', 'd', 'D'],
  PAUSE: ['Escape', 'p', 'P'],
};
