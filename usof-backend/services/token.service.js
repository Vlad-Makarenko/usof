const jwt = require("jsonwebtoken");
const db = require("../db/sequelize.js");

const Token = db.sequelize.models.token;

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "30m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
  return {
    accessToken,
    refreshToken,
  };
};

const saveToken = async (userId, accessToken, refreshToken) => {
  const tokenData = await Token.findOne({
    where: { userId: userId },
    include: "user",
  });
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    tokenData.accessToken = accessToken;
    return tokenData.save();
  }
  const token = await Token.create({ userId, accessToken, refreshToken });
  return token;
};

const validateAccessToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return userData;
  } catch (err) {
    return null;
  }
};

const validateRefreshToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return userData;
  } catch (err) {
    return null;
  }
};

const removeToken = async (refreshToken) => {
  await Token.destroy({ where: { refreshToken: refreshToken } });
};

const findToken = async (refreshToken) => {
  const token = await Token.findOne({ where: { refreshToken: refreshToken } });
  return token;
};

module.exports = {
  generateTokens,
  saveToken,
  findToken,
  removeToken,
  validateAccessToken,
  validateRefreshToken,
};
