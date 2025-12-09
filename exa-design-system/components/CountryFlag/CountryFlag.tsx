import React from 'react';
import { cn } from '../../utils/cn';
import { svgPaths } from './flagPaths';

export interface CountryFlagProps extends React.HTMLAttributes<HTMLDivElement> {
  countryCode: 'br' | 'us' | 'uk' | 'de' | 'fr' | 'it' | 'es' | 'pt';
  size?: 'sm' | 'md' | 'lg' | number;
  className?: string;
}

const FlagSvgs: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  br: (props) => (
    <svg viewBox="0 0 22 16" fill="none" preserveAspectRatio="none" {...props}>
      <g>
        <rect fill="#249F58" height="16" width="22" />
        <path clipRule="evenodd" d={svgPaths.p1bc43700} fill="#FFDA2C" fillRule="evenodd" />
        <path d={svgPaths.p1c88d980} fill="#1A47B8" />
        <path clipRule="evenodd" d={svgPaths.p3553b300} fill="white" fillRule="evenodd" />
        <g>
          <path clipRule="evenodd" d={svgPaths.p19be0700} fill="white" fillRule="evenodd" />
          <path d={svgPaths.p19be0700} stroke="white" />
        </g>
      </g>
    </svg>
  ),
  us: (props) => (
    <svg viewBox="0 0 22 16" fill="none" preserveAspectRatio="none" {...props}>
      <g>
        <rect fill="white" height="16" width="22" />
        <path clipRule="evenodd" d="M0 0H9.42857V7.46667H0V0Z" fill="#1A47B8" fillRule="evenodd" />
        <path clipRule="evenodd" d={svgPaths.p2ceb6c00} fill="#F93939" fillRule="evenodd" />
        <path clipRule="evenodd" d={svgPaths.pf24fff0} fill="white" fillRule="evenodd" />
      </g>
    </svg>
  ),
  uk: (props) => (
    <svg viewBox="0 0 22 16" fill="none" preserveAspectRatio="none" {...props}>
      <g>
        <rect fill="#1A47B8" height="16" width="22" />
        <path clipRule="evenodd" d={svgPaths.p1ce86e70} fill="white" fillRule="evenodd" />
        <path d={svgPaths.p29a78500} fill="#F93939" />
        <path clipRule="evenodd" d={svgPaths.p131eab00} fill="white" fillRule="evenodd" />
        <path d={svgPaths.p325e3000} fill="#F93939" />
        <path clipRule="evenodd" d={svgPaths.p2df8a080} fill="white" fillRule="evenodd" />
        <path clipRule="evenodd" d={svgPaths.p14df0f00} fill="#F93939" fillRule="evenodd" />
      </g>
    </svg>
  ),
  de: (props) => (
    <svg viewBox="0 0 22 16" fill="none" preserveAspectRatio="none" {...props}>
      <g>
        <rect fill="#F93939" height="16" width="22" />
        <path clipRule="evenodd" d="M0 11H23V16H0V11Z" fill="#FFDA2C" fillRule="evenodd" />
        <path clipRule="evenodd" d="M0 0H23V5H0V0Z" fill="#151515" fillRule="evenodd" />
      </g>
    </svg>
  ),
  fr: (props) => (
    <svg viewBox="0 0 22 16" fill="none" preserveAspectRatio="none" {...props}>
      <g>
        <rect fill="white" height="16" width="22" />
        <path clipRule="evenodd" d="M0 0H7V16H0V0Z" fill="#1A47B8" fillRule="evenodd" />
        <path clipRule="evenodd" d="M15 0H22V16H15V0Z" fill="#F93939" fillRule="evenodd" />
      </g>
    </svg>
  ),
  it: (props) => (
    <svg viewBox="0 0 22 16" fill="none" preserveAspectRatio="none" {...props}>
      <g>
        <rect fill="white" height="16" width="22" />
        <path clipRule="evenodd" d="M0 0H7V16H0V0Z" fill="#249F58" fillRule="evenodd" />
        <path clipRule="evenodd" d="M15 0H22V16H15V0Z" fill="#F93939" fillRule="evenodd" />
      </g>
    </svg>
  ),
  es: (props) => (
    <svg viewBox="0 0 22 16" fill="none" preserveAspectRatio="none" {...props}>
      <g>
        <rect fill="#F93939" height="16" width="22" />
        <path d={svgPaths.p13216d80} fill="#F93939" />
        <path clipRule="evenodd" d={svgPaths.p3858ff00} fill="#FFDA2C" fillRule="evenodd" />
        <path clipRule="evenodd" d={svgPaths.p3bd6f780} fill="#D4AF2C" fillRule="evenodd" />
        <path clipRule="evenodd" d={svgPaths.p53e6400} fill="#CBCBCB" fillRule="evenodd" />
        <path clipRule="evenodd" d={svgPaths.p3e7a0a00} fill="#1A47B8" fillRule="evenodd" />
        <path clipRule="evenodd" d={svgPaths.p10a8e600} fill="#D4AF2C" fillRule="evenodd" />
        <path clipRule="evenodd" d={svgPaths.p36ce4700} fill="#AF010D" fillRule="evenodd" />
        <path clipRule="evenodd" d={svgPaths.p21c1e500} fill="#AE6A3E" fillRule="evenodd" />
        <path clipRule="evenodd" d={svgPaths.p2393ea00} fill="#FFDA2C" fillRule="evenodd" />
        <path clipRule="evenodd" d={svgPaths.pfbfe680} fill="#AF010D" fillRule="evenodd" />
        <path clipRule="evenodd" d={svgPaths.p1035f500} fill="#D4AF2C" fillRule="evenodd" />
      </g>
    </svg>
  ),
  pt: (props) => (
    <svg viewBox="0 0 22 16" fill="none" preserveAspectRatio="none" {...props}>
      <g>
        <rect fill="#F93939" height="16" width="22" />
        <path clipRule="evenodd" d="M0 0H7V16H0V0Z" fill="#249F58" fillRule="evenodd" />
        <path d={svgPaths.p220fcd80} fill="#FFDA2C" />
        <path clipRule="evenodd" d={svgPaths.p1f337d00} fill="#F93939" fillRule="evenodd" />
        <path clipRule="evenodd" d={svgPaths.p280442f2} fill="white" fillRule="evenodd" />
        <path clipRule="evenodd" d={svgPaths.p1c99000} fill="#1A47B8" fillRule="evenodd" />
      </g>
    </svg>
  )
};

