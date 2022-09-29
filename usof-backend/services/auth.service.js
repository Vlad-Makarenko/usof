const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../db/sequelize");
const mailService = require("./mail.service");
const tokenService = require("./token.service");
const ApiError = require("../utils/ApiError");

const User = db.sequelize.models.user;

const registration = async (
  email,
  login,
  password,
  full_name = "",
  role = "user"
) => {
  const emailCandidate = await User.findOne({ where: { email: email } });
  if (emailCandidate) {
    throw ApiError.BadRequestError(
      `User with email ${email} is already registered`
    );
  }
  const loginCandidate = await User.findOne({ where: { login: login } });
  if (loginCandidate) {
    throw ApiError.BadRequestError(
      `User with login ${login} is already registered`
    );
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

  return {
    id: user.id,
    email: user.email,
    login: user.login,
    full_name: user.full_name,
    role: user.role,
  };
};

const activate = async (token) => {
  const { email } = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  const user = await User.findOne({ where: { email: email } });
  if (!user || user.is_Activated) {
    throw ApiError.BadRequestError(`Incorect activation link`);
  }
  user.is_Activated = true;
  await user.save();
};

const login = async (email, password) => {
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    throw ApiError.BadRequestError(
      `User with email ${email} is not registered`
    );
  }
  const isEqualsPswd = await bcrypt.compare(password, user.password);
  if (!isEqualsPswd) {
    throw ApiError.BadRequestError(`Incorrect password`);
  }
  if (!user.is_Activated) {
    throw ApiError.BadRequestError(`User is not confirmed email`);
  }
  const tokens = tokenService.generateTokens({
    id: user.id,
    email: user.email,
    role: user.role,
  });
  await tokenService.saveToken(user.id, tokens.refreshToken);

  return {
    ...tokens,
    id: user.id,
    email: user.email,
    role: user.role,
  };
};

const refreshToken = async (refreshToken) => {
  if (!refreshToken) {
    throw ApiError.UnauthorizedError();
  }
  const userData = tokenService.validateRefreshToken(refreshToken);
  const tokenFromDB = await tokenService.findToken(refreshToken);
  if (!userData || !tokenFromDB) {
    throw ApiError.UnauthorizedError();
  }
  const user = await User.findOne({ where: { id: userData.id } });
  const tokens = tokenService.generateTokens({
    id: user.id,
    email: user.email,
    login: user.login,
    full_name: user.full_name,
    role: user.role,
  });
  await tokenService.saveToken(user.id, tokens.refreshToken);

  return {
    ...tokens,
    id: user.id,
    email: user.email,
    login: user.login,
    full_name: user.full_name,
    role: user.role,
  };
};

const passwordReset = async (email) => {
  const user = await User.findOne({ where: { email: email } });
  if (!user || !user.is_Activated) {
    throw ApiError.BadRequestError(
      `User with email ${email} is not registered or not activated`
    );
  }
  await mailService.sendPswResetMail(email);
};

const passwordConfirm = async (token, password, repeatedPassword) => {
  const userData = tokenService.validateAccessToken(token);
  const user = await User.findOne({ where: { email: userData.email } });
  if (!user) {
    throw ApiError.BadRequest("No user found");
  }
  if (password != repeatedPassword) {
    throw ApiError.BadRequest("Passwords do not match");
  }
  const hashPassword = await bcrypt.hash(password, 4);
  user.password = hashPassword;
  await user.save();
};

module.exports = {
  registration,
  activate,
  login,
  refreshToken,
  passwordReset,
  passwordConfirm,
};
