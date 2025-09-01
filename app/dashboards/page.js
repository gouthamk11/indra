'use client';

import { useApiKeys } from '../../hooks/useApiKeys';
import { useSidebar } from '../../hooks/useSidebar';
import { useApiKeyModal } from '../../hooks/useApiKeyModal';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import PlanCard from '../../components/PlanCard';
import ApiKeysTable from '../../components/ApiKeysTable';
import ApiKeyModal from '../../components/ApiKeyModal';

export default function Dashboard() {
  const { apiKeys, isLoading, createApiKey, updateApiKey, deleteApiKey } = useApiKeys();
  const { sidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const { 
    isModalOpen, 
    editingKey, 
    openCreateModal, 
    openEditModal, 
    closeModal 
  } = useApiKeyModal();

  const handleCreate = async (keyData) => {
    const result = await createApiKey(keyData);
    if (result.success) {
      closeModal();
    } else {
      alert(result.error);
    }
  };

  const handleUpdate = async (keyData) => {
    const result = await updateApiKey(editingKey.id, keyData);
    if (result.success) {
      closeModal();
    } else {
      alert(result.error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this API key?')) {
      const result = await deleteApiKey(id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const handleEdit = (key) => {
    openEditModal(key);
  };

  const handleModalSubmit = (keyData) => {
    if (editingKey) {
      handleUpdate(keyData);
    } else {
      handleCreate(keyData);
    }
  };

    if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Header toggleSidebar={toggleSidebar} />
        
        {/* Content Area */}
        <div className="p-6">
          <PlanCard />
          
          {/* API Keys Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">API Keys</h3>
                <button
                  onClick={openCreateModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                The key is used to authenticate your requests to the Research API. To learn more, see the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-800">documentation page</a>.
              </p>
            </div>
            
            <ApiKeysTable 
              apiKeys={apiKeys} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          </div>
        </div>

        {/* Create/Edit Form Modal */}
        <ApiKeyModal
          isOpen={isModalOpen}
          editingKey={editingKey}
          onClose={closeModal}
          onSubmit={handleModalSubmit}
        />
      </div>
    </div>
  );
}
