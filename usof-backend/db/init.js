const mysql = require("mysql2");
const db = require("./sequelize.js");

module.exports = async () => {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
  const conn = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
  });
  await conn.promise().query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME};`);
  await db.sequelize.sync();
};
