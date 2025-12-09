import React from 'react';
import { ComponentDocTemplate } from '../components/documentation/ComponentDocTemplate';
import avatarConfig from './docs/configs/avatarConfig';

export const AvatarDocumentation: React.FC = () => {
  return <ComponentDocTemplate config={avatarConfig} />;
};
