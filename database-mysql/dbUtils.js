var db = require('./connection.js');
var utils = require('../server/utils.js');
var cron = require('node-cron');

 // after all the tables get created, this should run every 6 hours to fetch the freshPrice from api and insert into productPrice table

var _sendEmailWhenThreshHoldMeet = function(itemId, id, name, freshPrice) {

  var emailBody = '';
  var email;
    db.UserProduct.find({where: {productId: id}}).then((userProduct) => {

      var threshold = userProduct.threshold
      var userId = userProduct.userId
      // console.log(`***** current saleprice is: ${freshPrice} for item: ${itemId} *** USER: ${userId} set a threshold= ******, ${userProduct.threshold}`)
      if (userProduct.threshold >= freshPrice) {
        db.User.find({where: {id:userId}}).then((users) => {
          email = users.get('email')
          emailBody += ` <p> Your watchlist item " ${name} " has hit the threshold ${threshold}. Current price is ${freshPrice} </p> <br/> `
          if (emailBody) {
            console.log('Sending email to: ', email)
            utils.sendEmail(email, emailBody)
          }
        })
      }
    })
  }



module.exports = {
  insertToProductPriceTable: function(product) {
    // chart gets data from productPrice table.
    var itemId = product ? product.itemId : null;
    var productToWatch = itemId ? {where: {itemId:itemId}} : {};

    // For each product in products table
      // 1- get the price from walmart api
      // 2- check if the price meets threshhold requiredment (in userPoduct)
      // 3- If no, do nothing. But if yes, then look for that user in users table in send email

    db.Product.findAll({}).then( (products) => {
      products.forEach( (product) => {
      var itemId = product.get('itemId');
      var id = product.get('id')
      var name = product.get('name')

      utils.routineFetcher(itemId, function(err, productPriceItems) {
        var freshPrice = productPriceItems.salePrice;
        // send email
        _sendEmailWhenThreshHoldMeet(itemId, id, name, freshPrice)

        db.ProductPrice.create({price: freshPrice}).then( (productPriceItem) => {
          product.addPrices(productPriceItem);
        });
      });
    })
  })

  },

  // use it like task.start()
  priceTrackerCron: cron.schedule('*/5 * * * *', function() {
    console.log('running cron job...')
    module.exports.insertToProductPriceTable()
  })
}

