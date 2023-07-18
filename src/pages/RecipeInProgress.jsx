import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareImage from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  const history = useHistory();
  const { id } = useParams();
  const location = useLocation();
  const [recipeInProgress, setRecipeInProgress] = useState(null);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const favoriteType = location.pathname.includes('meal') ? 'meal' : 'drink';
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [disabledBtnFinish, setDisabledBtn] = useState(true);

  useEffect(() => {
    const fetchRecipeInProgress = async () => {
      try {
        const response = await fetch(
          location.pathname.includes('meals')
            ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch recipe.');
        }
        const data = await response.json();
        setRecipeInProgress(data.meals?.[0] || data.drinks?.[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipeInProgress();
  }, [id, location.pathname]);

  useEffect(() => {
    const getLocalStorageKey = () => `checkedIngredients_${location.pathname}`;

    const storedCheckedIngredients = JSON.parse(
      localStorage.getItem(getLocalStorageKey()) || '[]',
    );
    setCheckedIngredients(storedCheckedIngredients);

    return () => {
      localStorage.removeItem(getLocalStorageKey());
    };
  }, [location.pathname]);

  useEffect(() => {
    const getLocalStorageKey = () => `checkedIngredients_${location.pathname}`;

    localStorage.setItem(getLocalStorageKey(), JSON.stringify(checkedIngredients));
  }, [checkedIngredients, location.pathname]);
  // BOTÃO FINISH
  useEffect(() => {
    if (!recipeInProgress) return;
    const ingredientKeys = Object.keys(recipeInProgress).filter(
      (key) => key.includes('strIngredient'),
    );
    const ingredientValues = ingredientKeys
      .map((key) => recipeInProgress[key])
      .filter((x) => x !== '' && x !== null && x !== undefined);

    const allIngredientsChecked = ingredientValues.length === checkedIngredients.length;
    setDisabledBtn(!allIngredientsChecked);
  }, [checkedIngredients, recipeInProgress]);
  // REDIRECIONANDO AO FINAL DA RECEITA E ADC AO LOCALSTORAGE
  const handleFinishRecipe = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

    doneRecipes.push({
      id: recipeInProgress.idDrink || recipeInProgress.idMeal,
      type: location.pathname.includes('meals') ? 'meal' : 'drink',
      nationality: recipeInProgress.strArea || '',
      category: recipeInProgress.strCategory || '',
      alcoholicOrNot: recipeInProgress.strAlcoholic || '',
      name: recipeInProgress.strDrink || recipeInProgress.strMeal,
      image: recipeInProgress.strDrinkThumb || recipeInProgress.strMealThumb,
      doneDate: new Date().toISOString(),
      tags: recipeInProgress.strTags ? recipeInProgress.strTags.split(',') : [],
    });
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    history.push('/done-recipes');
  };
  // APARTANDO FUNCAO DO ONCHANGE DO CHECKBOX
  const handleIngredientCheckboxChange = (index, isChecked) => {
    if (isChecked) {
      setCheckedIngredients((prevCheckedIngredients) => [
        ...prevCheckedIngredients,
        index,
      ]);
    } else {
      setCheckedIngredients(
        (prevCheckedIngredients) => prevCheckedIngredients.filter(
          (ingredientIndex) => ingredientIndex !== index,
        ),
      );
    }
  };
  // BOTÃO FAVORITAR
  useEffect(() => {
    const listOfFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorite = listOfFavorites.some((favorite) => favorite.id === id);
    setIsFavorite(isRecipeFavorite);
  }, [id]);

  const handleFavorite = () => {
    const listOfFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorite = listOfFavorites.some(
      (favorite) => parseInt(favorite.id, 10) === parseInt(id, 10),
    );

    if (isRecipeFavorite) {
      const newFavorites = listOfFavorites.filter(
        (favorite) => parseInt(favorite.id, 10) !== parseInt(id, 10),
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    } else {
      const newFavorite = {
        id,
        type: favoriteType,
        nationality: recipeInProgress.strArea || '',
        category: recipeInProgress.strCategory || '',
        alcoholicOrNot: recipeInProgress.strAlcoholic || '',
        name: recipeInProgress[`str${favoriteType === 'meal' ? 'Meal' : 'Drink'}`],
        image: recipeInProgress[`str${favoriteType === 'meal' ? 'Meal' : 'Drink'}Thumb`],
      };
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        [...listOfFavorites, newFavorite],
      ));
    }

    setIsFavorite(!isRecipeFavorite);
  };

  if (!recipeInProgress) {
    return <div>wait... we are looking for your recipe.</div>;
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

  const numberOne = 1;

  return (
    <div style={ { width: '360px', height: '640px' } }>
      <img
        src={ strMealThumb || strDrinkThumb }
        alt={ strMeal || strDrink }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{strMeal || strDrink}</h1>
      {strCategory && <p data-testid="recipe-category">{strCategory}</p>}
      {strAlcoholic && <p data-testid="recipe-category">{strAlcoholic}</p>}

      <h2>Ingredients:</h2>
      <ul data-testid="ingredients-container">
        {Object.keys(recipeInProgress).map((key) => {
          if (key.includes('strIngredient') && recipeInProgress[key]) {
            const index = key.slice(-numberOne);
            const ingredientStepTestId = `${index - numberOne}-ingredient-step`;
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
                    const isCheckedS = target.checked;
                    handleIngredientCheckboxChange(index, isCheckedS);
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
          const url = location.pathname.includes('meals')
            ? `/meals/${id}`
            : `/drinks/${id}`;
          copy(`http://localhost:3000${url}`);
          setIsLinkCopied(true);
        } }
      >
        <img
          src={ shareImage }
          alt="share"
        />
      </button>
      {isLinkCopied && (
        <p>
          {location.pathname.includes('meals') ? 'Link copied!' : 'Link copied!'}
        </p>
      )}

      <button
        type="button"
        onClick={ handleFavorite }
      >
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="Favorite"
          data-testid="favorite-btn"
        />
      </button>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ disabledBtnFinish }
        onClick={ handleFinishRecipe }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;
