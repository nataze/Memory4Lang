import { useState } from 'react';
import styles from './App.module.css';
import confetti from 'canvas-confetti';

import { shuffle } from './helpers';
import { languageTranslations } from './data';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { DraggableWord } from './components/DraggableWord';
import { DroppableRow } from './components/DroppableRow';
import { DroppableBank } from './components/DroppableBank';
import { ScoreModal } from './components/ScoreModal/ScoreModal';

import dropSound from './assets/sounds/drop.mp3';
import failSound from './assets/sounds/fail.mp3';
import celebrationSound from './assets/sounds/victory.mp3';

const dropAudio = new Audio(dropSound);
const failAudio = new Audio(failSound);
const celebrationAudio = new Audio(celebrationSound);

const veryGoodScore = 80;
const passScore = 50;


function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [englishWords, setEnglishWords] = useState<string[]>([]);
  const [frenchWords, setFrenchWords] = useState<string[]>([]);
  const [matches, setMatches] = useState<Record<string, string[]>>({});
  const [scoreModal, setScoreModal] = useState<{ open: boolean; correct: number; total: number }>({ open: false, correct: 0, total: 0 });


  const startGame = () => {
    setGameStarted(true);

    setEnglishWords(shuffle(languageTranslations.map(w => w.en)));
    setFrenchWords(shuffle(languageTranslations.map(w => w.fr)));
    setMatches({ bank: languageTranslations.map(w => w.en) });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    const overId = String(over?.id);
    const activeId = String(active?.id);

    if (over && active) {
      setMatches((prev) => {
        const updated: Record<string, string[]> = {};

        // Remove the word from any existing lists
        Object.entries(prev).forEach(([key, values]) => {
          updated[key] = values.filter(val => val !== activeId);
        });

        // Add the word to the new location
        updated[overId] = [...(updated[overId] || []), activeId];

        return updated;
      });

      if (overId !== 'bank') {
        dropAudio.play();
      }
    }
  };

  const grade = () => {
    let correct = 0;
    let total = 0;

    languageTranslations.forEach(({ en, fr }) => {
      if (matches[fr]?.includes(en)) correct++;
      total++;
    });
    setScoreModal({ open: true, correct, total });

    const percent = (correct / total) * 100;

    if (percent >= veryGoodScore) {
      celebrationAudio.play();
      confetti({ particleCount: 1500, spread: 200 });
    } else if (percent >= passScore) {
      celebrationAudio.play();
    } else {
      failAudio.play();
    }
  };

  const closeModal = () => {
    setScoreModal({ open: false, correct: 0, total: 0 });
    setGameStarted(false);
  };

  return (
    <div className={styles.appContainer}>
      {!gameStarted && (
        <div className={styles.splash}>
          <h1 className={styles.title}>Memory4Lang 🎯</h1>
          <p className={styles.description}>
            Match each English word with its correct French translation. Drag and drop from the word bank to the correct French row. Let’s see how many you can get right!
          </p>
          <button onClick={startGame} className={styles.goButton}>GO!</button>
        </div>
      )}

      {gameStarted && (
        <DndContext onDragEnd={handleDragEnd}>
          <div className={styles.centered}>
            <button
              onClick={grade}
              className={styles.gradeButton}
            >
              GRADE
            </button>
          </div>
          
          <div className={styles.columns}>
            <div>
              <h2 className={styles.columnTitle}>English Words</h2>
              <div className={styles.wordList}>
                <DroppableBank>
                  {matches['bank']?.map((word) => (
                    <DraggableWord key={word} word={word} />
                  ))}
                </DroppableBank>
              </div>
            </div>

            <div>
              <h2 className={styles.columnTitle}>French Words</h2>
              <div className={styles.wordList}>
                {frenchWords.map((fr) => (
                  <DroppableRow key={fr} fr={fr}>
                    {matches[fr]?.map((en) => (
                      <DraggableWord key={en} word={en} />
                    ))}
                  </DroppableRow>
                ))}
              </div>
            </div>
          </div>
        </DndContext>
      )}

      {scoreModal.open && (
        <ScoreModal
          correct={scoreModal.correct}
          total={scoreModal.total}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default App;
