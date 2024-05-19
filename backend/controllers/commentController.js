const asycnHandler = require('express-async-handler')
const commentModel = require('../models/commentModel')

//Controller to add new Comment
const addNewComment = asycnHandler(async(req, res) => {
    const { pgId, username, comment, bathroomRating, roomRating, locationRating, overallRating } = req.body

    try{
        const commentDetails = {
            pgId: pgId,
            username: username,
            comment: comment,
            bathroomRating: bathroomRating,
            roomRating: roomRating,
            locationRating: locationRating,
            overallRating: overallRating
        }
        
        const newComment = new commentModel(commentDetails);
        await newComment.save();
        res.json({ status: true })
    }
    catch(err) {
        console.log(err)
        res.json({ status: false })
    }
})

//Controller to show the comments on the PG
const showComments = asycnHandler(async(req, res) => {
    const { pgId } = req.body

    try{
        const comments = await commentModel.find({ pgId: pgId })
        res.send(comments)
    }
    catch(err) {
        console.log(err)
        res.json({ status: false })
    }
})

module.exports = { addNewComment, showComments }