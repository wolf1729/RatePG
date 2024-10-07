const express= require('express')
const commentRouter = express.Router()
const commentController = require('../controllers/commentController')
const verifyToken = require('../utils/verifyToken')

//Route to add new Comment
commentRouter.post('/addNewComment', verifyToken.verifyToken, commentController.addNewComment)

//Route to get all comments of specific PG
commentRouter.post('/pgComments', commentController.showComments)

module.exports = commentRouter