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
            <option value="dropped_off">Dropped Off</option>
            <option value="in_progress">In Progress</option>
            <option value="cleaning">Cleaning</option>
            <option value="ready">Ready</option>
            <option value="ready_for_pickup">Ready for Pickup</option>
            <option value="out_for_delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="completed">Completed</option>
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
            <div class="table-cell order-status">
              <div class="order-number">
                <strong>{{ order.order_number }}</strong>
              </div>
              <div class="order-status-badge">
                <span :class="['status-badge', `status-${order.status}`]">
                  {{ formatStatus(order.status) }}
                </span>
              </div>
            </div>
            <div class="table-cell customer-info">
              <div class="customer-name">{{ order.customer_name }}</div>
              <button
                class="customer-info-toggle"
                @click="toggleCustomerInfo(order.id)"
                :class="{ expanded: expandedCustomers.has(order.id) }"
              >
                <span class="toggle-text">{{
                  expandedCustomers.has(order.id) ? 'Hide Details' : 'Show Details'
                }}</span>
                <font-awesome-icon
                  :icon="
                    expandedCustomers.has(order.id)
                      ? 'fa-solid fa-chevron-up'
                      : 'fa-solid fa-chevron-down'
                  "
                  class="toggle-icon"
                />
              </button>
              <div v-if="expandedCustomers.has(order.id)" class="customer-details">
                <div class="detail-item">
                  <!-- <span class="detail-label">Email:</span> -->
                  <span class="detail-value">{{ order.customer_phone }}</span>
                </div>
                <div class="detail-item">
                  <!-- <span class="detail-label">Phone:</span> -->
                  <span class="detail-value">{{ order.customer_email }}</span>
                </div>
              </div>
            </div>
            <div class="table-cell location-info">
              <div class="location-name">
                {{ order.service_location_name || getLocationDisplayName(order.service_location) }}
              </div>
              <div class="service-type-badge">
                <span :class="['service-badge', `service-${order.service_type}`]">
                  {{ order.service_type === 'pickup' ? 'Pick Up' : 'Drop Off' }}
                </span>
              </div>

              <!-- Show pickup location detail for pickup orders -->
              <div
                v-if="order.service_type === 'pickup' && order.pickup_location_detail"
                class="pickup-location-detail"
              >
                <span class="pickup-detail-badge">
                  {{ formatPickupLocationDetail(order.pickup_location_detail) }}
                </span>
              </div>

              <!-- For pickup orders, show pickup address as collapsible -->
              <div v-if="order.service_type === 'pickup' && order.pickup_address">
                <button
                  class="address-toggle"
                  @click="togglePickupAddress(order.id)"
                  :class="{ expanded: expandedPickupAddresses.has(order.id) }"
                >
                  <span class="toggle-text">{{
                    expandedPickupAddresses.has(order.id)
                      ? 'Hide Pickup Address'
                      : 'Show Pickup Address'
                  }}</span>
                  <font-awesome-icon
                    :icon="
                      expandedPickupAddresses.has(order.id)
                        ? 'fa-solid fa-chevron-up'
                        : 'fa-solid fa-chevron-down'
                    "
                    class="toggle-icon"
                  />
                </button>
                <div v-if="expandedPickupAddresses.has(order.id)" class="pickup-address">
                  <div class="address-label">Pickup Address:</div>
                  <div class="address-value">{{ order.pickup_address }}</div>
                </div>
              </div>

              <!-- For dropoff orders, show service location address as collapsible -->
              <div v-if="order.service_type === 'dropoff' && order.service_location_address">
                <button
                  class="address-toggle"
                  @click="toggleDropoffAddress(order.id)"
                  :class="{ expanded: expandedDropoffAddresses.has(order.id) }"
                >
                  <span class="toggle-text">{{
                    expandedDropoffAddresses.has(order.id)
                      ? 'Hide Service Location'
                      : 'Show Service Location'
                  }}</span>
                  <font-awesome-icon
                    :icon="
                      expandedDropoffAddresses.has(order.id)
                        ? 'fa-solid fa-chevron-up'
                        : 'fa-solid fa-chevron-down'
                    "
                    class="toggle-icon"
                  />
                </button>
                <div v-if="expandedDropoffAddresses.has(order.id)" class="dropoff-address">
                  <div class="address-label">Service Location:</div>
                  <div class="address-value">{{ order.service_location_address }}</div>
                </div>
              </div>
            </div>
            <div class="table-cell service-date">
              {{ formatDate(order.service_date) }}
            </div>
            <div class="table-cell items">
              <div v-for="(quantity, item) in order.items" :key="item" class="item">
                {{ formatItemName(item) }}: {{ quantity }}
              </div>
            </div>
            <div class="table-cell actions">
              <select
                v-model="order.status"
                @change="handleUpdateOrderStatus(order.id, order.status)"
                class="status-select"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="picked_up">Picked Up</option>
                <option value="dropped_off">Dropped Off</option>
                <option value="in_progress">In Progress</option>
                <option value="cleaning">Cleaning</option>
                <option value="ready">Ready</option>
                <option value="ready_for_pickup">Ready for Pickup</option>
                <option value="out_for_delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
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
        icon="fa-solid fa-check-circle"
        label="Ready"
        :value="ordersStats.ready + ordersStats.ready_for_pickup"
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
              >In Progress: {{ getLocationStatusCount(location, 'in_progress') }}</span
            >
            <span class="stat-item"
              >Ready:
              {{
                getLocationStatusCount(location, 'ready') +
                getLocationStatusCount(location, 'ready_for_pickup')
              }}</span
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

