
// ref - https://developers.google.com/identity/sign-in/web/sign-in
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

// Note this does not logs out from google products. It just changes the google sign-in button state from 'signed-in' to 'sign in', allowing users to be able to click sign-in again, that'd trigger the sign-on function of app where we can then issue new cookie etc.

  signOut() {
    var self = this;
     var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        $.ajax({
            url: "/logout",
            context: self
          }).done( (response) => {
            // upon successfull sign-out - replace the sign-out button with sign-in
            self.props.userLogin(false);
          }).fail ( (err) => {
            console.log(err);
        })
      });

  }

  render() {
    return (
      <button onClick={this.signOut}> Sign out</button>
      )
    }
}


export default Logout