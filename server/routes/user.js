const router = require("express").Router()
const controller = require("../controllers/user")
const { verifyToken } = require("../middleware/verifyToken")

router.post("/register", controller.register)
router.post("/login", controller.login)
router.get("/me", verifyToken, controller.getCurrentUser)
router.post("/refreshToken", controller.handleRefreshToken)
router.post("/logout", controller.logout)
router.post("/forgot-password", controller.forgotPassword)
router.post("/reset-password", controller.resetPassword)

module.exports = router
