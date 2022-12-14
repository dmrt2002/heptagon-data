import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LandingPage from '../views/LandingPage.vue'
import Questions from '../views/Questions.vue'
import Results from '../views/Results.vue'
import AdminLogin from '../views/AdminLogin.vue'
import EventsPage from '../views/EventsPage.vue'
import AddEvent from '../views/AddEvent.vue'
import Participants from '../views/Participants.vue'
import AddParticipant from '../views/AddParticipant.vue'
import EventDetails from '../views/EventsDetail.vue'
import bulkUpload from '../views/bulkUpload.vue'
import EventEdit from '../views/EventEdit.vue'
import PartcipantDetails from '../views/ParticipantDetails.vue'
import LoginPage from '../views/LoginPage.vue'
import redirect from '../views/Redirect.vue'
import redirectTwo from '../views/RedirectTwo.vue'
import AssesmentTwo from "../views/AssesmentTwo.vue"
import ResultsTwo from '../views/ResultsTwo.vue'
import AssesmentTwoHome from '../views/AssesmentTwoHome.vue'

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
    path: '/events',
    name: 'events',
    component: EventsPage
  },
  {
    path: '/addevent',
    name: 'addevent',
    component: AddEvent
  },
  {
    path: '/addparticipant',
    name: 'addparticipant',
    component: AddParticipant
  },
  {
    path: '/participants',
    name: 'participants',
    component: Participants
  },
  {
    path: '/eventdetails',
    name: 'eventsdetail',
    component: EventDetails
  },
  {
    path: '/upload',
    name: 'bulkupload',
    component: bulkUpload
  },
  {
    path: '/editevent',
    name: 'editevent',
    component: EventEdit
  },
  {
    path: '/participantdetails',
    name: 'partcipantdetails',
    component: PartcipantDetails
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/redirect',
    name: 'redirect',
    component: redirect
  },
  {
    path: '/redirect02',
    name: 'redirect02',
    component: redirectTwo
  },
  {
    path: '/assesment',
    name: 'assesment',
    component: AssesmentTwo
  },
  {
    path: '/assesmentresults',
    name: 'assesmentresults',
    component: ResultsTwo
  },
  {
    path: '/assesmenttwohome',
    name: 'assesmenthome',
    component: AssesmentTwoHome
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
