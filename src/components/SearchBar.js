import React, { useState } from 'react';
import {
  getFoodByIngredient,
  getFoodByFirstLetter,
  getFoodByName } from '../services/food-service';

function SearchBar() {
  const [searchType, setSearchType] = useState('ingredient');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchClick = () => {
    if (searchType === 'ingredient') {
      getFoodByIngredient(searchTerm)
        .then((data) => console.log(data));
    }

    if (searchType === 'name') {
      getFoodByName(searchTerm)
        .then((data) => console.log(data));
    }

    if (searchType === 'first-letter') {
      if (searchTerm.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      getFoodByFirstLetter(searchTerm)
        .then((data) => console.log(data));
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

export default SearchBar;
