# Development Guide

## Getting Started

### Initial Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture Overview

### Core Components

#### GameEngine (src/utils/GameEngine.js)
The heart of the game. Manages:
- Game loop and timing
- State management (menu, playing, paused, game over)
- Physics simulation (wind, gravity)
- Collision detection
- Difficulty scaling
- Score and lives tracking

**Key Methods:**
- `startGame()` - Initialize new game
- `update(deltaTime)` - Update game state
- `draw()` - Render frame
- `checkCollisions()` - Detect kite collisions

#### Kite Class (src/utils/Kite.js)
Represents individual kite entities:
- Player kite (controlled by user)
- AI kites (computer-controlled)

**Properties:**
- Position (x, y)
- Velocity (vx, vy)
- Visual properties (size, color, trail)
- AI behavior state (for AI kites)

**Methods:**
- `update(deltaTime, wind, difficulty)` - Update physics
- `draw(ctx)` - Render kite and trail
- `checkCollision(other)` - Collision detection
- `updateAI(deltaTime, difficulty)` - AI movement logic

#### ParticleSystem (src/utils/ParticleSystem.js)
Manages visual effects when kites are cut:
- Particle emission
- Physics simulation
- Fade-out effects

## Game Logic Flow

```
User clicks START
    ↓
GameEngine.startGame()
    ↓
Create player kite
Create initial AI kites
Start game loop
    ↓
Each frame (60 FPS):
    1. Update wind
    2. Update difficulty
    3. Spawn new AI kites
    4. Handle player input
    5. Update all kites
    6. Check collisions
    7. Update particles
    8. Render everything
    ↓
On collision:
    - Player cuts AI → +score, +combo
    - AI cuts AI → -life
    ↓
Lives = 0 → Game Over
```

## Key Systems

### 1. Physics System
- **Wind**: Periodic random changes affecting all kites
- **Velocity**: Each kite has vx, vy components
- **Friction**: Applied each frame to slow kites
- **Boundaries**: Soft bounce at screen edges

### 2. AI System
- **Wandering**: Random direction changes every 2 seconds
- **Target seeking**: Move toward randomly chosen targets
- **Speed scaling**: Increases with difficulty multiplier
- **Boundary avoidance**: Keeps targets within safe bounds

### 3. Difficulty Scaling
```javascript
// Increases every 15 seconds
difficultyMultiplier += 0.15

// Affects:
- AI spawn rate (faster)
- AI movement speed (faster)
- Number of simultaneous kites (more)
```

### 4. Scoring System
```javascript
Base score: 100 points per cut
Combo bonus: +50 × (combo - 1)

Example:
1st cut: 100 points (combo ×1)
2nd cut: 150 points (combo ×2)
3rd cut: 200 points (combo ×3)
```

### 5. Collision Detection
```javascript
// Circle-to-circle collision
distance = sqrt((x1-x2)² + (y1-y2)²)
colliding = distance < (radius1 + radius2)
```

## State Management

### Game States
```javascript
MENU      → User at main menu
PLAYING   → Active gameplay
PAUSED    → Game paused by user
GAME_OVER → No lives remaining
```

### React State
- `gameState` - Current game state
- `score` - Current score
- `highScore` - Best score (from localStorage)
- `lives` - Remaining lives
- `combo` - Current combo count

## Performance Optimization

### Canvas Rendering
- Single requestAnimationFrame loop
- Delta time for consistent physics
- Limited particle count
- Trail arrays with fixed length
- Shadow/glow effects only on active elements

### Memory Management
- Remove dead kites after fade-out
- Particle pool with lifecycle
- No unnecessary object creation in loops

## Adding New Features

### Adding a Power-Up
1. Create PowerUp class in `utils/PowerUp.js`
2. Add spawn logic to GameEngine
3. Add collision detection
4. Create visual effects
5. Update HUD if needed

### Adding Sound
1. Create audio files in `public/sounds/`
2. Add sound manager in `utils/SoundManager.js`
3. Call sound effects on game events:
   ```javascript
   playSound('cut');
   playSound('combo');
   playSound('gameOver');
   ```

### Adding New Kite Types
1. Extend Kite class or create subclass
2. Add unique movement patterns in `updateAI()`
3. Add visual differentiation in `draw()`
4. Update spawn logic in GameEngine

## Testing

### Manual Testing Checklist
- [ ] Start game from menu
- [ ] Player kite responds to all controls
- [ ] AI kites spawn and move
- [ ] Collisions detected correctly
- [ ] Score increases on cuts
- [ ] Lives decrease on AI collisions
- [ ] Combo system works
- [ ] Pause/resume functions
- [ ] Game over triggers correctly
- [ ] High score saves
- [ ] Responsive on different screen sizes
- [ ] Touch controls work (mobile)

### Performance Testing
- Check FPS with browser DevTools
- Profile with Chrome Performance tab
- Test on low-end devices
- Monitor memory usage over time

## Debugging Tips

### Common Issues

**Kites not moving:**
- Check delta time calculation
- Verify velocity is being applied
- Check boundary constraints

**Collisions not detected:**
- Log kite positions in checkCollisions()
- Verify collision radii
- Check alive status

**FPS drops:**
- Reduce particle count
- Limit trail length
- Check for memory leaks
- Profile with DevTools

### Debug Mode
Add to GameEngine for debugging:
```javascript
this.debug = true;

// In draw():
if (this.debug) {
  this.drawDebugInfo(ctx);
}
```

## Code Style

- Use ES6+ features (arrow functions, classes, destructuring)
- Prefer const over let
- Comment complex logic
- Keep functions focused and small
- Use meaningful variable names

## Deployment

### Vercel
```bash
npm run build
vercel --prod
```

### GitHub Pages
```bash
npm run build
git subtree push --prefix dist origin gh-pages
```

### Netlify
```bash
npm run build
# Drag dist/ folder to Netlify
```

## Resources

- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- [Game Loop Pattern](https://gameprogrammingpatterns.com/game-loop.html)
- [2D Collision Detection](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection)

## Contributing

When contributing:
1. Test thoroughly
2. Update documentation
3. Follow existing code style
4. Add comments for complex logic
5. Ensure no console errors
6. Check performance impact
