const express = require("express");

const check = require("../middleware/auth");
const postsController = require("../controller/posts-controller");

const router = express.Router();

router.post("/", check.isAuthenticated, postsController.addPost);
router.get("/:id", check.isAuthenticated, postsController.getSinglePost);

module.exports = router;
