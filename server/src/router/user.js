const router = require('koa-router')()
const userController = require('../controllers/user')
const auth = require('../middlewares/auth')

router.prefix('/user')

router.post('/login', auth, userController.login)

router.post('/reg', userController.reg)

module.exports = router
