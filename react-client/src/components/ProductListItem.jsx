import React from 'react';
import Toggle from 'react-toggle'
import { Link,  Route} from "react-router-dom";
import {InputGroup, FormControl} from 'react-bootstrap'
import styles from './Styles/ProductListItem.css'

class ProductListItem extends React.Component {
  constructor(props) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.state = {
      isToggleChecked: false,
      showInput: false
    }
  }

  handleKeyPress(event) {

    if (event.key === 'Enter') {
      var price = Number(event.target.value)
      if (price) {
        this.props.handleToggleState({threshold:price, productToWatch:this.props.value })
        this.setState({
          showInput: false
        })
      }
    }
  }


  handleToggle(event) {
    this.setState({
        isToggleChecked: event.target.checked,
        showInput: event.target.checked
    })
  }

  render() {

    let toggleSwitch;
    let thresholdInput;

    if (this.state.isToggleChecked && this.state.showInput) {
      // thresholdInput =  <input type="text" placeholder="Enter threshold $ value" onKeyPress={this.handleKeyPress}/>
      thresholdInput = <InputGroup><InputGroup.Addon>$</InputGroup.Addon> <FormControl className="priceInput" type="text" onKeyPress={this.handleKeyPress} /></InputGroup>
    }


    if (this.props.isLoggedIn) {
      toggleSwitch = <span> <Toggle onChange={this.handleToggle}/> </span>
    }
     return (
      <div>
        <li className={styles}>
          <Link to={`/products/${this.props.value.itemId}`} > {this.props.value.name} Price:${this.props.value.salePrice}</Link>
          {toggleSwitch}
          {thresholdInput}
        </li>
      </div>
      )
    }
  }

export default ProductListItem;

