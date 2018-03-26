<template>
  <div id="login">
    <div class="login-form__wrap">
      <h1>登录</h1>
      <el-form size="medium" :model="loginForm" ref="loginForm" :rules="loginFormRules" label-width="65px">
        <!-- 以下两个 input 用于迷惑 Chrome 浏览器，使自动填充失效 -->
        <input style="display:none" type="text" name="fuckChromeAutoFill"/>
        <input style="display:none" type="password" name="fuckChromeAutoFill"/>
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
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      loginForm: null,
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
  computed: {
    ...mapState(['defaultLoginForm']),
    ...mapActions(['submitLoginForm'])
  },
  methods: {
    // 提交登录表单
    submit () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.$store.dispatch('submitLoginForm', this.loginForm)
        }
      })
    },
    // 跳转到注册页面
    goReg () {
      this.$router.push('/user/reg')
    }
  },
  created () {
    // 每次创建实例时清空表单
    this.loginForm = Object.assign({}, this.defaultLoginForm)
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
