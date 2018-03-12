module.exports = {
  async login (ctx, next) {
    ctx.body = 'Response for /user/login'
  },
  async reg (ctx, next) {
    ctx.body = 'Response for /user/reg'
  }
}
