import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/about',
      name: 'About',
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
      meta: {
        index: 2
      }
    }
  ]
})

export default router
