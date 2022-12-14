const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define(
  'Comment',
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
    },
  },
  {
    freezeTableName: true,
  },
);
