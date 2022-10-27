const sequelize = require('sequelize');
const db = require('../db/sequelize');
const ApiError = require('../utils/ApiError');

const { User } = db.sequelize.models;
const { Post } = db.sequelize.models;
const { Category } = db.sequelize.models;
const { PostCategory } = db.sequelize.models;
const { Favorite } = db.sequelize.models;
const limit = 10;

const checkCategories = async (categories) => {
  for (const category of categories) {
    const isExist = await Category.findOne({ where: { title: category } }).then(
      (category) => category !== null,
    );
    if (!isExist) {
      throw ApiError.BadRequestError(`Wrong category`);
    }
  }
};

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
        as: 'categories',
      },
      {
        model: User,
        as: 'author',
        attributes: ['login', 'full_name', 'profile_picture', 'rating'],
      },
    ],
  });
  if (!resultPost) {
    throw ApiError.BadRequestError('Wrong request');
  }
  return resultPost;
};

const AddToFavorite = async (UserId, PostId) => {
  const isAdded = await Favorite.findOne({ where: { PostId, UserId } });
  if (isAdded) {
    throw ApiError.BadRequestError('Post is already added');
  }
  const conection = await Favorite.create({ UserId, PostId });
  if (!conection) {
    throw ApiError.BadRequestError('Wrong request');
  }
  return conection;
};

