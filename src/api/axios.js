import axios from 'axios'
import router from '@/router'

// global config
const config = {
  baseURL: 'http://127.0.0.1:3000',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 60000
}

// create an new axios instance
const _axios = axios.create(config)

// interceptors
const handlers = {
  reqResolve (conf) {
    const token = localStorage.token || ''
    conf.headers.Authorization = `Bearer ${token}`
    return conf
  },
  reqReject (err) {
    return Promise.reject(err)
  },
  resResolve (res) {
    return res
  },
  resReject (err) {
    if (err.response.status === 401) {
      localStorage.token = ''
      router.replace({
        path: '/user/login'
      })
    }
    return Promise.reject(err)
  }
}
_axios.interceptors.request.use(handlers.reqResolve, handlers.reqReject)
_axios.interceptors.response.use(handlers.resResolve, handlers.resReject)

// export
export default {
  get: (uri, data) => _axios.get(uri, {params: data}),
  post: (uri, data) => _axios.post(uri, data)
}
