const Coupon = require('../models/coupon')
const asyncHandler = require('express-async-handler')
const { createCouponSchema, updateCouponSchema } = require('../Utils/schema')

const createNewCoupon = asyncHandler(async (req, res) => {
  const { name, discount, expiry } = req.body || {}
  const { error } = createCouponSchema.validate({ ...req.body })

  const coupon = await Coupon.create({ ...req.body, expiry: Date.now() + expiry * 24 * 60 * 60 * 1000 })

  return res.status(200).json({
    isSuccess: true,
    coupon,
  })
})

const getCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find()

  return res.status(200).json({
    isSuccess: true,
    coupons,
  })
})

const updateCoupon = asyncHandler(async (req, res) => {
  const { couponId } = req.params || {}
  const { error } = updateCouponSchema.validate({ couponId, ...req.body })

  if (error) throw new Error(error.message)

  const coupon = await Coupon.findByIdAndUpdate(couponId, req.body, { returnDocument: 'after' })
  return res.status(200).json({
    isSuccess: true,
    coupon,
  })
})

const deleteCoupon = asyncHandler(async (req, res) => {
  const { couponId } = req.params || {}
  if (!couponId) throw new Error('Invalid coupon id')

  const response = await Coupon.findByIdAndDelete(couponId)
  if (!response) throw new Error('Delete coupon failed')

  return res.status(200).json({
    isSuccess: true,
    message: 'Delete coupon successful',
  })
})

module.exports = {
  createNewCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
}
