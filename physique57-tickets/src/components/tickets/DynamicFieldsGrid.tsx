import React from 'react';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'dropdown' | 'number' | 'date' | 'time' | 'datetime' | 'email' | 'tel' | 'checkbox' | 'radio' | 'multiselect' | 'file' | 'readonly';
  required?: boolean;
  options?: string[];
  placeholder?: string;
  helpText?: string;
  description?: string;
}

interface DynamicFieldsGridProps {
  fields: FormField[];
  formData: any;
  setFormData: (data: any) => void;
  errors?: Record<string, string>;
}

export const DynamicFieldsGrid: React.FC<DynamicFieldsGridProps> = ({
  fields,
  formData,
  setFormData,
  errors = {},
}) => {
  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const getFieldIcon = (type: string) => {
    const icons: Record<string, string> = {
      text: '📝',
      textarea: '📄',
      select: '📋',
      dropdown: '📋',
      number: '🔢',
      date: '📅',
      time: '⏰',
      datetime: '🗓️',
      email: '📧',
      tel: '📞',
      checkbox: '☑️',
      radio: '🔘',
      multiselect: '✅',
      file: '📎',
      readonly: '🔒',
    };
    return icons[type] || '📝';
  };

  const renderField = (field: FormField) => {
    const fieldValue = formData[field.name] || '';
    const hasError = errors[field.name];
    const isValid = field.required && fieldValue && !hasError;

    const baseInputClasses = `w-full px-4 py-3 border rounded-lg transition-all focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
      hasError
        ? 'border-red-300 bg-red-50'
        : isValid
        ? 'border-green-300 bg-green-50'
        : 'border-gray-300'
    }`;

    switch (field.type) {
      case 'textarea':
        return (
          <div className="relative">
            <textarea
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              rows={4}
              className={baseInputClasses}
            />
            {isValid && (
              <div className="absolute top-3 right-3 text-green-500">
                ✓
              </div>
            )}
            {hasError && (
              <div className="absolute top-3 right-3 text-red-500">
                ✗
              </div>
            )}
          </div>
        );

      case 'select':
      case 'dropdown':
        return (
          <div className="relative">
            <select
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              required={field.required}
              className={baseInputClasses}
            >
              <option value="">Select {field.label.toLowerCase()}...</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {isValid && (
              <div className="absolute top-3 right-10 text-green-500">
                ✓
              </div>
            )}
            {hasError && (
              <div className="absolute top-3 right-10 text-red-500">
                ✗
              </div>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={fieldValue === true || fieldValue === 'true' || fieldValue === 'Yes'}
              onChange={(e) => handleFieldChange(field.name, e.target.checked)}
              required={field.required}
              className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-600">{field.description || field.placeholder || 'Check if applicable'}</span>
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name={field.name}
                  value={option}
                  checked={fieldValue === option}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  required={field.required}
                  className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'multiselect':
        return (
          <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3">
            {field.options?.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={Array.isArray(fieldValue) && fieldValue.includes(option)}
                  onChange={(e) => {
                    const currentValues = Array.isArray(fieldValue) ? fieldValue : [];
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter((v) => v !== option);
                    handleFieldChange(field.name, newValues);
                  }}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'datetime':
        return (
          <div className="relative">
            <input
              type="datetime-local"
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              required={field.required}
              className={baseInputClasses}
            />
            {isValid && (
              <div className="absolute top-3 right-3 text-green-500">
                ✓
              </div>
            )}
            {hasError && (
              <div className="absolute top-3 right-3 text-red-500">
                ✗
              </div>
            )}
          </div>
        );

      case 'date':
        return (
          <div className="relative">
            <input
              type="date"
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              required={field.required}
              className={baseInputClasses}
            />
            {isValid && (
              <div className="absolute top-3 right-3 text-green-500">
                ✓
              </div>
            )}
            {hasError && (
              <div className="absolute top-3 right-3 text-red-500">
                ✗
              </div>
            )}
          </div>
        );

      case 'time':
        return (
          <div className="relative">
            <input
              type="time"
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              required={field.required}
              className={baseInputClasses}
            />
            {isValid && (
              <div className="absolute top-3 right-3 text-green-500">
                ✓
              </div>
            )}
            {hasError && (
              <div className="absolute top-3 right-3 text-red-500">
                ✗
              </div>
            )}
          </div>
        );

      case 'file':
        return (
          <div className="relative">
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFieldChange(field.name, file);
                }
              }}
              required={field.required}
              className={`${baseInputClasses} file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100`}
            />
          </div>
        );

      case 'readonly':
        return (
          <div className="relative">
            <input
              type="text"
              value={fieldValue}
              readOnly
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>
        );

      case 'number':
        return (
          <div className="relative">
            <input
              type="number"
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              className={baseInputClasses}
            />
            {isValid && (
              <div className="absolute top-3 right-3 text-green-500">
                ✓
              </div>
            )}
            {hasError && (
              <div className="absolute top-3 right-3 text-red-500">
                ✗
              </div>
            )}
          </div>
        );

      case 'email':
        return (
          <div className="relative">
            <input
              type="email"
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              className={baseInputClasses}
            />
            {isValid && (
              <div className="absolute top-3 right-3 text-green-500">
                ✓
              </div>
            )}
            {hasError && (
              <div className="absolute top-3 right-3 text-red-500">
                ✗
              </div>
            )}
          </div>
        );

      case 'tel':
        return (
          <div className="relative">
            <input
              type="tel"
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              className={baseInputClasses}
            />
            {isValid && (
              <div className="absolute top-3 right-3 text-green-500">
                ✓
              </div>
            )}
            {hasError && (
              <div className="absolute top-3 right-3 text-red-500">
                ✗
              </div>
            )}
          </div>
        );

      case 'text':
      default:
        return (
          <div className="relative">
            <input
              type="text"
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              className={baseInputClasses}
            />
            {isValid && (
              <div className="absolute top-3 right-3 text-green-500">
                ✓
              </div>
            )}
            {hasError && (
              <div className="absolute top-3 right-3 text-red-500">
                ✗
              </div>
            )}
          </div>
        );
    }
  };

  // Group fields by type for better layout
  const groupedFields = fields.reduce((acc, field) => {
    const group = field.type === 'textarea' ? 'textarea' : 'other';
    if (!acc[group]) acc[group] = [];
    acc[group].push(field);
    return acc;
  }, {} as Record<string, FormField[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1A4D99] to-[#0F3A7D] rounded-xl p-6 text-white">
        <p className="text-[#E8EAED]">Fill in the relevant information below</p>
      </div>

      {/* Regular Fields Grid */}
      {groupedFields.other && groupedFields.other.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedFields.other.map((field) => (
              <div key={field.name} className="animate-fade-in">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="mr-2">{getFieldIcon(field.type)}</span>
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderField(field)}
                {field.helpText && (
                  <p className="mt-1 text-xs text-gray-500 flex items-center gap-1">
                    <span>ℹ️</span>
                    {field.helpText}
                  </p>
                )}
                {errors[field.name] && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <span>⚠️</span>
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Textarea Fields - Full Width */}
      {groupedFields.textarea && groupedFields.textarea.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm space-y-6">
          {groupedFields.textarea.map((field) => (
            <div key={field.name} className="animate-fade-in">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="mr-2">{getFieldIcon(field.type)}</span>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {renderField(field)}
              {field.helpText && (
                <p className="mt-1 text-xs text-gray-500 flex items-center gap-1">
                  <span>ℹ️</span>
                  {field.helpText}
                </p>
              )}
              {errors[field.name] && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <span>⚠️</span>
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {fields.length === 0 && (
        <div className="bg-gray-50 rounded-xl p-12 text-center border border-gray-200">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No additional fields required
          </h3>
          <p className="text-gray-500">
            This category doesn't require any additional information
          </p>
        </div>
      )}
    </div>
  );
};
