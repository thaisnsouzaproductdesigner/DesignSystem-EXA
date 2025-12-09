import React, { useState } from 'react';
import { DocumentationLayout } from './components/DocumentationLayout';
import { ThemeProvider } from './exa-design-system/contexts/ThemeContext';
import { ToastProvider } from './exa-design-system/components/Toast/ToastProvider';
import { getPage } from './pages/pageRegistry';
import './styles/globals.css';
import './exa-design-system/styles.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('colors');

  const { Component, props } = getPage(currentPage);

  return (
    <ThemeProvider>
      <ToastProvider>
        <DocumentationLayout currentPage={currentPage} onNavigate={setCurrentPage}>
          <Component {...props} />
        </DocumentationLayout>
      </ToastProvider>
    </ThemeProvider>
  );
}
