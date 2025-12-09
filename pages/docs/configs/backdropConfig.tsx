import React, { useState, useEffect } from 'react';
import { Backdrop } from '../../../exa-design-system/components/Backdrop';
import { Button } from '../../../exa-design-system/components/Button';
import { ComponentDocConfig } from '../../../components/documentation/ComponentDocTemplate';

export const backdropConfig: ComponentDocConfig = {
  name: 'Backdrop',
  description: 'Camada de sobreposição que cobre a interface subjacente, normalmente usada com modais, gavetas ou caixas de diálogo. Apresenta o efeito de glassmorphism EXA por padrão, reforçando a identidade moderna e protetora da marca.',
  
  initialState: {
    open: false,
    variant: 'glass',
    blockScroll: true,
    hasChildren: true
  },

  properties: [
    {
      name: 'open',
      description: 'Controla a visibilidade do backdrop',
      type: 'boolean',
      defaultValue: 'false',
      controlType: 'toggle'
    },
    {
      name: 'variant',
      description: 'Estilo visual do backdrop',
      type: 'glass | solid',
      defaultValue: 'glass',
      controlType: 'select',
      options: [
        { label: 'glass', value: 'glass' },
        { label: 'solid', value: 'solid' }
      ]
    },
    {
      name: 'blockScroll',
      description: 'Impede a rolagem do corpo da página quando o backdrop está aberto',
      type: 'boolean',
      defaultValue: 'true',
      controlType: 'toggle'
    },
    {
      name: 'onClick',
      description: 'Função chamada ao clicar no backdrop para dispensá-lo',
      type: '(event: React.MouseEvent) => void',
      controlType: 'none'
    },
    {
      name: 'zIndex',
      description: 'Índice Z do backdrop',
      type: 'number',
      defaultValue: '1000',
      controlType: 'none'
    },
    {
      name: 'children',
      description: 'Conteúdo para renderizar dentro do backdrop (ex: Modal)',
      type: 'ReactNode',
      controlType: 'toggle',
      getValue: (state) => state.hasChildren,
      setValue: (state, value) => { state.hasChildren = value; }
    }
  ],

  generateCode: (state) => {
    const props: string[] = [];
    
    if (!state.open) {
      props.push('open={false}');
    } else {
      props.push('open={true}');
    }
    if (state.variant !== 'glass') {
      props.push(`variant="${state.variant}"`);
    }
    if (!state.blockScroll) {
      props.push('blockScroll={false}');
    }
    props.push('onClick={handleClose}');
    
    const propsString = props.length > 0 ? '\n  ' + props.join('\n  ') + '\n' : '';
    
    if (state.hasChildren) {
      return `<Backdrop${propsString}>\n  <div className="modal-content">\n    {/* Your modal content */}\n  </div>\n</Backdrop>`;
    }
    
    return `<Backdrop${propsString} />`;
  },

  renderPreview: (state) => <BackdropPreview state={state} />,

  designGuidelines: {
    dos: [
      '• Use a variante <code class="text-xs bg-[var(--surface-secondary)] border border-[var(--border-primary)] px-1 py-0.5 rounded">glass</code> para uma sensação moderna e protetora',
      '• Sempre forneça um manipulador onClick para dispensar',
      '• Use com modais, gavetas e caixas de diálogo',
      '• Mantenha o blockScroll ativado por padrão'
    ],
    donts: [
      '• Não use sem funcionalidade de dispensar',
      '• Evite empilhar vários backdrops',
      '• Não se esqueça de tratar a tecla Escape',
      '• Não use para sobreposições permanentes'
    ]
  }
};

function BackdropPreview({ state }: { state: any }) {
  const [show, setShow] = useState(state.open);

  useEffect(() => {
    setShow(state.open);
  }, [state.open]);

  return (
    <div className="relative w-full h-[200px] border border-[var(--border-primary)] rounded overflow-hidden bg-[var(--surface-secondary)]">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <p className="text-[14px] text-[var(--text-secondary)]">
          Conteúdo da Página
        </p>
        <Button variant="primary" onClick={() => setShow(true)}>
          Abrir Modal
        </Button>
      </div>
      <Backdrop
        open={show}
        variant={state.variant}
        blockScroll={false}
        onClick={() => setShow(false)}
        style={{ position: 'absolute', zIndex: 10 }}
      >
        {state.hasChildren && (
          <div className="flex items-center justify-center h-full p-4">
            <div 
              className="bg-[var(--surface-elevated)] border border-[var(--border-primary)] p-6 rounded-lg shadow-lg max-w-sm w-full" 
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-[14px] font-medium mb-4 text-[var(--text-primary)]">Modal Content</p>
              <div className="flex justify-end">
                <Button size="sm" variant="primary" onClick={() => setShow(false)}>
                  Fechar
                </Button>
              </div>
            </div>
          </div>
        )}
      </Backdrop>
    </div>
  );
}
