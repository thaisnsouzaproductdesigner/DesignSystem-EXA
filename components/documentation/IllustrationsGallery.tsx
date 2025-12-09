import React, { useState } from 'react';
import { Check, Copy, Search } from 'lucide-react';
import { cn } from '../ui/utils';

export interface IllustrationItem {
  name: string;
  token: string;
  src: string;
  category: string;
}

const TintedImage = ({ src, alt }: { src: string; alt: string }) => {
  const maskStyle: React.CSSProperties = {
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`,
    maskSize: 'contain',
    WebkitMaskSize: 'contain',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskPosition: 'center',
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Original Image (Base) */}
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-contain relative z-0" 
      />
      
      {/* Layer 2: Color Blend */}
      <div 
        className="absolute inset-0 z-10 bg-[#1060ff] mix-blend-color opacity-60 pointer-events-none"
        style={maskStyle}
      />

      {/* Layer 1: Screen Blend */}
      <div 
        className="absolute inset-0 z-20 bg-[#1060ff] mix-blend-screen opacity-[0.92] pointer-events-none"
        style={maskStyle}
      />

      {/* Gradient Layer: Overlay */}
       <div 
        className="absolute inset-0 z-30 bg-[radial-gradient(circle_at_top_left,_rgba(15,60,190,1)_0%,_rgba(15,60,190,0)_100%)] mix-blend-overlay opacity-100 pointer-events-none"
        style={maskStyle}
      />
    </div>
  );
};

const IllustrationCard = ({ item }: { item: IllustrationItem }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for environments where Clipboard API is blocked (e.g. iframes)
      try {
        const textArea = document.createElement("textarea");
        textArea.value = item.token;
        
        // Ensure it's not visible but part of the DOM
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      } catch (fallbackErr) {
        console.error('Failed to copy token:', fallbackErr);
      }
    }
  };

  return (
    <div className="group relative flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative h-56 w-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
        <TintedImage src={item.src} alt={item.name} />
      </div>
      
      <div className="flex flex-col flex-1 p-4 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-start justify-between mb-2 gap-2">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1" title={item.name}>{item.name}</h3>
          <span className={cn(
            "flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide",
            item.category === 'Marketing' && "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
            item.category === 'Ecommerce' && "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
            item.category === 'Finance' && "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
            item.category === 'Design' && "bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
            item.category === 'Utilities' && "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400",
            item.category === 'Devices' && "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
          )}>
            {item.category}
          </span>
        </div>
        
        <div className="mt-auto pt-2">
          <button 
            onClick={handleCopy}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono text-gray-500 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group/btn"
          >
            <span className="truncate mr-2">{item.token}</span>
            {copied ? (
              <Check size={14} className="text-green-500 flex-shrink-0" />
            ) : (
              <Copy size={14} className="text-gray-400 group-hover/btn:text-gray-600 dark:group-hover/btn:text-gray-200 flex-shrink-0" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

interface IllustrationsGalleryProps {
  illustrations: IllustrationItem[];
}

export const IllustrationsGallery = ({ illustrations }: IllustrationsGalleryProps) => {
  const [search, setSearch] = useState('');
  
  const filteredIllustrations = illustrations.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.token.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex-1">
             {/* Search input used to be here, but now we just show the grid. 
                 Wait, the search input is useful. I'll keep it. */}
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Buscar por nome, token ou categoria..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredIllustrations.map((item) => (
          <IllustrationCard key={item.token} item={item} />
        ))}
      </div>

      {filteredIllustrations.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-gray-500 dark:text-gray-400">Nenhuma ilustração encontrada para "{search}"</p>
        </div>
      )}
    </div>
  );
};
