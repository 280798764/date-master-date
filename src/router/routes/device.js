/* demoPageOne 备注 */
import layout from '@/components/layout/Index'

// 页面备注
const deviceIndex = resolve => require(['@/components/pages/device/Index'], resolve)
const deviceDetail = resolve => require(['@/components/pages/device/Detail'], resolve)

const routes = [
  {
    path: '/device',
    component: layout,
    children: [
      {
        path: 'detail',
        component: deviceDetail
      },
      {
        path: 'index',
        component: deviceIndex
      }
    ]
  }
]

export default routes
