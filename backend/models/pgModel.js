const mongoose = require('mongoose')
const schema = mongoose.Schema

const pgModel = new schema({
    pgName: { type: String, required: true },
    pgLocation: { type: String, require: true },
    roomCondition: { type: Array, require: true },
    bathroomCondition: { type: Array, require: true },
    locationCondition: { type: Array, require: true },
    overallRating: { type: Array, require: true },
    Price : { type: Number },
    facilities: { type: Array, require: true },
    pgImage: { type: String, require: true }
})

module.exports = mongoose.model('pgModel', pgModel)