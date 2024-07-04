const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const pgRoutes = require('../backend/routes/pgRoutes')
const commentRoutes = require('../backend/routes/commentRoutes')
const userRoutes = require('../backend/routes/userRoutes')
require('dotenv').config();

const app = express()

//ENV VARIABLES
const port = process.env.PORT
const databaseURL = process.env.MONGO_URL

// const corsOption = {
//   origin: "https://ratepg.onrender.com"
// }

//MIDDLEWARES
app.use(express.json())
app.use(cors())
// app.use(cors(corsOption))

//DATABASE CONNECTION FUNCTION
const connectDB = async (dbURL) => {
    try {
      await mongoose.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Database Connected');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
}

//ROUTES
app.use('/pgRoutes', pgRoutes)
app.use('/commentRoutes', commentRoutes)
app.use('/userRoutes', userRoutes)

//SERVER STARTER
app.listen(port, async() => {
    try{
        await connectDB(databaseURL)
        console.log(`Server Listening on Port : ${port}`)
    }
    catch(err) {
        console.log(err)
    }
})