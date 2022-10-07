const postService = require("../services/post.service");
const { validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");

const createPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError("validation error", errors.array()));
    }
    const { title, content, categories } = req.body;
    const post = await postService.createPost(
      req.user.id,
      title,
      content,
      categories
    );
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const { page, category } = req.query;
    const posts = await postService.getAllPosts(req.user.role, page, category);

    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

const getPost = async (req, res, next) => {
  try {
    const postId = req.params.post_id;
    const post = await postService.getPost(req.user.role, postId, req.user.id);
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError("validation error", errors.array()));
    }
    const postId = req.params.post_id;
    const { title, content, categories, status } = req.body;
    const post = await postService.updatePost(
      req.user.role,
      postId,
      req.user.id,
      title,
      status,
      content,
      categories
    );
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.post_id;
    await postService.deletePost(req.user.role, postId, req.user.id);
    res.status(204).json({ message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const getPostCategories = async (req, res, next) => {
  try {
    const postId = req.params.post_id;
    const post = await postService.getPostCategories(postId);
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  getPostCategories,
};
