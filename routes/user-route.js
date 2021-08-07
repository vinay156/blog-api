const check = require("../middleware/auth");
const express = require("express");
const userController = require("../controller/user-controller");
const router = express.Router();

router.get("/:id", check.isAuthenticated, userController.getUser);
router.get("/", check.isAuthenticated, userController.getAllUser);

module.exports = router;
