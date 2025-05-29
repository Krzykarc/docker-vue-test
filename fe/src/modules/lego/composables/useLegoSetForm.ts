import { ref, computed } from 'vue';
import type { LegoSet } from '../types';

export const useLegoSetForm = (initialSet?: LegoSet, themes: string[] = []) => {
  const formData = ref({
    setNumber: initialSet?.setNumber || '',
    name: initialSet?.name || '',
    pieces: initialSet?.pieces?.toString() || '',
    price: initialSet?.price?.toString() || '',
    ageRange: initialSet?.ageRange || '',
    theme: initialSet?.theme || themes[0] || '',
    releaseYear: initialSet?.releaseYear?.toString() || new Date().getFullYear().toString(),
    imageUrl: initialSet?.imageUrl || '',
  });

  const isFormValid = computed(() => {
    return (
      formData.value.setNumber.trim() !== '' &&
      formData.value.name.trim() !== '' &&
      formData.value.pieces.trim() !== '' &&
      formData.value.price.trim() !== '' &&
      formData.value.ageRange.trim() !== '' &&
      formData.value.theme.trim() !== '' &&
      formData.value.releaseYear.trim() !== '' &&
      formData.value.imageUrl.trim() !== ''
    );
  });

  const getFormData = () => ({
    setNumber: formData.value.setNumber,
    name: formData.value.name,
    pieces: parseInt(formData.value.pieces),
    price: parseFloat(formData.value.price),
    ageRange: formData.value.ageRange,
    theme: formData.value.theme,
    releaseYear: parseInt(formData.value.releaseYear),
    imageUrl: formData.value.imageUrl,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  const resetForm = () => {
    formData.value = {
      setNumber: '',
      name: '',
      pieces: '',
      price: '',
      ageRange: '',
      theme: '',
      releaseYear: new Date().getFullYear().toString(),
      imageUrl: '',
    };
  };

  return {
    formData,
    isFormValid,
    getFormData,
    resetForm,
  };
}; 