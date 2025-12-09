import React from 'react';
import { Avatar } from '../../../exa-design-system/components/Avatar/Avatar';
import { ComponentDocConfig } from '../../../components/documentation/ComponentDocTemplate';
import { Clock, Flag } from 'lucide-react';
import exampleImage from 'figma:asset/d59222ad84fdfc7a2e5c9569818c50bc74fb7f26.png';
import badgeImage from 'figma:asset/94762ad918c4a91ad6611cc4bfdc86588adc7c60.png'; // Reusing existing asset or sample
import exampleDoubleImage from 'figma:asset/db05c608cb0cb4415199ecd703de877687ca29e1.png'; // Provided image for double

const AvatarPreviewWrapper = ({ state }: { state: any }) => {
  // Determine logic for preview based on selected type
  let src = state.src;
  let icon = undefined;
  let text = state.text;
  let secondary = undefined;
  let badge = undefined;

  // --- Primary Avatar Logic ---
  if (state.type === 'image' && !src) {
    src = "https://images.unsplash.com/photo-1659100941255-cb1bb7f9422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMHBob3RvJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzY0MTAxMjU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  } else if (state.type === 'flag' && !src) {
    src = 'https://flagcdn.com/w80/br.png';
  } else if (state.type === 'icon') {
    icon = <Clock strokeWidth={2} />;
  } else if (state.type === 'text' && !text) {
    text = 'EX';
  }

  // --- Secondary Avatar Logic ---
  if (state.variant === 'double') {
    let secSrc = state.sec_src;
    let secIcon = undefined;
    let secText = state.sec_text;

    // Defaults for secondary based on type if no value provided
    if (state.sec_type === 'image' && !secSrc) {
      secSrc = "https://images.unsplash.com/photo-1617428882838-655fa863d613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMHBob3RvJTIwZGl2ZXJzZSUyMGhlYWRzaG90fGVufDF8fHx8MTc2NDEwMTMzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
    } else if (state.sec_type === 'flag' && !secSrc) {
      secSrc = 'https://flagcdn.com/w80/gb.png';
    } else if (state.sec_type === 'icon') {
      secIcon = <Flag strokeWidth={2} />;
    } else if (state.sec_type === 'text' && !secText) {
      secText = 'UK';
    }

    secondary = {
      type: state.sec_type === 'auto' ? undefined : state.sec_type,
      color: state.sec_color === 'auto' ? undefined : state.sec_color,
      src: secSrc,
      name: state.sec_name,
      text: secText,
      icon: secIcon,
    };
  }

  // Helper for Badge
  if (state.badgeType === 'image') {
    badge = badgeImage;
  } else if (state.badgeType === 'icon') {
    badge = <Flag size={10} fill="black" />;
  } else if (state.badgeType === 'flag') {
    badge = 'https://flagcdn.com/w40/gb.png';
  }

  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: 200, 
        width: '100%',
        gap: 32,
      }}
    >
      <Avatar 
        variant={state.variant}
        doubleLayout={state.doubleLayout}
        // Global Props
        selected={state.selected}
        size={state.size}
        hasBorder={state.hasBorder}
        status={state.status === 'none' ? undefined : state.status}
        notification={state.notification}
        badge={badge}
        
        // Primary Props
        type={state.type === 'auto' ? undefined : state.type}
        color={state.color === 'auto' ? undefined : state.color}
        src={src}
        name={state.name}
        text={text}
        icon={icon}
        
        // Secondary Object
        secondary={secondary}
      />
    </div>
  );
};

