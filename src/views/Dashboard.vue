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
    </div>
  </DashboardLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useCollection } from 'vuefire'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import DashboardLayout from '../components/DashboardLayout.vue'
import { allPromotionsQuery } from '../services/promotionsService'

// Use VueFire to get promotions
const promotions = useCollection(allPromotionsQuery)

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
</script>
