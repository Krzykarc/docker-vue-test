<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  hint?: string;
  min?: number;
  max?: number;
  step?: number;
  pattern?: string;
  autocomplete?: string;
  readonly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  type: 'text',
  label: '',
  error: '',
  disabled: false,
  required: false,
  name: '',
  id: '',
  hint: '',
  readonly: false,
  min: undefined,
  max: undefined,
  step: undefined
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
}>();

const inputId = computed(() => props.id || `input-${Math.random().toString(36).substr(2, 9)}`);
const hintId = computed(() => `${inputId.value}-hint`);
const errorId = computed(() => `${inputId.value}-error`);

// Handle numeric input
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value = target.value;

  if (props.type === 'number') {
    // Remove any non-numeric characters except decimal point and minus sign
    value = value.replace(/[^\d.-]/g, '');
    
    // Ensure only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }

    // Handle negative numbers
    if (value.startsWith('-')) {
      value = '-' + value.slice(1).replace(/-/g, '');
    }

    // Apply min/max constraints
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      if (props.min !== undefined && numValue < props.min) {
        value = props.min.toString();
      }
      if (props.max !== undefined && numValue > props.max) {
        value = props.max.toString();
      }
    }
  }

  emit('update:modelValue', value);
};
</script>

<template>
  <div class="ds-input-wrapper">
    <label 
      v-if="label" 
      :for="inputId"
      class="ds-input-label"
    >
      {{ label }}
      <span v-if="required" class="ds-input-required" aria-hidden="true">*</span>
    </label>
    
    <div class="ds-input-container">
      <input
        :id="inputId"
        :name="name"
        :value="modelValue"
        @input="handleInput"
        @focus="emit('focus')"
        @blur="emit('blur')"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :readonly="readonly"
        :min="type === 'number' ? min : undefined"
        :max="type === 'number' ? max : undefined"
        :step="type === 'number' ? step : undefined"
        :pattern="pattern"
        :autocomplete="autocomplete"
        :aria-invalid="!!error"
        :aria-describedby="[error ? errorId : '', hint ? hintId : ''].filter(Boolean).join(' ') || undefined"
        :class="[
          'ds-input',
          { 'ds-input--error': error },
          { 'ds-input--disabled': disabled },
          { 'ds-input--readonly': readonly },
          { 'ds-input--has-value': modelValue }
        ]"
      />
      <div v-if="type === 'search'" class="ds-input-icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 13.5C10.8137 13.5 13.5 10.8137 13.5 7.5C13.5 4.18629 10.8137 1.5 7.5 1.5C4.18629 1.5 1.5 4.18629 1.5 7.5C1.5 10.8137 4.18629 13.5 7.5 13.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12.5 12.5L15 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

    <span 
      v-if="hint" 
      :id="hintId"
      class="ds-input-hint"
    >
      {{ hint }}
    </span>
    
    <span 
      v-if="error" 
      :id="errorId"
      class="ds-input-error"
      role="alert"
    >
      {{ error }}
    </span>
  </div>
</template>

<style scoped>
.ds-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.ds-input-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary, #333);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.ds-input-required {
  color: var(--error-color, #dc3545);
}

.ds-input-container {
  position: relative;
  width: 100%;
}

.ds-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid var(--border-color, #ddd);
  border-radius: var(--radius-md, 4px);
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-primary, #333);
  background-color: var(--bg-primary, white);
  transition: all 0.2s ease;
}

.ds-input:hover:not(:disabled):not(:readonly) {
  border-color: var(--primary-color, #e31837);
}

.ds-input:focus {
  outline: none;
  border-color: var(--primary-color, #e31837);
  box-shadow: 0 0 0 3px var(--primary-color-light, rgba(227, 24, 55, 0.1));
}

.ds-input--error {
  border-color: var(--error-color, #dc3545);
}

.ds-input--error:focus {
  box-shadow: 0 0 0 3px var(--error-color-light, rgba(220, 53, 69, 0.1));
}

.ds-input--disabled {
  background-color: var(--bg-disabled, #f5f5f5);
  border-color: var(--border-disabled, #ddd);
  color: var(--text-disabled, #999);
  cursor: not-allowed;
}

.ds-input--readonly {
  background-color: var(--bg-readonly, #f9f9f9);
  border-color: var(--border-readonly, #eee);
  cursor: default;
}

.ds-input--has-value {
  color: var(--text-primary, #333);
}

.ds-input-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--text-secondary, #666);
}

.ds-input-hint {
  font-size: 0.75rem;
  color: var(--text-secondary, #666);
}

.ds-input-error {
  font-size: 0.75rem;
  color: var(--error-color, #dc3545);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .ds-input {
    background-color: var(--bg-primary-dark, #1a1a1a);
    border-color: var(--border-color-dark, #333);
    color: var(--text-primary-dark, #fff);
  }

  .ds-input:hover:not(:disabled):not(:readonly) {
    border-color: var(--primary-color-dark, #ff1f3d);
  }

  .ds-input--disabled {
    background-color: var(--bg-disabled-dark, #2a2a2a);
    border-color: var(--border-disabled-dark, #333);
    color: var(--text-disabled-dark, #666);
  }

  .ds-input--readonly {
    background-color: var(--bg-readonly-dark, #222);
    border-color: var(--border-readonly-dark, #333);
  }

  .ds-input-icon {
    color: var(--text-secondary-dark, #999);
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .ds-input {
    transition: none;
  }
}

/* Number input specific styles */
.ds-input[type="number"] {
  -moz-appearance: textfield;
}

.ds-input[type="number"]::-webkit-outer-spin-button,
.ds-input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Search input specific styles */
.ds-input[type="search"] {
  padding-right: 2.5rem;
}

/* Password input specific styles */
.ds-input[type="password"] {
  font-family: monospace;
  letter-spacing: 0.125em;
}
</style> 