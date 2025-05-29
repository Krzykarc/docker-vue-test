<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCssModule } from 'vue';
import type { LegoSet } from './types';
import { legoService } from './legoService';
import LegoSetForm from './components/LegoSetForm.vue';
import LegoSetCard from './components/LegoSetCard.vue';
import LegoControls from './components/LegoControls.vue';

const styles = useCssModule();

// State machine
type ViewState = 
  | { type: 'VIEWING' }
  | { type: 'ADDING' }
  | { type: 'EDITING'; set: LegoSet };

const state = ref<ViewState>({ type: 'VIEWING' });
const sets = ref<LegoSet[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);

// Load sets on component mount
onMounted(async () => {
  try {
    isLoading.value = true;
    sets.value = await legoService.getAllSets();
  } catch (err) {
    error.value = 'Failed to load LEGO sets';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
});

// Search and filter state
const searchQuery = ref('');
const selectedTheme = ref<string>('all');
const sortBy = ref<'name' | 'price' | 'pieces' | 'releaseYear'>('name');
const sortOrder = ref<'asc' | 'desc'>('asc');

// Computed values
const themes = computed(() => ['all', ...new Set(sets.value.map(set => set.theme))]);

const sortOptions = [
  { value: 'name', label: 'Sort by Name' },
  { value: 'price', label: 'Sort by Price' },
  { value: 'pieces', label: 'Sort by Pieces' },
  { value: 'releaseYear', label: 'Sort by Year' }
];

const filteredSets = computed(() => {
  return sets.value
    .filter(set => {
      const matchesSearch = set.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          set.setNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          set.theme.toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchesTheme = selectedTheme.value === 'all' || set.theme === selectedTheme.value;
      return matchesSearch && matchesTheme;
    })
    .sort((a, b) => {
      const modifier = sortOrder.value === 'asc' ? 1 : -1;
      if (sortBy.value === 'price' || sortBy.value === 'pieces' || sortBy.value === 'releaseYear') {
        return (a[sortBy.value] - b[sortBy.value]) * modifier;
      }
      return a.name.localeCompare(b.name) * modifier;
    });
});

// Type guards
const isEditing = (state: ViewState): state is { type: 'EDITING'; set: LegoSet } => {
  return state.type === 'EDITING';
};

// State machine transitions
const transitions = {
  toViewing: () => {
    state.value = { type: 'VIEWING' };
  },
  toAdding: () => {
    state.value = { type: 'ADDING' };
  },
  toEditing: (set: LegoSet) => {
    state.value = { type: 'EDITING', set };
  }
};

// CRUD handlers
const handleAddSet = () => {
  transitions.toAdding();
};

const handleEditSet = (set: LegoSet) => {
  transitions.toEditing(set);
};

const handleDeleteSet = async (setId: number) => {
  if (confirm('Are you sure you want to delete this set?')) {
    try {
      await legoService.deleteSet(setId);
      sets.value = sets.value.filter(set => set.id !== setId);
    } catch (err) {
      error.value = 'Failed to delete LEGO set';
      console.error(err);
    }
  }
};

const handleSaveSet = async (setData: Omit<LegoSet, 'id'>) => {
  try {
    if (isEditing(state.value)) {
      const editingSetId = state.value.set.id;
      const updatedSet = await legoService.updateSet(editingSetId, setData);
      sets.value = sets.value.map(set => 
        set.id === editingSetId ? updatedSet : set
      );
    } else {
      const newSet = await legoService.createSet(setData);
      sets.value = [...sets.value, newSet];
    }
    transitions.toViewing();
  } catch (err) {
    error.value = 'Failed to save LEGO set';
    console.error(err);
  }
};

const handleCancelForm = () => {
  transitions.toViewing();
};

// Computed properties for template
const isFormVisible = computed(() => state.value.type !== 'VIEWING');
const editingSet = computed(() => isEditing(state.value) ? state.value.set : undefined);
</script>

<template>
  <main :class="styles.legoPage" role="main">
    <header :class="styles.header">
      <h1 :class="styles.title">LEGO Sets Collection</h1>
      <LegoControls
        v-model:search-query="searchQuery"
        v-model:selected-theme="selectedTheme"
        v-model:sort-by="sortBy"
        :themes="themes"
        :sort-options="sortOptions"
        @add="handleAddSet"
      />
    </header>

    <div v-if="error" :class="styles.error">
      {{ error }}
    </div>

    <div v-if="isLoading" :class="styles.loading">
      Loading LEGO sets...
    </div>

    <LegoSetForm
      v-else-if="isFormVisible"
      :set="editingSet"
      :themes="themes.filter(t => t !== 'all')"
      @save="handleSaveSet"
      @cancel="handleCancelForm"
    />

    <div v-else :class="styles.setsGrid">
      <LegoSetCard
        v-for="set in filteredSets"
        :key="set.id"
        :set="set"
        @edit="handleEditSet"
        @delete="handleDeleteSet"
      />
    </div>
  </main>
</template>

<style module>
.legoPage {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: var(--spacing-xl);
}

.header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.title {
  color: var(--primary-color);
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-sm);
}

.setsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-xl);
}

/* Focus styles for better keyboard navigation */
:global(:focus-visible) {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Ensure sufficient color contrast */
@media (prefers-reduced-motion: reduce) {
  :global(*) {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

.error {
  color: var(--error-color, #dc2626);
  text-align: center;
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  background-color: var(--error-bg-color, #fee2e2);
  border-radius: var(--border-radius);
}

.loading {
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--text-secondary-color);
}
</style> 