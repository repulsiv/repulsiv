var express = require('express');
var bodyParser = require('body-parser');
var {OAuth2Client} = require('google-auth-library');
var db = require('../database-mysql');

var CLIENT_ID = '15484339292-sl85fv09m51i4q69ecfgtu392266fm4o.apps.googleusercontent.com'
var client = new OAuth2Client(CLIENT_ID);


var port = process.env.PORT || 3000
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../react-client/dist'));
var session = require('express-session');

app.use(session({
  secret: 'KEY_TO_BE_SECURED',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto', maxAge:30000 }
}))



// app.get('/oauth2callback', function(req, res){
//   res.send('in this oauth2callback');
// })


function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/');
  }
}


app.get('/protected', restrict, (req, res) => {
  console.log('I M IN PROTECTED')
  res.send('THIS IS PROTECTED')
})


app.post('/login', function(req, res) {

  var token = req.body.id_token;

  async function verify() {
  // The verifyIdToken function verifies the JWT signature, the aud claim, the exp claim, and the iss claim
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    var userInfo = {
      sub: userid, email: payload['email'], username: payload['email']
    }

    db.findSubject(userid, (err, result) => {
      if (result === null) db.insertSubject(userInfo, (err, result) => {
      })

      // creating the user session
      req.session.regenerate(function() {
        req.session.user = userid;
        res.send('/protected');
      });
    })
  }

  verify().catch(console.error);

})


app.get('/logout', (req, res) => {
  console.log('I AM IN SIGNOUT')
  req.session.destroy(function(err) {
  })
})

app.get('/products', (req, res) => {
  res.send(items)
})

app.listen(port, function() {
  console.log('listening on port  '+port);
});





