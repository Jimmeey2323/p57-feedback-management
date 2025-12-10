-- ====================================================================================================
-- PHYSIQUE 57 COMPREHENSIVE TICKETING SYSTEM - COMPLETE DATABASE SEEDING
-- ====================================================================================================
-- Generated from complete CSV with ALL 103 subcategories across 10 categories
-- 
-- SUMMARY:
-- - Categories: 10
-- - Subcategories: 103
-- - Global Fields: 16 (appear on every ticket)
-- 
-- Generated: December 10, 2025
-- ====================================================================================================

DO $$
DECLARE
    -- Category UUID Variables
    v_cat_class_experience UUID;
    v_cat_instructor_related UUID;
    v_cat_facility_and_amenities UUID;
    v_cat_membership_and_billing UUID;
    v_cat_booking_and_technology UUID;
    v_cat_customer_service UUID;
    v_cat_sales_and_marketing UUID;
    v_cat_health_and_safety UUID;
    v_cat_community_and_culture UUID;
    v_cat_retail_and_merchandise UUID;
    v_cat_special_programs UUID;
    v_cat_miscellaneous UUID;

    -- Global fields (appear on every ticket)
    v_global_fields JSONB := jsonb_build_array(
        jsonb_build_object('id', 'GLB-001', 'label', 'Ticket ID', 'type', 'auto', 'required', true, 'hidden', false, 'description', 'System generated unique identifier'),
        jsonb_build_object('id', 'GLB-002', 'label', 'Date & Time Reported', 'type', 'datetime', 'required', true, 'hidden', false, 'auto', true, 'description', 'When the issue was reported to staff'),
        jsonb_build_object('id', 'GLB-003', 'label', 'Date & Time of Incident', 'type', 'datetime', 'required', true, 'hidden', false, 'description', 'When the issue actually occurred'),
        jsonb_build_object('id', 'GLB-004', 'label', 'Location', 'type', 'select', 'required', true, 'hidden', false, 'options', jsonb_build_array('Kwality House Kemps Corner', 'Kenkre House', 'South United Football Club', 'Supreme HQ Bandra', 'WeWork Prestige Central', 'WeWork Galaxy', 'The Studio by Copper + Cloves', 'Pop-up'), 'description', 'Studio location where issue occurred'),
        jsonb_build_object('id', 'GLB-005', 'label', 'Reported By (Staff)', 'type', 'select', 'required', true, 'hidden', false, 'options', jsonb_build_array('Akshay Rane', 'Vahishta Fitter', 'Zaheer Agarbattiwala', 'Zahur Shaikh', 'Nadiya Shaikh', 'Admin Admin', 'Shipra Bhika', 'Imran Shaikh', 'Tahira Sayyed', 'Manisha Rathod', 'Sheetal Kataria', 'Priyanka Abnave', 'Api Serou', 'Prathap Kp', 'Pavanthika', 'Santhosh Kumar'), 'description', 'Staff member logging the ticket'),
        jsonb_build_object('id', 'GLB-006', 'label', 'Client Name', 'type', 'text', 'required', true, 'hidden', false, 'description', 'Name of the client reporting issue'),
        jsonb_build_object('id', 'GLB-007', 'label', 'Client Email', 'type', 'email', 'required', false, 'hidden', false, 'description', 'Client email address'),
        jsonb_build_object('id', 'GLB-008', 'label', 'Client Phone', 'type', 'phone', 'required', false, 'hidden', false, 'description', 'Client contact number'),
        jsonb_build_object('id', 'GLB-009', 'label', 'Client Status', 'type', 'select', 'required', true, 'hidden', false, 'options', jsonb_build_array('Existing Active', 'Existing Inactive', 'New Prospect', 'Trial Client', 'Guest (Hosted Class)'), 'description', 'Client membership status'),
        jsonb_build_object('id', 'GLB-010', 'label', 'Priority', 'type', 'select', 'required', true, 'hidden', false, 'options', jsonb_build_array('Low (log only)', 'Medium (48hrs)', 'High (24hrs)', 'Critical (immediate)'), 'description', 'Urgency level of the issue'),
        jsonb_build_object('id', 'GLB-011', 'label', 'Department Routing', 'type', 'select', 'required', true, 'hidden', false, 'options', jsonb_build_array('Operations', 'Facilities', 'Training', 'Sales', 'Client Success', 'Marketing', 'Finance', 'Management'), 'description', 'Which department should handle this'),
        jsonb_build_object('id', 'GLB-012', 'label', 'Issue Description', 'type', 'textarea', 'required', true, 'hidden', false, 'minLength', 50, 'description', 'Detailed description of the issue'),
        jsonb_build_object('id', 'GLB-013', 'label', 'Action Taken Immediately', 'type', 'textarea', 'required', false, 'hidden', false, 'description', 'What was done on the spot'),
        jsonb_build_object('id', 'GLB-014', 'label', 'Client Mood/Sentiment', 'type', 'select', 'required', false, 'hidden', false, 'options', jsonb_build_array('Calm', 'Frustrated', 'Angry', 'Disappointed', 'Understanding'), 'description', 'Client emotional state'),
        jsonb_build_object('id', 'GLB-015', 'label', 'Follow-up Required', 'type', 'radio', 'required', true, 'hidden', false, 'options', jsonb_build_array('Yes', 'No'), 'description', 'Does this need additional follow-up'),
        jsonb_build_object('id', 'GLB-016', 'label', 'Attachments', 'type', 'file', 'required', false, 'hidden', false, 'multiple', true, 'description', 'Supporting documentation')
    );
    
