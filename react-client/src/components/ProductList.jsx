import React from 'react';
import ProductListItem from './ProductListItem.jsx';
import {Route, Switch, PropsRoute} from 'react-router-dom'
import ProductDetail from './ProductDetail.jsx'


const ProductList = function(props) {
  const listItems = props.items.map((item, index) => {
    return <ProductListItem key={index} value={item} isLoggedIn={props.isLoggedIn}/>
  })
  var products = props.items
  return (

  <div>
      <ul>
        {listItems}
      </ul>
    <Switch>
      <Route exact path='/products/:number' render={props => <ProductDetail items={products} {...props} />} />
    </Switch>
  </div>
    )
}




// 1- <Route exact path='/products/:number' component={ProductDetail} /> // sends only match prop (we  couldn't send our props with component)
// 2- <Route exact path='/products/:number' render = {() => <ProductDetail items={props.items} />} /> // sends only props.items (and we lose props.match)
// 3- <Route exact path='/products/:number' render = {(props) => <ProductDetail items={props.items} />} /> // it overqrote the props and we lose both now
// 4- <Route exact path='/products/:number' render={props => <ProductDetail items={products} {...props} />} /> // we get both now.. :)

export default ProductList;