const { Router } = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');

const router = new Router();

router.post(
  '/register',
  body('email').trim().isEmail(),
  body('password').isLength({ min: 6, max: 32 }),
  body('login').trim().isLength({ min: 3, max: 30 }),
  authController.registration,
);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/password-reset', authController.passwordReset);
router.post('/password-reset/:confirm_token', authController.passwordConfirm);
router.get('/activate/:confirm_token', authController.activation);

module.exports = router;
