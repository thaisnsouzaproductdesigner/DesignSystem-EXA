import React from 'react';
import { DocPreviewHeader } from './DocPreviewHeader';
import { ThemeScopeProvider } from '../ui/theme-scope';
import { useTheme } from '../../exa-design-system/contexts/ThemeContext';

export interface TokenMappingRow {
  token: string;
  value: string;
  usage: string;
  preview?: 'color' | 'shadow' | 'spacing' | 'typography';
}

export interface AnatomyPart {
  label: string;
  tokens: string[];
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  target?: {
    x: string;
    y: string;
  };
}

export interface ComponentTokenDocProps {
  componentName: string;
  description: string;
  anatomy?: {
    component: React.ReactNode;
    parts: AnatomyPart[];
  };
  tokenGroups: {
    title: string;
    description?: string;
    tokens: TokenMappingRow[];
  }[];
  usage?: {
    title: string;
    content: React.ReactNode;
  }[];
}

export const ComponentTokenContent: React.FC<Omit<ComponentTokenDocProps, 'componentName' | 'description'>> = ({
  anatomy,
  tokenGroups,
  usage,
}) => {
  const getPreviewStyle = (token: string, type?: string) => {
    if (!type) return {};
    
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(token)
      .trim();

    switch (type) {
      case 'color':
        return {
          backgroundColor: value,
          width: '40px',
          height: '24px',
          borderRadius: '4px',
          border: '1px solid var(--border-primary)',
        };
      case 'shadow':
        return {
          width: '40px',
          height: '24px',
          borderRadius: '4px',
          backgroundColor: 'var(--surface-elevated)',
          boxShadow: value,
        };
      case 'spacing':
        return {
          width: value,
          height: '24px',
          backgroundColor: 'var(--bg-accent-primary)',
          borderRadius: '2px',
        };
      case 'typography':
        return {
          font: value,
        };
      default:
        return {};
    }
  };

  return (
    <div className="px-6 py-8" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        {/* Anatomy Section */}
        {anatomy && (
          <section>
            <h2 style={{ 
              fontSize: '20px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: '24px'
            }}>
              Anatomia do Componente
            </h2>
            <div style={{
              backgroundColor: 'var(--surface-elevated)',
              border: '1px solid var(--border-primary)',
              borderRadius: '12px',
              padding: 'var(--spacing-16)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px',
              position: 'relative',
              // Technical grid background
              backgroundImage: 'radial-gradient(var(--border-secondary) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}>
              {/* SVG Connector Layer */}
              <svg 
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '100%', 
                  pointerEvents: 'none', 
                  zIndex: 1 
                }}
              >
                {anatomy.parts.map((part, index) => {
                  if (!part.target) return null;
                  
                  // Calculate start point (approximate center of the label anchor)
                  // We use the position values but adjust slightly to center on the badge
                  const getStart = () => {
                     const x = part.position.left ? part.position.left : `calc(100% - ${part.position.right})`;
                     const y = part.position.top ? part.position.top : `calc(100% - ${part.position.bottom})`;
                     return { x, y };
                  };
                  
                  const start = getStart();
                  
                  return (
                    <g key={index}>
                      {/* Line */}
                      <line 
                        x1={start.x} 
                        y1={start.y} 
                        x2={part.target.x} 
                        y2={part.target.y} 
                        stroke="var(--border-accent-primary)" 
                        strokeWidth="1" 
                        strokeDasharray="4 4"
                      />
                      {/* Target Dot */}
                      <circle 
                        cx={part.target.x} 
                        cy={part.target.y} 
                        r="3" 
                        fill="var(--bg-accent-primary)" 
                        stroke="var(--surface-elevated)"
                        strokeWidth="1"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Component Preview */}
              <div style={{ 
                position: 'relative', 
                zIndex: 2,
                // Removido scale(1.5) para manter fidelidade visual do tamanho md
                transformOrigin: 'center',
              }}>
                {anatomy.component}
              </div>

              {/* Anatomy Labels */}
              {anatomy.parts.map((part, index) => (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    ...part.position,
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    pointerEvents: 'none', // Evita bloquear interação se houver
                    transform: 'translate(-12px, -12px)', // Center the badge on the coordinate
                  }}
                >
                  {/* Number Badge (Anchor Point) */}
                  <div style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#161922', // neutral-800
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    zIndex: 11,
                    flexShrink: 0,
                  }}>
                    {index + 1}
                  </div>

                  {/* Token Labels */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}>
                    {part.tokens.map((token, idx) => (
                      <div
                        key={idx}
                        style={{
                          fontSize: '11px',
                          fontFamily: 'monospace',
                          fontWeight: 500,
                          color: '#FFFFFF',
                          backgroundColor: '#161922', // neutral-800
                          padding: '6px 10px',
                          borderRadius: '6px',
                          border: '1px solid rgba(255,255,255,0.1)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {token}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Token Mapping Tables */}
        {tokenGroups.map((group, groupIndex) => (
          <section key={groupIndex}>
            <h2 style={{ 
              fontSize: '20px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: '8px'
            }}>
              {group.title}
            </h2>
            {group.description && (
              <p style={{ 
                fontSize: '14px',
                color: 'var(--text-secondary)',
                marginBottom: '16px',
                lineHeight: 1.5
              }}>
                {group.description}
              </p>
            )}
            
            <div style={{
              backgroundColor: 'var(--surface-elevated)',
              border: '1px solid var(--border-primary)',
              borderRadius: '12px',
              overflow: 'hidden',
            }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
              }}>
                <thead>
                  <tr style={{ 
                    backgroundColor: 'var(--surface-secondary)',
                    borderBottom: '1px solid var(--border-primary)',
                  }}>
                    <th style={{ 
                      padding: '12px 16px', 
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      width: '35%',
                    }}>
                      Token
                    </th>
                    <th style={{ 
                      padding: '12px 16px', 
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      width: '25%',
                    }}>
                      Valor
                    </th>
                    <th style={{ 
                      padding: '12px 16px', 
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      width: '35%',
                    }}>
                      Uso
                    </th>
                    {group.tokens.some(t => t.preview) && (
                      <th style={{ 
                        padding: '12px 16px', 
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                        width: '80px',
                      }}>
                        Preview
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {group.tokens.map((row, rowIndex) => (
                    <tr 
                      key={rowIndex}
                      style={{ 
                        borderBottom: rowIndex < group.tokens.length - 1 
                          ? '1px solid var(--border-primary)' 
                          : 'none',
                      }}
                    >
                      <td style={{ 
                        padding: '12px 16px',
                      }}>
                        <code style={{
                          fontSize: '13px',
                          color: 'var(--text-accent-primary)',
                          backgroundColor: 'var(--bg-info-secondary)',
                          padding: '2px 6px',
                          borderRadius: '4px',
                        }}>
                          {row.token}
                        </code>
                      </td>
                      <td style={{ 
                        padding: '12px 16px',
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                      }}>
                        <code>
                          {row.value}
                        </code>
                      </td>
                      <td style={{ 
                        padding: '12px 16px',
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                      }}>
                        {row.usage}
                      </td>
                      {group.tokens.some(t => t.preview) && (
                        <td style={{ 
                          padding: '12px 16px',
                          textAlign: 'center',
                        }}>
                          {row.preview && (
                            <div style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                              <div style={getPreviewStyle(row.token, row.preview)} />
                            </div>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}

        {/* Usage Guidelines */}
        {usage && usage.length > 0 && (
          <section>
            <h2 style={{ 
              fontSize: '20px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: '24px'
            }}>
              Diretrizes de Uso
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {usage.map((guideline, index) => (
                <div 
                  key={index}
                  style={{
                    backgroundColor: 'var(--surface-elevated)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: '12px',
                    padding: '16px',
                  }}
                >
                  <h3 style={{ 
                    fontSize: '16px',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    marginBottom: '12px'
                  }}>
                    {guideline.title}
                  </h3>
                  <div style={{ 
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6
                  }}>
                    {guideline.content}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
    </div>
  );
};

export const ComponentTokenDoc: React.FC<ComponentTokenDocProps> = ({
  componentName,
  description,
  anatomy,
  tokenGroups,
  usage,
}) => {
  const { isDark } = useTheme();
  const theme = isDark ? 'dark' : 'light';

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Header - seguindo padrão ComponentDocTemplate */}
      <div
        className="px-6 py-6"
        style={{
          borderBottom: '1px solid var(--border-primary)',
          backgroundColor: 'var(--surface-elevated)',
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1
              className="text-[32px] mb-3"
              style={{
                fontWeight: 'bold',
                color: 'var(--text-primary)',
              }}
            >
              {componentName} Tokens
            </h1>
            <p
              className="text-[16px] leading-[1.6] max-w-4xl"
              style={{
                color: 'var(--text-secondary)',
              }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pt-8">
        <DocPreviewHeader />
      </div>

      <ThemeScopeProvider theme={theme}>
        <div className={isDark ? 'dark' : ''} data-theme={theme}>
          <ComponentTokenContent
            anatomy={anatomy}
            tokenGroups={tokenGroups}
            usage={usage}
          />
        </div>
      </ThemeScopeProvider>
    </div>
  );
};
