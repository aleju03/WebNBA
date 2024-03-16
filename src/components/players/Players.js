// Players.js

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './Players.css';
import PlayerDetails from './PlayerDetails';
import fallbackImage from './fallback-image.png';

const Players = () => {
  const [allPlayers, setAllPlayers] = useState([]);
  const [displayedPlayers, setDisplayedPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [page, setPage] = useState(1);

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
        <input
          type="text"
          placeholder="Search players..."
          value={searchTerm}
          onChange={handleSearch}
        />
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
        <button onClick={loadMorePlayers}>Load More</button>
      )}
      {selectedPlayer && (
        <PlayerDetails player={selectedPlayer} onClose={handleClosePlayerDetails} />
      )}
    </div>
  );
};

export default Players;