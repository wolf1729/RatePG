const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/userController')

//New user registration Route
userRouter.post('/userRegistration', userController.userRegistration)

//Old User Login Route
userRouter.post('/userLogin', userController.userLogin)

//Route to get username
userRouter.post('/username', userController.usernameController)

module.exports = userRouter