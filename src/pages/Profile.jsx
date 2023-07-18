import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';
import profile from '../assets/profileIcon.svg';
import logoutIcon from '../assets/logout.svg';
import done from '../assets/done.svg';
import favorite from '../assets/favorites.svg';
import './Profile.css';

function Profile() {
  const history = useHistory();
  const getUser = JSON.parse(localStorage.getItem('user')) ?? { email: '' };
  const { email } = getUser;

  const redirectDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const redirectFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="profile-container">
      <Header src={ profile } title="Profile" showSearchIcon={ false } />
      <p className="email-user" data-testid="profile-email">{email}</p>
      <div className="pages-container">
        <button
          className="each-page"
          onClick={ redirectDoneRecipes }
          data-testid="profile-done-btn"
        >
          <img className="icon-page" src={ done } alt="done" />
          Done Recipes

        </button>
        <button
          className="each-page"
          onClick={ redirectFavoriteRecipes }
          data-testid="profile-favorite-btn"
        >
          <img className="icon-page" src={ favorite } alt="favorite" />
          Favorite Recipes

        </button>
        <button
          className="each-page"
          onClick={ logout }
          data-testid="profile-logout-btn"
        >
          <img className="icon-page" src={ logoutIcon } alt="logout" />
          Logout

        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
