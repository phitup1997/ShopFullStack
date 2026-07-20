const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

const verifyToken = asyncHandler(async (req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err)
        return res.status(401).json({
          isSuccess: false,
          message: `Invalid access token ${err}`,
        })
      console.log(`user : ${JSON.stringify(decode)}`)
      req.user = decode
      next()
    })
  } else {
    return res.status(401).json({
      isSuccess: false,
      message: "required access token",
    })
  }
})

module.exports = {
  verifyToken,
}
