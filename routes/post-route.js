const express = require("express");
const router = express.Router();

const authController = require("../controller/auth-controller");
const postsController = require("../controller/posts-controller");

router.get("/page/:page", postsController.getPost);
router.post("/", authController.isAuth, postsController.addPost);
router.get("/:id", postsController.getSinglePost);
router.get("/user/:id", postsController.getUserPost);

module.exports = router;
