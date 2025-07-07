import React, { useMemo } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import styles from './ScoreModal.module.css';


export const ScoreModal = React.memo(({ correct, total, closeModal }: {
  correct: number;
  total: number;
  closeModal: () => void;
}) => {
  const { name } = useSettings();

  const scorePercentage = (correct / total) * 100;
  const resultEmoji = scorePercentage < 50 ? '😕' : '🎉';

  const message = useMemo(() => {
    return name
      ? `${scorePercentage > 50 ? 'Well done' : 'Hey'}, ${name}! You matched ${correct} of ${total} correctly.`
      : `You matched ${correct} of ${total} correctly!`
  }, [name, correct, total]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>{resultEmoji} Results</h2>
        <p className={styles.modalText}>
          {message}
          <br />
          Score: {Math.round(scorePercentage)}%
        </p>
        <button className={styles.modalButton} onClick={closeModal}>Play Again</button>
      </div>
    </div>
  )
});