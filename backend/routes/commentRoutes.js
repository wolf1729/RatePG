const express= require('express')
const commentRouter = express.Router()
const commentController = require('../controllers/commentController')

//Route to add new Comment
commentRouter.post('/addNewComment', commentController.addNewComment)

//Route to get all comments of specific PG
commentRouter.post('/pgComments', commentController.showComments)

module.exports = commentRouter