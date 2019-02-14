/* demoPageOne 备注 */
import layout from '@/components/layout/Index'

// 页面备注
const equipmenMallIndex = resolve => require(['@/components/pages/equipmenMall/Index'], resolve)
const equipmenMallDetail = resolve => require(['@/components/pages/equipmenMall/Detail'], resolve)

const routes = [
  {
    path: '/equipmenMall',
    component: layout,
    children: [
      {
        path: 'index',
        component: equipmenMallIndex
      },
      {
        path: 'detail',
        component: equipmenMallDetail
      }
    ]
  }
]

export default routes
