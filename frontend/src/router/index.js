import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import Documents from '@/components/Documents.vue'
import { authService } from '@/services/auth.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'documents',
      component: Documents,
      meta: { requiresAuth: true }
    }
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthRequired = to.meta.requiresAuth;
  const isUserLoggedIn = authService.isAuthenticated();

  if (isAuthRequired && !isUserLoggedIn) {
    next('/login')
    return
  }
  next()
})

export default router
