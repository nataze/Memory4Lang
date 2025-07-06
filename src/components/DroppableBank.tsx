import { useDroppable } from "@dnd-kit/core";
import styles from '../App.module.css';


export const DroppableBank = ({ children }: { children: React.ReactNode }) => {
  const { isOver, setNodeRef } = useDroppable({ id: 'bank' });
  const rowClass = isOver ? styles.droppableOver : styles.droppable;

  return (
    <div ref={setNodeRef} className={rowClass}>
      <div className={styles.matchRow}>{children}</div>
    </div>
  );
};