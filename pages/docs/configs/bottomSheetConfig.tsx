import React, { useState, useEffect } from 'react';
import { BottomSheet } from '../../../exa-design-system/components/BottomSheet';
import { Button } from '../../../exa-design-system/components/Button';
import { ComponentDocConfig } from '../../../components/documentation/ComponentDocTemplate';
import { Share, Settings, Trash2, FileText, Shield } from 'lucide-react';

// Wrapper component to handle local state for interactivity within the preview
const BottomSheetPreviewWrapper = ({ state }: { state: any }) => {
  const [internalOpen, setInternalOpen] = useState(state.isOpen);

  // Sync with external control state, but allow local override
  useEffect(() => {
    setInternalOpen(state.isOpen);
  }, [state.isOpen]);

  const handleOpen = () => {
    setInternalOpen(true);
  };

  const handleClose = () => {
    setInternalOpen(false);
  };

  return (
    <div 
      style={{
        width: '393px',
        height: '852px',
        backgroundColor: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '40px',
        border: '8px solid var(--text-disabled)', // Device frame
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Device Header (Notch area simulation) */}
      <div className="h-6 w-full bg-[var(--surface-primary)] z-20 flex justify-center items-center border-b border-[var(--border-primary)]">
        <div className="w-20 h-4 bg-black rounded-b-xl" />
      </div>

      {/* App Mock Content */}
      <div className="flex-1 bg-[var(--bg-secondary)] p-4 space-y-4 overflow-y-auto">
        <div className="h-32 bg-[var(--bg-quaternary)] rounded-xl animate-pulse" />
        <div className="h-12 bg-[var(--bg-tertiary)] rounded-lg shadow-sm" />
        <div className="h-12 bg-[var(--bg-tertiary)] rounded-lg shadow-sm" />
        <div className="space-y-2">
            <div className="h-4 w-3/4 bg-[var(--bg-quaternary)] rounded" />
            <div className="h-4 w-1/2 bg-[var(--bg-quaternary)] rounded" />
        </div>
        
        <div className="flex justify-center pt-8">
            <Button onClick={handleOpen}>
              Abrir Bottom Sheet
            </Button>
        </div>
      </div>

      {/* Bottom Sheet rendered INLINE (portal={false}) */}
      <BottomSheet
        isOpen={internalOpen}
        onClose={handleClose}
        title={state.title}
        subtitle={state.subtitle}
        variant={state.variant}
        showCloseButton={state.showCloseButton}
        portal={false} // Renders absolute inside this container
        footer={state.hasFooter ? (
            <>
            <Button className="flex-1">Salvar</Button>
            <Button className="flex-1" variant="secondary">Cancelar</Button>
            </>
        ) : undefined}
      >
        {state.variant === 'action' ? (
          <div className="flex flex-col">
            <button className="flex items-center gap-3 p-4 hover:bg-[var(--bg-secondary-hover)] transition-colors text-left border-b border-[var(--border-primary)]">
              <Share size={20} className="text-[var(--text-secondary)]" />
              <span className="font-medium text-[var(--text-primary)]">Compartilhar</span>
            </button>
            <button className="flex items-center gap-3 p-4 hover:bg-[var(--bg-secondary-hover)] transition-colors text-left border-b border-[var(--border-primary)]">
              <FileText size={20} className="text-[var(--text-secondary)]" />
              <span className="font-medium text-[var(--text-primary)]">Ver Detalhes</span>
            </button>
            <button className="flex items-center gap-3 p-4 hover:bg-[var(--bg-error-secondary)] transition-colors text-left">
              <Trash2 size={20} className="text-[var(--text-error-primary)]" />
              <span className="font-medium text-[var(--text-error-primary)]">Excluir</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            
            {state.hasLongContent && (
              <div className="space-y-4 text-[var(--text-secondary)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <React.Fragment key={i}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </React.Fragment>
                ))}
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
              </div>
            )}

            {!state.hasLongContent && (
              <p className="text-[var(--text-tertiary)] text-center py-[96px] px-[0px]">
                Conteúdo do Sheet aqui.
              </p>
            )}
          </div>
        )}
      </BottomSheet>
    </div>
  );
};

