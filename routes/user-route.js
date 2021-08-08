const express = require("express");

const check = require("../middleware/auth");
const userController = require("../controller/user-controller");

const router = express.Router();

router.get("/:id", check.isAuthenticated, userController.getUser);
router.get("/post/:id", userController.getUserPost);

module.exports = router;
