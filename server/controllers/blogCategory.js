const BlogCategory = require('../models/blogCategory')
const asyncHandler = require('express-async-handler')

const createBlogCategory = asyncHandler(async (req, res) => {
  const { title } = req.body || {}

  if (!title) throw new Error('Invalid category title')
  const category = await BlogCategory.create(req.body)
  if (!category) throw new Error('Create blog category failed')

  return res.status(200).json({
    isSuccess: true,
    category,
  })
})

const updateBlogCategory = asyncHandler(async (req, res) => {
  const { _id, title } = req.body || {}
  if (!_id && !title) throw new Error('Invalid category id or title')
  const category = await BlogCategory.findByIdAndUpdate(_id, req.body, {
    returnDocument: 'after',
  })

  if (!category) throw new Error('Update blog category failed')
  return res.status(200).json({
    isSuccess: true,
    category,
  })
})

const getBlogCategories = asyncHandler(async (req, res) => {
  const categories = await BlogCategory.find()

  return res.status(200).json({
    isSuccess: true,
    categories,
  })
})

const deleteBlogCategory = asyncHandler(async (req, res) => {
  const { _id } = req.query || {}
  if (!_id) throw new Error('Cannot found blog category')

  const response = await BlogCategory.findByIdAndDelete(_id)
  if (!response) throw new Error('Delete blog category failed')

  return res.status(200).json({
    isSuccess: true,
    message: 'Delete blog category successful',
  })
})

module.exports = {
  getBlogCategories,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
}
