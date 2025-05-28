<script setup lang="ts">
import { Button, Input, Select } from '@/design-system';
import { useCssModule } from 'vue';

const styles = useCssModule();

const props = defineProps<{
  searchQuery: string;
  selectedTheme: string;
  sortBy: string;
  themes: string[];
  sortOptions: Array<{ value: string; label: string }>;
}>();

const emit = defineEmits<{
  (e: 'update:searchQuery', value: string): void;
  (e: 'update:selectedTheme', value: string): void;
  (e: 'update:sortBy', value: string): void;
  (e: 'add'): void;
}>();
</script>

<template>
  <div :class="styles.controls">
    <Input
      :model-value="searchQuery"
      @update:model-value="emit('update:searchQuery', $event)"
      placeholder="Search sets..."
      :class="styles.searchInput"
    />
    <Select
      :model-value="selectedTheme"
      @update:model-value="emit('update:selectedTheme', $event)"
      :options="themes.map(theme => ({ value: theme, label: theme === 'all' ? 'All Themes' : theme }))"
      :class="styles.themeSelect"
    />
    <Select
      :model-value="sortBy"
      @update:model-value="emit('update:sortBy', $event)"
      :options="sortOptions"
      :class="styles.sortSelect"
    />
    <Button
      @click="emit('add')"
      variant="primary"
      :class="styles.addButton"
    >
      Add New Set
    </Button>
  </div>
</template>

<style module>
.controls {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-xl);
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.searchInput {
  flex: 1;
  min-width: 300px;
}

.themeSelect {
  flex: 1;
  min-width: 300px;
}

.sortSelect {
  flex: 1;
  min-width: 300px;
}

.addButton {
  min-width: 150px;
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .searchInput {
    flex-direction: column;
  }
  
  .themeSelect {
    flex-direction: column;
  }
  
  .sortSelect {
    justify-content: flex-start;
  }

  .addButton {
    width: 100%;
  }
}
</style> 