import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import RecipeContext from '../context/RecipeContext';
import Meals from '../pages/Meals';
import { getAllFoods } from '../services/food-service';

jest.mock('../services/food-service');

describe('Página <Meals />', () => {
  const mockMeals = [
    {
      id: '1',
      strMealThumb: 'meal-thumb-1.jpg',
      strMeal: 'Frango Curry',
    },
    {
      id: '2',
      strMealThumb: 'meal-thumb-2.jpg',
      strMeal: 'Lasanha',
    },
  ];

  beforeEach(() => {
    getAllFoods.mockResolvedValue(mockMeals);
  });

  it('renderiza a página "Meals" com as refeições', async () => {
    render(
      <BrowserRouter>
        <RecipeContext.Provider value={ { meals: mockMeals, setMeals: jest.fn() } }>
          <Meals />
        </RecipeContext.Provider>
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(getAllFoods).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
      expect(screen.getByTestId('1-recipe-card')).toBeInTheDocument();
      expect(screen.getByTestId('0-card-img')).toHaveAttribute('src', mockMeals[0].strMealThumb);
      expect(screen.getByTestId('0-card-name')).toHaveTextContent(mockMeals[0].strMeal);
      expect(screen.getByTestId('1-card-img')).toHaveAttribute('src', mockMeals[1].strMealThumb);
      expect(screen.getByTestId('1-card-name')).toHaveTextContent(mockMeals[1].strMeal);
    });
  });
});
