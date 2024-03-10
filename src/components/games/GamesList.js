import React from 'react';
import './Games.css';

const GamesList = ({ games, onGameSelect }) => {
  return (
    <div className="games-list">
      <h2>Games:</h2>
      {games.length > 0 ? (
        <select onChange={(e) => onGameSelect(games[e.target.value])}>
          {games.map((game, index) => (
            <option key={index} value={index}>
              {game.teams.home.name} vs. {game.teams.away.name}
            </option>
          ))}
        </select>
      ) : (
        <p>No games found for the selected date.</p>
      )}
    </div>
  );
};

export default GamesList;
