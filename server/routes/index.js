const user = require('./user')
const { notFound, handleError } = require('../middleware/handlerError')

const initRoutes = (app) => {
  app.use('/api/user', user)

  app.use(notFound)
  app.use(handleError)
}

module.exports = initRoutes