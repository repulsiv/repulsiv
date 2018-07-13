import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ProductList from './components/ProductList.jsx';
var sampleData = require('./mockData.js')
import Toggle from 'react-toggle';
import Login from './components/Login.jsx'
import Logout from './components/Logout.jsx'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this)


    this.state = {
      items: [],
      isLoggedIn: false,
      mockData: [],

    }
  }

  // handleLoginClick() {
  //   this.setState({isLoggedIn: true});
  // }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  handleFormSubmit(event) {
    event.preventDefault()

  }

  handleSearch(e) {
    // perform ajax call to get get the data

    if (e.key ===  'Enter') {
      this.setState({
        mockData: sampleData.mockData
      })
    }
  }

  render () {
    const isLoggedIn = this.state.isLoggedIn;

    let button;
    if (isLoggedIn) {
      button = <Logout onClick={this.handleLogoutClick} />;
    } else {
      button = <Login isLoggedIn={this.state.isLoggedIn}/>
    }

    let productList;

    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <h1> Yecchy </h1>
          {button}
          <input type="text" name="search" placeholder="Seacrh.." onKeyPress={this.handleSearch} />
          <ProductList items={this.state.mockData} isLoggedIn={this.state.isLoggedIn} />
      </form>

      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