export const bottomSheetConfig: ComponentDocConfig = {
  name: 'Bottom Sheet',
  description: 'Uma superfície deslizante ancorada na parte inferior da tela. Componente primário para diálogos, menus e formulários em dispositivos móveis. Substitui modais centrais para garantir ergonomia (zona do polegar).',
  
  initialState: {
    isOpen: false, // Default closed to encourage interaction
    title: 'Configurações',
    subtitle: 'Gerencie suas preferências',
    variant: 'standard',
    showCloseButton: true,
    hasFooter: true,
    hasLongContent: false
  },

  properties: [
    {
      name: 'isOpen',
      description: 'Controla a visibilidade do componente',
      type: 'boolean',
      defaultValue: 'false',
      controlType: 'toggle'
    },
    {
      name: 'variant',
      description: 'Estilo visual e comportamental do sheet',
      type: "'standard' | 'action'",
      defaultValue: 'standard',
      controlType: 'select',
      options: [
        { label: 'standard', value: 'standard' },
        { label: 'action', value: 'action' }
      ]
    },
    {
      name: 'title',
      description: 'Título fixo no cabeçalho',
      type: 'string',
      defaultValue: 'Configurações',
      controlType: 'input'
    },
    {
      name: 'subtitle',
      description: 'Subtítulo ou texto de apoio no cabeçalho',
      type: 'string',
      controlType: 'input'
    },
    {
      name: 'showCloseButton',
      description: 'Exibe o botão de fechar no cabeçalho',
      type: 'boolean',
      defaultValue: 'true',
      controlType: 'toggle'
    },
    {
      name: 'footer',
      description: 'Conteúdo fixo no rodapé (ex: botões)',
      type: 'ReactNode',
      controlType: 'toggle',
      getValue: (state) => state.hasFooter,
      setValue: (state, value) => { state.hasFooter = value; }
    },
    {
      name: 'children',
      description: 'Conteúdo principal (scrollable)',
      type: 'ReactNode',
      controlType: 'toggle',
      getValue: (state) => state.hasLongContent,
      setValue: (state, value) => { state.hasLongContent = value; },
      options: [{ label: 'Conteúdo Longo (Scroll)', value: 'true' }]
    }
  ],

  generateCode: (state) => {
    const props: string[] = [];
    
    if (state.isOpen) props.push('isOpen={isOpen}');
    props.push('onClose={() => setIsOpen(false)}');
    
    if (state.title) props.push(`title="${state.title}"`);
    if (state.subtitle) props.push(`subtitle="${state.subtitle}"`);
    if (state.variant !== 'standard') props.push(`variant="${state.variant}"`);
    if (!state.showCloseButton) props.push('showCloseButton={false}');
    
    if (state.hasFooter) {
      props.push(`footer={
    <>
      <Button className="flex-1">Salvar</Button>
      <Button className="flex-1" variant="secondary">Cancelar</Button>
    </>
  }`);
    }

    const propsString = props.length > 0 ? '\n  ' + props.join('\n  ') : '';
    
    return `<BottomSheet${propsString}
>
  {/* Conteúdo do Sheet */}
  <div className="p-4">
    ...
  </div>
</BottomSheet>`;
  },

  renderPreview: (state) => {
    return <BottomSheetPreviewWrapper state={state} />;
  },

  designGuidelines: {
    dos: [
      '• Use para fluxos secundários que não exigem sair da tela atual',
      '• Mantenha o título curto e claro',
      '• Use a variante Action Sheet para menus de opções',
      '• Garanta que a área de "drag" (topo) esteja sempre acessível'
    ],
    donts: [
      '• Não use para avisos críticos de sistema (use Alert ou Modal)',
      '• Evite aninhar múltiplos Bottom Sheets',
      '• Não esconda o botão de fechar se não houver outra forma óbvia de sair',
      '• Evite usar em desktop se um Modal ou Popover for mais apropriado'
    ]
  }
};
