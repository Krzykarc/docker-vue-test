<script setup lang="ts">
import { Button, Card } from '@/design-system';
import { useCssModule } from 'vue';
import type { LegoSet } from '../types';

const styles = useCssModule();

defineProps<{
  set: LegoSet;
}>();

const emit = defineEmits<{
  (e: 'edit', set: LegoSet): void;
  (e: 'delete', setId: number): void;
}>();
</script>

<template>
  <Card :class="styles.setCard">
    <img 
      :src="set.imageUrl" 
      :alt="`${set.name} - LEGO set image`"
      :class="styles.setImage"
    />
    <div :class="styles.setInfo">
      <h2 :class="styles.setName">{{ set.name }}</h2>
      <div :class="styles.setDetails">
        <span :class="styles.setTheme">{{ set.theme }}</span>
        <span :class="styles.setPieces">{{ set.pieces.toLocaleString() }} pieces</span>
      </div>
      <p :class="styles.setDescription">{{ set.description }}</p>
      <div :class="styles.setDetails">
        <span :class="styles.setPrice">${{ set.price.toFixed(2) }}</span>
        <span :class="styles.setYear">{{ set.year }}</span>
      </div>
      <div :class="styles.setActions">
        <Button
          @click="emit('edit', set)"
          variant="outline"
          size="small"
        >
          Edit
        </Button>
        <Button
          @click="emit('delete', set.id)"
          variant="outline"
          size="small"
        >
          Delete
        </Button>
      </div>
    </div>
  </Card>
</template>

<style module>
.setCard {
  overflow: hidden;
}

.setImage {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.setInfo {
  padding: var(--spacing-lg);
}

.setName {
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-lg);
}

.setDetails {
  display: flex;
  justify-content: space-between;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-light);
}

.setTheme {
  background: var(--bg-tertiary);
  padding: var(--spacing-xs) var(--spacing-lg);
  border-radius: var(--radius-xl);
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

.setPieces {
  font-weight: bold;
  color: var(--text-primary);
}

.setDescription {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
  line-height: var(--line-height-normal);
}

.setPrice {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

.setYear {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

.setActions {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
  justify-content: flex-end;
}
</style> 