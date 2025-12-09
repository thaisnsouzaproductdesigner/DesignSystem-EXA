import React from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'subtle' | 'solid' | 'outline';
export type BadgeStatus = 'brand' | 'success' | 'warning' | 'error' | 'neutral';

export interface BadgeProps {
  /**
   * Content to display inside the badge
   * Use single words for best practices (e.g., "Active", "Protected")
   */
  children: React.ReactNode;
  
  /**
   * Visual hierarchy variant
   * - subtle: Light background with colored text (default, 90% of cases)
   * - solid: Vibrant background with white text (high emphasis)
   * - outline: Transparent background with border (low emphasis)
   * @default 'subtle'
   */
  variant?: BadgeVariant;
  
  /**
   * Semantic status color
   * - brand: Informational, institutional (Blue)
   * - success: Safe, completed, protected (Green)
   * - warning: Attention required, pending (Yellow)
   * - error: Critical, blocked, threat (Red)
   * - neutral: Draft, inactive (Gray)
   * @default 'brand'
   */
  status?: BadgeStatus;
  
  /**
   * Optional icon to display on the left
   * Reinforces meaning for colorblind users
   */
  leftIcon?: React.ReactNode;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Accessible label for screen readers
   */
  'aria-label'?: string;
  
  /**
   * Whether the badge is interactive (clickable)
   * If true, adds hover/focus states and pointer cursor
   * @default false
   */
  interactive?: boolean;
  
  /**
   * Click handler (makes badge interactive)
   */
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
}

/**
 * Badge Component - EXA Design System
 * 
 * A compact, non-intrusive visual element used to label, categorize, or 
 * indicate the status of an item. Designed for "Clarity" and "Security" 
 * - EXA's core pillars.
 * 
 * @example
 * ```tsx
 * // Subtle (default) - Most common
 * <Badge status="success">Protected</Badge>
 * 
 * // Solid - High emphasis
 * <Badge variant="solid" status="error">Infected</Badge>
 * 
 * // With icon
 * <Badge status="success" leftIcon={<Check size={12} />}>
 *   Active
 * </Badge>
 * ```
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = 'subtle',
      status = 'brand',
      leftIcon,
      className = '',
      'aria-label': ariaLabel,
      interactive = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'exa-badge';
    const variantClass = `exa-badge--${variant}`;
    const statusClass = `exa-badge--${status}`;
    const interactiveClass = (interactive || onClick) ? 'exa-badge--interactive' : '';
    
    const classes = [
      // Module Classes (New Standard)
      styles.badge,
      styles[variant],
      styles[status],
      (interactive || onClick) ? styles.interactive : '',
      
      // Global Classes (Legacy Support)
      baseClasses,
      variantClass,
      statusClass,
      interactiveClass,
      
      className
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span
        ref={ref}
        className={classes}
        aria-label={ariaLabel}
        role="status"
        onClick={onClick}
        {...props}
      >
        {leftIcon && <span className={`${styles.icon} exa-badge__icon`}>{leftIcon}</span>}
        <span className={`${styles.text} exa-badge__text`}>{children}</span>
      </span>
    );
  }
);

Badge.displayName = 'Badge';

/**
 * NumericBadge - Specialized badge for notification counts
 * 
 * Shows numeric values with optional max limit (e.g., "99+")
 * Can also display as a simple dot indicator.
 */
export interface NumericBadgeProps {
  /**
   * Numeric count to display
   */
  count: number;
  
  /**
   * Maximum count before showing "max+"
   * @default 99
   */
  max?: number;
  
  /**
   * Visual hierarchy variant
   * @default 'solid'
   */
  variant?: BadgeVariant;
  
  /**
   * Semantic status color
   * @default 'error'
   */
  status?: BadgeStatus;
  
  /**
   * Display style
   * - digit: Shows the count number
   * - dot: Shows only a decorative dot (no text)
   * @default 'digit'
   */
  style?: 'digit' | 'dot';
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Accessible label for screen readers
   */
  'aria-label'?: string;
}

export const NumericBadge = React.forwardRef<HTMLSpanElement, NumericBadgeProps>(
  (
    {
      count,
      max = 99,
      variant = 'solid',
      status = 'error',
      style = 'digit',
      className = '',
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const displayValue = count > max ? `${max}+` : count;
    const isDot = style === 'dot';
    
    const baseClasses = 'exa-badge exa-badge--numeric';
    const variantClass = `exa-badge--${variant}`;
    const statusClass = `exa-badge--${status}`;
    const dotClass = isDot ? 'exa-badge--dot' : '';
    
    const classes = [
      // Module Classes
      styles.badge,
      styles.numeric,
      styles[variant],
      styles[status],
      isDot ? styles.dot : '',

      // Legacy Classes
      baseClasses,
      variantClass,
      statusClass,
      dotClass,
      
      className
    ]
      .filter(Boolean)
      .join(' ');

    const defaultAriaLabel = ariaLabel || `${count} ${count === 1 ? 'notification' : 'notifications'}`;

    return (
      <span
        ref={ref}
        className={classes}
        aria-label={defaultAriaLabel}
        role="status"
        {...props}
      >
        {!isDot && <span className={`${styles.text} exa-badge__text`}>{displayValue}</span>}
      </span>
    );
  }
);

NumericBadge.displayName = 'NumericBadge';
