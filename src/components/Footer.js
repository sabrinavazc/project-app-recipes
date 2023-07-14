import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer
      className="footer-container"
      data-testid="footer"
    >
      <Link to="/drinks">
        <img
          className="drink-icon"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Bebidas"
        />
      </Link>
      <Link to="/meals">
        <img
          className="meal-icon"
          src={ mealIcon }
          alt="Comidas"
          data-testid="meals-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
