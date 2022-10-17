module.exports = class ApiError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'User is not authorized');
  }

  static BadRequestError(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static ForbiddenError(message = 'Only admins can do this', errors = []) {
    return new ApiError(403, message, errors);
  }

  static NothingFoundError(message = 'Nothing Found', errors = []) {
    return new ApiError(404, message, errors);
  }
};
