const { validationResult } = require('express-validator');
const commentService = require('../services/comment.service');
const likeService = require('../services/like.service');
const ApiError = require('../utils/ApiError');

const getComment = async (req, res, next) => {
  try {
    const commentId = req.params.comment_id;
    const comment = await commentService.getComment(
      req.user.role,
      commentId,
      req.user.id,
    );
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError('validation error', errors.array()));
    }
    const commentId = req.params.comment_id;
    const { content, status } = req.body;
    const comment = await commentService.updateComment(
      req.user.role,
      commentId,
      req.user.id,
      status,
      content,
    );
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const commentId = req.params.comment_id;
    await commentService.deleteComment(req.user.role, commentId, req.user.id);
    res.status(204).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    next(err);
  }
};

const createCommentLike = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError('validation error', errors.array()));
    }
    const commentId = req.params.comment_id;
    const { type } = req.body;
    const like = await likeService.createCommentLike(
      commentId,
      req.user.id,
      type,
    );
    res.status(201).json(like);
  } catch (err) {
    next(err);
  }
};

const getCommentLikes = async (req, res, next) => {
  try {
    const commentId = req.params.comment_id;
    const { type } = req.query;
    const likes = await likeService.getCommentlikes(commentId, type);
    res.status(200).json(likes);
  } catch (err) {
    next(err);
  }
};

const deleteCommentLike = async (req, res, next) => {
  try {
    const commentId = req.params.comment_id;
    await likeService.deleteCommentLike(req.user.id, commentId);
    res.status(204).json({ message: 'Post deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getComment,
  updateComment,
  deleteComment,
  createCommentLike,
  getCommentLikes,
  deleteCommentLike,
};
