import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  onClick 
}) => {
  return (
    <div 
      className={`
        card-elevated rounded-2xl p-6 hover-glow
        ${hover ? 'glass-morphic-hover cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassContainer: React.FC<GlassContainerProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`card-elevated rounded-3xl p-8 hover-glow ${className}`}>
      {children}
    </div>
  );
};