import React from 'react';
import { Filter } from 'lucide-react';
import { Chip } from '../../../exa-design-system/components/Chip';
import { ComponentDocConfig } from '../../../components/documentation/ComponentDocTemplate';

export const chipConfig: ComponentDocConfig = {
  name: 'Chip',
  description: 'Elemento interativo compacto usado para filtros, seleções ou tags. Suporta tamanhos pequeno e grande com ícones opcionais para contexto aprimorado.',
  
  initialState: {
    label: 'Filter',
    size: 'small',
    filterIcon: true,
    dropdown: false,
    active: false,
    disabled: false
  },

  properties: [
    {
      name: 'label',
      description: 'Conteúdo de texto do chip',
      type: 'string',
      controlType: 'input'
    },
    {
      name: 'size',
      description: 'Tamanho do chip',
      type: 'small | large',
      defaultValue: 'small',
      controlType: 'select',
      options: [
        { label: 'small', value: 'small' },
        { label: 'large', value: 'large' }
      ]
    },
    {
      name: 'filterIcon',
      description: 'Mostra ícone de filtro à esquerda',
      type: 'boolean',
      defaultValue: 'false',
      controlType: 'toggle'
    },
    {
      name: 'dropdown',
      description: 'Mostra ícone de chevron à direita',
      type: 'boolean',
      defaultValue: 'false',
      controlType: 'toggle'
    },
    {
      name: 'active',
      description: 'Estado ativo/selecionado',
      type: 'boolean',
      defaultValue: 'false',
      controlType: 'toggle'
    },
    {
      name: 'disabled',
      description: 'Desabilita a interação do chip',
      type: 'boolean',
      defaultValue: 'false',
      controlType: 'toggle'
    },
    {
      name: 'iconLeft',
      description: 'Ícone esquerdo personalizado (substitui filterIcon)',
      type: 'ReactNode',
      controlType: 'none'
    },
    {
      name: 'iconRight',
      description: 'Ícone direito personalizado (substitui dropdown)',
      type: 'ReactNode',
      controlType: 'none'
    },
    {
      name: 'onClick',
      description: 'Manipulador de evento de clique',
      type: '(event: React.MouseEvent) => void',
      controlType: 'none'
    }
  ],

  generateCode: (state) => {
    const props: string[] = [];
    
    props.push(`label="${state.label}"`);
    
    if (state.size !== 'small') {
      props.push(`size="${state.size}"`);
    }
    if (state.filterIcon) {
      props.push('filterIcon');
    }
    if (state.dropdown) {
      props.push('dropdown');
    }
    if (state.active) {
      props.push('active');
    }
    if (state.disabled) {
      props.push('disabled');
    }
    props.push('onClick={handleClick}');
    
    const propsString = props.length > 0 ? '\n  ' + props.join('\n  ') + '\n' : '';
    
    return `<Chip${propsString} />`;
  },

  renderPreview: (state) => {
    return (
      <Chip
        label={state.label}
        size={state.size}
        filterIcon={state.filterIcon}
        dropdown={state.dropdown}
        active={state.active}
        disabled={state.disabled}
        onClick={() => {}}
      />
    );
  },

  designGuidelines: {
    dos: [
      '• Use para filtros e opções selecionáveis',
      '• Mantenha rótulos curtos (1-2 palavras)',
      '• Use <code class="text-xs bg-white px-1 py-0.5 rounded">filterIcon</code> para chips de filtro',
      '• Use <code class="text-xs bg-white px-1 py-0.5 rounded">dropdown</code> para opções expansíveis'
    ],
    donts: [
      '• Não use para ações principais (use botões)',
      '• Evite rótulos de texto longos',
      '• Não misture ícones de filtro e dropdown',
      '• Evite usar muitos chips em uma linha'
    ]
  }
};
