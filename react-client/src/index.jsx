import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import WatchList from './components/WatchList.jsx';
import {Route, BrowserRouter, Switch} from 'react-router-dom'



// ReactDOM.render(<App />, document.getElementById('app'))

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/watchlist" component={WatchList} />
    </Switch>
  </BrowserRouter>, document.getElementById('app'));
