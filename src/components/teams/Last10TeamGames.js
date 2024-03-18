// Last10TeamGames.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Last10TeamGames.css';
import LoadingSpinner from '../LoadingSpinner';

const Last10TeamGames = () => {
  const { teamId } = useParams();
  const [last10Games, setLast10Games] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLast10Games = async () => {
      try {
        console.log('ACCESSED TEAM GAMES');
        const apiUrl = `https://v2.nba.api-sports.io/games?team=${teamId}&season=2023`;
        console.log('API CALL:', apiUrl);

        const response = await axios.get(apiUrl, {
          headers: {
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY_ALT,
            'x-rapidapi-host': 'v2.nba.api-sports.io',
          },
        });

        console.log('API RESPONSE:', response.data);

        const allGames = response.data.response;
        const gamesWithScores = allGames.filter(
          (game) => game.scores.home.points !== null && game.scores.visitors.points !== null
        );
        const last10GamesWithScores = gamesWithScores.slice(-10);
        setLast10Games(last10GamesWithScores);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching last 10 games:', error);
        setError('An error occurred while fetching the last 10 games.');
        setIsLoading(false);
      }
    };

    fetchLast10Games();
  }, [teamId]);

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
          const isHomeTeam = game.teams.home.id === parseInt(teamId);
          const teamLogo = isHomeTeam ? game.teams.home.logo : game.teams.visitors.logo;
          const teamName = isHomeTeam ? game.teams.home.name : game.teams.visitors.name;
          const opponentLogo = isHomeTeam ? game.teams.visitors.logo : game.teams.home.logo;
          const opponentName = isHomeTeam ? game.teams.visitors.name : game.teams.home.name;
          const teamScore = isHomeTeam ? game.scores.home.points : game.scores.visitors.points;
          const opponentScore = isHomeTeam ? game.scores.visitors.points : game.scores.home.points;

          return (
            <div key={game.id} className="game-card">
              <div className="team-info">
                <img src={teamLogo} alt={teamName} />
                <span>{teamName}</span>
              </div>
              <div className="score">
                <span>{teamScore}</span>
                <span>-</span>
                <span>{opponentScore}</span>
              </div>
              <div className="team-info">
                <img src={opponentLogo} alt={opponentName} />
                <span>{opponentName}</span>
              </div>
              <div className={`game-result ${teamScore > opponentScore ? 'win' : 'loss'}`}>
                {teamScore > opponentScore ? 'Win' : 'Loss'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Last10TeamGames;