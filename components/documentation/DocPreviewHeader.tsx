import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../exa-design-system/contexts/ThemeContext';

interface DocPreviewHeaderProps {
  title?: string;
  description?: string;
}

export const DocPreviewHeader: React.FC<DocPreviewHeaderProps> = ({
  title = "Visualização",
  description = "Alterne entre os temas para visualizar os tokens em diferentes contextos."
}) => {
  const { isDark, setDarkMode } = useTheme();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700 pb-6">
      <div className="space-y-1">
         <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{title}</h3>
         <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      </div>
      
      <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-full inline-flex shrink-0">
        <button
          onClick={() => setDarkMode(false)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            !isDark 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <Sun size={16} />
          Light
        </button>
        <button
          onClick={() => setDarkMode(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            isDark 
              ? 'bg-gray-600 text-white shadow-sm' 
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <Moon size={16} />
          Dark
        </button>
      </div>
    </div>
  );
};
