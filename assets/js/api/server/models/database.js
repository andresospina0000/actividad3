const Sequelize = require('sequelize');
const ProductModel = require('./products');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const db = {};
db.sequelize = sequelize;
db.Product = ProductModel(sequelize, Sequelize);

module.exports = sequelize;
