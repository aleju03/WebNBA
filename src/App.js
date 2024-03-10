import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './App.css';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import GameDetails from './components/games/GameDetails';
import GamesList from './components/games/GamesList';
import SearchInput from './components/games/SearchInput';

const headers = {
  'x-rapidapi-key': '11ebc35c27d9972837eff0aea0cfb35b', // Replace with your actual API key 💀
  'x-rapidapi-host': 'v1.basketball.api-sports.io',
};
const API_URL = 'https://v1.basketball.api-sports.io/games?league=12&season=2023-2024';

const App = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [date, setDate] = useState('');
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [error, setError] = useState(null);

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

  const handleSearch = async () => {
    setError(null); // Clear any previous error

    if (!date) {
      setError('Please enter a valid date.');
      return;
    }

    // Calculate date with one day added
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);

    const fullUrl = `${API_URL}&date=${newDate.toISOString().slice(0, 10)}`; // Use ISO 8601 format for consistent date representation

    try {
      const response = await axios.get(fullUrl, { headers });
      const data = response.data;
      setGames(data.response);
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching data. Please try again later.');
    }
  };

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  return (
    <Router>
      <div className="app">
        {profile ? (
          <>
            <Navbar user={profile} onLogout={logOut} />
            <Routes>
              <Route path="/players" element={<h1>Players</h1>} />
              <Route path="/games" element={
                <div className="games-container">
                  <h1>NBA Games Search</h1>
                  <SearchInput date={date} onDateChange={setDate} onSearch={handleSearch} />
                  {error && <p className="error">{error}</p>}
                  {games.length > 0 && <GamesList games={games} onGameSelect={handleGameSelect} />}
                  {selectedGame && <GameDetails game={selectedGame} />}
                </div>
              } />
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