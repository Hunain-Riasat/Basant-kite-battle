import React, { useRef, useEffect, useState } from 'react';
import { GameEngine } from './utils/GameEngine';
import { GAME_STATES } from './utils/constants';
import Menu from './components/Menu';
import HUD from './components/HUD';
import PauseOverlay from './components/PauseOverlay';
import GameOver from './components/GameOver';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const gameEngineRef = useRef(null);
  
  const [gameState, setGameState] = useState(GAME_STATES.MENU);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);
  
  // Initialize game engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      if (gameEngineRef.current) {
        gameEngineRef.current.resize(canvas.width, canvas.height);
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create game engine
    const engine = new GameEngine(canvas);
    gameEngineRef.current = engine;
    
    // Set up callbacks
    engine.onStateChange = (state) => {
      setGameState(state);
    };
    
    engine.onScoreChange = (newScore, newHighScore) => {
      setScore(newScore);
      setHighScore(newHighScore);
      setIsNewRecord(newScore > newHighScore);
    };
    
    engine.onLivesChange = (newLives) => {
      setLives(newLives);
    };
    
    engine.onComboChange = (newCombo) => {
      setCombo(newCombo);
    };
    
    // Initial high score
    setHighScore(engine.highScore);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (gameEngineRef.current) {
        gameEngineRef.current.destroy();
      }
    };
  }, []);
  
  // Handle keyboard shortcuts for pause/resume
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') {
        if (gameState === GAME_STATES.PAUSED) {
          handleResume();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState]);
  
  const handleStartGame = () => {
    if (gameEngineRef.current) {
      gameEngineRef.current.startGame();
    }
  };
  
  const handleResume = () => {
    if (gameEngineRef.current) {
      gameEngineRef.current.resume();
    }
  };
  
  const handleQuit = () => {
    if (gameEngineRef.current) {
      gameEngineRef.current.state = GAME_STATES.MENU;
      setGameState(GAME_STATES.MENU);
    }
  };
  
  const handleRestart = () => {
    setIsNewRecord(false);
    handleStartGame();
  };
  
  return (
    <div className="app">
      <canvas ref={canvasRef} className="game-canvas" />
      
      {gameState === GAME_STATES.MENU && (
        <Menu onStart={handleStartGame} highScore={highScore} />
      )}
      
      {gameState === GAME_STATES.PLAYING && (
        <HUD 
          score={score}
          highScore={highScore}
          lives={lives}
          combo={combo}
          gameState={gameState}
        />
      )}
      
      {gameState === GAME_STATES.PAUSED && (
        <>
          <HUD 
            score={score}
            highScore={highScore}
            lives={lives}
            combo={combo}
            gameState={gameState}
          />
          <PauseOverlay 
            onResume={handleResume}
            onQuit={handleQuit}
          />
        </>
      )}
      
      {gameState === GAME_STATES.GAME_OVER && (
        <GameOver
          score={score}
          highScore={highScore}
          isNewRecord={isNewRecord}
          onRestart={handleRestart}
          onMenu={handleQuit}
        />
      )}
    </div>
  );
}

export default App;
