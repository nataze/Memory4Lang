import { useDroppable } from '@dnd-kit/core';
import styles from '../App.module.css';
import React from 'react';

export const DroppableRow = React.memo(({ fr, children }: { fr: string; children: React.ReactNode }) => {
  const { isOver, setNodeRef } = useDroppable({ id: fr });
  
  const rowClass = isOver ? styles.droppableOver : styles.droppable;

  return (
    <div ref={setNodeRef} className={rowClass}>
      <div className={styles.frenchLabel}>{fr}</div>
      <div className={styles.matchRow}>{children}</div>
    </div>
  );
});
