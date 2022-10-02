const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "token",
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
    }
  );
};
