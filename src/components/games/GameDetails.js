import React from 'react';
import moment from 'moment-timezone';
import './Games.css';

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
      {finalScore && ( // Conditionally render final score only if it exists
        <p>
          <strong>Final Score:</strong> {finalScore}
        </p>
      )}
      {costaRicaTime && ( // Conditionally render Costa Rica time
        <p>
          <strong>Hour (CR Time):</strong> {costaRicaTime}
        </p>
      )}
    </div>
  );
};

export default GameDetails;
