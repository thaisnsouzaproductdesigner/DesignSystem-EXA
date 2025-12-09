import React from 'react';
import { ComponentDocTemplate } from '../components/documentation/ComponentDocTemplate';
import { badgeConfig } from './docs/configs/badgeConfig';

export function BadgeDocumentation() {
  return <ComponentDocTemplate config={badgeConfig} />;
}
