import React from 'react';
import Toggle from 'react-toggle'
import ProductDetail from './ProductDetail.jsx'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import {Route, NavLink,HashRouter} from "react-router-dom";


const ProductListItem = (props) => {

  let toggleSwitch;
  if (props.isLoggedIn) {
    toggleSwitch = <span> <Toggle /> </span>
  }

  return (
    <Router>
      <div>
        <li>
          <Link to=
          {{ pathname: '/products', search: `?id=${props.value.itemId}` }} > { props.value.name } Price:${props.value.msrp}
          {toggleSwitch}
          </Link>
        </li>



        <div className="content">
          <Route exact path='/products' component={ProductDetail}/>
        </div>

      </div>



    </Router>
    )
}


export default ProductListItem;



// import React from 'react';
// import Toggle from 'react-toggle'
// import ProductDetail from './ProductDetail.jsx'
// // import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import {Route, NavLink,HashRouter} from "react-router-dom";


// const ProductListItem = (props) => {

// let toggleSwitch;
// if (props.isLoggedIn) {
//   toggleSwitch = <span> <Toggle /> </span>
// }
//  return (


//     <HashRouter>
//     <div>
//       <li>
//         <NavLink to='/products'> { props.value.name } Price:${props.value.msrp}
//           {toggleSwitch}
//         </NavLink>
//       </li>

//       <div className="content">
//         <Route exact path='/products' component={ProductDetail}/>
//       </div>
//     </div>
//     </HashRouter>

// )}

// export default ProductListItem;