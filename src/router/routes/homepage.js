import layout from '@/components/layout/Index'

const homepageIndex = resolve => require(['@/components/pages/homepage/Index'], resolve)

const routes = [
  {
    path: '/home',
    component: layout,
    children: [
      {
        path: '/homepageIndex',
        component: homepageIndex
      }
    ]
  }
]

export default routes
