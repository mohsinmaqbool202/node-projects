const connectDB = require('./db/connect')
const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
require('dotenv').config()

// middleware
app.use(express.static('./public'))
app.use(express.json())

// task routes
app.use('/api/v1/tasks', tasks)


const port = 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI) //first connect to db
        connectServer() //than connect to server
    } catch (error) {
        console.log(error)
    }
}

const connectServer = () => {
    app.listen(port, console.log(`Server is istening at port ${port}`))
}

start()

