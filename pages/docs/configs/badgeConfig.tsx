import React from 'react';
import { Shield } from 'lucide-react';
import { Badge } from '../../../exa-design-system/components/Badge';
import { ComponentDocConfig } from '../../../components/documentation/ComponentDocTemplate';

export const badgeConfig: ComponentDocConfig = {
  name: 'Badge',
  description: 'Um elemento visual compacto e não intrusivo usado para rotular, categorizar ou indicar o status de um item. Projetado para "Clareza" e "Segurança" - pilares centrais da EXA.',
  
  initialState: {
    children: 'Protected',
    variant: 'subtle',
    status: 'success',
    showLeftIcon: false,
    interactive: false
  },

  properties: [
    {
      name: 'children',
      description: 'Conteúdo para exibir dentro do badge (palavras únicas para melhores práticas)',
      type: 'ReactNode',
      controlType: 'input'
    },
    {
      name: 'variant',
      description: 'Variante de hierarquia visual',
      type: 'subtle | solid | outline',
      defaultValue: 'subtle',
      controlType: 'select',
      options: [
        { label: 'subtle', value: 'subtle' },
        { label: 'solid', value: 'solid' },
        { label: 'outline', value: 'outline' }
      ]
    },
    {
      name: 'status',
      description: 'Cor de status semântico',
      type: 'brand | success | warning | error | neutral',
      defaultValue: 'brand',
      controlType: 'select',
      options: [
        { label: 'brand', value: 'brand' },
        { label: 'success', value: 'success' },
        { label: 'warning', value: 'warning' },
        { label: 'error', value: 'error' },
        { label: 'neutral', value: 'neutral' }
      ]
    },
    {
      name: 'leftIcon',
      description: 'Ícone opcional para exibir à esquerda (reforça o significado para usuários daltônicos)',
      type: 'ReactNode',
      controlType: 'toggle',
      getValue: (state) => state.showLeftIcon,
      setValue: (state, value) => { state.showLeftIcon = value; }
    },
    {
      name: 'interactive',
      description: 'Se o badge é interativo (clicável)',
      type: 'boolean',
      defaultValue: 'false',
      controlType: 'toggle'
    },
    {
      name: 'onClick',
      description: 'Manipulador de clique (torna o badge interativo)',
      type: '(event: React.MouseEvent) => void',
      controlType: 'none'
    }
  ],

  generateCode: (state) => {
    const props: string[] = [];
    
    if (state.variant !== 'subtle') {
      props.push(`variant="${state.variant}"`);
    }
    if (state.status !== 'brand') {
      props.push(`status="${state.status}"`);
    }
    if (state.showLeftIcon) {
      props.push('leftIcon={<Shield size={12} />}');
    }
    if (state.interactive) {
      props.push('interactive');
    }
    
    const propsString = props.length > 0 ? '\n  ' + props.join('\n  ') + '\n' : '';
    
    return `<Badge${propsString}>\n  ${state.children}\n</Badge>`;
  },

  renderPreview: (state) => {
    return (
      <Badge
        variant={state.variant}
        status={state.status}
        leftIcon={state.showLeftIcon ? <Shield size={12} /> : undefined}
        interactive={state.interactive}
        onClick={state.interactive ? () => alert('Badge clicked') : undefined}
      >
        {state.children}
      </Badge>
    );
  },

  designGuidelines: {
    dos: [
      '• Use palavras únicas (ex: "Ativo", "Protegido")',
      '• Use a variante <code class="text-xs bg-white px-1 py-0.5 rounded">subtle</code> para 90% dos casos',
      '• Adicione ícones para acessibilidade (daltonismo)',
      '• Use cores de status semânticas corretamente'
    ],
    donts: [
      '• Evite frases longas ou sentenças',
      '• Não abuse da variante <code class="text-xs bg-white px-1 py-0.5 rounded">solid</code>',
      '• Não use status de marca para erros/avisos',
      '• Evite tornar todos os badges interativos'
    ]
  }
};
