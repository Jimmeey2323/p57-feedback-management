import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/authStore';
import { Category, Subcategory } from '../../types';
import { motion } from 'framer-motion';
import { CustomerSearchWidget } from './CustomerSearchWidget';
import { SessionDetailsWidget } from './SessionDetailsWidget';
import { DynamicFieldsGrid } from './DynamicFieldsGrid';
import toast from 'react-hot-toast';
import { User, Calendar, Briefcase, X, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SectionOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const sectionOptions: SectionOption[] = [
  {
    id: 'member',
    label: 'Customer Details',
    icon: <User className="w-5 h-5" />,
    description: 'Add customer information',
  },
  {
    id: 'session',
    label: 'Session Details',
    icon: <Calendar className="w-5 h-5" />,
    description: 'Link class or session',
  },
  {
    id: 'teacher',
    label: 'Teacher Details',
    icon: <Briefcase className="w-5 h-5" />,
    description: 'Add teacher information',
  },
];

export const CreateTicketFormNew: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  const [priority, setPriority] = useState<string>('medium');
  const [status, setStatus] = useState<string>('open');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>('');
  
  const [formData, setFormData] = useState<Record<string, any>>({
    title: '',
    description: '',
    studioLocation: '',
    associate: '',
    routingDepartment: '',
    owner: '',
    dateReported: new Date().toISOString(),
    estimatedClosureDate: '',
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
  });
  
  const [dynamicFieldData, setDynamicFieldData] = useState<Record<string, any>>({});
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);
  const [showAdditionalSections, setShowAdditionalSections] = useState(false);

  // Department mapping with updated departments
  const departmentMapping: Record<string, string> = {
    'Scheduling': 'Scheduling & Planning',
    'Billing': 'Finance',
    'Class Experience': 'Training',
    'Studio Feedback': 'Studio Operations & Amenities',
    'Trainer Related': 'Training',
    'Booking': 'Scheduling & Planning',
    'Safety': 'Studio Operations & Amenities',
    'Product Related': 'Sales & Client Servicing',
    'Complaint Escalation': 'Sales & Client Servicing',
    'Technical Issues': 'Technical & IT Support',
    'Marketing': 'Marketing & PR',
    'Social Media': 'Social Media',
    'Facilities': 'Repair & Maintenance',
    'Housekeeping': 'Housekeeping Team',
  };

  const ownerMapping: Record<string, string> = {
    'Scheduling': 'Akshay Rane',
    'Billing': 'Vahishta Fitter',
    'Class Experience': 'Zaheer Agarbattiwala',
    'Studio Feedback': 'Zahur Shaikh',
    'Trainer Related': 'Nadiya Shaikh',
    'Booking': 'Akshay Rane',
    'Safety': 'Admin Admin',
    'Product Related': 'Shipra Bhika',
    'Complaint Escalation': 'Admin Admin',
    'Technical Issues': 'Imran Shaikh',
    'Marketing': 'Priyanka Abnave',
    'Social Media': 'Api Serou',
    'Facilities': 'Zahur Shaikh',
    'Housekeeping': 'Manisha Rathod',
  };

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

  const statusOptions = ['open', 'in-progress', 'pending', 'resolved', 'closed'];

  useEffect(() => {
    loadCategories();
    loadSubcategories();
    
    // Auto-fill reporting associate with signed-in user's name
    if (user?.full_name) {
      setFormData(prev => ({
        ...prev,
        associate: user.full_name,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (selectedCategoryId) {
      const filtered = subcategories.filter(
        (sub) => sub.category_id === selectedCategoryId
      );
      setFilteredSubcategories(filtered);
      setSelectedSubcategoryId('');
      setSelectedSubcategory(null);
      setDynamicFieldData({});
      
      const category = categories.find(c => c.id === selectedCategoryId);
      setSelectedCategory(category || null);
      
      if (category) {
        setFormData(prev => ({
          ...prev,
          routingDepartment: departmentMapping[category.name] || 'Sales & Client Servicing',
          owner: ownerMapping[category.name] || 'Admin Admin',
        }));
      }
    } else {
      setFilteredSubcategories([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategoryId, subcategories, categories]);

  useEffect(() => {
    if (selectedSubcategoryId) {
      const subcategory = subcategories.find((sub) => sub.id === selectedSubcategoryId);
      if (subcategory) {
        setSelectedSubcategory(subcategory);
        if (subcategory.default_priority) {
          setPriority(subcategory.default_priority);
        }
        generateTitleSuggestions();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubcategoryId, subcategories]);

  const generateTitleSuggestions = async () => {
    if (!selectedCategory || !selectedSubcategory) return;
    
    try {
      const suggestions = [
        `${selectedSubcategory.name} - ${selectedCategory.name}`,
        `Issue with ${selectedSubcategory.name}`,
        `${selectedCategory.name}: ${selectedSubcategory.name} Request`,
        `${formData.studioLocation ? formData.studioLocation + ' - ' : ''}${selectedSubcategory.name}`,
        `${selectedSubcategory.name} Support Needed`,
      ];
      setTitleSuggestions(suggestions.filter(s => s.trim()));
    } catch (error) {
      console.error('Error generating title suggestions:', error);
    }
  };

  const enhanceTagsWithAI = async () => {
    try {
      const suggestedTags = [];
      
      if (selectedCategory) suggestedTags.push(selectedCategory.name.toLowerCase());
      if (selectedSubcategory) suggestedTags.push(selectedSubcategory.name.toLowerCase());
      if (formData.studioLocation) suggestedTags.push(formData.studioLocation.toLowerCase());
      if (priority === 'urgent' || priority === 'high') suggestedTags.push(priority);
      
      const uniqueTags = Array.from(new Set([...tags, ...suggestedTags]));
      setTags(uniqueTags);
      toast.success('Tags enhanced with AI suggestions');
    } catch (error) {
      console.error('Error enhancing tags:', error);
    }
  };

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

  const toggleSection = (sectionId: string) => {
    setSelectedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const getDynamicFields = () => {
    if (!selectedSubcategory) {
      console.log('❌ No subcategory selected');
      return [];
    }
    
    console.log('🔍 Checking fields for subcategory:', selectedSubcategory.name);
    console.log('📋 Raw form_fields data:', selectedSubcategory.form_fields);
    console.log('📋 Type of form_fields:', typeof selectedSubcategory.form_fields);
    
    let fields = null;
    
    // Handle different data structures
    if (typeof selectedSubcategory.form_fields === 'string') {
      try {
        const parsed = JSON.parse(selectedSubcategory.form_fields);
        fields = Array.isArray(parsed) ? parsed : parsed.fields;
        console.log('✅ Parsed string form_fields:', fields);
      } catch (e) {
        console.error('❌ Error parsing form_fields string:', e);
        return [];
      }
    } else if (Array.isArray(selectedSubcategory.form_fields)) {
      fields = selectedSubcategory.form_fields;
      console.log('✅ Using array form_fields:', fields);
    } else if (selectedSubcategory.form_fields?.fields) {
      fields = selectedSubcategory.form_fields.fields;
      console.log('✅ Using nested fields:', fields);
    } else if (selectedSubcategory.form_fields && typeof selectedSubcategory.form_fields === 'object') {
      // Try to extract fields from object
      fields = selectedSubcategory.form_fields.fields || selectedSubcategory.form_fields;
      console.log('✅ Extracted from object:', fields);
    }
    
    if (!fields || !Array.isArray(fields)) {
      console.log('⚠️ No fields array found for subcategory:', selectedSubcategory.name);
      console.log('⚠️ form_fields structure:', JSON.stringify(selectedSubcategory.form_fields, null, 2));
      return [];
    }
    
    console.log(`✅ Processing ${fields.length} fields for ${selectedSubcategory.name}`);
    
    const mappedFields = fields.map((field: any) => ({
      name: field.key || field.id || field.name,
      label: field.label || field.name,
      type: field.type || 'text',
      required: field.required || false,
      options: field.options,
      placeholder: field.placeholder,
      helpText: field.help_text || field.helpText || field.description,
      description: field.description,
    }));
    
    console.log('✅ Mapped fields:', mappedFields);
    return mappedFields;
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error('You must be logged in to create a ticket');
      return;
    }

    setIsSubmitting(true);

    try {
      const ticketData = {
        title: formData.title,
        description: formData.description,
        category_id: selectedCategoryId,
        subcategory_id: selectedSubcategoryId,
        studio_location: formData.studioLocation,
        priority,
        status,
        reported_by_user_id: user.id,
        assigned_to_user_id: null,
        customer_name: formData.customerName,
        customer_phone: formData.customerPhone,
        customer_email: formData.customerEmail,
        customer_membership_id: formData.momenceCustomerId,
        metadata: {
          tags,
          dynamicFields: dynamicFieldData,
          routingDepartment: formData.routingDepartment,
          owner: formData.owner,
          associate: formData.associate,
        },
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('tickets')
        .insert([ticketData]);

      if (error) throw error;

      // Celebrate with confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      toast.success('Ticket created successfully!');
      
      setTimeout(() => {
        navigate('/tickets');
      }, 1500);
    } catch (error: any) {
      console.error('Error creating ticket:', error);
      toast.error(error.message || 'Failed to create ticket');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-4xl font-bold text-gray-900" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Create New Ticket
          </h1>
          <p className="text-gray-600 mt-2 text-lg" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Fill in the details below to submit a new support ticket
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-gray-100 rounded-2xl shadow-xl p-8">
          
          {/* Basic Information Section */}
          <div className="mb-8 bg-white rounded-xl overflow-hidden shadow-md">
            <div className="bg-gradient-to-r from-black to-[#0041a8] px-6 py-4">
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Basic Information
              </h2>
            </div>
            <div className="p-6 space-y-6">
              {/* Title with AI Suggestions */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-gray-900"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  placeholder="Brief title for the ticket"
                />
                
                {/* Title Suggestions */}
                {titleSuggestions.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs font-semibold text-gray-600 flex items-center gap-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      <Sparkles className="w-4 h-4" /> AI Suggestions:
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {titleSuggestions.slice(0, 3).map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setFormData({ ...formData, title: suggestion })}
                          className="text-left px-3 py-2 text-sm bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-400 transition-all"
                          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Category and Subcategory - 2 Column */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Category
                  </label>
                  <select
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-gray-900"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    <option value="">Select category...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Sub Category
                  </label>
                  <select
                    value={selectedSubcategoryId}
                    onChange={(e) => setSelectedSubcategoryId(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-gray-900"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    disabled={!selectedCategoryId}
                  >
                    <option value="">Select subcategory...</option>
                    {filteredSubcategories.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Priority and Status - 2 Column */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-gray-900"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-gray-900"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    {statusOptions.map((stat) => (
                      <option key={stat} value={stat}>
                        {stat.charAt(0).toUpperCase() + stat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Tags
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-gray-900"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    placeholder="Add a tag and press Enter"
                  />
                  <button
                    onClick={addTag}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-medium"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    Add
                  </button>
                  <button
                    onClick={enhanceTagsWithAI}
                    className="px-4 py-2 bg-gradient-to-r from-black to-[#0041a8] text-white rounded-lg hover:opacity-90 transition-all font-medium flex items-center gap-2"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    <Sparkles className="w-4 h-4" /> AI Enhance
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center gap-2"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    >
                      {tag}
                      <X
                        className="w-4 h-4 cursor-pointer hover:text-blue-600"
                        onClick={() => removeTag(tag)}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Assignment & Location Section */}
          <div className="mb-8 bg-white rounded-xl overflow-hidden shadow-md">
            <div className="bg-gradient-to-r from-black to-[#0041a8] px-6 py-4">
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Assignment & Location
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Studio Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Studio Location
                  </label>
                  <select
                    value={formData.studioLocation}
                    onChange={(e) => setFormData({ ...formData, studioLocation: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-gray-900"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    <option value="">Select location...</option>
                    {studioLocations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Reporting Associate (Read-only, auto-filled) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Reporting Associate
                  </label>
                  <input
                    type="text"
                    value={formData.associate}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  />
                </div>

                {/* Routing Department (Auto-populated) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Routing Department
                  </label>
                  <input
                    type="text"
                    value={formData.routingDepartment}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  />
                </div>

                {/* Owner/Assignee (Auto-populated but editable) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Assignee/Owner
                  </label>
                  <select
                    value={formData.owner}
                    onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-gray-900"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    <option value="">Select owner...</option>
                    {associates.map((assoc) => (
                      <option key={assoc} value={assoc}>
                        {assoc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="mb-8 bg-white rounded-xl overflow-hidden shadow-md">
            <div className="bg-gradient-to-r from-black to-[#0041a8] px-6 py-4">
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Description
              </h2>
            </div>
            <div className="p-6">
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-gray-900"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                rows={6}
                placeholder="Provide a detailed description of the issue..."
              />
            </div>
          </div>

          {/* Subcategory-Specific Fields */}
          {selectedSubcategory && (
            <div className="mb-8 bg-white rounded-xl overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-black to-[#0041a8] px-6 py-4">
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Additional Information
                </h2>
              </div>
              <div className="p-6">
                {getDynamicFields().length > 0 ? (
                  <DynamicFieldsGrid
                    fields={getDynamicFields()}
                    formData={dynamicFieldData}
                    setFormData={setDynamicFieldData}
                  />
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                      <div className="text-yellow-600 text-lg font-semibold mb-2">
                        ⚠️ No Additional Fields Configured
                      </div>
                      <p className="text-gray-600 mb-4">
                        The database needs to be updated with form fields for this subcategory.
                      </p>
                      <div className="text-sm text-gray-500 text-left bg-white p-4 rounded border border-gray-200">
                        <p className="font-semibold mb-2">To add fields:</p>
                        <ol className="list-decimal list-inside space-y-1">
                          <li>Open Supabase SQL Editor</li>
                          <li>Run the file: <code className="bg-gray-100 px-2 py-1 rounded">update_subcategory_fields.sql</code></li>
                          <li>Refresh this page</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Additional Details Section */}
          <div className="mb-8 bg-white rounded-xl overflow-hidden shadow-md">
            <button
              onClick={() => setShowAdditionalSections(!showAdditionalSections)}
              className="w-full bg-gradient-to-r from-black to-[#0041a8] px-6 py-4 flex items-center justify-between hover:opacity-90 transition-all"
            >
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Additional Details (Optional)
              </h2>
              {showAdditionalSections ? (
                <ChevronUp className="w-6 h-6 text-white" />
              ) : (
                <ChevronDown className="w-6 h-6 text-white" />
              )}
            </button>
            
            {showAdditionalSections && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {sectionOptions.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => toggleSection(section.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedSections.includes(section.id)
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 bg-white hover:border-blue-400'
                      }`}
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={selectedSections.includes(section.id) ? 'text-blue-600' : 'text-gray-600'}>
                          {section.icon}
                        </div>
                        <div className="text-left flex-1">
                          <h4 className="font-semibold text-sm text-gray-900">{section.label}</h4>
                          <p className="text-xs text-gray-500">{section.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Render selected sections */}
                <div className="space-y-6">
                  {selectedSections.includes('member') && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                          Customer Details
                        </h3>
                        <button
                          onClick={() => toggleSection('member')}
                          className="text-red-500 hover:text-red-700 font-medium text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      <CustomerSearchWidget
                        formData={formData}
                        setFormData={setFormData}
                        onCustomerSelect={(customer) => {
                          console.log('Customer selected:', customer);
                        }}
                      />
                    </motion.div>
                  )}

                  {selectedSections.includes('session') && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-amber-50 rounded-lg border border-amber-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                          Session Details
                        </h3>
                        <button
                          onClick={() => toggleSection('session')}
                          className="text-red-500 hover:text-red-700 font-medium text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      <SessionDetailsWidget />
                    </motion.div>
                  )}

                  {selectedSections.includes('teacher') && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-rose-50 rounded-lg border border-rose-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                          Teacher Details
                        </h3>
                        <button
                          onClick={() => toggleSection('teacher')}
                          className="text-red-500 hover:text-red-700 font-medium text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                          Teacher Name
                        </label>
                        <input
                          type="text"
                          value={formData.teacherName}
                          onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                          placeholder="Enter teacher name"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => navigate('/tickets')}
              className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-semibold text-lg"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-black to-[#0041a8] text-white rounded-lg hover:opacity-90 transition-all font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              {isSubmitting ? 'Creating...' : 'Create Ticket'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
