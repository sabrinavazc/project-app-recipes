import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import search from '../images/searchIcon.svg';
import profile from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import logoHeader from '../assets/logo.svg';
import './Header.css';

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
    <>
      <div className="header-container">
        <Link to="/meals">
          <img src={ logoHeader } alt="logo" className="logo-header" />
        </Link>

        <div className="icons-header">
          {showSearchIcon && (
            <button className="btn-search" onClick={ handleSearchBar }>
              <img
                src={ search }
                alt="search icon"
                data-testid="search-top-btn"
              />
            </button>
          )}
          <button className="btn-profile" onClick={ redirectToProfile }>
            <img
              src={ profile }
              alt="profile icon"
              data-testid="profile-top-btn"
            />
          </button>
        </div>
      </div>
      <h1 data-testid="page-title">{title}</h1>
      {showSearchBar && (<SearchBar isMeals={ title !== 'Drinks' } />)}
    </>
  );
}

Header.propTypes = {
  showSearchIcon: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default Header;
