const sequelize = require('sequelize');

const dbconfig = require('../config/dbConfig');

const sequelize_connection = new sequelize(dbconfig.db_name, dbconfig.root, dbconfig.password, {
    host: dbconfig.host,
    dialect: 'mysql',
    operatorsAliases: false,
});

module.exports = sequelize_connection;