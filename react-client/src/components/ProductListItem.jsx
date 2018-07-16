import React from 'react';
import Toggle from 'react-toggle'
import { Link,  Route} from "react-router-dom";

class ProductListItem extends React.Component {

  constructor(props) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this)

  }

  handleToggle(event) {
    this.props.handleToggleState(event.target.checked)
  }

  render() {
    let toggleSwitch;
    if (this.props.isLoggedIn) {
      toggleSwitch = <span> <Toggle onChange={this.handleToggle}/> </span>
    }
     return (
      <div>
        <li>
          <Link to={`/products/${this.props.value.itemId}`} > {this.props.value.name} Price:${this.props.value.msrp}</Link>
          {toggleSwitch}
        </li>
      </div>
      )
    }
  }

export default ProductListItem;

