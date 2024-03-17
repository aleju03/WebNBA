// CurrentSeasonStats.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CurrentSeasonStats.css';
import LoadingSpinner from '../LoadingSpinner';

const CurrentSeasonStats = () => {
  const { playerId } = useParams();
  const [currentSeasonStats, setCurrentSeasonStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentSeasonStats = async () => {
      try {
        let season = 2023;

        while (season >= 2019) {
          const response = await axios.get(`https://v2.nba.api-sports.io/players/statistics?id=${playerId}&season=${season}`, {
            headers: {
              'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
              'x-rapidapi-host': 'v2.nba.api-sports.io',
            },
          });

          if (response.data.response.length > 0) {
            const statsData = response.data.response;
            const totalGames = statsData.length;
            const totalPoints = statsData.reduce((sum, game) => sum + game.points, 0);
            const totalAssists = statsData.reduce((sum, game) => sum + game.assists, 0);
            const totalRebounds = statsData.reduce((sum, game) => sum + game.totReb, 0);
            const totalSteals = statsData.reduce((sum, game) => sum + game.steals, 0);
            const totalBlocks = statsData.reduce((sum, game) => sum + game.blocks, 0);
            const totalTurnovers = statsData.reduce((sum, game) => sum + game.turnovers, 0);
            const totalMinutesPlayed = statsData.reduce((sum, game) => sum + parseFloat(game.min), 0);

            const avgPoints = (totalPoints / totalGames).toFixed(1);
            const avgAssists = (totalAssists / totalGames).toFixed(1);
            const avgRebounds = (totalRebounds / totalGames).toFixed(1);
            const avgSteals = (totalSteals / totalGames).toFixed(1);
            const avgBlocks = (totalBlocks / totalGames).toFixed(1);
            const avgTurnovers = (totalTurnovers / totalGames).toFixed(1);
            const avgMinutesPlayed = (totalMinutesPlayed / totalGames).toFixed(1);

            const playerName = `${statsData[0].player.firstname} ${statsData[0].player.lastname}`;
            const teamName = statsData[0].team.name;
            const teamLogo = statsData[0].team.logo;

            setCurrentSeasonStats({
              playerName,
              teamName,
              teamLogo,
              totalGames,
              avgPoints,
              avgAssists,
              avgRebounds,
              avgSteals,
              avgBlocks,
              avgTurnovers,
              avgMinutesPlayed,
            });

            setIsLoading(false);
            return;
          }

          season--;
        }

        setError('No data found for the current season.');
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching current season stats:', error);
        setError('An error occurred while fetching the current season stats.');
        setIsLoading(false);
      }
    };

    fetchCurrentSeasonStats();
  }, [playerId]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const {
    playerName,
    teamName,
    teamLogo,
    totalGames,
    avgPoints,
    avgAssists,
    avgRebounds,
    avgSteals,
    avgBlocks,
    avgTurnovers,
    avgMinutesPlayed,
  } = currentSeasonStats;

  return (
    <div className="current-season-stats-container">
      <h2 className="player-name">{playerName}'s Current Season Stats</h2>
      <div className="team-info">
        <img src={teamLogo} alt={teamName} className="team-logo" />
        <p>{teamName}</p>
      </div>
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-label">Games Played</div>
          <div className="stat-value">{totalGames}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Points Per Game</div>
          <div className="stat-value">{avgPoints}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Assists Per Game</div>
          <div className="stat-value">{avgAssists}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Rebounds Per Game</div>
          <div className="stat-value">{avgRebounds}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Steals Per Game</div>
          <div className="stat-value">{avgSteals}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Blocks Per Game</div>
          <div className="stat-value">{avgBlocks}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Turnovers Per Game</div>
          <div className="stat-value">{avgTurnovers}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Minutes Per Game</div>
          <div className="stat-value">{avgMinutesPlayed}</div>
        </div>
      </div>
    </div>
  );
};

export default CurrentSeasonStats;