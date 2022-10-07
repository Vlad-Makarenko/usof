const categoryService = require("../services/category.service");
const postService = require("../services/post.service");
const { validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");

const createCategory = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError("validation error", errors.array()));
    }
    const { title, description } = req.body;
    const category = await categoryService.createCategory(title, description);
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.category_id;
    const category = await categoryService.getCategory(categoryId);
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError("validation error", errors.array()));
    }
    const categoryId = req.params.category_id;
    const { title, description } = req.body;
    const category = await categoryService.updateCategory(
      categoryId,
      title,
      description
    );
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.category_id;
    await categoryService.deleteCategory(categoryId);
    res.status(204).json({ message: "Category deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const getPostsByCategory = async (req, res, next) => {
  try {
    const { page } = req.query;
    const categoryId = req.params.category_id;
    const posts = await postService.getAllPosts(
      req.user.role,
      page,
      categoryId,
      true
    );
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getPostsByCategory,
};
