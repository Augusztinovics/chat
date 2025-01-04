import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/welcome/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
  ],
})

export default router
