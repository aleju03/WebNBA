// Leaderboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner';
import './Leaderboard.css';

const Leaderboard = () => {
  const [standings, setStandings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedConference, setSelectedConference] = useState('All');

  useEffect(() => {
    const fetchStandings = async () => {
      const cachedStandings = localStorage.getItem('cachedStandings');

      if (cachedStandings) {
        setStandings(JSON.parse(cachedStandings));
        setIsLoading(false);
      } else {
        try {
          const response = await axios.get('https://v2.nba.api-sports.io/standings?league=standard&season=2023', {
            headers: {
              'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
              'x-rapidapi-host': 'v2.nba.api-sports.io',
            },
          });

          const allStandings = response.data.response;
          const sortedStandings = allStandings.sort((a, b) => b.win.total - a.win.total);

          setStandings(sortedStandings);
          localStorage.setItem('cachedStandings', JSON.stringify(sortedStandings));
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching standings:', error);
          setIsLoading(false);
        }
      }
    };

    fetchStandings();
  }, []);

  const refreshStandings = () => {
    localStorage.removeItem('cachedStandings');
    window.location.reload();
  };

  const handleConferenceChange = (event) => {
    setSelectedConference(event.target.value);
  };

  const filteredStandings = selectedConference === 'All'
    ? standings
    : standings.filter((team) => team.conference.name === selectedConference.toLowerCase());

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <div className="filters">
        <select value={selectedConference} onChange={handleConferenceChange}>
          <option value="All">All</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </select>
        <button className="refresh-button" onClick={refreshStandings}>
          Refresh
        </button>
      </div>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Win %</th>
          </tr>
        </thead>
        <tbody>
          {filteredStandings.map((team, index) => (
            <tr key={team.team.id} className={`rank-${index + 1}`}>
              <td>{index + 1}</td>
              <td>
                <img src={team.team.logo} alt={team.team.name} className="team-logo" />
              </td>
              <td>{team.team.name}</td>
              <td>{team.win.total}</td>
              <td>{team.loss.total}</td>
              <td>{(parseFloat(team.win.percentage) * 100).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;