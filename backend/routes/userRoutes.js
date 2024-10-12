const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/userController')
const verifyToken = require('../utils/verifyToken')

//New user registration Route
userRouter.post('/userRegistration', userController.userRegistration)

//Old User Login Route
userRouter.post('/userLogin', userController.userLogin)

//Route to get username
userRouter.post('/username', verifyToken.verifyToken,  userController.usernameController)

module.exports = userRouter