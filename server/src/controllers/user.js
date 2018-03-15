const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { regexs } = require('../util')
const config = require('../config/index')
const UserModel = require('../init/db').User

// 校验请求参数
const validate = params => {
  if (typeof params !== 'object') {
    throw new Error('Param must be a Object')
  }
  const keys = Object.keys(params)
  if (!keys.length) {
    return false
  }
  const valid = keys.every(key => {
    return regexs[key].test(params[key])
  })
  return valid
}

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
    // 获取请求参数
    const { phone, password, nickname } = ctx.request.body
    // 校验请求参数
    const valid = validate({phone, password, nickname})
    if (!valid) {
      ctx.status = 400
      ctx.body = {
        code: 400,
        message: '参数错误'
      }
      return
    }
    try {
      // 判断手机号码是否已经注册
      const user = await UserModel.findOne({
        where: {
          phone
        }
      })
      if (user) {
        ctx.status = 400
        ctx.body = {
          code: 400,
          message: '该手机号码已被注册'
        }
        return
      }
      // 加密明文密码
      const hashPwd = await bcrypt.hash(password, 10)
      // 构建用户数据
      const data = {
        phone,
        password: hashPwd,
        nickname
      }
      // 存入数据库
      await UserModel.create(data)
      ctx.status = 200
      ctx.body = {
        code: 200,
        message: '注册成功',
        data
      }
    } catch (e) {
      console.log(e)
      ctx.status = 500
      ctx.body = {
        code: 500,
        message: e.message
      }
    }
  }
}
