<template>
  <div id="home">
    <div class="user-status" v-if="userStatus">
      <h1>{{userStatus.message}}</h1>
      <p>过期时间: {{userStatus.expireTime}}</p>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/user'
import { getDateTime } from '@/util'

export default {
  data () {
    return {
      userStatus: null
    }
  },
  methods: {
    async getUserStatus () {
      try {
        const res = await api.getUserStatus()
        this.userStatus = {
          message: res.data.message,
          expireTime: getDateTime(res.data.expireTime)
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted () {
    this.getUserStatus()
  }
}
</script>

<style scoped lang="scss">
#home {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #333;
  color: #fff;
  .user-status {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    h1 {
      font-size: 26px;
    }
  }
}
</style>
