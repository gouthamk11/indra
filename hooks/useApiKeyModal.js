import { useState } from 'react';

export function useApiKeyModal() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingKey, setEditingKey] = useState(null);

  const openCreateModal = () => {
    setShowCreateForm(true);
    setEditingKey(null);
  };

  const openEditModal = (key) => {
    setEditingKey(key);
    setShowCreateForm(false);
  };

  const closeModal = () => {
    setShowCreateForm(false);
    setEditingKey(null);
  };

  const isModalOpen = showCreateForm || editingKey;

  return {
    showCreateForm,
    editingKey,
    isModalOpen,
    openCreateModal,
    openEditModal,
    closeModal
  };
}
