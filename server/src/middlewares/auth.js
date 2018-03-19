const jwt = require('jsonwebtoken')
const config = require('../config/index')

module.exports = async (ctx, next) => {
  // 从 Request Headers 的 Authorization 字段中获取 token
  const authorization = ctx.get('Authorization')
  const token = authorization.split(' ')[1]
  // 如果获取不到 token，则抛出错误
  if (!token) {
    ctx.status = 401
    ctx.body = {
      code: 401,
      message: 'No token detected in HTTP header [Authorization]'
    }
    return
  }
  // 如果获取到了 token，则对 token 进行校验
  try {
    jwt.verify(token, config.jwt.secret)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 401
    ctx.body = {
      code: 401,
      message: 'Token is expired.'
    }
  }
}
