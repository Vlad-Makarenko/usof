const ApiError = require("../utils/ApiError");
const tokenService = require("../services/token.service");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      req.user = { role: "public" };
      return next();
    } 
    const decoded = tokenService.validateAccessToken(token);
    if (!decoded) {
      req.user = { role: "public" };
      return next();
    }
    req.user = decoded;
    next();
  } catch (err) {
    return next(ApiError.UnauthorizedError());
  }
};
