import React, { forwardRef } from 'react';
import styles from './Chip.module.css';

// Filter icon SVG
const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 3.5a.5.5 0 01.5-.5h11a.5.5 0 01.5.5v1.086a.5.5 0 01-.146.354l-4.354 4.353a.5.5 0 00-.146.354v3.207a.5.5 0 01-.724.447l-2-1a.5.5 0 01-.276-.447V9.647a.5.5 0 00-.146-.354L2.146 4.94A.5.5 0 012 4.586V3.5z"
      fill="currentColor"
    />
  </svg>
);

// Dropdown chevron icon SVG
const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.427 5.927a.5.5 0 10-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 00-.708-.708L8 9.646 4.427 5.927z"
      fill="currentColor"
    />
  </svg>
);

export interface ChipProps {
  label: string;
  size?: 'small' | 'large';
  filterIcon?: boolean;
  dropdown?: boolean;
  active?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
  'aria-label'?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      label,
      size = 'small',
      filterIcon = false,
      dropdown = false,
      active = false,
      disabled = false,
      iconLeft,
      iconRight,
      className = '',
      'aria-label': ariaLabel,
      onClick,
      onKeyDown,
    },
    ref
  ) => {
    const getLeftIcon = () => {
      if (iconLeft) return iconLeft;
      if (filterIcon) return <FilterIcon />;
      return null;
    };

    const getRightIcon = () => {
      if (iconRight) return iconRight;
      if (dropdown) return <ChevronDownIcon />;
      return null;
    };

    const leftIconElement = getLeftIcon();
    const rightIconElement = getRightIcon();

    const rootClasses = [
      // Module Classes
      styles.root,
      size === 'small' ? styles.small : styles.large,
      active && styles.active,
      disabled && styles.disabled,
      // Legacy Classes
      'chip',
      `chip--${size}`,
      active && 'chip--active',
      disabled && 'chip--disabled',
      className
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={rootClasses}
        disabled={disabled}
        aria-label={ariaLabel || label}
        aria-pressed={active}
        onClick={onClick}
        onKeyDown={onKeyDown}
        type="button"
      >
        {leftIconElement && <span className={`chip__icon chip__icon--left ${styles.icon} ${styles.iconLeft}`}>{leftIconElement}</span>}
        <span className={`chip__label ${styles.label}`}>{label}</span>
        {rightIconElement && <span className={`chip__icon chip__icon--right ${styles.icon} ${styles.iconRight}`}>{rightIconElement}</span>}
      </button>
    );
  }
);

Chip.displayName = 'Chip';
