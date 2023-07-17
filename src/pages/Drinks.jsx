import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';
import Recipes from '../components/Recipes';
import { getAllDrinks,
  getDrinksByCategory, filterDrinksByCategory } from '../services/drink-service';

function Drinks() {
  const MAX_LENGTH = 12;
  const CATEGORIES = 5;
  const { drinks, setDrinks } = useContext(RecipeContext);
  const [categoriesDrinks, setCategoriesDrinks] = useState([]);
  const drinkCategories = categoriesDrinks.slice(0, CATEGORIES);
  const [currentFilterDrink, setCurrentFilterDrink] = useState(null);

  useEffect(() => {
    getAllDrinks()
      .then((data) => setDrinks(data.slice(0, MAX_LENGTH)));
    const getCateg = async () => {
      setCategoriesDrinks(await getDrinksByCategory());
    };
    getCateg();
  }, [setDrinks]);

  const handleDrinkCategoryFilter = async (category) => {
    const drinksData = await filterDrinksByCategory(category);
    const filterDrinks = drinksData.slice(0, MAX_LENGTH);
    setDrinks(filterDrinks);
  };

  const handleFilterAllDrinks = async () => {
    const drinksData = await getAllDrinks();
    const allDrinks = drinksData.slice(0, MAX_LENGTH);
    setDrinks(allDrinks);
  };

  const toggleDrinksFilter = async (category) => {
    if (currentFilterDrink === category) {
      setCurrentFilterDrink(null);
      handleFilterAllDrinks();
    } else {
      setCurrentFilterDrink(category);
      handleDrinkCategoryFilter(category);
    }
  };

  return (
    <div
      style={ { display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%' } }
    >
      <Header title="Drinks" />
      <h1>Drinks</h1>
      <div style={ { display: 'flex', width: '80%' } }>
        {
          drinkCategories.map((nameCategory, index) => (
            <button
              key={ index }
              data-testid={ `${nameCategory.strCategory}-category-filter` }
              type="button"
              onClick={ () => toggleDrinksFilter(nameCategory.strCategory) }
            >
              {nameCategory.strCategory}
            </button>
          ))
        }
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ () => handleFilterAllDrinks() }
        >
          All
        </button>
      </div>
      <div style={ { display: 'flex', width: '90%', flexWrap: 'wrap' } }>

        {drinks?.slice(0, MAX_LENGTH).map((drink, index) => (
          <Recipes key={ drink.id } isMeals={ false } recipe={ drink } index={ index } />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
