'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getPages } from '@/services/page.service';

const Dashboard = () => {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      getPages()
        .then(setPages)
        .catch((err) => console.error('Failed to fetch pages:', err));
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {user?.user?.name || user?.user?.username}!
        </h1>

        <button
          onClick={() => router.push('/pages/create')}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          ➕ Add New Page
        </button>

        <div>
          <h2 className="text-lg font-semibold mb-2">Your Pages</h2>
          <ul className="space-y-2">
            {pages.map((page) => (
              <li
                key={page._id}
                className="p-3 border rounded cursor-pointer hover:bg-gray-100"
                onClick={() => router.push(`/pages/${page._id}/blocks`)}
              >
                {page.title || 'Untitled Page'}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={logout}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
