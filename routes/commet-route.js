const auth = require('../controller/auth-controller')
const commentController = require('../controller/comments-controller')

const express = require('express')
const router = express.Router()


router.post('/:postId', auth.isAuth, commentController.addComment)

module.exports = router