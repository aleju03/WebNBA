// Players.js

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './Players.css';
import axios from 'axios';
import PlayerDetails from './PlayerDetails';
import fallbackImage from './fallback-image.png';

const Players = () => {
  const [allPlayers, setAllPlayers] = useState([]);
  const [displayedPlayers, setDisplayedPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [page, setPage] = useState(1);
  const [forceSearchEnabled, setForceSearchEnabled] = useState(false);
  const [forceSearchTerm, setForceSearchTerm] = useState('');

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await fetch('/NBA_PFPS.csv');
        const csvData = await response.text();
        const { data } = Papa.parse(csvData, { header: true });
        setAllPlayers(data);
        setDisplayedPlayers(data.slice(0, 20));
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    };

    fetchPlayerData();
  }, []);

  const handleForceSearch = async (event) => {
    event.preventDefault();
    if (forceSearchTerm.trim() !== '') {
      try {
        const lastName = forceSearchTerm.trim().split(' ').pop();
        const apiUrl = `https://v2.nba.api-sports.io/players?name=${lastName}`;
        console.log('Force Search API URL:', apiUrl);
        console.log('API Key:', process.env.REACT_APP_RAPID_API_KEY);
  
        const response = await axios.get(apiUrl, {
          headers: {
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
            'x-rapidapi-host': 'v2.nba.api-sports.io',
          },      });
  
        console.log('Force Search API Response:', response.data);
  
        if (response.data.errors && response.data.errors.token) {
          throw new Error('API-KEY Error');
        }
  
        const forcedPlayers = response.data.response
          .filter((player) => `${player.firstname} ${player.lastname}`.toLowerCase().includes(forceSearchTerm.toLowerCase()))
          .map((player) => ({
            id: player.id,
            Name: `${player.firstname} ${player.lastname}`,
            PFP: fallbackImage,
          }));
  
        setDisplayedPlayers([...displayedPlayers, ...forcedPlayers]);
      } catch (error) {
        console.error('Error fetching forced players:', error);
        if (error.message === 'API-KEY Error') {
          console.error('API-KEY Error: Missing or invalid application key.');
        }
      }
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filteredPlayers = allPlayers.filter((player) =>
      player.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setDisplayedPlayers(filteredPlayers.slice(0, page * 20));
  };

  const handlePlayerClick = (player) => {
    const names = player.Name.split(' ');
    const lastname = names[names.length - 1];
    setSelectedPlayer({ ...player, lastname });
  };
  

  const handleClosePlayerDetails = () => {
    setSelectedPlayer(null);
  };

  const loadMorePlayers = () => {
    setPage((prevPage) => prevPage + 1);
    setDisplayedPlayers(allPlayers.slice(0, (page + 1) * 20));
  };

  return (
    <div className="players-container">
      <div className="players-header">
        <h2>Players</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button
            className="force-search-toggle"
            onClick={() => setForceSearchEnabled(!forceSearchEnabled)}
          >
            {forceSearchEnabled ? 'Hide Force Search' : 'Show Force Search'}
          </button>
        </div>
        {forceSearchEnabled && (
          <form onSubmit={handleForceSearch} className="force-search-form">
            <input
              type="text"
              placeholder="Force player search..."
              value={forceSearchTerm}
              onChange={(event) => setForceSearchTerm(event.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        )}
      </div>
      <div className="player-cards">
        {displayedPlayers.map((player, index) => (
          <div key={index} className="player-card" onClick={() => handlePlayerClick(player)}>
            <img
              src={player.PFP}
              alt={player.Name}
              className="player-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackImage;
              }}
            />
            <p>{player.Name}</p>
          </div>
        ))}
      </div>
      {allPlayers.length > displayedPlayers.length && (
        <button onClick={loadMorePlayers} className="load-more-button">
          Load More
        </button>
      )}
      {selectedPlayer && (
        <PlayerDetails player={selectedPlayer} onClose={handleClosePlayerDetails} />
      )}
    </div>
  );
};

export default Players;