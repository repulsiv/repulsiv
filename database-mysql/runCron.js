var db = require('./connection.js');
var utils = require('../server/utils.js');
var cron = require('node-cron');

 // after all the tables get created, this should run every 6 hours to fetch the freshPrice from api and insert into productPrice table


module.exports = {

  task: cron.schedule('* * * * *', function() {
        console.log('running cron job...')
        db.Product.findAll({}).then( (products) => {
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
    })
  // use it like task.start()

}

