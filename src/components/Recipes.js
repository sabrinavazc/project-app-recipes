import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Recipes({ isMeals, recipe, index }) {
  return (
    <div
      key={ index }
      data-testid={ `${index}-recipe-card` }
      style={ { height: '100px' } }
    >
      <Link to={ isMeals ? `/meals/${recipe.id}` : `/drinks/${recipe.id}` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ isMeals ? recipe.strMealThumb : recipe.strDrinkThumb }
          alt={ isMeals ? recipe.strMeal : recipe.strDrink }
          style={ { width: '50px' } }
        />
      </Link>
      <p data-testid={ `${index}-card-name` }>
        { isMeals ? recipe.strMeal : recipe.strDrink}
      </p>
    </div>
  );
}

Recipes.propTypes = {
  isMeals: PropTypes.bool.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default Recipes;
