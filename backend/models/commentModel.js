const mongoose = require('mongoose')
const schema = mongoose.Schema

const commentSchema = new schema({
    pgId: { type: String, required: true },
    username: { type: String, required: true },
    comment: { type: String, required: true },
    bathroomRating: { type: Number, required: true},
    roomRating: { type: Number, required: true },
    locationRating: { type: Number, required: true },
    overallRating: { type: Number, required: true}
})

module.exports = mongoose.model('commentModel', commentSchema)