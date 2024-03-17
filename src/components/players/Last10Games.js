// Last10Games.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Last10Games.css';
import GameDetails from './GameDetails';
import LoadingSpinner from '../LoadingSpinner';

const Last10Games = () => {
  const { playerId } = useParams();
  const [last10Games, setLast10Games] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    const fetchLast10Games = async () => {
      try {
        let season = 2023;
  
        while (season >= 2019) {
          const statsUrl = `https://v2.nba.api-sports.io/players/statistics?id=${playerId}&season=${season}`;
          console.log('Fetching player stats:', statsUrl);
  
          const statsResponse = await axios.get(statsUrl, {
            headers: {
              'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
              'x-rapidapi-host': 'v2.nba.api-sports.io',
            },
          });
  
          console.log('Player stats response:', statsResponse.data);
  
          if (statsResponse.data.response.length > 0) {
            const allGamesData = statsResponse.data.response;
            const last10GamesData = allGamesData.slice(-10); // Retrieve the last 10 games
            const teamId = last10GamesData[0].team.id;
  
            const gamesUrl = `https://v2.nba.api-sports.io/games?team=${teamId}&season=${season}`;
            console.log('Fetching team games:', gamesUrl);
  
            const gamesResponse = await axios.get(gamesUrl, {
              headers: {
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
                'x-rapidapi-host': 'v2.nba.api-sports.io',
              },
            });
  
            console.log('Team games response:', gamesResponse.data);
  
            const gamesData = gamesResponse.data.response;
            const last10GamesWithDetails = last10GamesData.map((game) => {
              const gameDetails = gamesData.find((g) => g.id === game.game.id);
              return {
                ...game,
                gameDetails,
              };
            });
  
            setLast10Games(last10GamesWithDetails);
            setIsLoading(false);
            return;
          }
  
          season--;
        }
  
        setError('No data found for the last 10 games.');
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching last 10 games:', error);
        setError('An error occurred while fetching the last 10 games.');
        setIsLoading(false);
      }
    };
  
    fetchLast10Games();
  }, [playerId]);

  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  const handleCloseGameDetails = () => {
    setSelectedGame(null);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="last-10-games-container">
      <h2>Last 10 Games</h2>
      <div className="game-cards">
        {last10Games.map((game) => {
          const isPlayerTeamHome = game.team.id === game.gameDetails.teams.home.id;
          const playerTeam = isPlayerTeamHome ? game.gameDetails.teams.home : game.gameDetails.teams.visitors;
          const opponentTeam = isPlayerTeamHome ? game.gameDetails.teams.visitors : game.gameDetails.teams.home;
          const playerTeamScore = isPlayerTeamHome ? game.gameDetails.scores.home.points : game.gameDetails.scores.visitors.points;
          const opponentTeamScore = isPlayerTeamHome ? game.gameDetails.scores.visitors.points : game.gameDetails.scores.home.points;

          return (
            <div
              key={game.game.id}
              className="game-card clickable"
              onClick={() => handleGameClick(game)}
            >
              <div className="team-logos">
                <img src={playerTeam.logo} alt={playerTeam.nickname} />
                <span>{playerTeamScore}</span>
                <span>-</span>
                <span>{opponentTeamScore}</span>
                <img src={opponentTeam.logo} alt={opponentTeam.nickname} />
              </div>
              <div className={`game-result ${playerTeamScore > opponentTeamScore ? 'win' : 'loss'}`}>
                {playerTeamScore > opponentTeamScore ? 'Winner!' : 'Loser'}
              </div>
            </div>
          );
        })}
      </div>
      {selectedGame && (
        <GameDetails
          game={selectedGame}
          playerName={`${selectedGame.player.firstname} ${selectedGame.player.lastname}`}
          onClose={handleCloseGameDetails}
        />
      )}
    </div>
  );
};

export default Last10Games;