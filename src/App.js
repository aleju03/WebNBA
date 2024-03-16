// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './App.css';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import Games from './components/games/Games';
import Players from './components/players/Players';

const headers = {
  'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
  'x-rapidapi-host': 'v1.basketball.api-sports.io',
};
const API_URL = 'https://v1.basketball.api-sports.io/games?league=12&season=2023-2024';

const App = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <Router>
      <div className="app">
        {profile ? (
          <>
            <Navbar user={profile} onLogout={logOut} />
            <Routes>
              <Route path="/players" element={<Players />} />
              <Route path="/games" element={<Games API_URL={API_URL} headers={headers} />} />
              <Route path="/teams" element={<h1>Teams</h1>} />
              <Route path="/leaderboard" element={<h1>Leaderboard</h1>} />
            </Routes>
          </>
        ) : (
          <LoginPage onLogin={login} />
        )}
      </div>
    </Router>
  );
};

export default App;