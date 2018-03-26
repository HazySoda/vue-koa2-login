<template>
  <div id="home">
    <div class="user-status" v-if="userStatus">
      <h1>{{userStatus.message}}</h1>
      <p>过期时间: {{userStatus.expireTime}}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('user', ['userStatus']),
    ...mapActions('user', ['getUserStatus'])
  },
  created () {
    this.$store.dispatch('user/getUserStatus')
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
