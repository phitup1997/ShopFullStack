const joi = require('joi')

const createProductSchema = joi
  .object({
    title: joi.string().trim().required().messages({
      'string.empty': 'Title cannot be empty',
      'any.required': 'Title is required',
    }),
    slug: joi.string().lowercase().optional(),
    description: joi.string().optional().allow(''),
    branch: joi.string().trim().required().messages({
      'string.empty': 'Branch cannot be empty',
      'any.required': 'Branch is required',
    }),
    price: joi.number().min(0).required().messages({
      'number.base': 'Price must be a number',
      'any.required': 'Price is required',
    }),
    category: joi.string().hex().length(24).optional().messages({
      'string.length': 'Invalid Category ID format',
    }),
    quantity: joi.number().integer().min(0).default(0),
    sold: joi.number().integer().min(0).default(0),
    images: joi.array().items(joi.string()).optional(),
    color: joi.string().optional(),
    ratings: joi
      .array()
      .items(
        joi.object({
          star: joi.number().min(1).max(5),
          postedBy: joi.string().hex().length(24),
          comment: joi.string(),
        }),
      )
      .optional(),

    totalRatings: joi.number().min(0).default(0),
  })
  .options({ stripUnknown: true }) // Strips out unrecognized fields automatically

const ratingchema = joi.object({
  star: joi.number().required(),
  comment: joi.string().trim().optional(),
  productId: joi.string().trim().required(),
})
module.exports = {
  createProductSchema,
  ratingchema,
}
