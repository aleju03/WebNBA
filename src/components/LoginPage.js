import React from 'react';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <img src="/basketball-icon.png" alt="Basketball Icon" className="logo" />
          <h1>NBApp</h1>
        </div>
        <div className="player-image-container">
          <img src="/player.png" alt="Basketball Player" className="player-image" />
        </div>
        <h2>Welcome to NBApp</h2>
        <p>Sign in with your Google account to access the app.</p>
        <button onClick={() => onLogin()} className="login-button">
          <img src="/google-logo.png" alt="Google Logo" className="google-logo" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;