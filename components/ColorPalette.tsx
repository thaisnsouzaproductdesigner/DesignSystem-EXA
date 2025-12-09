import React from 'react';
import { Check, Copy } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { cn } from './ui/utils';
import { copyToClipboard } from '../utils/clipboard';

// --- Interfaces ---

interface ColorDefinition {
  name: string;
  variable: string;
  contrastLevel: 'AAA' | 'AA' | 'A';
  isDark?: boolean;
}

interface ColorSectionData {
  title: string;
  description?: string;
  colors: ColorDefinition[];
  twoColumns?: boolean;
}

interface ColorPaletteProps {
  title: string;
  description: string;
  sections: ColorSectionData[];
}

// --- Componente Principal ---

export const ColorPalette: React.FC<ColorPaletteProps> = ({ title, description, sections }) => {
  return (
    <div className="space-y-10 mb-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        <p className="text-lg text-muted-foreground max-w-4xl leading-relaxed">
          {description}
        </p>
      </div>

      <div className="space-y-12">
        {sections.map((section, idx) => (
          <ColorSection key={idx} section={section} />
        ))}
      </div>
    </div>
  );
};

// --- Seção Inteligente (Grid vs Table) ---

const ColorSection: React.FC<{ section: ColorSectionData }> = ({ section }) => {
  // Detecta se devemos mostrar como Grid (Superfícies) ou Tabela (Texto/Bordas)
  const title = section.title.toLowerCase();
  const isSurface = title.includes('surface') || title.includes('background');

  return (
    <div className="space-y-6">
      <div className="space-y-2 border-b pb-4">
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          {section.title}
        </h3>
        {section.description && (
          <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
            {section.description}
          </p>
        )}
      </div>
      
      {isSurface ? (
        <div className={cn(
          "grid gap-4",
          "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
        )}>
          {section.colors.map((color, idx) => (
            <ColorCard key={idx} color={color} />
          ))}
        </div>
      ) : (
        <ColorTable colors={section.colors} />
      )}
    </div>
  );
};

// --- Visualização em Grid (Para Surfaces) ---

const ColorCard: React.FC<{ color: ColorDefinition }> = ({ color }) => {
  const [hasCopied, setHasCopied] = React.useState(false);

  const onCopy = async () => {
    const success = await copyToClipboard(color.variable);
    if (success) {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  const isLightToken = !color.isDark;
  
  return (
    <div 
      className="group relative flex flex-col rounded-lg border shadow-sm overflow-hidden transition-all hover:shadow-md"
    >
      {/* Área de Cor */}
      <div 
        className="h-32 w-full relative flex items-start justify-end p-3 transition-colors"
        style={{ background: `var(${color.variable})` }}
      >
        {/* Badge de Contraste */}
        <span className={cn(
          "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
          isLightToken 
            ? "bg-neutral-900 text-white/90" 
            : "bg-white text-neutral-900/90"
        )}>
          {color.contrastLevel}
        </span>
      </div>

      {/* Informações */}
      <div className="p-4 bg-card flex items-end justify-between gap-2">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="font-semibold text-sm truncate text-foreground" title={color.name}>
            {color.name}
          </span>
          <code className="text-xs text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded w-fit">
            var({color.variable})
          </code>
        </div>
        
        <button
          onClick={onCopy}
          className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring"
          title="Copiar variável"
        >
          {hasCopied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
    </div>
  );
};

// --- Visualização em Tabela (Para Textos/Bordas) ---

const ColorTable: React.FC<{ colors: ColorDefinition[] }> = ({ colors }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Preview</TableHead>
            <TableHead>Token Name</TableHead>
            <TableHead>Variable</TableHead>
            <TableHead className="text-right w-[100px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {colors.map((color, idx) => (
            <ColorRow key={idx} color={color} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const ColorRow: React.FC<{ color: ColorDefinition }> = ({ color }) => {
  const [hasCopied, setHasCopied] = React.useState(false);

  const onCopy = async () => {
    const success = await copyToClipboard(color.variable);
    if (success) {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  // Determina o tipo de preview baseado no nome
  const isBorder = color.name.toLowerCase().includes('border');
  const isText = color.name.toLowerCase().includes('text');

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center justify-center h-10 w-14 rounded bg-muted/30 border border-dashed overflow-hidden">
          {isBorder ? (
            <div 
              className="h-6 w-6 rounded-sm border-2 bg-background"
              style={{ borderColor: `var(${color.variable})` }}
            />
          ) : isText ? (
            <span 
              className="text-lg font-bold leading-none"
              style={{ color: `var(${color.variable})` }}
            >
              Aa
            </span>
          ) : (
            <div 
              className="h-6 w-6 rounded-full shadow-sm ring-1 ring-inset ring-black/10"
              style={{ background: `var(${color.variable})` }}
            />
          )}
        </div>
      </TableCell>
      <TableCell className="font-medium text-foreground">
        {color.name}
      </TableCell>
      <TableCell>
        <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono text-muted-foreground">
          var({color.variable})
        </code>
      </TableCell>
      <TableCell className="text-right">
        <button
          onClick={onCopy}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          {hasCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
        </button>
      </TableCell>
    </TableRow>
  );
};

// --- Utilitários ---
