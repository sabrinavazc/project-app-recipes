import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  const getUser = JSON.parse(localStorage.getItem('user'));
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
    <div>
      <Header title="Profile" showSearchIcon={ false } />
      <h1>Profile</h1>
      <p data-testid="profile-email">{email}</p>
      <button
        onClick={ redirectDoneRecipes }
        data-testid="profile-done-btn"
      >
        Done Recipes

      </button>
      <button
        onClick={ redirectFavoriteRecipes }
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes

      </button>
      <button onClick={ logout } data-testid="profile-logout-btn">Logout</button>
      <Footer />
    </div>
  );
}

export default Profile;
