<template>
  <div class="promotions-container">
    <!-- Add Promotion Button -->
    <div class="add-promotion-section">
      <router-link to="/promotions/new" class="add-promotion-btn"> Add Promotion </router-link>
    </div>

    <!-- Filters -->
    <div class="filters-section">
      <div class="filters-content">
        <div class="filters-grid">
          <div class="filter-item">
            <input
              id="showActive"
              v-model="filters.showActive"
              type="checkbox"
              class="filter-checkbox"
            />
            <label for="showActive" class="filter-label">Show Active Only</label>
          </div>
          <div class="filter-item">
            <input
              id="showFeatured"
              v-model="filters.showFeatured"
              type="checkbox"
              class="filter-checkbox"
            />
            <label for="showFeatured" class="filter-label">Show Featured Only</label>
          </div>
          <div class="filter-item">
            <input
              id="showModal"
              v-model="filters.showModal"
              type="checkbox"
              class="filter-checkbox"
            />
            <label for="showModal" class="filter-label">Show Modal Only</label>
          </div>
        </div>
      </div>
    </div>

    <!-- Promotions Table (Large Devices) -->
    <div class="promotions-table-section">
      <div class="table-container">
        <div v-if="filteredPromotions.length === 0" class="empty-state">
          <p class="empty-text">No promotions found</p>
        </div>
        <div v-else class="table-wrapper">
          <table class="promotions-table">
            <thead>
              <tr>
                <th class="table-header">Title</th>
                <th class="table-header">Description</th>
                <th class="table-header">Status</th>
                <th class="table-header">Featured</th>
                <th class="table-header">Modal</th>
                <th class="table-header">Created</th>
                <th class="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="promotion in filteredPromotions" :key="promotion.id" class="table-row">
                <td class="table-cell">
                  <div class="promotion-title">{{ promotion.title }}</div>
                </td>
                <td class="table-cell">
                  <div class="promotion-description-text">
                    {{ promotion.description }}
                  </div>
                </td>
                <td class="table-cell">
                  <span
                    :class="[
                      'status-badge',
                      promotion.active ? 'status-active' : 'status-inactive',
                    ]"
                  >
                    {{ promotion.active ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="table-cell">
                  <span v-if="promotion.featured" class="featured-badge">Featured</span>
                  <span v-else class="empty-indicator">-</span>
                </td>
                <td class="table-cell">
                  <span v-if="promotion.showModal" class="modal-badge">Modal</span>
                  <span v-else class="empty-indicator">-</span>
                </td>
                <td class="table-cell">
                  <div class="date-text">
                    {{ formatDate(promotion.createdAt) }}
                  </div>
                </td>
                <td class="table-cell">
                  <div class="action-buttons">
                    <button
                      @click="toggleStatus(promotion)"
                      :class="[
                        'action-btn',
                        promotion.active ? 'action-btn-danger' : 'action-btn-success',
                      ]"
                      :title="promotion.active ? 'Deactivate' : 'Activate'"
                    >
                      <font-awesome-icon
                        v-if="promotion.active"
                        icon="fa-solid fa-ban"
                        class="action-icon"
                      />
                      <font-awesome-icon v-else icon="fa-solid fa-check" class="action-icon" />
                    </button>
                    <router-link
                      :to="`/promotions/edit/${promotion.id}`"
                      class="action-btn action-btn-secondary"
                      title="Edit"
                    >
                      <font-awesome-icon icon="fa-solid fa-pen-to-square" class="action-icon" />
                    </router-link>
                    <button
                      @click="deletePromotionHandler(promotion.id)"
                      class="action-btn action-btn-danger"
                      title="Delete"
                    >
                      <font-awesome-icon icon="fa-solid fa-trash" class="action-icon" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Promotions Cards (Small/Medium Devices) -->
    <div class="promotions-cards-section">
      <div v-if="filteredPromotions.length === 0" class="empty-state">
        <p class="empty-text">No promotions found</p>
      </div>
      <div v-else class="cards-grid">
        <div v-for="promotion in filteredPromotions" :key="promotion.id" class="promotion-card">
          <div class="card-header">
            <h3 class="card-title">{{ promotion.title }}</h3>
            <div class="card-status">
              <span
                :class="['status-badge', promotion.active ? 'status-active' : 'status-inactive']"
              >
                {{ promotion.active ? 'Active' : 'Inactive' }}
              </span>
            </div>
          </div>

          <div class="card-description">
            <p class="description-text">{{ promotion.description }}</p>
          </div>

          <div class="card-meta">
            <div class="meta-item">
              <span class="meta-label">Featured:</span>
              <span v-if="promotion.featured" class="featured-badge">Yes</span>
              <span v-else class="meta-value">No</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Modal:</span>
              <span v-if="promotion.showModal" class="modal-badge">Yes</span>
              <span v-else class="meta-value">No</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Created:</span>
              <span class="meta-value">{{ formatDate(promotion.createdAt) }}</span>
            </div>
          </div>

          <div class="card-actions">
            <button
              @click="toggleStatus(promotion)"
              :class="['card-btn', promotion.active ? 'card-btn-danger' : 'card-btn-success']"
              :title="promotion.active ? 'Deactivate' : 'Activate'"
            >
              <font-awesome-icon v-if="promotion.active" icon="fa-solid fa-ban" class="card-icon" />
              <font-awesome-icon v-else icon="fa-solid fa-check" class="card-icon" />
              <span class="btn-text">{{ promotion.active ? 'Deactivate' : 'Activate' }}</span>
            </button>
            <router-link
              :to="`/promotions/edit/${promotion.id}`"
              class="card-btn card-btn-secondary"
              title="Edit"
            >
              <font-awesome-icon icon="fa-solid fa-pen-to-square" class="card-icon" />
              <span class="btn-text">Edit</span>
            </router-link>
            <button
              @click="deletePromotionHandler(promotion.id)"
              class="card-btn card-btn-danger"
              title="Delete"
            >
              <font-awesome-icon icon="fa-solid fa-trash" class="card-icon" />
              <span class="btn-text">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCollection } from 'vuefire'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  allPromotionsQuery,
  togglePromotionStatus,
  deletePromotion,
} from '../services/promotionsService'

