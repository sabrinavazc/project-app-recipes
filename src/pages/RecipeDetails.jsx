import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchRecipeById } from '../helpers/fetchApi';

function RecipeDetails() {
  const [item, setItem] = useState({});
  const location = useLocation();
  const { pathname } = location;
  const [recommendations, setRecommendations] = useState([]);

  const {
    strMeal, strDrink, strYoutube,
    strCategory, strInstructions,
    strImageSource, strAlcoholic,
  } = item;

  const ingredientsList = Object.entries(item)
    .filter(([key, value]) => key.includes('strIngredient') && value)
    .map(([, value]) => value);

  useEffect(() => {
    const recipeType = pathname.split('/')[1];
    const recipeId = pathname.split('/')[2];
    const recipeInfo = async () => {
      const data = await fetchRecipeById(recipeId, recipeType);
      setItem(data);
      const urlRecommendations = pathname.split('/')[1] === 'meals'
        ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
        : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const responseRecommendations = await fetch(urlRecommendations);
      const dataRecommendations = await responseRecommendations.json();
      setRecommendations(dataRecommendations);
    };
    recipeInfo();
  }, [pathname]);
  console.log(recommendations);

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ strImageSource }
        alt={ item.title }
      />
      <h3 data-testid="recipe-title">
        { strMeal || strDrink }
      </h3>
      <h4 data-testid="recipe-category">
        { strAlcoholic }
      </h4>
      <h4 data-testid="recipe-category">
        { strCategory }
      </h4>
      <h3>Ingredients:</h3>
      <ul>
        {ingredientsList.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { `${ingredient} - ${item[`strMeasure${index + 1}`]}` }
          </li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p data-testid="instructions">
        { strInstructions }
      </p>
      <iframe
        data-testid="video"
        title="video"
        width="420px"
        height="315px"
        src={ strYoutube }
      />
    </div>
  );
}

export default RecipeDetails;
