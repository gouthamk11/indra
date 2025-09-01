'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Notification from '../../components/Notification';

export default function Playground() {
  const [apiKey, setApiKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('success');
  const [notificationMessage, setNotificationMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call the validation API
      const response = await fetch('/api/validate-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey: apiKey }),
      });

      const data = await response.json();

      if (response.ok && data.valid) {
        // Valid API key - store it and redirect to protected page
        localStorage.setItem('submittedApiKey', apiKey);
        router.push('/protected');
      } else {
        // Invalid API key - show error notification
        showNotificationMessage('error', 'Invalid API Key');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error validating API key:', error);
      showNotificationMessage('error', 'Error validating API key. Please try again.');
      setIsSubmitting(false);
    }
  };

  const showNotificationMessage = (type, message) => {
    setNotificationType(type);
    setNotificationMessage(message);
    setShowNotification(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {/* Notification */}
      {showNotification && (
        <Notification
          type={notificationType}
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}

      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">API Playground</h1>
          <p className="text-gray-600">Enter your API key to test the Research API</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
              API Key
            </label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your API key"
              required
            />
            <p className="mt-2 text-sm text-gray-500">
              Your API key will be validated on the next page
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !apiKey.trim()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit API Key'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don't have an API key?{' '}
            <a href="/dashboards" className="text-blue-600 hover:text-blue-800">
              Create one in the dashboard
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
