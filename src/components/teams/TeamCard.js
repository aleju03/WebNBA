// TeamCard.js
import React from 'react';
import './TeamCard.css';

const TeamCard = ({ team, onClick }) => {
  return (
    <div className="team-card" onClick={onClick}>
      <img src={team.logo} alt={team.name} className="team-logo" />
      <h3 className="team-name">{team.name}</h3>
    </div>
  );
};

export default TeamCard;