const Brand = require('../models/brand')
const asyncHandler = require('express-async-handler')

const createBrand = asyncHandler(async (req, res) => {
  const { title } = req.body || {}

  if (!title) throw new Error('Invalid brand title')
  const brand = await Brand.create(req.body)
  if (!brand) throw new Error('Create Brand failed')

  return res.status(200).json({
    isSuccess: true,
    brand,
  })
})

const updateBrand = asyncHandler(async (req, res) => {
  const { _id, title } = req.body || {}
  if (!_id && !title) throw new Error('Invalid brand id or title')
  const brand = await Brand.findByIdAndUpdate(_id, req.body, {
    returnDocument: 'after',
  })

  if (!brand) throw new Error('Update Brand failed')
  return res.status(200).json({
    isSuccess: true,
    brand,
  })
})

const getBrands = asyncHandler(async (req, res) => {
  const brand = await Brand.find()

  return res.status(200).json({
    isSuccess: true,
    brand,
  })
})

const deleteBrand = asyncHandler(async (req, res) => {
  const { brandId } = req.params || {}
  if (!brandId) throw new Error('Cannot found Brand')

  const response = await Brand.findByIdAndDelete(brandId)
  if (!response) throw new Error('Delete Brand failed')

  return res.status(200).json({
    isSuccess: true,
    message: 'Delete Brand successful',
  })
})

module.exports = {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
}
