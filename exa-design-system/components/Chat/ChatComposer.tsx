import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
import styles from './Chat.module.css';

interface ChatComposerProps {
  onSend: (text: string) => void;
  placeholder?: string;
  allowAttachments?: boolean;
  disabled?: boolean;
}

export const ChatComposer: React.FC<ChatComposerProps> = ({
  onSend,
  placeholder = "Digite sua mensagem...",
  allowAttachments = true,
  disabled = false
}) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    handleResize();
  }, [text]);

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.composer}>
      {allowAttachments && (
        <button 
          className={styles.attachButton}
          aria-label="Anexar arquivo"
          disabled={disabled}
        >
          <Paperclip size={20} />
        </button>
      )}
      
      <div className={styles.inputContainer}>
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          disabled={disabled}
          aria-label="Mensagem"
        />
      </div>

      <button 
        className={styles.sendButton}
        onClick={handleSend}
        disabled={!text.trim() || disabled}
        aria-label="Enviar mensagem"
      >
        <Send size={20} />
      </button>
    </div>
  );
};
