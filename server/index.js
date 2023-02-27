import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './mongoDB/Connect.js'
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.use(postRoutes)
app.use(dalleRoutes)

app.get('/', async (req, res) => {
    res.send('Hello from server')
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(process.env.PORT, () => console.log(`Server running on port http://localhost:${process.env.PORT}`))
    } catch (error) {
        console.log("server error : ", error)
    }


}

startServer()