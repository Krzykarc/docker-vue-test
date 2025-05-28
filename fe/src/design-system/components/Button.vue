<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  name?: string;
  value?: string;
  icon?: 'left' | 'right' | 'only';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
  fullWidth: false,
  type: 'button',
  name: '',
  value: '',
  icon: undefined
});

const buttonClasses = computed(() => [
  'ds-button',
  `ds-button--${props.variant}`,
  `ds-button--${props.size}`,
  { 'ds-button--disabled': props.disabled },
  { 'ds-button--loading': props.loading },
  { 'ds-button--full-width': props.fullWidth },
  { 'ds-button--icon-only': props.icon === 'only' },
  { 'ds-button--icon-left': props.icon === 'left' },
  { 'ds-button--icon-right': props.icon === 'right' }
]);
</script>

<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    :type="type"
    :name="name"
    :value="value"
    :aria-busy="loading"
    :aria-disabled="disabled"
  >
    <span v-if="loading" class="ds-button-loader" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 3.5C6.41015 3.5 3.5 6.41015 3.5 10C3.5 13.5899 6.41015 16.5 10 16.5C13.5899 16.5 16.5 13.5899 16.5 10C16.5 6.41015 13.5899 3.5 10 3.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </span>
    <slot></slot>
  </button>
</template>

<style scoped>
.ds-button {
  position: relative;
  border: none;
  border-radius: var(--radius-md, 4px);
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

/* Variants */
.ds-button--primary {
  background-color: var(--primary-color, #e31837);
  color: white;
  box-shadow: 0 2px 4px rgba(227, 24, 55, 0.2);
}

.ds-button--primary:hover:not(.ds-button--disabled) {
  background-color: var(--primary-color-dark, #c41530);
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(227, 24, 55, 0.3);
}

.ds-button--primary:active:not(.ds-button--disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(227, 24, 55, 0.2);
}

.ds-button--secondary {
  background-color: var(--bg-secondary, #f0f0f0);
  color: var(--text-primary, #333);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.ds-button--secondary:hover:not(.ds-button--disabled) {
  background-color: var(--bg-secondary-hover, #e0e0e0);
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}

.ds-button--secondary:active:not(.ds-button--disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.ds-button--outline {
  background-color: transparent;
  border: 2px solid var(--primary-color, #e31837);
  color: var(--primary-color, #e31837);
}

.ds-button--outline:hover:not(.ds-button--disabled) {
  background-color: var(--primary-color, #e31837);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(227, 24, 55, 0.2);
}

.ds-button--outline:active:not(.ds-button--disabled) {
  transform: translateY(0);
  box-shadow: none;
}

.ds-button--ghost {
  background-color: transparent;
  color: var(--text-primary, #333);
}

.ds-button--ghost:hover:not(.ds-button--disabled) {
  background-color: var(--bg-hover, rgba(0, 0, 0, 0.05));
}

.ds-button--danger {
  background-color: var(--error-color, #dc3545);
  color: white;
  box-shadow: 0 2px 4px rgba(220, 53, 69, 0.2);
}

.ds-button--danger:hover:not(.ds-button--disabled) {
  background-color: var(--error-color-dark, #c82333);
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(220, 53, 69, 0.3);
}

.ds-button--danger:active:not(.ds-button--disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(220, 53, 69, 0.2);
}

/* Sizes */
.ds-button--small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  min-height: 2rem;
}

.ds-button--medium {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  min-height: 2.5rem;
}

.ds-button--large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
  min-height: 3rem;
}

/* States */
.ds-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

.ds-button--loading {
  cursor: wait;
}

.ds-button--full-width {
  width: 100%;
}

/* Icon styles */
.ds-button--icon-only {
  padding: 0.5rem;
  min-width: 2.5rem;
  min-height: 2.5rem;
}

.ds-button--icon-left {
  padding-left: 1rem;
}

.ds-button--icon-right {
  padding-right: 1rem;
}

/* Loading animation */
.ds-button-loader {
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Focus styles */
.ds-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--primary-color-light, rgba(227, 24, 55, 0.3));
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .ds-button--secondary {
    background-color: var(--bg-secondary-dark, #2a2a2a);
    color: var(--text-primary-dark, #fff);
  }

  .ds-button--secondary:hover:not(.ds-button--disabled) {
    background-color: var(--bg-secondary-hover-dark, #333);
  }

  .ds-button--ghost {
    color: var(--text-primary-dark, #fff);
  }

  .ds-button--ghost:hover:not(.ds-button--disabled) {
    background-color: var(--bg-hover-dark, rgba(255, 255, 255, 0.1));
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .ds-button {
    transition: none;
  }

  .ds-button:hover:not(.ds-button--disabled) {
    transform: none;
  }

  .ds-button-loader {
    animation: none;
  }
}
</style> 