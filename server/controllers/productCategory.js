const ProductCategory = require("../models/productCategory")
const asyncHandler = require("express-async-handler")

const createProductCategory = asyncHandler(async (req, res) => {
  const { title } = req.body || {}

  if (!title) throw new Error("Invalid category title")
  const category = await ProductCategory.create(req.body)
  if (!category) throw new Error("Create product category failed")

  return res.status(200).json({
    isSuccess: true,
    category,
  })
})

const updateProductCategory = asyncHandler(async (req, res) => {
  const { _id, title } = req.body || {}
  if (!_id && !title) throw new Error("Invalid category id or title")
  const category = await ProductCategory.findByIdAndUpdate(_id, req.body, {
    returnDocument: "after",
  })

  if (!category) throw new Error("Update product category failed")
  return res.status(200).json({
    isSuccess: true,
    category,
  })
})

const getProductCategories = asyncHandler(async (req, res) => {
  const categories = await ProductCategory.find()

  return res.status(200).json({
    isSuccess: true,
    categories,
  })
})

const deleteProductCategory = asyncHandler(async (req, res) => {
  const { _id } = req.query || {}
  if (!_id) throw new Error("Cannot found product category")

  const response = await ProductCategory.findByIdAndDelete(_id)
  if (!response) throw new Error("Delete product category failed")

  return res.status(200).json({
    isSuccess: true,
    message: "Delete product category successful",
  })
})

module.exports = {
  getProductCategories,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
}
