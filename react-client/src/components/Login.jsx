import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onSignIn = this.onSignIn.bind(this);
    this.onFailure = this.onFailure.bind(this);
    var gapi = gapi // defining gapi for initial rendering i.e. before it mounts
  }


  onFailure(error) {
    console.log('FAILED!!!!', error)
  }


  componentDidMount() {
    if (gapi.signin2) {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 200,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.onSignIn,
        'onfailure': this.onFailure
      });
    }

  }

  onSignIn(googleUser) {

    this.props.userLogin(true);

    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
      url: "/login",
      type: "POST",
      data: {
        id_token: id_token
      }
    }).done( (response) => {
      window.location = response;

    }).fail ( (err) => {
        console.log(err);
    })

  }

  render() {
    return (
      <div id="my-signin2"></div>

      )
    }
}



export default Login






