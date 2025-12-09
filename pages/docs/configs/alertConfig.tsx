import React from 'react';
import { Alert, AlertProps } from '../../../exa-design-system/components/Alert';
import { Button } from '../../../exa-design-system/components/Button';
import { ComponentDocConfig } from '../../../components/documentation/ComponentDocTemplate';
import { CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

export const alertConfig: ComponentDocConfig = {
  name: 'Alert',
  description: 'Componente de feedback inline. Persistente e contextual.',
  
  initialState: {
    variant: 'info',
    title: 'Título do Alerta',
    children: 'Esta é a descrição detalhada do alerta.',
    actionLabel: 'Ação',
    showAction: 'none',
    showClose: true,
    isElevated: false,
    className: ''
  },

  properties: [
    {
      name: 'variant',
      description: 'Estilo semântico do alerta',
      type: 'success | error | warning | info',
      defaultValue: 'info',
      controlType: 'select',
      options: ['success', 'error', 'warning', 'info']
    },
    {
      name: 'title',
      description: 'Título principal (negrito)',
      type: 'string',
      defaultValue: '',
      controlType: 'input',
    },
    {
      name: 'children',
      description: 'Conteúdo / Descrição do alerta',
      type: 'ReactNode',
      defaultValue: '',
      controlType: 'input',
    },
    {
      name: 'showAction',
      description: 'Tipo de ação a ser exibida',
      type: 'single | multiple | link | boolean',
      defaultValue: 'none',
      controlType: 'select',
      options: ['none', 'single', 'multiple', 'link']
    },
    {
      name: 'actionLabel',
      description: 'Texto da ação',
      type: 'string',
      defaultValue: '',
      controlType: 'input',
    },
    {
      name: 'showClose',
      description: 'Habilitar botão de fechar (onClose)',
      type: 'boolean',
      defaultValue: 'true',
      controlType: 'toggle',
    },
    {
      name: 'isElevated',
      description: 'Adiciona sombra suave ao alerta',
      type: 'boolean',
      defaultValue: 'false',
      controlType: 'toggle',
    }
  ],

  generateCode: (state) => {
    const props = [];
    props.push(`variant="${state.variant}"`);
    if (state.title) props.push(`title="${state.title}"`);
    
    if (state.showAction && state.showAction !== 'none') {
      if (state.showAction === true) {
        props.push('showAction');
      } else {
        props.push(`showAction="${state.showAction}"`);
      }

      if (state.actionLabel) {
        props.push(`actionLabel="${state.actionLabel}"`);
      }
      
      props.push(`onAction={() => console.log('action')}`);
    }

    if (state.showClose) props.push(`onClose={() => console.log('close')}`);
    if (state.isElevated) props.push(`isElevated`);
    
    let childrenPart = '';
    if (state.children) {
      childrenPart = `\n  ${state.children}\n`;
    }

    const propsString = props.join(' ');
    
    return `<Alert ${propsString}>${childrenPart}</Alert>`;
  },

  renderPreview: (state) => {
    return (
      <Alert
        variant={state.variant as any}
        title={state.title}
        onClose={state.showClose ? () => console.log('Close clicked') : undefined}
        isElevated={state.isElevated}
        showAction={state.showAction}
        actionLabel={state.actionLabel}
        onAction={state.showAction ? () => console.log('Action clicked') : undefined}
        className={state.className}
      >
        {state.children}
      </Alert>
    );
  },

  designGuidelines: {
    dos: [
      'Use para feedback persistente (ex: erro de formulário, aviso de sistema).',
      'Posicione próximo ao contexto relevante.',
      'Use verbos de ação claros se houver botões.'
    ],
    donts: [
      'Não use para feedback transiente ("Copiado com sucesso") - use Toast.',
      'Não oculte informações críticas dentro de alertas dispensáveis se o usuário precisa vê-las.'
    ]
  }
};
