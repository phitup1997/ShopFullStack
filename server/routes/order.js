const controller = require('../controllers/order')
const router = require('express').Router()
const { verifyToken, isAdmin } = require('../middleware/verifyToken')

router.use(verifyToken)

router.post('/create', controller.createOrder)
router.get('/user', controller.getUserOrder)

router.use(isAdmin)
router.get('/', controller.getOrders)
router.put('/update-status/:orderId', controller.updateOrderStatus)

module.exports = router
