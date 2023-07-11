import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  getFoodByIngredient,
  getFoodByFirstLetter,
  getFoodByName } from '../services/food-service';
import {
  getDrinkByIngredient,
  getDrinkByFirstLetter,
  getDrinkByName } from '../services/drink-service';
import RecipeContext from '../context/RecipeContext';

function SearchBar({ isMeals = true }) {
  const { setMeals, setDrinks } = useContext(RecipeContext);
  const history = useHistory();
  const [searchType, setSearchType] = useState('ingredient');
  const [searchTerm, setSearchTerm] = useState('');
  const searchTypes = ['ingredient', 'name', 'first-letter'];

  const handleData = (data) => {
    const recipes = data ?? [];
    if (isMeals) {
      setMeals(recipes);

      if (recipes.length === 1) {
        history.push(`/meals/${recipes[0].idMeal}`);
      } else if (recipes.length === 0) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    } else {
      setDrinks(recipes);
      if (recipes.length === 1) {
        history.push(`/drinks/${recipes[0].idDrink}`);
      } else if (recipes.length === 0) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    }
  };

  const searchMeals = () => {
    if (searchType === searchTypes[0]) {
      getFoodByIngredient(searchTerm)
        .then((data) => handleData(data));
    }

    if (searchType === searchTypes[1]) {
      getFoodByName(searchTerm)
        .then((data) => handleData(data));
    }

    if (searchType === searchTypes[2]) {
      if (searchTerm.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      getFoodByFirstLetter(searchTerm)
        .then((data) => handleData(data));
    }
  };

  const searchDrinks = () => {
    if (searchType === searchTypes[0]) {
      getDrinkByIngredient(searchTerm)
        .then((data) => handleData(data));
    }

    if (searchType === searchTypes[1]) {
      getDrinkByName(searchTerm)
        .then((data) => handleData(data));
    }

    if (searchType === searchTypes[2]) {
      if (searchTerm.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      getDrinkByFirstLetter(searchTerm)
        .then((data) => handleData(data));
    }
  };

  const handleSearchClick = () => {
    if (isMeals) {
      searchMeals();
    } else {
      searchDrinks();
    }
  };

  return (
    <div className="search-bar">
      <input
        data-testid="search-input"
        type="text"
        placeholder="Search"
        onChange={ (e) => setSearchTerm(e.target.value) }
      />
      <label htmlFor="ingredient-search-radio">Ingredient</label>
      <input
        data-testid="ingredient-search-radio"
        type="radio"
        name="search"
        onClick={ () => setSearchType('ingredient') }
      />
      <label htmlFor="name-search-radio">Name</label>
      <input
        data-testid="name-search-radio"
        type="radio"
        name="search"
        onClick={ () => setSearchType('name') }
      />
      <label htmlFor="first-letter-search-radio">First Letter</label>
      <input
        data-testid="first-letter-search-radio"
        type="radio"
        name="search"
        onClick={ () => setSearchType('first-letter') }
      />
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleSearchClick }
      >
        Search

      </button>
    </div>
  );
}

SearchBar.propTypes = {
  isMeals: PropTypes.bool,
};

export default SearchBar;
