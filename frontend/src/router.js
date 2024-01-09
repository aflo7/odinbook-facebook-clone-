import { createWebHistory, createRouter } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import Login from './components/Login.vue';
import { store } from './store.js';
import Home from './components/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from) => {
      if (store.loggedIn) {
        return;
      }
      return { name: 'Login' };
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
