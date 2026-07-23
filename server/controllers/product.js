const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const slug = require('slugify')
const { createProductSchema, ratingchema } = require('../Utils/schema')

const createNewProduct = asyncHandler(async (req, res) => {
  const validation = createProductSchema.validate({ ...req.body })
  if (validation.error) {
    throw new Error(validation.error.message)
  }

  if (req.body?.title) req.body.slug = slug(req.body.title)

  const product = await Product.create(req.body)
  if (!product)
    return res.status(400).json({
      isSuccess: false,
      message: 'Cannot create new product',
    })

  return res.status(200).json({
    isSuccess: true,
    newProduct: product,
  })
})

const getProduct = asyncHandler(async (req, res) => {
  const { _id } = req.query || {}

  if (!_id) throw new Error('Invalid product id')

  const product = await Product.findById(_id)

  if (!product)
    return res.status(400).json({
      isSuccess: false,
      message: 'Cannot found product',
    })

  return res.status(200).json({
    isSuccess: true,
    product,
  })
})

const getProducts = asyncHandler(async (req, res) => {
  const { limit: limitParam = 2, page: pageParam = 1, sort, maxPrice, minPrice, title, branch, ...queries } = req.query

  const limit = Math.max(Number(limitParam) || 2, 1)
  const page = Math.max(Number(pageParam) || 1, 1)
  const skip = (page - 1) * limit

  const filter = { ...queries }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {}

    if (minPrice !== undefined) filter.price.$gte = Number(minPrice)
    if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice)
  }

  if (title) filter.title = { $regex: title, $options: 'i' }
  if (branch) filter.branch = { $regex: branch, $options: 'i' }

  const sortQuery = sort ? sort.split(',').join(' ') : {}

  const products = await Product.find(filter).sort(sortQuery).skip(skip).limit(limit).exec()

  return res.status(200).json({
    isSuccess: true,
    count: products.length,
    page,
    limit,
    products,
  })
})

const updateProduct = asyncHandler(async (req, res) => {
  const { _id } = req.body || {}

  if (!_id) throw new Error('Invalid product Id')

  if (req.body?.title) req.body.slug = slug(req.body.title)
  const product = await Product.findByIdAndUpdate(_id, req.body, {
    returnDocument: 'after',
  })

  if (!product) throw new Error('Update product failed')

  return res.status(200).json({
    isSuccess: true,
    product,
  })
})

const deleteProduct = asyncHandler(async (req, res) => {
  const { _id } = req.query || {}
  if (!_id) throw new Error('Invalid product Id')
  const response = await Product.findByIdAndDelete(_id)
  if (!response) throw new Error('Delete product failed')
  return res.status(200).json({
    isSuccess: true,
    message: 'Delete product successful',
  })
})

// const handleRating = asyncHandler(async (req, res) => {
//   const { _id } = req.user
//   const { star, comment, productId } = req.body || {}

//   const validation = ratingchema.validate({ ...req.body })
//   if (validation.error) {
//     throw new Error(validation.error.message)
//   }

//   const product = await Product.findById(productId)
//   const alreadyRating = product.ratings.find((rating) => rating.postedBy.toString() === _id)

//   if (alreadyRating) {
//     await Product.updateOne(
//       { 'ratings._id': alreadyRating._id },
//       {
//         $set: { 'ratings.$.star': Number(star), 'ratings.$.comment': comment },
//       },
//       { returnDocument: 'after' },
//     )
//   } else {
//     await Product.findByIdAndUpdate(
//       productId,
//       {
//         $push: { ratings: { star: Number(star), comment, postedBy: _id } },
//       },
//       { returnDocument: 'after' },
//     )
//   }

//   const totalRating = product.ratings.length
//   const totalRatingStar = product.ratings.reduce((total, rating) => (total += +rating.star), 0)
//   const sumRating = Math.round((totalRatingStar * 10) / totalRating) / 10
//   product.totalRatings = sumRating
//   await product.save()

//   const updatedRating = product.ratings.map((rating) => {
//     if (rating.postedBy.toString() === _id) return { star: Number(star), comment, postedBy: productId, _id: rating._id }
//     return rating
//   })

//   return res.status(200).json({
//     isSuccess: true,
//     product: { ...product.toObject(), ratings: updatedRating, totalRatings: sumRating },
//   })
// })

const handleRating = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user
  const { star, comment, productId } = req.body || {}

  const validation = ratingchema.validate({ ...req.body })
  if (validation.error) throw new Error(validation.error.message)

  const product = await Product.findById(productId)
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  const numericStar = Number(star)
  const existingIndex = product.ratings.findIndex((r) => r.postedBy.toString() === userId.toString())

  let updatedRatings = product.ratings.map((r) => r.toObject())
  let dbFilter = { _id: productId }
  let dbOperation = {}

  if (existingIndex !== -1) {
    // 1. Update Existing Rating
    const existingId = product.ratings[existingIndex]._id
    updatedRatings[existingIndex] = { ...updatedRatings[existingIndex], star: numericStar, comment }

    dbFilter = { _id: productId, 'ratings._id': existingId }
    dbOperation = { $set: { 'ratings.$.star': numericStar, 'ratings.$.comment': comment } }
  } else {
    // 2. Add New Rating
    const newRating = { star: numericStar, comment, postedBy: userId }
    updatedRatings.push(newRating)

    dbOperation = { $push: { ratings: newRating } }
  }

  // Calculate totalRatings in-memory
  const totalStarSum = updatedRatings.reduce((sum, r) => sum + Number(r.star), 0)
  const totalRatings = Math.round((totalStarSum * 10) / updatedRatings.length) / 10

  // Combine totalRatings into single DB write
  dbOperation.$set = { ...dbOperation.$set, totalRatings }

  // Execute 1 single DB write operation
  await Product.updateOne(dbFilter, dbOperation)

  return res.status(200).json({
    isSuccess: true,
    product: { ...product.toObject(), ratings: updatedRatings, totalRatings },
  })
})

module.exports = {
  createNewProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  handleRating,
}
