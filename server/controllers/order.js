const Order = require('../models/order')
const User = require('../models/user')
const Coupon = require('../models/coupon')
const asyncHandler = require('express-async-handler')

const createOrder = asyncHandler(async (req, res) => {
  try {
    const { _id: userId } = req.user
    const user = await User.findById(userId).select('cart').populate('cart.product', 'title price')

    if (user.cart.length === 0) throw new Error('Cart is empty')

    console.log('This logic is wrong')
    const products = user.cart.map((cart) => ({
      product: cart.product._id,
      quantity: cart.quantity,
      color: cart.color,
    }))

    let total = user.cart.reduce((sum, cart) => (sum += cart.product.price * cart.quantity), 0)
    let order = { products, total, orderBy: userId }

    if (req.body?.coupon) {
      const coupon = await Coupon.findById(req.body?.coupon)
      order.total = Math.round((total * (1 - +coupon.discount / 100)) / 1000) * 1000
      order.coupon = req.body?.coupon
    }
    const newOrder = await Order.create(order)

    return res.status(200).json({
      isSuccess: true,
      order: newOrder,
    })
  } catch (error) {
    return res.status(400).json({
      isSuccess: false,
      message: error.message,
    })
  }
})

const updateOrderStatus = asyncHandler(async (req, res) => {
  try {
    const { orderId } = req.params
    const { status } = req.body || {}

    if (!status) throw new Error('Status is invalid')

    const order = await Order.findByIdAndUpdate(orderId, { status }, { returnDocument: 'after' })

    return res.status(200).json({
      isSuccess: true,
      order,
    })
  } catch (error) {
    return res.status(400).json({
      isSuccess: false,
      message: error.message,
    })
  }
})

const getUserOrder = asyncHandler(async (req, res) => {
  try {
    const { _id: userId } = req.user

    const order = await Order.find({ orderBy: userId })
    return res.status(200).json({
      isSuccess: true,
      order,
    })
  } catch (error) {
    return res.status(400).json({
      isSuccess: false,
      message: error.message,
    })
  }
})

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
  return res.status(200).json({
    isSuccess: true,
    orders,
  })
})

module.exports = {
  createOrder,
  updateOrderStatus,
  getUserOrder,
  getOrders,
}
