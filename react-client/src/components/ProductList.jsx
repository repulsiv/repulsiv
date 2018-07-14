import React from 'react';
import ProductListItem from './ProductListItem.jsx';


const ProductList = function(props) {
  const listItems = props.items.map((item, index) => {
    return <ProductListItem key={index} value={item} isLoggedIn={props.isLoggedIn}/>
  })

  return <ul> {listItems} </ul>
}

export default ProductList;