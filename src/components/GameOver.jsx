import React from 'react';
import './GameOver.css';

const GameOver = ({ score, highScore, isNewRecord, onRestart, onMenu }) => {
  return (
    <div className="gameover-overlay">
      <div className="gameover-content">
        {isNewRecord && (
          <div className="new-record">
            <div className="trophy-icon">🏆</div>
            <div className="record-text">NEW RECORD!</div>
          </div>
        )}
        
        <h2 className="gameover-title">GAME OVER</h2>
        
        <div className="score-display">
          <div className="final-score">
            <div className="score-label">FINAL SCORE</div>
            <div className="score-value">{score.toString().padStart(6, '0')}</div>
          </div>
          
          <div className="high-score">
            <div className="score-label">HIGH SCORE</div>
            <div className="score-value high">{highScore.toString().padStart(6, '0')}</div>
          </div>
        </div>
        
        <div className="gameover-buttons">
          <button className="gameover-button play-again-button" onClick={onRestart}>
            <span className="button-text">PLAY AGAIN</span>
          </button>
          
          <button className="gameover-button menu-button" onClick={onMenu}>
            <span className="button-text">MAIN MENU</span>
          </button>
        </div>
        
        <div className="gameover-message">
          {score > highScore * 0.8 ? 
            "Incredible flying! Keep it up!" : 
            score > highScore * 0.5 ? 
              "Good effort! Try for a higher score!" : 
              "Keep practicing to master the skies!"}
        </div>
      </div>
    </div>
  );
};

export default GameOver;
