import React from 'react';
import Login from './Login.jsx';
import Logout from './Logout.jsx';
import ProductList from './ProductList.jsx';
import Toggle from 'react-toggle';
import $ from 'jquery';
import { Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
var sampleData = require('../mockData.js');

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
      username: '',

    }
  }

  handleToggleState(toggledItem) {
    // to ask user for threshhold to set
    // then send this threshold value along with the checked item to server
      // {threshold: 20, product: {itemId: - , name: - , ...} }
      debugger;
      $.ajax({
        url: '/watchList',
        method: 'POST',
        data: toggledItem,
        success: (response) => {
          console.log(response)
        },
        error: (err) => {
          console.log(err)
        }
      })
  }

  handleLoginStatus(value, username) {
    this.setState(prevState => ({
      isLoggedIn: value,
      username: username
    }));
  }

  handleFormSubmit(event) {
    event.preventDefault()

  }


  fetch(productToSearch, cb) {
    let self = this;
    var notFoundCase = [{
      "itemId": 1000001,
      "parentItemId": 100001,
      "name": 'Sorry, item not found',
      "msrp": null,
      "salePrice": null,
      "thumbnailImage": 'https://davescomputertips.com/wp-content/uploads/2015/10/item-not-found-feature.jpg',
      "mediumImage": 'https://davescomputertips.com/wp-content/uploads/2015/10/item-not-found-feature.jpg'
    }]


    $.ajax({
      url: '/search',
      method: 'GET',
      context: self,
      data: {productName: productToSearch},
      success: (products) => {
        if (products === '') {
          cb(notFoundCase)
        }
        else {
          cb(products)
        }

      },
      error: function (err) {
        debugger
        console.log(err);
      }
    })
  }


  handleSearch(e) {
    if (e.key ===  'Enter') {
      if (e.target.value) {
        this.fetch(e.target.value, (products) => {
        this.setState({
          mockData: products
          })
        })
      }


    }
  }

  render () {

    var isLoggedIn = this.state.isLoggedIn;
    var button;
    var watchList;
    var thresholdInput;
    let productList;

    if (isLoggedIn) {
      var username = <h4> {this.state.username} </h4>
      var button = <Logout userLogin={this.handleLoginStatus} />
      var watchList = <div className="sidenav"><Link to='/watchList'> {username} watch list </Link> </div>
    } else {
      var button = <Login userLogin={this.handleLoginStatus} />
    }



    return (

      <Grid>

       <div>
        {button}
      </div>


       <Row>
          <Col md={10} xs={10}>
            <br />

            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          </Col>

          <Col md={2} xs={2}>
            <br />
            "Logo would appear here"
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          </Col>
        </Row>

        <Row>
          <Col md={2} xs={2}>
            <br />
            "empty space on left"

          </Col>
          <Col md={8} xs={8}>
            <br />
            <input type="text" name="search" placeholder="Seacrh.." onKeyPress={this.handleSearch} onChange={this.handleSearch}/>
             <br /><br /><br /><br />
            <ProductList items={this.state.mockData} isLoggedIn={this.state.isLoggedIn} handleToggleState={this.handleToggleState}/>
          </Col>

          <Col md={2} xs={2}>
            <br />
            "empty space on right"
             {watchList}
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          </Col>
        </Row>

        <Row>
          <Col md={12} xs={12}>
            <br />
            contact-us: 1 (800) 123-0000
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