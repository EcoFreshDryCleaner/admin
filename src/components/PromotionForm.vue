<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Title -->
      <div class="form-group">
        <label for="title" class="form-label">Title *</label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          required
          class="form-input"
          placeholder="Enter promotion title"
        />
      </div>

      <!-- Description -->
      <div class="form-group">
        <label for="description" class="form-label">Description *</label>
        <textarea
          id="description"
          v-model="form.description"
          required
          class="form-input form-textarea"
          placeholder="Enter promotion description"
        ></textarea>
      </div>

      <!-- Discount Code -->
      <div class="form-group">
        <label for="discountCode" class="form-label">Discount Code</label>
        <input
          id="discountCode"
          v-model="form.discountCode"
          type="text"
          class="form-input"
          placeholder="Enter discount code (optional)"
        />
      </div>

      <!-- Discount Amount -->
      <div class="form-group">
        <label for="discountAmount" class="form-label">Discount Amount</label>
        <input
          id="discountAmount"
          v-model="form.discountAmount"
          type="text"
          class="form-input"
          placeholder="e.g., 20% or $10"
        />
      </div>

      <!-- Valid From -->
      <div class="form-group">
        <label for="validFrom" class="form-label">Valid From</label>
        <input id="validFrom" v-model="form.validFrom" type="date" class="form-input" />
      </div>

      <!-- Valid Until -->
      <div class="form-group">
        <label for="validUntil" class="form-label">Valid Until</label>
        <input id="validUntil" v-model="form.validUntil" type="date" class="form-input" />
      </div>
    </div>

    <!-- Checkboxes -->
    <div class="space-y-4">
      <div class="flex items-center space-x-2">
        <input id="active" v-model="form.active" type="checkbox" class="form-checkbox" />
        <label for="active" class="text-sm font-medium text-gray-700"> Active Promotion </label>
      </div>

      <div class="flex items-center space-x-2">
        <input id="featured" v-model="form.featured" type="checkbox" class="form-checkbox" />
        <label for="featured" class="text-sm font-medium text-gray-700"> Featured Promotion </label>
      </div>

      <div class="flex items-center space-x-2">
        <input id="showModal" v-model="form.showModal" type="checkbox" class="form-checkbox" />
        <label for="showModal" class="text-sm font-medium text-gray-700">
          Show as Modal (only one can be active)
        </label>
      </div>
    </div>

    <!-- Terms and Conditions -->
    <div class="form-group">
      <label for="terms" class="form-label">Terms and Conditions</label>
      <textarea
        id="terms"
        v-model="form.terms"
        class="form-input form-textarea"
        placeholder="Enter terms and conditions (optional)"
      ></textarea>
    </div>

    <!-- Submit Buttons -->
    <div class="flex justify-end space-x-4">
      <button type="button" @click="$emit('cancel')" class="btn btn-secondary">Cancel</button>
      <button type="submit" :disabled="loading" class="btn btn-primary">
        <span v-if="loading">Saving...</span>
        <span v-else>{{ isEditing ? 'Update' : 'Create' }} Promotion</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  promotion: {
    type: Object,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit', 'cancel'])

const isEditing = computed(() => !!props.promotion)

// Form data
const form = ref({
  title: '',
  description: '',
  discountCode: '',
  discountAmount: '',
  validFrom: '',
  validUntil: '',
  active: true,
  featured: false,
  showModal: false,
  terms: '',
})

// Watch for promotion changes (when editing)
watch(
  () => props.promotion,
  (newPromotion) => {
    if (newPromotion) {
      form.value = {
        title: newPromotion.title || '',
        description: newPromotion.description || '',
        discountCode: newPromotion.discountCode || '',
        discountAmount: newPromotion.discountAmount || '',
        validFrom: newPromotion.validFrom
          ? newPromotion.validFrom.toDate().toISOString().split('T')[0]
          : '',
        validUntil: newPromotion.validUntil
          ? newPromotion.validUntil.toDate().toISOString().split('T')[0]
          : '',
        active: newPromotion.active !== undefined ? newPromotion.active : true,
        featured: newPromotion.featured || false,
        showModal: newPromotion.showModal || false,
        terms: newPromotion.terms || '',
      }
    }
  },
  { immediate: true },
)

// Handle form submission
const handleSubmit = () => {
  const formData = {
    ...form.value,
    validFrom: form.value.validFrom ? new Date(form.value.validFrom) : null,
    validUntil: form.value.validUntil ? new Date(form.value.validUntil) : null,
  }

  emit('submit', formData)
}
</script>
