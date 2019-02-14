/* demoPageOne 备注 */
import layout from '@/components/layout/Index'

// 页面备注
const equipmenBigIndex = resolve => require(['@/components/pages/equipmenBig/Index'], resolve)
const equipmenBigDetail = resolve => require(['@/components/pages/equipmenBig/Detail'], resolve)

const routes = [
  {
    path: '/equipmenBig',
    component: layout,
    children: [
      {
        path: 'index',
        component: equipmenBigIndex
      },
      {
        path: 'detail',
        component: equipmenBigDetail
      }
    ]
  }
]

export default routes
