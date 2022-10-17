const ApiError = require('../utils/ApiError');

module.exports = (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return next(ApiError.ForbiddenError());
    }
    next();
  } catch (err) {
    return next(ApiError.ForbiddenError());
  }
};
