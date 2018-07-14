import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }


  signOut() {
     var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        this.props.userLogin(false);
      });

    $.ajax({
        url: "/logout",
      }).done( (response) => {

      }).fail ( (err) => {
        console.log(err);
    })
  }

  render() {
    return (
      <button onClick={this.signOut}> Sign out</button>
      )
    }
}


export default Logout