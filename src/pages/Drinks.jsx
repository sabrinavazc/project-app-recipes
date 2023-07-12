import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';

function Drinks() {
  const MAX_LENGTH = 12;
  const { drinks, setDrinks } = useContext(RecipeContext);

  useEffect(() => {
    const fetchDrinks = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setDrinks(data.drinks.slice(0, MAX_LENGTH));
    };
    fetchDrinks();
  }, [setDrinks]);

  return (
    <div>
      <Header title="Drinks" />
      <h1>Drinks</h1>
      {drinks?.slice(0, MAX_LENGTH).map((drink, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
          style={ { display: 'flex' } }
        >
          <Link to="/drinks/:id">
            <img
              data-testid={ `${index}-card-img` }
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              style={ { width: '50px' } }
            />
          </Link>
          <h1 data-testid={ `${index}-card-name` }>{drink.strDrink}</h1>
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default Drinks;
