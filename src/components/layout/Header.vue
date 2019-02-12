<template>
  <section class="header-wrapper">
    <div class="header">
      <div class="left">
        <i class="iconfont icon-diagnose-logo"></i>
        <span>设备数据管理平台</span>
      </div>
      <div class="right">
        <span class="usericon"><img src="~@/assets/images/usericon.png" alt=""></span>
        <span class="username">{{userName || '未登录'}}</span>
        <span class="logout" @click="logout">退出</span>
      </div>
    </div>
  </section>
</template>

<script>
import { DOMAIN } from '@/utils/config'

export default {
  data () {
    return {
      userName: ''
    }
  },
  created () {
    this.userName = sessionStorage.getItem('name') || 'defaultName'
  },
  methods: {
    // 登出
    logout () {
      sessionStorage.clear()
      // 判断是线上还是本地环境
      if (location.hostname === 'localhost') {
        location.replace('http://' + location.host)
      } else {
        location.replace(DOMAIN.origin)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import "~@/assets/styles/modules/header.less";
</style>
