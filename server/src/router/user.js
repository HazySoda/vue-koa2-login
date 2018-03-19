const router = require('koa-router')()
const userController = require('../controllers/user')
const auth = require('../middlewares/auth')

router.prefix('/user')

// 登录
router.post('/login', userController.login)
// 注册
router.post('/reg', userController.reg)
// 用户状态
router.get('/status', auth, userController.getStatus)

module.exports = router
