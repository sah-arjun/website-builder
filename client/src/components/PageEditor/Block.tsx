import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties } from 'react';

type BlockProps = {
  id: string;
  type: string;
  content: string;
};

const Block = ({ id, type, content }: BlockProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '12px',
    border: '1px solid #ddd',
    marginBottom: '10px',
    backgroundColor: 'white',
    borderRadius: '8px',
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <strong>{type.toUpperCase()}</strong>
      <div>{content}</div>
    </div>
  );
};

export default Block;
