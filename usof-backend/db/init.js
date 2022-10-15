const mysql = require("mysql2");
const axios = require("axios").default;
const db = require("./sequelize.js");

const users = require("./boot_data/Users.json");
const posts = require("./boot_data/Posts.json");
const comments = require("./boot_data/Comments.json");
const likes = require("./boot_data/Likes.json");
const postCategories = require("./boot_data/PostCategories.json");

const User = db.sequelize.models.User;
const Post = db.sequelize.models.Post;
const Comment = db.sequelize.models.Comment;
const Category = db.sequelize.models.Category;
const PostCategory = db.sequelize.models.PostCategory;
const Like = db.sequelize.models.Like;

const bootStrapAll = async () => {
  const CategoryTitles = await bootStrapCategories();
  const CategoryObject = await bootStrapCategoryObject(CategoryTitles);
  await Category.bulkCreate(CategoryObject, { ignoreDuplicates: true }).catch(
    (err) => console.log(err)
  );
  await User.bulkCreate(users, { ignoreDuplicates: true }).catch((err) =>
    console.log(err)
  );
  await Post.bulkCreate(posts, { ignoreDuplicates: true }).catch((err) =>
    console.log(err)
  );
  await Comment.bulkCreate(comments, { ignoreDuplicates: true }).catch((err) =>
    console.log(err)
  );
  await PostCategory.bulkCreate(postCategories, {
    ignoreDuplicates: true,
  }).catch((err) => console.log(err));
  await Like.bulkCreate(likes, { ignoreDuplicates: true }).catch((err) =>
    console.log(err)
  );
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
  // await db.sequelize.sync({ force: true });
  await db.sequelize.sync();
  await bootStrapAll();
};
