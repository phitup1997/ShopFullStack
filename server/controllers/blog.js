const Blog = require('../models/blog')
const asyncHandler = require('express-async-handler')
const { createBlogSchema, updateBlogSchema } = require('../Utils/schema')

const createNewBlog = asyncHandler(async (req, res) => {
  const { error } = createBlogSchema.validate({ ...req.body })
  if (error) throw new Error(error.message)

  const blog = await Blog.create(req.body)
  if (!blog) throw new Error('Cannot create new blog')

  return res.status(200).json({
    isSuccess: true,
    blog,
  })
})

const updateBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params

  const { error } = updateBlogSchema.validate({ blogId, ...req.body })
  if (error) throw new Error(error.message)

  const blog = await Blog.findByIdAndUpdate(blogId, req.body, { returnDocument: 'after' })
  if (!blog) throw new Error('Update blog failed')

  return res.status(200).json({
    isSuccess: true,
    blog,
  })
})

const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find()
  return res.status(200).json({
    isSuccess: true,
    blogs,
  })
})

const handleLikeBlog = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user
  const { blogId } = req.body || {}

  if (!blogId) throw new Error('Invalid blog id')

  const blog = await Blog.findById(blogId)
  const alreadyDisliked = blog.dislikes.find((el) => el.toString() === userId)
  if (alreadyDisliked) {
    const response = await Blog.findByIdAndUpdate(blogId, { $pull: { dislikes: userId } }, { returnDocument: 'after' })
    return res.status(200).json({
      isSuccess: true,
      response,
    })
  }

  const isLiked = blog.likes.find((el) => el.toString() === userId)
  if (isLiked) {
    const response = await Blog.findByIdAndUpdate(blogId, { $pull: { likes: userId } }, { returnDocument: 'after' })
    return res.status(200).json({
      isSuccess: true,
      response,
    })
  } else {
    const response = await Blog.findByIdAndUpdate(blogId, { $push: { likes: userId } }, { returnDocument: 'after' })
    return res.status(200).json({
      isSuccess: true,
      response,
    })
  }
})

const handleDislikeBlog = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user
  const { blogId } = req.body || {}

  if (!blogId) throw new Error('Invalid blog id')

  const blog = await Blog.findById(blogId)
  const isLiked = blog.likes.find((el) => el.toString() === userId)
  if (isLiked) {
    const response = await Blog.findByIdAndUpdate(blogId, { $pull: { likes: userId } }, { returnDocument: 'after' })
    return res.status(200).json({
      isSuccess: true,
      response,
    })
  }

  const isDisliked = blog.dislikes.find((el) => el.toString() === userId)
  if (isDisliked) {
    const response = await Blog.findByIdAndUpdate(blogId, { $pull: { dislikes: userId } }, { returnDocument: 'after' })
    console.log(`isDisliked : ${response}`)
  } else {
    const response = await Blog.findByIdAndUpdate(blogId, { $push: { dislikes: userId } }, { returnDocument: 'after' })
    console.log(`dislike : ${response}`)
  }

  return res.status(200).json({
    isSuccess: true,
    message: 'Test Ok',
  })
})

const getBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params

  if (!blogId) throw new Error('Invalid blog id')

  const blog = await Blog.findByIdAndUpdate(blogId, { $inc: { numberViews: 1 } }, { returnDocument: 'after' })
    .populate('likes', 'firstName lastName')
    .populate('dislikes', 'firstName lastName')
  if (!blog) throw new Error('Cannot found blog')

  return res.status(200).json({
    isSuccess: true,
    blog,
  })
})

const deleteBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params
  if (!blogId) throw new Error('Invalid blog id')
  const response = await Blog.findByIdAndDelete(blogId)
  if (!response) throw new Error('Cannot delete blog')

  return res.status(200).json({
    isSuccess: true,
    message: 'Delete blog successful',
  })
})

module.exports = {
  createNewBlog,
  updateBlog,
  getBlogs,
  handleLikeBlog,
  handleDislikeBlog,
  getBlog,
  deleteBlog,
}