const statusFilter = ref('')
const locationFilter = ref('')
const sortBy = ref('date_placed')
const expandedCustomers = ref(new Set())
const expandedLocations = ref(new Set())
const expandedPickupAddresses = ref(new Set())
const expandedDropoffAddresses = ref(new Set())

// Computed properties
const availableLocations = computed(() => {
  if (!orders.value) return []

  const locations = new Set()
  orders.value.forEach((order) => {
    if (order.service_location) {
      locations.add(order.service_location)
    }
  })

  return Array.from(locations).sort()
})

const filteredOrders = computed(() => {
  if (!orders.value) return []

  let filtered = orders.value

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
    hour: '2-digit',
    minute: '2-digit',
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
  return orders.value.filter((order) => order.service_location === location).length
}

const getLocationStatusCount = (location, status) => {
  if (!orders.value) return 0
  return orders.value.filter(
    (order) => order.service_location === location && order.status === status,
  ).length
}

const toggleCustomerInfo = (orderId) => {
  if (expandedCustomers.value.has(orderId)) {
    expandedCustomers.value.delete(orderId)
  } else {
    expandedCustomers.value.add(orderId)
  }
}

const toggleLocationInfo = (orderId) => {
  if (expandedLocations.value.has(orderId)) {
    expandedLocations.value.delete(orderId)
  } else {
    expandedLocations.value.add(orderId)
  }
}

const togglePickupAddress = (orderId) => {
  if (expandedPickupAddresses.value.has(orderId)) {
    expandedPickupAddresses.value.delete(orderId)
  } else {
    expandedPickupAddresses.value.add(orderId)
  }
}

const toggleDropoffAddress = (orderId) => {
  if (expandedDropoffAddresses.value.has(orderId)) {
    expandedDropoffAddresses.value.delete(orderId)
  } else {
    expandedDropoffAddresses.value.add(orderId)
  }
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
  grid-template-columns: 200px 180px 160px 150px 200px 150px;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: #f9fafb;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
}

.table-row {
  display: grid;
  grid-template-columns: 200px 180px 160px 150px 200px 150px;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  align-items: flex-start;
}

.table-row:hover {
  background: #f9fafb;
}

.table-cell {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.order-status {
  gap: 0.5rem;
}

.order-number {
  font-weight: 600;
  color: #1f2937;
  text-align: center;
}

.order-status-badge {
  display: flex;
  justify-content: center;
}

.customer-info {
  gap: 0.125rem;
}

.customer-name {
  font-weight: 600;
  color: #1f2937;
}

.customer-email {
  font-size: 0.875rem;
  color: #6b7280;
}

.customer-phone {
  font-size: 0.875rem;
  color: #6b7280;
}

.customer-info-toggle,
.location-info-toggle {
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  margin-top: 0.25rem;
}

.customer-info-toggle:hover,
.location-info-toggle:hover {
  background: #f0f9ff;
  color: #1d4ed8;
}

.customer-info-toggle.expanded,
.location-info-toggle.expanded {
  color: #1d4ed8;
  background: #dbeafe;
}

.address-toggle {
  background: none;
  border: none;
  color: #6b7280;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  margin-top: 0.25rem;
}

.address-toggle:hover {
  background: #f3f4f6;
  color: #374151;
}

.address-toggle.expanded {
  color: #374151;
  background: #e5e7eb;
}

.toggle-icon {
  font-size: 0.625rem;
  transition: transform 0.2s ease;
}

.customer-details,
.location-details {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #f9fafb;
  border-radius: 4px;
  border-left: 3px solid #3b82f6;
}

.detail-item {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
}

.detail-item:last-child {
  margin-bottom: 0;
}

.detail-label {
  font-weight: 600;
  color: #374151;
  min-width: 50px;
}

.detail-value {
  color: #6b7280;
  word-break: break-word;
}

.location-info {
  gap: 0.125rem;
}

.location-name {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.875rem;
}

.location-address {
  font-size: 0.75rem;
  color: #6b7280;
  line-height: 1.2;
}

.service-type-badge {
  margin-top: 0.25rem;
  display: flex;
  justify-content: flex-start;
}

.service-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: inline-block;
  text-align: center;
  min-width: 60px;
}

.service-pickup {
  background: #dbeafe;
  color: #1e40af;
}

.service-dropoff {
  background: #e9d5ff;
  color: #7c3aed;
}

.pickup-location-detail {
  margin-top: 0.25rem;
  display: flex;
  justify-content: flex-start;
}

.pickup-detail-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: capitalize;
  letter-spacing: 0.05em;
  display: inline-block;
  background: #f0f9ff;
  color: #0369a1;
  border: 1px solid #bae6fd;
}

