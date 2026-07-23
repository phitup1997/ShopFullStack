const controller = require('../controllers/coupon')
const router = require('express').Router()
const { verifyToken, isAdmin } = require('../middleware/verifyToken')

router.use(verifyToken)
router.get('/', controller.getCoupons)

router.post('/create', controller.createNewCoupon)
router.put('/update/:couponId', controller.updateCoupon)
router.delete('/delete/:couponId', controller.deleteCoupon)

module.exports = router
