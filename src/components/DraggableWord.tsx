import { useDraggable } from '@dnd-kit/core';
import styles from '../App.module.css';
import dragSound from '../assets/sounds/drag.mp3'


const dragAudio = new Audio(dragSound);


export const DraggableWord = ({ word }: { word: string }) => {
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
      className={styles.draggable}
      onMouseDown={() => dragAudio.play()}
    >
      {word}
    </div>
  );
};