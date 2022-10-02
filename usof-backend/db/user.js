const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      login: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(319),
        allowNull: false,
        unique: true,
      },
      profile_picture: {
        type: DataTypes.STRING,
        defaultValue: "default.png",
      },
      rating: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
      role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user",
      },
      is_Activated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
