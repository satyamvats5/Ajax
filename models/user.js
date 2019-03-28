const Sequelize = require('sequelize');
const conn = require('../util/database');

const User = conn.define('user' , {
    user_id : {
        type : Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey :true,
        allowNull : false,
    },
    name : {
        type : Sequelize.STRING,
        allowNull: false
    },
    email : {
        type : Sequelize.STRING,
        unique : true
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false,
    }
} , {timestamps : true}, {underscored: true});

module.exports = User;