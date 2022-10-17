const fs = require('fs');
const bcrypt = require('bcryptjs');
const db = require('../db/sequelize');
const ApiError = require('../utils/ApiError');
const userData = require('../utils/userDto');
const mailService = require('./mail.service');

const { User } = db.sequelize.models;

/**
 *
 * @returns User
 */
const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: [
      'id',
      'login',
      'full_name',
      'profile_picture',
      'rating',
      'role',
      'createdAt',
    ],
  });
  if (!users) {
    throw ApiError.NothingFoundError();
  }
  return users;
};

/**
 *
 * @param {Number} id
 * @returns User
 */
const getUser = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: [
      'id',
      'login',
      'full_name',
      'profile_picture',
      'rating',
      'role',
      'createdAt',
    ],
  });
  if (!user) {
    throw ApiError.NothingFoundError();
  }
  return user;
};

/**
 *
 * @param {String} email
 * @param {String} login
 * @param {String} password
 * @param {String} confirmedPassword
 * @param {String} full_name
 * @param {String} role
 * @returns userData(User)
 */
const RegistrationByAdmin = async (
  email,
  login,
  password,
  confirmedPassword,
  full_name = '',
  role = 'user',
) => {
  const emailCandidate = await User.findOne({ where: { email } });
  if (emailCandidate) {
    throw ApiError.BadRequestError(
      `User with email ${email} is already registered`,
    );
  }
  const loginCandidate = await User.findOne({ where: { login } });
  if (loginCandidate) {
    throw ApiError.BadRequestError(
      `User with login ${login} is already registered`,
    );
  }
  if (password !== confirmedPassword) {
    throw ApiError.BadRequestError('passwords do not match');
  }

  const hashPassword = await bcrypt.hash(password, 4);
  const user = await User.create({
    email,
    login,
    password: hashPassword,
    full_name,
    role,
  });

  await mailService.sendActivationMail(email);

  return userData(user);
};

/**
 *
 * @param {String} fileName
 * @param {Number} userId
 * @returns userData(User)
 */
const updateAvatar = async (fileName, userId) => {
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    throw ApiError.BadRequestError('No such user');
  }
  if (user.profile_picture !== 'default.png') {
    fs.unlinkSync(`./static/avatars/${user.profile_picture}`);
  }
  user.profile_picture = fileName;
  await user.save();
  return userData(user);
};

/**
 *
 * @param {Number} userId
 * @returns userData(User)
 */
const deleteAvatar = async (userId) => {
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    throw ApiError.BadRequestError('No such user');
  }
  if (user.profile_picture === 'default.png') {
    throw ApiError.BadRequestError('You don`t have avatar');
  }
  fs.unlinkSync(`./static/avatars/${user.profile_picture}`);
  user.profile_picture = 'default.png';
  await user.save();
  return userData(user);
};

/**
 *
 * @param {Boolean} owner
 * @param {Object} data
 * @param {Number} id
 * @returns User
 */
const updateUser = async (owner, data, id) => {
  if (data.email) {
    const candidate = await User.findOne({ where: { email: data.email } });
    if (candidate) {
      throw ApiError.BadRequestError(
        `User with email ${email} is already registered`,
      );
    }
  }
  if (data.login) {
    const candidate = await User.findOne({ where: { login: data.login } });
    if (candidate) {
      throw ApiError.BadRequestError(
        `User with login ${login} is already registered`,
      );
    }
  }
  const user = await User.findOne({ where: { id } });
  if (data.email) {
    user.email = data.email;
    await mailService.sendActivationMail(data.email);
  }
  user.login = data.login ? data.login : user.login;
  user.full_name = data.full_name ? data.full_name : user.full_name;
  user.profile_picture = data.avatar && !owner ? 'default.png' : user.profile_picture;
  await user.save();
  return user;
};

/**
 *
 * @param {Number} id
 */
const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  getAllUsers,
  getUser,
  RegistrationByAdmin,
  updateAvatar,
  deleteAvatar,
  updateUser,
  deleteUser,
};
