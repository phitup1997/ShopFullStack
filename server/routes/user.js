const router = require("express").Router()
const controller = require("../controllers/user")
const { verifyToken, isAdmin } = require("../middleware/verifyToken")

router.post("/register", controller.register)
router.post("/login", controller.login)
router.post("/refreshToken", controller.handleRefreshToken)
router.post("/logout", controller.logout)
router.get("/forgot-password", controller.forgotPassword)
router.put("/reset-password", controller.resetPassword)

router.use(verifyToken)
router.get("/me", controller.getCurrentUser)
// User update profile
router.put("/update", controller.updateUser)

router.use(isAdmin)
router.get("/users", controller.getUsers)
router.delete("/delete-user", controller.deleteUser)
// Update user by admin
router.put("/update-user", controller.updateUserByAdmin)

module.exports = router
