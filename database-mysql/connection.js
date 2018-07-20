const Sequelize = require('sequelize');

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

// to connect  mysql -u <username> -p -h us-cdbr-iron-east-04.cleardb.net

try {
  var sequelize = new Sequelize(config.DATABASE, config.USER, config.PASSWD, {
  host: config.HOST,
  dialect: 'mysql',
 });
}
catch(e) {
  console.log(e)
}


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const User = sequelize.define('user', {
  uid: {
    type: Sequelize.STRING, allowNull: false
  },
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  }
}, {
  timestamps: true,
  createdAt: false,
  updatedAt: 'time',
});


const Product = sequelize.define('product',  {
  itemId: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
  },
   msrp: {
    type: Sequelize.FLOAT
  },
   salePrice: {
    type: Sequelize.FLOAT
  },
   shortDescription: {
    type: Sequelize.TEXT
  },
   brandName: {
    type: Sequelize.STRING
  },
   mediumImage: {
    type: Sequelize.TEXT
  },
   largeImage: {
    type: Sequelize.TEXT
  },
   productUrl: {
    type: Sequelize.TEXT
  },
   customerRating: {
    type: Sequelize.FLOAT
  },
   numReviews: {
    type: Sequelize.INTEGER
  },

}, {
  timestamps: true,
  createdAt: false,
  updatedAt: 'time',
});


const UserProduct = sequelize.define('userProduct', {
  threshold: {type:  Sequelize.FLOAT}
  // id: {type  Sequelize.INTEGER, primaryKey:true, autoIncrement:true}
}, {
  timestamps: true,
  createdAt: false,
  updatedAt: 'time',
})


const ProductPrice = sequelize.define('productPrice', {
  price: {type: Sequelize.FLOAT }
 }, {
  timestamps: true,
  updatedAt: false
})

// Note: order does matter!!
// Initializing and creating tables
User.sync();
Product.sync();

User.belongsToMany(Product, { through: UserProduct })
Product.belongsToMany(User, { through:  UserProduct })

Product.hasMany(ProductPrice, {as: 'Prices'});


UserProduct.sync();
ProductPrice.sync();

module.exports = {
  User: User,
  Product: Product,
  UserProduct: UserProduct,
  sequelize: sequelize,
  ProductPrice: ProductPrice
}


