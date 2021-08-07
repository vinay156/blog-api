const check = require("../middleware/auth");
const express = require("express");
const postsController = require("../controller/posts-controller");
const router = express.Router();

router.post("/", check.isAuthenticated, postsController.addPost);
router.get("/:id", check.isAuthenticated, postsController.getSinglePost);
router.get("/user/:id", postsController.getUserPost);

module.exports = router;
