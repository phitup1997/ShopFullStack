const controller = require("../controllers/blogCategory")
const router = require("express").Router()
const { verifyToken, isAdmin } = require("../middleware/verifyToken")

router.use(verifyToken)
router.get("/", controller.getBlogCategories)
router.post("/create", isAdmin, controller.createBlogCategory)
router.delete("/delete", isAdmin, controller.deleteBlogCategory)
router.post("/update", isAdmin, controller.updateBlogCategory)

module.exports = router
