import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type BlockProps = {
  block: {
    id: string;
    type: string;
    content: string;
  };
};

const SortableBlock: React.FC<BlockProps> = ({ block }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "12px",
    margin: "8px 0",
    background: isDragging ? "#e0e0e0" : "#fff",
    border: "1px solid #ccc",
    borderRadius: "6px",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <strong>{block.type}</strong>
      <p>{block.content}</p>
    </div>
  );
};

export default SortableBlock;
