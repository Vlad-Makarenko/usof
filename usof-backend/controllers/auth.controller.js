const { validationResult } = require("express-validator");

const authService = require("../services/auth.service");
const tokenService = require("../services/token.service");
const ApiError = require("../utils/ApiError");

const registration = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError("validation error", errors.array()));
    }
    const { email, login, password, full_name } = req.body;
    const userData = await authService.registration(
      email,
      login,
      password,
      full_name
    );
    return res.status(201).json({ ...userData });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { login, email, password } = req.body;
    const userData = await authService.login(login, email, password);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 3600 * 1000,
      httpOnly: true,
    });
    return res.json({ ...userData, refreshToken: undefined });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    await tokenService.removeToken(refreshToken);

    res.clearCookie("refreshToken");
    return res.status(204).json("OK");
  } catch (err) {
    next(err);
  }
};

const passwordReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    await authService.passwordReset(email);
    res.status(204).json({ message: "The link has been sent to your email" });
  } catch (err) {
    next(err);
  }
};

const passwordConfirm = async (req, res, next) => {
  try {
    const token = req.params.confirm_token;
    const { password, repeatedPassword } = req.body;
    await authService.passwordConfirm(token, password, repeatedPassword);
    res.status(204).json({ message: "Password changed successfully" });
  } catch (err) {
    next(err);
  }
};

const activation = async (req, res, next) => {
  try {
    const token = req.params.confirm_token;
    await authService.activate(token);
    return res.redirect(process.env.CLIENT_URL);
  } catch (err) {
    next(err);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const userData = await authService.refreshToken(refreshToken);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 3600 * 1000,
      httpOnly: true,
    });
    return res.json({ ...userData, refreshToken: undefined });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registration,
  login,
  logout,
  passwordReset,
  passwordConfirm,
  activation,
  refreshToken,
};
