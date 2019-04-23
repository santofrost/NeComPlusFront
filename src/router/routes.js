import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Banks from '../components/Banks.vue'
import Groups from '../components/Groups.vue'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/banks',
    name: 'banks',
    component: Banks
  },
  {
    path: '/groups',
    name: 'groups',
    component: Groups
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
