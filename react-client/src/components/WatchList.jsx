import React from 'react';
import {Route, Switch, PropsRoute} from 'react-router-dom'
import { Grid, Row, Col} from 'react-bootstrap';
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
        // result.map()
        self.setState({items: result})
      },
      error: function(err) {
        console.log(err)
      }
    });
  }

  handleRemove(itemToRemove) {
    itemToRemove.itemId
    var filteredArary = this.state.items.filter((item) => { return (item.itemId !== itemToRemove.itemId) })
    this.setState({
      items:filteredArary
    })

    // also tell server to delete
    $.ajax({
      url: '/remove',
      method: 'POST',
      data: itemToRemove.itemId,
      success: function(result) {
        debugger;
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

   listItems.push(
    <li key={groupedItems[key][0].itemId.toString()}>
      <h4>  {groupedItems[key][0].name} </h4>
      <img src={groupedItems[key][0].mediumImage} />
      <p> <em> Customer Ratings: {groupedItems[key][0].customerRating } Reviews: {groupedItems[key][0].numReviews}</em></p>
      <p> Your threshold: <b> ${groupedItems[key][0].threshold} </b></p>
      <ProductChart data={groupedItems[key]} />
      <input type="submit" value="Remove from watchlist" onClick={()=> this.handleRemove(groupedItems[key][0])} />
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
    <ul> {listItems} </ul>
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
      "contact-us: xxx-xxx-xxxx"
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </Col>
  </Row>

</Grid>)
}


export default WatchList