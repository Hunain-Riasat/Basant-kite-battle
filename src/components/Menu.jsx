import React from 'react';
import './Menu.css';

const Menu = ({ onStart, highScore }) => {
  return (
    <div className="menu-overlay">
      <div className="menu-content">
        <div className="menu-header">
          <div className="kite-icon">♦</div>
          <h1 className="game-title">
            BASANT<br/>
            <span className="title-highlight">KITE BATTLE</span>
          </h1>
        </div>
        
        <div className="menu-description">
          Cut the opponent kites before they cut each other!
        </div>
        
        {highScore > 0 && (
          <div className="high-score-display">
            <div className="high-score-label">HIGH SCORE</div>
            <div className="high-score-value">{highScore.toString().padStart(6, '0')}</div>
          </div>
        )}
        
        <button className="play-button" onClick={onStart}>
          <span className="button-glow"></span>
          <span className="button-text">START GAME</span>
        </button>
        
        <div className="menu-instructions">
          <div className="instruction-row">
            <span className="instruction-key">WASD</span>
            <span className="instruction-or">or</span>
            <span className="instruction-key">ARROWS</span>
            <span className="instruction-text">Move your kite</span>
          </div>
          <div className="instruction-row">
            <span className="instruction-key">ESC</span>
            <span className="instruction-text">Pause game</span>
          </div>
        </div>
        
        <div className="game-tips">
          <div className="tip">💡 Cut AI kites to score points</div>
          <div className="tip">💡 Lose a life when AI kites collide</div>
          <div className="tip">💡 Chain cuts for combo multipliers</div>
        </div>
      </div>
      
      <div className="menu-background">
        <div className="floating-kite kite-1">♦</div>
        <div className="floating-kite kite-2">♦</div>
        <div className="floating-kite kite-3">♦</div>
      </div>
    </div>
  );
};

export default Menu;
