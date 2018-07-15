var express = require('express');
var bodyParser = require('body-parser');
var {OAuth2Client} = require('google-auth-library');
var db = require('../database-mysql');
var cookieSession = require('cookie-session');

try {
  var config = require('../config.js');
}

catch(e) {
  config = {
    CLIENT_ID: process.env.CLIENT_ID
  }
}

var CLIENT_ID = config.CLIENT_ID;
var client = new OAuth2Client(CLIENT_ID);

var port = process.env.PORT || 3000
var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cookieSession({
  name: 'repul1',
  keys: ['secret-to-sign-cookies'],
  maxAge: 60000

}))

  // app.get('/invalid', (req, res) => {
  //   res.send('not valid session')
  // })

  // function restrict(req, res, next) {
  //   if (req.session.user) {
  //     console.log('the session is: ', req.session)
  //     next();
  //   } else {
  //     req.session.error = 'Access denied!';
  //     res.redirect('/invalid');
  //   }
  // }

  // app.get('/protected', restrict, (req, res) => {
  //   res.send('this is protected asset')
  // })

  app.post('/login', (req, res) => {

    var token = req.body.id_token;

    async function verify() {
      var ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,
      });
      var payload = ticket.getPayload();
      var userid = payload['sub'];

      return userInfo = {
        userid: userid,
        email: payload['email'],
        username: payload['email']
      }
    }

    verify()
    // after tokenid is verified
    .then( (userInfo) => {
      // check if userid exists in db
      db.findUserId(userInfo.userid, (err, result) => {
        if (result === null || (Array.isArray(result) && result.length === 0)) {
          // if not then insert the id in db
          db.insertUserId(userInfo, (err, result) => {})
        }
      });

      // if the cookie or session does not exist then create the user session
      if (!req.session.user) {
          req.session.user = userInfo.userid;
          res.send('created new session');
      }
      // if user session valid then
      if (req.session.user) {
        res.send('have a valid session');
      }
    })
    .catch(console.error);
  });



app.get('/logout', (req, res) => {
  console.log('I AM IN SIGNOUT')
  req.session = null;
  res.end('session ended')
})




app.listen(port, function() {
  console.log('listening on port  '+port);
});





