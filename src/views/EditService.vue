<template>
  <div class="space-y-6">
    <!-- Loading State -->
    <div v-if="loading" class="card">
      <div class="card-body text-center py-8">
        <p class="text-gray-500">Loading service...</p>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else-if="!service" class="card">
      <div class="card-body text-center py-8">
        <p class="text-gray-500">Service not found</p>
        <router-link to="/services" class="btn btn-primary mt-4">
          Back to Services
        </router-link>
      </div>
    </div>

    <!-- Form -->
    <div v-else class="card">
      <div class="card-body">
        <ServiceForm
          :service="service"
          :loading="saving"
          @submit="handleSubmit"
          @cancel="handleCancel"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDocument } from 'vuefire'
import { doc } from 'firebase/firestore'
import { db } from '../firebase/config'
import ServiceForm from '../components/ServiceForm.vue'
import { updateService } from '../services/servicesService'

const route = useRoute()
const router = useRouter()
const saving = ref(false)
const loading = ref(true)

// Get service by ID using VueFire
const serviceRef = computed(() => doc(db, 'services', route.params.id))
const service = useDocument(serviceRef)

// Watch for service loading
watch(
  () => service.value,
  (newService) => {
    if (newService !== undefined) {
      loading.value = false
    }
  },
  { immediate: true }
)

const handleSubmit = async (formData) => {
  saving.value = true

  try {
    await updateService(route.params.id, formData)
    router.push('/services')
  } catch (error) {
    console.error('Error updating service:', error)
    alert('Failed to update service: ' + error.message)
  } finally {
    saving.value = false
  }
}

const handleCancel = () => {
  router.push('/services')
}
</script>

<style scoped>
.space-y-6 {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 1rem;
}

.card {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 2rem;
}

.text-center {
  text-align: center;
}

.py-8 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.text-gray-500 {
  color: #6b7280;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #10b981;
  color: white;
}

.btn-primary:hover {
  background: #059669;
}

.mt-4 {
  margin-top: 1rem;
}
</style>
