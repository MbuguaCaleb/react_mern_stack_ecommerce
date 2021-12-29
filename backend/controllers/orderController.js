import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

//@desc Create New Order
//@route POST /api/products
//@access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  //Making Sure that the Order Items is not Empty
  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No Order Items')
  } else {
    //create a new Order in the Database
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

//@desc Get Order By Id
//@route POST /api/orders/:id
//@access  Private
const getOrderById = asyncHandler(async (req, res) => {
  //fetching from relationship
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order Not Found')
  }
})
export { addOrderItems, getOrderById }
