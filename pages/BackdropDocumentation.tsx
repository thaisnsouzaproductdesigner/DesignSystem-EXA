import React from 'react';
import { ComponentDocTemplate } from '../components/documentation/ComponentDocTemplate';
import { backdropConfig } from './docs/configs/backdropConfig';

export function BackdropDocumentation() {
  return <ComponentDocTemplate config={backdropConfig} />;
}
