import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import search from '../images/searchIcon.svg';
import profile from '../images/profileIcon.svg';

function Header({ showSearchIcon = true, title }) {
  const history = useHistory();

  const redirectToProfile = () => {
    history.push('/profile');
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

      {showSearchIcon
      && <img
        src={ search }
        alt="search icon"
        data-testid="search-top-btn"
      />}
      <h1 data-testid="page-title">{title}</h1>
    </div>
  );
}

Header.propTypes = {
  showSearchIcon: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default Header;
