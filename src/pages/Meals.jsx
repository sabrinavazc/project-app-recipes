import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeContext from '../context/RecipeContext';

function Meals() {
  const MAX_LENGTH = 12;
  const { meals } = useContext(RecipeContext);

  return (
    <div>
      <Header title="Meals" />
      <h1>Meals</h1>
      {meals?.slice(0, MAX_LENGTH).map((meal, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
          style={ { display: 'flex' } }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
            style={ { width: '50px' } }
          />
          <h1 data-testid={ `${index}-card-name` }>{meal.strMeal}</h1>
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default Meals;
