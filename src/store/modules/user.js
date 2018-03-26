import * as api from '@/api/user'
import { Message } from 'element-ui'
import router from '@/router/'
import * as types from '../mutation-types'

const state = {
  defaultLoginForm: {
    phone: '',
    password: ''
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
      router.replace('/')
    } catch (e) {
      console.log(e)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
