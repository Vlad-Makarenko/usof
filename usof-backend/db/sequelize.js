const { Sequelize } = require('sequelize');
const initUser = require('./User');
const initToken = require('./Token');
const initPost = require('./Post');
const initCategory = require('./Category');
const initComment = require('./Comment');
const initLike = require('./Like');

require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    // logging: false,
  },
);

const User = initUser(sequelize);
const Token = initToken(sequelize);
const Post = initPost(sequelize);
const Category = initCategory(sequelize);
const Comment = initComment(sequelize);
const Like = initLike(sequelize);

User.hasOne(Token);
User.hasMany(Post);
User.hasMany(Comment);
User.hasMany(Like);

Token.belongsTo(User);

Post.belongsToMany(Category, { through: 'PostCategory', as: 'categories' });
Post.belongsTo(User, { as: 'author', foreignKey: 'UserId' });
Post.hasMany(Comment);
Post.hasMany(Like);

Category.belongsToMany(Post, { through: 'PostCategory', as: 'posts' });

Comment.belongsTo(User, { as: 'author', foreignKey: 'UserId' });
Comment.belongsTo(Post);
Comment.hasMany(Like);

Like.belongsTo(Post);
Like.belongsTo(Comment);
Like.belongsTo(User, { as: 'author', foreignKey: 'UserId' });

module.exports = { sequelize };
