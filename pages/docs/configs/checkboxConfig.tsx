import React, { useState, useEffect } from 'react';
import { Checkbox } from '../../../exa-design-system/components/Checkbox';
import { ComponentDocConfig } from '../../../components/documentation/ComponentDocTemplate';

const CheckboxPreviewWrapper = ({ state }: { state: any }) => {
  const [checked, setChecked] = useState(state.checked);

  useEffect(() => {
    setChecked(state.checked);
  }, [state.checked]);

  return (
    <Checkbox
      label={state.label}
      checked={checked}
      indeterminate={state.indeterminate}
      disabled={state.disabled}
      error={state.error}
      required={state.required}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

export const checkboxConfig: ComponentDocConfig = {
  name: 'Checkbox',
  description: 'Controle de seleção que permite aos usuários selecionar uma ou mais opções de um conjunto. Suporta estados marcado, desmarcado e indeterminado com feedback visual claro.',
  
  initialState: {
    label: 'Accept terms and conditions',
    checked: false,
    indeterminate: false,
    disabled: false,
    error: false,
    required: false
  },

  properties: [
    {
      name: 'label',
      description: 'Rótulo de texto para o checkbox',
      type: 'string',
      controlType: 'input'
    },
    {
      name: 'checked',
      description: 'Estado marcado do checkbox',
      type: 'boolean',
      defaultValue: 'false',
      controlType: 'toggle'
    },
    {
      name: 'indeterminate',
      description: 'Estado de seleção mista/parcial',
      type: 'boolean',
      defaultValue: 'false',
      controlType: 'toggle'
    },
    {
      name: 'disabled',
      description: 'Desabilita a interação do checkbox',
      type: 'boolean',
      defaultValue: 'false',
      controlType: 'toggle'
    },
    {
      name: 'error',
      description: 'Mostra estado de erro',
      type: 'boolean',
      defaultValue: 'false',
      controlType: 'toggle'
    },
    {
      name: 'required',
      description: 'Marca o checkbox como obrigatório',
      type: 'boolean',
      defaultValue: 'false',
      controlType: 'toggle'
    },
    {
      name: 'onChange',
      description: 'Manipulador de evento de mudança',
      type: '(event: React.ChangeEvent<HTMLInputElement>) => void',
      controlType: 'none'
    }
  ],

  generateCode: (state) => {
    const props: string[] = [];
    
    if (state.label) {
      props.push(`label="${state.label}"`);
    }
    if (state.checked) {
      props.push('checked');
    }
    if (state.indeterminate) {
      props.push('indeterminate');
    }
    if (state.disabled) {
      props.push('disabled');
    }
    if (state.error) {
      props.push('error');
    }
    if (state.required) {
      props.push('required');
    }
    props.push('onChange={handleChange}');
    
    const propsString = props.length > 0 ? '\n  ' + props.join('\n  ') + '\n' : '';
    
    return `<Checkbox${propsString} />`;
  },

  renderPreview: (state) => <CheckboxPreviewWrapper state={state} />,

  designGuidelines: {
    dos: [
      '• Use rótulos claros e concisos',
      '• Use indeterminado para checkboxes pai em listas aninhadas',
      '• Forneça feedback de erro quando a validação falhar',
      '• Agrupe checkboxes relacionados'
    ],
    donts: [
      '• Não use para opções mutuamente exclusivas (use radio buttons)',
      '• Evite rótulos longos - mantenha-os breves',
      '• Não use estado desabilitado sem explicação',
      '• Evite aninhar checkboxes mais de 2 níveis'
    ]
  }
};
