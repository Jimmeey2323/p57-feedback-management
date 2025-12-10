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
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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
    if (isAnalyzing) return;
    
    setIsAnalyzing(true);
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
      
      toast.success('✨ AI analysis complete! Review suggested tags and priority.', {
        duration: 4000,
        icon: '🤖',
      });
    } catch (error) {
      console.error('AI analysis failed:', error);
      // Silent fail - don't show error to user
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Parse subcategory form fields
  const getDynamicFields = () => {
    if (!selectedSubcategory) return [];
    
    let fields = null;
    if (Array.isArray(selectedSubcategory.form_fields)) {
      fields = selectedSubcategory.form_fields;
    } else if (selectedSubcategory.form_fields?.fields) {
      fields = selectedSubcategory.form_fields.fields;
    }
    
    if (!fields || !Array.isArray(fields)) return [];
    
    // Transform to DynamicFieldsGrid format
    return fields.map((field: any) => ({
      name: field.key || field.id,
      label: field.label,
      type: field.type,
      required: field.required,
      options: field.options,
      placeholder: field.placeholder,
      helpText: field.help_text,
    }));
  };

  const validateForm = (): boolean => {
    // Validate required global fields
    if (!selectedCategoryId) {
      toast.error('Please select a category');
      return false;
    }
    if (!selectedSubcategoryId) {
      toast.error('Please select a subcategory');
      return false;
    }
    if (!formData.title || formData.title.length < 5) {
      toast.error('Title must be at least 5 characters');
      return false;
    }
    if (!formData.studioLocation) {
      toast.error('Please select a studio location');
      return false;
    }
    if (!formData.associate) {
      toast.error('Please select the reporting associate');
      return false;
    }
    if (!formData.routingDepartment) {
      toast.error('Please select routing department');
      return false;
    }
    if (!formData.owner) {
      toast.error('Please select ticket owner');
      return false;
    }
    if (!priority) {
      toast.error('Please select priority level');
      return false;
    }

    // Validate dynamic fields
    const dynamicFields = getDynamicFields();
    for (const field of dynamicFields) {
      if (field.required && !dynamicFieldData[field.name]) {
        toast.error(`${field.label} is required`);
        return false;
      }
    }

    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be logged in to create a ticket');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare ticket data
      const ticketData = {
        title: formData.title,
        description: formData.description,
        category_id: selectedCategoryId,
        subcategory_id: selectedSubcategoryId,
        priority: priority,
        studio_location: formData.studioLocation,
        reported_by_user_id: user.id,
        form_data: {
          ...dynamicFieldData,
          globalFields: {
            associate: formData.associate,
            routingDepartment: formData.routingDepartment,
            owner: formData.owner,
            className: formData.className,
            classDateTime: formData.classDateTime,
            classDay: formData.classDay,
            teacherName: formData.teacherName,
          },
          customerData: {
            momenceCustomerId: formData.momenceCustomerId,
            customerName: formData.customerName,
            customerEmail: formData.customerEmail,
            customerPhone: formData.customerPhone,
            membershipStatus: formData.membershipStatus,
            totalBookings: formData.totalBookings,
          },
        },
        status: 'new',
        escalation_level: 0,
        time_spent_minutes: 0,
        // AI fields (if available - requires database schema update)
        // tags: aiTags.length > 0 ? aiTags : null,
        // ai_priority: aiPriority || null,
        // estimated_closure_date: formData.estimatedClosureDate,
      };

      // Create ticket
      const { data: ticket, error: ticketError } = await supabase
        .from('tickets')
        .insert(ticketData)
        .select()
        .single();

      if (ticketError) throw ticketError;

      // Send email notifications
      try {
        const recipients = [
          { email: process.env.REACT_APP_NOTIFY_EMAIL || 'admin@physique57.com', name: 'Admin' },
        ];

        await emailService.sendTicketCreatedNotification(
          {
            ticketNumber: ticket.id,
            title: ticket.title,
            description: ticket.description || 'No description provided',
            priority: ticket.priority,
            category: selectedCategory?.name || 'Unknown',
            subcategory: selectedSubcategory?.name || 'Unknown',
            reportedBy: formData.associate,
            studioLocation: formData.studioLocation,
            tags: aiTags,
            createdAt: new Date().toISOString(),
          },
          recipients
        );
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Don't fail ticket creation if email fails
      }

      toast.success('🎉 Ticket created successfully!');
      navigate('/tickets');
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast.error('Failed to create ticket');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine if conditional fields should show (class-related categories)
  const showConditionalFields = selectedCategory?.name === 'Class Experience' || 
                                selectedCategory?.name === 'Scheduling' ||
                                selectedCategory?.name === 'Trainer Related';

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Ticket</h1>
        <p className="text-gray-600">Fill out the form below to submit a new support ticket</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-8">
        {/* Category & Subcategory Selection */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span>🎯</span>
            Select Issue Type
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              >
                <option value="">Select a category...</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subcategory <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedSubcategoryId}
                onChange={(e) => setSelectedSubcategoryId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
                disabled={!selectedCategoryId}
              >
                <option value="">
                  {selectedCategoryId ? 'Select a subcategory...' : 'Select category first'}
                </option>
                {filteredSubcategories.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ticket Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Brief summary of the issue"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
                minLength={5}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center justify-between">
                <span>Description</span>
                {isAnalyzing && (
                  <span className="text-xs text-indigo-600 flex items-center gap-1">
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-indigo-600"></div>
                    Analyzing with AI...
                  </span>
                )}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                onBlur={handleDescriptionBlur}
                placeholder="Provide detailed information about the issue..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              {aiTags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs font-medium text-gray-600">AI Suggested Tags:</span>
                  {aiTags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {aiPriority && aiPriority !== priority && (
                <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    💡 AI suggests <strong>{aiPriority}</strong> priority for this ticket
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Global Fields Section */}
        <GlobalFieldsSection
          selectedCategory={selectedCategory?.name}
          selectedSubcategory={selectedSubcategory?.name}
          priority={priority}
          setPriority={setPriority}
          formData={formData}
          setFormData={setFormData}
          showConditionalFields={showConditionalFields}
        />

        {/* Customer Search Widget */}
        <CustomerSearchWidget
          onCustomerSelect={handleCustomerSelect}
          formData={formData}
          setFormData={setFormData}
        />

        {/* Dynamic Fields Grid */}
        {selectedSubcategory && (
          <DynamicFieldsGrid
            fields={getDynamicFields()}
            formData={dynamicFieldData}
            setFormData={setDynamicFieldData}
          />
        )}

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
            disabled={isSubmitting}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Creating...
              </span>
            ) : (
              'Create Ticket'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
