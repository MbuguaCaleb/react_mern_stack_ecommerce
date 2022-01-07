import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import morgan from 'morgan'

//Initializing my Environenment Variables
dotenv.config()

//connecting to the MongoDB Database
connectDB()

const app = express()

//Only run Morgan on Development
//It a package that gives us better Logging from within our Application
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
//Middleware that allows us to accept JSON Data in the body
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running........')
})

//Mounting the Router
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})

//Making the Uploads folder static so that we are able to access it from the FrontEnd
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

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
