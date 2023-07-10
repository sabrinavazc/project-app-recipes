import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import search from '../images/searchIcon.svg';
import profile from '../images/profileIcon.svg';

function Header({ showSearchIcon = true, title }) {
  const history = useHistory();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const redirectToProfile = () => {
    history.push('/profile');
  };

  const handleSearchBar = () => {
    setShowSearchBar((prevShowSearchBar) => !prevShowSearchBar);
  };

  return (
    <div>
      <button onClick={ redirectToProfile }>
        <img
          src={ profile }
          alt="profile icon"
          data-testid="profile-top-btn"
        />
      </button>
      {showSearchBar && <input data-testid="search-input" type="text" />}
      {showSearchIcon && (
        <button onClick={ handleSearchBar }>
          <img
            src={ search }
            alt="search icon"
            data-testid="search-top-btn"
          />
        </button>
      )}
      <h1 data-testid="page-title">{title}</h1>
    </div>
  );
}

Header.propTypes = {
  showSearchIcon: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default Header;
