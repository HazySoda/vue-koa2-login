<template>
  <div id="login">
    <div class="login-form__wrap">
      <h1>Vue-Koa2-Login</h1>
      <el-form :model="loginForm" label-width="55px">
        <el-form-item label="手机号">
          <el-input v-model="loginForm.phone" type="text" size="medium" autofocus clearable auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password" type="password" size="medium" clearable auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submit">登录</el-button>
      <el-button @click="goReg">注册新账号</el-button>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/user'

export default {
  data () {
    return {
      loginForm: {
        phone: '',
        password: ''
      }
    }
  },
  methods: {
    // 提交登录表单
    async submit () {
      const data = {
        ...this.loginForm
      }
      try {
        const res = await api.login(data)
        localStorage.token = res.data.token
        // 此处使用 replace，防止用户登陆成功后点击后退按钮重复登录
        this.$router.replace('/')
      } catch (err) {
        console.log(err)
      }
    },
    // 跳转到注册页面
    goReg () {
      this.$router.push('/user/reg')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
