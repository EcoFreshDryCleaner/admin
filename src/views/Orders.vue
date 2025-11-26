<template>
  <div class="orders-container">
    <!-- Filters -->
    <div class="filters-section">
      <div class="filters-row">
        <div class="filter-group">
          <label for="status-filter" class="filter-label">Filter by Status:</label>
          <select v-model="statusFilter" id="status-filter" class="filter-select">
            <option value="">All Orders</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="picked_up">Picked Up</option>
            <option value="cleaning">Cleaning</option>
            <option value="awaiting_payment">Awaiting Payment</option>
            <option value="out_for_delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="location-filter" class="filter-label">Filter by Location:</label>
          <select v-model="locationFilter" id="location-filter" class="filter-select">
            <option value="">All Locations</option>
            <option v-for="location in availableLocations" :key="location" :value="location">
              {{ getLocationDisplayName(location) }}
            </option>
          </select>
        </div>

        <div class="filter-group">
          <label for="sort-by" class="filter-label">Sort by:</label>
          <select v-model="sortBy" id="sort-by" class="filter-select">
            <option value="date_placed">Date Placed (Newest)</option>
            <option value="date_placed_asc">Date Placed (Oldest)</option>
            <option value="service_date">Service Date</option>
            <option value="order_number">Order Number</option>
            <option value="customer_name">Customer Name</option>
            <option value="total_price">Total Price</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="orders-card">
      <div class="card-header">
        <h3 class="card-title">Orders</h3>
      </div>
      <div class="card-body">
        <div v-if="filteredOrders.length === 0" class="empty-state">
          <p class="empty-text">No orders found</p>
        </div>
        <div v-else class="orders-table">
          <div class="table-header">
            <div class="table-cell">Order # & Status</div>
            <div class="table-cell">Customer</div>
            <div class="table-cell">Location</div>
            <div class="table-cell">Service Date</div>
            <div class="table-cell">Items</div>
            <div class="table-cell">Actions</div>
          </div>

          <div v-for="order in filteredOrders" :key="order.id" class="table-row">
            <div class="table-cell order-info">
              <div class="cell-content">
                <div class="field-label">Order #</div>
                <div class="order-number">{{ order.order_number }}</div>
                <div class="field-label">Status</div>
                <div class="order-status-badge">
                  <span :class="['status-badge', `status-${order.status}`]">
                    {{ formatStatus(order.status) }}
                  </span>
                </div>
              </div>
            </div>
            <div class="table-cell customer-info">
              <div class="cell-content">
                <div class="field-label">Customer</div>
                <div class="customer-name">{{ order.customer_name }}</div>
                <div v-if="order.customer_phone" class="field-label">Phone</div>
                <div v-if="order.customer_phone" class="customer-phone">{{ order.customer_phone }}</div>
                <div v-if="order.customer_email" class="field-label">Email</div>
                <div v-if="order.customer_email" class="customer-email">{{ order.customer_email }}</div>
              </div>
            </div>
            <div class="table-cell location-info">
              <div class="cell-content">
                <div v-if="order.pickup_location_detail" class="field-label">Pickup Location</div>
                <div v-if="order.pickup_location_detail" class="pickup-location-detail">
                  <span class="pickup-detail-badge">
                    {{ formatPickupLocationDetail(order.pickup_location_detail) }}
                  </span>
                </div>
                <div v-if="order.pickup_address" class="field-label">Pickup Address</div>
                <div v-if="order.pickup_address" class="pickup-address">
                  {{ order.pickup_address }}
                </div>
              </div>
            </div>
            <div class="table-cell service-date">
              <div class="cell-content">
                <div class="field-label">Service Date</div>
                <div class="date-value">{{ formatDate(order.service_date) }}</div>
              </div>
            </div>
            <div class="table-cell items">
              <div class="cell-content">
                <div class="field-label">Items</div>
                <div class="items-list">
                  <div v-for="(quantity, item) in order.items" :key="item" class="item">
                    <span class="item-name">{{ formatItemName(item) }}</span>
                    <span class="item-quantity">×{{ quantity }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="table-cell actions">
              <div class="cell-content">
                <div class="field-label">Update Status</div>
                <select
                  v-model="order.status"
                  @change="handleUpdateOrderStatus(order.id, order.status)"
                  class="status-select"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="picked_up">Picked Up</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="awaiting_payment">Awaiting Payment</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
      <StatsCard icon="fa-solid fa-shopping-bag" label="Total Orders" :value="ordersStats.total" />
      <StatsCard icon="fa-solid fa-clock" label="Pending" :value="ordersStats.pending" />
      <StatsCard icon="fa-solid fa-spinner" label="In Progress" :value="ordersStats.inProgress" />
      <StatsCard icon="fa-solid fa-soap" label="Cleaning" :value="ordersStats.cleaning" />
      <StatsCard
        icon="fa-solid fa-credit-card"
        label="Awaiting Payment"
        :value="ordersStats.awaiting_payment"
      />
      <StatsCard
        icon="fa-solid fa-truck"
        label="Out for Delivery"
        :value="ordersStats.out_for_delivery"
      />
    </div>

    <!-- Location Stats -->
    <div v-if="availableLocations.length > 1" class="location-stats-section">
      <h3 class="location-stats-title">Orders by Location</h3>
      <div class="location-stats-grid">
        <div
          v-for="location in availableLocations"
          :key="location"
          class="location-stat-card"
          :class="{ 'active-location': locationFilter === location }"
          @click="locationFilter = locationFilter === location ? '' : location"
        >
          <div class="location-stat-header">
            <h4 class="location-name">{{ getLocationDisplayName(location) }}</h4>
            <span class="location-count">{{ getLocationOrderCount(location) }}</span>
          </div>
          <div class="location-stat-breakdown">
            <span class="stat-item"
              >Pending: {{ getLocationStatusCount(location, 'pending') }}</span
            >
            <span class="stat-item"
              >Cleaning: {{ getLocationStatusCount(location, 'cleaning') }}</span
            >
            <span class="stat-item"
              >Awaiting Payment: {{ getLocationStatusCount(location, 'awaiting_payment') }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCollection } from 'vuefire'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import StatsCard from '../components/StatsCard.vue'
import {
  allOrdersQuery,
  getOrdersCountByStatus,
  updateOrderStatus,
  getStatusDisplayText,
  ORDER_STATUSES,
} from '../services/ordersService'

// Use VueFire to get orders
const orders = useCollection(allOrdersQuery)
const ordersStats = ref({
  total: 0,
  pending: 0,
  confirmed: 0,
  picked_up: 0,
  cleaning: 0,
  awaiting_payment: 0,
  out_for_delivery: 0,
  delivered: 0,
  cancelled: 0,
  inProgress: 0,
})

const statusFilter = ref('')
const locationFilter = ref('')
const sortBy = ref('date_placed')

// Computed properties
const availableLocations = computed(() => {
  if (!orders.value) return []

  const locations = new Set()
  orders.value.forEach((order) => {
    // Only include pickup orders
    if (order.service_location && order.service_type === 'pickup') {
      locations.add(order.service_location)
    }
  })

  return Array.from(locations).sort()
})

const filteredOrders = computed(() => {
  if (!orders.value) return []

  // Only show pickup orders
  let filtered = orders.value.filter((order) => order.service_type === 'pickup')

  // Filter by status
  if (statusFilter.value) {
    filtered = filtered.filter((order) => order.status === statusFilter.value)
  }

  // Filter by location
  if (locationFilter.value) {
    filtered = filtered.filter((order) => order.service_location === locationFilter.value)
  }

  // Sort orders
  filtered = [...filtered].sort((a, b) => {
    switch (sortBy.value) {
      case 'date_placed':
        return new Date(b.date_placed?.toDate()) - new Date(a.date_placed?.toDate())
      case 'date_placed_asc':
        return new Date(a.date_placed?.toDate()) - new Date(b.date_placed?.toDate())
      case 'service_date':
        return new Date(b.service_date?.toDate()) - new Date(a.service_date?.toDate())
      case 'order_number':
        return a.order_number?.localeCompare(b.order_number)
      case 'customer_name':
        return a.customer_name?.localeCompare(b.customer_name)
      case 'total_price':
        return (b.total_price || 0) - (a.total_price || 0)
      default:
        return 0
    }
  })

  return filtered
})

// Methods
const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A'
  return new Date(timestamp.toDate()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const formatItemName = (itemKey) => {
  return itemKey
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const formatPickupLocationDetail = (detail) => {
  if (!detail) return ''
  return detail
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const formatStatus = (status) => {
  return getStatusDisplayText(status)
}

const getLocationDisplayName = (locationKey) => {
  if (!locationKey) return 'Unknown Location'

  // Convert location key to display name
  return locationKey
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const getLocationOrderCount = (location) => {
  if (!orders.value) return 0
  return orders.value.filter(
    (order) => order.service_location === location && order.service_type === 'pickup',
  ).length
}

const getLocationStatusCount = (location, status) => {
  if (!orders.value) return 0
  return orders.value.filter(
    (order) =>
      order.service_location === location &&
      order.status === status &&
      order.service_type === 'pickup',
  ).length
}


const handleUpdateOrderStatus = async (orderId, newStatus) => {
  try {
    await updateOrderStatus(orderId, newStatus)
    // Refresh stats after update
    await loadOrdersStats()
  } catch (error) {
    console.error('Error updating order status:', error)
  }
}

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
.orders-container {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.filters-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.filters-row {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: center;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 200px;
}

.filter-label {
  font-weight: 600;
  color: #374151;
}

.filter-select {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  font-size: 0.875rem;
  min-width: 150px;
}

.orders-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
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
  padding: 0;
}

.empty-state {
  padding: 3rem;
  text-align: center;
}

.empty-text {
  color: #6b7280;
  font-size: 1.1rem;
}

.orders-table {
  width: 100%;
}

.table-header {
  display: grid;
  grid-template-columns: 1.2fr 1.5fr 2fr 1fr 1.5fr 1.2fr;
  gap: 1.5rem;
  padding: 1.25rem 1.5rem;
  background: #f9fafb;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid #e5e7eb;
}

.table-row {
  display: grid;
  grid-template-columns: 1.2fr 1.5fr 2fr 1fr 1.5fr 1.2fr;
  gap: 1.5rem;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  align-items: flex-start;
  transition: background-color 0.15s ease;
}

.table-row:hover {
  background: #f9fafb;
}

.table-cell {
  display: flex;
  flex-direction: column;
}

.cell-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.field-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.125rem;
}

.order-info {
  gap: 0;
}

.order-number {
  font-weight: 700;
  color: #1f2937;
  font-size: 0.9375rem;
  margin-bottom: 0.25rem;
}

.order-status-badge {
  display: flex;
  justify-content: flex-start;
}

.customer-info {
  gap: 0;
}

.customer-name {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.9375rem;
  margin-bottom: 0.25rem;
}

.customer-email {
  font-size: 0.8125rem;
  color: #6b7280;
  word-break: break-word;
}

.customer-phone {
  font-size: 0.8125rem;
  color: #6b7280;
  word-break: break-word;
}

.location-info {
  gap: 0;
}

.location-name {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.9375rem;
  margin-bottom: 0.25rem;
}

.pickup-location-detail {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 0.25rem;
}

.pickup-detail-badge {
  padding: 0.25rem 0.625rem;
  border-radius: 4px;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: capitalize;
  letter-spacing: 0.025em;
  display: inline-block;
  background: #f0f9ff;
  color: #0369a1;
  border: 1px solid #bae6fd;
}

.pickup-address {
  font-size: 0.8125rem;
  color: #374151;
  line-height: 1.4;
  word-break: break-word;
  padding: 0.5rem;
  background: #f9fafb;
  border-radius: 4px;
  border-left: 2px solid #3b82f6;
}

.service-date {
  gap: 0;
}

.date-value {
  font-size: 0.9375rem;
  color: #374151;
  font-weight: 500;
}

.items {
  gap: 0;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8125rem;
  color: #374151;
  background: #f3f4f6;
  padding: 0.375rem 0.625rem;
  border-radius: 4px;
}

.item-name {
  font-weight: 500;
  color: #1f2937;
}

.item-quantity {
  font-weight: 600;
  color: #6b7280;
  margin-left: 0.5rem;
}

.status-badge {
  padding: 0.375rem 0.75rem;
  border-radius: 4px;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.3;
  white-space: nowrap;
}

.status-pending {
  background: #f3f4f6;
  color: #374151;
}

.status-confirmed {
  background: #dbeafe;
  color: #1e40af;
}

.status-picked_up {
  background: #e9d5ff;
  color: #7c3aed;
}

.status-cleaning {
  background: #dbeafe;
  color: #1e40af;
}

.status-awaiting_payment {
  background: #fef3c7;
  color: #92400e;
}

.status-out_for_delivery {
  background: #fbbf24;
  color: #92400e;
}

.status-delivered {
  background: #d1fae5;
  color: #065f46;
}

.status-cancelled {
  background: #fee2e2;
  color: #991b1b;
}

.actions {
  gap: 0;
}

.status-select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  font-size: 0.875rem;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease;
}

.status-select:hover {
  border-color: #3b82f6;
}

.status-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

@media (max-width: 1400px) {
  .table-header,
  .table-row {
    grid-template-columns: 1fr 1.2fr 1.8fr 0.9fr 1.3fr 1.1fr;
    gap: 1rem;
    padding: 1rem 1.25rem;
  }
}

@media (max-width: 1200px) {
  .table-header,
  .table-row {
    grid-template-columns: 1fr 1.2fr 1.8fr 0.9fr 1.3fr 1.1fr;
    gap: 0.875rem;
    padding: 1rem;
  }

  .orders-container {
    padding: 1rem;
  }

  .filters-row {
    gap: 1rem;
  }

  .filter-group {
    min-width: 150px;
  }

  .field-label {
    font-size: 0.65rem;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .table-header,
  .table-row {
    display: block;
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .table-cell {
    margin-bottom: 0.75rem;
  }

  .table-cell:last-child {
    margin-bottom: 0;
  }
}

.location-stats-section {
  margin-top: 2rem;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.location-stats-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1rem 0;
}

.location-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.location-stat-card {
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.location-stat-card:hover {
  border-color: #3b82f6;
  background: #f0f9ff;
}

.location-stat-card.active-location {
  border-color: #3b82f6;
  background: #dbeafe;
}

.location-stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.location-stat-header .location-name {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.location-count {
  background: #3b82f6;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
}

.location-stat-breakdown {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-item {
  font-size: 0.875rem;
  color: #6b7280;
}

@media (max-width: 768px) {
  .location-stats-grid {
    grid-template-columns: 1fr;
  }

  .filters-row {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-group {
    min-width: auto;
  }
}
</style>
