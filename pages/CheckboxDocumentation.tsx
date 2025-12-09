import React from 'react';
import { ComponentDocTemplate } from '../components/documentation/ComponentDocTemplate';
import { checkboxConfig } from './docs/configs/checkboxConfig';

export function CheckboxDocumentation() {
  return <ComponentDocTemplate config={checkboxConfig} />;
}