.pickup-address,
.dropoff-address {
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
}

.pickup-address {
  background: #f0f9ff;
  border-left: 3px solid #3b82f6;
}

.dropoff-address {
  background: #f0fdf4;
  border-left: 3px solid #16a34a;
}

.address-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.address-value {
  font-size: 0.75rem;
  color: #374151;
  line-height: 1.3;
  word-break: break-word;
}

.service-date {
  font-size: 0.875rem;
  color: #374151;
}

.items {
  gap: 0.25rem;
}

.item {
  font-size: 0.875rem;
  color: #374151;
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
  margin-right: 0.5rem;
  margin-bottom: 0.25rem;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: normal;
  overflow: visible;
  text-overflow: unset;
  max-width: 200px;
  min-width: 120px;
  min-height: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.2;
  word-wrap: break-word;
  hyphens: auto;
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

.status-dropped_off {
  background: #e9d5ff;
  color: #7c3aed;
}

.status-in_progress {
  background: #fef3c7;
  color: #92400e;
}

.status-cleaning {
  background: #fef3c7;
  color: #92400e;
}

.status-ready {
  background: #dbeafe;
  color: #1e40af;
}

.status-ready_for_pickup {
  background: #dbeafe;
  color: #1e40af;
}

.status-out_for_delivery {
  background: #fbbf24;
  color: #92400e;
}

.status-delivered {
  background: #d1fae5;
  color: #065f46;
}

.status-completed {
  background: #d1fae5;
  color: #065f46;
}

.status-cancelled {
  background: #fee2e2;
  color: #991b1b;
}

.status-select {
  padding: 0.375rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  font-size: 0.875rem;
  min-width: 120px;
}

@media (max-width: 1200px) {
  .table-header,
  .table-row {
    grid-template-columns: 160px 140px 120px 120px 160px 120px;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
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
