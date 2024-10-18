import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  const [what, setWhat] = useState('');
  const [where, setWhere] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Redirect to a search result page or filter job offers in Home based on the search query
    navigate('/', { state: { what, where } });
  };

  return (
    <div className="search-bar">
      <div className="input-wrapper">
        <SearchIcon className="search-icon" />
        <div className="search-fields">
          <div className="search-what">
            <input
              type="text"
              placeholder="What? ex: Profession ? sector of activity ?"
              value={what}
              onChange={(e) => setWhat(e.target.value)}
            />
          </div>
          <div className="separator">|</div>
          <div className="search-where">
            <input
              type="text"
              placeholder="Where? ex: Rennes, Paris"
              value={where}
              onChange={(e) => setWhere(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
