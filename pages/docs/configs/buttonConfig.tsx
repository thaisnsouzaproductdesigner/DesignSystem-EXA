import React from 'react';
import { Play, ChevronDown } from 'lucide-react';
import { Button } from '../../../exa-design-system/components/Button';
import { ComponentDocConfig } from '../../../components/documentation/ComponentDocTemplate';

export const buttonConfig: ComponentDocConfig = {
  name: 'Button',
  description: 'Componente de botão com múltiplas variantes, tamanhos e estados. Usa tokens semânticos do EXA Design System. Segue o princípio "Direto: não enrola, resolve" com rótulos claros orientados à ação.',
  
  initialState: {
    children: 'Click me',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
    showLeftIcon: false,
    showRightIcon: false
  },

  properties: [
    {
      name: 'children',
      description: 'Texto do botão',
      type: 'ReactNode',
      controlType: 'input'
    },
    {
      name: 'variant',
      description: 'Variante de hierarquia visual',
      type: 'primary | secondary | tertiary | danger',
      defaultValue: 'primary',
      controlType: 'select',
      options: [
        { label: 'primary', value: 'primary' },
        { label: 'secondary', value: 'secondary' },
        { label: 'tertiary', value: 'tertiary' },
        { label: 'danger', value: 'danger' }
      ]
    },
    {
      name: 'size',
      description: 'Tamanho do botão',
      type: 'sm | md | lg',
      defaultValue: 'md',
      controlType: 'select',
      options: [
        { label: 'small', value: 'sm' },
        { label: 'medium', value: 'md' },
        { label: 'large', value: 'lg' }
      ]
    },
    {
      name: 'disabled',
      description: 'Desabilita a interação do botão',
      type: 'boolean',
      defaultValue: 'false',
      controlType: 'toggle'
    },
    {
      name: 'loading',
      description: 'Mostra spinner de carregamento, define aria-busy',
      type: 'boolean',
      defaultValue: 'false',
      controlType: 'toggle'
    },
    {
      name: 'fullWidth',
      description: 'Define largura total',
      type: 'boolean',
      defaultValue: 'false',
      controlType: 'toggle'
    },
    {
      name: 'leftIcon',
      description: 'Exibe ícone no lado esquerdo',
      type: 'ReactNode',
      controlType: 'toggle',
      getValue: (state) => state.showLeftIcon,
      setValue: (state, value) => { state.showLeftIcon = value; }
    },
    {
      name: 'rightIcon',
      description: 'Exibe ícone no lado direito',
      type: 'ReactNode',
      controlType: 'toggle',
      getValue: (state) => state.showRightIcon,
      setValue: (state, value) => { state.showRightIcon = value; }
    },
    {
      name: 'onClick',
      description: 'Manipulador de evento de clique',
      type: '(event: React.MouseEvent) => void',
      controlType: 'none'
    }
  ],

  generateCode: (state) => {
    const iconName = {
      primary: 'Play',
      secondary: 'ChevronDown',
      tertiary: 'Play',
      danger: 'Play'
    }[state.variant] || 'Play';
    
    const props: string[] = [];
    
    if (state.variant !== 'primary') {
      props.push(`variant="${state.variant}"`);
    }
    if (state.size !== 'md') {
      props.push(`size="${state.size}"`);
    }
    if (state.disabled) {
      props.push('disabled');
    }
    if (state.loading) {
      props.push('loading');
    }
    if (state.fullWidth) {
      props.push('fullWidth');
    }
    if (state.showLeftIcon) {
      props.push(`leftIcon={<${iconName} size={16} />}`);
    }
    if (state.showRightIcon) {
      props.push(`rightIcon={<${iconName} size={16} />}`);
    }
    
    const propsString = props.length > 0 ? '\n  ' + props.join('\n  ') + '\n' : '';
    
    return `<Button${propsString}>\n  ${state.children}\n</Button>`;
  },

  renderPreview: (state) => {
    const getIcon = () => {
      switch (state.variant) {
        case 'primary': return <Play size={16} />;
        case 'secondary': return <ChevronDown size={16} />;
        default: return <Play size={16} />;
      }
    };

    return (
      <Button
        variant={state.variant}
        size={state.size}
        disabled={state.disabled}
        loading={state.loading}
        fullWidth={state.fullWidth}
        leftIcon={state.showLeftIcon ? getIcon() : undefined}
        rightIcon={state.showRightIcon ? getIcon() : undefined}
      >
        {state.children}
      </Button>
    );
  },

  designGuidelines: {
    dos: [
      '• Use o padrão <code class="text-xs bg-white px-1 py-0.5 rounded">{Verbo} + {Substantivo}</code>',
      '• Exemplos: "Ativar Proteção", "Proteger Celular"',
      '• Seja direto e orientado à ação',
      '• Use primary para ações principais'
    ],
    donts: [
      '• Evite termos vagos como "Clique aqui"',
      '• Não use "Enviar", "Mandar", "Ok"',
      '• Evite rótulos passivos ou genéricos',
      '• Não abuse da variante primary'
    ]
  }
};
