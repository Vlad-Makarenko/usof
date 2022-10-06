const db = require("../db/sequelize");
const sequelize = require("sequelize");
const ApiError = require("../utils/ApiError");

const User = db.sequelize.models.User;
const Post = db.sequelize.models.Post;
const Category = db.sequelize.models.Category;
const PostCategory = db.sequelize.models.PostCategory;
const limit = 5;

/**
 *
 * @param {Array} categories
 */
const checkCategories = async (categories) => {
  for (const category of categories) {
    const isExist = await Category.findOne({ where: { title: category } })
      .then((category) => category !== null)
      .then((isExist) => isExist);
    if (!isExist) {
      throw ApiError.BadRequestError(`Wrong category`);
    }
  }
};

/**
 *
 * @param {Array} categories
 */
const configurePostCategory = async (categories, PostId) => {
  const bulkPostCategory = [];
  for (const category of categories) {
    const CategoryCandidate = await Category.findOne({
      where: { title: category },
    });
    bulkPostCategory.push({
      PostId,
      CategoryId: CategoryCandidate.id,
    });
  }
  await PostCategory.bulkCreate(bulkPostCategory);
};

/**
 *
 * @param {Number} title
 * @param {String} title
 * @param {String} content
 * @param {Array} categories
 * @returns Post
 */
const createPost = async (UserId, title, content, categories = []) => {
  await checkCategories(categories);
  const post = await Post.create({ title, content, UserId });
  await configurePostCategory(categories, post.id);
  const resultPost = await Post.findOne({
    where: { id: post.id },
    include: [
      {
        model: Category,
        through: {
          attributes: [],
        },
        as: "categories",
      },
      {
        model: User,
        as: "author",
        attributes: ["login", "full_name", "profile_picture", "rating"],
      },
    ],
  });
  if (!resultPost) {
    throw ApiError.BadRequestError("Wrong request");
  }
  return resultPost;
};

/**
 *
 * @param {String} role
 * @param {Number} page
 * @param {String} category
 * @returns
 */
const getAllPosts = async (role, page = 1, category = "") => {
  const isExist = await Category.findOne({ where: { title: category } })
    .then((category) => category !== null)
    .then((isExist) => isExist);
  const offset = (page - 1) * limit;
  const allPosts = await Post.findAndCountAll({
    where: {
      ...(role === "public" || role === "user" ? { status: "active" } : {}),
      ...(category && isExist ? { "$categories.title$": category } : {}),
    },
    include: [
      {
        model: Category,
        through: {
          attributes: [],
        },
        as: "categories",
      },
      {
        model: User,
        as: "author",
        attributes: ["login", "full_name", "profile_picture", "rating"],
      },
    ],
    offset,
    limit,
    subQuery: false,
    group: ["Post.id"],
  });
  if (!allPosts) {
    throw ApiError.NothingFoundError();
  }
  const { count: totalPosts, rows: posts } = allPosts;
  return {
    totalPosts: totalPosts.length,
    currentPage: Number(page),
    totalPages: Math.ceil(totalPosts.length / limit),
    posts,
  };
};

/**
 *
 * @param {String} role
 * @param {Number} postId
 * @param {Number} userId
 * @returns
 */
const getPost = async (role, postId, userId) => {
  const post = await Post.findOne({
    where: {
      id: postId,
      ...(role === "public"
        ? { status: "active" }
        : {
            [sequelize.Op.or]: [
              { status: "active" },
              {
                status: "inactive",
                ...(role === "user" ? { UserId: userId } : {}),
              },
            ],
          }),
    },
    include: [
      {
        model: Category,
        through: {
          attributes: [],
        },
        as: "categories",
      },
      {
        model: User,
        as: "author",
        attributes: ["login", "full_name", "profile_picture", "rating"],
      },
    ],
  });
  if (!post) {
    throw ApiError.NothingFoundError();
  }
  return {
    ...post.dataValues,
    isEdited: post.createdAt.toString() !== post.updatedAt.toString(),
  };
};

/**
 *
 * @param {String} role
 * @param {Number} postId
 * @param {Number} userId
 * @param {String} title
 * @param {String} content
 * @param {Array} categories
 * @returns
 */
const updatePost = async (
  role,
  postId,
  userId,
  title = "",
  status = "active",
  content = "",
  categories = []
) => {
  const post = await Post.findOne({ where: { id: postId } });
  if (!post) {
    throw ApiError.BadRequestError("Wrong request");
  }
  const owner = userId === post.UserId;
  if (owner || role === "admin") {
    await checkCategories(categories);
    await PostCategory.destroy({ where: { PostId: postId } });
    await configurePostCategory(categories, post.id);
    post.status = status;
    if (owner) {
      post.content = content;
      post.title = title;
    }
    await post.save();
  } else {
    throw ApiError.ForbiddenError("Only owner cat do this");
  }

  return post;
};

/**
 *
 * @param {String} role
 * @param {Number} postId
 * @param {Number} userId
 */
const deletePost = async (role, postId, userId) => {
  const post = await Post.findOne({ where: { id: postId } });
  if (!post) {
    throw ApiError.BadRequestError("Wrong request");
  }
  const owner = userId === post.UserId;
  if (owner || role === "admin") {
    await post.destroy();
  } else {
    throw ApiError.ForbiddenError("Only owner cat do this");
  }
};

const getPostCategories = async (postId) => {
  const post = await Post.findOne({
    where: {
      id: postId,
    },
    include: [
      {
        model: Category,
        through: {
          attributes: [],
        },
        as: "categories",
      },
    ],
  });
  if (!post) {
    throw ApiError.NothingFoundError();
  }
  return {
    categories: post.categories,
    post: { ...post.dataValues, categories: undefined },
  };
};

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  getPostCategories,
};
