import React from 'react';
import {Route, Switch, PropsRoute} from 'react-router-dom'
import { Grid, Row, Col} from 'react-bootstrap';
import ProductChart from './ProductChart.jsx';
var data = require('../mockData.js');


class WatchListItem extends React.Component {

  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
    this.state = {
      items: this.props.items

    }
  }

  handleRemove(itemToRemove) {
    itemToRemove.itemId
    var filteredArary = this.state.items.filter((item) => { return (item.itemId !== itemToRemove.itemId) })
    this.setState({
      items:filteredArary
    })
  }

  render() {

  var listItems = this.state.items.map((item) =>
    <li key={item.itemId.toString()}>
      <h4> {item.name} </h4>
      <img src={item.mediumImage} />
      <ProductChart data={item} />
      <input type="submit" value="Remove from watchlist" onClick={()=> this.handleRemove(item)} />

    </li>
    );

  return (
    <ul> {listItems} </ul>
    )
  }

}


const WatchList = function(props) {

  return (<Grid>

  <Row className="show-grid">
    <Col md={10} xs={10}>
      <code>&lt;{'Col xs={12} md={8}'} /">&gt;</code>
       <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </Col>

    <Col md={2} xs={2}>
      <code>&lt;{'Col xs={6} md={4}'} /">&gt;</code>
       <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </Col>
  </Row>


  <Row className="show-grid">
    <Col md={2} xs={2}>
      <code>&lt;{'Col xs={6} md={4}'} /">&gt;</code>
    </Col>

    <Col md={8} xs={8}>
      <code>&lt;{'Col xs={6} md={4}'} /">&gt;</code>

      <WatchListItem items={data.mockGraphData}/>
    </Col>

    <Col md={2} xs={2}>
      <code>&lt;{'Col xsHidden md={4}'} /">&gt;</code>
    </Col>
  </Row>


  <Row className="show-grid">
    <Col md={12} xs={12}>
      <code>&lt;{'Col md={6} mdPush={6}'} /">&gt;</code>
      <br />
      "contact-us: xxx-xxx-xxxx"
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </Col>
  </Row>

</Grid>)
}


export default WatchList