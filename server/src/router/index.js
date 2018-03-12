const user = require('./user')

module.exports = app => {
  app.use(user.routes(), user.allowedMethods())
}
