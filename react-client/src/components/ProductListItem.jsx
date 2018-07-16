import React from 'react';
import Toggle from 'react-toggle'
import { Link,  Route} from "react-router-dom";

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
        this.props.handleToggleState({threshold:price, itemId:this.props.value.itemId})
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
      thresholdInput =  <input type="text" placeholder="Enter threshold $ value" onKeyPress={this.handleKeyPress}/>
    }


    if (this.props.isLoggedIn) {
      toggleSwitch = <span> <Toggle onChange={this.handleToggle}/> </span>
    }
     return (
      <div>
        <li>
          <Link to={`/products/${this.props.value.itemId}`} > {this.props.value.name} Price:${this.props.value.msrp}</Link>
          {toggleSwitch}
          {thresholdInput}
        </li>
      </div>
      )
    }
  }

export default ProductListItem;

