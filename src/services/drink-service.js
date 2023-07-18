export function getDrinkByName(name) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) => response.json())
    .then((data) => data.drinks);
}

export function getDrinkByFirstLetter(firstLetter) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`)
    .then((response) => response.json())
    .then((data) => data.drinks);
}

export function getDrinkByIngredient(ingredient) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then((response) => response.json())
    .then((data) => data.drinks);
}

export function getAllDrinks() {
  return fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((data) => data.drinks);
}

export function getDrinksByCategory() {
  return fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
    .then((data) => data.drinks);
}

export function filterDrinksByCategory(category) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((data) => data.drinks);
}
