import { useState } from 'react';

export const useDragAndDrop = (id: number) => {
  const [isDragging, setisDragging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setisDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', `${id}`);
  };

  const handleDragEnter = () => {
    setIsDragOver(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return {
    isDragging,
    isDragOver,
    handleDragStart,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    setIsDragOver,
  };
};
