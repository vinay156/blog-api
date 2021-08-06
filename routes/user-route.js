const express = require("express");
const router = express.Router();

const check = require("../middleware/auth");
const userController = require("../controller/user-controller");

router.get("/:id", check.isAuthenticated, userController.getUser);
router.get("/", check.isAuthenticated, userController.getAllUser);

module.exports = router;
