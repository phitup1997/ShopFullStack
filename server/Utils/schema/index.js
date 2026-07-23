const authSchema = require('./auth')
const userSchema = require('./user')
const productSchema = require('./product')
const blogSchema = require('./blog')
const couponSchema = require('./coupon')

module.exports = {
  ...authSchema,
  ...userSchema,
  ...blogSchema,
  ...couponSchema,
}
