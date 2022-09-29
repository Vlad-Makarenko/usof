const Router = require("express").Router;
const authMdw = require("../middleware/auth.middleware");
const usersController = require("../controllers/users.controller");

const router = new Router();

router.get("/", authMdw, usersController.allUsers);

module.exports = router;