// Use VueFire to get promotions
const promotions = useCollection(allPromotionsQuery)

// Filters
const filters = ref({
  showActive: false,
  showFeatured: false,
  showModal: false,
})

// Filtered promotions
const filteredPromotions = computed(() => {
  let filtered = promotions.value || []

  if (filters.value.showActive) {
    filtered = filtered.filter((p) => p.active)
  }

  if (filters.value.showFeatured) {
    filtered = filtered.filter((p) => p.featured)
  }

  if (filters.value.showModal) {
    filtered = filtered.filter((p) => p.showModal)
  }

  return filtered.sort((a, b) => new Date(b.createdAt?.toDate()) - new Date(a.createdAt?.toDate()))
})

// Format date
const formatDate = (timestamp) => {
  if (!timestamp) return '-'
  return new Date(timestamp.toDate()).toLocaleDateString()
}

// Toggle promotion status
const toggleStatus = async (promotion) => {
  try {
    await togglePromotionStatus(promotion.id, promotion.active)
  } catch (error) {
    console.error('Error toggling status:', error)
    alert('Failed to update promotion status')
  }
}

// Delete promotion
const deletePromotionHandler = async (id) => {
  if (!confirm('Are you sure you want to delete this promotion?')) return

  try {
    await deletePromotion(id)
  } catch (error) {
    console.error('Error deleting promotion:', error)
    alert('Failed to delete promotion')
  }
}
</script>

<style scoped>
.promotions-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 1rem;
}

.add-promotion-section {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.add-promotion-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: #10b981;
  color: white;
  text-decoration: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.add-promotion-btn:hover {
  background: #059669;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>
