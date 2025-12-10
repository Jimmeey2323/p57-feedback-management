import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: Array<{ value: string; label: string }>;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  options,
  children,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="w-full group">
      {label && (
        <label 
          htmlFor={selectId} 
          className="block text-sm font-medium text-dark-800 mb-2"
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        id={selectId}
        className={`
          w-full px-4 py-3
          bg-white/90 border border-white/20 rounded-xl
          focus:outline-none focus:ring-2 focus:ring-dark-700/20 focus:border-dark-700/30
          disabled:bg-gray-100/50 disabled:cursor-not-allowed
          text-dark-900
          transition-all duration-200
          ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : ''}
          ${className}
        `}
        style={{ backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)' }}
        {...props}
      >
        {options ? (
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        ) : (
          children
        )}
      </select>
      {error && (
        <p className="mt-2 text-sm text-red-600 animate-slide-down">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};