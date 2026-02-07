import React from 'react';
import './PauseOverlay.css';

const PauseOverlay = ({ onResume, onQuit }) => {
  return (
    <div className="pause-overlay">
      <div className="pause-content">
        <h2 className="pause-title">PAUSED</h2>
        
        <div className="pause-buttons">
          <button className="pause-button resume-button" onClick={onResume}>
            <span className="button-text">RESUME</span>
          </button>
          
          <button className="pause-button quit-button" onClick={onQuit}>
            <span className="button-text">QUIT TO MENU</span>
          </button>
        </div>
        
        <div className="pause-hint">
          Press <span className="key-hint">ESC</span> to resume
        </div>
      </div>
    </div>
  );
};

export default PauseOverlay;
