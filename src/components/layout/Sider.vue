<!--<template>
  <section>
    &lt;!&ndash;<navigation :navList="navList"></navigation>&ndash;&gt;
  </section>
</template>-->
<template>
  <section class="nav-wrapper">
    <div>
      <ul v-for="(nav, i) in navList" :key="i" @click="firstIndex">
        <li class="parent" @click="toggleSubNav(nav, i)" :class="{navBg: nav[url] === this.$router}">
          <!--<i class="iconfont" :class="idToIcon[nav.moduleId]"></i>-->
          <span>{{nav.moduleName}}</span>
          <!--<i class="iconfont" :class="nav.isOpen?'icon-less':'icon-moreunfold'" v-if="nav.isOpen" ></i>
          <i class="iconfont" :class="nav.isOpen?'icon-less':'icon-moreunfold'" v-if="!nav.isOpen"></i>-->
        </li>
       <!-- <li v-show="nav.isOpen" v-for="(subnav, index) in nav.pages" class="child" @click="clearFilterParams" :key="index">
          <router-link tag="div" :to="idToPath[subnav.url]">{{subnav.pageName}}</router-link>
        </li>-->
      </ul>
    </div>
  </section>
</template>

<script>
// import { Navigation } from '@/components/modules'

/* const navList = [{
  name: '系统管理',
  icon: 'nav-apply-audit',
  isOpen: true,
  children: [
    {
      name: '设备管理',
      path: '/device/index'
    }
  ]
}] */
const idToPath = {
  'manage_equipment_type': '/systemBig/index', // 系统大类管理
  'manage_operation_log': '/equipmentOperation/index', // 设备操作记录
  'manage_equipment_category': '/systemMall/index', // 系统小类管理
  'manage_equipment': '/device/index', // 设备管理
  'manage_bigmap_type': '/typalMap/index', // 地图类别管理
  'type_equipment_manage': '/equipmenBig/index', // 设备大类管理
  'type_category_manage': '/equipmenMall/index' // 设备小类管理
}
const idToIcon = {
  'fa6e3efbaef64d02a6772f68a986aea3': 'icon-yingyongguanli',
  'cb34636b067f454fa8e6c71a117f4a7b': 'icon-dingdanguanli',
  'df05a2c982d34652b3c860a534757c7d': 'icon-caiwuguanli',
  '959c044a529248f4929c2f2f8a8dbab0': 'icon-yonghuguanli',
  '003a8001f61b42049e1faf4cb3a5d43b': 'icon-kaifazherenzhengguanli',
  'f71bef44d6eb49dea78d4a42a1c5d0cc': 'icon-kaifahuanjingshenqingguanli',
  '54ef3aa408564186b2b33dfef2ab3d4c': 'icon-yingyongshenheguanli',
  '6c7a3619dbf1418d884351188055dfcb': 'icon-neirongguanli',
  '1262cc9541d64db6995b71036959345c': 'icon-quanxianguanli',
  'd3a80c2d0d1f4db09222befacecfac98': 'icon-dabao'
}

export default {
  data () {
    return {
      navList: [],
      idToIcon: idToIcon,
      idToPath: idToPath
    }
  },
  components: {
    // Navigation
  },
  mounted () {
    this.navList = JSON.parse(sessionStorage.getItem('routerList'))
    console.log(this.navList, 'routerList')
  },
  methods: {
    firstIndex () {},
    clearFilterParams () {},
    toggleSubNav (nav) {
      this.$router.push(this.idToPath[nav.url])
    }
  }
}
</script>

<style lang="less">
  /* 导航栏样式 */
  @import "~@/assets/styles/color.less";

  .nav-wrapper {
    color: @colorLabel;
  ul {
    cursor: pointer;
    list-style: none;
    user-select: none;
  &:not(:first-child) {
     border-top: 1px solid #F4E9E9;
   }
  &:last-child {
     border-bottom: 1px solid #F4E9E9;
   }
  li {
    display: flex;
    align-items: center;
    cursor: pointer;
  &.parent {
     padding: 0 14px 0 20px;
     height: 52px;
     line-height: 52px;
  .iconfont {
    display: flex;
    width: 19px;
  }
  span {
    display: flex;
    margin-left: 14px;
    width: 73%;
  }
  .nav-arrow-up, .nav-arrow-down {
    display: flex;
    width: 12px;
    font-size: 12px;
  }
  }
  &.child div {
     display: flex;
     flex: 1;
     align-items: center;
     padding-left: 52px;
     height: 36px;
     background-color: #f5f5f5;
  &:hover {
     background: #e5e8ee;
   }
  &.router-link-active {
     background: @colorOrange;
   }
  }
  }
  }
  }
  .oncall {
    display: flex;
    height: 52px;
    padding-left: 20px;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
    border-top: 1px solid #F4E9E9;
  }
  .navBg {
    background-color: #FABF40;
  }

</style>
