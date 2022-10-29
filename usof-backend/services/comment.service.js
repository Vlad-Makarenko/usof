const sequelize = require('sequelize');
const db = require('../db/sequelize');
const ApiError = require('../utils/ApiError');

const { User } = db.sequelize.models;
const { Post } = db.sequelize.models;
const { Comment } = db.sequelize.models;

/**
 *
 * @param {String} role
 * @param {Number} commentId
 * @param {Number} userId
 * @returns
 */
const getComment = async (role, commentId, userId) => {
  const comment = await Comment.findOne({
    where: {
      id: commentId,
      ...(role === 'public'
        ? { status: 'active' }
        : {
            [sequelize.Op.or]: [
              { status: 'active' },
              {
                status: 'inactive',
                ...(role === 'user' ? { UserId: userId } : {}),
              },
            ],
          }),
    },
    attributes: [
      'id',
      'content',
      'createdAt',
      'updatedAt',
      [
        sequelize.literal(`(
					SELECT COUNT(like.id)
					FROM \`like\`
					WHERE like.CommentId = Comment.id
          AND like.type = 'like'
				)`),
        'likeCount',
      ],
    ],
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'content', 'status'],
      },
      {
        model: User,
        as: 'author',
        attributes: ['login', 'full_name', 'profile_picture', 'rating'],
      },
    ],
  });
  if (!comment) {
    throw ApiError.NothingFoundError();
  }
  return {
    ...comment.dataValues,
    isEdited: comment.createdAt.toString() !== comment.updatedAt.toString(),
  };
};

/**
 *
 * @param {String} role
 * @param {Number} commentId
 * @param {Number} userId
 * @param {String} title
 * @param {String} content
 * @param {Array} categories
 * @returns
 */
const updateComment = async (
  role,
  commentId,
  userId,
  status = 'active',
  content = '',
) => {
  const comment = await Comment.findOne({ where: { id: commentId } });
  if (!comment) {
    throw ApiError.BadRequestError('Wrong request');
  }
  const owner = userId === comment.UserId;
  if (owner || role === 'admin') {
    comment.status = status;
    if (owner) {
      comment.content = content;
    }
    await comment.save();
  } else {
    throw ApiError.ForbiddenError('Only owner can do this');
  }

  return comment;
};

/**
 *
 * @param {String} role
 * @param {Number} commentId
 * @param {Number} userId
 */
const deleteComment = async (role, commentId, userId) => {
  const comment = await Comment.findOne({ where: { id: commentId } });
  if (!comment) {
    throw ApiError.BadRequestError('Wrong request');
  }
  const owner = userId === comment.UserId;
  if (owner || role === 'admin') {
    await comment.destroy();
  } else {
    throw ApiError.ForbiddenError('Only owner can do this');
  }
};

const createComment = async (PostId, UserId, content) => {
  const isExist = await Post.findOne({
    where: { id: PostId, status: 'active' },
  }).then((category) => category !== null);
  if (!isExist) {
    throw ApiError.BadRequestError('Wrong request');
  }
  const comment = await Comment.create({ PostId, content, UserId });
  if (!comment) {
    throw ApiError.BadRequestError('Wrong request');
  }
  return comment;
};

const getPostComments = async (PostId, role, UserId) => {
  const comments = await Comment.findAll({
    where: {
      PostId,
      ...(role === 'public'
        ? { status: 'active' }
        : {
            [sequelize.Op.or]: [
              { status: 'active' },
              {
                status: 'inactive',
                ...(role === 'user' ? { UserId } : {}),
              },
            ],
          }),
    },
    attributes: [
      'id',
      'content',
      'createdAt',
      [
        sequelize.literal(`(
					SELECT COUNT(like.id)
					FROM \`like\`
					WHERE like.CommentId = Comment.id
          AND like.type = 'like'
				)`),
        'likeCount',
      ],
    ],
    include: {
      model: User,
      as: 'author',
      attributes: ['id', 'login', 'full_name', 'profile_picture', 'rating'],
    },
  });

  // if (!comments.length) {
  //   throw ApiError.NothingFoundError();
  // }
  return comments;
};

module.exports = {
  getComment,
  updateComment,
  deleteComment,
  createComment,
  getPostComments,
};
