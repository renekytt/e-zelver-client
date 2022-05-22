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
  {
    path: '/tracking/:id',
    name: 'tracking',
    component: () => import('./views/TrackingView.vue')
  },
  {
    path: '/products/add',
    name: 'addProduct',
    component: () => import('./views/AddProductView.vue')
  },
  {
    path: '/products/:id',
    name: 'editProduct',
    component: () => import('./views/EditProductView.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('./views/OrdersView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
