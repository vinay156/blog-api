const express = require("express");

const check = require("../middleware/auth");
const commentController = require("../controller/comments-controller");

const router = express.Router();

router.post(
  "/:id/comment",
  check.isAuthenticated,
  commentController.addComment
);

module.exports = router;
