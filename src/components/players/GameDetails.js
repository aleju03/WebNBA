import React from 'react';
import './GameDetails.css';

const GameDetails = ({ game, playerName, onClose }) => {
  return (
    <div className="game-details-overlay">
      <div className="game-details-container">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{playerName}'s Stats</h2>
        <div className="game-info">
          <p>
            <strong>Points:</strong> {game.points}
          </p>
          <p>
            <strong>Assists:</strong> {game.assists}
          </p>
          <p>
            <strong>Rebounds:</strong> {game.totReb}
          </p>
          <p>
            <strong>Steals:</strong> {game.steals}
          </p>
          <p>
            <strong>Blocks:</strong> {game.blocks}
          </p>
          <p>
            <strong>Minutes Played:</strong> {game.min}
          </p>
          <p>
            <strong>Field Goals Made:</strong> {game.fgm}
          </p>
          <p>
            <strong>Field Goals Attempted:</strong> {game.fga}
          </p>
          <p>
            <strong>Three-Pointers Made:</strong> {game.tpm}
          </p>
          <p>
            <strong>Three-Pointers Attempted:</strong> {game.tpa}
          </p>
          <p>
            <strong>Free Throws Made:</strong> {game.ftm}
          </p>
          <p>
            <strong>Free Throws Attempted:</strong> {game.fta}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;