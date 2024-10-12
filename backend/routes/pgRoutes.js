const express = require('express')
const pgRouter = express.Router()
const pgController = require('../controllers/pgController')
const verifyToken = require('../utils/verifyToken')

//Route to Add new PG details
pgRouter.post('/addNewPG', verifyToken.verifyToken, pgController.addNewPG)

//Route to Get all PG details
pgRouter.get('/allPGs', pgController.showAllPG)

//Route to send details of specific PG searched using ID
pgRouter.post('/PGSearchUsingID', pgController.searchPGUsingID)

//Route to update value based on new comments
pgRouter.post('/commentUpdateValue', verifyToken.verifyToken, pgController.updateValueBasedOnComment)

//Route to search specific PG
pgRouter.post('/searchName', pgController.findPGName)

module.exports = pgRouter