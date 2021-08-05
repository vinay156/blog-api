const express = require("express");
const router = express.Router();

const authController = require("../controller/auth-controller");
const userController = require("../controller/user-controller");

router.get("/:id", userController.getUser);
router.get("/", authController.isAuth, userController.getCurrentUser);

module.exports = router;
