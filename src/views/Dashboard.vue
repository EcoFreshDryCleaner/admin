<template>
  <DashboardLayout>
    <div class="dashboard-container">
      <!-- Page Header -->
      <div class="page-header">
        <h1 class="page-title">Dashboard</h1>
        <p class="page-subtitle">Overview of your promotions and system status</p>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stats-card">
          <div class="stats-icon">
            <font-awesome-icon icon="fa-solid fa-chart-line" class="stats-icon-svg" />
          </div>
          <div class="stats-content">
            <p class="stats-label">Total Promotions</p>
            <p class="stats-value">{{ totalPromotions }}</p>
          </div>
        </div>

        <div class="stats-card">
          <div class="stats-icon">
            <font-awesome-icon icon="fa-solid fa-check-circle" class="stats-icon-svg" />
          </div>
          <div class="stats-content">
            <p class="stats-label">Active Promotions</p>
            <p class="stats-value">{{ activePromotions }}</p>
          </div>
        </div>

        <div class="stats-card">
          <div class="stats-icon">
            <font-awesome-icon icon="fa-solid fa-window-maximize" class="stats-icon-svg" />
          </div>
          <div class="stats-content">
            <p class="stats-label">Modal Promotions</p>
            <p class="stats-value">{{ modalPromotions }}</p>
          </div>
        </div>

        <div class="stats-card">
          <div class="stats-icon">
            <font-awesome-icon icon="fa-solid fa-shopping-bag" class="stats-icon-svg" />
          </div>
          <div class="stats-content">
            <p class="stats-label">Total Orders</p>
            <p class="stats-value">{{ ordersStats.total }}</p>
          </div>
        </div>

        <div class="stats-card">
          <div class="stats-icon">
            <font-awesome-icon icon="fa-solid fa-spinner" class="stats-icon-svg" />
          </div>
          <div class="stats-content">
            <p class="stats-label">Orders In Progress</p>
            <p class="stats-value">{{ ordersStats.inProgress }}</p>
          </div>
        </div>
      </div>

      <!-- Recent Promotions -->
      <div class="recent-promotions-card">
        <div class="card-header">
          <h3 class="card-title">Recent Promotions</h3>
        </div>
        <div class="card-body">
          <div v-if="recentPromotions.length === 0" class="empty-state">
            <p class="empty-text">No promotions found</p>
          </div>
          <div v-else class="promotions-list">
            <div
              v-for="promotion in recentPromotions.slice(0, 5)"
              :key="promotion.id"
              class="promotion-item"
            >
              <div class="promotion-content">
                <h4 class="promotion-title">
                  {{ promotion.title }}
                </h4>
                <p class="promotion-description">{{ promotion.description }}</p>
                <div class="promotion-badges">
                  <span
                    :class="[
                      'status-badge',
                      promotion.active ? 'status-active' : 'status-inactive',
                    ]"
                  >
                    {{ promotion.active ? 'Active' : 'Inactive' }}
                  </span>
                  <span v-if="promotion.featured" class="featured-badge">Featured</span>
                  <span v-if="promotion.showModal" class="modal-badge">Modal</span>
                </div>
              </div>
              <div class="promotion-actions">
                <router-link :to="`/promotions/edit/${promotion.id}`" class="edit-btn">
                  <font-awesome-icon icon="fa-solid fa-pen-to-square" class="edit-icon" />
                  Edit
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <router-link to="/promotions" class="view-all-btn">View All Promotions</router-link>
        </div>
      </div>

      <!-- Recent Orders -->
      <div class="recent-orders-card">
        <div class="card-header">
          <h3 class="card-title">Recent Orders</h3>
        </div>
        <div class="card-body">
          <div v-if="!ordersStats.total" class="empty-state">
            <p class="empty-text">No orders found</p>
          </div>
          <div v-else class="orders-summary">
            <div class="orders-overview">
              <div class="overview-item">
                <span class="overview-label">Total Orders:</span>
                <span class="overview-value">{{ ordersStats.total }}</span>
              </div>
              <div class="overview-item">
                <span class="overview-label">Pending:</span>
                <span class="overview-value">{{ ordersStats.pending }}</span>
              </div>
              <div class="overview-item">
                <span class="overview-label">In Progress:</span>
                <span class="overview-value">{{ ordersStats.inProgress }}</span>
              </div>
              <div class="overview-item">
                <span class="overview-label">Cleaning:</span>
                <span class="overview-value">{{ ordersStats.cleaning }}</span>
              </div>
              <div class="overview-item">
                <span class="overview-label">Ready:</span>
                <span class="overview-value">{{
                  ordersStats.ready + ordersStats.ready_for_pickup
                }}</span>
              </div>
              <div class="overview-item">
                <span class="overview-label">Out for Delivery:</span>
                <span class="overview-value">{{ ordersStats.out_for_delivery }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <router-link to="/orders" class="view-all-btn">View All Orders</router-link>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useCollection } from 'vuefire'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import DashboardLayout from '../components/DashboardLayout.vue'
