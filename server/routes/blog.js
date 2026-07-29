const controller = require('../controllers/blog')
const router = require('express').Router()
const { verifyToken, isAdmin } = require('../middleware/verifyToken')
const uploader = require('../config/cloudinary')

router.use(verifyToken)
router.get('/', controller.getBlogs)
router.get('/:blogId', controller.getBlog)
router.put('/like', controller.handleLikeBlog)
router.put('/dislike', controller.handleDislikeBlog)

router.use(isAdmin)
router.post('/create', controller.createNewBlog)
router.put('/update/:blogId', controller.updateBlog)
router.delete('/delete/:blogId', controller.deleteBlog)

router.put('/upload-image/:blogId', uploader.single('image'), controller.uploadImageBlog)

module.exports = router
