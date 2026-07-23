const controller = require('../controllers/blog')
const router = require('express').Router()
const { verifyToken, isAdmin } = require('../middleware/verifyToken')

router.use(verifyToken)
router.get('/', controller.getBlogs)
router.get('/:blogId', controller.getBlog)
router.put('/like', controller.handleLikeBlog)
router.put('/dislike', controller.handleDislikeBlog)

router.use(isAdmin)
router.post('/create', controller.createNewBlog)
router.put('/update/:blogId', controller.updateBlog)
router.delete('/delete/:blogId', controller.deleteBlog)

module.exports = router
