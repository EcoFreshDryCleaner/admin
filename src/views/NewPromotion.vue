<template>
  <div class="space-y-6">
    <!-- Form -->
    <div class="card">
      <div class="card-body">
        <PromotionForm :loading="loading" @submit="handleSubmit" @cancel="handleCancel" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
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

<style scoped>
.space-y-6 {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 1rem;
}
</style>
