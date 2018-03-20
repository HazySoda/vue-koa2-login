<template>
  <div id="reg">
    <div class="reg-form__wrap">
      <h1>Vue-Koa2-Login</h1>
      <el-form :model="regForm" label-width="55px">
        <el-form-item label="手机号">
          <el-input v-model="regForm.phone" type="text" size="medium" autofocus clearable auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="regForm.password" type="password" size="medium" clearable auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="regForm.nickname" type="text" size="medium" autofocus clearable auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submit">立即注册</el-button>
      <el-button @click="goLogin">登录已有账号</el-button>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/user'

export default {
  data () {
    return {
      regForm: {
        phone: '',
        password: '',
        nickname: ''
      }
    }
  },
  methods: {
    // 提交注册表单
    async submit () {
      const data = {
        ...this.regForm
      }
      try {
        const res = await api.reg(data)
        // 注册成功后存储 token 并跳转到验证页
        localStorage.token = res.data.token
        this.$router.replace('/')
      } catch (err) {
        console.log(err)
      }
    },
    goLogin () {
      this.$router.push('/user/login')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
