import * as types from '../mutation-types'
import router from '@/router/'
import * as api from '@/api/user'
import { Message } from 'element-ui'

const state = {
  defaultLoginForm: {
    phone: '',
    password: ''
  },
  defaultRegForm: {
    phone: '',
    password: '',
    nickname: ''
  },
  token: ''
}

const getters = {}

const mutations = {
  [types.SET_TOKEN] (state, payload) {
    state.token = payload
  }
}

const actions = {
  async submitLoginForm ({commit}, payload) {
    try {
      const res = await api.login(payload)
      if (res.data.code !== 0) {
        Message({
          type: 'error',
          message: res.data.message,
          duration: 1000
        })
        return
      }
      localStorage.token = res.data.token
      // 必须通过提交 mutation 来改变 state
      commit(types.SET_TOKEN, res.data.token)
      // 此处使用 replace，防止用户登陆成功后点击后退按钮重复登录
      window.setTimeout(() => {
        router.replace('/')
      }, 1000)
      Message({
        type: 'success',
        message: '登录成功！',
        duration: 1000
      })
    } catch (e) {
      console.log(e)
    }
  },
  async submitRegForm ({commit}, payload) {
    try {
      const res = await api.reg(payload)
      if (res.data.code !== 0) {
        Message({
          type: 'error',
          message: res.data.message,
          duration: 1000
        })
        return
      }
      // 注册成功后存储 token 并跳转到验证页
      localStorage.token = res.data.token
      commit(types.SET_TOKEN, res.data.token)
      window.setTimeout(() => {
        router.replace('/')
      }, 1000)
      Message({
        type: 'success',
        message: '注册成功！',
        duration: 1000
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
