# 🪁 Basant Kite Battle - Quick Start Guide

## Installation & Running (3 Steps!)

### Step 1: Navigate to project folder
```bash
cd basant-kite-battle
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Start the game!
```bash
npm run dev
```

Then open your browser to: **http://localhost:5173**

---

## 🎮 How to Play

**OBJECTIVE:** Cut AI kites to score points. Don't let them collide with each other!

**CONTROLS:**
- **Move:** WASD or Arrow Keys
- **Pause:** ESC or P

**SCORING:**
- Cut an AI kite: 100 points
- Build combos: +50 points per combo level
- Example: 1st cut = 100pts, 2nd = 150pts, 3rd = 200pts

**LIVES:**
- You start with 3 lives
- Lose a life when 2 AI kites collide
- Game over when lives = 0

---

## 🏗️ Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder - ready to deploy!

---

## 📂 Project Structure

```
basant-kite-battle/
├── src/
│   ├── components/      # React UI components
│   ├── utils/          # Game engine & logic
│   ├── App.jsx         # Main app
│   └── index.css       # Global styles
├── public/             # Static assets
├── index.html
└── package.json
```

---

## 🎨 Key Features

✅ Smooth 60 FPS canvas rendering
✅ Smart AI opponents with difficulty scaling
✅ Combo system for chain cuts
✅ Particle effects on collisions
✅ Touch/mouse/keyboard controls
✅ Persistent high score tracking
✅ Vibrant neon aesthetic

---

## 🛠️ Tech Stack

- React 18
- Vite (super fast dev server)
- HTML Canvas API
- CSS3 with animations
- Vanilla JS game engine

---

## 📝 Notes

- **Mobile Support:** Touch controls ready (test on phone!)
- **High Scores:** Saved in browser localStorage
- **Performance:** Optimized for smooth 60 FPS
- **Customization:** Edit `src/utils/constants.js` for difficulty

---

## 🚀 Deployment Ready

Deploy to:
- **Vercel:** `vercel --prod`
- **Netlify:** Drag `dist/` folder
- **GitHub Pages:** Push to gh-pages branch

---

## 📖 Full Documentation

- **README.md** - Complete game documentation
- **DEVELOPMENT.md** - Developer guide & architecture

---

**Need help?** Check README.md or open an issue!

Made with 🪁 and JavaScript
