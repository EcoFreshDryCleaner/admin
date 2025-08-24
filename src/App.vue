<script setup>
import { useAuthStore } from './stores/auth'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  // Check auth state on app mount
  authStore.initializeAuth()
})
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <router-view />
  </div>
</template>

<style>
@import './styles/admin.css';
</style>
