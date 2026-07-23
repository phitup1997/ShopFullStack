const joi = require('joi')

const updateUserSchema = joi
  .object({
    _id: joi.string().required(),
    firstName: joi.string().trim(),
    lastName: joi.string().trim(),
    email: joi.string().email(),
    mobile: joi.string().pattern(/^[0-9]{10,15}$/),
    cart: joi.array(),
    address: joi.array(),
    wishlist: joi.array(),
  })
  .min(2)
  .message({ 'object.min': 'You must provide at least one field to update' })
  .options({ stripUnknown: true })

module.exports = {
  updateUserSchema,
}
