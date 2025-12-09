import React from 'react';
import styles from './Alert.module.css';
import { Check, X, ChevronRight, LucideProps } from 'lucide-react';
import { Button } from '../Button';

export type StatusVariant = 'success' | 'error' | 'warning' | 'info';
export type ActionType = 'single' | 'multiple' | 'link';

export interface FeedbackProps {
  variant: StatusVariant;
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  actionLabel?: string;
  showAction?: boolean | ActionType;
  onAction?: () => void;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

export interface AlertProps extends FeedbackProps {
  isElevated?: boolean;
}

// Custom glyph icons to match the "filled circle with glyph" pattern
// using Lucide style paths but without the surrounding circle.

const ExclamationIcon = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const InfoGlyphIcon = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="1" />
    <line x1="12" y1="12" x2="12" y2="12" /> {/* Placeholder to keep center logic if needed, but Info is actually dot top, line bottom */}
    {/* Correct Lucide Info is: circle around, then dot at top (y=8) and line (y=12 to 16) */}
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const defaultIcons = {
  success: <Check size={16} />,
  error: <X size={16} />,
  warning: <ExclamationIcon size={16} />, // Usando tamanho 16 para caber bem no círculo de 24px (com padding)
  info: <InfoGlyphIcon size={16} />
};

export const Alert: React.FC<AlertProps> = ({
  variant,
  title,
  children,
  onClose,
  icon,
  action,
  actionLabel,
  showAction,
  onAction,
  className,
  isElevated = false,
  padding = 'md'
}) => {
  const IconComponent = icon || defaultIcons[variant];

  const actionType = typeof showAction === 'string' 
    ? showAction 
    : (showAction ? 'single' : undefined);

  const isMultiple = actionType === 'multiple';
  const isSingle = actionType === 'single';
  const isLink = actionType === 'link';

  const paddingClass = styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`];

  const handleMultipleClick = () => {
    if (isMultiple && onAction) {
      onAction();
    }
  };

  return (
    <div 
      className={`${styles.alert} ${styles[variant]} ${isMultiple ? styles.clickable : ''} ${paddingClass} ${className || ''}`}
      role={variant === 'error' ? 'alert' : 'status'}
      style={isElevated ? { boxShadow: 'var(--shadow-elevated)' } : undefined}
      onClick={handleMultipleClick}
    >
      <div className={styles.icon}>
        {IconComponent}
      </div>
      
      <div className={styles.content}>
        {title && <h4 className={styles.title}>{title}</h4>}
        {children && <div className={styles.description}>{children}</div>}

        {/* New Layout: Single Action Button inside content */}
        {isSingle && actionLabel && onAction && !action && (
          <div className={styles.contentAction}>
            <Button 
              variant="tertiary" 
              size="sm" 
              onClick={(e) => { e.stopPropagation(); onAction(); }}
            >
              {actionLabel}
            </Button>
          </div>
        )}

        {/* New Layout: Link Action inside content */}
        {isLink && actionLabel && onAction && !action && (
          <button 
            className={styles.linkAction} 
            onClick={(e) => { e.stopPropagation(); onAction(); }}
            type="button"
          >
            {actionLabel}
          </button>
        )}
      </div>

      {(action || isMultiple || onClose) && (
        <div className={styles.actions}>
          {action}
          
          {/* Chevron for Multiple Actions */}
          {isMultiple && (
             <ChevronRight size={20} className={styles.chevron} />
          )}

          {onClose && (
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(); }} 
              className={styles.closeButton} 
              aria-label="Fechar alerta"
            >
              <X size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
