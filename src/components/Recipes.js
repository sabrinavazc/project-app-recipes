import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Recipes.css';

function Recipes({ isMeals, recipe, index }) {
  return (
    <div
      className="each-recipe"
      key={ index }
      data-testid={ `${index}-recipe-card` }
    >
      <Link to={ isMeals ? `/meals/${recipe.idMeal}` : `/drinks/${recipe.idDrink}` }>
        <div
          key={ index }
          className="recipe-img"
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ isMeals ? recipe.strMealThumb : recipe.strDrinkThumb }
            alt={ isMeals ? recipe.strMeal : recipe.strDrink }
            className="recipe-img"
          />
          <p
            className="name-recipe"
            data-testid={ `${index}-card-name` }
            style={ { color: 'black' } }
          >
            { isMeals ? recipe.strMeal : recipe.strDrink}
          </p>
        </div>
      </Link>
    </div>
  );
}

Recipes.propTypes = {
  isMeals: PropTypes.bool.isRequired,
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default Recipes;
