import { ref, computed } from 'vue';
import type { LegoSet } from '../types';

export interface LegoSetFormState {
  name: string;
  description: string;
  theme: string;
  pieces: string;
  price: string;
  year: string;
  imageUrl: string;
  mode: 'create' | 'edit';
}

export function useLegoSetForm(initialSet?: LegoSet, themes: string[] = []) {
  const formState = ref<LegoSetFormState>({
    name: initialSet?.name || '',
    description: initialSet?.description || '',
    theme: initialSet?.theme || themes[0] || '',
    pieces: initialSet?.pieces.toString() || '0',
    price: initialSet?.price.toString() || '0',
    year: initialSet?.year.toString() || new Date().getFullYear().toString(),
    imageUrl: initialSet?.imageUrl || '',
    mode: initialSet ? 'edit' : 'create'
  });

  const isFormValid = computed(() => {
    const { name, description, theme, pieces, price, year, imageUrl } = formState.value;
    return name.trim() !== '' &&
           description.trim() !== '' &&
           theme !== '' &&
           parseInt(pieces) > 0 &&
           parseFloat(price) > 0 &&
           parseInt(year) > 0 &&
           imageUrl.trim() !== '';
  });

  const submitButtonText = computed(() => 
    initialSet ? 'Save Changes' : 'Add Set'
  );

  const getFormData = (): Omit<LegoSet, 'id'> => {
    const { name, description, theme, pieces, price, year, imageUrl } = formState.value;
    return {
      name,
      description,
      theme,
      pieces: parseInt(pieces),
      price: parseFloat(price),
      year: parseInt(year),
      imageUrl
    };
  };

  return {
    formState,
    isFormValid,
    submitButtonText,
    getFormData
  };
} 