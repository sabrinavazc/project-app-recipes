import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import Footer from './components/Footer';

function App(props) {
  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } { ...props } />
          <Route path="/meals" component={ Meals } { ...props } />
          <Route path="/meals/:id" component={ Meals } { ...props } />
          <Route path="/meals/:id/in-progress" component={ Meals } { ...props } />
          <Route path="/drinks" component={ Drinks } { ...props } />
          <Route path="/drinks/:id" component={ Drinks } { ...props } />
          <Route path="/drinks/:id/in-progress" component={ Drinks } { ...props } />
          <Route path="/profile" component={ Profile } { ...props } />
          <Route path="/done-recipes" component={ DoneRecipes } { ...props } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } { ...props } />
          <Footer />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
