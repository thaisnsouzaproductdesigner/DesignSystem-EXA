import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  /** Card variant: surface (solid) or glass (translucent) */
  variant?: 'surface' | 'glass' | 'flat';
  /** Padding size: sm(16px), md(24px), lg(32px) */
  padding?: 'sm' | 'md' | 'lg';
  /** Makes the card interactive and selectable */
  selectable?: boolean;
  /** Selected state (only when selectable is true) */
  selected?: boolean;
  /** Callback when card is selected */
  onSelect?: (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;
  /** Product color for left border accent (Brand Blue, Cyan, Green, Purple) */
  productColor?: 'blue' | 'cyan' | 'green' | 'purple';
  /** Custom className */
  className?: string;
  /** Card content */
  children?: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const {
    variant = 'surface',
    padding = 'md',
    selectable = false,
    selected = false,
    onSelect,
    productColor,
    className = '',
    children,
    ...rest
  } = props;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectable && onSelect) {
      onSelect(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (selectable && onSelect && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onSelect(e);
    }
  };

  const paddingClass = styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`];
  const productClass = productColor ? styles[`product${productColor.charAt(0).toUpperCase() + productColor.slice(1)}`] : '';

  const cardClasses = [
    styles.root,
    styles[variant],
    paddingClass,
    selectable && styles.selectable,
    selected && styles.selected,
    productClass,
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      className={cardClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={selectable ? 0 : undefined}
      role={selectable ? 'button' : undefined}
      aria-pressed={selectable ? selected : undefined}
      data-variant={variant}
      data-padding={padding}
      data-selectable={selectable}
      data-selected={selected}
      data-product-color={productColor}
      {...rest}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
