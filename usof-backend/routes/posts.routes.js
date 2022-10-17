const { Router } = require('express');
const { body } = require('express-validator');
const postController = require('../controllers/post.controller');
const authMdw = require('../middleware/auth.middleware');
const userMdw = require('../middleware/user.middleware');

const router = new Router();

router.get('/', userMdw, postController.getAllPosts);
router.get('/:post_id', userMdw, postController.getPost);
router.get('/:post_id/categories', postController.getPostCategories);
router.get('/:post_id/comments', userMdw, postController.getPostComments);
router.get('/:post_id/like', postController.getPostLikes);
router.post(
  '/',
  body('title').trim().isLength({ min: 2, max: 256 }),
  body('content').trim().isLength({ min: 5, max: 65535 }),
  authMdw,
  postController.createPost,
);
router.post(
  '/:post_id/comments',
  body('content').trim().isLength({ min: 1, max: 65535 }),
  authMdw,
  postController.createPostComment,
);
router.post(
  '/:post_id/like',
  body('type').exists(),
  authMdw,
  postController.createPostLike,
);
router.patch(
  '/:post_id',
  body('title').trim().isLength({ min: 2, max: 256 }),
  body('content').trim().isLength({ min: 5, max: 65535 }),
  authMdw,
  postController.updatePost,
);
router.delete('/:post_id', authMdw, postController.deletePost);
router.delete('/:post_id/like', authMdw, postController.deletePostLike);

module.exports = router;
