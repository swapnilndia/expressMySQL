const Sequelize = require('sequelize');

const sequelize = new Sequelize('testDB', 'root', 'Swapnil@24', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;