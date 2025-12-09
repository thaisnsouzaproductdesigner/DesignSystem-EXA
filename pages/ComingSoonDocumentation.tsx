import React from 'react';

export const ComingSoonDocumentation = ({ title }: { title: string }) => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-800">
          Esta documentação está em desenvolvimento e estará disponível em breve.
        </p>
      </div>
    </div>
  );
};
