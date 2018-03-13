const UserModel = require('../init/db').User

module.exports = {
  async login (ctx, next) {
    const user = await UserModel.findOne({
      where: {
        id: 0
      }
    })
    ctx.body = user
  },
  async reg (ctx, next) {
    ctx.body = 'Response for /user/reg'
  }
}
