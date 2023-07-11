import React, { useContext } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';

function Drinks() {
  const MAX_LENGTH = 12;
  const { drinks } = useContext(RecipeContext);

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
