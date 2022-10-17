const { validationResult } = require('express-validator');
const postService = require('../services/post.service');
const commentService = require('../services/comment.service');
const likeService = require('../services/like.service');
const ApiError = require('../utils/ApiError');

const createPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError('validation error', errors.array()));
    }
    const { title, content, categories } = req.body;
    const post = await postService.createPost(
      req.user.id,
      title,
      content,
      categories,
    );
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const { page, categories, sort, date } = req.query;
    const posts = await postService.getAllPosts(
      req.user.id,
      req.user.role,
      page,
      categories,
      sort,
      date,
    );

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
      return next(ApiError.BadRequestError('validation error', errors.array()));
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
      categories,
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
    res.status(204).json({ message: 'Post deleted successfully' });
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

const createPostComment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError('validation error', errors.array()));
    }
    const postId = req.params.post_id;
    const { content } = req.body;
    const comment = await commentService.createComment(
      postId,
      req.user.id,
      content,
    );
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

const getPostComments = async (req, res, next) => {
  try {
    const postId = req.params.post_id;
    const comments = await commentService.getPostComments(
      postId,
      req.user.role,
      req.user.id,
    );
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

const createPostLike = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError('validation error', errors.array()));
    }
    const postId = req.params.post_id;
    const { type } = req.body;
    const like = await likeService.createPostLike(postId, req.user.id, type);
    res.status(201).json(like);
  } catch (err) {
    next(err);
  }
};

const getPostLikes = async (req, res, next) => {
  try {
    const postId = req.params.post_id;
    const { type } = req.query;
    const likes = await likeService.getPostlikes(postId, type);
    res.status(200).json(likes);
  } catch (err) {
    next(err);
  }
};

const deletePostLike = async (req, res, next) => {
  try {
    const postId = req.params.post_id;
    await likeService.deletePostLike(req.user.id, postId);
    res.status(204).json({ message: 'Like deleted successfully' });
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
  createPostComment,
  getPostComments,
  createPostLike,
  getPostLikes,
  deletePostLike,
};
