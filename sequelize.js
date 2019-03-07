const sequelize = require('sequelize');
const dbString = require('./config/development');

const dbCon = new sequelize(dbString.mysqlConnection.database,dbString.mysqlConnection.userName,dbString.mysqlConnection.password, {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: true
});

dbCon.authenticate().then(() => {
    console.log('DB connection Success ');
}).catch(err => {
    console.log('Error while connecting db');
});

const db = {};

db.sequelize = sequelize;
db.dbCon = dbCon;

// models
db.city = require('./models/city')(dbCon, sequelize);
db.language = require('./models/countryLanguage')(dbCon, sequelize);
db.country = require('./models/country')(dbCon, sequelize);

// relations
db.country.hasMany(db.city);

module.exports = db;

