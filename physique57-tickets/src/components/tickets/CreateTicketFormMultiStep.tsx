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
import toast from 'react-hot-toast';
import { User, Calendar, Briefcase, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

type FormStep = 'sections' | 'category' | 'details' | 'review';

interface SectionOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const sectionOptions: SectionOption[] = [
  {
    id: 'member',
    label: 'Member Details',
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

export const CreateTicketFormMultiStep: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  const [currentStep, setCurrentStep] = useState<FormStep>('sections');
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  
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

  const toggleSection = (sectionId: string) => {
    setSelectedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getStepNumber = (): number => {
    const steps: FormStep[] = ['sections', 'category', 'details', 'review'];
    return steps.indexOf(currentStep) + 1;
  };

  const getTotalSteps = (): number => {
    return 4;
  };

  const getProgressPercentage = (): number => {
    return (getStepNumber() / getTotalSteps()) * 100;
  };

  const handleNext = () => {
    if (currentStep === 'sections') {
      if (selectedSections.length === 0) {
        toast.error('Please select at least one section or click Skip');
        return;
      }
      setCurrentStep('category');
    } else if (currentStep === 'category') {
      if (!selectedCategoryId || !selectedSubcategoryId) {
        toast.error('Please select a category and subcategory');
        return;
      }
      setCurrentStep('details');
    } else if (currentStep === 'details') {
      if (!formData.title || !formData.studioLocation) {
        toast.error('Please fill in required fields');
        return;
      }
      setCurrentStep('review');
    }
  };

  const handleBack = () => {
    if (currentStep === 'category') {
      setCurrentStep('sections');
    } else if (currentStep === 'details') {
      setCurrentStep('category');
    } else if (currentStep === 'review') {
      setCurrentStep('details');
    }
  };

  const handleSkipSections = () => {
    setSelectedSections([]);
    setCurrentStep('category');
  };

  const getDynamicFields = () => {
    if (!selectedSubcategory) return [];
    
    let fields = null;
    if (Array.isArray(selectedSubcategory.form_fields)) {
      fields = selectedSubcategory.form_fields;
    } else if (selectedSubcategory.form_fields?.fields) {
      fields = selectedSubcategory.form_fields.fields;
    }
    
    if (!fields || !Array.isArray(fields)) return [];
    
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
        priority: priority,
        studio_location: formData.studioLocation,
        reported_by_user_id: user.id,
        status: 'open',
        form_data: {
          ...dynamicFieldData,
          globalFields: {
            associate: formData.associate,
            routingDepartment: formData.routingDepartment,
            owner: formData.owner,
            dateReported: formData.dateReported,
            estimatedClosureDate: formData.estimatedClosureDate,
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

      // Trigger confetti animation
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
      
      // Navigate after a short delay to allow confetti to be visible
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
    <div className="max-w-5xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700">
            Step {getStepNumber()} of {getTotalSteps()}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {Math.round(getProgressPercentage())}% Complete
          </span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner border-2 border-gray-300">
          <motion.div
            className="h-full bg-gradient-green"
            initial={{ width: 0 }}
            animate={{ width: `${getProgressPercentage()}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        {currentStep === 'sections' && (
          <motion.div
            key="sections"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-gray-200"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Select Optional Sections</h2>
            <p className="text-gray-600 mb-8">Choose which additional details you'd like to include in this ticket.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {sectionOptions.map((section) => (
                <button
                  key={section.id}
                  onClick={() => toggleSection(section.id)}
                  className={`p-6 rounded-xl border-3 transition-all duration-300 transform hover:scale-105 ${
                    selectedSections.includes(section.id)
                      ? 'border-[#166d3b] bg-gradient-green text-white shadow-xl'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 shadow-lg'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`mb-4 ${selectedSections.includes(section.id) ? 'text-white' : 'text-[#166d3b]'}`}>
                      {section.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{section.label}</h3>
                    <p className={`text-sm ${selectedSections.includes(section.id) ? 'text-white/90' : 'text-gray-500'}`}>
                      {section.description}
                    </p>
                    {selectedSections.includes(section.id) && (
                      <Check className="w-5 h-5 mt-3 text-white" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="secondary" onClick={handleSkipSections}>
                Skip All
              </Button>
              <Button variant="primary" onClick={handleNext}>
                Next →
              </Button>
            </div>
          </motion.div>
        )}

        {currentStep === 'category' && (
          <motion.div
            key="category"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-gray-200"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Select Category & Subcategory</h2>
            
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Category *</label>
                <select
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  className="w-full px-4 py-3 border-3 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#166d3b] focus:border-[#166d3b] transition-all shadow-lg"
                  required
                >
                  <option value="">Select a category...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Subcategory *</label>
                <select
                  value={selectedSubcategoryId}
                  onChange={(e) => setSelectedSubcategoryId(e.target.value)}
                  className="w-full px-4 py-3 border-3 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#166d3b] focus:border-[#166d3b] transition-all shadow-lg"
                  required
                  disabled={!selectedCategoryId}
                >
                  <option value="">Select a subcategory...</option>
                  {filteredSubcategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="secondary" onClick={handleBack}>
                ← Back
              </Button>
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
            className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-gray-200"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Ticket Details</h2>
            
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border-3 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#166d3b] focus:border-[#166d3b] transition-all shadow-lg"
                  placeholder="Brief summary of the issue"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border-3 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#166d3b] focus:border-[#166d3b] transition-all shadow-lg"
                  rows={4}
                  placeholder="Detailed description of the issue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Studio Location *</label>
                <select
                  value={formData.studioLocation}
                  onChange={(e) => setFormData({ ...formData, studioLocation: e.target.value })}
                  className="w-full px-4 py-3 border-3 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#166d3b] focus:border-[#166d3b] transition-all shadow-lg"
                  required
                >
                  <option value="">Select location...</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Online">Online</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 py-3 border-3 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#166d3b] focus:border-[#166d3b] transition-all shadow-lg"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              {/* Dynamic Fields */}
              {getDynamicFields().length > 0 && (
                <div className="pt-6 border-t-2 border-gray-200">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Additional Information</h3>
                  <DynamicFieldsGrid
                    fields={getDynamicFields()}
                    formData={dynamicFieldData}
                    setFormData={setDynamicFieldData}
                  />
                </div>
              )}

              {/* Optional Sections */}
              {selectedSections.includes('member') && (
                <div className="pt-6 border-t-2 border-gray-200">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Member Details</h3>
                  <CustomerSearchWidget
                    formData={formData}
                    setFormData={setFormData}
                    onCustomerSelect={(customer) => {
                      console.log('Customer selected:', customer);
                    }}
                  />
                </div>
              )}

              {selectedSections.includes('session') && (
                <div className="pt-6 border-t-2 border-gray-200">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Session Details</h3>
                  <SessionDetailsWidget />
                </div>
              )}

              {selectedSections.includes('teacher') && (
                <div className="pt-6 border-t-2 border-gray-200">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Teacher Details</h3>
                  <input
                    type="text"
                    value={formData.teacherName}
                    onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                    className="w-full px-4 py-3 border-3 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#166d3b] focus:border-[#166d3b] transition-all shadow-lg"
                    placeholder="Teacher name"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Button variant="secondary" onClick={handleBack}>
                ← Back
              </Button>
              <Button variant="primary" onClick={handleNext}>
                Review →
              </Button>
            </div>
          </motion.div>
        )}

        {currentStep === 'review' && (
          <motion.div
            key="review"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-gray-200"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Review & Submit</h2>
            
            <div className="space-y-6 mb-8">
              <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200 shadow-inner">
                <h3 className="font-bold text-lg mb-2">Title</h3>
                <p className="text-gray-700">{formData.title}</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200 shadow-inner">
                <h3 className="font-bold text-lg mb-2">Category</h3>
                <p className="text-gray-700">{selectedCategory?.name} → {selectedSubcategory?.name}</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200 shadow-inner">
                <h3 className="font-bold text-lg mb-2">Details</h3>
                <p className="text-gray-700"><strong>Location:</strong> {formData.studioLocation}</p>
                <p className="text-gray-700"><strong>Priority:</strong> {priority}</p>
                {formData.description && <p className="text-gray-700 mt-2"><strong>Description:</strong> {formData.description}</p>}
              </div>

              {selectedSections.length > 0 && (
                <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200 shadow-inner">
                  <h3 className="font-bold text-lg mb-2">Included Sections</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {selectedSections.map(sectionId => {
                      const section = sectionOptions.find(s => s.id === sectionId);
                      return <li key={sectionId}>{section?.label}</li>;
                    })}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Button variant="secondary" onClick={handleBack}>
                ← Back
              </Button>
              <Button variant="primary" onClick={handleSubmit} isLoading={isSubmitting}>
                Submit Ticket ✓
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
