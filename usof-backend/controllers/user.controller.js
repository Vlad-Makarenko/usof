const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");

const allUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const userById = async (req, res, next) => {
  try {
    const id = req.params.user_id;
    const user = await userService.getUser(id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const adminRegistration = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError("validation error", errors.array()));
    }
    const { email, login, password, confirmedPassword, full_name, role } =
      req.body;
    const userData = await userService.RegistrationByAdmin(
      email,
      login,
      password,
      confirmedPassword,
      full_name,
      role
    );
    return res.status(201).json({ ...userData });
  } catch (err) {
    next(err);
  }
};

const avatarUpdate = async (req, res, next) => {
  try {
    const file = req.file.filename;
    const user = await userService.updateAvatar(file, req.user.id);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const deleteAvatar = async (req, res, next) => {
  try {
    const user = await userService.deleteAvatar(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const userUpdate = async (req, res, next) => {
  try {
    const owner = req.user.id == req.params.user_id;
    if (owner || req.user.role == "admin") {
      const user = await userService.updateUser(
        owner,
        req.body,
        req.params.user_id
      );
      res.json(user);
    } else {
      return next(ApiError.ForbiddenError());
    }
  } catch (err) {
    next(err);
  }
};

const userDelete = async (req, res, next) => {
  try {
    const id = req.params.user_id;
    userService.deleteUser(id);
    res.status(204).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  allUsers,
  userById,
  adminRegistration,
  avatarUpdate,
  deleteAvatar,
  userUpdate,
  userDelete,
};
