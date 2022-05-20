import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LandingPage from '../views/LandingPage.vue'
import Questions from '../views/Questions.vue'
import Results from '../views/Results.vue'

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
