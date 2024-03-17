// TeamSeasonStats.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './TeamSeasonStats.css';
import LoadingSpinner from '../LoadingSpinner';

const TeamSeasonStats = () => {
    const { teamId } = useParams();
    console.log('Team ID:', teamId);
  
    const [teamStats, setTeamStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // Fetch team stats based on teamId
    useEffect(() => {
      const fetchTeamStats = async () => {
        try {
          const apiUrl = `https://v2.nba.api-sports.io/teams/statistics?id=${teamId}&season=2023`;
          console.log('API URL:', apiUrl);
  
          const response = await axios.get(apiUrl, {
            headers: {
              'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
              'x-rapidapi-host': 'v2.nba.api-sports.io',
            },
          });
  
          console.log('API Response:', response.data);
  
          if (response.data.response.length > 0) {
            setTeamStats(response.data.response[0]);
          } else {
            setError('No stats found for the selected team.');
          }
  
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching team stats:', error);
          setError('An error occurred while fetching team stats.');
          setIsLoading(false);
        }
      };
  
      fetchTeamStats();
    }, [teamId]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const {
    team,
    games,
    points,
    fgm,
    fga,
    fgp,
    ftm,
    fta,
    ftp,
    tpm,
    tpa,
    tpp,
    offReb,
    defReb,
    totReb,
    assists,
    pFouls,
    steals,
    turnovers,
    blocks,
    plusMinus,
  } = teamStats;

  return (
    <div className="team-season-stats-container">
      {team && (
        <>
          <h2 className="team-name">{team.name}'s Current Season Stats</h2>
          <div className="team-info">
            <img src={team.logo} alt={team.name} className="team-logo" />
          </div>
        </>
      )}
      {teamStats && (
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-label">Games Played</div>
            <div className="stat-value">{games}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Points</div>
            <div className="stat-value">{points}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Field Goals Made</div>
            <div className="stat-value">{fgm}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Field Goals Attempted</div>
            <div className="stat-value">{fga}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Field Goal Percentage</div>
            <div className="stat-value">{fgp}%</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Free Throws Made</div>
            <div className="stat-value">{ftm}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Free Throws Attempted</div>
            <div className="stat-value">{fta}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Free Throw Percentage</div>
            <div className="stat-value">{ftp}%</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Three-Pointers Made</div>
            <div className="stat-value">{tpm}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Three-Pointers Attempted</div>
            <div className="stat-value">{tpa}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Three-Point Percentage</div>
            <div className="stat-value">{tpp}%</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Offensive Rebounds</div>
            <div className="stat-value">{offReb}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Defensive Rebounds</div>
            <div className="stat-value">{defReb}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Total Rebounds</div>
            <div className="stat-value">{totReb}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Assists</div>
            <div className="stat-value">{assists}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Personal Fouls</div>
            <div className="stat-value">{pFouls}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Steals</div>
            <div className="stat-value">{steals}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Turnovers</div>
            <div className="stat-value">{turnovers}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Blocks</div>
            <div className="stat-value">{blocks}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Plus-Minus</div>
            <div className="stat-value">{plusMinus}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamSeasonStats;