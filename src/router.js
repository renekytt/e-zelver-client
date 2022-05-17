import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./views/HomeView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('./views/RegistrationView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/LoginView.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('./views/CartView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
