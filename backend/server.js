import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
//Initializing my Environenment Variables
dotenv.config()

//connecting to the MongoDB Database
connectDB()

const app = express()

app.get('/', (req, res) => {
  res.send('API is running........')
})

//Mounting the Router
app.use('/api/products', productRoutes)

//Express Error Handler Middlewares
app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on Port ${PORT}`.yellow.bold
  )
)
