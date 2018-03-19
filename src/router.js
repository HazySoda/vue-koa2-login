import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UserLayout from './views/user/layout'
import Login from './views/user/login'
import Register from './views/user/reg'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user',
      name: 'user',
      component: UserLayout,
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login
        },
        {
          path: 'reg',
          name: 'register',
          component: Register
        }
      ]
    }
  ]
})
