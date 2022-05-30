import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/map/location',
    name: 'Location',
    component: () => import('@/views/Location.vue'),
  },
  {
    path: '/map/water',
    name: 'Water',
    component: () => import('@/views/Water.vue'),
  },
  {
    path: '/map/AED',
    name: 'AED',
    component: () => import('@/views/AED.vue'),
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
