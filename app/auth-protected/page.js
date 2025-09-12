'use client'

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthProtected() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to signin
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Authentication Protected Page</h1>
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-green-800 mb-2">
          Welcome to the authentication protected area!
        </h2>
        <p className="text-green-700">
          You are successfully authenticated as <strong>{user?.name}</strong>
        </p>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">User Information</h3>
        <div className="space-y-2">
          <p><strong>Name:</strong> {user?.name}</p>
        </div>
        <div className="mt-4">
          <p className="font-medium mb-2">Profile Picture:</p>
          {user?.image ? (
            <img
              src={user.image}
              alt={user.name || 'User'}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-medium">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
