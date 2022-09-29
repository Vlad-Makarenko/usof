const { Sequelize } = require("sequelize");
const initUser = require("./user");
const initToken = require("./token.js");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
  }
);

const User = initUser(sequelize);
const Token = initToken(sequelize);

User.hasOne(Token);
Token.belongsTo(User);

module.exports = { sequelize };
