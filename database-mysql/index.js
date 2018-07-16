// const Sequelize = require('sequelize');
// try {

//   config = require('./config.js')
// }


// catch(e) {
//   config = {
//     HOST    : process.env.CLEARDB_DATABASE_HOST,
//     USER    : process.env.CLEARDB_DATABASE_USER,
//     PASSWD  : process.env.CLEARDB_DATABASE_PASSWD,
//     DATABASE : process.env.CLEARDB_DATABASE,
//     CLIENT_ID: process.env.CLIENT_ID,
//     PORT: 3306
//   }
// }

// // to connect  mysql -u <username> -p -h us-cdbr-iron-east-04.cleardb.net

// try {
//   var sequelize = new Sequelize(config.DATABASE, config.USER, config.PASSWD, {
//   host: config.HOST,
//   dialect: 'mysql',
//   });

// }


// catch(e) {
//   console.log(e)
// }


////// JUST FOR TEST ---- for authentication part

var mysql = require('mysql');
try {

  config = require('./config.js')
}


catch(e) {
  config = {
    HOST    : process.env.CLEARDB_DATABASE_HOST,
    USER    : process.env.CLEARDB_DATABASE_USER,
    PASSWD  : process.env.CLEARDB_DATABASE_PASSWD,
    DATABASE : process.env.CLEARDB_DATABASE,
    CLIENT_ID: process.env.CLIENT_ID,
    PORT: 3306
  }
}
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : config.USER,
  password : config.PASSWD,
  database : config.DATABASE
});

var selectAll = function(callback) {
  connection.query('SELECT * FROM users', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};


var findUserId = function(userId, callback) {

  connection.query('SELECT * FROM users WHERE userId = ?', userId, function(err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results)
    }
  })
}

var insertUserId = function(userInfo, callback) {
  // userInfo = {sub: 1221233223, email:'abc@yahoo.com', username:'userABC'}

  connection.query('INSERT INTO users SET ?', userInfo, function(err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results)
    }
  })
}

module.exports = {
  selectAll: selectAll,
  findUserId: findUserId,
  insertUserId: insertUserId
}
