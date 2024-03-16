// Games.js

import React, { useState } from 'react';
import moment from 'moment-timezone';
import axios from 'axios';
import './Games.css';

const SearchInput = ({ date, onDateChange, onSearch }) => {
    return (
      <div className="search-input">
        <label htmlFor="date">Enter date:</label>
        <div className="input-container">
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
          />
          <button onClick={onSearch}>Search</button>
        </div>
      </div>
    );
  };

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

const GameDetails = ({ game }) => {
  if (!game) return null;

  // Extract relevant data
  const { teams, status, scores } = game;
  const homeTeam = teams.home.name;
  const awayTeam = teams.away.name;
  const finalScore =
    status.long === 'Game Finished'
      ? `${scores.home.total} - ${scores.away.total}`
      : null;

  // Parse the date string into a moment object
  const gameDate = moment(game.date);

  // Convert to Costa Rica time (moment-timezone library required)
  const costaRicaTime = gameDate.tz('America/Costa_Rica').format('h:mm a');

  return (
    <div className="game-details">
      <h2>Game Details:</h2>
      <p>
        <strong>Home Team:</strong> {homeTeam}
      </p>
      <p>
        <strong>Away Team:</strong> {awayTeam}
      </p>
      <p>
        <strong>Status:</strong> {status?.long}
      </p>
      {finalScore && (
        <p>
          <strong>Final Score:</strong> {finalScore}
        </p>
      )}
      {costaRicaTime && (
        <p>
          <strong>Hour (CR Time):</strong> {costaRicaTime}
        </p>
      )}
    </div>
  );
};

const Games = ({ API_URL, headers }) => {
  const [date, setDate] = useState('');
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setError(null);

    if (!date) {
      setError('Please enter a valid date.');
      return;
    }

    // Calculate date with one day added
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);

    const fullUrl = `${API_URL}&date=${newDate.toISOString().slice(0, 10)}`;

    try {
      const response = await axios.get(fullUrl, { headers });
      const data = response.data;
      setGames(data.response);
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching data. Please try again later.');
    }
  };

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  return (
    <div className="games-container">
      <h1>NBA Games Search</h1>
      <SearchInput date={date} onDateChange={setDate} onSearch={handleSearch} />
      {error && <p className="error">{error}</p>}
      {games.length > 0 && <GamesList games={games} onGameSelect={handleGameSelect} />}
      {selectedGame && <GameDetails game={selectedGame} />}
    </div>
  );
};

export default Games;