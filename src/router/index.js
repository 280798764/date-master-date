import Vue from 'vue'
import Router from 'vue-router'
import iview from 'iview'
import login from './routes/login'
import homepage from './routes/homepage'
import device from './routes/device'
import systemBig from './routes/systemBig'
import equipmentOperation from './routes/equipmentOperation'
import systemMall from './routes/systemMall'
import typalMap from './routes/typalMap'
import equipmenBig from './routes/equipmenBig'
import equipmenMall from './routes/equipmenMall'

Vue.use(Router)

const router = new Router({
  routes: [
    ...login,
    ...homepage,
    ...device,
    ...systemBig,
    ...equipmentOperation,
    ...systemMall,
    ...typalMap,
    ...equipmenBig,
    ...equipmenMall,
    {
      path: '/*',
      redirect: to => {
        return '/index'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 页面调整 去除iview 提示信息
  iview.Notice.destroy()
  next()
})

export default router
