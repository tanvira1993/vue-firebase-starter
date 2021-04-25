import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/home.vue'
import Signin from '@/components/signin.vue'
import Signup from '@/components/signup.vue'
import ImagePicker from '@/components/imageUpload.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin',
    component: Signin
  },
  {
    path: '/signup',
    component: Signup
  },
  {
    path: '/imagepicker',
    component: ImagePicker
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
