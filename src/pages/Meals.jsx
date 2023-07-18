import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeContext from '../context/RecipeContext';
import Recipes from '../components/Recipes';

import mealIcon from '../images/mealIcon.svg';
import { getAllFoods,
  getFoodsByCategory, filterFoodsByCategory } from '../services/food-service';
import allFood from '../assets/allFood.svg';
import beef from '../assets/beef.svg';
import breakfast from '../assets/breakfast.svg';
import chicken from '../assets/chicken.svg';
import dessert from '../assets/desert.svg';
import goat from '../assets/goat.svg';
import './Meals.css';

function Meals() {
  const MAX_LENGTH = 12;
  const CATEGORIES = 5;
  const { meals, setMeals } = useContext(RecipeContext);
  const [categoriesMeals, setCategoriesMeals] = useState([]);
  const mealCategories = categoriesMeals.slice(0, CATEGORIES);
  const [currentFilterMeal, setCurrentFilterMeal] = useState(null);

  useEffect(() => {
    getAllFoods()
      .then((data) => {
        console.log(data);
        setMeals(data.slice(0, MAX_LENGTH));
      });
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

  const toggleMealsFilter = async (category) => {
    if (currentFilterMeal === category) {
      setCurrentFilterMeal(null);
      handleFilterAllMeals();
    } else {
      setCurrentFilterMeal(category);
      handleMealCategoryFilter(category);
    }
  };

  const images = [beef, breakfast, chicken, dessert, goat];
  return (
    <div
      className="meals-container"
    >
      <Header title="Meals" src={ mealIcon } data-testid="header-component" />
      <div className="filter-meals">
        <div className="each-filter-category">
          <button
            className="btn-category"
            data-testid="All-category-filter"
            onClick={ () => handleFilterAllMeals() }
          >
            <img className="icons-category" src={ allFood } alt="all" />
            All
          </button>
        </div>
        {
          mealCategories.map((nameCategory, index) => (
            <div key={ index } className="each-filter-category">
              <button
                className="btn-category"
                key={ index }
                type="button"
                data-testid={ `${nameCategory.strCategory}-category-filter` }
                onClick={ () => toggleMealsFilter(nameCategory.strCategory) }
              >
                <img
                  className="icons-category"
                  src={ images[index] }
                  alt={ nameCategory.strCategory }
                />
                {nameCategory.strCategory}
              </button>
            </div>

            // <button
            //   key={ index }
            //   data-testid={ `${nameCategory.strCategory}-category-filter` }
            //   type="button"
            //   onClick={ () => toggleMealsFilter(nameCategory.strCategory) }
            // >
            //   {nameCategory.strCategory}
            // </button>

          ))
        }
        {/* <button
          data-testid="All-category-filter"
          type="button"
          onClick={ () => handleFilterAllMeals() }
        >
          All
        </button> */}
      </div>
      <div className="recipes-container">
        {meals?.slice(0, MAX_LENGTH).map((meal, index) => (
          <Recipes
            data-testid={ `${meal.id}-recipe-component` }
            key={ meal.idMeal }
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
