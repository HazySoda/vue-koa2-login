import _axios from '../axios'

// 用户登录
export const login = data => _axios.post('/user/login', data)

// 用户注册
export const reg = data => _axios.post('/user/reg', data)
