<template>
  <section>
    <navigation :navList="navList"></navigation>
  </section>
</template>

<script>
import { Navigation } from '@/components/modules'

const navList = [{
  name: '系统管理',
  icon: 'nav-apply-audit',
  isOpen: true,
  children: [
    {
      name: '设备管理',
      path: '/demo-page-one/index'
    }
  ]
}]

export default {
  data () {
    return {
      navList: navList
    }
  },
  components: {
    Navigation
  }
}
</script>
