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
    },
    {
      name: '子页面2',
      path: '/demo-page-one/detail'
    }
  ]
},
{
  name: '示例页面3',
  icon: 'nav-apply-audit',
  isOpen: true,
  children: [
    {
      name: '子页面1',
      path: '/demo-page-two'
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
