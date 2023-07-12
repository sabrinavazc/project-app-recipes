import {
  getDrinkByName,
  getDrinkByFirstLetter,
  getDrinkByIngredient } from '../../services/drink-service';

describe('Testando o Service: "drink-service"', () => {
  test('1 - Testa se realiza o fetch na API de Drinks passando o nome', async () => {
    const drinkName = 'margarita';
    const expectedUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`;
    const mockDrinks = [{ id: 1, name: 'Margarita' }, { id: 2, name: 'Frozen Margarita' }];

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ drinks: mockDrinks }),
    });

    const result = await getDrinkByName(drinkName);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(mockDrinks);
  });

  test('2 - Testa se realiza o fetch na API de Drinks passando a 1ª letra', async () => {
    const firstLetter = 'm';
    const expectedUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
    const mockDrinks = [{ id: 1, name: 'Mojito' }, { id: 2, name: 'Mai Tai' }];

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ drinks: mockDrinks }),
    });

    const result = await getDrinkByFirstLetter(firstLetter);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(mockDrinks);
  });

  test('3 - Testa se realiza o fetch na API de Drinks passando o ingrediente', async () => {
    const ingredient = 'vodka';
    const expectedUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const mockDrinks = [{ id: 1, name: 'Vodka Soda' }, { id: 2, name: 'Vodka Martini' }];

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ drinks: mockDrinks }),
    });

    const result = await getDrinkByIngredient(ingredient);

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(mockDrinks);
  });
});