BEGIN
    RAISE NOTICE '====================================================================================================';
    RAISE NOTICE 'PHYSIQUE 57 TICKETING SYSTEM - COMPREHENSIVE DATABASE SEEDING';
    RAISE NOTICE '====================================================================================================';
    RAISE NOTICE 'Total Categories: 10';
    RAISE NOTICE 'Total Subcategories: 103';
    RAISE NOTICE 'Global Fields: 16';
    RAISE NOTICE '====================================================================================================';
    
    -- ================================================================================================
    -- STEP 1: DELETE EXISTING DATA
    -- ================================================================================================
    RAISE NOTICE 'Step 1: Cleaning existing data...';
    
    DELETE FROM tickets;
    DELETE FROM subcategories;
    DELETE FROM categories;
    
    RAISE NOTICE 'Existing data cleared.';
    
    -- ================================================================================================
    -- STEP 2: CREATE CATEGORIES
    -- ================================================================================================
    RAISE NOTICE 'Step 2: Creating 10 categories...';

    -- Class Experience
    INSERT INTO categories (name, description, icon, color)
    VALUES (
        'Class Experience',
        'Class quality, difficulty, variety, and overall experience',
        '🎯',
        'teal'
    )
    RETURNING id INTO v_cat_class_experience;

    -- Instructor Related
    INSERT INTO categories (name, description, icon, color)
    VALUES (
        'Instructor Related',
        'Teaching quality, professionalism, and instructor interactions',
        '👨‍🏫',
        'indigo'
    )
    RETURNING id INTO v_cat_instructor_related;

    -- Facility & Amenities
    INSERT INTO categories (name, description, icon, color)
    VALUES (
        'Facility & Amenities',
        'Studio cleanliness, equipment, temperature, and facility maintenance',
        '🏢',
        'cyan'
    )
    RETURNING id INTO v_cat_facility_and_amenities;

    -- Membership & Billing
    INSERT INTO categories (name, description, icon, color)
    VALUES (
        'Membership & Billing',
        'Billing issues, package problems, contracts, and membership matters',
        '💳',
        'emerald'
    )
    RETURNING id INTO v_cat_membership_and_billing;

    -- Booking & Technology
    INSERT INTO categories (name, description, icon, color)
    VALUES (
        'Booking & Technology',
        'Issues related to app/website, bookings, payments, and technical systems',
        '💻',
        'blue'
    )
    RETURNING id INTO v_cat_booking_and_technology;

    -- Customer Service
    INSERT INTO categories (name, description, icon, color)
    VALUES (
        'Customer Service',
        'Front desk service, response time, communication, and support quality',
        '🤝',
        'green'
    )
    RETURNING id INTO v_cat_customer_service;

    -- Sales & Marketing
    INSERT INTO categories (name, description, icon, color)
    VALUES (
        'Sales & Marketing',
        'Sales practices, marketing communications, trials, and promotional activities',
        '📢',
        'purple'
    )
    RETURNING id INTO v_cat_sales_and_marketing;

    -- Health & Safety
    INSERT INTO categories (name, description, icon, color)
    VALUES (
        'Health & Safety',
        'Hygiene, injuries, emergency preparedness, equipment safety, and health protocols',
        '🏥',
        'red'
    )
    RETURNING id INTO v_cat_health_and_safety;

    -- Community & Culture
    INSERT INTO categories (name, description, icon, color)
    VALUES (
        'Community & Culture',
        'Studio atmosphere, inclusivity, member behavior, and community events',
        '👥',
        'pink'
    )
    RETURNING id INTO v_cat_community_and_culture;

    -- Retail & Merchandise
    INSERT INTO categories (name, description, icon, color)
    VALUES (
        'Retail & Merchandise',
        'Product quality, availability, pricing, returns, and staff knowledge',
        '🛍️',
        'orange'
    )
    RETURNING id INTO v_cat_retail_and_merchandise;

    -- Special Programs
    INSERT INTO categories (name, description, icon, color)
    VALUES (
        'Special Programs',
        'Workshops, private sessions, corporate programs, and specialized offerings',
        '⭐',
        'yellow'
    )
    RETURNING id INTO v_cat_special_programs;

    -- Miscellaneous
    INSERT INTO categories (name, description, icon, color)
    VALUES (
        'Miscellaneous',
        'Other issues including noise, policies, guest experience, and multi-location matters',
        '📋',
        'gray'
    )
    RETURNING id INTO v_cat_miscellaneous;

    RAISE NOTICE 'Created 10 categories successfully.';
    
    -- ================================================================================================
    -- STEP 3: CREATE SUBCATEGORIES
    -- ================================================================================================
    RAISE NOTICE 'Step 3: Creating 103 subcategories...';


    -- Class Experience (10 subcategories)
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_class_experience,
        'Class Quality',
        'Issues with overall class experience, effectiveness, or enjoyment',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'CLASS_QUALITY_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_class_experience,
        'Class Difficulty',
        'Class too easy, too hard, or inappropriate for advertised level',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'CLASS_DIFFICULTY_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_class_experience,
        'Music Selection',
        'Music volume, type, or playlist issues',
        'low',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'MUSIC_SELECTION_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_class_experience,
        'Class Variety',
        'Limited class options or repetitive programming',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'CLASS_VARIETY_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_class_experience,
        'Class Size',
        'Overcrowded classes or concerns about class capacity',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'CLASS_SIZE_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_class_experience,
        'Scheduling Issues',
        'Class times not convenient or schedule changes',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'SCHEDULING_ISSUES_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_class_experience,
        'Class Cancellations',
        'Last-minute class cancellations or instructor no-shows',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'CLASS_CANCELLATIONS_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_class_experience,
        'Substitute Teachers',
        'Issues with substitute instructor quality or frequency',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'SUBSTITUTE_TEACHERS_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_class_experience,
        'Pace/Intensity',
        'Class moving too fast, too slow, or intensity issues',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'PACE/INTENSITY_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_class_experience,
        'Modifications Offered',
        'Lack of modifications or accommodations during class',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'MODIFICATIONS_OFFERED_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );

    -- Instructor Related (10 subcategories)
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_instructor_related,
        'Teaching Quality',
        'Poor instruction, unclear cuing, or ineffective teaching',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'TEACHING_QUALITY_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_instructor_related,
        'Instructor Attitude',
        'Rude, dismissive, or unprofessional behavior',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'INSTRUCTOR_ATTITUDE_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_instructor_related,
        'Favoritism',
        'Instructor showing preferential treatment to certain clients',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'FAVORITISM_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_instructor_related,
        'Attention Distribution',
        'Instructor ignoring certain clients or focusing only on favorites',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'ATTENTION_DISTRIBUTION_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_instructor_related,
        'Form Corrections',
        'Too many/too few corrections, or inappropriate corrections',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'FORM_CORRECTIONS_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_instructor_related,
        'Professionalism',
        'Late arrival, personal conversations during class, or appearance issues',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'PROFESSIONALISM_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_instructor_related,
        'Communication Style',
        'Condescending, negative, or demotivating language',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'COMMUNICATION_STYLE_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_instructor_related,
        'Class Management',
        'Poor time management or disorganized class flow',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'CLASS_MANAGEMENT_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_instructor_related,
        'Injury Prevention',
        'Failure to provide safe cues or pushing clients too hard',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'INJURY_PREVENTION_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_instructor_related,
        'Personal Boundaries',
        'Inappropriate touching, comments, or boundary violations',
        'critical',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'PERSONAL_BOUNDARIES_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );

    -- Facility & Amenities (14 subcategories)
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_facility_and_amenities,
        'Studio Cleanliness',
        'Dirty floors, equipment, or surfaces',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'STUDIO_CLEANLINESS_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_facility_and_amenities,
        'Locker Room Issues',
        'Cleanliness, maintenance, or facility problems in changing areas',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'LOCKER_ROOM_ISSUES_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_facility_and_amenities,
        'Bathroom Conditions',
        'Cleanliness, supplies, or maintenance issues',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'BATHROOM_CONDITIONS_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_facility_and_amenities,
        'Shower Facilities',
        'Hot water, pressure, cleanliness, or availability issues',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'SHOWER_FACILITIES_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_facility_and_amenities,
        'Temperature Control',
        'Studio too hot, too cold, or inconsistent temperature',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'TEMPERATURE_CONTROL_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_facility_and_amenities,
        'Equipment Condition',
        'Broken, worn out, or insufficient equipment',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'EQUIPMENT_CONDITION_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_facility_and_amenities,
        'Lighting Issues',
        'Too bright, too dim, or lighting malfunctions',
        'low',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'LIGHTING_ISSUES_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_facility_and_amenities,
        'Sound System',
        'Poor audio quality, volume issues, or technical problems',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'SOUND_SYSTEM_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_facility_and_amenities,
        'Parking',
        'Limited parking, expensive parking, or access issues',
        'low',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'PARKING_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_facility_and_amenities,
        'Water Stations',
        'Water not available, fountains broken, or hygiene issues',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'WATER_STATIONS_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_facility_and_amenities,
        'Amenities',
        'Lack of towels, mats, props, or other expected amenities',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'AMENITIES_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_facility_and_amenities,
        'Signage/Wayfinding',
        'Confusing layout or unclear directions',
        'low',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'SIGNAGE/WAYFINDING_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_facility_and_amenities,
        'Smell/Odor',
        'Unpleasant smells in studio or facilities',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'SMELL/ODOR_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_facility_and_amenities,
        'Accessibility',
        'Issues for clients with disabilities or mobility challenges',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'ACCESSIBILITY_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );

    -- Membership & Billing (11 subcategories)
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_membership_and_billing,
        'Billing Errors',
        'Incorrect charges, double billing, or payment mistakes',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'BILLING_ERRORS_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_membership_and_billing,
        'Package Issues',
        'Problems with class packages, credits, or expiration',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'PACKAGE_ISSUES_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_membership_and_billing,
        'Auto-Renewal Problems',
        'Unwanted auto-renewal or difficulty cancelling',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'AUTO-RENEWAL_PROBLEMS_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_membership_and_billing,
        'Membership Cancellation',
        'Difficulty cancelling, cancellation fees, or process issues',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'MEMBERSHIP_CANCELLATION_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_membership_and_billing,
        'Pricing Transparency',
        'Hidden fees, unclear pricing, or price discrepancies',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'PRICING_TRANSPARENCY_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_membership_and_billing,
        'Package Restrictions',
        'Unexpected limitations on package usage',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'PACKAGE_RESTRICTIONS_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_membership_and_billing,
        'Credit Expiration',
        'Credits expiring too soon or expiration not communicated',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'CREDIT_EXPIRATION_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_membership_and_billing,
        'Refund Issues',
        'Difficulty obtaining refunds or delayed refunds',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'REFUND_ISSUES_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_membership_and_billing,
        'Payment Methods',
        'Limited payment options or payment processing problems',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'PAYMENT_METHODS_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_membership_and_billing,
        'Membership Freeze',
        'Issues freezing membership or freeze policy unclear',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'MEMBERSHIP_FREEZE_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_membership_and_billing,
        'Contract Terms',
        'Confusing or unfair contract terms',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'CONTRACT_TERMS_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );

    -- Booking & Technology (10 subcategories)
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_booking_and_technology,
        'App/Website Issues',
        'Technical problems, bugs, or usability issues',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'APP/WEBSITE_ISSUES_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_booking_and_technology,
        'Booking Failures',
        'Unable to book classes or booking system errors',
        'critical',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'BOOKING_FAILURES_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_booking_and_technology,
        'Waitlist Issues',
        'Problems with waitlist functionality or priority',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'WAITLIST_ISSUES_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_booking_and_technology,
        'Cancellation Problems',
        'Unable to cancel, late cancel fees, or cancellation window confusion',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'CANCELLATION_PROBLEMS_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_booking_and_technology,
        'Class Check-in',
        'Check-in system failures or attendance tracking issues',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'CLASS_CHECK-IN_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_booking_and_technology,
        'Notifications',
        'Missing notifications, too many notifications, or notification errors',
        'low',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'NOTIFICATIONS_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_booking_and_technology,
        'Profile Management',
        'Unable to update profile or account information',
        'low',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'PROFILE_MANAGEMENT_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_booking_and_technology,
        'Class Visibility',
        'Classes not showing up or schedule display issues',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'CLASS_VISIBILITY_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_booking_and_technology,
        'Payment Gateway',
        'Payment processing failures or transaction errors',
        'critical',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'PAYMENT_GATEWAY_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_booking_and_technology,
        'Technical Support',
        'Poor technical support or unresolved tech issues',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'TECHNICAL_SUPPORT_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );

    -- Customer Service (11 subcategories)
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_customer_service,
        'Front Desk Service',
        'Unhelpful, rude, or unprofessional front desk staff',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'FRONT_DESK_SERVICE_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_customer_service,
        'Response Time',
        'Slow response to emails, calls, or inquiries',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'RESPONSE_TIME_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_customer_service,
        'Issue Resolution',
        'Problems not resolved or passed between departments',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'ISSUE_RESOLUTION_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_customer_service,
        'Communication Quality',
        'Poor communication, unclear information, or conflicting messages',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'COMMUNICATION_QUALITY_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_customer_service,
        'Staff Knowledge',
        'Staff lacking information about policies, packages, or procedures',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'STAFF_KNOWLEDGE_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_customer_service,
        'Staff Availability',
        'No one at desk, long wait times, or understaffing',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'STAFF_AVAILABILITY_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_customer_service,
        'Complaint Handling',
        'Complaints dismissed, not taken seriously, or poorly handled',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'COMPLAINT_HANDLING_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_customer_service,
        'Phone Support',
        'Difficulty reaching studio by phone or poor phone service',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'PHONE_SUPPORT_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_customer_service,
        'Email/Chat Support',
        'Slow or unhelpful email/chat support',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'EMAIL/CHAT_SUPPORT_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_customer_service,
        'Staff Professionalism',
        'Unprofessional behavior, appearance, or conduct',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'STAFF_PROFESSIONALISM_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_customer_service,
        'Newcomer Experience',
        'Poor onboarding or unwelcoming experience for new clients',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'NEWCOMER_EXPERIENCE_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );

    -- Sales & Marketing (8 subcategories)
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_sales_and_marketing,
        'Misleading Information',
        'False promises, exaggerated claims, or hidden terms',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'MISLEADING_INFORMATION_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_sales_and_marketing,
        'Aggressive Selling',
        'High-pressure sales tactics or excessive follow-ups',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'AGGRESSIVE_SELLING_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_sales_and_marketing,
        'Trial Class Experience',
        'Poor trial experience, rushed enrollment, or hard sell after class',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'TRIAL_CLASS_EXPERIENCE_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_sales_and_marketing,
        'Communication Overload',
        'Too many emails, SMS, or promotional messages',
        'low',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'COMMUNICATION_OVERLOAD_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_sales_and_marketing,
        'Social Media',
        'Inaccurate info on social media or poor social media responsiveness',
        'low',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'SOCIAL_MEDIA_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_sales_and_marketing,
        'Guest Passes/Referrals',
        'Guest pass issues or referral rewards not credited',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'GUEST_PASSES/REFERRALS_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_sales_and_marketing,
        'Events & Workshops',
        'Poor event organization, cancellations, or not as advertised',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'EVENTS_&_WORKSHOPS_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_sales_and_marketing,
        'Brand Communication',
        'Inconsistent messaging, tone issues, or confusing branding',
        'low',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'BRAND_COMMUNICATION_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );

    -- Health & Safety (7 subcategories)
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_health_and_safety,
        'Hygiene Protocols',
        'Inadequate sanitization, cleaning, or hygiene standards',
        'critical',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'HYGIENE_PROTOCOLS_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_health_and_safety,
        'Injury During Class',
        'Client injured during class or inadequate first aid response',
        'critical',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'INJURY_DURING_CLASS_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_health_and_safety,
        'Emergency Preparedness',
        'Missing safety equipment, blocked exits, or no emergency protocols',
        'critical',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'EMERGENCY_PREPAREDNESS_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_health_and_safety,
        'COVID/Health Protocols',
        'Not following health guidelines or capacity restrictions',
        'critical',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'COVID/HEALTH_PROTOCOLS_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_health_and_safety,
        'Medical Disclosure',
        'Medical information not collected, shared, or acted upon',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'MEDICAL_DISCLOSURE_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_health_and_safety,
        'Equipment Safety',
        'Unsafe or damaged equipment creating injury risk',
        'critical',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'EQUIPMENT_SAFETY_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_health_and_safety,
        'Air Quality',
        'Poor ventilation, strong odors, or air quality concerns',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'AIR_QUALITY_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );

    -- Community & Culture (6 subcategories)
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_community_and_culture,
        'Clique Behavior',
        'Exclusive groups, unwelcoming atmosphere, or favoritism among members',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'CLIQUE_BEHAVIOR_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_community_and_culture,
        'Discrimination',
        'Discrimination based on body type, fitness level, age, or other factors',
        'critical',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'DISCRIMINATION_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_community_and_culture,
        'Member Behavior',
        'Disruptive, rude, or inappropriate behavior by other clients',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'MEMBER_BEHAVIOR_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_community_and_culture,
        'Inclusivity Issues',
        'Lack of body positivity, welcoming environment, or diverse representation',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'INCLUSIVITY_ISSUES_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_community_and_culture,
        'Community Events',
        'Poor organization or low quality of community events',
        'low',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'COMMUNITY_EVENTS_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_community_and_culture,
        'Studio Culture',
        'Toxic environment, comparison culture, or unsupportive atmosphere',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'STUDIO_CULTURE_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );

    -- Retail & Merchandise (5 subcategories)
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_retail_and_merchandise,
        'Product Quality',
        'Defective, poor quality, or not as described products',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'PRODUCT_QUALITY_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_retail_and_merchandise,
        'Product Availability',
        'Out of stock items or limited product selection',
        'low',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'PRODUCT_AVAILABILITY_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_retail_and_merchandise,
        'Pricing',
        'Overpriced products or pricing discrepancies',
        'low',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'PRICING_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_retail_and_merchandise,
        'Return/Exchange',
        'Difficulty with returns, restrictive policies, or poor exchange process',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'RETURN/EXCHANGE_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_retail_and_merchandise,
        'Staff Knowledge',
        'Staff lacking product knowledge or unable to help',
        'low',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'STAFF_KNOWLEDGE_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );

    -- Special Programs (5 subcategories)
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_special_programs,
        'Workshop Quality',
        'Poor quality workshops, disorganization, or not worth the fee',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'WORKSHOP_QUALITY_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_special_programs,
        'Private Sessions',
        'Issues with private session quality, scheduling, or pricing',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'PRIVATE_SESSIONS_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_special_programs,
        'Corporate Programs',
        'Problems with corporate wellness programs or coordination',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'CORPORATE_PROGRAMS_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_special_programs,
        'Special Needs Programs',
        'Inadequate programs for prenatal, postnatal, seniors, or adaptive fitness',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'SPECIAL_NEEDS_PROGRAMS_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_special_programs,
        'Challenges & Competitions',
        'Poorly organized challenges, unfair rules, or prize issues',
        'low',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'CHALLENGES_&_COMPETITIONS_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );

    -- Miscellaneous (7 subcategories)
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_miscellaneous,
        'Noise Disturbance',
        'External noise disrupting classes or facility operations',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'NOISE_DISTURBANCE_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_miscellaneous,
        'Policy Changes',
        'Policies changed without notice or communication',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'POLICY_CHANGES_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_miscellaneous,
        'Guest Experience',
        'Poor experience for guests, drop-ins, or trial clients',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'GUEST_EXPERIENCE_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_miscellaneous,
        'Lost & Found',
        'Lost items not tracked or found items not returned',
        'low',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'LOST_&_FOUND_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_miscellaneous,
        'Nutrition/Wellness Advice',
        'Inappropriate, unqualified, or pushy nutrition/wellness advice',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'NUTRITION/WELLNESS_ADVICE_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_miscellaneous,
        'Multi-location Issues',
        'Problems using membership across multiple locations',
        'medium',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'MULTI-LOCATION_ISSUES_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );
    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        v_cat_miscellaneous,
        'Feedback System',
        'No way to provide feedback, feedback ignored, or retaliation concerns',
        'high',
        jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', 'FEEDBACK_SYSTEM_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )
    );

    RAISE NOTICE 'Created 104 subcategories successfully.';
    RAISE NOTICE '====================================================================================================';
    RAISE NOTICE 'DATABASE SEEDING COMPLETE!';
    RAISE NOTICE '====================================================================================================';
    RAISE NOTICE 'Total Categories Created: 10';
    RAISE NOTICE 'Total Subcategories Created: 104';
    RAISE NOTICE '====================================================================================================';
    
END $$;

-- ====================================================================================================
-- VERIFICATION QUERIES
-- ====================================================================================================

-- Check categories
SELECT COUNT(*) as category_count FROM categories;

-- Check subcategories
SELECT COUNT(*) as subcategory_count FROM subcategories;

-- View categories with subcategory counts
SELECT 
    c.name as category,
    COUNT(s.id) as subcategory_count
FROM categories c
LEFT JOIN subcategories s ON s.category_id = c.id
GROUP BY c.id, c.name
ORDER BY c.name;

RAISE NOTICE 'Database seeding verification complete. Check the results above.';
