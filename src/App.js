import React, { useMemo, useState } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import Footer from './components/Footer';
import RecipeContext from './context/RecipeContext';
import Recipes from './components/Recipes';

function App() {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const recipeContextValue = useMemo(() => ({
    meals,
    setMeals,
    drinks,
    setDrinks,
  }), [meals, setMeals, drinks, setDrinks]);

  return (
    <RecipeContext.Provider
      value={ recipeContextValue }
    >
      <div className="meals">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/meals" component={ Meals } />
            <Route
              exact
              path="/meals/:id"
              component={ RecipeDetails }

            />
            <Route
              path="/meals/:id/in-progress"
              component={ RecipeInProgress }

            />
            <Route exact path="/drinks" component={ Drinks } />
            <Route
              exact
              path="/drinks/:id"
              component={ RecipeDetails }

            />
            <Route
              path="/drinks/:id/in-progress"
              component={ RecipeInProgress }

            />
            <Route path="/profile" component={ Profile } />
            <Route path="/done-recipes" component={ DoneRecipes } />
            <Route path="/favorite-recipes" component={ FavoriteRecipes } />
            <Recipes />
            <Footer />
          </Switch>
        </BrowserRouter>
      </div>
    </RecipeContext.Provider>
  );
}

export default App;
