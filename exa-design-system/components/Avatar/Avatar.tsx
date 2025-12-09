import React, { useState, useEffect } from 'react';
import styles from './Avatar.module.css';
import { User } from 'lucide-react';

export interface AvatarProps {
  /** Define explicitamente o tipo de mídia. Se omitido, o componente infere com base nos dados. */
  type?: 'image' | 'flag' | 'icon' | 'text';

  /** Cor de fundo do avatar (aplica-se a ícones e texto) */
  color?: 'gradient' | 'neutral' | 'brand';

  /** Define se o avatar está selecionado, aplicando estilo de destaque (anel e cor de marca) */
  selected?: boolean;

  /** Variação de visualização: Single (Padrão) ou Double (Dois avatares sobrepostos) */
  variant?: 'single' | 'double';

  /** Layout da variante double: Horizontal (Padrão) ou Diagonal */
  doubleLayout?: 'horizontal' | 'diagonal';

  /** URL da imagem ou bandeira */
  src?: string;
  
  /** Ícone para exibir quando type="icon" */
  icon?: React.ReactNode;

  /** Nome para iniciais ou texto para exibir quando type="text". Também usado como Alt Text. */
  name?: string;
  
  /** Texto explícito para type="text" (prioridade sobre name) */
  text?: string;

  /** Tamanho do avatar */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /** Exibir borda branca para contraste? */
  hasBorder?: boolean;
  
  /** Status de presença (exibe um ponto colorido no canto inferior direito) */
  status?: 'online' | 'offline' | 'busy';

  /** Conteúdo do Badge (canto inferior direito). Pode ser URL de imagem ou ReactNode. Substitui o status se presente. */
  badge?: React.ReactNode | string;

  /** Exibir ponto de notificação (canto superior direito) */
  notification?: boolean;

  /** Dados do segundo avatar (usado apenas quando variant="double") */
  secondary?: Omit<AvatarProps, 'variant' | 'size' | 'hasBorder' | 'status' | 'badge' | 'notification' | 'className' | 'doubleLayout' | 'selected'>;

  /** Classe CSS adicional */
  className?: string;
}

const getInitials = (name: string) => {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// Internal component for rendering the core avatar circle
const AvatarCore = ({ 
  type, 
  color, 
  src, 
  icon, 
  name, 
  text, 
  size = 'md',
  hasBorder,
  className = '',
  extraStyles = {}
}: Omit<AvatarProps, 'variant' | 'status' | 'badge' | 'notification' | 'doubleLayout' | 'selected'> & { extraStyles?: React.CSSProperties }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const resolvedType = type || (src && !hasError ? 'image' : (text || name ? 'text' : 'icon'));
  const defaultColor = 'neutral';
  const resolvedColor = color || defaultColor;

  const sizeClass = styles[`avatar--${size}`];
  const borderClass = hasBorder ? styles['avatar--bordered'] : '';
  const colorClass = styles[`avatar--color-${resolvedColor}`];

  const renderContent = () => {
    if ((resolvedType === 'image' || resolvedType === 'flag') && src && !hasError) {
      return (
        <img 
          src={src} 
          alt={name || "Avatar"} 
          onError={() => setHasError(true)} 
          className={styles.avatar__image}
          style={resolvedType === 'flag' ? { objectFit: 'cover' } : undefined}
        />
      );
    }
    if (resolvedType === 'icon') {
      return (
        <div className={`${styles.avatar__container} ${styles.avatar__containerIcon}`}>
          {React.isValidElement(icon)
            ? React.cloneElement(icon as React.ReactElement<any>, {
                className: `${icon.props.className || ''} ${styles.avatar__icon}`,
              })
            : icon || <User className={styles.avatar__icon} strokeWidth={2} />}
        </div>
      );
    }
    if (resolvedType === 'text') {
      const displayText = text || (name ? getInitials(name) : '');
      return (
        <span className={styles.avatar__initials} aria-hidden="true">
          {displayText}
        </span>
      );
    }
    return (
      <div className={`${styles.avatar__container} ${styles.avatar__containerIcon}`}>
        <User className={styles.avatar__icon} strokeWidth={2} />
      </div>
    );
  };

  return (
    <div 
      className={`${styles.avatarCore} ${sizeClass} ${colorClass} ${borderClass} ${className}`}
      role="img"
      aria-label={name || "Avatar"}
      style={extraStyles}
    >
      {renderContent()}
    </div>
  );
};

export const Avatar = ({ 
  variant = 'single',
  doubleLayout = 'horizontal',
  type,
  color,
  selected = false,
  src, 
  icon,
  name, 
  text,
  size = 'md', 
  hasBorder = false,
  status,
  badge,
  notification,
  secondary,
  className = ''
}: AvatarProps) => {
  
  const sizeClass = styles[`wrapper--${size}`];
  const variantClass = styles[`wrapper--${variant}`];
  const layoutClass = variant === 'double' ? styles[`layout--${doubleLayout}`] : '';
  const selectedClass = selected ? styles.selected : '';

  // If selected, force 'brand' color for background if it's not an image
  // This applies the "Interactive Background State" requirement
  const primaryColor = selected ? 'brand' : color;

  // Overlays logic
  const overlays = (
    <>
      {/* Render Badge */}
      {badge && (
        <div className={styles.avatar__badge}>
          {typeof badge === 'string' ? (
            <img src={badge} alt="Badge" className={styles.avatar__badgeImage} />
          ) : (
            badge
          )}
        </div>
      )}

      {/* Render Status (only if no badge) */}
      {status && !badge && (
        <span 
          className={`${styles.avatar__status} ${styles[`avatar__status--${status}`]}`} 
          aria-label={`Status: ${status}`}
          role="status"
        />
      )}

      {/* Render Notification */}
      {notification && <span className={styles.avatar__notification} />}
    </>
  );

  return (
    <div className={`${styles.avatarWrapper} ${sizeClass} ${variantClass} ${layoutClass} ${selectedClass} ${className}`}>
      
      {/* Primary Avatar */}
      <div className={styles.avatarPrimaryWrapper}>
        <AvatarCore 
          type={type} 
          color={primaryColor} 
          src={src} 
          icon={icon} 
          name={name} 
          text={text} 
          size={size}
          hasBorder={hasBorder || variant === 'double'} 
        />
        {/* If Single, overlays attach to the only avatar available (Primary) */}
        {variant === 'single' && overlays}
      </div>

      {/* Secondary Avatar (Double Variant) */}
      {variant === 'double' && secondary && (
        <div className={styles.avatarSecondaryWrapper}>
          <AvatarCore 
            {...secondary}
            size={size}
            // If selected, we don't force secondary to be brand, but we could. 
            // Usually selection is on the whole item. 
            // Let's leave secondary as is unless requested otherwise.
            hasBorder={true} 
          />
          {/* If Double, overlays attach to the Secondary (front-most) avatar */}
          {overlays}
        </div>
      )}
    </div>
  );
};
