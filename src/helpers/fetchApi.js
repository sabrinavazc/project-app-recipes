export const fetchRecipeById = async (id, type) => {
  const urlMeals = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  const useUrl = type === 'meals' ? urlMeals : urlDrinks;
  const response = await fetch(`${useUrl}${id}`);
  const data = await response.json();
  return data[type][0];
};
