import React from 'react';
import {Route, Switch, PropsRoute, Link} from 'react-router-dom'
import { Grid, Row, Col, Button} from 'react-bootstrap';
import ProductChart from './ProductChart.jsx';
import $ from 'jquery'
import Header from './Header.jsx'
// var data = require('../mockData.js');


class WatchListItem extends React.Component {

  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);

    this.state = {
      items: [{itemId:'', name:'', mediumImage:''}]
    }
  }


  componentDidMount() {
    var self = this;
    console.log('in component did mount!!!')
      $.ajax({
      url: "/watchlist",
      context: self,
      success: function(result){
        self.setState({items: result})
      },
      error: function(err) {
        console.log(err)
      }
    });
  }

  handleRemove(itemToRemove) {
    // itemToRemove.itemId
    debugger
    var filteredArary = this.state.items.filter((item) => { return (item.itemId !== itemToRemove.itemId) })
    this.setState({
      items:filteredArary
    })

    // also tell server to delete
    $.ajax({
      url: '/remove',
      method: 'POST',
      data: {itemToRemove: itemToRemove.itemId},
      success: function(result) {
        console.log(result)
      },
      error: function(err) {
        console.log(err)
      }
    })
  }

  render() {

  var groupedItems = _.groupBy(this.state.items, 'itemId')
  var listItems = [];
  // number of keys = number of products
    // one groupItem is a collection of prices of the same product
  for (var key of Object.keys(groupedItems)) {
    debugger
   listItems.push(
    <li key={groupedItems[key][0].itemId.toString()}>
      <h4>  {groupedItems[key][0].name} </h4>
      <a href={groupedItems[key][0].productUrl} >
        <img src={groupedItems[key][0].mediumImage} />
      </a>
      <p> <em> Customer Ratings: {groupedItems[key][0].customerRating } Reviews: {groupedItems[key][0].numReviews}</em></p>
      <p> Your threshold: <b> ${groupedItems[key][0].threshold} </b></p>
      <ProductChart data={groupedItems[key]} />
      <input type="submit" value="Remove from watchlist" onClick={()=> this.handleRemove(this.state.items[key])} />
    </li>)
  }



  // var listItems = this.state.items.map((item) =>
  //   <li key={item.itemId.toString()}>
  //     <h4> {item.name} </h4>
  //     <img src={item.mediumImage} />
  //     <ProductChart data={item} />
  //     <input type="submit" value="Remove from watchlist" onClick={()=> this.handleRemove(item)} />

  //   </li>
    // );

  return (
    <div>
    <Link to='/'><Button bsStyle="success">Search for more</Button></Link>
      <ul> {listItems} </ul>
    </div>
    )

  }

}


const WatchList = function(props) {

  return (<Grid>

  <Header />

  <Row className="show-grid">
    <Col md={2} xs={2}>
    </Col>

    <Col md={8} xs={8}>
      <WatchListItem />
    </Col>

    <Col md={2} xs={2}>
    </Col>
  </Row>


  <Row className="show-grid">
    <Col md={12} xs={12}>
      <br />
      contact-us: 1 (800) 123-0000
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </Col>
  </Row>

</Grid>)
}


export default WatchList