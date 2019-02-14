/* demoPageOne 备注 */
import layout from '@/components/layout/Index'

// 页面备注
const systemMallIndex = resolve => require(['@/components/pages/systemMall/Index'], resolve)
const systemMallDetail = resolve => require(['@/components/pages/systemMall/Detail'], resolve)

const routes = [
  {
    path: '/systemMall',
    component: layout,
    children: [
      {
        path: 'index',
        component: systemMallIndex
      },
      {
        path: 'detail',
        component: systemMallDetail
      }
    ]
  }
]

export default routes
