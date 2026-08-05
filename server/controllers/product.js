const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const slug = require('slugify')
const cloudinary = require('cloudinary').v2
const { createProductSchema, ratingchema } = require('../Utils/schema')

const dummyProducts = asyncHandler(async (req, res) => {
  const mock_data = {
    title: 'XIAO MI1',
    slug: 'xiao-mil',
    brand: 'XIAOMI',
    price: 7193888,
    category: 'Smartphone',
    quantity: 10,
    sold: 0,
    thumb:
      'https://digital-world-2.myshopify.com/cdn/shop/files/IMG_1890_263275f1-3801-4be5-94d5-1e0e4a44fb85_345x550.png?v=1750768808',
    images: [
      'https://digital-world-2.myshopify.com/cdn/shop/files/IMG_1888_e8361dcb-13ea-4157-9e19-2cae75ef13f7_345x550.png?v=1750768857',
      'https://digital-world-2.myshopify.com/cdn/shop/files/u3_1024x1024.jpg?v=1750768808',
      'https://digital-world-2.myshopify.com/cdn/shop/files/google-pixel-04_1024x1024.jpg?v=1750768808',
    ],
    color: 'blue',
    totalRatings: 0,
    ratings: [],
  }

  const categories = [
    'Smartphone',
    'Tablet',
    'Laptop',
    'Accessories',
    'Television',
    'Printer',
    'Speaker',
    'Camera',
  ]

  const categoryBrands = {
    Smartphone: ['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Vivo'],
    Tablet: ['Apple', 'Samsung', 'Xiaomi', 'Lenovo'],
    Laptop: ['Apple', 'Dell', 'Asus', 'HP', 'Lenovo', 'Acer', 'MSI'],
    Accessories: ['Anker', 'Logitech', 'Baseus', 'Belkin', 'UGreen'],
    Television: ['Samsung', 'LG', 'Sony', 'TCL', 'Xiaomi'],
    Printer: ['Canon', 'HP', 'Epson', 'Brother'],
    Speaker: ['JBL', 'Sony', 'Marshall', 'Bose', 'Harman Kardon'],
    Camera: ['Canon', 'Sony', 'Nikon', 'Fujifilm'],
  }

  const colors = ['black', 'white', 'space gray', 'silver', 'blue']

  for (let i = 0; i < 100; i++) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]

    const brandList = categoryBrands[randomCategory]
    const randomBrand = brandList[Math.floor(Math.random() * brandList.length)]

    const minPrice = 1000000
    const maxPrice = 100000000
    const rawPrice = Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice
    const randomPrice = Math.round(rawPrice / 1000) * 1000 // e.g., 12,450,000

    const title = `${randomBrand} ${randomCategory} Pro Series ${i + 1}`

    const product = {
      title: title,
      slug: slug(title),
      brand: randomBrand,
      price: randomPrice,
      category: randomCategory,
      quantity: Math.floor(Math.random() * 100) + 1, // 1 to 100
      sold: Math.floor(Math.random() * 50), // 0 to 50
      thumb: mock_data.thumb,
      images: mock_data.images,
      color: colors[Math.floor(Math.random() * colors.length)],
      totalRatings: 0,
      ratings: [],
    }

    await Product.create(product)
  }

  return res.status(200).json({
    isSuccess: true,
    message: 'Test Ok',
  })
})

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
  const {
    limit: limitParam = 10,
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
  const existingIndex = product.ratings.findIndex(
    (r) => r.postedBy.toString() === userId.toString(),
  )

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

const updateLoadImage = asyncHandler(async (req, res) => {
  try {
    if (!req?.files) throw new Error('the image file invalid')

    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      { $push: { images: { $each: req.files.map((el) => el.path) } } },
      { returnDocument: 'after' },
    )

    return res.status(200).json({
      isSuccess: true,
      product,
    })
  } catch (error) {
    if (req.files) {
      const fileNames = req.files.map((file) => file.filename)
      cloudinary.api.delete_resources(fileNames)
    }

    return res.status(400).json({
      isSuccess: false,
      message: error.message,
    })
  }
})

module.exports = {
  createNewProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  handleRating,
  updateLoadImage,
}
