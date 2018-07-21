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
  socketPath: '/tmp/mysql.sock',
  user     : config.USER,
  password : config.PASSWD,
  database : 'test'//config.DATABASE
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
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
  connection.query('SELECT * FROM users WHERE token = ?', userId, function(err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results)
    }
  })
}


var insertUserId = function(userInfo, callback) {

  var token = userInfo.userid;
  var userName = userInfo.username;
  var email = userInfo.email;

  connection.query("INSERT INTO users (token, userName, email) VALUES ('" + token + "', '" + userName + "', '" + email + "')",  function(err, results, fields) {
    if (err) {
      console.log('Failed to insert ', err);
      callback(err, null);
    } else {
      console.log('Insert userID success ', results);
      callback(null, results)
    }
  })
}

var insertProduct = function(product, callback) {
  var userToken = product.sub;
  console.log(userToken);
  connection.query('SELECT id FROM users WHERE token = ' + userToken, function(err, result) {
    console.log(result);
    if (err) {
      callback(err, null);
    } else {

    var productInfo  = {
      itemId: product.productToWatch.itemId,
      productName: product.productToWatch.name,
      salesPrice: product.productToWatch.salePrice,
      threshHoldPrice: product.threshold,
      user_id: result[0].id
    };

    console.log(productInfo);

    connection.query('INSERT INTO products SET ?', productInfo, function(err, result, fields) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    })
  }
  })

}

module.exports = {
  selectAll: selectAll,
  findUserId: findUserId,
  insertUserId: insertUserId,
  insertProduct: insertProduct
}




