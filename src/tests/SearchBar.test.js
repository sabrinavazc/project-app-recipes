import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import {
  getFoodByIngredient,
  getFoodByFirstLetter,
  getFoodByName } from '../services/food-service';
import {
  getDrinkByIngredient,
  getDrinkByFirstLetter,
  getDrinkByName } from '../services/drink-service';
import RecipeContext from '../context/RecipeContext';

jest.mock('../services/food-service', () => ({
  getFoodByIngredient: jest.fn(),
  getFoodByName: jest.fn(),
  getFoodByFirstLetter: jest.fn(),
}));

jest.mock('../services/drink-service', () => ({
  getDrinkByIngredient: jest.fn(),
  getDrinkByName: jest.fn(),
  getDrinkByFirstLetter: jest.fn(),
}));

describe('Testando o componente "<SearchBar />"', () => {
  const searchId = 'search-input';
  const searchBtnId = 'exec-search-btn';
  const ingredientRadioId = 'ingredient-search-radio';
  const nameRadioId = 'name-search-radio';
  const firstLetterRadioId = 'first-letter-search-radio';

  afterEach(() => jest.clearAllMocks());

  test('1 - Teste se o componente renderiza corretamente', () => {
    const setMealsMock = jest.fn();
    const setDrinksMock = jest.fn();

    const recipeContextValue = {
      meals: [],
      setMeals: setMealsMock,
      drinks: [],
      setDrinks: setDrinksMock,
    };

    render(
      <RecipeContext.Provider value={ recipeContextValue }>
        <SearchBar />
      </RecipeContext.Provider>,
    );

    const searchInput = screen.getByTestId(searchId);
    const searchButton = screen.getByTestId(searchBtnId);
    const ingredientRadio = screen.getByTestId(ingredientRadioId);
    const nameRadio = screen.getByTestId(nameRadioId);
    const firstLetterRadio = screen.getByTestId(firstLetterRadioId);

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
  });

  test('2 - [Meals] Teste se realiza as buscas por ingredientes', () => {
    const mockData = [
      {
        idMeal: '52968',
      },
      {
        idMeal: '52977',
      },
    ];
    getFoodByIngredient.mockResolvedValue(mockData);

    const setMealsMock = jest.fn();
    const setDrinksMock = jest.fn();

    const recipeContextValue = {
      meals: [],
      setMeals: setMealsMock,
      drinks: [],
      setDrinks: setDrinksMock,
    };

    render(
      <RecipeContext.Provider value={ recipeContextValue }>
        <SearchBar />
      </RecipeContext.Provider>,
    );
    const searchInput = screen.getByTestId(searchId);
    const searchButton = screen.getByTestId(searchBtnId);
    const ingredientRadio = screen.getByTestId(ingredientRadioId);

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'chicken' } });
      fireEvent.click(ingredientRadio);
      fireEvent.click(searchButton);
    });

    expect(getFoodByIngredient).toHaveBeenCalled();
    expect(getFoodByIngredient).toHaveBeenCalledWith('chicken');
  });

  test('3 - [Meals] Teste se realiza as buscas por name', () => {
    const mockData = [
      {
        idMeal: '52968',
      },
      {
        idMeal: '52977',
      },
    ];
    getFoodByName.mockResolvedValue(mockData);
    const setMealsMock = jest.fn();
    const setDrinksMock = jest.fn();

    const recipeContextValue = {
      meals: [],
      setMeals: setMealsMock,
      drinks: [],
      setDrinks: setDrinksMock,
    };

    render(
      <RecipeContext.Provider value={ recipeContextValue }>
        <SearchBar />
      </RecipeContext.Provider>,
    );

    const searchInput = screen.getByTestId(searchId);
    const searchButton = screen.getByTestId(searchBtnId);
    const nameRadioButton = screen.getByTestId(nameRadioId);

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'rice' } });
      fireEvent.click(nameRadioButton);
      fireEvent.click(searchButton);
    });

    expect(getFoodByName).toHaveBeenCalled();
    expect(getFoodByName).toHaveBeenCalledWith('rice');
  });

  test('4 - [Meals] Teste se realiza as buscas pela primeira letra', () => {
    const mockData = [
      {
        idMeal: '52968',
      },
      {
        idMeal: '52977',
      },
    ];
    getFoodByFirstLetter.mockResolvedValue(mockData);

    const setMealsMock = jest.fn();
    const setDrinksMock = jest.fn();

    const recipeContextValue = {
      meals: [],
      setMeals: setMealsMock,
      drinks: [],
      setDrinks: setDrinksMock,
    };

    render(
      <RecipeContext.Provider value={ recipeContextValue }>
        <SearchBar />
      </RecipeContext.Provider>,
    );
    const searchInput = screen.getByTestId(searchId);
    const searchButton = screen.getByTestId(searchBtnId);
    const firstLetterRadio = screen.getByTestId(firstLetterRadioId);

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'A' } });
      fireEvent.click(firstLetterRadio);
      fireEvent.click(searchButton);
    });

    expect(getFoodByFirstLetter).toHaveBeenCalled();
    expect(getFoodByFirstLetter).toHaveBeenCalledWith('A');
  });

  test('5 - [Meals] Teste se não realiza as buscas pela primeira letra quando digitado mais de uma letra e lança um alert', () => {
    const mockData = [
      {
        idMeal: '52968',
      },
      {
        idMeal: '52977',
      },
    ];
    getFoodByFirstLetter.mockResolvedValue(mockData);

    const setMealsMock = jest.fn();
    const setDrinksMock = jest.fn();

    const recipeContextValue = {
      meals: [],
      setMeals: setMealsMock,
      drinks: [],
      setDrinks: setDrinksMock,
    };

    render(
      <RecipeContext.Provider value={ recipeContextValue }>
        <SearchBar />
      </RecipeContext.Provider>,
    );
    const searchInput = screen.getByTestId(searchId);
    const searchButton = screen.getByTestId(searchBtnId);
    const firstLetterRadio = screen.getByTestId(firstLetterRadioId);

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'AAAA' } });
      fireEvent.click(firstLetterRadio);
      fireEvent.click(searchButton);
    });

    expect(getFoodByFirstLetter).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
  });

  test('6 - [Drinks] Teste se realiza as buscas por ingredientes', () => {
    const mockData = [
      {
        idDrink: '12518',
      },
      {
        idDrink: '12538',
      },
    ];
    getDrinkByIngredient.mockResolvedValue(mockData);
    const setMealsMock = jest.fn();
    const setDrinksMock = jest.fn();

    const recipeContextValue = {
      meals: [],
      setMeals: setMealsMock,
      drinks: [],
      setDrinks: setDrinksMock,
    };

    render(
      <RecipeContext.Provider value={ recipeContextValue }>
        <SearchBar isMeals={ false } />
      </RecipeContext.Provider>,
    );

    const searchInput = screen.getByTestId(searchId);
    const searchButton = screen.getByTestId(searchBtnId);
    const ingredientRadio = screen.getByTestId(ingredientRadioId);

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'water' } });
      fireEvent.click(ingredientRadio);
      fireEvent.click(searchButton);
    });

    expect(getDrinkByIngredient).toHaveBeenCalled();
    expect(getDrinkByIngredient).toHaveBeenCalledWith('water');
  });

  test('7 - [Drinks] Teste se realiza as buscas por name', () => {
    const mockData = [
      {
        idDrink: '12518',
      },
      {
        idDrink: '12538',
      },
    ];
    getDrinkByName.mockResolvedValue(mockData);

    const setMealsMock = jest.fn();
    const setDrinksMock = jest.fn();

    const recipeContextValue = {
      meals: [],
      setMeals: setMealsMock,
      drinks: [],
      setDrinks: setDrinksMock,
    };

    render(
      <RecipeContext.Provider value={ recipeContextValue }>
        <SearchBar isMeals={ false } />
      </RecipeContext.Provider>,
    );
    const searchInput = screen.getByTestId(searchId);
    const searchButton = screen.getByTestId(searchBtnId);
    const nameRadio = screen.getByTestId(nameRadioId);

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'water' } });
      fireEvent.click(nameRadio);
      fireEvent.click(searchButton);
    });

    expect(getDrinkByName).toHaveBeenCalled();
    expect(getDrinkByName).toHaveBeenCalledWith('water');
  });

  test('8 - [Drinks] Teste se realiza as buscas pela primeira letra', () => {
    const mockData = [
      {
        idDrink: '12518',
      },
      {
        idDrink: '12538',
      },
    ];
    getDrinkByFirstLetter.mockResolvedValue(mockData);

    const setMealsMock = jest.fn();
    const setDrinksMock = jest.fn();

    const recipeContextValue = {
      meals: [],
      setMeals: setMealsMock,
      drinks: [],
      setDrinks: setDrinksMock,
    };

    render(
      <RecipeContext.Provider value={ recipeContextValue }>
        <SearchBar isMeals={ false } />
      </RecipeContext.Provider>,
    );
    const searchInput = screen.getByTestId(searchId);
    const searchButton = screen.getByTestId(searchBtnId);
    const firstLetterRadio = screen.getByTestId(firstLetterRadioId);

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'A' } });
      fireEvent.click(firstLetterRadio);
      fireEvent.click(searchButton);
    });

    expect(getDrinkByFirstLetter).toHaveBeenCalled();
    expect(getDrinkByFirstLetter).toHaveBeenCalledWith('A');
  });

  test('9 - [Drinks] Teste se não realiza as buscas pela primeira letra quando digitado mais de uma letra e lança um alert', () => {
    const mockData = [
      {
        idDrink: '12518',
      },
      {
        idDrink: '12538',
      },
    ];
    getDrinkByFirstLetter.mockResolvedValue(mockData);

    const setMealsMock = jest.fn();
    const setDrinksMock = jest.fn();

    const recipeContextValue = {
      meals: [],
      setMeals: setMealsMock,
      drinks: [],
      setDrinks: setDrinksMock,
    };

    render(
      <RecipeContext.Provider value={ recipeContextValue }>
        <SearchBar isMeals={ false } />
      </RecipeContext.Provider>,
    );

    const searchInput = screen.getByTestId(searchId);
    const searchButton = screen.getByTestId(searchBtnId);
    const firstLetterRadio = screen.getByTestId(firstLetterRadioId);

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'AAAA' } });
      fireEvent.click(firstLetterRadio);
      fireEvent.click(searchButton);
    });

    expect(getDrinkByFirstLetter).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
  });

  test('10 - [Drinks] Testa se quando a busca retorna apenas uma receita, redireciona para a tela de detalhes', async () => {
    const mockData = [
      {
        idDrink: '178332',
      },
    ];
    getDrinkByName.mockResolvedValue(mockData);

    const setMealsMock = jest.fn();
    const setDrinksMock = jest.fn();

    const recipeContextValue = {
      meals: [],
      setMeals: setMealsMock,
      drinks: [],
      setDrinks: setDrinksMock,
    };

    render(
      <RecipeContext.Provider value={ recipeContextValue }>
        <BrowserRouter>
          <SearchBar isMeals={ false } />
        </BrowserRouter>
      </RecipeContext.Provider>,
    );

    const searchInput = screen.getByTestId(searchId);
    const searchButton = screen.getByTestId(searchBtnId);
    const nameRadioButton = screen.getByTestId(nameRadioId);

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'water' } });
      fireEvent.click(nameRadioButton);
      fireEvent.click(searchButton);
    });

    await waitFor(() => {
      expect(window.location.pathname).toBe('/drinks/178332');
    });
  });

  test('11 - [Meals] Testa se quando a busca retorna apenas uma receita, redireciona para a tela de detalhes', async () => {
    const mockData = [
      {
        idMeal: '529608',
      },
    ];
    getFoodByName.mockResolvedValue(mockData);

    const setMealsMock = jest.fn();
    const setDrinksMock = jest.fn();

    const recipeContextValue = {
      meals: [],
      setMeals: setMealsMock,
      drinks: [],
      setDrinks: setDrinksMock,
    };

    render(
      <RecipeContext.Provider value={ recipeContextValue }>
        <BrowserRouter>
          <SearchBar />
        </BrowserRouter>
      </RecipeContext.Provider>,
    );

    const searchInput = screen.getByTestId(searchId);
    const searchButton = screen.getByTestId(searchBtnId);
    const nameRadioButton = screen.getByTestId(nameRadioId);

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'rice' } });
      fireEvent.click(nameRadioButton);
      fireEvent.click(searchButton);
    });

    await waitFor(() => {
      expect(window.location.pathname).toBe('/meals/529608');
    });
  });

  test('12 - [Drinks] Teste se quando nao retorna nenhuma receita, lança um alert', async () => {
    const mockData = null;
    getDrinkByName.mockResolvedValue(mockData);

    const setMealsMock = jest.fn();
    const setDrinksMock = jest.fn();

    const recipeContextValue = {
      meals: [],
      setMeals: setMealsMock,
      drinks: [],
      setDrinks: setDrinksMock,
    };

    render(
      <RecipeContext.Provider value={ recipeContextValue }>
        <SearchBar isMeals={ false } />
      </RecipeContext.Provider>,
    );

    const searchInput = screen.getByTestId(searchId);
    const searchButton = screen.getByTestId(searchBtnId);
    const nameRadioButton = screen.getByTestId(nameRadioId);

    jest.spyOn(global, 'alert').mockImplementation(() => {});

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'xablau' } });
      fireEvent.click(nameRadioButton);
      fireEvent.click(searchButton);
    });

    expect(getDrinkByName).toHaveBeenCalled();
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });

  test('13 - [Meals] Teste se quando nao retorna nenhuma receita, lança um alert', async () => {
    const mockData = null;
    getFoodByName.mockResolvedValue(mockData);

    const setMealsMock = jest.fn();
    const setDrinksMock = jest.fn();

    const recipeContextValue = {
      meals: [],
      setMeals: setMealsMock,
      drinks: [],
      setDrinks: setDrinksMock,
    };

    render(
      <RecipeContext.Provider value={ recipeContextValue }>
        <SearchBar />
      </RecipeContext.Provider>,
    );

    const searchInput = screen.getByTestId(searchId);
    const searchButton = screen.getByTestId(searchBtnId);
    const nameRadioButton = screen.getByTestId(nameRadioId);

    jest.spyOn(global, 'alert').mockImplementation(() => {});

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'xablau' } });
      fireEvent.click(nameRadioButton);
      fireEvent.click(searchButton);
    });

    expect(getFoodByName).toHaveBeenCalled();
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });
});
