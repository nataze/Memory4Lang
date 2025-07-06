import styles from './ScoreModal.module.css';


export const ScoreModal = ({ correct, total, closeModal }: {
  correct: number;
  total: number;
  closeModal: () => void;
}) => {

  const scorePercentage = (correct / total) * 100;
  const resultEmoji = scorePercentage < 50 ? '😕' : '🎉';
  
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>{resultEmoji} Results</h2>
        <p className={styles.modalText}>
          You matched {correct} of {total} correctly!<br />
          Score: {Math.round(scorePercentage)}%
        </p>
        <button className={styles.modalButton} onClick={closeModal}>Play Again</button>
      </div>
    </div>
  )
}