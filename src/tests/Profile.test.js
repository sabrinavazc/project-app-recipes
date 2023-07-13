import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router, BrowserRouter } from 'react-router-dom';
import Profile from '../pages/Profile';

describe.only('Testando a pagina <Profile />', () => {
  const user = {
    email: 'test@example.com',
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

  test('1 - Testa se renderiza o email do usuário na tela', () => {
    mockLocalStorage();
    jest.spyOn(localStorage, 'getItem')
      .mockImplementationOnce(() => JSON.stringify(user));

    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>,
    );

    const emailElement = screen.getByTestId('profile-email');
    expect(emailElement).toHaveTextContent('test@example.com');
  });

  test('2- Testa se redireciona para a página Receitas Feitas quando clica no botao "Done Recipes"', () => {
    mockLocalStorage();
    jest.spyOn(localStorage, 'getItem')
      .mockImplementationOnce(() => JSON.stringify(user));

    const history = createMemoryHistory();
    const pushSpy = jest.spyOn(history, 'push');
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    const doneRecipesButton = screen.getByTestId('profile-done-btn');
    fireEvent.click(doneRecipesButton);

    expect(pushSpy).toHaveBeenCalledWith('/done-recipes');
  });

  test('3 - Testa se redireciona para a página de Receitas Favoritas quando clica no botão "Favorite Recipes"', () => {
    mockLocalStorage();
    jest.spyOn(localStorage, 'getItem')
      .mockImplementationOnce(() => JSON.stringify(user));

    const history = createMemoryHistory();
    const pushSpy = jest.spyOn(history, 'push');
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    const favoriteRecipesButton = screen.getByTestId('profile-favorite-btn');
    fireEvent.click(favoriteRecipesButton);

    expect(pushSpy).toHaveBeenCalledWith('/favorite-recipes');
  });

  test('4 -  Testa se quando clica em "Logout" o usuário é removido do localStorage e o usuário redirecionado para a tela de login', () => {
    mockLocalStorage();
    jest.spyOn(localStorage, 'getItem')
      .mockImplementationOnce(() => JSON.stringify(user));

    const history = createMemoryHistory();
    const pushSpy = jest.spyOn(history, 'push');
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    const logoutButton = screen.getByTestId('profile-logout-btn');
    fireEvent.click(logoutButton);

    expect(localStorage.clear).toHaveBeenCalled();
    expect(pushSpy).toHaveBeenCalledWith('/');
  });
});
