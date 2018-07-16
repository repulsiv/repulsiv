import React from 'react';
import Login from './Login.jsx';
import Logout from './Logout.jsx';
import ProductList from './ProductList.jsx';
import Toggle from 'react-toggle';
import $ from 'jquery';
import { Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
var sampleData = require('../mockData.js')


class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleLoginStatus = this.handleLoginStatus.bind(this);
    this.handleToggleState = this.handleToggleState.bind(this)

    this.state = {
      items: [],
      isLoggedIn: false,
      mockData: [],

    }
  }

  handleToggleState(isChecked) {
    // to ask user for threshhold to set

  }

  handleLoginStatus(value) {
    this.setState(prevState => ({
      isLoggedIn: value
    }));
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

    var isLoggedIn = this.state.isLoggedIn;
    var button;
    var watchList;

    if (isLoggedIn) {
      button = <Logout userLogin={this.handleLoginStatus} />
      watchList = <div><Link to='/watchList'> WatchList </Link> </div>
    } else {
      button = <Login userLogin={this.handleLoginStatus} />
    }

    let productList;

    return (

      <Grid>

       <div>
        {button}
      </div>


       <Row>
          <Col md={10}>
            <code>&lt;{'Col sm={6}'} /&gt;</code>
            <br />
            "Logo would appear here"
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          </Col>

          <Col md={2}>
            <code>&lt;{'Col sm={6}'} /&gt;</code>
            <br />
            <input type="submit" value="login/logout"/>
            "Signup/Login button"
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          </Col>
        </Row>

        <Row>
          <Col md={2} xs={2}>
            <code>&lt;{'Col sm={2}'} /&gt;</code>
            <br />
            "empty space on left"


          </Col>
          <Col md={8} xs={8}>
            <code>&lt;{'Col sm={8}'} /&gt;</code>
            <br />
            <input type="text" name="search" placeholder="Seacrh.." onKeyPress={this.handleSearch} />
             <br /><br /><br /><br />
            <ProductList items={this.state.mockData} isLoggedIn={this.state.isLoggedIn} handleToggleState={this.handleToggleState}/>
            "search bar"
          </Col>

          <Col md={2} xs={2}>
            <code>&lt;{'Col sm={2}'} /&gt;</code>
            <br />
            "empty space on right"

             {watchList}

            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <code>&lt;{'Col sm={12}'} /&gt;</code>
            <br />
            "contact-us: xxx-xxx-xxxx"
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

          </Col>
        </Row>
      </Grid>

  /*
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <h1> Yecchy </h1>
          {button}
          <input type="text" name="search" placeholder="Seacrh.." onKeyPress={this.handleSearch} />
          <ProductList items={this.state.mockData} isLoggedIn={this.state.isLoggedIn} />
        </form>
      </div>

   */

      )
  }
}

export default App