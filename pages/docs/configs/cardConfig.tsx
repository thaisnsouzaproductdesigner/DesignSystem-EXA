import React from 'react';
import { Card } from '../../../exa-design-system/components/Card';
import { ComponentDocConfig } from '../../../components/documentation/ComponentDocTemplate';

export const cardConfig: ComponentDocConfig = {
  name: 'Card',
  description: 'Componente de contêiner que agrupa conteúdo relacionado. Suporta variantes surface (sólida) e glass (translúcida), com seleção interativa opcional e acentos de cor do produto.',
  
  initialState: {
    variant: 'surface',
    padding: 'md',
    selectable: false,
    selected: false,
    productColor: 'none'
  },

  properties: [
    {
      name: 'variant',
      description: 'Estilo visual do card',
      type: 'surface | glass',
      defaultValue: 'surface',
      controlType: 'select',
      options: [
        { label: 'surface', value: 'surface' },
        { label: 'glass', value: 'glass' }
      ]
    },
    {
      name: 'padding',
      description: 'Tamanho do espaçamento interno',
      type: 'sm | md | lg',
      defaultValue: 'md',
      controlType: 'select',
      options: [
        { label: 'sm (16px)', value: 'sm' },
        { label: 'md (24px)', value: 'md' },
        { label: 'lg (32px)', value: 'lg' }
      ]
    },
    {
      name: 'selectable',
      description: 'Torna o card interativo e selecionável',
      type: 'boolean',
      defaultValue: 'false',
      controlType: 'toggle'
    },
    {
      name: 'selected',
      description: 'Estado selecionado (quando selecionável é verdadeiro)',
      type: 'boolean',
      defaultValue: 'false',
      controlType: 'toggle'
    },
    {
      name: 'productColor',
      description: 'Cor do produto para o acento da borda esquerda',
      type: 'blue | cyan | green | purple',
      controlType: 'select',
      options: [
        { label: 'none', value: 'none' },
        { label: 'blue', value: 'blue' },
        { label: 'cyan', value: 'cyan' },
        { label: 'green', value: 'green' },
        { label: 'purple', value: 'purple' }
      ]
    },
    {
      name: 'onSelect',
      description: 'Callback quando o card é selecionado',
      type: '(event: React.MouseEvent) => void',
      controlType: 'none'
    }
  ],

  generateCode: (state) => {
    const props: string[] = [];
    
    if (state.variant !== 'surface') {
      props.push(`variant="${state.variant}"`);
    }
    if (state.padding !== 'md') {
      props.push(`padding="${state.padding}"`);
    }
    if (state.selectable) {
      props.push('selectable');
    }
    if (state.selected) {
      props.push('selected');
    }
    if (state.productColor !== 'none') {
      props.push(`productColor="${state.productColor}"`);
    }
    if (state.selectable) {
      props.push('onSelect={handleSelect}');
    }
    
    const propsString = props.length > 0 ? '\n  ' + props.join('\n  ') + '\n' : '';
    
    return `<Card${propsString}>\n  <h3>Card Title</h3>\n  <p>Card content goes here</p>\n</Card>`;
  },

  renderPreview: (state) => {
    return (
      <Card
        variant={state.variant}
        padding={state.padding}
        selectable={state.selectable}
        selected={state.selected}
        productColor={state.productColor !== 'none' ? state.productColor : undefined}
        onSelect={() => {}}
      >
        <h3 className="text-[16px] mb-2" style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
          Card Title
        </h3>
        <p className="text-[14px]" style={{ color: 'var(--text-secondary)' }}>
          This is an example card content. Cards group related information together.
        </p>
      </Card>
    );
  },

  designGuidelines: {
    dos: [
      '• Use <code class="text-xs bg-white px-1 py-0.5 rounded">surface</code> para contêineres de conteúdo padrão',
      '• Use <code class="text-xs bg-white px-1 py-0.5 rounded">glass</code> para sobreposições ou elementos flutuantes',
      '• Use cores de produto para identificar diferentes produtos',
      '• Use selectable para cenários de escolha'
    ],
    donts: [
      '• Não aninhe cards muito profundamente',
      '• Evite misturar várias cores de produtos',
      '• Não torne todo card selecionável',
      '• Evite espaçamento excessivo em telas pequenas'
    ]
  }
};
