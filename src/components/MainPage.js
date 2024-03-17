// MainPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
  return (
    <div className="main-page">
      <img src="/nbapp-logo.png" alt="NBApp Logo" className="nbapp-logo" />
      <h1>Welcome to NBApp</h1>
      <p>Your ultimate destination for NBA stats, games, and more!</p>
      <div className="main-page-buttons">
        <Link to="/players" className="main-page-button">
          Explore Players
        </Link>
        <Link to="/games" className="main-page-button">
          Check Games
        </Link>
      </div>
      <a href="https://github.com/AdrianSanchez1510/WebNBA" target="_blank" rel="noopener noreferrer" className="github-link">
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub Logo" className="github-logo" />
      </a>
    </div>
  );
};

export default MainPage;