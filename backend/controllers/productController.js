import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//@desc Fetch all products
//@route GET /api/products
//@access  Public
const getProducts = asyncHandler(async (req, res) => {
  //If there is a keyword in the query Parameter i am searching with the Regex
  const pageSize = 10

  //current Page
  const page = Number(req.query.pageNumber) || 1

  const keyWord = req.query.keyWord
    ? {
        name: {
          $regex: req.query.keyWord,
          $options: 'i',
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyWord })
  const products = await Product.find({ ...keyWord })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

//@desc a single product
//@route GET /api/products/:id
//@access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//@desc delete a Product
//@route GET /api/products/:id
//@access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
//@desc Create a Product
//@route POST /api/products
//@access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

//@desc Update a Product
//@route PUT /api/products/:id
//@access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not Found')
  }
})

//@desc Create New Review
//@route POST /api/products/:id/review
//@access  Private/Admin
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    //check to see if the User has already reviewed
    //remember reviews is an array
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product Already reviewed')
    }

    //if review had not been made
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    //pushing new review into the reviews Array
    product.reviews.push(review)

    //Updating the Number of reviews in the Product Model
    product.numReviews = product.reviews.length

    //Itelligent Js
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    //Saving the Model Changes
    await product.save()
    res.status(201).json({ message: 'Review Added' })
  } else {
    res.status(404)
    throw new Error('Product not Found')
  }
})

//@desc Get Top Rated Products
//@route GET /api/products/Top
//@access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  //sorting by the Rating
  //IN ASC Order
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  getTopProducts,
  createProductReview,
}
