
// ref - https://developers.google.com/identity/sign-in/web/backend-auth

var express = require('express');
var bodyParser = require('body-parser');
var {OAuth2Client} = require('google-auth-library');
var db = require('../database-mysql');
var cookieSession = require('cookie-session');
var utils = require('./utils.js')

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
  name: 'yecchy',
  keys: ['secret-to-sign-cookies'],
  maxAge: 60000

}))


  // ############ For debugging authentication  ##############

  // app.get('/invalid', (req, res) => {
  //   res.send('not valid session')
  // })

  // function restrict(req, res, next) {
  //   if (req.session.user) {
  //     next();
  //   } else {
  //     req.session.error = 'Access denied!';
  //     res.redirect('/invalid');
  //   }
  // }

  // app.get('/protected', restrict, (req, res) => {
  //   res.send('this is protected asset')
  // })

  // ############ ########################### ##############

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

      // either case (user exist or no), create session (i.e. cookie) IF the user does not exist or expired.
      if (!req.session.user) {
          req.session.user = userInfo.userid;
          res.end('created new session');
      }
      // if the session is valid (i.e. cookie) then just respond with a message to make the ajax request successful.
      if (req.session.user) {
        res.end('have a valid session');
      }
    })
    .catch(console.error);
  });


// Note this logout is terminating the session of this app and NOT the google session. This google sign-in api does not provide this functionality because of obvious reason and how single sign-on works.
app.get('/logout', (req, res) => {
  req.session = null;
  res.end('session ended')
})

// ********** testing helper functions in utils.js psedocode

app.post('/watchlist', (req, res) => {
  // 1- get the data from client {threshold: 22, product: {} }
  // 2- It then should add user infor to this data  (req.session.user) so we know which item is for which user
    // 3- save this data to the database
   userWatchListData = req.body
   userWatchListData.sub = req.session.user
   console.log(userWatchListData)
   // now save this data to products table
   res.send('successfully saved in db, if not send error ..')

})


app.get('/search', (req, res) => {
  console.log('in search')
  console.log(req.query.productName)

  utils.onRequestFetcher(req.query.productName, (err, matchedProducts) => {
    if (err) res.statusCode(404).send([{}])
    else res.send(matchedProducts)
  })
})


app.get('/watchlist', (req, res) => {
  // should fetch Walmart data using helper function in utils
  // fetches the data from database produncts tabe (that we we saved in watchlist post request)
  // it should send only the data for the loggedin user
  // In response something like userWatchedProducts = db.findAll({where: sub/user: req.session.user})
    //res.end(userWatchedProducts)
})


app.listen(port, function() {
  console.log('listening on port  '+port);
});



