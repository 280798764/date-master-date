import layout from '@/components/layout/Index'

const homepageIndex = resolve => require(['@/components/pages/homepage/Index'], resolve)

const routes = [
  {
    // path: '/index',
    path: '',
    component: layout,
    children: [
      {
        path: '',
        component: homepageIndex
      }
    ]
  }
]

export default routes
