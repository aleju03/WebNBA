// Teams.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TeamCard from './TeamCard';
import './Teams.css';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [selectedConference, setSelectedConference] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      const cachedTeams = localStorage.getItem('cachedTeams');

      if (cachedTeams && JSON.parse(cachedTeams).length > 0) {
        setTeams(JSON.parse(cachedTeams));
      } else {
        console.log('No cached teams found or cached teams array is empty. Fetching from API...');
        try {
          const eastApiCall = 'https://v2.nba.api-sports.io/teams?conference=East';
          const westApiCall = 'https://v2.nba.api-sports.io/teams?conference=West';

          console.log('API Call (East):', eastApiCall);
          console.log('API Call (West):', westApiCall);
          console.log('API Key:', process.env.REACT_APP_RAPID_API_KEY);

          const eastResponse = await axios.get(eastApiCall, {
            headers: {
              'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
              'x-rapidapi-host': 'v2.nba.api-sports.io',
            },
          });
          const westResponse = await axios.get(westApiCall, {
            headers: {
              'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
              'x-rapidapi-host': 'v2.nba.api-sports.io',
            },
          });

          console.log('API Response (East):', eastResponse.data);
          console.log('API Response (West):', westResponse.data);

          const allTeams = [...eastResponse.data.response, ...westResponse.data.response];
          const filteredTeams = allTeams.filter((team) => team.logo !== null);
          const teamCards = filteredTeams.map((team) => ({
            id: team.id,
            name: team.name,
            logo: team.logo,
            conference: team.leagues.standard.conference,
          }));
          console.log('Fetched teams:', teamCards);
          setTeams(teamCards);
          localStorage.setItem('cachedTeams', JSON.stringify(teamCards));
        } catch (error) {
          console.error('Error fetching teams:', error);
        }
      }
    };

    fetchTeams();
  }, []);

  const handleConferenceChange = (event) => {
    setSelectedConference(event.target.value);
  };

  const filteredTeams = selectedConference === 'All'
    ? teams
    : teams.filter((team) => team.conference === selectedConference);

  const handleTeamClick = (teamId) => {
    navigate(`/teams/${teamId}/season-stats`);
  };
    

  return (
    <div className="teams-container">
      <h2>NBA Teams</h2>
      <div className="conference-filter">
        <label htmlFor="conference-select">Filter by Conference:</label>
        <select id="conference-select" value={selectedConference} onChange={handleConferenceChange}>
          <option value="All">All</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </select>
      </div>
      <div className="team-cards-grid">
        {filteredTeams.map((team) => (
          <TeamCard key={team.id} team={team} onClick={() => handleTeamClick(team.id)} />
        ))}
      </div>
    </div>
  );
};

export default Teams;