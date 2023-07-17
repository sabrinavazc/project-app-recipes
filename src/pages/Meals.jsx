import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeContext from '../context/RecipeContext';
import Recipes from '../components/Recipes';
import { getAllFoods,
  getFoodsByCategory, filterFoodsByCategory } from '../services/food-service';

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

  const handleMealCategoryFilter = async (category) => {
    const mealsData = await filterFoodsByCategory(category);
    const filterMeals = mealsData.slice(0, MAX_LENGTH);
    setMeals(filterMeals);
  };

  const handleFilterAllMeals = async () => {
    const mealsData = await getAllFoods();
    const allMeals = mealsData.slice(0, MAX_LENGTH);
    setMeals(allMeals);
  };

  return (
    <div
      style={ { display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%' } }
    >
      <Header title="Meals" data-testid="header-component" />
      <h1>Meals</h1>
      <div style={ { display: 'flex', width: '80%' } }>
        {

          mealCategories.map((nameCategory, index) => (
            <button
              key={ index }
              data-testid={ `${nameCategory.strCategory}-category-filter` }
              type="button"
              onClick={ () => handleMealCategoryFilter(nameCategory.strCategory) }
            >
              {nameCategory.strCategory}
            </button>
          ))
        }
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ () => handleFilterAllMeals() }
        >
          All
        </button>
      </div>
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
