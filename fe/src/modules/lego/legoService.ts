import type { LegoSet } from './types';

const API_BASE_URL = 'http://localhost:3000/api';

export const legoService = {
  // Get all LEGO sets
  async getAllSets(): Promise<LegoSet[]> {
    const response = await fetch(`${API_BASE_URL}/lego-sets`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch LEGO sets');
    }
    return response.json();
  },

  // Get a single LEGO set by ID
  async getSetById(id: number): Promise<LegoSet> {
    const response = await fetch(`${API_BASE_URL}/lego-sets/${id}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch LEGO set');
    }
    return response.json();
  },

  // Create a new LEGO set
  async createSet(setData: Omit<LegoSet, 'id'>): Promise<LegoSet> {
    const response = await fetch(`${API_BASE_URL}/lego-sets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(setData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create LEGO set');
    }
    return response.json();
  },

  // Update a LEGO set
  async updateSet(id: number, setData: Partial<LegoSet>): Promise<LegoSet> {
    const response = await fetch(`${API_BASE_URL}/lego-sets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(setData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update LEGO set');
    }
    return response.json();
  },

  // Delete a LEGO set
  async deleteSet(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/lego-sets/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete LEGO set');
    }
  },
};
