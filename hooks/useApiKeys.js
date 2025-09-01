import { useState, useEffect } from 'react';
import { apiKeysService } from '../lib/api';

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch API keys from database
  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        setError(null);
        const data = await apiKeysService.getAll();
        setApiKeys(data);
      } catch (error) {
        console.error('Error fetching API keys:', error);
        setError('Failed to fetch API keys');
        setApiKeys([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApiKeys();
  }, []);

  const createApiKey = async (keyData) => {
    try {
      const newKey = await apiKeysService.create(keyData);
      setApiKeys([newKey, ...apiKeys]);
      return { success: true, data: newKey };
    } catch (error) {
      console.error('Error creating API key:', error);
      return { success: false, error: 'Failed to create API key' };
    }
  };

  const updateApiKey = async (id, keyData) => {
    try {
      const updatedKey = await apiKeysService.update(id, keyData);
      setApiKeys(apiKeys.map(key => 
        key.id === id ? updatedKey : key
      ));
      return { success: true, data: updatedKey };
    } catch (error) {
      console.error('Error updating API key:', error);
      return { success: false, error: 'Failed to update API key' };
    }
  };

  const deleteApiKey = async (id) => {
    try {
      await apiKeysService.delete(id);
      setApiKeys(apiKeys.filter(key => key.id !== id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting API key:', error);
      return { success: false, error: 'Failed to delete API key' };
    }
  };

  return {
    apiKeys,
    isLoading,
    error,
    createApiKey,
    updateApiKey,
    deleteApiKey
  };
}
