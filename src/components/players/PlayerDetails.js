import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PlayerDetails.css';
import { useNavigate } from 'react-router-dom';

const PlayerDetails = ({ player, onClose }) => {
  const [playerDetails, setPlayerDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        const cachedPlayer = localStorage.getItem(`player_${player.Name}`);
  
        if (cachedPlayer) {
          setPlayerDetails(JSON.parse(cachedPlayer));
          setIsLoading(false);
        } else {
          const apiUrl = `https://v2.nba.api-sports.io/players?search=${player.lastname}`;
          console.log('API URL:', apiUrl);
  
          const response = await axios.get(apiUrl, {
            headers: {
              'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
              'x-rapidapi-host': 'v2.nba.api-sports.io',
            },
          });
  
          console.log('API Response:', response.data);
  
          const playerData = response.data.response.find(
            (p) => {
              const csvNameParts = player.Name.split(' ');
              const csvFirstName = csvNameParts[0];
              const csvLastName = csvNameParts.slice(1).join(' ');
              return p.firstname === csvFirstName && p.lastname.startsWith(csvLastName);
            }
          );
  
          if (playerData) {
            setPlayerDetails(playerData);
            localStorage.setItem(`player_${player.Name}`, JSON.stringify(playerData));
          }
  
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching player details:', error);
        setIsLoading(false);
      }
    };
  
    fetchPlayerDetails();
  }, [player]);

  if (!playerDetails && isLoading) {
    return null;
  }

  if (!playerDetails) {
    return (
      <div className="player-details-overlay">
        <div className="player-details-container">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <div className="player-details-error">Player details not found.</div>
        </div>
      </div>
    );
  }

  const handleLast10Games = () => {
    navigate(`/players/${playerDetails.id}/last-10-games`);
  };

  const handleCurrentSeasonStats = () => {
    navigate(`/players/${playerDetails.id}/current-season-stats`);
  };

  return (
    <div className="player-details-overlay">
      <div className="player-details-container">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{`${playerDetails.firstname} ${playerDetails.lastname}`}</h2>
        <div className="player-details-info">
          <div className="player-info-row">
            <div className="player-info-label">Date of Birth:</div>
            <div className="player-info-value">{playerDetails.birth.date}</div>
          </div>
          <div className="player-info-row">
            <div className="player-info-label">Country:</div>
            <div className="player-info-value">{playerDetails.birth.country}</div>
          </div>
          <div className="player-info-row">
            <div className="player-info-label">Height:</div>
            <div className="player-info-value">
              {playerDetails.height.feets}' {playerDetails.height.inches}" ({playerDetails.height.meters}m)
            </div>
          </div>
          <div className="player-info-row">
            <div className="player-info-label">Weight:</div>
            <div className="player-info-value">
              {playerDetails.weight.pounds} lbs ({playerDetails.weight.kilograms} kg)
            </div>
          </div>
          <div className="player-info-row">
            <div className="player-info-label">College:</div>
            <div className="player-info-value">{playerDetails.college}</div>
          </div>
          <div className="player-info-row">
            <div className="player-info-label">Affiliation:</div>
            <div className="player-info-value">{playerDetails.affiliation}</div>
          </div>
          <div className="player-info-row">
            <div className="player-info-label">NBA Start:</div>
            <div className="player-info-value">{playerDetails.nba.start}</div>
          </div>
          <div className="player-info-row">
            <div className="player-info-label">Years Pro:</div>
            <div className="player-info-value">{playerDetails.nba.pro}</div>
          </div>
          <div className="player-info-row">
            <div className="player-info-label">Jersey Number:</div>
            <div className="player-info-value">{playerDetails.leagues.standard.jersey}</div>
          </div>
          <div className="player-info-row">
            <div className="player-info-label">Position:</div>
            <div className="player-info-value">{playerDetails.leagues.standard.pos}</div>
          </div>
        </div>
        <div className="player-details-buttons">
          <button onClick={handleLast10Games}>Last 10 Games</button>
          <button onClick={handleCurrentSeasonStats}>Current Season Stats</button>
        </div>
      </div>
    </div>
  );  
};

export default PlayerDetails;