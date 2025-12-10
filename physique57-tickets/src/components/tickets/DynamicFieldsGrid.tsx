import React from 'react';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number' | 'date' | 'time' | 'email' | 'tel';
  required?: boolean;
  options?: string[];
  placeholder?: string;
  helpText?: string;
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
      number: '🔢',
      date: '📅',
      time: '⏰',
      email: '📧',
      tel: '📞',
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

      default:
        return (
          <div className="relative">
            <input
              type={field.type}
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
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">📝 Category-Specific Details</h2>
        <p className="text-purple-100">Fill in the relevant information below</p>
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
