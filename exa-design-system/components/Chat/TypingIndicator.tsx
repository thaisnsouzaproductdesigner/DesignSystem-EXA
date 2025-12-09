import React from 'react';
import styles from './Chat.module.css';

export const TypingIndicator = () => {
  return (
    <div className={styles.typingContainer} aria-label="System is typing">
      <div className={styles.typingDot} />
      <div className={styles.typingDot} />
      <div className={styles.typingDot} />
    </div>
  );
};
