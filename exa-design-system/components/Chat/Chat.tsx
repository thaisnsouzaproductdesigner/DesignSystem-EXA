import React, { useRef, useEffect } from 'react';
import { ChatMessage, Message } from './ChatMessage';
import { ChatComposer } from './ChatComposer';
import { TypingIndicator } from './TypingIndicator';
import { Avatar } from '../Avatar/Avatar';
import styles from './Chat.module.css';
import { ShieldAlert, User } from 'lucide-react';

export interface ChatProps {
  messages: Message[];
  onSend: (text: string) => void;
  isTyping?: boolean;
  placeholder?: string;
  suggestions?: string[];
  allowAttachments?: boolean;
  className?: string;
  systemAvatarUrl?: string;
  userAvatarUrl?: string;
  viewAs?: 'user' | 'agent';
}

export const Chat: React.FC<ChatProps> = ({
  messages,
  onSend,
  isTyping = false,
  placeholder,
  suggestions,
  allowAttachments,
  systemAvatarUrl,
  userAvatarUrl,
  viewAs = 'user'
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className={styles.container}>
      <div 
        className={styles.messageList} 
        ref={scrollRef}
        role="log" 
        aria-live="polite"
        aria-label="Histórico do chat"
      >
        {/* Spacer to push messages down if list is short (flex-end replacement for scrolling behavior) */}
        <div style={{ marginTop: 'auto' }}></div> 

        {messages.map((msg, index) => {
          // Determine grouping logic
          const prevMsg = messages[index - 1];
          const nextMsg = messages[index + 1];
          
          const isFirstInGroup = !prevMsg || prevMsg.role !== msg.role;
          const isLastInGroup = !nextMsg || nextMsg.role !== msg.role;
          
          const isMine = viewAs === 'user' 
            ? msg.role === 'user'
            : (msg.role === 'system' || msg.role === 'agent');

          // Show avatar only on the last message of the group for the "Other" side
          const showAvatar = !isMine && isLastInGroup;

          const avatarUrl = (msg.role === 'system' || msg.role === 'agent') 
            ? (msg.avatarUrl || systemAvatarUrl)
            : (msg.avatarUrl || userAvatarUrl);

          // Pass suggestions only to the very last message if it is from system
          const isLastMessage = index === messages.length - 1;
          const msgSuggestions = (isLastMessage && (msg.role === 'system' || msg.role === 'agent')) ? suggestions : undefined;

          return (
            <ChatMessage
              key={msg.id}
              message={{...msg, avatarUrl}}
              isLastInGroup={isLastInGroup}
              showAvatar={showAvatar}
              isMine={isMine}
              suggestions={msgSuggestions}
              onSuggestionClick={onSend}
            />
          );
        })}

        {isTyping && (
          <div className={styles.messageRow + ' ' + styles.systemRow}>
             <div className={styles.avatarContainer}>
                 <Avatar 
                   src={viewAs === 'user' ? systemAvatarUrl : userAvatarUrl}
                   name={viewAs === 'user' ? "E" : "A"}
                   status="online"
                   className="w-full h-full"
                 />
             </div>
             <TypingIndicator />
          </div>
        )}
      </div>

      <ChatComposer 
        onSend={onSend}
        placeholder={placeholder}
        allowAttachments={allowAttachments}
      />
    </div>
  );
};
