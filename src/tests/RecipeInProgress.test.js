import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import RecipeInProgress from '../pages/RecipeInProgress';

jest.mock('clipboard-copy', () => jest.fn().mockImplementation(() => Promise.resolve()));

const recipeInProgressMock = {
  strMealThumb: 'https://www.themealdb.com/images/media/meals/xxptyq1511452222.jpg',
  strMeal: 'Cocktail',
  strCategory: 'Alcoholic',
  strInstructions: 'Instructions for the cocktail...',
};

describe('Receita em Progresso', () => {
  it('deve exibir a foto da receita', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ meals: [recipeInProgressMock] }),
    });

    render(<RecipeInProgress />, { wrapper: MemoryRouter });

    await waitFor(() => {
      const recipePhoto = screen.getByAltText(recipeInProgressMock.strMeal);
      expect(recipePhoto).toBeInTheDocument();
      expect(recipePhoto).toHaveAttribute('src', recipeInProgressMock.strMealThumb);
    });
  });

  it('deve exibir o título da receita', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ meals: [recipeInProgressMock] }),
    });

    render(<RecipeInProgress />, { wrapper: MemoryRouter });

    await waitFor(() => {
      const recipeTitle = screen.getByTestId('recipe-title');
      expect(recipeTitle).toBeInTheDocument();
      expect(recipeTitle.textContent).toBe(recipeInProgressMock.strMeal);
    });
  });

  it('deve exibir a categoria da receita', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ meals: [recipeInProgressMock] }),
    });

    render(<RecipeInProgress />, { wrapper: MemoryRouter });

    await waitFor(() => {
      const recipeCategory = screen.getByTestId('recipe-category');
      expect(recipeCategory).toBeInTheDocument();
      expect(recipeCategory.textContent).toBe(recipeInProgressMock.strCategory);
    });
  });

  it('deve exibir as instruções da receita', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ meals: [recipeInProgressMock] }),
    });

    render(<RecipeInProgress />, { wrapper: MemoryRouter });

    await waitFor(() => {
      const recipeInstructions = screen.getByTestId('instructions');
      expect(recipeInstructions).toBeInTheDocument();
      expect(recipeInstructions.textContent).toBe(recipeInProgressMock.strInstructions);
    });
  });
});

describe('Testando caminhos do usuário em <RecipeInProgress />', () => {
  const mockRecipeId = '123'; // ID de receita fictício
  const mockRecipe = {
    idMeal: mockRecipeId,
    strMealThumb: 'https://www.themealdb.com/images/media/meals/xxptyq1511452222.jpg',
    strMeal: 'Cocktail',
    strCategory: 'Alcoholic',
    strInstructions: 'Instructions for the cocktail...',
    strIngredient1: 'Ingredient 1',
    strIngredient2: 'Ingredient 2',
    strIngredient3: 'Ingredient 3',
  };

  const localStorageMock = (() => {
    let store = {};

    return {
      getItem: jest.fn((key) => store[key] || null),
      setItem: jest.fn((key, value) => {
        store[key] = value.toString();
      }),
      removeItem: jest.fn((key) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        store = {};
      }),
    };
  })();

  const mockLocalStorage = () => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  };

  beforeEach(() => {
    mockLocalStorage();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ meals: [mockRecipe] }),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('deve marcar os ingredientes como concluídos', async () => {
    render(
      <RecipeInProgress />,
      { wrapper: MemoryRouter, route: `/recipes/${mockRecipeId}` },
    );

    await waitFor(() => {
      const ingredientSteps = screen.queryAllByTestId(/^(\d+)-ingredient-step$/i);
      expect(ingredientSteps.length).toBeGreaterThan(0);

      ingredientSteps.forEach((ingredientStep) => {
        const checkbox = ingredientStep.querySelector('input[type="checkbox"]');
        expect(checkbox).toBeInTheDocument();

        expect(checkbox.checked).toBe(false);

        fireEvent.click(checkbox);

        expect(checkbox.checked).toBe(true);
      });

      const checkedIngredientSteps = screen.queryAllByTestId(/^(\d+)-ingredient-step$/i)
        .filter((ingredientStep) => {
          const checkbox = ingredientStep.querySelector('input[type="checkbox"]');
          return checkbox.checked;
        });
      expect(checkedIngredientSteps.length).toBe(ingredientSteps.length);
    });
  });
});
