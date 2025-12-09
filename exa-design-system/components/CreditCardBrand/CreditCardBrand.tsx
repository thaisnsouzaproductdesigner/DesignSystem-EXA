import React from 'react';
import { cn } from '../../utils/cn';

export interface CreditCardBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  brand: 'visa' | 'mastercard' | 'amex' | 'elo' | 'hipercard' | 'generic';
  size?: 'sm' | 'md' | 'lg' | number;
  className?: string;
}

const brands: Record<string, (props: React.SVGProps<SVGSVGElement>) => React.ReactNode> = {
  visa: (props) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path fill="#1A1F71" d="M10.996 16.596l1.722-10.658h2.766l-1.722 10.658h-2.766zm-5.69-10.457c-.106-.038-.686-.182-1.373-.182-1.515 0-2.582.805-2.593 1.956-.013.847.756 1.322 1.332 1.603.593.287.792.474.79.733-.004.397-.478.578-.92.578-.614 0-.943-.093-1.442-.315l-.203-.095-.214 1.333c.358.165 1.018.309 1.702.309 1.605 0 2.65-.79 2.667-2.016.008-.671-.4-1.182-1.277-1.601-.532-.266-.857-.446-.857-.716.002-.246.273-.497.863-.497.29 0 .584.06.772.144l.092.042.361-2.276zm8.818 6.453l.794-2.143c-.01-.005.166-.453.27-1.02l.144.685.42 2.478h-1.628zm2.498-6.654h-2.138c-.663 0-1.163.193-1.455.888l-4.135 9.765h2.905l.578-1.599h3.542l.334 1.599h2.56l-2.191-10.653zM5.385 6.139l-2.04 10.658H.7l2.842-6.07c.502-1.303.856-1.761 1.055-2.017.067-.091.334-.413.888-.571v-2z"/>
    </svg>
  ),
  mastercard: (props) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path fill="#FF5F00" d="M11.603 12.002a7.35 7.35 0 0 1 2.397 5.409 7.375 7.375 0 0 1-2.397 5.398 7.377 7.377 0 0 1-2.397-5.398 7.352 7.352 0 0 1 2.397-5.409z"/>
      <path fill="#EB001B" d="M9.206 12.002c1.554 1.396 2.397 3.322 2.397 5.409 0 2.083-.843 4.004-2.397 5.398A7.411 7.411 0 0 1 4.589 24.81 7.412 7.412 0 0 1 0 17.411a7.412 7.412 0 0 1 4.589-7.399 7.412 7.412 0 0 1 4.617 1.99z"/>
      <path fill="#F79E1B" d="M24 17.411a7.412 7.412 0 0 1-4.589 7.399 7.412 7.412 0 0 1-4.617-1.99c1.555-1.395 2.397-3.32 2.397-5.408 0-2.083-.842-4.004-2.397-5.398a7.411 7.411 0 0 1 4.617-1.99A7.412 7.412 0 0 1 24 17.411z"/>
    </svg>
  ),
  amex: (props) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path fill="#016FD0" d="M2.52 7.153h18.96c1.392 0 2.52 1.128 2.52 2.52v4.654c0 1.392-1.128 2.52-2.52 2.52H2.52c-1.392 0-2.52-1.128-2.52-2.52V9.673c0-1.392 1.128-2.52 2.52-2.52z"/>
      <path fill="#FFF" d="M10.875 14.168l-2.227 1.25-.657-3.725h-.526l-.657 3.725-2.228-1.25.962-5.452h5.372l-.039.222zm-3.664-4.83l.764 4.332 1.488.835 1.487-.835.765-4.332h-4.504zM16.03 9.338l.685 3.882h.56l.684-3.882h1.643l-.97 5.503h-1.555l-1.023-5.068-1.023 5.068h-1.555l-.97-5.503h1.642l.685 3.882h.559l.684-3.882h1.599zM7.17 9.338l-.666 1.405-.666-1.405H4.275l1.63 3.442L4.032 14.84h1.74l.975-2.056.974 2.056h1.74l-1.874-2.062 1.63-3.442H7.171z"/>
    </svg>
  ),
  elo: (props) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path fill="#231F20" d="M22.9 14.9h-2.1v-4.2h2.1v4.2zm-1.1-1.1h-.6v-2.1h.6v2.1z"/>
      <circle fill="#F15A29" cx="7.4" cy="12.8" r="4.7"/>
      <path fill="#00A4E0" d="M13.7 8.1c-2.6 0-4.7 2.1-4.7 4.7s2.1 4.7 4.7 4.7 4.7-2.1 4.7-4.7-2.1-4.7-4.7-4.7zm0 7.3c-1.4 0-2.6-1.2-2.6-2.6s1.2-2.6 2.6-2.6 2.6 1.2 2.6 2.6-1.2 2.6-2.6 2.6z"/>
      <path fill="#8DC63F" d="M10.5 9.6c-.6-1.2-1.9-2.1-3.3-2.1-2.1 0-3.7 1.6-3.7 3.7 0 .5.1 1 .3 1.4l1.6-.9c-.1-.2-.2-.4-.2-.6 0-1 .8-1.9 1.9-1.9.7 0 1.4.4 1.7 1.1l1.7-.7z"/>
    </svg>
  ),
  hipercard: (props) => (
    <svg viewBox="0 0 24 24" {...props}>
      <rect width="24" height="16" x="0" y="4" rx="1.5" fill="#A80000"/>
      <path fill="#FFF" d="M5.5 8h13v8h-13z"/>
      <path fill="#A80000" d="M7.5 10h9v4h-9z"/>
      <path fill="#FFF" d="M12 15a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm-1.5 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm3 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm-4.5 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm6 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1z"/>
    </svg>
  ),
  generic: (props) => (
    <svg viewBox="0 0 24 24" {...props}>
      <rect width="24" height="16" x="0" y="4" rx="2" fill="#E5E7EB"/>
      <path fill="#9CA3AF" d="M0 7h24v3H0z"/>
      <rect x="2" y="12" width="12" height="1" rx="0.5" fill="#9CA3AF"/>
      <rect x="2" y="14" width="8" height="1" rx="0.5" fill="#9CA3AF"/>
    </svg>
  )
};

export const CreditCardBrand = React.forwardRef<HTMLDivElement, CreditCardBrandProps>(
  ({ brand, size = 'md', className, ...props }, ref) => {
    
    let width = 48;
    // Aspect ratio 3:2 standard for cards
    
    if (typeof size === 'number') {
      width = size;
    } else {
      switch (size) {
        case 'sm': width = 30; break;
        case 'md': width = 48; break;
        case 'lg': width = 72; break;
      }
    }

    const height = (width / 3) * 2;
    const BrandSvg = brands[brand] || brands.generic;

    return (
      <div 
        ref={ref}
        className={cn("inline-flex items-center justify-center overflow-hidden rounded shadow-sm transition-transform hover:scale-105 bg-white", className)}
        style={{ width, height }}
        {...props}
      >
        <BrandSvg className="w-full h-full object-contain" />
      </div>
    );
  }
);

CreditCardBrand.displayName = 'CreditCardBrand';
