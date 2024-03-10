import React from 'react';
import './Games.css';

const SearchInput = ({ date, onDateChange, onSearch }) => {
  return (
    <div className="search-input">
      <label htmlFor="date">Enter date (YYYY-MM-DD):</label>
      <input
        type="date"
        id="date"
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default SearchInput;
