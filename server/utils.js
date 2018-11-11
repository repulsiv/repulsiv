const request = require('request');
const nodemailer = require('nodemailer');

try {
  var config = require('./config.js');
}

catch(e) {
  config = {
    WALMART_APIKEY: process.env.WALMART_APIKEY
  }
}


var _objFilter = function(product) {
  var result = {};
  var keys = ['itemId', 'name', 'msrp', 'salePrice', 'shortDescription', 'brandName', 'mediumImage', 'largeImage', 'productUrl', 'customerRating', 'numReviews'];
  for (key of keys) {
    result[key] = product[key];
  }
  return result;
}

module.exports = {
  routineFetcher: function(itemId, callback) {
    // calls
    // this function is invoked by cron job
    // it calls Walmart API (endpoint: v1/items/id) with the itemId and fetches price
    // it then
      // 1- augments this price data with other pieces itemId, userId(sub), time(when fetched)
      // 2- writes to db as: price, itemId, userId(sub), time(when fetched)
    // exg: http://api.walmartlabs.com/v1/items/10789576?format=json&apiKey=<api_key>

    let uri = 'http://api.walmartlabs.com/';
    let endpoint = 'v1/items';
    let query = '/'+ itemId + '?format=json&apiKey=' + config.WALMART_APIKEY;
    let url = uri + endpoint + query

    request.get(url, (err, response, body) => {
      if (!err && response.statusCode === 200) {
        var product = JSON.parse(body)
        product = _objFilter(product)
        callback(null, product)
      }
    })
  },


  onRequestFetcher: (productName, callback) => {
    // calls Walmart Search API (v1/search) with the productName
    // returns back to client // no need to save
    // exg: http://api.walmartlabs.com/v1/search?query=ipod&format=json&apiKey=<api_key>
    if (!config || config.WALMART_APIKEY === '') callback("key not found", null)
    let uri = 'http://api.walmartlabs.com/';
    let endpoint = 'v1/search';
    let query = '?query='+ productName + '&format=json&apiKey=' + config.WALMART_APIKEY;
    let url = uri + endpoint + query

    // by default it sorts with 'relevance' and returns only 10 items (numItems=10)
    request.get(url, function(err, response, body) {
      if (!err && response.statusCode === 200) {
        var products = JSON.parse(body)
        products = products.items.map((product) => {
          return _objFilter(product);
        })
        // console.log(products)
        // products.items is an array of items
        callback(null, products)
      }
    })
  },


   sendEmail: (userEmail, emailBody) => {
    var transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
        user: config.EMAIL_USER, //repulsiv.hr@gmail.com
        pass: config.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: config.EMAIL_USER,
      to: userEmail,
      subject: 'Product Info from Repulsiv',
      html: emailBody
    };

    transporter.sendMail(mailOptions, function (err, info) {
       if(err)
        console.log(err)
       else
        console.log(info);
    });
  }
}


// module.exports.onRequestFetcher('iwatch', (products) => {
//   console.log(products)
// })


// module.exports.routineFetcher('10789576', (product)=> {
  // console.log(product)
// })

