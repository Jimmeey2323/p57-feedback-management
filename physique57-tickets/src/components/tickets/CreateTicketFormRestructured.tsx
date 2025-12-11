import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/authStore';
import { Category, Subcategory } from '../../types';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomerSearchWidget } from './CustomerSearchWidget';
import { SessionDetailsWidget } from './SessionDetailsWidget';
import { DynamicFieldsGrid } from './DynamicFieldsGrid';
import { GlobalFieldsSection } from './GlobalFieldsSection';
import toast from 'react-hot-toast';
import { User, Calendar, Briefcase, Check, Edit2, X, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

type FormStep = 'basic' | 'details' | 'preview';

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
    icon: <User className="w-6 h-6" />,
    description: 'Add customer information',
  },
  {
    id: 'session',
    label: 'Session Details',
    icon: <Calendar className="w-6 h-6" />,
    description: 'Link class or session',
  },
  {
    id: 'teacher',
    label: 'Teacher Details',
    icon: <Briefcase className="w-6 h-6" />,
    description: 'Add teacher information',
  },
];

export const CreateTicketFormRestructured: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  const [currentStep, setCurrentStep] = useState<FormStep>('basic');
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
    subject: '',
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
  const [isGeneratingTitles, setIsGeneratingTitles] = useState(false);

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
        };
        
        setFormData(prev => ({
          ...prev,
          routingDepartment: departmentMapping[category.name] || 'Operations',
          owner: ownerMapping[category.name] || 'Admin Admin',
        }));
      }
    } else {
      setFilteredSubcategories([]);
    }
  }, [selectedCategoryId, subcategories, categories]);

  useEffect(() => {
    if (selectedSubcategoryId) {
      const subcategory = subcategories.find((sub) => sub.id === selectedSubcategoryId);
      if (subcategory) {
        setSelectedSubcategory(subcategory);
        if (subcategory.default_priority) {
          setPriority(subcategory.default_priority);
        }
        // Generate title suggestions when subcategory is selected
        generateTitleSuggestions();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubcategoryId, subcategories]);

  const generateTitleSuggestions = async () => {
    if (!selectedCategory || !selectedSubcategory) return;
    
    setIsGeneratingTitles(true);
    try {
      const suggestions = [
        `${selectedSubcategory.name} - ${selectedCategory.name}`,
        `Issue with ${selectedSubcategory.name}`,
        `${selectedCategory.name}: ${selectedSubcategory.name} Problem`,
        `Urgent: ${selectedSubcategory.name}`,
        `${formData.studioLocation} - ${selectedSubcategory.name}`,
      ];
      setTitleSuggestions(suggestions);
    } catch (error) {
      console.error('Error generating title suggestions:', error);
    } finally {
      setIsGeneratingTitles(false);
    }
  };

  const enhanceTagsWithAI = async () => {
    if (!formData.description && !formData.subject) return;
    
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

  const getStepNumber = (): number => {
    const steps: FormStep[] = ['basic', 'details', 'preview'];
    return steps.indexOf(currentStep) + 1;
  };

  const getTotalSteps = (): number => {
    return 3;
  };

  const getProgressPercentage = (): number => {
    return (getStepNumber() / getTotalSteps()) * 100;
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

  const handleNext = () => {
    if (currentStep === 'basic') {
      // Validation temporarily disabled for development
      // if (!formData.title || !formData.associate || !selectedCategoryId || !selectedSubcategoryId || !formData.studioLocation || !formData.owner) {
      //   toast.error('Please fill in all required basic fields');
      //   return;
      // }
      setCurrentStep('details');
    } else if (currentStep === 'details') {
      setCurrentStep('preview');
    }
  };

  const handleBack = () => {
    if (currentStep === 'details') {
      setCurrentStep('basic');
    } else if (currentStep === 'preview') {
      setCurrentStep('details');
    }
  };

  const handleEdit = () => {
    setCurrentStep('basic');
  };

  const handleDiscard = () => {
    if (window.confirm('Are you sure you want to discard this ticket? All data will be lost.')) {
      navigate('/tickets');
    }
  };

  const getDynamicFields = () => {
    if (!selectedSubcategory) return [];
    
    let fields = null;
    
    // Check if form_fields is a string that needs to be parsed
    if (typeof selectedSubcategory.form_fields === 'string') {
      try {
        const parsed = JSON.parse(selectedSubcategory.form_fields);
        fields = Array.isArray(parsed) ? parsed : parsed.fields;
      } catch (e) {
        console.error('Error parsing form_fields:', e);
        return [];
      }
    } else if (Array.isArray(selectedSubcategory.form_fields)) {
      fields = selectedSubcategory.form_fields;
    } else if (selectedSubcategory.form_fields?.fields) {
      fields = selectedSubcategory.form_fields.fields;
    }
    
    if (!fields || !Array.isArray(fields)) {
      console.log('No dynamic fields found for subcategory:', selectedSubcategory.name);
      return [];
    }
    
    console.log('Dynamic fields found:', fields);
    
    return fields.map((field: any) => ({
      name: field.key || field.id,
      label: field.label,
      type: field.type,
      required: field.required,
      options: field.options,
      placeholder: field.placeholder,
      helpText: field.help_text || field.helpText,
    }));
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
        description: formData.description || formData.subject,
        category_id: selectedCategoryId,
        subcategory_id: selectedSubcategoryId,
        priority: priority,
        studio_location: formData.studioLocation,
        reported_by_user_id: user.id,
        status: status,
        tags: tags,
        form_data: {
          ...dynamicFieldData,
          globalFields: {
            associate: formData.associate,
            routingDepartment: formData.routingDepartment,
            owner: formData.owner,
            dateReported: formData.dateReported,
            estimatedClosureDate: formData.estimatedClosureDate,
            subject: formData.subject,
          },
          customerInfo: selectedSections.includes('member') ? {
            name: formData.customerName,
            email: formData.customerEmail,
            phone: formData.customerPhone,
            momenceId: formData.momenceCustomerId,
            membershipStatus: formData.membershipStatus,
            totalBookings: formData.totalBookings,
          } : null,
          sessionInfo: selectedSections.includes('session') ? {
            className: formData.className,
            classDateTime: formData.classDateTime,
            classDay: formData.classDay,
          } : null,
          teacherInfo: selectedSections.includes('teacher') ? {
            teacherName: formData.teacherName,
          } : null,
        },
      };

      const { error } = await supabase
        .from('tickets')
        .insert([ticketData])
        .select()
        .single();

      if (error) throw error;

      // Trigger confetti
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      toast.success('Ticket created successfully! 🎉');
      
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

  const statusOptions = ['open', 'in-progress', 'pending', 'resolved', 'closed'];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-10 p-6 bg-white/10 backdrop-blur-lg rounded-2xl border-2 border-white/20 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-white drop-shadow-lg">
            Step {getStepNumber()} of {getTotalSteps()}
          </span>
          <span className="text-lg font-bold text-white drop-shadow-lg">
            {Math.round(getProgressPercentage())}% Complete
          </span>
        </div>
        <div className="w-full h-4 bg-black/30 rounded-full overflow-hidden shadow-inner border-2 border-white/30">
          <motion.div
            className="h-full bg-gradient-to-r from-white via-blue-100 to-white shadow-lg"
            initial={{ width: 0 }}
            animate={{ width: `${getProgressPercentage()}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        {currentStep === 'basic' && (
          <motion.div
            key="basic"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl p-10 border-4 border-white/20"
          >
            <h2 className="text-4xl font-bold mb-10 bg-gradient-primary text-white p-6 rounded-2xl -mx-10 -mt-10 shadow-2xl flex items-center gap-3">
              <FileText className="w-8 h-8" />
              Basic Information
            </h2>
            
            <div className="space-y-6 mt-8">
              {/* Title with AI Suggestions */}
              <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 shadow-md">
                <label className="block text-sm font-bold text-gray-800 mb-3">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-md bg-white text-gray-800 font-medium"
                  placeholder="Brief title for the ticket"
                />
                
                {/* Title Suggestions */}
                {isGeneratingTitles ? (
                  <div className="mt-3 text-center text-sm text-gray-600">
                    <span className="animate-pulse">✨ Generating suggestions...</span>
                  </div>
                ) : titleSuggestions.length > 0 ? (
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-gray-600 mb-2">💡 AI Suggestions:</p>
                    <div className="space-y-1">
                      {titleSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setFormData({ ...formData, title: suggestion })}
                          className="w-full text-left px-3 py-2 text-sm bg-white border border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-all"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              {/* 2-Column Grid for paired fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    className="w-full px-4 py-3 border-3 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-lg"
                  >
                    <option value="">Select category...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sub Category */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Sub Category</label>
                  <select
                    value={selectedSubcategoryId}
                    onChange={(e) => setSelectedSubcategoryId(e.target.value)}
                    className="w-full px-4 py-3 border-3 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-lg"
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

                {/* Priority */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-4 py-3 border-3 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-lg"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-3 border-3 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-lg"
                  >
                    {statusOptions.map((stat) => (
                      <option key={stat} value={stat}>
                        {stat.charAt(0).toUpperCase() + stat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tags with AI Enhancement */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Tags</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 px-4 py-2 border-3 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-lg"
                    placeholder="Add a tag and press Enter"
                  />
                  <Button variant="secondary" onClick={addTag}>
                    Add
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={enhanceTagsWithAI}
                    className="whitespace-nowrap"
                  >
                    ✨ AI Enhance
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center gap-2"
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

              {/* Subject - Full Width */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border-3 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-lg"
                  placeholder="Brief subject line"
                />
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <Button variant="primary" onClick={handleNext}>
                Next →
              </Button>
            </div>
          </motion.div>
        )}

        {currentStep === 'details' && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-white/20"
          >
            <h2 className="text-3xl font-bold mb-8 bg-gradient-primary text-white p-6 rounded-2xl -mx-8 -mt-8 shadow-2xl">
              Additional Details
            </h2>

            {/* Add Additional Sections Buttons */}
            <div className="mb-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200 shadow-inner">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-gradient-primary text-white p-2 rounded-lg">+</span>
                Add Additional Sections (Optional)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {sectionOptions.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => toggleSection(section.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      selectedSections.includes(section.id)
                        ? 'border-blue-600 bg-gradient-primary text-white shadow-xl scale-105'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`${selectedSections.includes(section.id) ? 'text-white' : 'text-blue-600'}`}>
                        {section.icon}
                      </div>
                      <div className="text-left flex-1">
                        <h4 className="font-bold text-sm">{section.label}</h4>
                        <p className={`text-xs ${selectedSections.includes(section.id) ? 'text-white/80' : 'text-gray-500'}`}>
                          {section.description}
                        </p>
                      </div>
                      {selectedSections.includes(section.id) && (
                        <Check className="w-5 h-5" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              {/* Description */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-100 shadow-lg">
                <label className="block text-sm font-bold text-gray-800 mb-3">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-md bg-white"
                  rows={5}
                  placeholder="Provide a detailed description of the issue..."
                />
              </div>

              {/* Global Fields Section */}
              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-100 shadow-lg">
                <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-purple-600" />
                  Global Fields
                </h3>
                <GlobalFieldsSection
                  selectedCategory={selectedCategory?.name}
                  selectedSubcategory={selectedSubcategory?.name}
                  priority={priority}
                  setPriority={setPriority}
                  formData={formData}
                  setFormData={setFormData}
                  showConditionalFields={true}
                />
              </div>

              {/* Subcategory-Specific Fields */}
              {getDynamicFields().length > 0 && (
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-100 shadow-lg">
                  <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-green-600" />
                    Subcategory-Specific Fields
                  </h3>
                  <DynamicFieldsGrid
                    fields={getDynamicFields()}
                    formData={dynamicFieldData}
                    setFormData={setDynamicFieldData}
                  />
                </div>
              )}

              {/* Additional Sections */}
              {selectedSections.includes('member') && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <User className="w-6 h-6 text-blue-600" />
                      Customer Details
                    </h3>
                    <button
                      onClick={() => toggleSection('member')}
                      className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
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
                  exit={{ opacity: 0, y: -20 }}
                  className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <Calendar className="w-6 h-6 text-amber-600" />
                      Session Details
                    </h3>
                    <button
                      onClick={() => toggleSection('session')}
                      className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
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
                  exit={{ opacity: 0, y: -20 }}
                  className="p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl border-2 border-rose-200 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <Briefcase className="w-6 h-6 text-rose-600" />
                      Teacher Details
                    </h3>
                    <button
                      onClick={() => toggleSection('teacher')}
                      className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    value={formData.teacherName}
                    onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-600 focus:border-rose-600 transition-all shadow-md bg-white"
                    placeholder="Enter teacher name"
                  />
                </motion.div>
              )}
            </div>

            <div className="flex justify-between mt-8">
              <Button variant="secondary" onClick={handleBack}>
                ← Back
              </Button>
              <Button variant="primary" onClick={handleNext}>
                Preview →
              </Button>
            </div>
          </motion.div>
        )}

        {currentStep === 'preview' && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-gray-200"
          >
            <h2 className="text-3xl font-bold mb-6 bg-gradient-primary text-white p-4 rounded-xl -mx-8 -mt-8 mb-8 flex items-center justify-between">
              <span>Review & Submit</span>
              <FileText className="w-8 h-8" />
            </h2>
            
            <div className="space-y-6 mb-8">
              {/* Basic Info */}
              <div className="p-6 bg-gradient-primary text-white rounded-xl border-2 shadow-xl">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="opacity-80">Title:</p>
                    <p className="font-bold">{formData.title}</p>
                  </div>
                  <div>
                    <p className="opacity-80">Associate:</p>
                    <p className="font-bold">{formData.associate}</p>
                  </div>
                  <div>
                    <p className="opacity-80">Category:</p>
                    <p className="font-bold">{selectedCategory?.name}</p>
                  </div>
                  <div>
                    <p className="opacity-80">Subcategory:</p>
                    <p className="font-bold">{selectedSubcategory?.name}</p>
                  </div>
                  <div>
                    <p className="opacity-80">Priority:</p>
                    <p className="font-bold uppercase">{priority}</p>
                  </div>
                  <div>
                    <p className="opacity-80">Status:</p>
                    <p className="font-bold uppercase">{status}</p>
                  </div>
                  <div>
                    <p className="opacity-80">Location:</p>
                    <p className="font-bold">{formData.studioLocation}</p>
                  </div>
                  <div>
                    <p className="opacity-80">Owner:</p>
                    <p className="font-bold">{formData.owner}</p>
                  </div>
                </div>
                {tags.length > 0 && (
                  <div className="mt-4">
                    <p className="opacity-80 mb-2">Tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {formData.description && (
                <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200 shadow-inner">
                  <h3 className="font-bold text-lg mb-2">Description</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{formData.description}</p>
                </div>
              )}

              {selectedSections.length > 0 && (
                <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200 shadow-inner">
                  <h3 className="font-bold text-lg mb-2">Additional Sections Included</h3>
                  <ul className="space-y-2">
                    {selectedSections.map(sectionId => {
                      const section = sectionOptions.find(s => s.id === sectionId);
                      return (
                        <li key={sectionId} className="flex items-center gap-2 text-gray-700">
                          <Check className="w-5 h-5 text-green-600" />
                          {section?.label}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {getDynamicFields().length > 0 && Object.keys(dynamicFieldData).length > 0 && (
                <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200 shadow-inner">
                  <h3 className="font-bold text-lg mb-2">Dynamic Fields</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {Object.entries(dynamicFieldData).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-gray-600">{key}:</p>
                        <p className="font-bold text-gray-800">{String(value)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between gap-4">
              <div className="flex gap-4">
                <Button variant="secondary" onClick={handleEdit}>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="danger" onClick={handleDiscard}>
                  <X className="w-4 h-4 mr-2" />
                  Discard
                </Button>
              </div>
              <Button variant="primary" onClick={handleSubmit} isLoading={isSubmitting}>
                <Check className="w-5 h-5 mr-2" />
                Submit Ticket
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
