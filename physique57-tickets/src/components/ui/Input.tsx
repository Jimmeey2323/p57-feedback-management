import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="w-full group">
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-dark-800 mb-2"
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full px-4 py-3
          bg-white/90 border border-white/30 rounded-2xl
          focus:outline-none input-focus
          disabled:bg-gray-100/60 disabled:cursor-not-allowed
          placeholder:text-gray-400 text-dark-900
          transition-all duration-200 hover-glow
          ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : ''}
          ${className}
        `}
        style={{ backdropFilter: 'blur(16px) saturate(120%)', boxShadow: '0 16px 44px -20px rgba(32, 40, 62, 0.18)' }}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600 animate-slide-down">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={inputId}
        className={`
          w-full px-4 py-3 bg-white/90 border rounded-2xl
          focus:outline-none input-focus
          disabled:bg-gray-100/60 disabled:cursor-not-allowed
          ${error ? 'border-red-400' : 'border-white/30'}
          ${className}
        `}
        style={{ backdropFilter: 'blur(16px) saturate(120%)', boxShadow: '0 16px 44px -20px rgba(32, 40, 62, 0.18)' }}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  options,
  className = '',
  id,
  children,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        id={inputId}
        className={`
          w-full px-4 py-3 bg-white/90 border rounded-2xl
          focus:outline-none input-focus
          disabled:bg-gray-100/60 disabled:cursor-not-allowed
          ${error ? 'border-red-400' : 'border-white/30'}
          ${className}
        `}
        style={{ backdropFilter: 'blur(16px) saturate(120%)', boxShadow: '0 16px 44px -20px rgba(32, 40, 62, 0.18)' }}
        {...props}
      >
        {options ? options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        )) : children}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};
