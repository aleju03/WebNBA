import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); //
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">NBApp</Link>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/players">Players</Link></li>
        <li><Link to="/games">Games</Link></li>
        <li><Link to="/teams">Teams</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
      </ul>
      <div className="navbar-user">
        {user ? (
          <div className="user-profile">
            <img
              src={user.picture}
              alt="User Profile"
              className="user-avatar"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <span>Welcome, {user.name}</span>
                <button onClick={onLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;