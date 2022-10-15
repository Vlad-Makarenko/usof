const db = require("../db/sequelize");
const sequelize = require("sequelize");
const ApiError = require("../utils/ApiError");

const User = db.sequelize.models.User;
const Post = db.sequelize.models.Post;
const Comment = db.sequelize.models.Comment;
const Like = db.sequelize.models.Like;

const updateRating = async (type, UserId, count = 1) => {
  type === "like"
    ? await User.update(
        { rating: sequelize.literal(`rating + ${count}`) },
        { where: { id: UserId } }
      )
    : await User.update(
        { rating: sequelize.literal(`rating - ${count}`) },
        { where: { id: UserId } }
      );
};

const createPostLike = async (PostId, UserId, type) => {
  const post = await Post.findOne({ where: { id: PostId, status: "active" } });
  if (!post) {
    throw ApiError.BadRequestError("Wrong request");
  }
  let like = await Like.findOne({ where: { PostId, UserId } });
  if (!like) {
    like = await Like.create({ PostId, type, UserId });
    if (post.UserId != UserId) {
      await updateRating(type, post.UserId);
    }
  } else if (like.type != type) {
    like.type = type;
    await like.save();
    if (post.UserId != UserId) {
      await updateRating(type, post.UserId, 2);
    }
  } else {
    throw ApiError.BadRequestError("Wrong request");
  }

  return like;
};

const getPostlikes = async (PostId, type) => {
  const likes = await Like.findAll({
    where: {
      PostId: PostId,
      ...(type ? { type } : {}),
    },
    include: {
      model: User,
      as: "author",
      attributes: ["login", "full_name", "profile_picture", "rating"],
    },
  });

  if (!likes.length) {
    throw ApiError.NothingFoundError();
  }
  return likes;
};

const deletePostLike = async (UserId, PostId) => {
  const post = await Post.findOne({ where: { id: PostId, status: "active" } });
  if (!post) {
    throw ApiError.BadRequestError("Wrong request");
  }
  const like = await Like.findOne({ where: { UserId, PostId } });
  if (!like) {
    throw ApiError.BadRequestError("Wrong request");
  }
  if (post.UserId != UserId) {
    if (like.type === "like") {
      await updateRating("dislike", post.UserId);
    } else {
      await updateRating("like", post.UserId);
    }
  }
  await like.destroy();
};

const createCommentLike = async (CommentId, UserId, type) => {
  const comment = await Comment.findOne({
    where: { id: CommentId, status: "active" },
  });
  if (!comment) {
    throw ApiError.BadRequestError("Wrong request");
  }
  let like = await Like.findOne({ where: { CommentId, UserId } });
  if (!like) {
    like = await Like.create({ CommentId, type, UserId });
    if (comment.UserId != UserId) {
      await updateRating(type, comment.UserId);
    }
  } else if (like.type != type) {
    like.type = type;
    await like.save();
    if (comment.UserId != UserId) {
      await updateRating(type, comment.UserId, 2);
    }
  } else {
    throw ApiError.BadRequestError("Wrong request");
  }

  return like;
};

const getCommentlikes = async (CommentId, type) => {
  const likes = await Like.findAll({
    where: {
      CommentId: CommentId,
      ...(type ? { type } : {}),
    },
    include: {
      model: User,
      as: "author",
      attributes: ["login", "full_name", "profile_picture", "rating"],
    },
  });

  if (!likes.length) {
    throw ApiError.NothingFoundError();
  }
  return likes;
};

const deleteCommentLike = async (UserId, CommentId) => {
  const comment = await Comment.findOne({
    where: { id: CommentId, status: "active" },
  });
  if (!comment) {
    throw ApiError.BadRequestError("Wrong request");
  }
  const like = await Like.findOne({ where: { UserId, CommentId } });
  if (!like) {
    throw ApiError.BadRequestError("Wrong request");
  }
  if (comment.UserId != UserId) {
    if (like.type === "like") {
      await updateRating("dislike", comment.UserId);
    } else {
      await updateRating("like", comment.UserId);
    }
  }
  await like.destroy();
};

module.exports = {
  createPostLike,
  getPostlikes,
  deletePostLike,
  createCommentLike,
  getCommentlikes,
  deleteCommentLike,
};
