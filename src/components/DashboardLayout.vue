<template>
  <div class="dashboard-layout">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="header-brand">
            <div class="header-logo">
              <font-awesome-icon icon="fa-solid fa-cube" class="logo-icon" />
            </div>
            <h1 class="header-title">EcoFresh Admin</h1>
          </div>

          <div class="header-actions">
            <div class="user-info">
              <span class="user-email">
                {{ user?.email }}
              </span>
            </div>
            <button @click="handleLogout" class="logout-btn">
              <font-awesome-icon icon="fa-solid fa-sign-out-alt" class="btn-icon" />
              <span class="btn-text">Sign out</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Navigation -->
    <nav class="nav">
      <div class="container">
        <div class="nav-links">
          <router-link
            to="/dashboard"
            class="nav-link"
            :class="{ active: $route.path === '/dashboard' }"
          >
            <font-awesome-icon icon="fa-solid fa-tachometer-alt" class="nav-icon" />
            <span class="nav-text">Dashboard</span>
          </router-link>
          <router-link
            to="/promotions"
            class="nav-link"
            :class="{ active: $route.path === '/promotions' }"
          >
            <font-awesome-icon icon="fa-solid fa-chart-line" class="nav-icon" />
            <span class="nav-text">Promotions</span>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.user)

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>