const getAllPosts = async (
  userId,
  role,
  page = 1,
  categoriesStr,
  sort = 'likeCount,desc',
  dateInterval,
  byUser,
  force,
) => {
  let categories;
  if (categoriesStr || force) {
    categories = categoriesStr.split(',');
    for (const category of categories) {
      const isExist = await Category.findOne({ where: { id: category } }).then(
        (category) => category !== null,
      );
      if (!isExist) {
        throw ApiError.BadRequestError(`Wrong category`);
      }
    }
  }
  const offset = (page - 1) * limit;
  const oreder = sort.split(',')[0];
  const direction = sort.split(',')[1] || 'DESC';
  const allPosts = await Post.findAndCountAll({
    where: {
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
      ...(dateInterval
        ? {
            createdAt: {
              [sequelize.Op.lt]: new Date(),
              [sequelize.Op.gt]: new Date(Number(dateInterval)),
            },
          }
        : {}),
      ...(byUser ? { UserId: byUser } : {}),
    },
    attributes: [
      'id',
      'title',
      'content',
      'createdAt',
      [
        sequelize.literal(`(
					SELECT COUNT(like.id)
					FROM \`like\`
					WHERE like.PostId = post.id
          AND like.type = 'like'
				)`),
        'likeCount',
      ],
      [
        sequelize.literal(`(
          SELECT COUNT(comment.id)
          FROM comment
          WHERE comment.PostId = post.id
        )`),
        'answerCount',
      ],
    ],
    include: [
      {
        model: Category,
        through: {
          attributes: [],
        },
        ...(categoriesStr || force
          ? { where: { id: { [sequelize.Op.in]: categories } } }
          : {}),
        as: 'categories',
      },
      {
        model: User,
        as: 'author',
        attributes: ['id', 'login', 'full_name', 'profile_picture', 'rating'],
      },
    ],
    ...(page > 0 ? { offset } : {}),
    ...(page > 0 ? { limit } : {}),
    subQuery: false,
    ...(page > 0 ? { group: ['Post.id'] } : {}),
    order: [[oreder, direction]],
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

const getFavorites = async (
  userId,
  page = 1,
  categoriesStr,
  sort = 'likeCount,desc',
  dateInterval,
) => {
  let categories;
  if (categoriesStr) {
    categories = categoriesStr.split(',');
    for (const category of categories) {
      const isExist = await Category.findOne({ where: { id: category } }).then(
        (category) => category !== null,
      );
      if (!isExist) {
        throw ApiError.BadRequestError(`Wrong category`);
      }
    }
  }
  const offset = (page - 1) * limit;
  const oreder = sort.split(',')[0];
  const direction = sort.split(',')[1] || 'DESC';
  const allPosts = await Favorite.findAndCountAll({
    where: {
      UserId: userId,
    },
    attributes: [
      [
        sequelize.literal(`(
        SELECT COUNT(like.id)
        FROM \`like\`
        WHERE like.PostId = favorite.PostId
        AND like.type = 'like'
      )`),
        'likeCount',
      ],
    ],
    include: [
      {
        model: Post,
        where: {
          ...(dateInterval
            ? {
                createdAt: {
                  [sequelize.Op.lt]: new Date(),
                  [sequelize.Op.gt]: new Date(Number(dateInterval)),
                },
              }
            : {}),
        },
        attributes: [
          'id',
          'title',
          'content',
          'createdAt',
          [
            sequelize.literal(`(
              SELECT COUNT(like.id)
              FROM \`like\`
              WHERE like.PostId = post.id
              AND like.type = 'like'
            )`),
            'likeCount',
          ],
        ],
        include: [
          {
            model: Category,
            through: {
              attributes: [],
            },
            where: {
              ...(categoriesStr
                ? { id: { [sequelize.Op.in]: categories } }
                : {}),
            },
            as: 'categories',
          },
          {
            model: User,
            as: 'author',
            attributes: ['id', 'login', 'full_name', 'profile_picture', 'rating'],
          },
        ],
      },
    ],
    offset,
    limit,
    subQuery: false,
    group: ['Post.id'],
    order: [[oreder, direction]],
  });
  if (!allPosts) {
    throw ApiError.NothingFoundError();
  }
  const { count: totalPosts, rows: posts } = allPosts;
  return {
    totalPosts: totalPosts.length,
    currentPage: Number(page),
    totalPages: Math.ceil(totalPosts.length / limit),
    posts: posts.map((post) => {
      return { ...post.dataValues, likeCount: undefined };
    }),
  };
};

const getPost = async (role, postId, userId) => {
  const post = await Post.findOne({
    where: {
      id: postId,
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
      'title',
      'content',
      'createdAt',
      'updatedAt',
      [
        sequelize.literal(`(
					SELECT COUNT(like.id)
					FROM \`like\`
					WHERE like.PostId = post.id
          AND like.type = 'like'
				)`),
        'likeCount',
      ],
    ],
    include: [
      {
        model: Category,
        through: {
          attributes: [],
        },
        as: 'categories',
      },
      {
        model: User,
        as: 'author',
        attributes: ['id', 'login', 'full_name', 'profile_picture', 'rating'],
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

const updatePost = async (
  role,
  postId,
  userId,
  title = '',
  status = 'active',
  content = '',
  categories = [],
) => {
  const post = await Post.findOne({ where: { id: postId } });
  if (!post) {
    throw ApiError.BadRequestError('Wrong request');
  }
  const owner = userId === post.UserId;
  if (owner || role === 'admin') {
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
    throw ApiError.ForbiddenError('Only owner can do this');
  }

  return post;
};

const deletePost = async (role, postId, userId) => {
  const post = await Post.findOne({ where: { id: postId } });
  if (!post) {
    throw ApiError.BadRequestError('Wrong request');
  }
  const owner = userId === post.UserId;
  if (owner || role === 'admin') {
    await post.destroy();
  } else {
    throw ApiError.ForbiddenError('Only owner can do this');
  }
};

const deleteFavorite = async (UserId, PostId) => {
  const conection = await Favorite.findOne({ where: { UserId, PostId } });
  if (!conection) {
    throw ApiError.BadRequestError('Wrong request');
  }
  await conection.destroy();
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
        as: 'categories',
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
  AddToFavorite,
  getAllPosts,
  getFavorites,
  getPost,
  updatePost,
  deletePost,
  deleteFavorite,
  getPostCategories,
};
