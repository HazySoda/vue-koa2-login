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
      <el-button type="primary" @click="submit">注册</el-button>
      <el-button>登录</el-button>
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
    async submit () {
      const data = {
        ...this.regForm
      }
      try {
        const res = await api.reg(data)
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
