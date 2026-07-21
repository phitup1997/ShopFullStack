const controller = require("../controllers/product")
const router = require("express").Router()
const { verifyToken, isAdmin } = require("../middleware/verifyToken")

router.use(verifyToken)
router.get("/", controller.getProduct)
router.get("/products", controller.getProducts)
router.post("/create", isAdmin, controller.createNewProduct)
router.post("/update", isAdmin, controller.updateProduct)
router.delete("/delete", isAdmin, controller.deleteProduct)

module.exports = router
