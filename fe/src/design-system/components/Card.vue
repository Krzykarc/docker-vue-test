<script setup lang="ts">
interface Props {
  padding?: 'none' | 'small' | 'medium' | 'large';
  elevation?: 'none' | 'small' | 'medium' | 'large';
  hover?: boolean;
}

withDefaults(defineProps<Props>(), {
  padding: 'medium',
  elevation: 'small',
  hover: false
});
</script>

<template>
  <div
    :class="[
      'ds-card',
      `ds-card--padding-${padding}`,
      `ds-card--elevation-${elevation}`,
      { 'ds-card--hover': hover }
    ]"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.ds-card {
  background: white;
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.ds-card--padding-none {
  padding: 0;
}

.ds-card--padding-small {
  padding: 1rem;
}

.ds-card--padding-medium {
  padding: 1.5rem;
}

.ds-card--padding-large {
  padding: 2rem;
}

.ds-card--elevation-none {
  box-shadow: none;
}

.ds-card--elevation-small {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.ds-card--elevation-medium {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.ds-card--elevation-large {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.ds-card--hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}
</style> 