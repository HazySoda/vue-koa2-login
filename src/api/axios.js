import axios from 'axios'

// global config
const baseURL = 'http://127.0.0.1:3000'
const token = localStorage.token || ''

// create an new axios instance
const _axios = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  timeout: 60000
})

// interceptors
const resResolve = res => {
  return res
}

const resReject = err => {
  if (err.response.status === 401) {
    window.location.href = '/'
  }
  return Promise.reject(err)
}

_axios.interceptors.response.use(resResolve, resReject)

// export
export default {
  get: (uri, data) => _axios.get(uri, {params: data}),
  post: (uri, data) => _axios.post(uri, data)
}
