# 🪁 Basant Kite Battle

An addictive arcade-style kite flying game inspired by the traditional Basant kite-fighting festival. Control your kite through vibrant skies, cut opponent kites, build combos, and chase high scores!

**[Play Now, Click me](https://kite-game.netlify.app/)**

## 🎮 Game Features

- **Fast-paced Arcade Gameplay**: Smooth 60 FPS canvas-based rendering
- **AI Opponents**: Smart computer-controlled kites with increasing difficulty
- **Combo System**: Chain cuts for bonus points and multipliers
- **Progressive Difficulty**: AI kites get faster and smarter over time
- **Lives System**: Lose lives when AI kites collide with each other
- **High Score Tracking**: Persistent local storage of your best scores
- **Responsive Controls**: Keyboard (WASD/Arrows), mouse, and touch-ready
- **Vibrant Neon Aesthetic**: Eye-catching visual design with particle effects

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/basant-kite-battle.git
cd basant-kite-battle
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## 🎯 How to Play

### Objective
Cut as many AI kites as possible before losing all your lives!

### Controls
- **Movement**: WASD or Arrow Keys
- **Pause**: ESC or P

### Gameplay Mechanics

1. **Cutting Kites**: Fly your kite into opponent kites to cut them and earn points
2. **Combo System**: Chain multiple cuts quickly to build combos (×2, ×3, etc.)
3. **Lives**: You lose a life when two AI kites collide with each other
4. **Difficulty**: AI kites spawn faster and move more intelligently as time passes
5. **Scoring**: 
   - Base score: 100 points per cut
   - Combo bonus: +50 points per combo level

### Tips
- 💡 Stay mobile to catch multiple kites
- 💡 Build combos for maximum points
- 💡 Watch the wind patterns (visible in kite movements)
- 💡 Position yourself between AI kites to maximize cuts

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **HTML Canvas** - High-performance 2D rendering
- **Vanilla JavaScript** - Game engine and physics
- **CSS3** - Modern styling with animations

## 📁 Project Structure

```
basant-kite-battle/
├── public/
│   └── kite-icon.svg          # Game icon
├── src/
│   ├── components/
│   │   ├── Menu.jsx           # Main menu screen
│   │   ├── HUD.jsx            # In-game display
│   │   ├── PauseOverlay.jsx   # Pause screen
│   │   └── GameOver.jsx       # Game over screen
│   ├── utils/
│   │   ├── constants.js       # Game configuration
│   │   ├── helpers.js         # Utility functions
│   │   ├── Kite.js            # Kite entity class
│   │   ├── ParticleSystem.js  # Particle effects
│   │   └── GameEngine.js      # Core game logic
│   ├── App.jsx                # Main application
│   ├── App.css                # App styles
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 🎨 Customization

### Difficulty Settings
Edit `src/utils/constants.js` to adjust:
- Initial AI kite count
- Spawn intervals
- AI speed and intelligence
- Difficulty progression rate

### Visual Styling
Edit CSS custom properties in `src/index.css`:
```css
:root {
  --neon-pink: #ff0080;
  --neon-cyan: #00ffff;
  --neon-green: #39ff14;
  /* ... more colors */
}
```

### Game Physics
Modify physics constants in `src/utils/constants.js`:
```javascript
export const PHYSICS = {
  WIND_STRENGTH: 0.3,
  WIND_CHANGE_INTERVAL: 5000,
  GRAVITY: 0.05,
  FRICTION: 0.98,
};
```

## 🏗️ Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

## 🚢 Deployment

### GitHub Pages
```bash
npm run build
# Deploy the dist folder to gh-pages branch
```

### Vercel
```bash
vercel --prod
```

### Netlify
Drag and drop the `dist/` folder to Netlify dashboard.

## 🎯 Future Enhancements

- [ ] Sound effects and background music
- [ ] Multiple kite skins and themes
- [ ] Power-ups (speed boost, invincibility, etc.)
- [ ] Different difficulty modes
- [ ] Leaderboard system
- [ ] Multiplayer support
- [ ] Mobile app version
- [ ] Achievement system
- [ ] Daily challenges

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the traditional Basant kite-flying festival
- Built with ❤️ using React and Vite
- Font: [Orbitron](https://fonts.google.com/specimen/Orbitron) and [Exo 2](https://fonts.google.com/specimen/Exo+2)

## 📧 Contact

Muhammad Hunain Riasat 

Email: hunainriasat@gmail.com





Made with 🪁 and JavaScript by M Hunain Riasat



Copyright © 2025 Muhammad Hunain Riasat  
All rights reserved.
