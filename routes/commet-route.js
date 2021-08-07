const check = require("../middleware/auth");
const commentController = require("../controller/comments-controller");
const express = require("express");
const router = express.Router();

router.post("/:postId", check.isAuthenticated, commentController.addComment);

module.exports = router;
