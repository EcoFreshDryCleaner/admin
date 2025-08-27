<script setup>
import { useAuthStore } from './stores/auth'
import { onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// Page title and subtitle based on current route
const pageInfo = computed(() => {
  const routeMap = {
    '/dashboard': { title: 'Dashboard', subtitle: 'Overview of your promotions and system status' },
    '/promotions': { title: 'Promotions', subtitle: 'Manage your promotions and special offers' },
    '/orders': { title: 'Orders Management', subtitle: 'View and manage customer orders' },
    '/promotions/new': {
      title: 'New Promotion',
      subtitle: 'Create a new promotion or special offer',
    },
    '/promotions/edit': { title: 'Edit Promotion', subtitle: 'Update promotion details' },
  }

  // Handle edit route with dynamic ID
  if (route.path.startsWith('/promotions/edit/')) {
    return { title: 'Edit Promotion', subtitle: 'Update promotion details' }
  }

  return (
    routeMap[route.path] || {
      title: 'Admin Panel',
      subtitle: 'EcoFresh Dry Cleaner Administration',
    }
  )
})

// Navigation items
const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'fa-solid fa-tachometer-alt' },
  { path: '/promotions', label: 'Promotions', icon: 'fa-solid fa-chart-line' },
  { path: '/orders', label: 'Orders', icon: 'fa-solid fa-shopping-bag' },
]

onMounted(() => {
  // Check auth state on app mount
  authStore.initializeAuth()
})
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Global Page Header -->
    <header v-if="authStore.isAuthenticated" class="global-header">
      <div class="header-container">
        <div class="header-brand">
          <div class="brand-logo">
            <font-awesome-icon icon="fa-solid fa-cube" class="logo-icon" />
          </div>
          <div class="brand-text">
            <h1 class="brand-title">EcoFresh Admin</h1>
            <p class="brand-subtitle">{{ pageInfo.title }}</p>
          </div>
        </div>

        <div class="header-navigation">
          <nav class="nav-menu">
            <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="nav-item"
              :class="{ active: $route.path === item.path }"
            >
              <font-awesome-icon :icon="item.icon" class="nav-icon" />
              <span class="nav-label">{{ item.label }}</span>
            </router-link>
          </nav>
        </div>

        <div class="header-actions">
          <div class="user-info">
            <span class="user-email">{{ authStore.user?.email }}</span>
          </div>
          <button @click="authStore.logout" class="logout-btn">
            <font-awesome-icon icon="fa-solid fa-sign-out-alt" class="btn-icon" />
            <span class="btn-text">Sign out</span>
          </button>
        </div>
      </div>

      <!-- Page Subtitle Bar -->
      <div class="page-subtitle-bar">
        <div class="subtitle-container">
          <p class="page-subtitle">{{ pageInfo.subtitle }}</p>
        </div>
      </div>
    </header>

    <router-view />
  </div>
</template>

<style>
@import './styles/admin.css';
</style>

<style scoped>
.global-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.brand-logo {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon {
  color: white;
  font-size: 1.25rem;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  line-height: 1.2;
}

.brand-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  font-weight: 500;
}

.header-navigation {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-menu {
  display: flex;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.nav-item:hover {
  color: #374151;
  background: #f9fafb;
}

.nav-item.active {
  color: #3b82f6;
  background: #eff6ff;
  border-color: #3b82f6;
}

.nav-icon {
  font-size: 1rem;
}

.nav-label {
  font-weight: 600;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.user-info {
  background: #f9fafb;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.user-email {
  font-size: 0.875rem;
  color: #374151;
  font-weight: 500;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background: #dc2626;
  transform: translateY(-1px);
}

.btn-icon {
  font-size: 0.875rem;
}

.page-subtitle-bar {
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.subtitle-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.75rem 2rem;
}

.page-subtitle {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .header-container {
    padding: 1rem;
    gap: 1rem;
  }

  .subtitle-container {
    padding: 0.75rem 1rem;
  }

  .brand-title {
    font-size: 1.25rem;
  }

  .nav-label {
    display: none;
  }

  .nav-item {
    padding: 0.75rem;
  }
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .header-navigation {
    order: 3;
    width: 100%;
  }

  .nav-menu {
    justify-content: center;
    width: 100%;
  }

  .nav-item {
    flex: 1;
    justify-content: center;
  }

  .header-actions {
    order: 2;
    width: 100%;
    justify-content: center;
  }

  .brand-subtitle {
    display: none;
  }

  .page-subtitle-bar {
    display: none;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 0.75rem;
  }

  .brand-title {
    font-size: 1.125rem;
  }

  .nav-item {
    padding: 0.5rem;
  }
}
</style>
