/* 登陆页面 */
const index = resolve => require(['@/components/pages/login/Index'], resolve)

const routes = [
  {
    path: '/index',
    component: index
  }
]

export default routes
