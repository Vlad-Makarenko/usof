const Router = require("express").Router;
const commentController = require("../controllers/comment.controller");
const authMdw = require("../middleware/auth.middleware");
const userMdw = require("../middleware/user.middleware");
const { body } = require("express-validator");

const router = new Router();

router.get("/:comment_id", userMdw, commentController.getComment);
router.get("/:comment_id/like", commentController.getCommentLikes);
router.post(
  "/:comment_id/like",
  body("type").exists(),
  authMdw,
  commentController.createCommentLike
);
router.patch(
  "/:comment_id",
  body("content").trim().isLength({ min: 1, max: 65535 }),
  authMdw,
  commentController.updateComment
);
router.delete("/:comment_id", authMdw, commentController.deleteComment);
router.delete(
  "/:comment_id/like",
  authMdw,
  commentController.deleteCommentLike
);

module.exports = router;
