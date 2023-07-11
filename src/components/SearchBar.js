import React from 'react';

function SearchBar() {
  return (
    <div className="search-bar">
      <input data-testid="search-input" type="text" placeholder="Search" />
      <label htmlFor="ingredient-search-radio">Ingredient</label>
      <input data-testid="ingredient-search-radio" type="radio" name="search" />
      <label htmlFor="name-search-radio">Name</label>
      <input data-testid="name-search-radio" type="radio" name="search" />
      <label htmlFor="first-letter-search-radio">First Letter</label>
      <input data-testid="first-letter-search-radio" type="radio" name="search" />
      <button data-testid="exec-search-btn" type="button">Search</button>
    </div>
  );
}

export default SearchBar;
