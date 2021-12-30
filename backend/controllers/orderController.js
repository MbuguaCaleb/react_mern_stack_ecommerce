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

//@desc Update Order to Paid
//@route GET /api/orders/:id/pay
//@access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  //fetching from relationship
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()

    //will come from the paypal response
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
    
  } else {
    res.status(404)
    throw new Error('Order Not Found')
  }
})

export { addOrderItems, getOrderById, updateOrderToPaid }
