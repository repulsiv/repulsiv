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
    var self = this;

    gapi.load('auth2', function() {
      gapi.auth2.init().then(function(auth2) {
        // If the user is already signed in
        if (auth2.isSignedIn.get()) {
          var googleUser = auth2.currentUser.get();
          var id_token = googleUser.getAuthResponse().id_token;

          // var profile = googleUser.getBasicProfile();
          // var id_token = googleUser.getAuthResponse().id_token;

          $.ajax({
            url: "/login",
            type: "POST",
            context: self,
            data: {
              id_token: id_token
            },
            success: function(response){
              self.props.userLogin(true)
              //if (response == 'created new session'){}
              //if (response == 'have a valid session'){}
            },
            error: function(err) {
              console.log(err)
            }
          });
        }
      });
    });
  }

  render() {
    return (
      <div id="my-signin2"></div>

      )
    }
}

// https://github.com/GoogleChromeLabs/google-sign-in/blob/master/static/scripts/introduction.js

export default Login






