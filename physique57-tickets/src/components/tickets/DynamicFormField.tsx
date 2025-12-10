import React from 'react';
import { Input, Textarea, Select } from '../ui/Input';

interface DynamicFormFieldProps {
  field: any;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}

export const DynamicFormField: React.FC<DynamicFormFieldProps> = ({
  field,
  value,
  onChange,
  error,
}) => {
  if (field.hidden) return null;

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
      case 'number':
        return (
          <Input
            label={field.label}
            type={field.type}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            error={error}
          />
        );

      case 'textarea':
        return (
          <Textarea
            label={field.label}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            rows={4}
            error={error}
          />
        );

      case 'select':
        return (
          <Select
            label={field.label}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            error={error}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        );

      case 'multiselect':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-dark-900 mb-3">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {field.options?.map((option: string) => {
                const isSelected = Array.isArray(value) && value.includes(option);
                return (
                  <label
                    key={option}
                    className={`flex items-center px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'border-dark-700 bg-dark-50 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-dark-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => {
                        const currentValues = Array.isArray(value) ? value : [];
                        if (e.target.checked) {
                          onChange([...currentValues, option]);
                        } else {
                          onChange(currentValues.filter((v: string) => v !== option));
                        }
                      }}
                      className="w-5 h-5 text-dark-700 border-gray-300 rounded focus:ring-dark-500 focus:ring-offset-0"
                    />
                    <span className="ml-3 text-sm font-medium text-dark-800">{option}</span>
                  </label>
                );
              })}
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-dark-900 mb-3">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {field.options?.map((option: string) => (
                <label
                  key={option}
                  className={`flex items-center px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    value === option
                      ? 'border-dark-700 bg-dark-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-dark-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name={field.key}
                    value={option}
                    checked={value === option}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-5 h-5 text-dark-700 border-gray-300 focus:ring-dark-500 focus:ring-offset-0"
                  />
                  <span className="ml-3 text-sm font-medium text-dark-800">{option}</span>
                </label>
              ))}
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
        );

      case 'date':
        return (
          <Input
            label={field.label}
            type="date"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            error={error}
          />
        );

      case 'datetime':
        return (
          <Input
            label={field.label}
            type="datetime-local"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            error={error}
          />
        );

      case 'file':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-dark-900 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  multiple={field.multiple}
                  onChange={(e) => onChange(e.target.files)}
                />
              </label>
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
        );

      case 'auto':
        // Auto-generated fields like ticket_id - display only
        return null;

      default:
        return (
          <Input
            label={field.label}
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            error={error}
          />
        );
    }
  };

  return (
    <div className="animate-fade-in">
      {renderField()}
      {field.description && (
        <p className="mt-1 text-xs text-gray-500">{field.description}</p>
      )}
    </div>
  );
};
