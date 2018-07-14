import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ProductList from './components/ProductList.jsx';
var sampleData = require('./mockData.js')
import Toggle from 'react-toggle';
import Login from './components/Login.jsx'
import Logout from './components/Logout.jsx'
import { Grid, Row, Col} from 'react-bootstrap';

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

    const dummySentences = [
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      'Donec hendrerit tempor tellus.',
      'Donec pretium posuere tellus.',
      'Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.',
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
      'Nulla posuere.',
      'Donec vitae dolor.',
      'Nullam tristique diam non turpis.',
      'Cras placerat accumsan nulla.',
      'Nullam rutrum.',
      'Nam vestibulum accumsan nisl.'
    ];

    return (

      <Grid>
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
            "empty space"
          </Col>
          <Col md={8} xs={8}>
            <code>&lt;{'Col sm={8}'} /&gt;</code>
            <br />
            <input type="text" name="search" placeholder="Seacrh.." onKeyPress={this.handleSearch} />
             <br /><br /><br /><br />
            <ProductList items={this.state.mockData} isLoggedIn={this.state.isLoggedIn} />
            "search bar"
          </Col>
          <Col md={2} xs={2}>
            <code>&lt;{'Col sm={2}'} /&gt;</code>
            <br />
            "empty space"
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

ReactDOM.render(<App />, document.getElementById('app'));
