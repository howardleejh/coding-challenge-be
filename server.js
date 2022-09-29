'use strict'

// =====================================
//           Dependencies
// =====================================
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { usersRouter } from './routers/usersRouter.js'
import { productsRouter } from './routers/productsRouter.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

// =====================================
//          Using Middleware
// =====================================

// setting middleware to accept json and urlencoded request body

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)

// =====================================
//               Routes
// =====================================

app.use('/api/v1', usersRouter)
app.use('/api/v1/products', productsRouter)

app.get('/', (req, res) => {
    res.status(200).json(`Server is ready!`)
})

// =====================================
//         Initialize MongoDB
// =====================================

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)

const db = mongoose.connection

db.once('open', () => {
    console.log('MongoDB connection successful')

    app.listen(port, () => {
        console.log(`Coding Challenge app listening at http://localhost:${port}`)
    })
})

db.on('error', () => {
    console.log('MongoDB connection failed')
})