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

      <!-- Badge -->
      <div class="form-group">
        <label for="badge" class="form-label">Badge</label>
        <input
          id="badge"
          v-model="form.badge"
          type="text"
          class="form-input"
          placeholder="e.g., Fast, New, Limited"
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

      <!-- Icon -->
      <div class="form-group">
        <label for="icon" class="form-label">Icon</label>
        <input
          id="icon"
          v-model="form.icon"
          type="text"
          class="form-input"
          placeholder="e.g., ⚡, 🎉, 💎"
        />
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

      <!-- Discount Percentage -->
      <div class="form-group">
        <label for="discountPercentage" class="form-label">Discount Percentage</label>
        <input
          id="discountPercentage"
          v-model="form.discountPercentage"
          type="text"
          class="form-input"
          placeholder="e.g., 20%"
        />
      </div>

      <!-- Original Price -->
      <div class="form-group">
        <label for="originalPrice" class="form-label">Original Price</label>
        <input
          id="originalPrice"
          v-model="form.originalPrice"
          type="text"
          class="form-input"
          placeholder="e.g., $24.99"
        />
      </div>

      <!-- Discount Price -->
      <div class="form-group">
        <label for="discountPrice" class="form-label">Discount Price</label>
        <input
          id="discountPrice"
          v-model="form.discountPrice"
          type="text"
          class="form-input"
          placeholder="e.g., $19.99"
        />
      </div>

      <!-- Expiry Date -->
      <div class="form-group">
        <label for="expiryDate" class="form-label">Expiry Date</label>
        <input
          id="expiryDate"
          v-model="form.expiryDate"
          type="text"
          class="form-input"
          placeholder="e.g., Ongoing, 2024-12-31"
        />
      </div>
    </div>

    <!-- Features Array -->
    <div class="form-group">
      <label class="form-label">Features</label>
      <div class="features-container">
        <div v-for="(feature, index) in form.features" :key="index" class="feature-item">
          <input
            v-model="form.features[index]"
            type="text"
            class="form-input feature-input"
            placeholder="Enter feature"
          />
          <button type="button" @click="removeFeature(index)" class="btn btn-danger remove-btn">
            Remove
          </button>
        </div>
        <div class="add-feature-container">
          <div class="spacer"></div>
          <button type="button" @click="addFeature" class="btn btn-secondary add-feature-btn">
            Add Feature
          </button>
        </div>
      </div>
    </div>

    <!-- Checkboxes -->
    <div class="checkboxes-section">
      <div class="checkbox-item">
        <input id="active" v-model="form.active" type="checkbox" class="form-checkbox" />
        <label for="active" class="checkbox-label"> Active Promotion </label>
      </div>

      <div class="checkbox-item">
        <input id="featured" v-model="form.featured" type="checkbox" class="form-checkbox" />
        <label for="featured" class="checkbox-label"> Featured Promotion </label>
      </div>

      <div class="checkbox-item">
        <input id="showModal" v-model="form.showModal" type="checkbox" class="form-checkbox" />
        <label for="showModal" class="checkbox-label">
          Show as Modal (only one can be active)
        </label>
      </div>
    </div>

    <!-- Modal Configuration -->
    <div v-if="form.showModal" class="modal-config-section">
      <h3 class="modal-config-title">Modal Configuration</h3>
      <div class="modal-config-grid">
        <div class="form-group">
          <label for="buttonText" class="form-label">Button Text</label>
          <input
            id="buttonText"
            v-model="form.modalConfig.buttonText"
            type="text"
            class="form-input"
            placeholder="e.g., Book Express Service"
          />
        </div>

        <div class="form-group">
          <label for="buttonLink" class="form-label">Button Link</label>
          <input
            id="buttonLink"
            v-model="form.modalConfig.buttonLink"
            type="text"
            class="form-input"
            placeholder="e.g., #mobile-app"
          />
        </div>

        <div class="form-group">
          <label for="closeText" class="form-label">Close Text</label>
          <input
            id="closeText"
            v-model="form.modalConfig.closeText"
            type="text"
            class="form-input"
            placeholder="e.g., Maybe Later"
          />
        </div>

        <div class="form-group">
          <label for="delay" class="form-label">Delay (ms)</label>
          <input
            id="delay"
            v-model.number="form.modalConfig.delay"
            type="number"
            class="form-input"
            placeholder="3000"
          />
        </div>

        <div class="form-group">
          <label for="image" class="form-label">Image URL</label>
          <input
            id="image"
            v-model="form.modalConfig.image"
            type="text"
            class="form-input"
            placeholder="Image URL (optional)"
          />
        </div>
      </div>

      <div class="modal-checkboxes">
        <div class="checkbox-item">
          <input
            id="dismissible"
            v-model="form.modalConfig.dismissible"
            type="checkbox"
            class="form-checkbox"
          />
          <label for="dismissible" class="checkbox-label"> Dismissible Modal </label>
        </div>

        <div class="checkbox-item">
          <input
            id="showOnMobile"
            v-model="form.modalConfig.showOnMobile"
            type="checkbox"
            class="form-checkbox"
          />
          <label for="showOnMobile" class="checkbox-label"> Show on Mobile </label>
        </div>

        <div class="checkbox-item">
          <input
            id="showOnce"
            v-model="form.modalConfig.showOnce"
            type="checkbox"
            class="form-checkbox"
          />
          <label for="showOnce" class="checkbox-label"> Show Once </label>
        </div>
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
    <div class="submit-buttons">
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
  badge: '',
  icon: '',
  discountCode: '',
  discountPercentage: '',
  discountPrice: '',
  originalPrice: '',
  expiryDate: '',
  active: true,
  featured: false,
  showModal: false,
  terms: '',
  features: [],
  modalConfig: {
    buttonText: '',
    buttonLink: '',
    closeText: '',
    delay: 3000,
    dismissible: true,
    image: null,
    showOnMobile: true,
    showOnce: false,
  },
})

