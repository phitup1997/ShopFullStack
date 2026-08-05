const controller = require('../controllers/product')
const router = require('express').Router()
const { verifyToken, isAdmin } = require('../middleware/verifyToken')
const uploadImage = require('../config/cloudinary')

router.get('/', controller.getProduct)
router.get('/products', controller.getProducts)

router.use(verifyToken)
router.post('/rating', controller.handleRating)

router.use(isAdmin)
router.put('/upload-image/:productId', uploadImage.array('images', 5), controller.updateLoadImage)

router.post('/create', controller.createNewProduct)
router.post('/update', controller.updateProduct)
router.delete('/delete', controller.deleteProduct)

module.exports = router
