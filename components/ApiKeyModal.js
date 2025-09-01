import { useState, useEffect } from 'react';

export default function ApiKeyModal({ 
  isOpen, 
  editingKey, 
  onClose, 
  onSubmit 
}) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'dev',
    limitUsage: false,
    monthlyLimit: 1000
  });

  // Reset form when modal opens/closes or editing key changes
  useEffect(() => {
    if (isOpen) {
      if (editingKey) {
        setFormData({
          name: editingKey.name,
          type: editingKey.type,
          limitUsage: editingKey.monthly_limit ? true : false,
          monthlyLimit: editingKey.monthly_limit || 1000
        });
      } else {
        setFormData({
          name: '',
          type: 'dev',
          limitUsage: false,
          monthlyLimit: 1000
        });
      }
    }
  }, [isOpen, editingKey]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const keyData = {
      name: formData.name,
      type: formData.type,
      monthlyLimit: formData.limitUsage ? formData.monthlyLimit : null
    };
    onSubmit(keyData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative mx-auto p-6 border w-full max-w-md shadow-xl rounded-lg bg-white">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {editingKey ? 'Edit API Key' : 'Create a new API key'}
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Enter a name and limit for the new API key.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Name — A unique name to identify this key
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Key Name"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Key Type — Choose the environment for this key
              </label>
              <div className="space-y-3">
                <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="keyType"
                    value="dev"
                    checked={formData.type === 'dev'}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="ml-3 flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Development</div>
                      <div className="text-xs text-gray-500">Rate limited to 100 requests/minute</div>
                    </div>
                  </div>
                </label>
                
                <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="keyType"
                    value="live"
                    checked={formData.type === 'live'}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="ml-3 flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Production</div>
                      <div className="text-xs text-gray-500">Rate limited to 1,000 requests/minute</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-3">
                <input
                  type="checkbox"
                  id="limitUsage"
                  checked={formData.limitUsage}
                  onChange={(e) => setFormData({...formData, limitUsage: e.target.checked})}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="limitUsage" className="ml-2 text-sm font-medium text-gray-700">
                  Limit monthly usage*
                </label>
              </div>
              {formData.limitUsage && (
                <input
                  type="number"
                  value={formData.monthlyLimit}
                  onChange={(e) => setFormData({...formData, monthlyLimit: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1000"
                  min="1"
                />
              )}
            </div>

            <div className="mb-6">
              <p className="text-xs text-gray-500">
                * If the combined usage of all your keys exceeds your plan&apos;s limit, all requests will be rejected.
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                {editingKey ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
