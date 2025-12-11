import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
    primary: 'text-white bg-[linear-gradient(135deg,#1A4D99_0%,#0F3A7D_70%,#2C5AA0_100%)] hover:-translate-y-0.5 focus:ring-[#1A4D99]/30',
    secondary: 'bg-white text-[#0F3A7D] border border-[#E8EAED] hover:bg-[#E8EAED] hover:-translate-y-0.5 focus:ring-[#1A4D99]/20',
    danger: 'text-white bg-[linear-gradient(135deg,#D32F2F_0%,#B71C1C_100%)] hover:-translate-y-0.5 focus:ring-red-500/30',
    ghost: 'text-[#0F3A7D] hover:bg-[#E8EAED] focus:ring-[#1A4D99]/20',
    glass: 'card-lux text-[#0F3A7D] hover:-translate-y-0.5'
  };
  
  const getVariantShadow = (variant: string, isHovered: boolean = false) => {
    if (variant === 'primary') {
      return isHovered ? '0 20px 40px rgba(15,58,125,0.28)' : '0 14px 32px rgba(15,58,125,0.22)';
    }
    if (variant === 'danger') {
      return isHovered ? '0 24px 72px -24px rgba(220, 38, 38, 0.45)' : '0 18px 56px -22px rgba(220, 38, 38, 0.3)';
    }
    return '0 14px 32px rgba(0,0,0,0.12)';
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
