import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'

//Initializing my Environenment Variables
dotenv.config()

const app = express()

app.get('/', (req, res) => {
  res.send('API is running........')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(
  5000,
  console.log(`Server running in ${process.env.NODE_ENV} on Port ${PORT}`)
)