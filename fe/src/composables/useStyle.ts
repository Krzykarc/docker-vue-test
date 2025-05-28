import { computed } from 'vue'

export function useStyle(module: Record<string, string>) {
  return computed(() => module)
} 