export const CountryFlag = React.forwardRef<HTMLDivElement, CountryFlagProps>(
  ({ countryCode, size = 'md', className, ...props }, ref) => {
    
    let width = 32;
    
    if (typeof size === 'number') {
      width = size;
    } else {
      switch (size) {
        case 'sm': width = 20; break;
        case 'md': width = 32; break;
        case 'lg': width = 48; break;
      }
    }
    
    // Calculate height based on 22:16 aspect ratio (1.375)
    // 16 / 22 = 0.727272...
    const height = Math.round(width * (16 / 22));

    const FlagComponent = FlagSvgs[countryCode];

    if (!FlagComponent) {
      return (
        <div 
          ref={ref}
          className={cn("bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[10px] font-mono text-gray-500 border border-gray-200 dark:border-gray-700", className)}
          style={{ width, height, borderRadius: '2px' }}
          {...props}
        >
          {countryCode.toUpperCase()}
        </div>
      );
    }

    return (
      <div 
        ref={ref}
        className={cn("inline-flex items-center justify-center overflow-hidden rounded-[2px] shadow-sm border border-black/5 dark:border-white/10", className)}
        style={{ width, height }}
        {...props}
      >
        <FlagComponent className="w-full h-full object-cover" />
      </div>
    );
  }
);

CountryFlag.displayName = 'CountryFlag';
