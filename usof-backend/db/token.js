const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define(
  'Token',
  {
    accessToken: {
      type: DataTypes.STRING(333),
      allowNull: false,
      unique: true,
    },
    refreshToken: {
      type: DataTypes.STRING(333),
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
);
