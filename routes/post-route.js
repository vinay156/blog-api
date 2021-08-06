const express = require("express");
const router = express.Router();

const check = require("../middleware/auth");
const postsController = require("../controller/posts-controller");

router.post("/", check.isAuthenticated, postsController.addPost);
router.get("/:id", check.isAuthenticated, postsController.getSinglePost);
router.get("/user/:id", postsController.getUserPost);

module.exports = router;
