<template>
  <DashboardLayout>
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-bold text-gray-900">New Promotion</h1>
        <p class="mt-1 text-sm text-gray-600">
          Create a new promotion or special offer
        </p>
      </div>

      <!-- Form -->
      <div class="card">
        <div class="card-body">
          <PromotionForm
            :loading="loading"
            @submit="handleSubmit"
            @cancel="handleCancel"
          />
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '../components/DashboardLayout.vue'
import PromotionForm from '../components/PromotionForm.vue'
import { createPromotion } from '../services/promotionsService'

const router = useRouter()
const loading = ref(false)

const handleSubmit = async (formData) => {
  loading.value = true
  
  try {
    await createPromotion(formData)
    router.push('/promotions')
  } catch (error) {
    console.error('Error creating promotion:', error)
    alert('Failed to create promotion: ' + error.message)
  } finally {
    loading.value = false
  }
}

const handleCancel = () => {
  router.push('/promotions')
}
</script>
