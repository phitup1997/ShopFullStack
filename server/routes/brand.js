const controller = require('../controllers/brand')
const router = require('express').Router()
const { verifyToken, isAdmin } = require('../middleware/verifyToken')

router.use(verifyToken)
router.get('/', controller.getBrands)
router.post('/create', isAdmin, controller.createBrand)
router.delete('/delete/:brandId', isAdmin, controller.deleteBrand)
router.put('/update', isAdmin, controller.updateBrand)

module.exports = router
