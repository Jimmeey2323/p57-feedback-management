import React, { useEffect, useState } from 'react';
import { openAIService } from '../../services/openAIService';

interface GlobalFieldsSectionProps {
  selectedCategory?: string;
  selectedSubcategory?: string;
  priority: string;
  setPriority: (priority: string) => void;
  formData: any;
  setFormData: (data: any) => void;
  showConditionalFields: boolean;
}

export const GlobalFieldsSection: React.FC<GlobalFieldsSectionProps> = ({
  selectedCategory,
  selectedSubcategory,
  priority,
  setPriority,
  formData,
  setFormData,
  showConditionalFields,
}) => {
  const [estimatedClosure, setEstimatedClosure] = useState<Date | null>(null);

  useEffect(() => {
    // Auto-fill date reported once on mount using functional update
    setFormData((prev: any) => {
      if (prev && prev.dateReported) return prev;
      return {
        ...(prev || {}),
        dateReported: new Date().toISOString(),
      };
    });
  }, [setFormData]);

  useEffect(() => {
    // Calculate estimated closure date when priority changes
    if (priority) {
      const closureDate = openAIService.calculateEstimatedClosureDate(
        priority,
        formData.dateReported ? new Date(formData.dateReported) : new Date()
      );
      setEstimatedClosure(closureDate);
      setFormData((prev: any) => ({ ...(prev || {}), estimatedClosureDate: closureDate.toISOString() }));
    }
  }, [priority, formData.dateReported, setFormData]);

  const studioLocations = [
    'Kwality House Kemps Corner',
    'Kenkre House',
    'South United Football Club',
    'Supreme HQ Bandra',
    'WeWork Prestige Central',
    'WeWork Galaxy',
    'The Studio by Copper + Cloves',
    'Pop-up',
  ];

  const associates = [
    'Akshay Rane',
    'Vahishta Fitter',
    'Zaheer Agarbattiwala',
    'Zahur Shaikh',
    'Nadiya Shaikh',
    'Admin Admin',
    'Shipra Bhika',
    'Imran Shaikh',
    'Tahira Sayyed',
    'Manisha Rathod',
    'Sheetal Kataria',
    'Priyanka Abnave',
    'Api Serou',
    'Prathap Kp',
    'Pavanthika',
    'Santhosh Kumar',
  ];

  const departments = [
    'Operations',
    'Facilities',
    'Training',
    'Sales',
    'Client Success',
    'Marketing',
    'Finance',
    'Management',
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low (log only)', color: 'bg-gray-100 text-gray-800' },
    { value: 'medium', label: 'Medium (48hrs)', color: 'bg-blue-100 text-blue-800' },
    { value: 'high', label: 'High (24hrs)', color: 'bg-orange-100 text-orange-800' },
    { value: 'critical', label: 'Critical (immediate)', color: 'bg-red-100 text-red-800' },
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">📋 Ticket Information</h2>
        <p className="text-indigo-100">Global fields for all tickets</p>
      </div>

      {/* Auto-filled Fields */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-sm font-semibold text-indigo-900 uppercase tracking-wide mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
          Auto-Generated Fields
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date Reported */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📅 Date & Time Reported
            </label>
            <input
              type="text"
              value={formatDate(new Date(formData.dateReported || Date.now()))}
              disabled
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Estimated Closure */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ⏰ Estimated Closure Date
            </label>
            <input
              type="text"
              value={estimatedClosure ? formatDate(estimatedClosure) : 'Set priority first'}
              disabled
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Required Fields */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
          Required Information <span className="text-red-500">*</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Studio Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🏢 Studio Location <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.studioLocation || ''}
              onChange={(e) => setFormData({ ...formData, studioLocation: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              required
            >
              <option value="">Select location...</option>
              {studioLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Associate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              👤 Reported By (Associate) <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.associate || ''}
              onChange={(e) => setFormData({ ...formData, associate: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              required
            >
              <option value="">Select associate...</option>
              {associates.map((associate) => (
                <option key={associate} value={associate}>
                  {associate}
                </option>
              ))}
            </select>
          </div>

          {/* Routing Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🎯 Routing Department <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.routingDepartment || ''}
              onChange={(e) => setFormData({ ...formData, routingDepartment: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              required
            >
              <option value="">Select department...</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Owner */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              👨‍💼 Owner (Assigned To) <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.owner || ''}
              onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              required
            >
              <option value="">Select owner...</option>
              {associates.map((associate) => (
                <option key={associate} value={associate}>
                  {associate}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              ⚡ Priority Level <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {priorityOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPriority(option.value)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                    priority === option.value
                      ? option.color + ' ring-2 ring-offset-2 ring-indigo-500'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conditional Fields (for class-related issues) */}
      {showConditionalFields && (
        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200 animate-slide-down">
          <h3 className="text-sm font-semibold text-yellow-900 uppercase tracking-wide mb-4 flex items-center gap-2">
            <span>🏋️</span>
            Class Information
            <span className="text-xs font-normal text-yellow-700">(Optional for this category)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Class Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class Name
              </label>
              <input
                type="text"
                value={formData.className || ''}
                onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                placeholder="e.g., Studio Barre 57"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            {/* Class Date & Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class Date & Time
              </label>
              <input
                type="datetime-local"
                value={formData.classDateTime || ''}
                onChange={(e) => setFormData({ ...formData, classDateTime: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            {/* Class Day */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class Day
              </label>
              <select
                value={formData.classDay || ''}
                onChange={(e) => setFormData({ ...formData, classDay: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Select day...</option>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            {/* Teacher Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teacher Name
              </label>
              <input
                type="text"
                value={formData.teacherName || ''}
                onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                placeholder="Instructor name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
