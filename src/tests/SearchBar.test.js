import { act, fireEvent, render, screen } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import {
  getFoodByIngredient,
  getFoodByFirstLetter,
  getFoodByName } from '../services/food-service';
import {
  getDrinkByIngredient,
  getDrinkByFirstLetter,
  getDrinkByName } from '../services/drink-service';

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
    render(<SearchBar />);

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

    render(<SearchBar />);
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

    render(<SearchBar />);
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

    render(<SearchBar />);
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

    render(<SearchBar />);
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

    render(<SearchBar isMeals={ false } />);
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

    render(<SearchBar isMeals={ false } />);
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

    render(<SearchBar isMeals={ false } />);
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

    render(<SearchBar isMeals={ false } />);
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
});
