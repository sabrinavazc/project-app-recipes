export function getFoodByName(name) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) => response.json())
    .then((data) => data.meals);
}

export function getFoodByFirstLetter(firstLetter) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`)
    .then((response) => response.json())
    .then((data) => data.meals);
}

export function getFoodByIngredient(ingredient) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then((response) => response.json())
    .then((data) => data.meals);
}

export function getFoods() {
  return fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((data) => data.meals);
}
