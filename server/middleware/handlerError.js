const notFound = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found!`)
  res.status(404)
  next(error)
}

const handleError = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  return res.status(statusCode).json({
    isSuccess: false,
    message: error?.message,
  })
}

module.exports = {
  notFound,
  handleError
}