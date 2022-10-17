const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define(
  'Category',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'There is no description here',
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
);
