import { createWebHistory, createRouter } from 'vue-router';
import { store } from './store.js';

import Login from './components/Login.vue';
import Home from './components/Home.vue'
import NotFound from './components/NotFound.vue'

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
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
