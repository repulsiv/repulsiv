var db = require('./connection.js');
var utils = require('../server/utils.js');
var cron = require('node-cron');

 // after all the tables get created, this should run every 6 hours to fetch the freshPrice from api and insert into productPrice table

module.exports = {
  insertToProductPriceTable: function(product) {
    // chart gets data from productPrice table.
    var itemId = product.itemId
    var productToWatch = itemId ? {where: {itemId:itemId}} : {}
    db.Product.findAll(productToWatch).then( (products) => {
      products.forEach( (product) => {
        var itemId = product.get('itemId');
        utils.routineFetcher(itemId, function(err, productPriceItems){
          var freshPrice = productPriceItems.salePrice;
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

