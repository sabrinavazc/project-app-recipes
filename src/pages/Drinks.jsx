import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';
import Recipes from '../components/Recipes';
import { getAllDrinks, getDrinksByCategory } from '../services/drink-service';
import drinkIcon from '../images/drinkIcon.svg';
import allDrink from '../assets/allDrinks.svg';
import cocoa from '../assets/cocoa.svg';
import cocktail from '../assets/coktails.svg';
import ordinary from '../assets/ordinary.svg';
import shake from '../assets/shake.svg';
import others from '../assets/others.svg';

function Drinks() {
  const MAX_LENGTH = 12;
  const CATEGORIES = 5;
  const { drinks, setDrinks } = useContext(RecipeContext);
  const [categoriesDrinks, setCategoriesDrinks] = useState([]);
  const drinkCategories = categoriesDrinks.slice(0, CATEGORIES);

  useEffect(() => {
    getAllDrinks()
      .then((data) => setDrinks(data.slice(0, MAX_LENGTH)));
    const getCateg = async () => {
      setCategoriesDrinks(await getDrinksByCategory());
    };
    getCateg();
  }, [setDrinks]);

  const images = [ordinary, cocktail, shake, others, cocoa];
  return (
    <div className="meals-container">
      <Header src={ drinkIcon } title="Drinks" data-testid="header-component" />
      <div className="filter-meals">
        <div className="each-filter-category">
          <button
            className="btn-category"
            data-testid="All-category-filter"
          >
            <img className="icons-category" src={ allDrink } alt="all" />
            All
          </button>
        </div>
        {
          drinkCategories.map((nameCategory, index) => (
            <div key={ index } className="each-filter-category">
              <button
                className="btn-category"
                key={ index }
                data-testid={ `${nameCategory.strCategory}-category-filter` }
              >
                <img
                  className="icons-category"
                  src={ images[index] }
                  alt={ nameCategory.strCategory }
                />
                {nameCategory.strCategory}
              </button>
            </div>
          ))
        }
      </div>
      <div className="recipes-container">
        {drinks?.slice(0, MAX_LENGTH).map((drink, index) => (
          <Recipes key={ drink.id } isMeals={ false } recipe={ drink } index={ index } />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
