// utes.js
import { createRouter, createWebHistory } from 'vue-router';
import TheNewWorld from '../views/TheNewWorld';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/TheNewWorld',
    name: 'TheNewWorld',
    component: TheNewWorld
  },
    {
        path: '/',
        name: 'home',
        component: HomeView
      }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
