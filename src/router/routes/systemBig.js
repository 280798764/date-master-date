/* demoPageOne 备注 */
import layout from '@/components/layout/Index'

// 页面备注
const systemBigIndex = resolve => require(['@/components/pages/systemBig/Index'], resolve)
const systemBigDetail = resolve => require(['@/components/pages/systemBig/Detail'], resolve)

const routes = [
  {
    path: '/systemBig',
    component: layout,
    children: [
      {
        path: 'index',
        component: systemBigIndex
      },
      {
        path: 'detail',
        component: systemBigDetail
      }
    ]
  }
]

export default routes