// Add feature to array
const addFeature = () => {
  form.value.features.push('')
}

// Remove feature from array
const removeFeature = (index) => {
  form.value.features.splice(index, 1)
}

// Watch for promotion changes (when editing)
watch(
  () => props.promotion,
  (newPromotion) => {
    if (newPromotion) {
      form.value = {
        title: newPromotion.title || '',
        description: newPromotion.description || '',
        badge: newPromotion.badge || '',
        icon: newPromotion.icon || '',
        discountCode: newPromotion.discountCode || '',
        discountPercentage: newPromotion.discountPercentage || '',
        discountPrice: newPromotion.discountPrice || '',
        originalPrice: newPromotion.originalPrice || '',
        expiryDate: newPromotion.expiryDate || '',
        active: newPromotion.active !== undefined ? newPromotion.active : true,
        featured: newPromotion.featured || false,
        showModal: newPromotion.showModal || false,
        terms: newPromotion.terms || '',
        features: newPromotion.features || [],
        modalConfig: {
          buttonText: newPromotion.modalConfig?.buttonText || '',
          buttonLink: newPromotion.modalConfig?.buttonLink || '',
          closeText: newPromotion.modalConfig?.closeText || '',
          delay: newPromotion.modalConfig?.delay || 3000,
          dismissible:
            newPromotion.modalConfig?.dismissible !== undefined
              ? newPromotion.modalConfig.dismissible
              : true,
          image: newPromotion.modalConfig?.image || null,
          showOnMobile:
            newPromotion.modalConfig?.showOnMobile !== undefined
              ? newPromotion.modalConfig.showOnMobile
              : true,
          showOnce: newPromotion.modalConfig?.showOnce || false,
        },
      }
    }
  },
  { immediate: true },
)

// Handle form submission
const handleSubmit = () => {
  const formData = {
    ...form.value,
    // Filter out empty features
    features: form.value.features.filter((feature) => feature.trim() !== ''),
  }

  emit('submit', formData)
}
</script>

<style scoped>
/* Features Section */
.features-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.feature-input {
  flex: 1;
}

.remove-btn {
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  min-height: 2.25rem;
}

.add-feature-container {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.spacer {
  flex: 1;
}

.add-feature-btn {
  padding: 0.5rem 1rem;
}

/* Modal Configuration Section */
.modal-config-section {
  border: 1px solid var(--border-medium);
  border-radius: 0.75rem;
  padding: 1.5rem;
  background: var(--bg-secondary);
}

.modal-config-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.modal-config-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.modal-checkboxes {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Checkboxes Section */
.checkboxes-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
}

/* Submit Buttons */
.submit-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

/* Responsive Design */
@media (min-width: 768px) {
  .modal-config-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .modal-checkboxes {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .checkboxes-section {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

@media (max-width: 640px) {
  .submit-buttons {
    flex-direction: column;
  }

  .submit-buttons .btn {
    width: 100%;
  }
}
</style>
