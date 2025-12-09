import React from 'react';
import { ComponentDocTemplate } from '../components/documentation/ComponentDocTemplate';
import { chipConfig } from './docs/configs/chipConfig';

export function ChipDocumentation() {
  return <ComponentDocTemplate config={chipConfig} />;
}
