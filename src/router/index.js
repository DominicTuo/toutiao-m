import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 路由表
const routes = [{
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/home',
    children: [{
        path: 'home', //不写代表默认出口
        name: 'home',
        component: () => import('@/views/home'),
      },
      {
        path: 'qa', 
        name: 'qa',
        component: () => import('@/views/qa'),
      },
      {
        path: 'video', 
        name: 'video',
        component: () => import('@/views/video'),
      },
      {
        path: 'my', 
        name: 'my',
        component: () => import('@/views/my'),
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId', //动态路由,不同的文章对应不同的路由
    name: 'article',
    component: () => import('@/views/article'),
    props: true
  },
  {
    path: '/userprofile', //动态路由,不同的文章对应不同的路由
    name: 'userprofile',
    component: () => import('@/views/user-profile'),
  },
]

const router = new VueRouter({
  routes
})

export default router
