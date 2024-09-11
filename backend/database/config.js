const { Sequelize } = require('sequelize');

//-----CON .NET---------------

//-------------CON PHP ADMIN-------------

const dbConnection = new Sequelize(
  {
    dialect: 'mysql',
    host: 'localhost',
    port: '3306',
    username: 'root',
    //password: 'Caleb19',
    password: '',
    database: 'gustov'
  }
);


module.exports = dbConnection;