const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define(
  'Favorite',
  {},
  {
    freezeTableName: true,
    updatedAt: false,
  },
);