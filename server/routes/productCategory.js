const controller = require("../controllers/productCategory")
const router = require("express").Router()
const { verifyToken, isAdmin } = require("../middleware/verifyToken")

router.use(verifyToken)
router.get("/", controller.getProductCategories)
router.post("/create", isAdmin, controller.createProductCategory)
router.delete("/delete", isAdmin, controller.deleteProductCategory)
router.post("/update", isAdmin, controller.updateProductCategory)

module.exports = router
