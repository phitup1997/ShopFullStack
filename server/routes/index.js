const user = require('./user')
const product = require('./product')
const productCategory = require('./productCategory')
const blogCategory = require('./blogCategory')
const blog = require('./blog')
const brand = require('./brand')
const coupon = require('./coupon')
const { notFound, handleError } = require('../middleware/handlerError')

const initRoutes = (app) => {
  app.use('/api/user', user)
  app.use('/api/product', product)
  app.use('/api/product-category', productCategory)
  app.use('/api/blog-category', blogCategory)
  app.use('/api/blog', blog)
  app.use('/api/brand', brand)
  app.use('/api/coupon', coupon)

  app.use(notFound)
  app.use(handleError)
}

module.exports = initRoutes
