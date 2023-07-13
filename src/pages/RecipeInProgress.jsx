import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';

function RecipeInProgress() {
  const { id } = useParams();
  const location = useLocation();
  const [recipeInProgress, setRecipeInProgress] = useState(null);
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  useEffect(() => {
    const fetchRecipeInProgress = async () => {
      const response = await fetch(
        location.pathname.includes('meals')
          ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const data = await response.json();
      setRecipeInProgress(data.meals?.[0] || data.drinks?.[0]);
    };

    fetchRecipeInProgress();
  }, [id, location.pathname]);

  useEffect(() => {
    const getLocalStorageKey = () => `checkedIngredients_${location.pathname}`;

    const storedCheckedIngredients = JSON.parse(
      localStorage.getItem(getLocalStorageKey()) || '[]',
    );
    setCheckedIngredients(storedCheckedIngredients);
  }, [location.pathname]);

  useEffect(() => {
    const getLocalStorageKey = () => `checkedIngredients_${location.pathname}`;

    localStorage.setItem(
      getLocalStorageKey(),
      JSON.stringify(checkedIngredients),
    );
  }, [checkedIngredients, location.pathname]);

  if (!recipeInProgress) {
    return <div>Ops! We could not find your recipe.</div>;
  }

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strDrinkThumb,
    strDrink,
    strAlcoholic,
  } = recipeInProgress;

  return (
    <div>
      <img
        src={ strMealThumb || strDrinkThumb }
        alt={ strMeal || strDrink }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{strMeal || strDrink}</h1>
      {strCategory && <p data-testid="recipe-category">{strCategory}</p>}
      {strAlcoholic && <p data-testid="recipe-category">{strAlcoholic}</p>}
      <h2>Ingredients:</h2>
      <ul>
        {Object.keys(recipeInProgress).map((key) => {
          if (key.includes('strIngredient') && recipeInProgress[key]) {
            const index = key.slice(-1);
            const ingredientStepTestId = `${index - 1}-ingredient-step`;
            const isChecked = checkedIngredients.includes(index);
            return (
              <label
                key={ key }
                data-testid={ ingredientStepTestId }
                style={ {
                  textDecoration: isChecked ? 'line-through solid rgb(0, 0, 0)' : 'none',
                } }
              >
                <input
                  type="checkbox"
                  checked={ isChecked }
                  onChange={ (event) => {
                    const { target } = event;
                    const isChecked = target.checked;
                    if (isChecked) {
                      setCheckedIngredients([...checkedIngredients, index]);
                    } else {
                      const updatedCheckedIngredients = checkedIngredients.filter(
                        (ingredientIndex) => ingredientIndex !== index,
                      );
                      setCheckedIngredients(updatedCheckedIngredients);
                    }
                  } }
                />
                {recipeInProgress[key]}
              </label>
            );
          }
          return null;
        })}
      </ul>
      <h2>Instructions:</h2>
      <p data-testid="instructions">{strInstructions}</p>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          const link = `${window.location.origin}${location.pathname}`;
          copy(link);
        } }
      >
        Share
      </button>
      <button type="button" data-testid="favorite-btn">
        Favorite
      </button>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => {
          const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
          const newRecipe = {
            id: recipeInProgress.idMeal || recipeInProgress.idDrink,
            name: recipeInProgress.strMeal || recipeInProgress.strDrink,
            image: recipeInProgress.strMealThumb || recipeInProgress.strDrinkThumb,
            category: recipeInProgress.strCategory || recipeInProgress.strAlcoholic,
            instructions: recipeInProgress.strInstructions,
            doneDate: new Date().toISOString(),
            tags: recipeInProgress.strTags ? recipeInProgress.strTags.split(',') : [],
          };
          localStorage.setItem(
            'doneRecipes',
            JSON.stringify([...doneRecipes, newRecipe]),
          );
        } }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;
