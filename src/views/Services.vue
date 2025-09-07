<template>
  <div class="services-container">
    <!-- Add Service Button -->
    <div class="add-service-section">
      <router-link to="/services/new" class="add-service-btn"> Add Service </router-link>
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
        </div>
      </div>
    </div>

    <!-- Services Table (Large Devices) -->
    <div class="services-table-section">
      <div class="table-container">
        <div v-if="filteredServices.length === 0" class="empty-state">
          <p class="empty-text">No services found</p>
        </div>
        <div v-else class="table-wrapper">
          <table class="services-table">
            <thead>
              <tr>
                <th class="table-header">Order</th>
                <th class="table-header">Title</th>
                <th class="table-header">Slug</th>
                <th class="table-header">Price</th>
                <th class="table-header">Status</th>
                <th class="table-header">Featured</th>
                <th class="table-header">Created</th>
                <th class="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="service in filteredServices" :key="service.id" class="table-row">
                <td class="table-cell">
                  <div class="order-number">{{ service.order || '-' }}</div>
                </td>
                <td class="table-cell">
                  <div class="service-title">{{ service.title }}</div>
                </td>
                <td class="table-cell">
                  <div class="service-slug">{{ service.slug }}</div>
                </td>
                <td class="table-cell">
                  <div class="service-price">${{ formatPrice(service.price) }}</div>
                </td>
                <td class="table-cell">
                  <span
                    :class="[
                      'status-badge',
                      service.active ? 'status-active' : 'status-inactive',
                    ]"
                  >
                    {{ service.active ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="table-cell">
                  <span v-if="service.featured" class="featured-badge">Featured</span>
                  <span v-else class="empty-indicator">-</span>
                </td>
                <td class="table-cell">
                  <div class="date-text">
                    {{ formatDate(service.createdAt) }}
                  </div>
                </td>
                <td class="table-cell">
                  <div class="action-buttons">
                    <button
                      @click="toggleStatus(service)"
                      :class="[
                        'action-btn',
                        service.active ? 'action-btn-danger' : 'action-btn-success',
                      ]"
                      :title="service.active ? 'Deactivate' : 'Activate'"
                    >
                      <font-awesome-icon
                        v-if="service.active"
                        icon="fa-solid fa-ban"
                        class="action-icon"
                      />
                      <font-awesome-icon v-else icon="fa-solid fa-check" class="action-icon" />
                    </button>
                    <button
                      @click="toggleFeatured(service)"
                      :class="[
                        'action-btn',
                        service.featured ? 'action-btn-warning' : 'action-btn-info',
                      ]"
                      :title="service.featured ? 'Remove Featured' : 'Make Featured'"
                    >
                      <font-awesome-icon
                        v-if="service.featured"
                        icon="fa-solid fa-star"
                        class="action-icon"
                      />
                      <font-awesome-icon v-else icon="fa-regular fa-star" class="action-icon" />
                    </button>
                    <router-link
                      :to="`/services/edit/${service.id}`"
                      class="action-btn action-btn-secondary"
                      title="Edit"
                    >
                      <font-awesome-icon icon="fa-solid fa-pen-to-square" class="action-icon" />
                    </router-link>
                    <button
                      @click="deleteServiceHandler(service.id)"
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

    <!-- Services Cards (Small/Medium Devices) -->
    <div class="services-cards-section">
      <div v-if="filteredServices.length === 0" class="empty-state">
        <p class="empty-text">No services found</p>
      </div>
      <div v-else class="cards-grid">
        <div v-for="service in filteredServices" :key="service.id" class="service-card">
          <div class="card-header">
            <h3 class="card-title">{{ service.title }}</h3>
            <div class="card-status">
              <span
                :class="['status-badge', service.active ? 'status-active' : 'status-inactive']"
              >
                {{ service.active ? 'Active' : 'Inactive' }}
              </span>
            </div>
          </div>

          <div class="card-description">
            <p class="description-text">{{ service.subtitle }}</p>
            <p class="slug-text">Slug: {{ service.slug }}</p>
          </div>

          <div class="card-meta">
            <div class="meta-item">
              <span class="meta-label">Order:</span>
              <span class="meta-value">{{ service.order || '-' }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Price:</span>
              <span class="meta-value price-value">${{ formatPrice(service.price) }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Featured:</span>
              <span v-if="service.featured" class="featured-badge">Yes</span>
              <span v-else class="meta-value">No</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Created:</span>
              <span class="meta-value">{{ formatDate(service.createdAt) }}</span>
            </div>
          </div>

          <div class="card-actions">
            <button
              @click="toggleStatus(service)"
              :class="['card-btn', service.active ? 'card-btn-danger' : 'card-btn-success']"
              :title="service.active ? 'Deactivate' : 'Activate'"
            >
              <font-awesome-icon v-if="service.active" icon="fa-solid fa-ban" class="card-icon" />
              <font-awesome-icon v-else icon="fa-solid fa-check" class="card-icon" />
              <span class="btn-text">{{ service.active ? 'Deactivate' : 'Activate' }}</span>
            </button>
            <button
              @click="toggleFeatured(service)"
              :class="['card-btn', service.featured ? 'card-btn-warning' : 'card-btn-info']"
              :title="service.featured ? 'Remove Featured' : 'Make Featured'"
            >
              <font-awesome-icon
                v-if="service.featured"
                icon="fa-solid fa-star"
                class="card-icon"
              />
              <font-awesome-icon v-else icon="fa-regular fa-star" class="card-icon" />
              <span class="btn-text">{{ service.featured ? 'Unfeature' : 'Feature' }}</span>
            </button>
            <router-link
              :to="`/services/edit/${service.id}`"
              class="card-btn card-btn-secondary"
              title="Edit"
            >
              <font-awesome-icon icon="fa-solid fa-pen-to-square" class="card-icon" />
              <span class="btn-text">Edit</span>
            </router-link>
            <button
              @click="deleteServiceHandler(service.id)"
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
  allServicesQuery,
  toggleServiceStatus,
  toggleServiceFeatured,
  deleteService,
} from '../services/servicesService'

// Use VueFire to get services
const services = useCollection(allServicesQuery)

// Filters
const filters = ref({
  showActive: false,
  showFeatured: false,
})

// Filtered services
const filteredServices = computed(() => {
  let filtered = services.value || []

  if (filters.value.showActive) {
    filtered = filtered.filter((s) => s.active)
  }

  if (filters.value.showFeatured) {
    filtered = filtered.filter((s) => s.featured)
  }

  return filtered.sort((a, b) => (a.order || 0) - (b.order || 0))
})

// Format date
const formatDate = (timestamp) => {
  if (!timestamp) return '-'
  return new Date(timestamp.toDate()).toLocaleDateString()
}

// Format price
const formatPrice = (price) => {
  if (price === null || price === undefined) return '0.00'
  return parseFloat(price).toFixed(2)
}

// Toggle service status
const toggleStatus = async (service) => {
  try {
    await toggleServiceStatus(service.id, service.active)
  } catch (error) {
    console.error('Error toggling status:', error)
    alert('Failed to update service status')
  }
}

// Toggle service featured status
const toggleFeatured = async (service) => {
  try {
    await toggleServiceFeatured(service.id, service.featured)
  } catch (error) {
    console.error('Error toggling featured status:', error)
    alert('Failed to update service featured status')
  }
}

// Delete service
const deleteServiceHandler = async (id) => {
  if (!confirm('Are you sure you want to delete this service?')) return

  try {
    await deleteService(id)
  } catch (error) {
    console.error('Error deleting service:', error)
    alert('Failed to delete service')
  }
}
</script>

<style scoped>
.services-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 1rem;
}

