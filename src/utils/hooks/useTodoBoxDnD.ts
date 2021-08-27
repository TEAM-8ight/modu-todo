import React, { useState } from 'react';

export const useTodoBoxDnD = (ref: React.RefObject<HTMLDivElement>) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (!ref || !ref.current) return;
    if (ref.current.isSameNode(e.target as Node)) {
      setIsDragOver(false);
      e.preventDefault();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!ref || !ref.current) return;
    if (ref.current.isSameNode(e.target as Node)) {
      setIsDragOver(true);
      e.preventDefault();
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return {
    isDragOver,
    setIsDragOver,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
  };
};
