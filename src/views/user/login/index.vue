<template>
  <div id="login">
    <div class="login-form__wrap">
      <h1>登录</h1>
      <el-form size="medium" :model="loginForm" ref="loginForm" :rules="loginFormRules" label-width="65px">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="loginForm.phone" type="text" autofocus clearable auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" clearable auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="login-form__actions">
        <el-button type="primary" @click="submit">登录</el-button>
        <el-button @click="goReg">注册新账号</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { regexs } from '@/util'
import * as api from '@/api/user'

export default {
  data () {
    return {
      loginForm: {
        phone: '',
        password: ''
      },
      loginFormRules: {
        phone: [
          {required: true, message: '请输入手机号码'},
          {pattern: regexs.phone, message: '手机号码格式有误，请检查'}
        ],
        password: [
          {required: true, message: '请输入密码'},
          {pattern: regexs.password, message: '请输入6-18位字母数字组合 (第一位必须为字母)'}
        ]
      }
    }
  },
  methods: {
    // 提交登录表单
    submit () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          const data = {...this.loginForm}
          try {
            const res = await api.login(data)
            if (res.data.code !== 0) {
              this.$message({
                type: 'error',
                message: res.data.message,
                duration: 1000
              })
              return
            }
            localStorage.token = res.data.token
            window.setTimeout(() => {
              // 此处使用 replace，防止用户登陆成功后点击后退按钮重复登录
              this.$router.replace('/')
            }, 1000)
            this.$message({
              type: 'success',
              message: '登录成功！',
              duration: 1000
            })
          } catch (err) {
            console.log(err)
          }
        }
      })
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
