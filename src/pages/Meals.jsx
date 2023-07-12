import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeContext from '../context/RecipeContext';

function Meals() {
  const MAX_LENGTH = 12;
  const { meals, setMeals } = useContext(RecipeContext);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setMeals(data.meals.slice(0, MAX_LENGTH));
    };
    fetchMeals();
  }, [setMeals]);

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
          <Link to="/meals/:id">
            <img
              data-testid={ `${index}-card-img` }
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              style={ { width: '50px' } }
            />
          </Link>
          <h1 data-testid={ `${index}-card-name` }>{meal.strMeal}</h1>
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default Meals;
