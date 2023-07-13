import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import copy from 'clipboard-copy';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom/cjs/react-router-dom.min';
import FavoriteRecipes from '../pages/FavoriteRecipes';

jest.mock('clipboard-copy', () => jest.fn().mockImplementation(() => Promise.resolve()));
describe('Testando a página <FavoriteRecipes />', () => {
  const name = 'Coddled pork with cider';
  const recipe1 = '0-horizontal-name';
  const recipe2 = '1-horizontal-name';
  const mockData = [
    {
      id: '53037',
      type: 'meal',
      nationality: 'Irish',
      category: 'Pork',
      alcoholicOrNot: 'non-alcoholic',
      name,
      image: 'https://www.themealdb.com/images/media/meals/7vpsfp1608588991.jpg',
    },
    {
      id: '52050',
      type: 'drink',
      nationality: 'Irish',
      category: 'Shoots',
      alcoholicOrNot: 'non-alcoholic',
      name,
      image: 'https://www.themealdb.com/images/media/meals/7vpsfp1608588991.jpg',
    },
  ];

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
  test('1 - Testa se a página renderiza corretamente com todos os dados', () => {
    mockLocalStorage();
    jest.spyOn(localStorage, 'getItem')
      .mockImplementationOnce(() => JSON.stringify(mockData));

    render(<FavoriteRecipes />, { wrapper: MemoryRouter });
    console.log(localStorage.getItem('favoriteRecipes'));

    const allButton = screen.getByTestId('filter-by-all-btn');
    const mealsButton = screen.getByTestId('filter-by-meal-btn');
    const drinksButton = screen.getByTestId('filter-by-drink-btn');
    expect(allButton).toBeInTheDocument();
    expect(mealsButton).toBeInTheDocument();
    expect(drinksButton).toBeInTheDocument();

    const recipe1Name = screen.getByTestId(recipe1);
    const recipe2Name = screen.getByTestId(recipe2);
    expect(recipe1Name.textContent).toBe(name);
    expect(recipe2Name.textContent).toBe(name);
  });

  test('2 - Testa se a página renderiza corretamente com os dados filtrados por comida', () => {
    mockLocalStorage();
    jest.spyOn(localStorage, 'getItem')
      .mockImplementationOnce(() => JSON.stringify(mockData));

    render(<FavoriteRecipes />, { wrapper: MemoryRouter });

    const mealsButton = screen.getByTestId('filter-by-meal-btn');
    fireEvent.click(mealsButton);

    const recipe1Name = screen.getByTestId(recipe1);
    expect(recipe1Name.textContent).toBe(name);
  });

  test('3 - Testa se a página renderiza corretamente com os dados filtrados por bebida', () => {
    mockLocalStorage();
    jest.spyOn(localStorage, 'getItem')
      .mockImplementationOnce(() => JSON.stringify(mockData));

    render(<FavoriteRecipes />, { wrapper: MemoryRouter });

    const drinksButton = screen.getByTestId('filter-by-drink-btn');
    fireEvent.click(drinksButton);

    const recipe1Name = screen.getByTestId(recipe1);
    expect(recipe1Name.textContent).toBe(name);
  });

  test('4 - Testa se a página renderiza corretamente com os dados filtrados por todos', () => {
    mockLocalStorage();
    jest.spyOn(localStorage, 'getItem')
      .mockImplementationOnce(() => JSON.stringify(mockData));

    render(<FavoriteRecipes />, { wrapper: MemoryRouter });

    const allButton = screen.getByTestId('filter-by-all-btn');
    fireEvent.click(allButton);

    const recipe1Name = screen.getByTestId(recipe1);
    const recipe2Name = screen.getByTestId(recipe2);
    expect(recipe1Name.textContent).toBe(name);
    expect(recipe2Name.textContent).toBe(name);
  });

  test('5 - Testa se quando clica em compartilhar, o link da página é copiado para o clipboard', async () => {
    mockLocalStorage();
    jest.spyOn(localStorage, 'getItem')
      .mockImplementationOnce(() => JSON.stringify(mockData));

    delete window.location;
    window.location = { origin: 'http://localhost:3000' };

    render(<FavoriteRecipes />, { wrapper: MemoryRouter });
    const recipe1ShareButton = screen.getByTestId('0-horizontal-share-btn');

    await act(async () => {
      fireEvent.click(recipe1ShareButton);
    });

    expect(copy).toHaveBeenCalledWith('http://localhost:3000/meals/53037');
  });

  test('6 - Testa se quando clica na imagem ou nome de uma receita de comida, redireciona para a pagina de detalhes da receita', () => {
    mockLocalStorage();
    jest.spyOn(localStorage, 'getItem')
      .mockImplementationOnce(() => JSON.stringify(mockData));

    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <FavoriteRecipes />
      </Router>,
    );

    const recipe1Image = screen.getByTestId('0-horizontal-image');
    const recipe1Name = screen.getByTestId('0-horizontal-name');

    fireEvent.click(recipe1Image);
    expect(history.location.pathname).toBe('/meals/53037');

    history.push('/favorite-recipes');

    fireEvent.click(recipe1Name);
    expect(history.location.pathname).toBe('/meals/53037');
  });

  test('7 - Testa se quando clica na imagem ou nome de uma receita de bebida, redireciona para a pagina de detalhes da receita', () => {
    mockLocalStorage();
    jest.spyOn(localStorage, 'getItem')
      .mockImplementationOnce(() => JSON.stringify(mockData));

    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <FavoriteRecipes />
      </Router>,
    );

    const recipe1Image = screen.getByTestId('1-horizontal-image');
    const recipe1Name = screen.getByTestId('1-horizontal-name');

    fireEvent.click(recipe1Image);
    expect(history.location.pathname).toBe('/drinks/52050');

    history.push('/favorite-recipes');

    fireEvent.click(recipe1Name);
    expect(history.location.pathname).toBe('/drinks/52050');
  });

  test('8 - Testa se quando clica no icone de favorito ele desfavorita a receita e remove do localStorage', () => {
    mockLocalStorage();
    jest.spyOn(localStorage, 'getItem')
      .mockImplementationOnce(() => JSON.stringify(mockData));

    render(<FavoriteRecipes />, { wrapper: MemoryRouter });

    const recipe1FavoriteButton = screen.getByTestId('0-horizontal-favorite-btn');
    fireEvent.click(recipe1FavoriteButton);

    const recipe1Name = screen.queryByTestId(recipe1);
    expect(recipe1Name).not.toBeInTheDocument();
  });
});
