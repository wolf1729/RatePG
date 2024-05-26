const mongoose = require('mongoose')
const schema = mongoose.Schema

const userModel = new schema({
    username: { type: String, required: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, required: true }
})

module.exports = mongoose.model('userModel', userModel)