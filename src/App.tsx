import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './App.module.css';
import confetti from 'canvas-confetti';

import { shuffle } from './helpers';
import { languageTranslations } from './data';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { DraggableWord } from './components/DraggableWord';
import { DroppableRow } from './components/DroppableRow';
import { DroppableBank } from './components/DroppableBank';
import { ScoreModal } from './components/ScoreModal/ScoreModal';

import dropSound from './assets/sounds/drop.mp3';
import failSound from './assets/sounds/fail.mp3';
import celebrationSound from './assets/sounds/victory.mp3';
import { useSettings } from './contexts/SettingsContext';
import { SettingsModal } from './components/SettingsModal/SettingsModal';
import { SplashScreen } from './components/SplashScreen/SplashScreen';

const dropAudio = new Audio(dropSound);
const failAudio = new Audio(failSound);
const celebrationAudio = new Audio(celebrationSound);

const veryGoodScore = 80;
const passScore = 50;


function App() {
  const { reverseDirection, isMuted } = useSettings();

  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [targetWords, setTargetWords] = useState<string[]>([]);
  const [matches, setMatches] = useState<Record<string, string[]>>({});
  const [scoreModal, setScoreModal] = useState<{ open: boolean; correct: number; total: number }>({ open: false, correct: 0, total: 0 });
  const [showSettings, setShowSettings] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor)
  );

  const getShuffledWords = useCallback(() => {
    if (reverseDirection) {
      // French to English
      setTargetWords(shuffle(languageTranslations.map(w => w.en)));
      setMatches({ bank: languageTranslations.map(w => w.fr) });
    } else {     
      // English to French - original direction
      setTargetWords(shuffle(languageTranslations.map(w => w.fr)));
      setMatches({ bank: languageTranslations.map(w => w.en) });
    }
  }, [reverseDirection]);

  useEffect(() => {
    getShuffledWords();
  }, [reverseDirection]);

  const startGame = useCallback(() => {
    setGameStarted(true);

    getShuffledWords();
  }, [getShuffledWords]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { over, active } = event;
    const overId = String(over?.id);
    const activeId = String(active?.id);

    if (over && active) {
      setMatches((prev) => {
        if (prev[overId]?.includes(activeId)) return prev;

        const updated: Record<string, string[]> = {};

        // Remove the word from any existing lists
        Object.entries(prev).forEach(([key, values]) => {
          updated[key] = values.filter(val => val !== activeId);
        });

        // Add the word to the new location
        updated[overId] = [...(updated[overId] || []), activeId];

        return updated;
      });

      if (!isMuted && overId !== 'bank') {
        dropAudio.play();
      }
    }
  }, [isMuted]);

  const grade = useCallback(() => {
    let correct = 0;
    let total = 0;

    languageTranslations.forEach(({ en, fr }) => {
      const source = reverseDirection ? fr : en;
      const target = reverseDirection ? en : fr;
      if (matches[target]?.includes(source)) correct++;
      total++;
    });

    setScoreModal({ open: true, correct, total });

    const percent = (correct / total) * 100;

    if (percent >= veryGoodScore) {
      !isMuted && celebrationAudio.play();
      confetti({ particleCount: 1500, spread: 200 });
    } else if ( !isMuted && percent >= passScore) {
      celebrationAudio.play();
    } else if (!isMuted) {
      failAudio.play();
    }
  }, [matches, isMuted, reverseDirection]);

  const closeModal = () => {
    setScoreModal({ open: false, correct: 0, total: 0 });
    setGameStarted(false);
  };

  const prevDirectionRef = useRef(reverseDirection);

  const handleSaveSettings = useCallback(() => {
    if (gameStarted && reverseDirection !== prevDirectionRef.current) {
      // If reverse direction changed while game is in progress, restart the game
      startGame();
      prevDirectionRef.current = reverseDirection;
    }
  }, [gameStarted, reverseDirection, startGame]);


  return (
    <div className={styles.appContainer}>
      <button
        className={styles.menuButton}
        onClick={() => setShowSettings(true)}
        aria-label="Open settings"
      >
        ☰
      </button>

      {!gameStarted && <SplashScreen startGame={startGame} />}


      {gameStarted && (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className={styles.topControls}>
            <button className={styles.backButton} onClick={() => setGameStarted(false)}>
              ⬅ Back
            </button>
          </div>

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
              <h2 className={styles.columnTitle}>{reverseDirection ? 'French Words' : 'English Words'}</h2>
              <div className={styles.wordList}>
                <DroppableBank>
                  {matches['bank']?.map((word) => (
                    <DraggableWord inBank key={word} word={word} />
                  ))}
                </DroppableBank>
              </div>
            </div>

            <div>
              <h2 className={styles.columnTitle}>{reverseDirection ? 'English Words' : 'French Words'}</h2>
              <div className={styles.wordList}>
                {targetWords.map((target) => (
                  <DroppableRow key={target} fr={target}>
                    {matches[target]?.map((dragged) => (
                      <DraggableWord key={dragged} word={dragged} />
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

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} onSave={handleSaveSettings} />}
    </div>
  );
}

export default App;