import { allPromotionsQuery } from '../services/promotionsService'
import { getOrdersCountByStatus, ORDER_STATUSES } from '../services/ordersService'

// Use VueFire to get promotions
const promotions = useCollection(allPromotionsQuery)

// Orders stats
const ordersStats = ref({
  total: 0,
  pending: 0,
  confirmed: 0,
  picked_up: 0,
  dropped_off: 0,
  in_progress: 0,
  cleaning: 0,
  ready: 0,
  ready_for_pickup: 0,
  out_for_delivery: 0,
  delivered: 0,
  completed: 0,
  cancelled: 0,
  inProgress: 0,
})

// Computed properties for stats
const totalPromotions = computed(() => promotions.value?.length || 0)
const activePromotions = computed(() => promotions.value?.filter((p) => p.active)?.length || 0)
const modalPromotions = computed(() => promotions.value?.filter((p) => p.showModal)?.length || 0)
const recentPromotions = computed(
  () =>
    promotions.value?.sort(
      (a, b) => new Date(b.createdAt?.toDate()) - new Date(a.createdAt?.toDate()),
    ) || [],
)

// Load orders stats
const loadOrdersStats = async () => {
  try {
    const stats = await getOrdersCountByStatus()
    ordersStats.value = stats
  } catch (error) {
    console.error('Error loading orders stats:', error)
  }
}

// Lifecycle
onMounted(async () => {
  await loadOrdersStats()
})
</script>

<style scoped>
.dashboard-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 2rem;
  text-align: center;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #6b7280;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stats-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stats-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.stats-icon-svg {
  color: white;
  font-size: 1.5rem;
}

.stats-content {
  flex: 1;
}

.stats-label {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.stats-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
}

.recent-promotions-card,
.recent-orders-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  overflow: hidden;
}

.card-header {
  background: #f9fafb;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.card-body {
  padding: 1.5rem;
}

.card-footer {
  background: #f9fafb;
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  text-align: center;
}

.empty-state {
  text-align: center;
  padding: 2rem;
}

.empty-text {
  color: #6b7280;
  font-size: 1.1rem;
}

.promotions-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.promotion-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
}

.promotion-content {
  flex: 1;
}

.promotion-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.promotion-description {
  color: #6b7280;
  margin: 0 0 0.75rem 0;
  line-height: 1.5;
}

.promotion-badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-active {
  background: #d1fae5;
  color: #065f46;
}

.status-inactive {
  background: #fee2e2;
  color: #991b1b;
}

.featured-badge {
  background: #fef3c7;
  color: #92400e;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.modal-badge {
  background: #dbeafe;
  color: #1e40af;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.promotion-actions {
  margin-left: 1rem;
}

.edit-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.edit-btn:hover {
  background: #2563eb;
}

.edit-icon {
  font-size: 0.875rem;
}

.view-all-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #10b981;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.2s;
}

.view-all-btn:hover {
  background: #059669;
}

.orders-summary {
  padding: 1rem 0;
}

.orders-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.overview-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.overview-label {
  font-weight: 600;
  color: #374151;
}

.overview-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 1rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .orders-overview {
    grid-template-columns: 1fr;
  }

  .promotion-item {
    flex-direction: column;
    gap: 1rem;
  }

  .promotion-actions {
    margin-left: 0;
    align-self: stretch;
  }

  .edit-btn {
    justify-content: center;
  }
}
</style>
