<script setup lang="ts">
import { Button, Input, Select } from '@/design-system';
import { useCssModule } from 'vue';
import type { LegoSet } from '../types';
import { useLegoSetForm } from '../composables/useLegoSetForm';

const styles = useCssModule();

const props = defineProps<{
  set?: LegoSet;
  themes: string[];
}>();

const emit = defineEmits<{
  (e: 'save', set: Omit<LegoSet, 'id'>): void;
  (e: 'cancel'): void;
}>();

const { formState, isFormValid, getFormData } = useLegoSetForm(props.set, props.themes);
const currentYear = new Date().getFullYear();

const handleSubmit = () => {
  if (!isFormValid.value) return;
  emit('save', getFormData());
};
</script>

<template>
  <form :class="styles.form" @submit.prevent="handleSubmit">
    <h2 :class="styles.title">{{ set ? 'Edit LEGO Set' : 'Add New LEGO Set' }}</h2>
    
    <div :class="styles.formGroup">
      <Input
        v-model="formState.name"
        label="Set Name"
        placeholder="Enter set name"
        required
      />
    </div>

    <div :class="styles.formGroup">
      <Input
        v-model="formState.description"
        label="Description"
        placeholder="Enter set description"
        required
      />
    </div>

    <div :class="styles.formGroup">
      <Select
        v-model="formState.theme"
        :options="themes.map(t => ({ value: t, label: t }))"
        label="Theme"
        required
      />
    </div>

    <div :class="styles.formRow">
      <div :class="styles.formGroup">
        <Input
          v-model="formState.pieces"
          label="Number of Pieces"
          type="number"
          :min="1"
          required
        />
      </div>

      <div :class="styles.formGroup">
        <Input
          v-model="formState.price"
          label="Price ($)"
          type="number"
          :min="0.01"
          :step="0.01"
          required
        />
      </div>

      <div :class="styles.formGroup">
        <Input
          v-model="formState.year"
          label="Release Year"
          type="number"
          :min="1949"
          :max="currentYear"
          required
        />
      </div>
    </div>

    <div :class="styles.formGroup">
      <Input
        v-model="formState.imageUrl"
        label="Image URL"
        placeholder="Enter image URL"
        required
      />
    </div>

    <div :class="styles.actions">
      <Button
        type="submit"
        :disabled="!isFormValid"
        variant="primary"
      >
        {{ formState.mode === 'edit' ? 'Save Changes' : 'Add Set' }}
      </Button>
      <Button
        type="button"
        variant="outline"
        @click="emit('cancel')"
      >
        Cancel
      </Button>
    </div>
  </form>
</template>

<style module>
.form {
  background: var(--bg-primary);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  max-width: 800px;
  margin: 0 auto;
}

.title {
  color: var(--text-primary);
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.formGroup {
  margin-bottom: var(--spacing-lg);
}

.formRow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: flex-end;
  margin-top: var(--spacing-xl);
}

@media (max-width: 768px) {
  .form {
    padding: var(--spacing-lg);
  }

  .formRow {
    grid-template-columns: 1fr;
  }

  .actions {
    flex-direction: column;
  }
}
</style> 