var express = require('express');
var bodyParser = require('body-parser');

var model = require('../database-mysql/index.js');
var app = express();
app.use(express.static(__dirname + '/../react-client/dist'));


app.get('/users', function (req, res) {
   model.User.findAll().then(users => {
    console.log(users)
    res.send(users)
  })
});


const port = process.env.PORT || 3000
app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});