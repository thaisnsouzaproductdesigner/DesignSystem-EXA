import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import styles from './BottomSheet.module.css';
import { createPortal } from 'react-dom';
import { Backdrop } from '../Backdrop';

export interface BottomSheetProps {
  /** Controla a abertura */
  isOpen: boolean;
  
  /** Callback ao fechar */
  onClose: () => void;
  
  /** Título fixo no topo */
  title?: string;
  
  /** Subtítulo ou texto de apoio no header */
  subtitle?: string;
  
  /** Conteúdo principal (rola automaticamente) */
  children: React.ReactNode;
  
  /** Botões de ação fixos na base (Primary/Secondary) */
  footer?: React.ReactNode;
  
  /** Mostra o botão 'X' de fechar no header? (Padrão: true) */
  showCloseButton?: boolean;

  /** Variação visual: Padrão ou Action Sheet (Menu) */
  variant?: 'standard' | 'action';

  /** 
   * Se true, renderiza via React Portal no body (padrão).
   * Se false, renderiza no local atual (útil para previews/docs).
   * @default true
   */
  portal?: boolean;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  showCloseButton = true,
  variant = 'standard',
  portal = true,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const startY = useRef<number>(0);

  // Handle delayed unmounting for animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      // Wait for animation to finish
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Focus Trap (Simple)
  useEffect(() => {
    if (isOpen && sheetRef.current) {
      sheetRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard Support (Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    // Only allow dragging from handle or header
    startY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    
    // Only allow dragging down
    if (diff > 0) {
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (dragOffset > 150) { // Threshold to close
      onClose();
    }
    setDragOffset(0);
  };

  const sheetStyle = {
    transform: isDragging ? `translateY(${dragOffset}px)` : undefined,
    height: 'auto',
    maxHeight: !portal ? '100%' : undefined, // Constrain height if inline
    transition: isDragging ? 'none' : undefined,
  };

  // Styles for backdrop override
  const backdropStyle = {
    opacity: isOpen ? 1 : 0,
    transition: 'opacity 0.3s ease',
  };

  const contentElement = (
    <Backdrop 
      open={shouldRender}
      onClick={onClose}
      className={`${styles.backdropOverride} ${!portal ? styles.backdropInline : ''}`}
      style={backdropStyle}
      blockScroll={portal} // Only block scroll if acting as a real overlay (portal)
    >
      <div
        ref={sheetRef}
        className={`${styles.sheet} ${isOpen ? styles.open : ''} ${variant === 'action' ? styles['sheet--action'] : ''}`}
        onClick={(e) => e.stopPropagation()}
        style={sheetStyle}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Bottom Sheet'}
      >
        {/* Drag Handle */}
        <div 
          className={styles.handleContainer}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles.handle} />
        </div>

        {/* Header */}
        {(title || showCloseButton) && (
          <div className={styles.header}>
            <div className={styles.titleContainer}>
              {title && <h2 className={styles.title}>{title}</h2>}
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
            {showCloseButton && (
              <button 
                onClick={onClose}
                className={styles.closeButton}
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className={styles.content} ref={contentRef}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className={styles.footer} style={{ flexDirection: 'column' }}>
            {footer}
          </div>
        )}
      </div>
    </Backdrop>
  );

  // Use portal if requested and we are in a browser environment
  if (portal && typeof document !== 'undefined') {
    return createPortal(contentElement, document.body);
  }
  
  return contentElement;
};
