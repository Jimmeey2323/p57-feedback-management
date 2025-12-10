import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/authStore';
import { Category, Subcategory } from '../../types';
import { Button } from '../ui/Button';
import { GlobalFieldsSection } from './GlobalFieldsSection';
import { CustomerSearchWidget } from './CustomerSearchWidget';
import { DynamicFieldsGrid } from './DynamicFieldsGrid';
import { openAIService } from '../../services/openAIService';
import { emailService } from '../../services/emailService';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export const CreateTicketForm: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  const [priority, setPriority] = useState<string>('medium');
  const [formData, setFormData] = useState<Record<string, any>>({
    dateReported: new Date().toISOString(),
    estimatedClosureDate: '',
    studioLocation: '',
    associate: '',
    routingDepartment: '',
    owner: '',
    className: '',
    classDateTime: '',
    classDay: '',
    teacherName: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    momenceCustomerId: '',
    membershipStatus: '',
    totalBookings: 0,
    description: '',
    title: '',
  });
  
  const [dynamicFieldData, setDynamicFieldData] = useState<Record<string, any>>({});
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiTags, setAiTags] = useState<string[]>([]);
  const [aiPriority, setAiPriority] = useState<string>('');

  // Load categories and subcategories
  useEffect(() => {
    loadCategories();
    loadSubcategories();
  }, []);

  // Filter subcategories when category changes
  useEffect(() => {
    if (selectedCategoryId) {
      const filtered = subcategories.filter(
        (sub) => sub.category_id === selectedCategoryId
      );
      setFilteredSubcategories(filtered);
      setSelectedSubcategoryId('');
      setSelectedSubcategory(null);
      setDynamicFieldData({});
      
      // Find selected category
      const category = categories.find(c => c.id === selectedCategoryId);
      setSelectedCategory(category || null);
      
      // Auto-set routing department based on category
      if (category) {
        const departmentMapping: Record<string, string> = {
          'Scheduling': 'Operations',
          'Billing': 'Finance',
          'Class Experience': 'Training',
          'Studio Feedback': 'Facilities',
          'Trainer Related': 'Training',
          'Booking': 'Operations',
          'Safety': 'Management',
          'Product Related': 'Operations',
          'Complaint Escalation': 'Management',
        };
        setFormData(prev => ({
          ...prev,
          routingDepartment: departmentMapping[category.name] || 'Operations',
        }));
      }
    } else {
      setFilteredSubcategories([]);
    }
  }, [selectedCategoryId, subcategories, categories]);

  // Load subcategory details when selected
  useEffect(() => {
    if (selectedSubcategoryId) {
      const subcategory = subcategories.find((sub) => sub.id === selectedSubcategoryId);
      if (subcategory) {
        setSelectedSubcategory(subcategory);
        // Set default priority from subcategory
        if (subcategory.default_priority) {
          setPriority(subcategory.default_priority);
        }
      }
    }
  }, [selectedSubcategoryId, subcategories]);

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
      toast.error('Failed to load categories');
    }
  };

  const loadSubcategories = async () => {
    try {
      const { data, error } = await supabase
        .from('subcategories')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setSubcategories(data || []);
    } catch (error) {
      console.error('Error loading subcategories:', error);
      toast.error('Failed to load subcategories');
    }
  };

  const handleCustomerSelect = (customer: any) => {
    console.log('Customer selected:', customer);
  };

  const handleDescriptionBlur = async () => {
    if (!formData.description || formData.description.length < 10) return;
    
    try {
      const analysis = await openAIService.analyzeTicket({
        title: formData.title,
        description: formData.description,
        category: selectedCategory?.name || '',
        subcategory: selectedSubcategory?.name || '',
        priority,
      });
      
      setAiTags(analysis.suggestedTags);
      setAiPriority(analysis.suggestedPriority);
      
      toast.success('AI analysis complete! Review suggested tags and priority.', {
        duration: 4000,
      });
    } catch (error) {
      console.error('AI analysis failed:', error);
      // Silent fail - don't show error to user
    }
  };

  const renderDynamicField = (field: any) => {
    // Handle both 'key' and 'id' field identifiers
    const fieldKey = field.key || field.id;
    const value = dynamicFormData[fieldKey] || '';

    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
      case 'tel':
      case 'number':
        return (
          <Input
            key={fieldKey}
            label={field.label}
            type={field.type === 'phone' ? 'tel' : field.type}
            value={value}
            onChange={(e) => handleDynamicFieldChange(fieldKey, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        );

      case 'textarea':
        return (
          <Textarea
            key={fieldKey}
            label={field.label}
            value={value}
            onChange={(e) => handleDynamicFieldChange(fieldKey, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            rows={4}
          />
        );

      case 'select':
      case 'dropdown':
        return (
          <Select
            key={fieldKey}
            label={field.label}
            value={value}
            onChange={(e) => handleDynamicFieldChange(fieldKey, e.target.value)}
            required={field.required}
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
          <div key={fieldKey} className="space-y-2">
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
                          handleDynamicFieldChange(fieldKey, [...currentValues, option]);
                        } else {
                          handleDynamicFieldChange(fieldKey, currentValues.filter((v: string) => v !== option));
                        }
                      }}
                      className="w-5 h-5 text-dark-700 border-gray-300 rounded focus:ring-dark-500"
                    />
                    <span className="ml-3 text-sm font-medium text-dark-800">{option}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );

      case 'radio':
        return (
          <div key={fieldKey} className="space-y-2">
            <label className="block text-sm font-semibold text-dark-900 mb-3">
              {field.label} {field.required && <span className="text-red-500 ml-1">*</span>}
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
                    name={fieldKey}
                    value={option}
                    checked={value === option}
                    onChange={(e) => handleDynamicFieldChange(fieldKey, e.target.value)}
                    className="w-5 h-5 text-dark-700 border-gray-300 focus:ring-dark-500"
                    required={field.required}
                  />
                  <span className="ml-3 text-sm font-medium text-dark-800">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'date':
        return (
          <Input
            key={fieldKey}
            label={field.label}
            type="date"
            value={value}
            onChange={(e) => handleDynamicFieldChange(fieldKey, e.target.value)}
            required={field.required}
          />
        );

      case 'datetime':
        return (
          <Input
            key={fieldKey}
            label={field.label}
            type="datetime-local"
            value={value}
            onChange={(e) => handleDynamicFieldChange(fieldKey, e.target.value)}
            required={field.required}
          />
        );

      case 'rating':
        return (
          <div key={fieldKey} className="space-y-2">
            <label className="block text-sm font-semibold text-dark-900 mb-3">
              {field.label} {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="flex space-x-2">
              {Array.from({ length: field.scale || 5 }, (_, i) => i + 1).map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleDynamicFieldChange(fieldKey, rating)}
                  className={`w-12 h-12 rounded-xl border-2 font-semibold transition-all duration-200 ${
                    value === rating
                      ? 'bg-dark-700 border-dark-700 text-white scale-110 shadow-lg'
                      : 'border-gray-300 text-gray-600 hover:border-dark-500 hover:scale-105'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>
        );

      case 'auto':
        // Auto-generated fields like ticket_id - skip rendering
        return null;

      case 'file':
        return (
          <div key={fieldKey} className="space-y-2">
            <label className="block text-sm font-semibold text-dark-900 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  multiple={field.multiple}
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const validateDynamicFields = (): boolean => {
    if (!selectedSubcategory) return true;
    
    // Handle both array formats
    let fields = null;
    if (Array.isArray(selectedSubcategory.form_fields)) {
      fields = selectedSubcategory.form_fields;
    } else if (selectedSubcategory.form_fields?.fields) {
      fields = selectedSubcategory.form_fields.fields;
    }
    
    if (!fields || !Array.isArray(fields)) return true;

    for (const field of fields) {
      const fieldKey = field.key || field.id;
      if (field.required && !dynamicFormData[fieldKey]) {
        toast.error(`${field.label} is required`);
        return false;
      }
    }
    return true;
  };

  const onSubmit = async (data: BaseTicketFormData) => {
    if (!user) {
      toast.error('You must be logged in to create a ticket');
      return;
    }

    if (!validateDynamicFields()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create ticket
      const { data: ticket, error: ticketError } = await supabase
        .from('tickets')
        .insert({
          title: data.title,
          description: data.description,
          category_id: data.category_id,
          subcategory_id: data.subcategory_id,
          priority: data.priority,
          studio_location: data.studio_location,
          customer_name: data.customer_name,
          customer_membership_id: data.customer_membership_id,
          customer_phone: data.customer_phone,
          customer_email: data.customer_email,
          reported_by_user_id: user.id,
          form_data: dynamicFormData,
          status: 'new',
          escalation_level: 0,
          time_spent_minutes: 0,
        })
        .select()
        .single();

      if (ticketError) throw ticketError;

      // Upload attachments if any
      if (uploadedFiles.length > 0 && ticket) {
        const attachmentPromises = uploadedFiles.map((file) =>
          supabase.from('ticket_attachments').insert({
            ticket_id: ticket.id,
            file_name: file.name,
            file_path: file.path,
            uploaded_by_user_id: user.id,
          })
        );

        await Promise.all(attachmentPromises);
      }

      toast.success('Ticket created successfully!');
      navigate('/tickets');
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast.error('Failed to create ticket');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-dark-900 via-dark-800 to-indigo-600 bg-clip-text text-transparent">
            Create New Ticket
          </h2>
          <p className="text-gray-600 mt-2 text-lg">Report a new issue or feedback</p>
        </div>

        {/* Basic Information */}
        <div className="glass-morphic p-8 space-y-6 animate-fade-in">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
            <h3 className="text-xl font-bold text-dark-900">Basic Information</h3>
          </div>

          <Input
            label="Title"
            {...register('title')}
            error={errors.title?.message}
            placeholder="Brief summary of the issue"
            required
          />

          <Textarea
            label="Description"
            {...register('description')}
            placeholder="Detailed description of the issue or feedback"
            rows={4}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Category"
              {...register('category_id')}
              error={errors.category_id?.message}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>

            <Select
              label="Subcategory"
              {...register('subcategory_id')}
              error={errors.subcategory_id?.message}
              disabled={!selectedCategoryId}
              required
            >
              <option value="">Select Subcategory</option>
              {filteredSubcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Priority"
              {...register('priority')}
              error={errors.priority?.message as string}
              required
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🟠 High</option>
              <option value="critical">🔴 Critical</option>
            </Select>

            <Input
              label="Studio Location"
              {...register('studio_location')}
              placeholder="e.g., Mumbai - Bandra"
            />
          </div>
        </div>

        {/* Customer Information */}
        <div className="glass-morphic p-8 space-y-6 animate-fade-in">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-emerald-600 to-teal-600 rounded-full"></div>
            <h3 className="text-xl font-bold text-dark-900">Customer Information</h3>
            <span className="text-sm text-gray-500 ml-2">(Optional)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Customer Name"
              {...register('customer_name')}
              placeholder="Full name"
            />

            <Input
              label="Membership ID"
              {...register('customer_membership_id')}
              placeholder="Membership ID"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Phone"
              {...register('customer_phone')}
              type="tel"
              placeholder="+91 98765 43210"
            />

            <Input
              label="Email"
              {...register('customer_email')}
              type="email"
              error={errors.customer_email?.message as string}
              placeholder="customer@example.com"
            />
          </div>
        </div>

      {/* Dynamic Form Fields */}
      {selectedSubcategory && (() => {
        // Handle both array formats
        let fields = null;
        if (Array.isArray(selectedSubcategory.form_fields)) {
          fields = selectedSubcategory.form_fields;
        } else if (selectedSubcategory.form_fields?.fields) {
          fields = selectedSubcategory.form_fields.fields;
        }
        
        if (!fields || !Array.isArray(fields) || fields.length === 0) return null;
        
        return (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-md border-2 border-blue-200/50 p-8 space-y-6 animate-fade-in">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-dark-900">
                  {selectedSubcategory.name} - Specific Details
                </h3>
                <p className="text-sm text-gray-600 mt-0.5">
                  Please provide additional information specific to this issue type
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {fields.map((field: any) => {
                const fieldKey = field.key || field.id;
                return <div key={fieldKey} className="animate-slide-up">{renderDynamicField(field)}</div>;
              })}
            </div>
          </div>
        );
      })()}

      {/* File Attachments */}
      <div className="glass-morphic p-8 space-y-6 animate-fade-in">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-amber-600 to-orange-600 rounded-full"></div>
          <h3 className="text-xl font-bold text-dark-900">Attachments</h3>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-gradient-to-br from-gray-50 to-white hover:border-indigo-400 hover:bg-indigo-50/30 transition-all duration-300">
          <Upload className="w-14 h-14 text-gray-400 mx-auto mb-4" />
          <label className="cursor-pointer">
            <span className="text-indigo-600 hover:text-indigo-700 font-semibold text-lg">
              Click to upload
            </span>{' '}
            <span className="text-gray-600">or drag and drop</span>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
            />
          </label>
          <p className="text-sm text-gray-500 mt-3 font-medium">
            PNG, JPG, PDF, DOC, XLS up to 10MB each
          </p>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="space-y-3 bg-green-50/50 rounded-xl p-4 border border-green-200">
            <p className="text-sm font-semibold text-green-800">Uploaded Files:</p>
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center space-x-3 text-sm text-gray-700 bg-white px-4 py-2 rounded-lg shadow-sm">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="flex-1 truncate">{file.name}</span>
              </div>
            ))}
          </div>
        )}

        {uploading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <p className="text-sm text-gray-600 mt-2">Uploading files...</p>
          </div>
        )}
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-end space-x-4 pt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate('/tickets')}
          disabled={isSubmitting}
          className="px-8 py-3"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          loading={isSubmitting}
          className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          {isSubmitting ? 'Creating...' : 'Create Ticket'}
        </Button>
      </div>
    </form>
    </div>
  );
};
