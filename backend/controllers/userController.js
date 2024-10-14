const userModel = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwtSecret = process.env.JWT_SECRET;

//User Registeration Controller
const userRegistration = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body

    try{
        const user = await userModel.findOne({ email: email })
        if(user) {
            res.json({ status: "exist" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const userDetails = {
            username: username,
            email: email,
            password: hashedPassword
        }

        const newUser = await userModel.create(userDetails)
        
        if (!newUser) {
            return res.status(502).send('Something went wrong')
        }

        const token = await jwt.sign(
            {
                username: newUser.username,
                id: newUser._id
            },
            jwtSecret,
            { expiresIn: '48h' }
        )

        res.status(200).json({
            success: true,
            data: {
                token: token,
                username: newUser.username,
                userId: newUser._id
            }
        })

    }
    catch(err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
})

//User Login Controller
const userLogin = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    try{
        const oldUser = await userModel.findOne({ email: email })
        
        if (!oldUser) return res.status(404).send('User not found');

        const validPassword = await bcrypt.compare(password, oldUser.password);
        if (!validPassword) return res.status(401).send('Wrong password');

        const token = await jwt.sign(
            {
                username: oldUser.username,
                id: oldUser._id
            },
            jwtSecret,
            { expiresIn: '48h' }
        )

        res.status(200).json({
            success: true,
            data: {
                token: token,
                username: oldUser.username,
                userId: oldUser._id
            }
        })
    }
    catch(err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
})

//Controller to get Username
const usernameController = asyncHandler(async(req, res) => {
    const { userId } = req.body

    try{
        const result = await userModel.findOne({ _id: userId })
        res.json({ username: result.username })
    }
    catch(err) {
        console.log(err)
        res.json({ status: false })
    }
})

module.exports = { userRegistration, userLogin, usernameController }