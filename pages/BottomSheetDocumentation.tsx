import React from 'react';
import { ComponentDocTemplate } from '../components/documentation/ComponentDocTemplate';
import { bottomSheetConfig } from './docs/configs/bottomSheetConfig';

export function BottomSheetDocumentation() {
  return <ComponentDocTemplate config={bottomSheetConfig} />;
}
