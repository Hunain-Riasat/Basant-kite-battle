import React from 'react';
import './HUD.css';

const HUD = ({ score, highScore, lives, combo, gameState }) => {
  return (
    <div className="hud">
      {/* Top bar */}
      <div className="hud-top">
        <div className="hud-section">
          <div className="hud-label">SCORE</div>
          <div className="hud-value score">{score.toString().padStart(6, '0')}</div>
        </div>
        
        <div className="hud-section center">
          <div className="hud-label">HIGH SCORE</div>
          <div className="hud-value">{highScore.toString().padStart(6, '0')}</div>
        </div>
        
        <div className="hud-section right">
          <div className="hud-label">LIVES</div>
          <div className="hud-lives">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className={`life-indicator ${i < lives ? 'active' : 'inactive'}`}
              >
                ♦
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Combo indicator */}
      {combo > 1 && gameState === 'playing' && (
        <div className="combo-indicator">
          <div className="combo-text">COMBO</div>
          <div className="combo-value">×{combo}</div>
        </div>
      )}
      
      {/* Controls hint */}
      {gameState === 'playing' && (
        <div className="controls-hint">
          <span className="hint-key">WASD</span> or <span className="hint-key">ARROWS</span> to move
          <span className="separator">•</span>
          <span className="hint-key">ESC</span> to pause
        </div>
      )}
    </div>
  );
};

export default HUD;
