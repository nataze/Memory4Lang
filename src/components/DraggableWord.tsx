import { useDraggable } from '@dnd-kit/core';
import styles from '../App.module.css';
import dragSound from '../assets/sounds/drag.mp3'
import { useSettings } from '../contexts/SettingsContext';




export const DraggableWord = ({ word, inBank = false }: { word: string; inBank?: boolean }) => {
  const { isMuted } = useSettings();

  const handleMouseDown = () => {
    if (!isMuted) {
      const audio = new Audio(dragSound);
      audio.play().catch(() => {});
    }
  };


  const { 
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({ id: word });
  
  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;
  
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`${styles.draggable} ${inBank ? styles.inBank : ''}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {word}
    </div>
  );
}