.add-service-section {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.add-service-btn {
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

.add-service-btn:hover {
  background: #059669;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Filters Section */
.filters-section {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.filters-content {
  max-width: 100%;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-checkbox {
  width: 1rem;
  height: 1rem;
  accent-color: #10b981;
}

.filter-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
}

/* Table Section */
.services-table-section {
  display: block;
}

@media (max-width: 1024px) {
  .services-table-section {
    display: none;
  }
}

.table-container {
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.empty-state {
  padding: 3rem;
  text-align: center;
}

.empty-text {
  color: #6b7280;
  font-size: 1rem;
}

.table-wrapper {
  overflow-x: auto;
}

.services-table {
  width: 100%;
  border-collapse: collapse;
}

.table-header {
  background: #f9fafb;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.875rem;
}

.table-row {
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background: #f9fafb;
}

.table-cell {
  padding: 1rem;
  font-size: 0.875rem;
  color: #374151;
}

.service-title {
  font-weight: 600;
  color: #111827;
}

.service-slug {
  font-family: 'Courier New', monospace;
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  color: #6b7280;
}

.service-price {
  font-weight: 600;
  color: #059669;
  font-size: 0.875rem;
}

.order-number {
  font-weight: 600;
  color: #6b7280;
  text-align: center;
}

.date-text {
  color: #6b7280;
}

/* Status Badges */
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-active {
  background: #dcfce7;
  color: #166534;
}

.status-inactive {
  background: #fee2e2;
  color: #991b1b;
}

.featured-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: #fef3c7;
  color: #92400e;
}

.empty-indicator {
  color: #9ca3af;
  font-style: italic;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.action-btn-success {
  background: #dcfce7;
  color: #166534;
}

.action-btn-success:hover {
  background: #bbf7d0;
}

.action-btn-danger {
  background: #fee2e2;
  color: #991b1b;
}

.action-btn-danger:hover {
  background: #fecaca;
}

.action-btn-warning {
  background: #fef3c7;
  color: #92400e;
}

.action-btn-warning:hover {
  background: #fde68a;
}

.action-btn-info {
  background: #dbeafe;
  color: #1e40af;
}

.action-btn-info:hover {
  background: #bfdbfe;
}

.action-btn-secondary {
  background: #f3f4f6;
  color: #374151;
}

.action-btn-secondary:hover {
  background: #e5e7eb;
}

.action-icon {
  width: 0.875rem;
  height: 0.875rem;
}

/* Cards Section */
.services-cards-section {
  display: none;
}

@media (max-width: 1024px) {
  .services-cards-section {
    display: block;
  }
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.service-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.service-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  flex: 1;
}

.card-status {
  margin-left: 1rem;
}

.card-description {
  margin-bottom: 1rem;
}

.description-text {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0 0 0.5rem 0;
}

.slug-text {
  color: #9ca3af;
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  margin: 0;
}

.card-meta {
  margin-bottom: 1.5rem;
}

.meta-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.meta-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.meta-value {
  font-size: 0.875rem;
  color: #374151;
}

.price-value {
  font-weight: 600;
  color: #059669;
}

.card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.card-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  flex: 1;
  justify-content: center;
  min-width: 0;
}

.card-btn-success {
  background: #dcfce7;
  color: #166534;
}

.card-btn-success:hover {
  background: #bbf7d0;
}

.card-btn-danger {
  background: #fee2e2;
  color: #991b1b;
}

.card-btn-danger:hover {
  background: #fecaca;
}

.card-btn-warning {
  background: #fef3c7;
  color: #92400e;
}

.card-btn-warning:hover {
  background: #fde68a;
}

.card-btn-info {
  background: #dbeafe;
  color: #1e40af;
}

.card-btn-info:hover {
  background: #bfdbfe;
}

.card-btn-secondary {
  background: #f3f4f6;
  color: #374151;
}

.card-btn-secondary:hover {
  background: #e5e7eb;
}

.card-icon {
  width: 0.75rem;
  height: 0.75rem;
}

.btn-text {
  font-size: 0.75rem;
  white-space: nowrap;
}
</style>
