import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../components/Header';
import allFood from '../assets/allFood.svg';
import food from '../assets/food.svg';
import allDrinks from '../assets/allDrinks.svg';
import share from '../images/shareIcon.svg';
import favorite from '../images/blackHeartIcon.svg';
import favorites from '../assets/favorites.svg';
import './FavoriteRecipes.css';
import Footer from '../components/Footer';

function FavoriteRecipes() {
  const history = useHistory();
  const [recipes, setRecipes] = useState([]);
  const [fiteredRecipes, setFilteredRecipes] = useState([]);
  const [linkCopied, setLinkCopied] = useState([]);

  const getRecipesFavorite = () => {
    const favoriteRecipesJSON = localStorage.getItem('favoriteRecipes') ?? '[]';
    const favoriteRecipes = JSON.parse(favoriteRecipesJSON);
    setRecipes(favoriteRecipes);
    setFilteredRecipes(favoriteRecipes);
  };

  useEffect(() => {
    getRecipesFavorite();
  }, []);

  const filterByAll = () => {
    getRecipesFavorite();
    setFilteredRecipes(recipes);
  };

  const filterByDrinks = () => {
    const filterDrinks = recipes.filter((recipe) => recipe.type === 'drink');
    setFilteredRecipes(filterDrinks);
  };

  const filterByMeals = () => {
    const filterMeals = recipes.filter((recipe) => recipe.type === 'meal');
    setFilteredRecipes(filterMeals);
  };

  const handleLinkCopy = async (id) => {
    const { type } = recipes.filter((recipe) => recipe.id === id)[0];
    const link = `${window.location.origin}/${type}s/${id}`;

    const copyLink = async () => {
      await copy(link);
      const newLinkCopied = [...linkCopied, id];
      setLinkCopied(newLinkCopied);
      toast('Link copiado!');
    };

    copyLink();
  };

  const redirectDetails = (id, type) => {
    if (type === 'meal') {
      history.push(`/meals/${id}`);
    } else {
      history.push(`/drinks/${id}`);
    }
  };

  const removeFavorite = (id) => {
    const favoriteRecipesJSON = localStorage.getItem('favoriteRecipes') ?? '[]';
    const favoriteRecipes = JSON.parse(favoriteRecipesJSON);
    const newFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes ?? []));
    getRecipesFavorite();
  };

  return (
    <div className="favorite-container">
      <Header src={ favorites } title="Favorite Recipes" showSearchIcon={ false } />
      <div className="container-icons">
        <button
          className="btn-category"
          onClick={ filterByAll }
          name="All"
          data-testid="filter-by-all-btn"
        >
          <img className="icone" src={ allFood } alt="all" />
          All
        </button>
        <button
          className="btn-category"
          onClick={ filterByMeals }
          name="Meals"
          data-testid="filter-by-meal-btn"
        >
          <img className="icone" src={ food } alt="Allfood" />
          Food
        </button>
        <button
          className="btn-category"
          onClick={ filterByDrinks }
          name="Drinks"
          data-testid="filter-by-drink-btn"
        >
          <img className="icone" src={ allDrinks } alt="allDrinks" />
          Drinks
        </button>
      </div>
      <div className="favorite-box">
        {fiteredRecipes?.map((recipe, index) => (
          <div key={ index } className="card-recipe">
            <button
              className="image-container"
              style={ { padding: '0px' } }
              onClick={ () => redirectDetails(recipe.id, recipe.type) }
            >
              <img
                className="image-recipe"
                src={ recipe.image }
                data-testid={ `${index}-horizontal-image` }
                alt="recipe"
              />
            </button>
            <div className="left">
              <div style={ { padding: '0px' } }>
                <p
                  className="top-text"
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipe.type === 'meal'
                    ? `${recipe.nationality} - ${recipe.category}`
                    : recipe.alcoholicOrNot}
                </p>
                <button
                  onClick={ () => redirectDetails(recipe.id, recipe.type) }
                  style={ {
                    border: 'none', background: 'none', padding: 0, cursor: 'pointer' } }
                >
                  <p className="name-recipe" data-testid={ `${index}-horizontal-name` }>
                    {recipe.type === 'meal' ? recipe.name : recipe.name}
                  </p>
                </button>
              </div>
              <div>
                <button
                  className="btn-share"
                  onClick={ () => handleLinkCopy(recipe.id) }
                >
                  <img
                    className="share"
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ share }
                    alt="share"
                  />
                </button>
                <button
                  className="btn-favorite"
                  onClick={ () => removeFavorite(recipe.id) }
                >
                  <img
                    className="favorite"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ favorite }
                    alt="favorite"
                  />
                </button>
              </div>
            </div>
            {linkCopied.includes(recipe.id)
          && <p className="link-copied">Link copied!</p>}
          </div>
        ))}
      </div>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={ {
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        } }
      />
    </div>
  );
}

export default FavoriteRecipes;
