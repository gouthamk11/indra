// API utility functions for CRUD operations

export const apiKeysService = {
  // Get all API keys
  async getAll() {
    const response = await fetch('/api/keys')
    if (!response.ok) {
      throw new Error('Failed to fetch API keys')
    }
    return response.json()
  },

  // Create new API key
  async create(keyData) {
    const response = await fetch('/api/keys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(keyData),
    })
    if (!response.ok) {
      throw new Error('Failed to create API key')
    }
    return response.json()
  },

  // Update API key
  async update(id, keyData) {
    const response = await fetch(`/api/keys/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(keyData),
    })
    if (!response.ok) {
      throw new Error('Failed to update API key')
    }
    return response.json()
  },

  // Delete API key
  async delete(id) {
    const response = await fetch(`/api/keys/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete API key')
    }
    return response.json()
  },
}
