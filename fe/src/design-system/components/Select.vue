<script setup lang="ts">
import { computed } from 'vue';

interface Option {
  value: string;
  label: string;
}

interface Props {
  modelValue: string;
  options: Option[];
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  hint?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option',
  label: '',
  error: '',
  disabled: false,
  required: false,
  name: '',
  id: '',
  hint: ''
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
}>();

const selectId = computed(() => props.id || `select-${Math.random().toString(36).substr(2, 9)}`);
const hintId = computed(() => `${selectId.value}-hint`);
const errorId = computed(() => `${selectId.value}-error`);
</script>

<template>
  <div class="ds-select-wrapper">
    <label 
      v-if="label" 
      :for="selectId"
      class="ds-select-label"
    >
      {{ label }}
      <span v-if="required" class="ds-select-required" aria-hidden="true">*</span>
    </label>
    
    <div class="ds-select-container">
      <select
        :id="selectId"
        :name="name"
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        @focus="emit('focus')"
        @blur="emit('blur')"
        :disabled="disabled"
        :required="required"
        :aria-invalid="!!error"
        :aria-describedby="[error ? errorId : '', hint ? hintId : ''].filter(Boolean).join(' ') || undefined"
        :class="[
          'ds-select',
          { 'ds-select--error': error },
          { 'ds-select--disabled': disabled },
          { 'ds-select--has-value': modelValue }
        ]"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <div class="ds-select-icon">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

    <span 
      v-if="hint" 
      :id="hintId"
      class="ds-select-hint"
    >
      {{ hint }}
    </span>
    
    <span 
      v-if="error" 
      :id="errorId"
      class="ds-select-error"
      role="alert"
    >
      {{ error }}
    </span>
  </div>
</template>

<style scoped>
.ds-select-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.ds-select-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary, #333);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.ds-select-required {
  color: var(--error-color, #dc3545);
}

.ds-select-container {
  position: relative;
  width: 100%;
}

.ds-select {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 2px solid var(--border-color, #ddd);
  border-radius: var(--radius-md, 4px);
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-primary, #333);
  background-color: var(--bg-primary, white);
  cursor: pointer;
  appearance: none;
  transition: all 0.2s ease;
}

.ds-select:hover:not(:disabled) {
  border-color: var(--primary-color, #e31837);
}

.ds-select:focus {
  outline: none;
  border-color: var(--primary-color, #e31837);
  box-shadow: 0 0 0 3px var(--primary-color-light, rgba(227, 24, 55, 0.1));
}

.ds-select--error {
  border-color: var(--error-color, #dc3545);
}

.ds-select--error:focus {
  box-shadow: 0 0 0 3px var(--error-color-light, rgba(220, 53, 69, 0.1));
}

.ds-select--disabled {
  background-color: var(--bg-disabled, #f5f5f5);
  border-color: var(--border-disabled, #ddd);
  color: var(--text-disabled, #999);
  cursor: not-allowed;
}

.ds-select--has-value {
  color: var(--text-primary, #333);
}

.ds-select-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--text-secondary, #666);
  transition: transform 0.2s ease;
}

.ds-select:focus + .ds-select-icon {
  transform: translateY(-50%) rotate(180deg);
}

.ds-select-hint {
  font-size: 0.75rem;
  color: var(--text-secondary, #666);
}

.ds-select-error {
  font-size: 0.75rem;
  color: var(--error-color, #dc3545);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .ds-select {
    background-color: var(--bg-primary-dark, #1a1a1a);
    border-color: var(--border-color-dark, #333);
    color: var(--text-primary-dark, #fff);
  }

  .ds-select:hover:not(:disabled) {
    border-color: var(--primary-color-dark, #ff1f3d);
  }

  .ds-select--disabled {
    background-color: var(--bg-disabled-dark, #2a2a2a);
    border-color: var(--border-disabled-dark, #333);
    color: var(--text-disabled-dark, #666);
  }

  .ds-select-icon {
    color: var(--text-secondary-dark, #999);
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .ds-select,
  .ds-select-icon {
    transition: none;
  }
}
</style> 