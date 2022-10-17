const { Router } = require('express');
const { body } = require('express-validator');
const authMdw = require('../middleware/auth.middleware');
const adminMdw = require('../middleware/admin.middleware');
const fileMdw = require('../middleware/file.middleware');
const usersController = require('../controllers/user.controller');

const router = new Router();

router.get('/', usersController.allUsers);
router.get('/:user_id', usersController.userById);
router.post(
  '/',
  body('email').trim().isEmail(),
  body('password').isLength({ min: 6, max: 32 }),
  body('login').trim().isLength({ min: 3, max: 30 }),
  authMdw,
  adminMdw,
  usersController.adminRegistration,
);
router.patch(
  '/avatar',
  authMdw,
  fileMdw.single('avatar'),
  usersController.avatarUpdate,
);
router.patch('/:user_id', authMdw, usersController.userUpdate);
router.delete('/avatar', authMdw, usersController.deleteAvatar);
router.delete('/:user_id', authMdw, adminMdw, usersController.userDelete);

module.exports = router;
