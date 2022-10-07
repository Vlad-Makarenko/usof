const Router = require("express").Router;
const categoryController = require("../controllers/category.controller");
const authMdw = require("../middleware/auth.middleware");
const adminMdw = require("../middleware/admin.middleware");
const userMdw = require("../middleware/user.middleware");
const { body } = require("express-validator");

const router = new Router();

router.get("/", categoryController.getAllCategories);
router.get("/:category_id", categoryController.getCategory);
router.get(
  "/:category_id/posts",
  userMdw,
  categoryController.getPostsByCategory
);
router.post(
  "/",
  body("title").isLength({ min: 1, max: 256 }),
  authMdw,
  adminMdw,
  categoryController.createCategory
);
router.patch(
  "/:category_id",
  body("title").isLength({ min: 1, max: 256 }),
  authMdw,
  adminMdw,
  categoryController.updateCategory
);
router.delete(
  "/:category_id",
  authMdw,
  adminMdw,
  categoryController.deleteCategory
);

module.exports = router;
