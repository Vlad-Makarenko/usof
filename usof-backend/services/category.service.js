const db = require("../db/sequelize");
const ApiError = require("../utils/ApiError");

const User = db.sequelize.models.User;
const Post = db.sequelize.models.Post;
const Category = db.sequelize.models.Category;
const PostCategory = db.sequelize.models.PostCategory;

const getAllCategories = async () => {
  const categories = await Category.findAll();
  if (!categories) {
    throw ApiError.NothingFoundError();
  }
  return categories;
};

const getCategory = async (id) => {
  const category = await Category.findByPk(id);
  if (!category) {
    throw ApiError.NothingFoundError();
  }
  return category;
};

const createCategory = async (title, description) => {
  const category = await Category.create({ title, description });
  if (!category) {
    throw ApiError.BadRequestError("Wrong request");
  }
  return category;
};

const updateCategory = async (categoryId, title, description) => {
  const category = await Category.findByPk(categoryId);
  if (!category) {
    throw ApiError.BadRequestError("Wrong category");
  }
  category.title = title || category.title;
  category.description = description || category.description;
  await category.save();
  return category;
};

const deleteCategory = async (id) => {
  await Category.destroy({ where: { id } });
};

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
