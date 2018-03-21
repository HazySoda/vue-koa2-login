<template>
  <div id="reg">
    <div class="reg-form__wrap">
      <h1>注册</h1>
      <el-form size="medium" :model="regForm" ref="regForm" :rules="regFormRules" label-width="65px">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="regForm.phone" type="text" autofocus clearable auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="regForm.password" type="password" clearable auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="regForm.nickname" type="text" autofocus clearable auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="reg-form__actions">
        <el-button type="primary" @click="submit">立即注册</el-button>
        <el-button @click="goLogin">登录已有账号</el-button>
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
      regForm: {
        phone: '',
        password: '',
        nickname: ''
      },
      regFormRules: {
        phone: [
          {required: true, message: '请输入手机号码'},
          {pattern: regexs.phone, message: '手机号码格式有误，请检查'}
        ],
        password: [
          {required: true, message: '请输入密码'},
          {pattern: regexs.password, message: '请输入6-18位字母数字组合 (第一位必须为字母)'}
        ],
        nickname: [
          {required: true, message: '请输入手机号码'},
          {pattern: regexs.nickname, message: '请输入2-10位的中英文组合 (不允许特殊符号)'}
        ]
      }
    }
  },
  methods: {
    // 提交注册表单
    async submit () {
      this.$refs.regForm.validate(async valid => {
        if (valid) {
          const data = {
            ...this.regForm
          }
          try {
            const res = await api.reg(data)
            if (res.data.code !== 0) {
              this.$message({
                type: 'error',
                message: res.data.message,
                duration: 1000
              })
              return
            }
            // 注册成功后存储 token 并跳转到验证页
            localStorage.token = res.data.token
            window.setTimeout(() => {
              this.$router.replace('/')
            }, 1000)
            this.$message({
              type: 'success',
              message: '注册成功！',
              duration: 1000
            })
          } catch (err) {
            console.log(err)
          }
        }
      })
    },
    // 跳转到登录页面
    goLogin () {
      this.$router.push('/user/login')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
