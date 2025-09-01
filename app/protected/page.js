'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Notification from '../../components/Notification';

export default function Protected() {
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('success');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const showNotificationMessage = (type, message) => {
    setNotificationType(type);
    setNotificationMessage(message);
    setShowNotification(true);
  };

  const validateApiKey = useCallback(async () => {
    try {
      // Check if we're in the browser environment
      if (typeof window === 'undefined') {
        setIsValidating(false);
        return;
      }

      // Get the API key from localStorage
      const submittedApiKey = localStorage.getItem('submittedApiKey');
      
      if (!submittedApiKey) {
        showNotificationMessage('error', 'No API key found. Please go back to the playground.');
        setIsValidating(false);
        return;
      }

      // Call the validation API
      const response = await fetch('/api/validate-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey: submittedApiKey }),
      });

      const data = await response.json();

      if (response.ok && data.valid) {
        setIsValid(true);
        showNotificationMessage('success', 'Valid API key, /protected can be accessed');
      } else {
        setIsValid(false);
        showNotificationMessage('error', 'Invalid API Key');
      }
    } catch (error) {
      console.error('Error validating API key:', error);
      setIsValid(false);
      showNotificationMessage('error', 'Error validating API key. Please try again.');
    } finally {
      setIsValidating(false);
    }
  }, []);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      validateApiKey();
    }
  }, [validateApiKey, isClient]);

  const handleBackToPlayground = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('submittedApiKey');
    }
    router.push('/playground');
  };

  if (!isClient || isValidating) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {!isClient ? 'Loading...' : 'Validating API key...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      {showNotification && (
        <Notification
          type={notificationType}
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}

      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {isValid ? 'Access Granted' : 'Access Denied'}
            </h1>
            <p className="text-lg text-gray-600">
              {isValid 
                ? 'Your API key is valid and you can now access protected resources.'
                : 'Your API key is invalid. Please check your key and try again.'
              }
            </p>
          </div>

          <div className="text-center space-y-4">
            {isValid ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-green-800 mb-2">Validation Successful</h3>
                <p className="text-green-700">
                  Your API key has been validated successfully. You can now use the Research API.
                </p>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-red-800 mb-2">Validation Failed</h3>
                <p className="text-red-700">
                  The API key you provided is not valid. Please check your key and try again.
                </p>
              </div>
            )}

            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={handleBackToPlayground}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Back to Playground
              </button>
              <button
                onClick={() => router.push('/dashboards')}
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
