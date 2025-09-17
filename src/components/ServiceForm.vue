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
          placeholder="Enter service title"
        />
      </div>

      <!-- Slug -->
      <div class="form-group">
        <label for="slug" class="form-label">Slug *</label>
        <input
          id="slug"
          v-model="form.slug"
          type="text"
          required
          class="form-input"
          placeholder="e.g., dry-cleaning"
        />
        <p class="form-help">URL-friendly identifier (lowercase, hyphens only)</p>
      </div>

      <!-- Subtitle -->
      <div class="form-group md:col-span-2">
        <label for="subtitle" class="form-label">Subtitle *</label>
        <input
          id="subtitle"
          v-model="form.subtitle"
          type="text"
          required
          class="form-input"
          placeholder="Enter service subtitle"
        />
      </div>

      <!-- Hero Image -->
      <div class="form-group">
        <label for="heroImage" class="form-label">Hero Image URL *</label>
        <input
          id="heroImage"
          v-model="form.heroImage"
          type="url"
          required
          class="form-input"
          placeholder="https://cdn.ecofreshdrycleaner.com/services/dry-cleaning-1.jpg"
        />
        <p class="form-help">Full CDN URL for the hero image</p>
      </div>

      <!-- Order -->
      <div class="form-group">
        <label for="order" class="form-label">Display Order *</label>
        <input
          id="order"
          v-model.number="form.order"
          type="number"
          required
          min="1"
          class="form-input"
          placeholder="1"
        />
        <p class="form-help">Lower numbers appear first</p>
      </div>

      <!-- Icon -->
      <div class="form-group">
        <label for="icon" class="form-label">Icon *</label>
        <input
          id="icon"
          v-model="form.icon"
          type="text"
          required
          class="form-input"
          placeholder="e.g., shirt-outline"
        />
        <p class="form-help">
          Ionicons icon name (used in mobile app). Examples: shirt-outline, car-outline,
          heart-outline
        </p>
      </div>

      <!-- Status Checkboxes -->
      <div class="form-group md:col-span-2">
        <div class="checkbox-group">
          <label class="checkbox-label">
            <input v-model="form.active" type="checkbox" class="checkbox-input" />
            <span class="checkbox-text">Active</span>
          </label>
          <label class="checkbox-label">
            <input v-model="form.featured" type="checkbox" class="checkbox-input" />
            <span class="checkbox-text">Featured</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Overview Section -->
    <div class="section-divider">
      <h3 class="section-title">Overview Section</h3>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Overview Title -->
      <div class="form-group">
        <label for="overviewTitle" class="form-label">Overview Title *</label>
        <input
          id="overviewTitle"
          v-model="form.overview.title"
          type="text"
          required
          class="form-input"
          placeholder="Enter overview title"
        />
      </div>

      <!-- Overview Image -->
      <div class="form-group">
        <label for="overviewImage" class="form-label">Overview Image URL *</label>
        <input
          id="overviewImage"
          v-model="form.overview.image"
          type="url"
          required
          class="form-input"
          placeholder="https://cdn.ecofreshdrycleaner.com/services/dry-cleaning-2.jpg"
        />
        <p class="form-help">Full CDN URL for the overview image</p>
      </div>

      <!-- Overview Description -->
      <div class="form-group md:col-span-2">
        <label for="overviewDescription" class="form-label">Overview Description *</label>
        <textarea
          id="overviewDescription"
          v-model="form.overview.description"
          required
          class="form-input form-textarea"
          rows="4"
          placeholder="Enter detailed overview description"
        ></textarea>
      </div>

      <!-- Features -->
      <div class="form-group md:col-span-2">
        <label class="form-label">Features *</label>
        <div class="features-container">
          <div v-for="(feature, index) in form.overview.features" :key="index" class="feature-item">
            <input
              v-model="form.overview.features[index]"
              type="text"
              class="form-input"
              :placeholder="`Feature ${index + 1}`"
            />
            <button
              type="button"
              @click="removeFeature(index)"
              class="remove-feature-btn"
              :disabled="form.overview.features.length <= 1"
            >
              <font-awesome-icon icon="fa-solid fa-trash" />
            </button>
          </div>
          <button type="button" @click="addFeature" class="add-feature-btn">
            <font-awesome-icon icon="fa-solid fa-plus" />
            Add Feature
          </button>
        </div>
      </div>
    </div>

    <!-- Process Section -->
    <div class="section-divider">
      <h3 class="section-title">Process Steps</h3>
    </div>

    <div class="process-container">
      <div v-for="(step, index) in form.process" :key="index" class="process-step">
        <div class="step-header">
          <h4 class="step-title">Step {{ index + 1 }}</h4>
          <button
            type="button"
            @click="removeProcessStep(index)"
            class="remove-step-btn"
            :disabled="form.process.length <= 1"
          >
            <font-awesome-icon icon="fa-solid fa-trash" />
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-group">
            <label :for="`processTitle${index}`" class="form-label">Title *</label>
            <input
              :id="`processTitle${index}`"
              v-model="form.process[index].title"
              type="text"
              required
              class="form-input"
              placeholder="Enter step title"
            />
          </div>
          <div class="form-group">
            <label :for="`processDescription${index}`" class="form-label">Description *</label>
            <textarea
              :id="`processDescription${index}`"
              v-model="form.process[index].description"
              required
              class="form-input form-textarea"
              rows="3"
              placeholder="Enter step description"
            ></textarea>
          </div>
        </div>
      </div>
      <button type="button" @click="addProcessStep" class="add-step-btn">
        <font-awesome-icon icon="fa-solid fa-plus" />
        Add Process Step
      </button>
    </div>

    <!-- Benefits Section -->
    <!-- <div class="section-divider">
      <h3 class="section-title">Benefits</h3>
    </div>

    <div class="benefits-container">
      <div
        v-for="(benefit, index) in form.benefits"
        :key="index"
        class="benefit-item"
      >
        <div class="benefit-header">
          <h4 class="benefit-title">Benefit {{ index + 1 }}</h4>
          <button
            type="button"
            @click="removeBenefit(index)"
            class="remove-benefit-btn"
            :disabled="form.benefits.length <= 1"
          >
            <font-awesome-icon icon="fa-solid fa-trash" />
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-group">
            <label :for="`benefitTitle${index}`" class="form-label">Title *</label>
            <input
              :id="`benefitTitle${index}`"
              v-model="form.benefits[index].title"
              type="text"
              required
              class="form-input"
              placeholder="Enter benefit title"
            />
          </div>
          <div class="form-group">
            <label :for="`benefitDescription${index}`" class="form-label">Description *</label>
            <textarea
              :id="`benefitDescription${index}`"
              v-model="form.benefits[index].description"
              required
              class="form-input form-textarea"
              rows="3"
              placeholder="Enter benefit description"
            ></textarea>
          </div>
        </div>
      </div>
      <button
        type="button"
        @click="addBenefit"
        class="add-benefit-btn"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
        Add Benefit
      </button>
    </div> -->

    <!-- Form Actions -->
    <div class="form-actions">
      <button type="button" @click="handleCancel" class="btn btn-secondary" :disabled="loading">
        Cancel
      </button>
      <button type="submit" class="btn btn-primary" :disabled="loading">
        <span v-if="loading">Saving...</span>
        <span v-else>{{ service ? 'Update Service' : 'Create Service' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps({
  service: {
    type: Object,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit', 'cancel'])

// Initialize form with default values
const getDefaultForm = () => ({
  title: '',
  slug: '',
  subtitle: '',
  heroImage: '',
  order: 1,
  icon: 'shirt-outline',
  active: true,
  featured: false,
  overview: {
    title: '',
    description: '',
    image: '',
    features: [''],
  },
  process: [
    {
      title: '',
      description: '',
    },
  ],
  // benefits: [
  //   {
  //     title: '',
  //     description: '',
  //   },
  // ],
})

const form = ref(getDefaultForm())

// Watch for service prop changes (edit mode)
watch(
  () => props.service,
  (newService) => {
    if (newService) {
      form.value = {
        title: newService.title || '',
        slug: newService.slug || '',
        subtitle: newService.subtitle || '',
        heroImage: newService.heroImage || '',
        order: newService.order || 1,
        icon: newService.icon || 'shirt-outline',
        active: newService.active !== undefined ? newService.active : true,
        featured: newService.featured || false,
        overview: {
          title: newService.overview?.title || '',
          description: newService.overview?.description || '',
          image: newService.overview?.image || '',
          features: newService.overview?.features?.length
            ? [...newService.overview.features]
            : [''],
        },
        process: newService.process?.length
          ? [...newService.process]
          : [{ title: '', description: '' }],
        // benefits: newService.benefits?.length
        //   ? [...newService.benefits]
        //   : [{ title: '', description: '' }],
      }
    }
  },
  { immediate: true },
)

// Auto-generate slug from title
watch(
  () => form.value.title,
  (newTitle) => {
    if (newTitle && !props.service) {
      form.value.slug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
    }
  },
)

// Feature management
const addFeature = () => {
  form.value.overview.features.push('')
}

const removeFeature = (index) => {
  if (form.value.overview.features.length > 1) {
    form.value.overview.features.splice(index, 1)
  }
}

// Process step management
const addProcessStep = () => {
  form.value.process.push({ title: '', description: '' })
}

const removeProcessStep = (index) => {
  if (form.value.process.length > 1) {
    form.value.process.splice(index, 1)
  }
}

// Benefit management
// const addBenefit = () => {
//   form.value.benefits.push({ title: '', description: '' })
// }

// const removeBenefit = (index) => {
//   if (form.value.benefits.length > 1) {
//     form.value.benefits.splice(index, 1)
//   }
// }

// Form submission
const handleSubmit = () => {
  // Clean up empty features
  form.value.overview.features = form.value.overview.features.filter((f) => f.trim())

  emit('submit', form.value)
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<style scoped>
.space-y-6 > * + * {
  margin-top: 1.5rem;
}

.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.gap-6 {
  gap: 1.5rem;
}

.gap-4 {
  gap: 1rem;
}

@media (min-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .md\:col-span-2 {
    grid-column: span 2 / span 2;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-help {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

.checkbox-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-input {
  width: 1rem;
  height: 1rem;
  accent-color: #10b981;
}

.checkbox-text {
  font-size: 0.875rem;
  color: #374151;
}

.section-divider {
  border-top: 1px solid #e5e7eb;
  padding-top: 1.5rem;
  margin-top: 2rem;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}

.features-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.feature-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.remove-feature-btn {
  padding: 0.5rem;
  background: #fee2e2;
  color: #991b1b;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  min-width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-feature-btn:hover:not(:disabled) {
  background: #fecaca;
}

.remove-feature-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.add-feature-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
}

.add-feature-btn:hover {
  background: #e5e7eb;
}

.process-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.process-step {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  background: #f9fafb;
}

.step-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.step-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.remove-step-btn {
  padding: 0.5rem;
  background: #fee2e2;
  color: #991b1b;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  min-width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-step-btn:hover:not(:disabled) {
  background: #fecaca;
}

.remove-step-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.add-step-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
  align-self: flex-start;
}

.add-step-btn:hover {
  background: #e5e7eb;
}

/* Benefits styles commented out since benefits are not used in ServiceDetailView.vue */
/* .benefits-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.benefit-item {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  background: #f9fafb;
}

.benefit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.benefit-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.remove-benefit-btn {
  padding: 0.5rem;
  background: #fee2e2;
  color: #991b1b;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  min-width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-benefit-btn:hover:not(:disabled) {
  background: #fecaca;
}

.remove-benefit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.add-benefit-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
  align-self: flex-start;
}

.add-benefit-btn:hover {
  background: #e5e7eb;
} */

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  text-decoration: none;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: #10b981;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #059669;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover:not(:disabled) {
  background: #e5e7eb;
}
</style>
