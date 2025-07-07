import React from "react";
import styles from "./SplashScreen.module.css";


export const SplashScreen = React.memo(({ startGame }: {
  startGame: () => void;
}) => {

  return (
    <div className={styles.splash}>
          <h1 className={styles.title}>Memory4Lang 🎯</h1>
          <p className={styles.subtitle}>Match the words. Test your memory. Learn French!</p>
          <div className={styles.cardPreviewRow}>
            <div className={styles.cardBack}>?</div>
            <div className={styles.cardFront}>🐸</div>
            <div className={styles.cardBack}>?</div>
            <div className={styles.cardFront}>🍎</div>
          </div>
          <button onClick={startGame} className={styles.goButton}>GO!</button>
          <p className={styles.description}>Score 50% to pass. Score over 80% to be exceptional and unlock a surprise!</p>
        </div>
  )
});