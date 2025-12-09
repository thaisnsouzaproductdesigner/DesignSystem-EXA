import React from 'react';
import { ComponentDocTemplate } from '../components/documentation/ComponentDocTemplate';
import { buttonConfig } from './docs/configs/buttonConfig';
import { buttonTokenConfig } from './docs/configs/buttonTokenConfig';

export function ButtonDocumentation() {
  return <ComponentDocTemplate config={buttonConfig} tokenConfig={buttonTokenConfig} />;
}
