import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import allFood from '../assets/allFood.svg';
import food from '../assets/food.svg';
import allDrinks from '../assets/allDrinks.svg';
import share from '../images/shareIcon.svg';
import doneRecipe from '../assets/done.svg';
import './DoneRecipes.css';
import Footer from '../components/Footer';

function DoneRecipes() {
  const history = useHistory();
  const [recipes, setRecipes] = useState([]);
  const [fiteredRecipes, setFilteredRecipes] = useState([]);
  const [linkCopied, setLinkCopied] = useState([]);

  const getRecipesDone = () => {
    const doneRecipesJSON = localStorage.getItem('doneRecipes') ?? '[]';
    const doneRecipes = JSON.parse(doneRecipesJSON);
    setRecipes(doneRecipes);
    setFilteredRecipes(doneRecipes);
  };

  useEffect(() => {
    getRecipesDone();
  }, []);

  const filterByAll = () => {
    getRecipesDone();
    setFilteredRecipes(recipes);
  };

  const filterByDrinks = () => {
    const filterDrinks = recipes.filter((recipe) => recipe.type === 'drink');
    setFilteredRecipes(filterDrinks);
  };

  const filterByMeals = () => {
    const filterMeals = recipes.filter((recipe) => recipe.type === 'meal');
    setFilteredRecipes(filterMeals);
  };

  const handleLinkCopy = async (id) => {
    const { type } = recipes.filter((recipe) => recipe.id === id)[0];
    const link = `${window.location.origin}/${type}s/${id}`;

    const copyLink = async () => {
      await copy(link);
      const newLinkCopied = [...linkCopied, id];
      setLinkCopied(newLinkCopied);
    };

    copyLink();
  };

  const redirectDetails = (id, type) => {
    if (type === 'meal') {
      history.push(`/meals/${id}`);
    } else {
      history.push(`/drinks/${id}`);
    }
  };

  return (
    <div className="done-container">
      <Header src={ doneRecipe } title="Done Recipes" showSearchIcon={ false } />
      <div className="container-icons">
        <button
          className="btn-category"
          onClick={ filterByAll }
          name="All"
          data-testid="filter-by-all-btn"
        >
          <img className="icone" src={ allFood } alt="all" />
        </button>
        <button
          className="btn-category"
          onClick={ filterByMeals }
          name="Meals"
          data-testid="filter-by-meal-btn"
        >
          <img className="icone" src={ food } alt="food" />
        </button>
        <button
          className="btn-category"
          onClick={ filterByDrinks }
          name="Drinks"
          data-testid="filter-by-drink-btn"
        >
          <img className="icone" src={ allDrinks } alt="all" />
        </button>
      </div>
      <div className="doneRecipe-box">
        {fiteredRecipes?.map((recipe, index) => (
          <div key={ index } className="card-recipe-done">
            <button
              className="image-container-done"
              onClick={ () => redirectDetails(recipe.id, recipe.type) }
              style={ {
                border: 'none', background: 'none', padding: 0, cursor: 'pointer' } }
            >
              <div style={ { height: '100%', position: 'relative' } }>
                <img
                  className="image-recipe-done"
                  src={ recipe.image }
                  data-testid={ `${index}-horizontal-image` }
                  alt="recipe"
                />
                {linkCopied.includes(recipe.id)
                  && (
                    <p className="link-copied"> Link copied! </p>
                  )}
              </div>

            </button>
            <div className="left-done">
              <div className="title-share">
                <p
                  className="top-text-done"
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipe.type === 'meal'
                    ? `${recipe.nationality} - ${recipe.category}`
                    : recipe.alcoholicOrNot}
                </p>
                <button
                  className="btn-share-done"
                  onClick={ () => handleLinkCopy(recipe.id) }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ share }
                    alt="share"
                  />
                </button>
              </div>
              <button
                onClick={ () => redirectDetails(recipe.id, recipe.type) }
                style={ {
                  border: 'none', background: 'none', padding: 0, cursor: 'pointer' } }
              >
                <p className="name-recipe" data-testid={ `${index}-horizontal-name` }>
                  {recipe.type === 'meal' ? recipe.name : recipe.name}
                </p>
              </button>
              <p
                className="name-recipe"
                data-testid={ `${index}-horizontal-done-date` }
              >
                {recipe.doneDate}
              </p>
              <div className="tags-box">
                {recipe.tags?.slice(0, 2).map((tag) => (
                  <span
                    className="tag"
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                    {' '}
                  </span>
                ))}
              </div>

            </div>

          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default DoneRecipes;
