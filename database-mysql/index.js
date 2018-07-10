const Sequelize = require('sequelize');
try {
  const config = require('./config.js')
}

catch(e) {
  config = {
    HOST    : process.env.MYSQL_HOST,
    USER    : process.env.MYSQL_USER,
    PASSWD  : process.env.MYSQL_PASSWD,
    DATABASE : process.env.MYSQL_DB
  }
}


const sequelize = new Sequelize(config.DATABASE, config.USER, config.PASSWD, {
  host: config.HOST,
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