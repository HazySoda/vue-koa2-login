const router = require('koa-router')()
const userController = require('../controllers/user')

router.prefix('/user')

router.get('/login', userController.login)

router.get('/reg', userController.reg)

module.exports = router