const avatarConfig: ComponentDocConfig = {
  name: 'Avatar',
  description: 'Representação visual de um usuário, entidade ou mídia. Humaniza a interface.',
  
  initialState: {
    variant: 'single',
    doubleLayout: 'horizontal',
    selected: false,
    size: 'md',
    hasBorder: false,
    status: 'online',
    notification: false,
    badgeType: 'none',
    
    // Primary
    type: 'auto',
    color: 'auto',
    src: '',
    name: 'João Silva',
    text: '',

    // Secondary
    sec_type: 'flag',
    sec_color: 'auto',
    sec_src: '',
    sec_name: 'United Kingdom',
    sec_text: '',
  },

  properties: [
    // --- Structure & Layout ---
    {
      name: 'variant',
      description: 'Visualização Single ou Double',
      type: 'single | double',
      defaultValue: 'single',
      controlType: 'select',
      options: ['single', 'double']
    },
    {
      name: 'doubleLayout',
      description: 'Layout do Double (Apenas se variant=double)',
      type: 'horizontal | diagonal',
      defaultValue: 'horizontal',
      controlType: 'select',
      options: ['horizontal', 'diagonal'],
      hidden: (state) => state.variant !== 'double',
    },
    {
      name: 'size',
      description: 'Tamanho do componente',
      type: 'xs | sm | md | lg | xl',
      defaultValue: 'md',
      controlType: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    {
      name: 'selected',
      description: 'Estado selecionado (destaque)',
      type: 'boolean',
      defaultValue: 'false',
      controlType: 'toggle',
    },
    {
      name: 'hasBorder',
      description: 'Borda de contraste',
      type: 'boolean',
      defaultValue: 'false',
      controlType: 'toggle',
    },

    // --- Indicators ---
    {
      name: 'status',
      description: 'Status (Presence)',
      type: 'none | online | busy | offline',
      defaultValue: 'online',
      controlType: 'select',
      options: ['none', 'online', 'busy', 'offline']
    },
    {
      name: 'badgeType',
      description: 'Badge (Overlay)',
      type: 'none | image | flag | icon',
      defaultValue: 'none',
      controlType: 'select',
      options: ['none', 'image', 'flag', 'icon']
    },
    {
      name: 'notification',
      description: 'Notification (Dot)',
      type: 'boolean',
      defaultValue: 'false',
      controlType: 'toggle',
    },

    // --- Type ---
    {
      name: 'type',
      description: 'Primary: Tipo',
      type: 'auto | image | flag | icon | text',
      defaultValue: 'auto',
      controlType: 'select',
      options: ['auto', 'image', 'flag', 'icon', 'text']
    },
    {
      name: 'sec_type',
      description: 'Secondary: Tipo',
      type: 'auto | image | flag | icon | text',
      defaultValue: 'flag',
      controlType: 'select',
      options: ['auto', 'image', 'flag', 'icon', 'text'],
      hidden: (state) => state.variant !== 'double',
    },

    // --- Color ---
    {
      name: 'color',
      description: 'Primary: Cor',
      type: 'auto | gradient | neutral | brand',
      defaultValue: 'auto',
      controlType: 'select',
      options: ['auto', 'gradient', 'neutral', 'brand']
    },
    {
      name: 'sec_color',
      description: 'Secondary: Cor',
      type: 'auto | gradient | neutral | brand',
      defaultValue: 'auto',
      controlType: 'select',
      options: ['auto', 'gradient', 'neutral', 'brand'],
      hidden: (state) => state.variant !== 'double',
    },

    // --- Src ---
    {
      name: 'src',
      description: 'Primary: URL Imagem',
      type: 'string',
      defaultValue: '',
      controlType: 'input',
    },
    {
      name: 'sec_src',
      description: 'Secondary: URL Imagem',
      type: 'string',
      defaultValue: '',
      controlType: 'input',
      hidden: (state) => state.variant !== 'double',
    },

    // --- Name ---
    {
      name: 'name',
      description: 'Primary: Nome/Alt',
      type: 'string',
      defaultValue: 'João Silva',
      controlType: 'input',
    },
    {
      name: 'sec_name',
      description: 'Secondary: Nome/Alt',
      type: 'string',
      defaultValue: 'United Kingdom',
      controlType: 'input',
      hidden: (state) => state.variant !== 'double',
    },

    // --- Text ---
    {
      name: 'text',
      description: 'Primary: Texto',
      type: 'string',
      defaultValue: '',
      controlType: 'input',
    },
    {
      name: 'sec_text',
      description: 'Secondary: Texto',
      type: 'string',
      defaultValue: '',
      controlType: 'input',
      hidden: (state) => state.variant !== 'double',
    },
  ],

  generateCode: (state) => {
    const variantProp = state.variant !== 'single' ? `\n  variant="${state.variant}"` : '';
    const layoutProp = state.variant === 'double' && state.doubleLayout !== 'horizontal' ? `\n  doubleLayout="${state.doubleLayout}"` : '';
    const selectedProp = state.selected ? `\n  selected` : '';
    
    // Primary
    const typeProp = state.type !== 'auto' ? `\n  type="${state.type}"` : '';
    const colorProp = state.color !== 'auto' ? `\n  color="${state.color}"` : '';
    const srcProp = state.src ? `\n  src="${state.src}"` : '';
    const textProp = state.text ? `\n  text="${state.text}"` : '';
    
    // Global
    const statusProp = state.status !== 'none' && state.badgeType === 'none' ? `\n  status="${state.status}"` : '';
    const borderProp = state.hasBorder ? `\n  hasBorder` : '';
    const sizeProp = state.size !== 'md' ? `\n  size="${state.size}"` : '';
    const notifProp = state.notification ? `\n  notification` : '';
    const badgeProp = state.badgeType !== 'none' ? `\n  badge={...}` : '';
    
    // Secondary Construction
    let secondaryProp = '';
    if (state.variant === 'double') {
      const props = [];
      if (state.sec_type !== 'auto') props.push(`type: "${state.sec_type}"`);
      if (state.sec_color !== 'auto') props.push(`color: "${state.sec_color}"`);
      if (state.sec_src) props.push(`src: "${state.sec_src}"`);
      if (state.sec_name) props.push(`name: "${state.sec_name}"`);
      if (state.sec_text) props.push(`text: "${state.sec_text}"`);
      
      if (props.length > 0) {
         secondaryProp = `\n  secondary={{ ${props.join(', ')} }}`;
      } else {
         secondaryProp = `\n  secondary={{ name: "${state.sec_name}" }}`;
      }
    }

    return `
<Avatar
  name="${state.name}"${variantProp}${layoutProp}${selectedProp}${typeProp}${colorProp}${srcProp}${textProp}${sizeProp}${statusProp}${notifProp}${badgeProp}${borderProp}${secondaryProp}
/>
    `;
  },

  renderPreview: (state) => <AvatarPreviewWrapper state={state} />,

  designGuidelines: {
    dos: [
      'Use o estado "selected" para listas de opções.',
      'Use Double para representar pares (ex: Moeda/País).',
      'Configure "Secondary" apenas quando variant="double".',
    ],
    donts: [
      'Não combine Status e Badge.',
    ]
  }
};

export default avatarConfig;
