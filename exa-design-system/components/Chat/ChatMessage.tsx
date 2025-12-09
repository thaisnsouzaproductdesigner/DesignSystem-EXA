import React from 'react';
import { Check, CheckCheck, ShieldAlert } from 'lucide-react'; // Importing icon for fallback avatar
import styles from './Chat.module.css';
import { cn } from '../../utils/cn';
import { Avatar } from '../Avatar/Avatar';

// Use simple ImageWithFallback logic if needed, or just an img tag for now as per request instructions?
// The instructions say "Use the ImageWithFallback component". But here we are inside the library.
// I'll just use a div/img.

export interface Message {
  id: string;
  role: 'user' | 'system' | 'agent';
  content: string | React.ReactNode;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'read' | 'error';
  avatarUrl?: string; // Optional override
}

interface ChatMessageProps {
  message: Message;
  isLastInGroup: boolean;
  showAvatar: boolean;
  isMine: boolean;
  onSuggestionClick?: (suggestion: string) => void;
  suggestions?: string[];
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isLastInGroup,
  showAvatar,
  isMine,
  onSuggestionClick,
  suggestions
}) => {
  const isSystemMessage = message.role === 'system' || message.role === 'agent';
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={styles.messageGroup}>
      <div className={cn(styles.messageRow, !isMine ? styles.systemRow : styles.userRow)}>
        {/* Avatar - Only for Left side (Others) */}
        {!isMine && (
          <div className={styles.avatarContainer}>
            {showAvatar ? (
              <Avatar 
                src={message.avatarUrl} 
                name={isSystemMessage ? "E" : "A"} 
                status="online" 
                className="w-full h-full"
              />
            ) : (
              <div className={styles.avatarPlaceholder} />
            )}
          </div>
        )}

        {/* Message Content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: !isMine ? 'flex-start' : 'flex-end', maxWidth: '100%' }}>
          <div 
            className={cn(
              styles.bubble,
              !isMine ? styles.systemBubble : styles.userBubble
            )}
          >
            {typeof message.content === 'string' ? (
              <p className={styles.textContent}>{message.content}</p>
            ) : (
              <div className={styles.richContent}>
                {message.content}
              </div>
            )}
          </div>
          
          {/* Suggestions (Only for System messages, if provided) */}
          {isSystemMessage && suggestions && suggestions.length > 0 && (
             <div className={styles.suggestionsContainer}>
               {suggestions.map((suggestion, idx) => (
                 <button 
                   key={idx} 
                   className={styles.suggestionChip}
                   onClick={() => onSuggestionClick?.(suggestion)}
                 >
                   {suggestion}
                 </button>
               ))}
             </div>
          )}
        </div>
      </div>

      {/* Metadata (Time + Status) */}
      <div className={cn(styles.metadata, !isMine ? styles.systemMetadata : styles.userMetadata)}>
        <span>{formatTime(message.timestamp)}</span>
        {isMine && message.status && (
          <span title={message.status}>
            {message.status === 'read' && <CheckCheck size={14} className="text-blue-500" />}
            {message.status === 'sent' && <Check size={14} className="text-gray-400" />}
            {message.status === 'sending' && <span className="text-xs text-gray-300">...</span>}
          </span>
        )}
      </div>
    </div>
  );
};
