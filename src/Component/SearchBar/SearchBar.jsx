

import React from 'react';
import './SearchBar.css';


const SearchBox = ({ onLocationChange, onDistanceChange, onSearchClick }) => {
  return (
    <div id="search-container">
      <div id="location-search">
        <input
          type="text"
          name="location"
          placeholder="Search City"
          aria-label="Search for location"
          onChange={onLocationChange}
        />
      </div>

      <div id="distance-search">
        <input
          type="number"
          name="distance"
          placeholder=" Search Distance"
          aria-label="Search for distance"
          onChange={onDistanceChange}
        />
      </div>

      <div id="search-icon" onClick={onSearchClick}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3482B5" width="50px" height="50px">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </div>

      <h1 className='simple-text'>Let us plan you a perfect Unforgettable Holiday</h1>

    </div>
  );
};

export default SearchBox;
