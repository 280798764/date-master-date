/* demoPageOne 备注 */
import layout from '@/components/layout/Index'

// 页面备注
const typalMapIndex = resolve => require(['@/components/pages/typalMap/Index'], resolve)
const typalMapDetail = resolve => require(['@/components/pages/typalMap/Detail'], resolve)

const routes = [
  {
    path: '/typalMap',
    component: layout,
    children: [
      {
        path: 'index',
        component: typalMapIndex
      },
      {
        path: 'detail',
        component: typalMapDetail
      }
    ]
  }
]

export default routes
