import React, { useState } from 'react';
import { ComponentDocConfig } from '../../../components/documentation/ComponentDocTemplate';
import { Chat, Message } from '../../../exa-design-system/components/Chat/Chat';

// Wrapper para manter estado no Playground
const ChatPreviewWrapper = (props: any) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: 'Olá! Sou o EXA Escudo. Como posso proteger você hoje?',
      timestamp: new Date(Date.now() - 60000),
      status: 'read'
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text: string) => {
    const role = props.senderRole || 'user';
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: role,
      content: text,
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, newUserMsg]);

    // Simulação de resposta automática apenas se quem enviou foi 'user'
    if (role === 'user') {
      setIsTyping(true);
      setTimeout(() => {
        setMessages(prev => prev.map(m => m.id === newUserMsg.id ? { ...m, status: 'read' } : m));
        
        const responseMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'system',
          content: 'Entendido. Esta é uma resposta automática de demonstração.',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, responseMsg]);
        setIsTyping(false);
      }, 1500);
    } else {
       // Se enviei como agente, a mensagem fica como 'sent' imediatamente
       setTimeout(() => {
         setMessages(prev => prev.map(m => m.id === newUserMsg.id ? { ...m, status: 'sent' } : m));
       }, 500);
    }
  };

  return (
    <div className="h-[500px] w-full max-w-[400px] border rounded-lg overflow-hidden bg-white shadow-sm flex flex-col mx-auto">
       <Chat 
          messages={messages}
          onSend={handleSend}
          isTyping={isTyping || props.isTyping}
          placeholder={props.placeholder}
          allowAttachments={props.allowAttachments}
          suggestions={props.showSuggestions ? ['Sim, bloquear', 'Não, permitir'] : undefined}
          viewAs={props.viewAs}
       />
    </div>
  );
};

export const chatConfig: ComponentDocConfig = {
  name: 'Chat',
  description: 'Uma interface de lista vertical projetada para comunicação bidirecional em tempo real ou assíncrona (Conversational UI). É o canal primário para suporte técnico e interações com assistentes de IA (EXA Escudo).',
  
  initialState: {
    placeholder: 'Digite sua mensagem...',
    allowAttachments: true,
    showSuggestions: false,
    isTyping: false,
    viewAs: 'user',
    senderRole: 'user'
  },

  properties: [
    {
      name: 'viewAs',
      description: 'Define a perspectiva do visualizador',
      type: 'select',
      options: ['user', 'agent'],
      defaultValue: 'user',
      controlType: 'select'
    },
    {
      name: 'senderRole',
      description: 'Simular envio como',
      type: 'select',
      options: ['user', 'agent'],
      defaultValue: 'user',
      controlType: 'select'
    },
    {
      name: 'messages',
      description: 'Array de objetos Message (controlado externamente)',
      type: 'Message[]',
      controlType: 'none'
    },
    {
      name: 'onSend',
      description: 'Callback disparado ao enviar mensagem',
      type: '(text: string) => void',
      controlType: 'none'
    },
    {
      name: 'placeholder',
      description: 'Texto de ajuda no input',
      type: 'string',
      defaultValue: 'Digite sua mensagem...',
      controlType: 'input'
    },
    {
      name: 'allowAttachments',
      description: 'Habilita botão de anexo (clips)',
      type: 'boolean',
      defaultValue: 'true',
      controlType: 'toggle'
    },
    {
      name: 'suggestions',
      description: 'Sugestões de resposta rápida (Quick Replies)',
      type: 'string[]',
      defaultValue: '-',
      controlType: 'none' // Controlado via toggle 'showSuggestions' no wrapper para demo
    },
    {
      name: 'showSuggestions',
      description: 'Mostrar sugestões (Demo)',
      type: 'boolean',
      defaultValue: 'false',
      controlType: 'toggle'
    },
    {
      name: 'isTyping',
      description: 'Exibe indicador de digitação do sistema',
      type: 'boolean',
      defaultValue: 'false',
      controlType: 'toggle'
    }
  ],

  generateCode: (state) => {
    const suggestionsCode = state.showSuggestions 
      ? `\n  suggestions={['Sim, bloquear', 'Não, permitir']}` 
      : '';
    
    const attachmentsCode = !state.allowAttachments
      ? `\n  allowAttachments={false}`
      : '';

    const viewAsCode = state.viewAs !== 'user' ? `\n  viewAs="${state.viewAs}"` : '';

    return `<Chat
  messages={messages}
  onSend={handleSend}
  placeholder="${state.placeholder}"${suggestionsCode}${attachmentsCode}${viewAsCode}
/>`;
  },

  renderPreview: (state) => <ChatPreviewWrapper {...state} />,

  designGuidelines: {
    dos: [
      'Use para **Suporte Técnico** direto com especialistas.',
      'Use para **Assistente Virtual** (EXA Escudo).',
      'Use para notificações que exigem diálogo e negociação.',
      'Mantenha o **status do sistema** sempre claro (digitando, enviado).'
    ],
    donts: [
      'Não use para **formulários longos** (coleta de muitos dados).',
      'Não use para exibir logs de sistema passivos.'
    ]
  }
};
