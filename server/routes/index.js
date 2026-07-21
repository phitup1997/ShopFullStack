const user = require("./user")
const product = require("./product")
const { notFound, handleError } = require("../middleware/handlerError")

const initRoutes = (app) => {
  app.use("/api/user", user)
  app.use("/api/product", product)

  app.use(notFound)
  app.use(handleError)
}

module.exports = initRoutes
