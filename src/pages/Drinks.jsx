import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';
import Recipes from '../components/Recipes';
import { getAllDrinks, getDrinksByCategory } from '../services/drink-service';

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

  return (
    <div
      style={ { display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%' } }
    >
      <Header title="Drinks" />
      <h1>Drinks</h1>
      {
        drinkCategories.map((nameCategory, index) => (
          <button
            key={ index }
            data-testid={ `${nameCategory.strCategory}-category-filter` }
          >
            {nameCategory.strCategory}
          </button>
        ))
      }
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
