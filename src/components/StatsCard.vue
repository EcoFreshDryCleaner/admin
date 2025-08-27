<template>
  <div class="stats-card">
    <div class="stats-icon">
      <font-awesome-icon :icon="icon" class="stats-icon-svg" />
    </div>
    <div class="stats-content">
      <p class="stats-label">{{ label }}</p>
      <p class="stats-value">{{ value }}</p>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineProps({
  icon: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
})
</script>

<style scoped>
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
</style>
