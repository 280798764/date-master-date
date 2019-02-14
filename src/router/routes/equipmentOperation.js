/* demoPageOne 备注 */
import layout from '@/components/layout/Index'

// 页面备注
const equipmentOperationIndex = resolve => require(['@/components/pages/equipmentOperation/Index'], resolve)
const equipmentOperationDetail = resolve => require(['@/components/pages/equipmentOperation/Detail'], resolve)

const routes = [
  {
    path: '/equipmentOperation',
    component: layout,
    children: [
      {
        path: 'index',
        component: equipmentOperationIndex
      },
      {
        path: 'detail',
        component: equipmentOperationDetail
      }
    ]
  }
]

export default routes
