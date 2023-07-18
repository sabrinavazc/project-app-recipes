import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import search from '../images/searchIcon.svg';
import profile from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import logoHeader from '../assets/logo.svg';
import './Header.css';

function Header({ showSearchIcon = true, title, src }) {
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
        {/* <Link to="/meals"> */}
        <img src={ logoHeader } alt="logo" className="logo-header" />
        {/* </Link> */}

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
      <div
        key={ title }
        className="pages-identification"
      >

        <img src={ src } alt={ title } />

        <h1 className="page-title" data-testid="page-title">{title}</h1>
      </div>
      {showSearchBar && (<SearchBar isMeals={ title !== 'Drinks' } />)}
    </>
  );
}

Header.propTypes = {
  showSearchIcon: PropTypes.bool,
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default Header;
