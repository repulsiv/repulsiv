import React from 'react';
import Toggle from 'react-toggle'
import { Link,  Route} from "react-router-dom";

const ProductListItem = (props) => {
  let toggleSwitch;
  if (props.isLoggedIn) {
    toggleSwitch = <span> <Toggle /> </span>
  }
   return (
    <div>
      <li>
        <Link to={`/products/${props.value.itemId}`} > { props.value.name } Price:${props.value.msrp}
        {toggleSwitch}
        </Link>
      </li>
    </div>
)}

export default ProductListItem;

