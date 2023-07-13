import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeContext from '../context/RecipeContext';
import Recipes from '../components/Recipes';
import { getAllFoods } from '../services/food-service';

function Meals() {
  const MAX_LENGTH = 12;
  const { meals, setMeals } = useContext(RecipeContext);

  useEffect(() => {
    getAllFoods()
      .then((data) => setMeals(data.slice(0, MAX_LENGTH)));
  }, [setMeals]);

  return (
    <div
      style={ { display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%' } }
    >
      <Header title="Meals" data-testid="header-component" />
      <h1>Meals</h1>
      <div style={ { display: 'flex', width: '90%', flexWrap: 'wrap' } }>
        {meals?.slice(0, MAX_LENGTH).map((meal, index) => (
          <Recipes
            data-testid={ `${meal.id}-recipe-component` }
            key={ meal.id }
            isMeals
            recipe={ meal }
            index={ index }
          />
        ))}
      </div>
      <Footer data-testid="footer-component" />
    </div>
  );
}

export default Meals;
