const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { regexs } = require('../util')
const config = require('../config/index')
const UserModel = require('../init/db').User
const { Op } = require('sequelize')

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
    // 获取请求参数
    const { phone, password } = ctx.request.body
    // 校验请求参数
    const valid = validate({phone, password})
    if (!valid) {
      ctx.status = 400
      ctx.body = {
        code: 400,
        message: '参数错误'
      }
      return
    }
    try {
      // 判断该用户是否存在
      const user = await UserModel.findOne({
        where: {
          phone
        }
      })
      if (!user) {
        // 如果不存在，返回错误信息
        ctx.status = 200
        ctx.body = {
          code: -1,
          message: '此手机号码尚未注册'
        }
      } else {
        // 如果存在，则判断密码与数据库中的密码是否匹配
        const isPwdValid = await bcrypt.compare(password, user.password)
        if (isPwdValid) {
          // 如果匹配，继续登录流程
          const payload = {
            uid: user.id,
            phone: user.phone
          }
          // 签发 token 并返回给客户端
          const token = jwt.sign(payload, config.jwt.secret, config.jwt.options)
          ctx.status = 200
          ctx.body = {
            code: 0,
            message: '登录成功',
            token
          }
        } else {
          // 如果不匹配，则提示用户名或密码错误
          // 如果只提示密码错误，某些别有用心的人就会知道账户是存在的，防止暴力破解
          ctx.status = 200
          ctx.body = {
            code: -2,
            message: '用户名或密码错误'
          }
        }
      }
    } catch (e) {
      console.log(e)
      ctx.status = 500
      ctx.body = {
        code: 500,
        message: e.message
      }
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
          [Op.or]: [{phone}, {nickname}]
        }
      })
      if (user && (user.phone === phone)) {
        ctx.status = 200
        ctx.body = {
          code: -1,
          message: '该手机号码已被注册'
        }
        return
      } else if (user && (user.nickname === nickname)) {
        ctx.status = 200
        ctx.body = {
          code: -2,
          message: '该昵称已被注册'
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
        code: 0,
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
