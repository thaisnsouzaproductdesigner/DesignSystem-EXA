import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variante visual do botão
   * - primary: Ação principal (background azul EXA)
   * - secondary: Ação secundária (outline)
   * - tertiary: Ação terciária (ghost/transparente)
   * - ghost: Alias para tertiary
   * - danger: Ações destrutivas (vermelho)
   * @default 'primary'
   */
  variant?: ButtonVariant;
  
  /**
   * Tamanho do botão
   * - sm: 12px (body-xs-medium)
   * - md: 14px (body-sm-medium) - Padrão
   * - lg: 16px (body-md-medium)
   */
  size?: ButtonSize;
  
  /**
   * Estado de carregamento
   * Exibe spinner e desabilita o botão
   */
  loading?: boolean;
  
  /**
   * Ícone à esquerda do texto
   */
  leftIcon?: React.ReactNode;
  
  /**
   * Ícone à direita do texto
   */
  rightIcon?: React.ReactNode;
  
  /**
   * Largura total (100%)
   */
  fullWidth?: boolean;
  
  /**
   * Children (texto do botão)
   */
  children: React.ReactNode;
}

/**
 * Componente Button - EXA Design System
 * 
 * Botão primário usado para as ações mais importantes da interface.
 * Segue os tokens semânticos e primitivos do EXA, com tipografia Inter,
 * border-radius pill (9999px) e tons de voz diretos e orientados à ação.
 * 
 * @example
 * ```tsx
 * <Button variant="primary">Ativar Proteção</Button>
 * <Button variant="secondary" leftIcon={<Shield />}>Proteger Celular</Button>
 * <Button variant="danger" loading>Excluir Conta</Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          styles.button,
          styles[variant],
          styles[size],
          loading && styles.loading,
          fullWidth && 'w-full',
          // Legacy classes for compatibility (optional, but good practice if widely used)
          'exa-button',
          `exa-button--${variant}`,
          `exa-button--${size}`,
          loading && 'exa-button--loading',
          fullWidth && 'w-full', // Duplicate logic from legacy? 'w-full' is a utility class anyway.
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {/* Loading Spinner */}
        {loading && (
          <Loader2 className={styles.spinner} size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
        )}
        
        {/* Left Icon */}
        {!loading && leftIcon && (
          <span className={styles.iconLeft}>{leftIcon}</span>
        )}
        
        {/* Button Text */}
        <span className={styles.text}>{children}</span>
        
        {/* Right Icon */}
        {!loading && rightIcon && (
          <span className={styles.iconRight}>{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
