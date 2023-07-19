import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeInProgress from '../pages/RecipeInProgress';

jest.mock('clipboard-copy', () => jest.fn().mockImplementation(() => Promise.resolve()));

const recipeInProgressMock = {
  strMealThumb: 'https://www.themealdb.com/images/media/meals/xxptyq1511452222.jpg',
  strMeal: 'Cocktail',
  strCategory: 'Alcoholic',
  strInstructions: 'Instructions for the cocktail...',
  strIngredient1: 'Ingredient 1',
  strIngredient2: 'Ingredient 2',
  strIngredient3: 'Ingredient 3',
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
  it('deve exibir os ingredientes da receita', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ meals: [recipeInProgressMock] }),
    });

    render(<RecipeInProgress />, { wrapper: MemoryRouter });

    await waitFor(() => {
      const ingredientLabels = screen.getAllByTestId(/-ingredient-step$/);

      expect(ingredientLabels).toHaveLength(3);
      expect(ingredientLabels[0]).toHaveTextContent('Ingredient 1');
      expect(ingredientLabels[1]).toHaveTextContent('Ingredient 2');
      expect(ingredientLabels[2]).toHaveTextContent('Ingredient 3');
    });
  });
  it('deve desabilitar o botão "Finish Recipe" quando nem todos os ingredientes estiverem marcados', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ meals: [recipeInProgressMock] }),
    });

    render(<RecipeInProgress />, { wrapper: MemoryRouter });

    await waitFor(() => {
      const finishRecipeBtn = screen.getByTestId('finish-recipe-btn');
      expect(finishRecipeBtn).toBeDisabled();

      const ingredientStep1 = screen.getByTestId('0-ingredient-step');
      userEvent.click(ingredientStep1);

      expect(finishRecipeBtn).toBeDisabled();

      const ingredientStep2 = screen.getByTestId('1-ingredient-step');
      userEvent.click(ingredientStep2);

      expect(finishRecipeBtn).toBeDisabled();

      const ingredientStep3 = screen.getByTestId('2-ingredient-step');
      userEvent.click(ingredientStep3);

      expect(finishRecipeBtn).toBeEnabled();
    });
  });

  it('deve adicionar e remover a receita dos favoritos corretamente quando o botão de favoritar é clicado', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ meals: [recipeInProgressMock] }),
    });

    render(
      <MemoryRouter initialEntries={ ['/meals/52771/in-progress'] }>
        <RecipeInProgress />
      </MemoryRouter>,
    );

    await waitForElementToBeRemoved(() => screen.getByText(/wait... we are looking for your recipe./i));

    const favoriteButton = screen.getByTestId('favorite-btn');
    expect(favoriteButton).toHaveAttribute('src', 'whiteHeartIcon.svg');

    userEvent.click(favoriteButton);

    expect(favoriteButton).toHaveAttribute('src', 'blackHeartIcon.svg');

    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    expect(favorites).toHaveLength(1);
    expect(favorites[0].id).toBe(recipeInProgressMock.idDrink
      || recipeInProgressMock.idMeal);
    expect(favorites[0].type).toBe('meal');

    userEvent.click(favoriteButton);

    expect(favoriteButton).toHaveAttribute('src', 'blackHeartIcon.svg');

    const updatedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    expect(updatedFavorites).toHaveLength(2);
  });

  it('deve copiar o URL de compartilhamento para a área de transferência', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ meals: [recipeInProgressMock] }),
    });

    render(
      <MemoryRouter initialEntries={ ['/meals/52771/in-progress'] }>
        <RecipeInProgress />
      </MemoryRouter>,
    );

    await waitForElementToBeRemoved(() => screen.getByText('wait... we are looking for your recipe.'));

    const shareButton = screen.getByTestId('share-btn');
    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(screen.getByText('Link copied!')).toBeInTheDocument();
    });
  });
  it('deve exibir a mensagem de espera quando não há receita carregada', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
    });

    render(
      <MemoryRouter initialEntries={ ['/meals/123/in-progress'] }>
        <RecipeInProgress />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('wait... we are looking for your recipe.')).toBeInTheDocument();
    });
  });
  it('deve exibir o componente corretamente ao buscar a receita', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ meals: [recipeInProgressMock] }),
    });

    render(
      <MemoryRouter initialEntries={ ['/meals/123/in-progress'] }>
        <RecipeInProgress />
      </MemoryRouter>,
    );

    await waitForElementToBeRemoved(() => screen.getByText(/wait... we are looking for your recipe./i));

    expect(screen.getByText(recipeInProgressMock.strMeal)).toBeInTheDocument();
    expect(screen.getByTestId('recipe-title').textContent).toBe(recipeInProgressMock.strMeal);
    expect(screen.getByTestId('recipe-category').textContent).toBe(recipeInProgressMock.strCategory);
    expect(screen.getByTestId('instructions').textContent).toBe(recipeInProgressMock.strInstructions);
  });
  it('deve habilitar e desabilitar o botão "Finish Recipe" corretamente ao marcar e desmarcar ingredientes', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ meals: [recipeInProgressMock] }),
    });

    render(<RecipeInProgress />, { wrapper: MemoryRouter });

    await waitFor(() => {
      const finishRecipeBtn = screen.getByTestId('finish-recipe-btn');
      expect(finishRecipeBtn).toBeDisabled();

      const ingredientStep1 = screen.getByTestId('0-ingredient-step');
      userEvent.click(ingredientStep1);

      const ingredientStep2 = screen.getByTestId('1-ingredient-step');
      userEvent.click(ingredientStep2);

      const ingredientStep3 = screen.getByTestId('2-ingredient-step');
      userEvent.click(ingredientStep3);

      expect(finishRecipeBtn).toBeEnabled();

      userEvent.click(ingredientStep1);
      userEvent.click(ingredientStep2);
      userEvent.click(ingredientStep3);

      expect(finishRecipeBtn).toBeDisabled();
    });
  });
});
