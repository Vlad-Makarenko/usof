const mysql = require("mysql2");
const axios = require("axios").default;
const db = require("./sequelize.js");

const Category = db.sequelize.models.Category;

const bootStrapAll = async () => {
  const CategoryTitles = await bootStrapCategories();
  const CategoryObject = await bootStrapCategoryObject(CategoryTitles);
  await Category.bulkCreate(CategoryObject);
};

const bootStrapCategories = async () => {
  const data = await axios
    .get(
      `https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow`
    )
    .then((res) => res.data.items)
    .catch((err) => {
      console.log(err);
    });
  return data.map((title) => title.name);
};

/**
 *
 * @param {Array} titles
 * @return {Array}
 */
const bootStrapCategoryObject = async (titles) => {
  let bulkData = [];
  bulkData = Promise.all(
    titles.map(async (title) => {
      const data = await axios
        .get(
          `https://api.stackexchange.com/2.3/tags/${title}/wikis?site=stackoverflow`
        )
        .then((res) => res.data.items[0])
        .catch((err) => {
          console.log(err);
        });
      return {
        title,
        description: data?.excerpt || "There is no description here",
      };
    })
  );
  return bulkData;
};

module.exports = async () => {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
  const conn = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
  });
  await conn.promise().query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME};`);
  await db.sequelize.sync();
  await bootStrapAll();
};
