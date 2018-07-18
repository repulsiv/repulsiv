import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import WatchList from './components/WatchList.jsx';
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import ProductList from './components/ProductList.jsx';

// ReactDOM.render(<App />, document.getElementById('app'))

// REMEMBER: Order of routes DOES matter!!
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/watchlist" component={WatchList} />
      <Route path="/" component={App} />
    </Switch>
  </BrowserRouter>, document.getElementById('app'));


// Order does matter for the routes.

// Scenario 1: We have a '/watchlist' route that we want to render in fresh page and root '/' route.
  // (Bad try!!) Why? because it routes are read in order and the first matching one gets rendered.
   // <Route path="/" component={App} />
   // <Route path="/watchlist" component={App} />
// route /watchlist will NOT work and though the address changes in the address bar BUT it will still be App or '/' content.

// Fix of Scenario 1:
  // <Route exact path="/" component={App} />
  // <Route path="/watchlist" component={App} />


// Scenarion 2: We have an additonal route for a component that needs to be rendered inside 'App' component, part of which is dynamic, '/products/<id#>'
// <Route exact path="/" component={App} />
// <Route path="/watchlist" component={App} />

// the config done in scenario 1 will not work for /products/xxx. Why? because of 'exact' in path '/'.

// Fix of Scenerio 2 and 1:

// 1- Either change the order e.g.
  // <Route path="/watchlist" component={WatchList} />
  // <Route path="/" component={App} />

// 2- Add another router /products and render App again
  // <Route exact path="/" component={App} />
  // <Route path="/watchlist" component={WatchList} />
  // <Route path="/products" component={App} />





