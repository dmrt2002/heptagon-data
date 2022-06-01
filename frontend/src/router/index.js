import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LandingPage from '../views/LandingPage.vue'
import Questions from '../views/Questions.vue'
import Results from '../views/Results.vue'
import AdminLogin from '../views/AdminLogin.vue'
import AdminPanel from '../views/AdminPanel.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/landingpage',
    name: 'landinngpage',
    component: LandingPage
  },
  {
    path: '/questions',
    name: 'questions',
    component: Questions
  },
  {
    path: '/results',
    name: 'results',
    component: Results
  },
  {
    path: '/adminlogin',
    name: 'adminlogin',
    component: AdminLogin
  },
  {
    path: '/adminpanel',
    name: 'adminpanel',
    component: AdminPanel
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
