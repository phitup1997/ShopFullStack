const joi = require('joi')

const createBlogSchema = joi
  .object({
    title: joi.string().trim().required().messages({
      'string.empty': 'Title cannot be empty',
      'any.required': 'Title is required',
    }),
    description: joi.string().required(),
    category: joi.string().required(),
    numberViews: joi.number().integer().min(0).default(0),
    isLiked: joi.boolean().default(false),
    isDisliked: joi.boolean().default(false),
    likes: joi.array().items(joi.string().hex().length(24)).optional(),
    dislikes: joi.array().items(joi.string().hex().length(24)).optional(),
    image: joi.string().optional(),
    author: joi.string().optional(),
  })
  .options({ stripUnknown: true })

const updateBlogSchema = joi
  .object({
    blogId: joi.string().required(),
    title: joi.string().trim().optional(),
    description: joi.string().optional(),
    category: joi.string().optional(),
    numberViews: joi.number().integer().optional(),
    isLiked: joi.boolean().optional(),
    isDisliked: joi.boolean().optional(),
    likes: joi.array().items(joi.string().hex().length(24)).optional(),
    dislikes: joi.array().items(joi.string().hex().length(24)).optional(),
    image: joi.string().optional(),
    author: joi.string().optional(),
  })
  .min(2)
  .message({ 'object.min': 'You must provide at least one field to update' })
  .options({ stripUnknown: true })

module.exports = {
  createBlogSchema,
  updateBlogSchema,
}
