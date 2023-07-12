import {
  getFoodByName,
  getFoodByFirstLetter,
  getFoodByIngredient } from '../../services/food-service';

describe('Testando o Service: "foodo-service"', () => {
  test('1 - Testa se busca as comidas  na API pelo nome', async () => {
    const nomeComida = 'pizza';
    const urlEsperada = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nomeComida}`;
    const comidasMock = [{ id: 1, nome: 'Pizza Margherita' }, { id: 2, nome: 'Pizza Calabresa' }];

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: comidasMock }),
    });

    const resultado = await getFoodByName(nomeComida);

    expect(global.fetch).toHaveBeenCalledWith(urlEsperada);
    expect(resultado).toEqual(comidasMock);
  });

  test('2 - Testa se busca comidas na API pela 1ª letra ', async () => {
    const primeiraLetra = 'p';
    const urlEsperada = `https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`;
    const comidasMock = [{ id: 1, nome: 'Pão de Queijo' }, { id: 2, nome: 'Picanha' }];

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: comidasMock }),
    });

    const resultado = await getFoodByFirstLetter(primeiraLetra);

    expect(global.fetch).toHaveBeenCalledWith(urlEsperada);
    expect(resultado).toEqual(comidasMock);
  });

  test('3 - Testa se busca comidas na API pelo ingrediente', async () => {
    const ingrediente = 'queijo';
    const urlEsperada = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
    const comidasMock = [{ id: 1, nome: 'Lasanha de Queijo' }, { id: 2, nome: 'Sanduíche de Queijo' }];

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: comidasMock }),
    });

    const resultado = await getFoodByIngredient(ingrediente);

    expect(global.fetch).toHaveBeenCalledWith(urlEsperada);
    expect(resultado).toEqual(comidasMock);
  });
});
