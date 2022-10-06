const Router = require("express").Router;
const postController = require("../controllers/post.controller");
const authMdw = require("../middleware/auth.middleware");
const adminMdw = require("../middleware/admin.middleware");
const userMdw = require("../middleware/user.middleware");
const { body } = require("express-validator");

const router = new Router();

router.get("/", userMdw, postController.getAllPosts);
router.get("/:post_id", userMdw, postController.getPost);
router.get("/:post_id/categories", postController.getPostCategories);
router.post(
  "/",
  body("title").isLength({ min: 2, max: 256 }),
  body("content").isLength({ min: 5, max: 65535 }),
  authMdw,
  postController.createPost
);
router.patch(
  "/:post_id",
  body("title").isLength({ min: 2, max: 256 }),
  body("content").isLength({ min: 5, max: 65535 }),
  authMdw,
  postController.updatePost
);
router.delete("/:post_id", authMdw, postController.deletePost);

module.exports = router;
