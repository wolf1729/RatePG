const asyncHandler = require('express-async-handler')
const pgModel = require('../models/pgModel')

//Controller to add new PG Details
const addNewPG = asyncHandler(async(req, res) => {
    const { pgName, pgLocation, roomCondition, bathroomCondition, locationConvenience, overallRating, price, facilities, pgImage } = req.body
    try {
        const pgDetails = {
            pgName: pgName,
            pgLocation: pgLocation,
            roomCondition: roomCondition,
            bathroomCondition: bathroomCondition,
            locationCondition: locationConvenience,
            overallRating: overallRating,
            Price: price,
            facilities: facilities,
            pgImage: pgImage
        }
        
        const newPG = new pgModel(pgDetails);
        await newPG.save();
        res.json({ status: true })
    }
    catch(err) {
        res.json({ status: false })
        console.log(err)
    }
})

//Controller to show all PG's
const showAllPG = asyncHandler(async(req, res) => {
    try {
        const data = await pgModel.find()
        res.send(data)
    }
    catch(err) {
        res.json({ status: false })
        console.log(err)
    }
})

//Controller to search for specific PG using ID
const searchPGUsingID = asyncHandler(async(req, res) => {
    const { pgID } = req.body

    try{
        console.log(pgID)
        const pgDetails = await pgModel.findOne({ _id: pgID })
        res.send(pgDetails)
        console.log
    }
    catch(err) {
        res.json({ status: false })
    }
})

//Controller to add new values based on new comments
const updateValueBasedOnComment = asyncHandler(async(req, res) => {
    const { pgId ,bathroomRating, roomRating, locationRating, overallRating } = req.body

    try {
        const result = await pgModel.updateOne(
            { _id: pgId},
            { $push : {
                roomCondition : roomRating,
                bathroomCondition: bathroomRating,
                locationCondition: locationRating, 
                overallRating: overallRating
            }}
        )
        res.json({ status: true })
    }
    catch(err) {
        console.log(err)
        res.json({ status: false })
    }
})

//Controller to find specific PG
const findPGName = asyncHandler(async(req, res) => {
    const { pgName } = req.body

    try{
        const result = await pgModel.find({ pgName: pgName })
        res.send(result)
    }
    catch(err){
        console.log(err)
        res.json({ status: false })
    }
})

module.exports = { addNewPG, showAllPG, searchPGUsingID, updateValueBasedOnComment, findPGName }