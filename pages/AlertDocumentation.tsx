import React from 'react';
import { ComponentDocTemplate } from '../components/documentation/ComponentDocTemplate';
import { alertConfig } from './docs/configs/alertConfig';

export const AlertDocumentation: React.FC = () => {
  return <ComponentDocTemplate config={alertConfig} />;
};
