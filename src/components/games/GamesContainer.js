import React from 'react';
import './GamesContainer.css';

const GamesContainer = ({ children }) => {
  return (
    <div className="games-container">
      {children}
    </div>
  );
};

export default GamesContainer;