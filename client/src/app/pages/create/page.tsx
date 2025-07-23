'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPage } from '@/services/page.service';

const CreatePage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title cannot be empty');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const newPage = await createPage(title.trim(), []);
      router.push(`/pages/${newPage._id}/blocks`);
    } catch (err: any) {
      setError(err?.message || 'Failed to create page');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4">Create New Page</h1>

        <label className="block mb-2 font-semibold" htmlFor="title">
          Page Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4"
          placeholder="Enter page title"
          disabled={loading}
        />

        {error && (
          <p className="text-red-500 mb-4" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Page'}
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
