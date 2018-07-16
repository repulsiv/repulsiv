import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import WatchList from './components/WatchList.jsx';
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import ProductList from './components/ProductList.jsx';


// ReactDOM.render(<App />, document.getElementById('app'))

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/watchlist" component={WatchList} />
      <Route path="/products" component={App} />
    </Switch>
  </BrowserRouter>, document.getElementById('app'));
