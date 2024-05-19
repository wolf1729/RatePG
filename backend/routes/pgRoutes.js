const express = require('express')
const pgRouter = express.Router()
const pgController = require('../controllers/pgController')

//Route to Add new PG details
pgRouter.post('/addNewPG', pgController.addNewPG)

//Route to Get all PG details
pgRouter.get('/allPGs', pgController.showAllPG)

//Route to send details of specific PG searched using ID
pgRouter.post('/PGSearchUsingID', pgController.searchPGUsingID)

//Route to update value based on new comments
pgRouter.post('/commentUpdateValue', pgController.updateValueBasedOnComment)

module.exports = pgRouter