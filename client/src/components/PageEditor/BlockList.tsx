import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Block from './Block';

type BlockData = {
  id: string;
  type: string;
  content: string;
};

interface BlockEditorProps {
    initialBlocks: BlockData[];
    onBlocksChange: (blocks: BlockData[]) => void;
}

// const initialBlocks: BlockData[] = [
//   { id: '1', type: 'heading', content: 'Welcome to the Jungle' },
//   { id: '2', type: 'text', content: 'This is a travel blog block' },
//   { id: '3', type: 'image', content: 'https://via.placeholder.com/300' },
// ];

const BlockList = ({ initialBlocks, onBlocksChange }: BlockEditorProps) => {
  const [blocks, setBlocks] = useState<BlockData[]>(initialBlocks);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      const reordered = arrayMove(blocks, oldIndex, newIndex);
      setBlocks(reordered);
      onBlocksChange(reordered);
    }
  };

  const addNewBlock = () => {
    const newBlock = {
      id: uuid(),
      type: 'text',
      content: 'New block',
    };
    const updated = [...blocks, newBlock];
    setBlocks(updated);
    onBlocksChange(updated);
  };

  return (
    <div>
      <button onClick={addNewBlock} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">+ Add Block</button>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
          {blocks.map((block) => (
            <Block key={block.id} {...block} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
export default BlockList;
