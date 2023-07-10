import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

function Footer() {
  return (
    <footer
      data-testid="footer"
      style={ {
        position: 'fixed',
        bottom: 0,
        width: '100%',
      } }
    >
      <Link to="/meals">
        <img
          src={ mealIcon }
          alt="Comidas"
          data-testid="meals-bottom-btn"
        />
      </Link>
      <Link to="/drinks">
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Bebidas"
        />
      </Link>
    </footer>
  );
}

export default Footer;
