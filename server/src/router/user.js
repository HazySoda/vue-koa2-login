const router = require('koa-router')()
const userController = require('../controllers/user')
const auth = require('../middlewares/auth')

router.prefix('/user')

router.get('/login', auth, userController.login)

router.get('/reg', userController.reg)

module.exports = router
