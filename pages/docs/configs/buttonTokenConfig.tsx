import React from 'react';
import { Button } from '../../../exa-design-system/components/Button/Button';
import { Plus, ChevronDown } from 'lucide-react';

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

export interface ComponentTokenData {
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

export const buttonTokenConfig: ComponentTokenData = {
  anatomy: {
    component: (
      <div style={{ padding: '40px' }}>
        <Button 
          variant="primary" 
          size="md" 
          leftIcon={<Plus size={16} />} 
          rightIcon={<ChevronDown size={16} />}
        >
          Button
        </Button>
      </div>
    ),
    parts: [
      {
        label: 'Radius',
        tokens: ['--button-radius'],
        position: { top: '10%', left: '5%' },
        target: { x: '40%', y: '45%' }, // Canto superior esquerdo
      },
      {
        label: 'Icon',
        tokens: ['--button-icon-size-md', '--button-icon-primary-default'],
        position: { top: '10%', left: '35%' },
        target: { x: '45%', y: '50%' }, // Ícone esquerdo
      },
      {
        label: 'Typography',
        tokens: ['--button-font-md', '--button-text-primary-default'],
        position: { top: '10%', right: '5%' },
        target: { x: '50%', y: '50%' }, // Centro (Texto)
      },
      {
        label: 'Background',
        tokens: ['--button-bg-primary-default'],
        position: { top: '85%', left: '5%' },
        target: { x: '42%', y: '55%' }, // Borda inferior esquerda
      },
      {
        label: 'Spacing',
        tokens: ['--button-padding-md', '--button-gap'],
        position: { top: '85%', right: '5%' },
        target: { x: '58%', y: '55%' }, // Borda inferior direita (gap/padding)
      },
    ],
  },

  tokenGroups: [
    {
      title: 'Primary Variant',
      description: 'Tokens para o botão primário - usado para ações principais e de maior destaque.',
      tokens: [
        {
          token: '--button-bg-primary-default',
          value: 'var(--bg-accent-primary)',
          usage: 'Fundo do botão primário no estado padrão',
          preview: 'color',
        },
        {
          token: '--button-bg-primary-hover',
          value: 'var(--bg-accent-primary-hover)',
          usage: 'Fundo do botão primário ao passar o mouse',
          preview: 'color',
        },
        {
          token: '--button-bg-primary-active',
          value: 'var(--bg-accent-primary-hover)',
          usage: 'Fundo do botão primário ao clicar',
          preview: 'color',
        },
        {
          token: '--button-bg-primary-disabled',
          value: 'var(--bg-disabled)',
          usage: 'Fundo do botão primário quando desabilitado',
          preview: 'color',
        },
        {
          token: '--button-text-primary-default',
          value: 'var(--text-on-brand)',
          usage: 'Cor do texto no botão primário',
          preview: 'color',
        },
        {
          token: '--button-icon-primary-default',
          value: 'var(--text-on-brand)',
          usage: 'Cor do ícone no botão primário',
          preview: 'color',
        },
        {
          token: '--button-icon-primary-default',
          value: 'var(--text-on-brand)',
          usage: 'Cor do ícone no botão primário',
          preview: 'color',
        },
        {
          token: '--button-shadow-primary-default',
          value: 'var(--effect-drop-shadow-3xs)',
          usage: 'Sombra do botão primário no estado padrão',
          preview: 'shadow',
        },
        {
          token: '--button-shadow-primary-hover',
          value: 'var(--effect-drop-shadow-sm)',
          usage: 'Sombra do botão primário ao passar o mouse',
          preview: 'shadow',
        },
        {
          token: '--button-shadow-primary-focus',
          value: '0 0 0 4px var(--border-accent-secondary)',
          usage: 'Anel de foco do botão primário',
          preview: 'shadow',
        },
      ],
    },
    {
      title: 'Secondary Variant',
      description: 'Tokens para o botão secundário - usado para ações de menor destaque que complementam a ação primária.',
      tokens: [
        {
          token: '--button-bg-secondary-default',
          value: 'var(--bg-secondary)',
          usage: 'Fundo do botão secundário no estado padrão',
          preview: 'color',
        },
        {
          token: '--button-bg-secondary-hover',
          value: 'var(--bg-secondary-hover)',
          usage: 'Fundo do botão secundário ao passar o mouse',
          preview: 'color',
        },
        {
          token: '--button-bg-secondary-active',
          value: 'var(--bg-tertiary)',
          usage: 'Fundo do botão secundário ao clicar',
          preview: 'color',
        },
        {
          token: '--button-text-secondary-default',
          value: 'var(--text-secondary)',
          usage: 'Cor do texto no botão secundário (estado padrão)',
          preview: 'color',
        },
        {
          token: '--button-icon-secondary-default',
          value: 'var(--text-secondary)',
          usage: 'Cor do ícone no botão secundário (estado padrão)',
          preview: 'color',
        },
        {
          token: '--button-text-secondary-hover',
          value: 'var(--text-primary)',
          usage: 'Cor do texto no botão secundário (hover)',
          preview: 'color',
        },
        {
          token: '--button-icon-secondary-hover',
          value: 'var(--text-primary)',
          usage: 'Cor do ícone no botão secundário (hover)',
          preview: 'color',
        },
        {
          token: '--button-icon-secondary-default',
          value: 'var(--text-secondary)',
          usage: 'Cor do ícone no botão secundário',
          preview: 'color',
        },
      ],
    },
    {
      title: 'Tertiary Variant',
      description: 'Tokens para o botão terciário - usado para ações de baixa hierarquia, como links ou ações secundárias.',
      tokens: [
        {
          token: '--button-bg-tertiary-default',
          value: 'transparent',
          usage: 'Fundo transparente no estado padrão',
        },
        {
          token: '--button-bg-tertiary-hover',
          value: 'var(--bg-secondary)',
          usage: 'Fundo do botão terciário ao passar o mouse',
          preview: 'color',
        },
        {
          token: '--button-bg-tertiary-active',
          value: 'var(--bg-tertiary)',
          usage: 'Fundo do botão terciário ao clicar',
          preview: 'color',
        },
        {
          token: '--button-text-tertiary-default',
          value: 'var(--text-secondary)',
          usage: 'Cor do texto no botão terciário',
          preview: 'color',
        },
        {
          token: '--button-icon-tertiary-default',
          value: 'var(--text-secondary)',
          usage: 'Cor do ícone no botão terciário',
          preview: 'color',
        },
        {
          token: '--button-icon-tertiary-default',
          value: 'var(--text-secondary)',
          usage: 'Cor do ícone no botão terciário',
          preview: 'color',
        },
      ],
    },
    {
      title: 'Danger Variant',
      description: 'Tokens para o botão de perigo - usado para ações destrutivas como deletar, remover ou cancelar permanentemente.',
      tokens: [
        {
          token: '--button-bg-danger-default',
          value: 'var(--bg-error-primary)',
          usage: 'Fundo do botão de perigo no estado padrão',
          preview: 'color',
        },
        {
          token: '--button-bg-danger-hover',
          value: 'var(--bg-error-primary-hover)',
          usage: 'Fundo do botão de perigo ao passar o mouse',
          preview: 'color',
        },
        {
          token: '--button-text-danger-default',
          value: 'var(--text-on-brand)',
          usage: 'Cor do texto no botão de perigo',
          preview: 'color',
        },
        {
          token: '--button-icon-danger-default',
          value: 'var(--text-on-brand)',
          usage: 'Cor do ícone no botão de perigo',
          preview: 'color',
        },
        {
          token: '--button-icon-danger-default',
          value: 'var(--text-on-brand)',
          usage: 'Cor do ícone no botão de perigo',
          preview: 'color',
        },
        {
          token: '--button-shadow-danger-focus',
          value: '0 0 0 4px var(--border-error-secondary)',
          usage: 'Anel de foco do botão de perigo',
          preview: 'shadow',
        },
      ],
    },
    {
      title: 'Size Tokens',
      description: 'Tokens que controlam dimensões, padding e tipografia para cada tamanho de botão.',
      tokens: [
        {
          token: '--button-height-sm',
          value: 'var(--spacing-8)',
          usage: 'Altura mínima do botão pequeno (32px)',
          preview: 'spacing',
        },
        {
          token: '--button-height-md',
          value: 'var(--spacing-10)',
          usage: 'Altura mínima do botão médio (40px)',
          preview: 'spacing',
        },
        {
          token: '--button-height-lg',
          value: 'var(--spacing-12)',
          usage: 'Altura mínima do botão grande (48px)',
          preview: 'spacing',
        },
        {
          token: '--button-padding-sm',
          value: 'var(--spacing-3) var(--spacing-6)',
          usage: 'Padding interno do botão pequeno (4px 16px)',
        },
        {
          token: '--button-padding-md',
          value: 'var(--spacing-4) var(--spacing-8)',
          usage: 'Padding interno do botão médio (8px 24px)',
        },
        {
          token: '--button-padding-lg',
          value: 'var(--spacing-5) var(--spacing-10)',
          usage: 'Padding interno do botão grande (12px 32px)',
        },
        {
          token: '--button-font-sm',
          value: 'var(--typography-body-xs-medium)',
          usage: 'Tipografia do botão pequeno (12px, medium)',
        },
        {
          token: '--button-font-md',
          value: 'var(--typography-body-sm-medium)',
          usage: 'Tipografia do botão médio (14px, medium)',
        },
        {
          token: '--button-font-lg',
          value: 'var(--typography-body-md-medium)',
          usage: 'Tipografia do botão grande (16px, medium)',
        },
        {
          token: '--button-icon-size-sm',
          value: '14px',
          usage: 'Tamanho do ícone no botão pequeno',
          preview: 'spacing',
        },
        {
          token: '--button-icon-size-md',
          value: '16px',
          usage: 'Tamanho do ícone no botão médio',
          preview: 'spacing',
        },
        {
          token: '--button-icon-size-lg',
          value: '18px',
          usage: 'Tamanho do ícone no botão grande',
          preview: 'spacing',
        },
      ],
    },
    {
      title: 'Common Tokens',
      description: 'Tokens compartilhados entre todas as variantes e tamanhos.',
      tokens: [
        {
          token: '--button-gap',
          value: 'var(--spacing-4)',
          usage: 'Espaçamento entre ícone e texto (8px)',
          preview: 'spacing',
        },
        {
          token: '--button-radius',
          value: 'var(--border-radius-full)',
          usage: 'Borda arredondada completa (pill shape)',
        },
      ],
    },
  ],

  usage: [
    {
      title: 'Quando usar Primary vs Secondary',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <strong style={{ color: 'var(--text-primary)' }}>Primary:</strong> Use para a ação principal da página ou seção. Deve haver apenas um botão primário visível por contexto.
          </div>
          <div>
            <strong style={{ color: 'var(--text-primary)' }}>Secondary:</strong> Use para ações alternativas que complementam a ação primária, como "Cancelar" em um modal.
          </div>
          <div>
            <strong style={{ color: 'var(--text-primary)' }}>Tertiary:</strong> Use para ações de baixa prioridade, links internos ou ações que não exigem destaque visual.
          </div>
        </div>
      ),
    },
    {
      title: 'Quando usar Danger',
      content: (
        <div>
          Use apenas para ações <strong>destrutivas e irreversíveis</strong>, como deletar permanentemente dados, remover usuários ou cancelar assinaturas. Sempre combine com um modal de confirmação.
        </div>
      ),
    },
    {
      title: 'Escolhendo o tamanho correto',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div>• <strong>Small (sm):</strong> Tabelas, cards compactos, áreas com restrição de espaço</div>
          <div>• <strong>Medium (md):</strong> Padrão para a maioria dos casos - formulários, modais, toolbars</div>
          <div>• <strong>Large (lg):</strong> CTAs de landing pages, ações principais em hero sections</div>
        </div>
      ),
    },
  ]
};
