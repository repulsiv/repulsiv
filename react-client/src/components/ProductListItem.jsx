import React from 'react';
// import {ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import Toggle from 'react-toggle'
const ProductListItem = (props) => {

let toggleSwitch;
if (props.isLoggedIn) {
  toggleSwitch = <span> <Toggle /> </span>
}
 return (
  <div>
    <li> { props.value.name } Price:${props.value.msrp}
      {toggleSwitch}
    </li>
  </div>
)}

export default ProductListItem;