import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }


  signOut() {
    var self = this;
     var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        $.ajax({
            url: "/logout",
            context: self
          }).done( (response) => {
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