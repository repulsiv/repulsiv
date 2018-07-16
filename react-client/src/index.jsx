import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import {Route, BrowserRouter, hashHistory } from 'react-router-dom'



// ReactDOM.render(<App />, document.getElementById('app'))

ReactDOM.render(
  <BrowserRouter>
  <div>
    <Route path="/" component={App} />
  </div>
  </BrowserRouter>, document.getElementById('app'));
