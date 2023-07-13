import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Recipes from '../components/Recipes';

describe('Componente <Recipes />', () => {
  const recipe = {
    id: '1',
    strMealThumb: 'meal-thumb.jpg',
    strMeal: 'Frango Curry',
    strDrinkThumb: 'drink-thumb.jpg',
    strDrink: 'Mojito',
  };

  it('1- renderiza o card de receita com os dados corretos', () => {
    const isMeals = true;
    const index = 0;

    const { getByTestId } = render(
      <Router>
        <Recipes isMeals={ isMeals } recipe={ recipe } index={ index } />
      </Router>,
    );

    const recipeCard = getByTestId(`${index}-recipe-card`);
    const cardImg = getByTestId(`${index}-card-img`);
    const cardName = getByTestId(`${index}-card-name`);

    expect(recipeCard).toBeInTheDocument();
    expect(cardImg).toHaveAttribute('src', recipe.strMealThumb);
    expect(cardImg).toHaveAttribute('alt', recipe.strMeal);
    expect(cardName).toHaveTextContent(recipe.strMeal);
  });

  it('2- renderiza o link correto com base na prop isMeals true', () => {
    const isMeals = true;
    const index = 1;

    const { getByTestId } = render(
      <Router>
        <Recipes isMeals={ isMeals } recipe={ recipe } index={ index } />
      </Router>,
    );

    const cardLink = getByTestId(`${index}-recipe-card`).querySelector('a');

    expect(cardLink).toHaveAttribute('href', `/meals/${recipe.id}`);
  });

  it('2- renderiza o link correto com base na prop isMeals false', () => {
    const isMeals = false;
    const index = 1;

    const { getByTestId } = render(
      <Router>
        <Recipes isMeals={ isMeals } recipe={ recipe } index={ index } />
      </Router>,
    );

    const cardLink = getByTestId(`${index}-recipe-card`).querySelector('a');

    expect(cardLink).toHaveAttribute('href', `/drinks/${recipe.id}`);
  });
});
