import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const showLoading = isLoading || loading;
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group';
  
  const variantStyles = {
    primary: 'text-white bg-[linear-gradient(135deg,#1f2937_0%,#0f172a_50%,#5961f9_100%)] hover:-translate-y-0.5 focus:ring-indigo-500/30',
    secondary: 'glass-morphic text-dark-800 hover:bg-white/95 hover:-translate-y-0.5 focus:ring-indigo-500/20',
    danger: 'text-white bg-[linear-gradient(135deg,#dc2626_0%,#b91c1c_100%)] hover:-translate-y-0.5 focus:ring-red-500/30',
    ghost: 'text-dark-700 hover:bg-white/60 focus:ring-indigo-500/20',
    glass: 'glass-morphic text-dark-800 hover:bg-white/95 hover:-translate-y-0.5',
  };
  
  const getVariantShadow = (variant: string, isHovered: boolean = false) => {
    if (variant === 'primary') {
      return isHovered ? '0 24px 72px -24px rgba(17, 24, 39, 0.35)' : '0 18px 56px -22px rgba(17, 24, 39, 0.28)';
    }
    if (variant === 'danger') {
      return isHovered ? '0 24px 72px -24px rgba(220, 38, 38, 0.45)' : '0 18px 56px -22px rgba(220, 38, 38, 0.3)';
    }
    return '0 16px 44px -20px rgba(32, 40, 62, 0.18)';
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || showLoading}
      style={{ boxShadow: getVariantShadow(variant) }}
      {...props}
    >
      <span className="relative z-10 flex items-center">
        {showLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </span>
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'radial-gradient(120px 60px at 20% 20%, rgba(255,255,255,0.25), transparent)' }}></span>
    </button>
  );
};
