const jwt = require('jsonwebtoken')
const config = require('../config/index')
const UserModel = require('../init/db').User

module.exports = {
  async login (ctx, next) {
    const user = await UserModel.findOne({
      where: {
        id: 0
      }
    })
    // 要在 token 中附带的信息
    const payload = {
      uid: user.id,
      phone: user.phone
    }
    // 签发 token 并返回给客户端
    const token = jwt.sign(payload, config.jwt.secret, config.jwt.options)
    ctx.status = 200
    ctx.body = {
      code: 200,
      token
    }
  },
  async reg (ctx, next) {
    ctx.body = 'Response for /user/reg'
  }
}
