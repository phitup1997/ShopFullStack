const joi = require('joi')

// prettier-ignore
const registerSchema = joi.object({
  firstName: joi.string().trim().required(),
  lastName: joi.string().trim().required(),
  email: joi.string().email().pattern(/@gmail\.com$/).required(),
  password: joi.string().min(6).max(16).required(),
  mobile: joi.string().pattern(/^[0-9]{10,15}$/).required() // Adjust Regex to match your phone number needs
})

// prettier-ignore
const loginSchema = joi.object({
  email: joi.string().email().pattern(/@gmail\.com$/).required(),
  password: joi.string().min(6).max(16).required(),
})

// prettier-ignore
const forgotPasswordSchema = joi.object({
  email: joi.string().email().pattern(/@gmail\.com$/).required(),
})

const resetPasswordSchema = joi.object({
  password: joi.string().trim().required(),
  token: joi.string().trim().required(),
})

module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
}
