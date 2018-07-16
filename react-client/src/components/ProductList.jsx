import React from 'react';
import ProductListItem from './ProductListItem.jsx';
import {Route} from 'react-router-dom'

const ProductList = function(props) {
  const listItems = props.items.map((item, index) => {
    return <ProductListItem key={index} value={item} isLoggedIn={props.isLoggedIn}/>
  })

  return <ul> {listItems} </ul>
}


const ProductDetail = () => {
  debugger
  (
  <Switch>
    <Route exact path='/products' component={ProductList}/>
    <Route path='/products/:number' component={Player}/>
  </Switch>
)
}



export default ProductList;