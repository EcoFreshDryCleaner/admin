<template>
  <div class="space-y-6">
    <!-- Loading State -->
    <div v-if="!promotion" class="card">
      <div class="card-body text-center py-8">
        <p class="text-gray-500">Loading promotion...</p>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else-if="!promotion" class="card">
      <div class="card-body text-center py-8">
        <p class="text-gray-500">Promotion not found</p>
        <router-link to="/promotions" class="btn btn-primary mt-4">
          Back to Promotions
        </router-link>
      </div>
    </div>

    <!-- Form -->
    <div v-else class="card">
      <div class="card-body">
        <PromotionForm
          :promotion="promotion"
          :loading="saving"
          @submit="handleSubmit"
          @cancel="handleCancel"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDocument } from 'vuefire'
import { doc } from 'firebase/firestore'
import { db } from '../firebase/config'
import PromotionForm from '../components/PromotionForm.vue'
import { updatePromotion } from '../services/promotionsService'

const route = useRoute()
const router = useRouter()
const saving = ref(false)

// Get promotion by ID using VueFire
const promotionRef = computed(() => doc(db, 'promotions', route.params.id))
const promotion = useDocument(promotionRef)

const handleSubmit = async (formData) => {
  saving.value = true

  try {
    await updatePromotion(route.params.id, formData)
    router.push('/promotions')
  } catch (error) {
    console.error('Error updating promotion:', error)
    alert('Failed to update promotion: ' + error.message)
  } finally {
    saving.value = false
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
