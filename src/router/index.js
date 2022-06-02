import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/map/location',
    name: 'Location',
    component: () => import('@/views/map/Location.vue'),
  },
  {
    path: '/map/water',
    name: 'Water',
    component: () => import('@/views/map/Water.vue'),
  },
  {
    path: '/map/AED',
    name: 'AED',
    component: () => import('@/views/map/AED.vue'),
  },
  {
    path: '/weather/search',
    name: 'Search',
    component: () => import('@/views/weather/Search.vue'),
  },
  {
    path: '/weather/result',
    name: 'Result',
    component: () => import('@/views/weather/Result.vue'),
  },
  {
    path: "*",
    redirect: { name: "Location" },
  },
]

const router = new VueRouter({
  routes
})

export default router
