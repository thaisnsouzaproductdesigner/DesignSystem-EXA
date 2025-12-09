import React from "react";

export interface TokenDocConfig {
  title: string;
  description: string;
  renderContent: () => React.ReactNode;
}

interface TokenDocTemplateProps {
  config: TokenDocConfig;
}

export function TokenDocTemplate({
  config,
}: TokenDocTemplateProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0F1117] transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 px-12 py-8 transition-colors duration-300">
        <div className="flex items-start justify-between">
          <div className="max-w-3xl">
            <h1 className="text-[32px] font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
              {config.title}
            </h1>
            <p
              className="text-neutral-600 dark:text-gray-400 transition-colors duration-300"
              style={{ fontSize: "16px", lineHeight: 1.5 }}
            >
              {config.description}
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-12 py-10">
        {config.renderContent()}
      </div>
    </div>
  );
}