import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { onAuthStateChange, checkIfAdmin, signOutUser } from '../services/authService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAdmin = ref(false)
  const loading = ref(true)

  const isAuthenticated = computed(() => !!user.value)
  const isAdminUser = computed(() => isAdmin.value)

  const initializeAuth = () => {
    onAuthStateChange(async (firebaseUser) => {
      if (firebaseUser) {
        user.value = firebaseUser
        isAdmin.value = await checkIfAdmin(firebaseUser)
      } else {
        user.value = null
        isAdmin.value = false
      }
      loading.value = false
    })
  }

  const logout = async () => {
    try {
      await signOutUser()
      user.value = null
      isAdmin.value = false
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return {
    user,
    isAdmin,
    loading,
    isAuthenticated,
    isAdminUser,
    initializeAuth,
    logout,
  }
})
