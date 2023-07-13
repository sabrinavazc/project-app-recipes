import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import RecipeContext from '../context/RecipeContext';
import Drinks from '../pages/Drinks';
import { getAllDrinks } from '../services/drink-service';

jest.mock('../services/drink-service');

describe.only('Página <Drinks />', () => {
  const mockDrinks = [
    {
      id: '1',
      strDrinkThumb: 'drink-thumb-1.jpg',
      strDrink: 'Mojito',
    },
    {
      id: '2',
      strDrinkThumb: 'drink-thumb-2.jpg',
      strDrink: 'Caipirinha',
    },
  ];

  beforeEach(() => {
    getAllDrinks.mockResolvedValue(mockDrinks);
  });

  it('renderiza a página "Drink" com as Bebidas', async () => {
    render(
      <BrowserRouter>
        <RecipeContext.Provider value={ { drinks: mockDrinks, setDrinks: jest.fn() } }>
          <Drinks />
        </RecipeContext.Provider>
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(getAllDrinks).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
      expect(screen.getByTestId('1-recipe-card')).toBeInTheDocument();
      expect(screen.getByTestId('0-card-img')).toHaveAttribute('src', mockDrinks[0].strDrinkThumb);
      expect(screen.getByTestId('0-card-name')).toHaveTextContent(mockDrinks[0].strDrink);
    });
  });
});
