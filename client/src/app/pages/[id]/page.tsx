'use client';

import { useEffect, useState } from 'react';
import BlockList from '@/components/PageEditor/BlockList';
import { getPageById, updatePage } from '@/services/page.service';
import { useParams } from 'next/navigation';

export default function PageDetail() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [blocks, setBlocks] = useState([
    { id: '1', type: 'heading', content: 'Welcome to the Page' },
    { id: '2', type: 'paragraph', content: 'This is the first paragraph.' },
    { id: '3', type: 'image', content: 'image-url.jpg' },
  ]);

  useEffect(() => {
    const fetchPage = async () => {
      const page = await getPageById(id as string);
      setTitle(page.title);
      setBlocks(page.blocks || []);
    };
    fetchPage();
  }, [id]);

  const handleBlocksChange = async (updatedBlocks: typeof blocks) => {
    setBlocks(updatedBlocks);
    await updatePage(id as string, { title, blocks: updatedBlocks });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <BlockList initialBlocks={blocks} onBlocksChange={handleBlocksChange} />
    </div>
  );
}
