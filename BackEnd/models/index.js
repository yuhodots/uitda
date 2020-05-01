
/* sequelize\models\index.js */
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password,config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.users = require('./users')(sequelize, Sequelize);
db.market_board = require('./market_board')(sequelize, Sequelize);
db.market_files = require('./market_files')(sequelize, Sequelize);
db.networking_board = require('./networking_board')(sequelize, Sequelize);
db.networking_files = require('./networking_files')(sequelize, Sequelize);
db.cal_events = require('./cal_events')(sequelize, Sequelize);
db.proposal = require('./proposal')(sequelize, Sequelize);
db.comment = require('./comment')(sequelize, Sequelize);
db.guest = require('./guest')(sequelize, Sequelize);
db.chatting_room = require('./chatting_room')(sequelize, Sequelize);
db.chatting_message = require('./chatting_message')(sequelize, Sequelize);
db.chatting_files = require('./chatting_files')(sequelize, Sequelize);
db.likey = require('./likey')(sequelize, Sequelize);
db.notification = require('./notification')(sequelize, Sequelize);

module.exports = db;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
