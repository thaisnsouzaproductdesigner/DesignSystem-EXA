import React, { useEffect } from 'react';
import styles from './Backdrop.module.css';

export type BackdropVariant = 'glass' | 'solid';

export interface BackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  variant?: BackdropVariant;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  zIndex?: number;
  children?: React.ReactNode;
  blockScroll?: boolean;
}

/**
 * Backdrop Component - EXA Design System
 * 
 * Overlay layer that covers the underlying UI, typically used with modals,
 * drawers, or dialogs. Features the EXA glassmorphism effect by default,
 * reinforcing the brand's modern and protective identity.
 * 
 * @example
 * ```tsx
 * <Backdrop open={isOpen} onClick={handleClose}>
 *   <Modal>...</Modal>
 * </Backdrop>
 * ```
 */
export const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps>(
  (
    {
      open,
      variant = 'glass',
      onClick,
      className = '',
      zIndex = 1000,
      children,
      blockScroll = true,
      style,
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      if (!blockScroll) return;
      
      if (open) {
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
      } else {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        const scrollPosition = scrollY ? Math.abs(parseInt(scrollY, 10)) : 0;
        window.scrollTo(0, scrollPosition);
      }
      
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
      };
    }, [open, blockScroll]);

    if (!open) return null;

    const classes = [
      styles.backdrop,
      styles[variant],
      className
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        onClick={onClick}
        style={{ zIndex, ...style }}
        role="presentation"
        {...props}
      >
        {children}
      </div>
    );
  }
);

Backdrop.displayName = 'Backdrop';
