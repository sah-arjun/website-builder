'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  getBlocksByPage,
  createBlock,
  updateBlock,
  deleteBlock,
} from '@/services/block.service';

interface Block {
  _id: string;
  content: string;
}

const BlocksPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pageId = pathname?.split('/')[2]; // extract id from /pages/[id]/blocks

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [newContent, setNewContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pageId) return;

    const fetchBlocks = async () => {
      try {
        const data = await getBlocksByPage(pageId);
        setBlocks(data);
      } catch (err: any) {
        setError(err?.message || 'Failed to load blocks');
      }
    };

    fetchBlocks();
  }, [pageId]);

  const handleAddBlock = async () => {
    if (!newContent.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const created = await createBlock(pageId!, newContent.trim());
      setBlocks((prev) => [...prev, created]);
      setNewContent('');
    } catch (err: any) {
      setError(err?.message || 'Failed to add block');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBlock = async (id: string, content: string) => {
    setLoading(true);
    setError(null);
    try {
      await updateBlock(id, content);
      setBlocks((prev) =>
        prev.map((b) => (b._id === id ? { ...b, content } : b))
      );
    } catch (err: any) {
      setError(err?.message || 'Failed to update block');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlock = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteBlock(id);
      setBlocks((prev) => prev.filter((b) => b._id !== id));
    } catch (err: any) {
      setError(err?.message || 'Failed to delete block');
    } finally {
      setLoading(false);
    }
  };

  if (!pageId) {
    return <div className="p-8">Invalid Page ID</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Blocks</h1>

      {error && (
        <p className="mb-4 text-red-600" role="alert">
          {error}
        </p>
      )}

      <div className="mb-6">
        <textarea
          className="w-full border rounded p-3"
          rows={4}
          placeholder="New block content..."
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          disabled={loading}
        />
        <button
          onClick={handleAddBlock}
          disabled={loading || !newContent.trim()}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          Add Block
        </button>
      </div>

      <ul className="space-y-4">
        {blocks.map((block) => (
          <li
            key={block._id}
            className="bg-white p-4 rounded shadow flex flex-col"
          >
            <EditableBlockContent
              block={block}
              onUpdate={handleUpdateBlock}
              onDelete={handleDeleteBlock}
              disabled={loading}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

interface EditableBlockContentProps {
  block: Block;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  disabled: boolean;
}

const EditableBlockContent = ({
  block,
  onUpdate,
  onDelete,
  disabled,
}: EditableBlockContentProps) => {
  const [content, setContent] = useState(block.content);
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    if (content.trim() && content !== block.content) {
      onUpdate(block._id, content.trim());
    }
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <textarea
            className="w-full border rounded p-2"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={disabled}
          />
          <div className="mt-2 flex space-x-2">
            <button
              onClick={handleSave}
              disabled={disabled}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Save
            </button>
            <button
              onClick={() => {
                setContent(block.content);
                setEditing(false);
              }}
              disabled={disabled}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="whitespace-pre-wrap">{block.content}</p>
          <div className="mt-2 flex space-x-2">
            <button
              onClick={() => setEditing(true)}
              disabled={disabled}
              className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500 disabled:opacity-50"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(block._id)}
              disabled={disabled}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BlocksPage;
