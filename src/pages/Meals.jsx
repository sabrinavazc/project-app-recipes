import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeContext from '../context/RecipeContext';
import Recipes from '../components/Recipes';
import { getAllFoods, getFoodsByCategory } from '../services/food-service';

function Meals() {
  const MAX_LENGTH = 12;
  const CATEGORIES = 5;
  const { meals, setMeals } = useContext(RecipeContext);
  const [categoriesMeals, setCategoriesMeals] = useState([]);
  const mealCategories = categoriesMeals.slice(0, CATEGORIES);

  useEffect(() => {
    getAllFoods()
      .then((data) => setMeals(data.slice(0, MAX_LENGTH)));
    const getCateg = async () => {
      setCategoriesMeals(await getFoodsByCategory());
    };
    getCateg();
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
      {
        mealCategories.map((nameCategory, index) => (
          <button
            key={ index }
            data-testid={ `${nameCategory.strCategory}-category-filter` }
          >
            {nameCategory.strCategory}
          </button>
        ))
      }
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
