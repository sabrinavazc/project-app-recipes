import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import allFood from '../assets/allFood.svg';
import food from '../assets/food.svg';
import allDrinks from '../assets/allDrinks.svg';
import share from '../images/shareIcon.svg';

function DoneRecipes() {
  const history = useHistory();
  const [recipes, setRecipes] = useState([]);
  const [fiteredRecipes, setFilteredRecipes] = useState([]);
  const [linkCopied, setLinkCopied] = useState([]);

  const getRecipesDone = () => {
    const doneRecipesJSON = localStorage.getItem('doneRecipes') ?? '[]';
    const doneRecipes = JSON.parse(doneRecipesJSON);
    setRecipes(doneRecipes);
    setFilteredRecipes(doneRecipes);
  };

  useEffect(() => {
    getRecipesDone();
  }, []);

  const filterByAll = () => {
    getRecipesDone();
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

  return (
    <div>
      <Header title="Done Recipes" showSearchIcon={ false } />
      <button onClick={ filterByAll } name="All" data-testid="filter-by-all-btn">
        <img src={ allFood } alt="all" />
      </button>
      <button onClick={ filterByMeals } name="Meals" data-testid="filter-by-meal-btn">
        <img src={ food } alt="food" />
      </button>
      <button onClick={ filterByDrinks } name="Drinks" data-testid="filter-by-drink-btn">
        <img src={ allDrinks } alt="all" />
      </button>

      {fiteredRecipes?.map((recipe, index) => (
        <div key={ index }>
          <button
            onClick={ () => redirectDetails(recipe.id, recipe.type) }
            style={ {
              border: 'none', background: 'none', padding: 0, cursor: 'pointer' } }
          >
            <img
              src={ recipe.image }
              data-testid={ `${index}-horizontal-image` }
              alt="recipe"
              style={ { width: '100px' } }
            />
          </button>
          <p
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
            <p data-testid={ `${index}-horizontal-name` }>
              {recipe.type === 'meal' ? recipe.name : recipe.name}
            </p>
          </button>
          <p data-testid={ `${index}-horizontal-done-date` }>
            {recipe.doneDate}
          </p>
          <button
            onClick={ () => handleLinkCopy(recipe.id) }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ share }
              alt="share"
            />
          </button>
          {recipe.tags?.slice(0, 2).map((tag) => (
            <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
              {tag}
              {' '}
            </span>
          ))}
          {linkCopied.includes(recipe.id)
          && <p style={ { background: 'yellow' } }>Link copied!</p>}
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
