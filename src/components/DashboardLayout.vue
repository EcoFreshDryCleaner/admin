<template>
  <div class="dashboard-layout">
    <!-- Main Content -->
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup>
// DashboardLayout is now simplified to just provide the main content wrapper
// Navigation and header are handled by App.vue
</script>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  background: #f9fafb;
}

.main-content {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }
}
</style>
