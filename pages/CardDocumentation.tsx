import React from 'react';
import { ComponentDocTemplate } from '../components/documentation/ComponentDocTemplate';
import { cardConfig } from './docs/configs/cardConfig';

export function CardDocumentation() {
  return <ComponentDocTemplate config={cardConfig} />;
}
