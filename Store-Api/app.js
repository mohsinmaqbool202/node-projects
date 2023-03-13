require('dotenv').config()
require('express-async-errors')
const connectDB = require('./db/connect')
const productRoutes = require('./routes/products')


const express = require('express')
const app = express()


const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// middlewares
app.use(express.json())


// routes
app.get('/', (req, res) => {
    return res.send('<h1>Store Api</h1><a href="/api/v1/products">Product routes</a>')
})

// product routes
app.use('/api/v1/products', productRoutes)

// middlewares
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// port
const port = process.env.PORT || 3000

// connect to db and start server
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => { console.log(`Server is listening at port ${port}`) })

    } catch (error) {
        console.log(error)
    }
}


start()

