const Router = require("express").Router;
const authController = require("../controllers/auth.controller");
const { body } = require("express-validator");

const router = new Router();

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 32 }),
  body("login").isLength({ min: 3, max: 30 }),
  authController.registration
);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/password-reset", authController.passwordReset);
router.post("/password-reset/:confirm_token", authController.passwordConfirm);
router.get("/activate/:confirm_token", authController.activation);

module.exports = router;
