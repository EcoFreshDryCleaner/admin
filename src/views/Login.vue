<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="login-icon-container">
          <font-awesome-icon icon="fa-solid fa-cube" class="login-icon" />
        </div>
        <h2
          class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Admin Login
        </h2>
        <p class="mt-3 text-lg text-gray-600">Sign in to manage promotions</p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-6">
          <div>
            <label for="email" class="form-label">Email address</label>
            <div class="input-wrapper">
              <div class="input-icon">
                <font-awesome-icon icon="fa-solid fa-envelope" class="icon" />
              </div>
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                required
                class="form-input with-icon"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label for="password" class="form-label">Password</label>
            <div class="input-wrapper">
              <div class="input-icon">
                <font-awesome-icon icon="fa-solid fa-lock" class="icon" />
              </div>
              <input
                id="password"
                v-model="password"
                name="password"
                type="password"
                required
                class="form-input with-icon"
                placeholder="Enter your password"
              />
            </div>
          </div>
        </div>

        <div v-if="error" class="error-message">
          <div class="error-content">
            <font-awesome-icon icon="fa-solid fa-exclamation-triangle" class="error-icon" />
            <div class="error-text">
              <p>{{ error }}</p>
            </div>
          </div>
        </div>

        <div v-if="successMessage" class="success-message">
          <div class="success-content">
            <font-awesome-icon icon="fa-solid fa-check-circle" class="success-icon" />
            <div class="success-text">
              <p>{{ successMessage }}</p>
            </div>
          </div>
        </div>

        <div>
          <button type="submit" :disabled="loading" class="btn btn-primary w-full btn-lg">
            <font-awesome-icon v-if="!loading" icon="fa-solid fa-sign-in-alt" class="btn-icon" />
            <span v-if="loading">Signing in...</span>
            <span v-else>Sign in to Dashboard</span>
          </button>
        </div>

        <div class="text-center">
          <button
            type="button"
            @click="handleForgotPassword"
            :disabled="forgotPasswordLoading"
            class="forgot-password-btn"
          >
            <font-awesome-icon
              v-if="!forgotPasswordLoading"
              icon="fa-solid fa-key"
              class="forgot-password-icon"
            />
            <span v-if="forgotPasswordLoading">Sending...</span>
            <span v-else>Forgot your password?</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useAuthStore } from '../stores/auth'
import { signIn, sendPasswordResetEmail } from '../services/authService'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const forgotPasswordLoading = ref(false)
const successMessage = ref('')

const handleLogin = async () => {
  if (loading.value) return

  loading.value = true
  error.value = ''
  successMessage.value = ''

  try {
    await signIn(email.value, password.value)
    router.push('/dashboard')
  } catch (err) {
    error.value = err.message || 'Failed to sign in'
  } finally {
    loading.value = false
  }
}

const handleForgotPassword = async () => {
  if (forgotPasswordLoading.value) return

  if (!email.value) {
    error.value = 'Please enter your email address first'
    return
  }

  forgotPasswordLoading.value = true
  error.value = ''
  successMessage.value = ''

  try {
    await sendPasswordResetEmail(email.value)
    successMessage.value = 'Password reset email sent! Check your inbox for instructions.'
  } catch (err) {
    error.value = err.message || 'Failed to send password reset email'
  } finally {
    forgotPasswordLoading.value = false
  }
}
</script>
