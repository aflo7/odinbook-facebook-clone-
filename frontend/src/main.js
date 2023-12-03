import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from "vue-router"

const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})

const app = createApp({})
app.use(router)
app.mount('#app')
