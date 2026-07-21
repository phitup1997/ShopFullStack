const Product = require("../models/product")
const asyncHandler = require("express-async-handler")
const slug = require("slugify")

const createNewProduct = asyncHandler(async (req, res) => {
  if (!Object.keys(req?.body || {}).length === 0)
    throw new Error("Missing inputs")

  if (req.body?.title) req.body.slug = slug(req.body.title)

  const product = await Product.create(req.body)
  if (!product)
    return res.status(400).json({
      isSuccess: false,
      message: "Cannot create new product",
    })

  return res.status(200).json({
    isSuccess: true,
    newProduct: product,
  })
})

const getProduct = asyncHandler(async (req, res) => {
  const { _id } = req.query || {}

  if (!_id) throw new Error("Invalid product id")

  const product = await Product.findById(_id)

  if (!product)
    return res.status(400).json({
      isSuccess: false,
      message: "Cannot found product",
    })

  return res.status(200).json({
    isSuccess: true,
    product,
  })
})

const getProducts = asyncHandler(async (req, res) => {
  const {
    limit: limitParam = 2,
    page: pageParam = 1,
    sort,
    maxPrice,
    minPrice,
    title,
    branch,
    ...queries
  } = req.query

  const limit = Math.max(Number(limitParam) || 2, 1)
  const page = Math.max(Number(pageParam) || 1, 1)
  const skip = (page - 1) * limit

  const filter = { ...queries }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {}

    if (minPrice !== undefined) filter.price.$gte = Number(minPrice)
    if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice)
  }

  if (title) filter.title = { $regex: title, $options: "i" }
  if (branch) filter.branch = { $regex: branch, $options: "i" }

  const sortQuery = sort ? sort.split(",").join(" ") : {}

  const products = await Product.find(filter)
    .sort(sortQuery)
    .skip(skip)
    .limit(limit)
    .exec()

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

  if (!_id) throw new Error("Invalid product Id")

  if (req.body?.title) req.body.slug = slug(req.body.title)
  const product = await Product.findByIdAndUpdate(_id, req.body, {
    returnDocument: "after",
  })

  if (!product) throw new Error("Update product failed")

  return res.status(200).json({
    isSuccess: true,
    product,
  })
})

const deleteProduct = asyncHandler(async (req, res) => {
  const { _id } = req.query || {}
  if (!_id) throw new Error("Invalid product Id")
  const response = await Product.findByIdAndDelete(_id)
  if (!response) throw new Error("Delete product failed")
  return res.status(200).json({
    isSuccess: true,
    message: "Delete product success",
  })
})

module.exports = {
  createNewProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
}
