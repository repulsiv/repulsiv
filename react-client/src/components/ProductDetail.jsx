import React from 'react';
var sampleData = require('../mockData.js')

const ProductDetail = function(props) {


  // fetch the propduct detail by the id props.match.params.number
  var prods = props.items
  var clickedId = props.match.params.number

  var image = prods.filter((item) => {
    return item.itemId === Number(clickedId) })[0].mediumImage
  return (
    <div>
      <h1> Detail </h1>
        <p> You clicked on item id {props.match.params.number} </p>
        <img src={image} />
    </div>)
}



export default ProductDetail