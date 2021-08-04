const express = require('express')
const router = express.Router()

const userController = require('../controller/user-controller')
const authController = require('../controller/auth-controller')

router.get('/:id', userController.getUser)
router.get('/', authController.isAuth, userController.getCurrentUser)


module.exports = router