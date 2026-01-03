import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/welcome/LoginView.vue';
import Welcome from '../views/welcome/Welcome.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active-link',
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome,
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
      },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/welcome/RegisterView.vue'),
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('../views/welcome/TermsView.vue'),
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/welcome/PrivacyView.vue'),
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/home/HomeView.vue'),
    },
    {
        path: '/home/privacy',
        name: 'home privacy',
        component: () => import('../views/home/PrivacyView.vue'),
    },
    {
        path: '/home/terms',
        name: 'home terms',
        component: () => import('../views/home/TermsView.vue'),
    },
    {
        path: '/home/profile',
        name: 'home profile',
        component: () => import('../views/home/ProfileView.vue'),
    },
    //Admin routs:
    {
      path: '/admin',
      name: 'admin panel',
      component: () => import('../views/admin/AdminLandingView.vue'),
    },
  ],
})

export default router
