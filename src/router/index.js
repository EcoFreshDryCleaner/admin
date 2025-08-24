import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/promotions',
      name: 'Promotions',
      component: () => import('../views/Promotions.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/promotions/new',
      name: 'NewPromotion',
      component: () => import('../views/NewPromotion.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/promotions/edit/:id',
      name: 'EditPromotion',
      component: () => import('../views/EditPromotion.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    }
  ]
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Wait for auth to initialize
  if (authStore.loading) {
    await new Promise(resolve => {
      const unwatch = authStore.$subscribe(() => {
        if (!authStore.loading) {
          unwatch()
          resolve()
        }
      })
    })
  }

  // Check authentication requirements
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
    return
  }

  if (to.meta.requiresAdmin && !authStore.isAdminUser) {
    next('/login')
    return
  }

  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/dashboard')
    return
  }

  next()
})

export default router
