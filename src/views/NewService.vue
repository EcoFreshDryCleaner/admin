<template>
  <div class="space-y-6">
    <!-- Form -->
    <div class="card">
      <div class="card-body">
        <ServiceForm :loading="loading" @submit="handleSubmit" @cancel="handleCancel" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ServiceForm from '../components/ServiceForm.vue'
import { createService } from '../services/servicesService'

const router = useRouter()
const loading = ref(false)

const handleSubmit = async (formData) => {
  loading.value = true

  try {
    await createService(formData)
    router.push('/services')
  } catch (error) {
    console.error('Error creating service:', error)
    alert('Failed to create service: ' + error.message)
  } finally {
    loading.value = false
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
</style>
