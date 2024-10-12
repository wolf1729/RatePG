const userModel = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

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

        const newUser = new userModel(userDetails)
        await newUser.save();
        res.json({ userId: newUser._id })
    }
    catch(err) {
        console.log(err)
        res.json({ status: false })
    }
})

//User Login Controller
const userLogin = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    try{
        const oldUser = await userModel.findOne({ email: email })
        if(!oldUser) {
            res.status(401).send("Wrong Email or Password")
        }

        const validPassword = await bcrypt.compare(password, oldUser.password);
        if (!validPassword){
            res.status(401).send("Wrong Password")
        }

        res.status(200).json(
            { 
                userId: oldUser._id,
                username: oldUser.username
            }
        )
    }
    catch(err) {
        console.log(err)
        res.json({ status: false })
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