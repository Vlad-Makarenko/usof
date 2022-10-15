const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Like",
    {
      type: {
        type: DataTypes.ENUM("like", "dislike"),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      updatedAt: false,
    }
  );
};
