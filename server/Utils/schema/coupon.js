const joi = require('joi')

const createCouponSchema = joi
  .object({
    name: joi.string().trim().required().messages({
      'string.empty': 'Title cannot be empty',
      'any.required': 'Title is required',
    }),
    discount: joi.number().required(),
    expiry: joi.number().required(),
  })
  .options({ stripUnknown: true })

const updateCouponSchema = joi
  .object({
    couponId: joi.string().required(),
    name: joi.string().optional(),
    discount: joi.number().optional(),
    expiry: joi.number().optional(),
  })
  .min(2)
  .message({ 'object.min': 'You must provide at least one field to update' })
  .options({ stripUnknown: true })

module.exports = {
  createCouponSchema,
  updateCouponSchema,
}
