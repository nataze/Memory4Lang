import React, { useState } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import styles from './SettingsModal.module.css';

export const SettingsModal = React.memo(({ onClose, onSave }: {
  onClose: () => void;
  onSave: () => void;
}) => {
  const { reverseDirection, isMuted, name, setConfig } = useSettings();
  const [formState, setFormState] = useState({ reverseDirection, isMuted, name });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfig(formState);
    onClose();
    onSave();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>⚙️ Game Settings</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            <input
              type="checkbox"
              name="reverseDirection"
              checked={formState.reverseDirection}
              onChange={handleChange}
            />
            Play French → English
          </label>

          <label className={styles.label}>
            <input
              type="checkbox"
              name="isMuted"
              checked={formState.isMuted}
              onChange={handleChange}
            />
            Mute Sound Effects
          </label>

          <label className={styles.label}>
            Name:
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={styles.input}
            />
          </label>

          <div className={styles.descriptionBox}>
            <p>🎯 Score 50% to pass. Score 80%+ to be exceptional and unlock a surprise!</p>
          </div>

          <div className={styles.actions}>
             <button type="submit" className={styles.modalButton}>Save</button>
            <button type="button" onClick={onClose} className={styles.cancelModalButton}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
});