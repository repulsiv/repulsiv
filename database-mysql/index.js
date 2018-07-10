const Sequelize = require('sequelize');
try {

  config = require('./config.js')
}


catch(e) {
  config = {
    HOST    : process.env.CLEARDB_DATABASE_HOST,
    USER    : process.env.CLEARDB_DATABASE_USER,
    PASSWD  : process.env.CLEARDB_DATABASE_PASSWD,
    DATABASE : process.env.CLEARDB_DATABASE
  }
}

// to connect  mysql -u <username> -p -h us-cdbr-iron-east-04.cleardb.net


const sequelize = new Sequelize(config.DATABASE, config.USER, config.PASSWD, {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});

sequelize.sync()
  .then(() => User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });


module.exports.User = User;