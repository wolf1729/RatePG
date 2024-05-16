const mongoose = require('mongoose')
const schema = mongoose.Schema

const pgModel = new schema({
    pgName: { type: String, required: true },
    pgLocation: { type: String, require: true },
    roomCondition: { type: Number, require: true },
    bathroomCondition: { type: Number, require: true },
    locationCondition: { type: Number, require: true },
    networkCondition: { type: Number, require: true },
    Price : { type: Number },
    facilities: { type: Array, require: true }
})

module.exports = mongoose.model('pgModel', pgModel)