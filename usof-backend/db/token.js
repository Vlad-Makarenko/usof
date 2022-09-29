const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  return sequelize.define(
    "token",
    {
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      
    },
    {
      timestamps: false,
    }
  );
};