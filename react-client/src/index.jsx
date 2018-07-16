import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import WatchList from './components/WatchList.jsx';
import {Route, BrowserRouter, Switch} from 'react-router-dom'



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
// In order for watchlist to work, if we had path="/" line first it was not working without putting exact path="/". because it was matching the first route i.e. '/' and rendering the same App for watchlist.
// It was fine if we had only two routes '/' and '/watchlist' like
  // <Route exact path="/" component={App} />
  // <Route path="/watchlist" component={WatchList} />

// BUT for /products/xxx, since we are rendering inside it same App component, having exact path '/' was breaking it. In order to make everything work, these are two of many solutions

// 1- Either change the order e.g.
  // <Route path="/watchlist" component={WatchList} />
  // <Route path="/" component={App} />

// 2- Add another router /products and render App again with no exact match since those routes are /products/<id>
  // <Route exact path="/" component={App} />
  // <Route path="/watchlist" component={WatchList} />
  // <Route path="/products" component={App} />





