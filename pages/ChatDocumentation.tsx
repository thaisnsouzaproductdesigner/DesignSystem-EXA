import React from 'react';
import { ComponentDocTemplate } from '../components/documentation/ComponentDocTemplate';
import { chatConfig } from './docs/configs/chatConfig';

export const ChatDocumentation = () => {
  return <ComponentDocTemplate config={chatConfig} />;
};
