import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';
import Recipes from '../components/Recipes';
import { getAllDrinks } from '../services/drink-service';

function Drinks() {
  const MAX_LENGTH = 12;
  const { drinks, setDrinks } = useContext(RecipeContext);

  useEffect(() => {
    getAllDrinks()
      .then((data) => setDrinks(data.slice(0, MAX_LENGTH)));
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
