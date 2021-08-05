const express = require("express");
const router = express.Router();

//Controller
const authController = require("../controller/auth-controller");

router.post("/sign-up", authController.signUp);
router.post("/log-in", authController.login);

module.exports = router;
