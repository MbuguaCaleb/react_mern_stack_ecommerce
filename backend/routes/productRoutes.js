import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'

//@desc Fetch all products
//@route GET /api/products
//@access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    //Returning an empty objects gives us all the items
    const products = await Product.find({})

    return res.json(products)
  })
)
//@desc a single product
//@route GET /api/products/:id
//@access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'product not found' })
    }
  })
)

export default router
