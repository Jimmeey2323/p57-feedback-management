-- Replace all categories and subcategories with the new comprehensive structure
-- WARNING: This will delete existing tickets, categories, and subcategories
-- Run in Supabase SQL Editor

DO $$
DECLARE
  cat_id UUID;
  sub TEXT;
  standard_form JSONB := jsonb_build_array(
    jsonb_build_object(
      'key','studio_location','label','Studio Location','type','select','required', true,
      'options', jsonb_build_array('Bandra','Napean Sea Road','BKC','Breach Candy','Thane','Other')
    ),
    jsonb_build_object(
      'key','priority','label','Priority','type','select','required', true,
      'options', jsonb_build_array('low','medium','high','urgent')
    ),
    jsonb_build_object(
      'key','reported_via','label','Reported Via','type','select','required', false,
      'options', jsonb_build_array('front_desk','phone','email','app','social','walk-in','other')
    ),
    jsonb_build_object(
      'key','occurrence_time','label','Occurrence Time','type','datetime','required', false
    ),
    jsonb_build_object(
      'key','details','label','Details','type','textarea','required', true,'maxLength', 1200
    ),
    jsonb_build_object(
      'key','attachments','label','Attachments','type','file','multiple', true
    )
  );
BEGIN
  -- Wipe existing data that would block deletes (FKs)
  DELETE FROM ticket_responses;
  DELETE FROM ticket_attachments;
  DELETE FROM ticket_history;
  DELETE FROM notifications;
  DELETE FROM tickets;
  DELETE FROM subcategories;
  DELETE FROM categories;

  -- 1) Class Experience
  INSERT INTO categories (name, icon, color_code, display_order)
  VALUES ('Class Experience', 'users', '#10B981', 1)
  RETURNING id INTO cat_id;
  FOREACH sub IN ARRAY ARRAY[
    'Class Quality','Class Scheduling','Class Overcrowding','Class Level Appropriateness','Class Variety',
    'Class Duration','Music & Playlist','Class Pacing','Warm-up/Cool-down','Modifications Offered'
  ] LOOP
    INSERT INTO subcategories (category_id, name, default_priority, form_fields)
    VALUES (cat_id, sub, 'medium', standard_form);
  END LOOP;

  -- 2) Instructor Related
  INSERT INTO categories (name, icon, color_code, display_order)
  VALUES ('Instructor Related', 'user-check', '#8B5CF6', 2)
  RETURNING id INTO cat_id;
  FOREACH sub IN ARRAY ARRAY[
    'Teaching Quality','Professionalism','Attention & Correction','Communication','Instructor Cancellations',
    'Motivation & Energy','Safety & Injury Prevention','Knowledge & Expertise','Punctuality','Personal Boundaries'
  ] LOOP
    INSERT INTO subcategories (category_id, name, default_priority, form_fields)
    VALUES (cat_id, sub, 'medium', standard_form);
  END LOOP;

  -- 3) Facility & Amenities
  INSERT INTO categories (name, icon, color_code, display_order)
  VALUES ('Facility & Amenities', 'building', '#06B6D4', 3)
  RETURNING id INTO cat_id;
  FOREACH sub IN ARRAY ARRAY[
    'Studio Cleanliness','Changing Room Issues','Washroom/Shower','Equipment Issues','Temperature Control',
    'Lighting & Ambiance','Parking','Water & Refreshments','Studio Layout','Maintenance Issues',
    'Hygiene Supplies','Storage & Lockers','Seating & Waiting Area','Accessibility'
  ] LOOP
    INSERT INTO subcategories (category_id, name, default_priority, form_fields)
    VALUES (cat_id, sub, 'medium', standard_form);
  END LOOP;

  -- 4) Membership & Billing
  INSERT INTO categories (name, icon, color_code, display_order)
  VALUES ('Membership & Billing', 'credit-card', '#14B8A6', 4)
  RETURNING id INTO cat_id;
  FOREACH sub IN ARRAY ARRAY[
    'Billing Errors','Payment Issues','Package/Plan Confusion','Membership Cancellation','Membership Freeze',
    'Renewal Issues','Upgrade/Downgrade','Credits/Class Pack','Promotional Offers','Invoice/Receipt','Contract Terms'
  ] LOOP
    INSERT INTO subcategories (category_id, name, default_priority, form_fields)
    VALUES (cat_id, sub, 'medium', standard_form);
  END LOOP;

  -- 5) Booking & Technology
  INSERT INTO categories (name, icon, color_code, display_order)
  VALUES ('Booking & Technology', 'laptop', '#EC4899', 5)
  RETURNING id INTO cat_id;
  FOREACH sub IN ARRAY ARRAY[
    'App/Website Issues','Booking Failures','Waitlist Issues','Cancellation Problems','Class Check-in',
    'Notifications','Profile Management','Class Visibility','Payment Gateway','Technical Support'
  ] LOOP
    INSERT INTO subcategories (category_id, name, default_priority, form_fields)
    VALUES (cat_id, sub, 'medium', standard_form);
  END LOOP;

  -- 6) Customer Service
  INSERT INTO categories (name, icon, color_code, display_order)
  VALUES ('Customer Service', 'message-circle', '#6366F1', 6)
  RETURNING id INTO cat_id;
  FOREACH sub IN ARRAY ARRAY[
    'Front Desk Service','Response Time','Issue Resolution','Communication Quality','Staff Knowledge',
    'Staff Availability','Complaint Handling','Phone Support','Email/Chat Support','Staff Professionalism','Newcomer Experience'
  ] LOOP
    INSERT INTO subcategories (category_id, name, default_priority, form_fields)
    VALUES (cat_id, sub, 'medium', standard_form);
  END LOOP;

  -- 7) Sales & Marketing
  INSERT INTO categories (name, icon, color_code, display_order)
  VALUES ('Sales & Marketing', 'tag', '#F97316', 7)
  RETURNING id INTO cat_id;
  FOREACH sub IN ARRAY ARRAY[
    'Misleading Information','Aggressive Selling','Trial Class Experience','Communication Overload','Social Media',
    'Guest Passes/Referrals','Events & Workshops','Brand Communication'
  ] LOOP
    INSERT INTO subcategories (category_id, name, default_priority, form_fields)
    VALUES (cat_id, sub, 'medium', standard_form);
  END LOOP;

  -- 8) Health & Safety
  INSERT INTO categories (name, icon, color_code, display_order)
  VALUES ('Health & Safety', 'shield', '#DC2626', 8)
  RETURNING id INTO cat_id;
  FOREACH sub IN ARRAY ARRAY[
    'Hygiene Protocols','Injury During Class','Emergency Preparedness','COVID/Health Protocols',
    'Medical Disclosure','Equipment Safety','Air Quality'
  ] LOOP
    INSERT INTO subcategories (category_id, name, default_priority, form_fields)
    VALUES (cat_id, sub, 'high', standard_form);
  END LOOP;

  -- 9) Community & Culture
  INSERT INTO categories (name, icon, color_code, display_order)
  VALUES ('Community & Culture', 'users', '#0EA5E9', 9)
  RETURNING id INTO cat_id;
  FOREACH sub IN ARRAY ARRAY[
    'Clique Behavior','Discrimination','Member Behavior','Inclusivity Issues','Community Events','Studio Culture'
  ] LOOP
    INSERT INTO subcategories (category_id, name, default_priority, form_fields)
    VALUES (cat_id, sub, 'medium', standard_form);
  END LOOP;

  -- 10) Retail & Merchandise
  INSERT INTO categories (name, icon, color_code, display_order)
  VALUES ('Retail & Merchandise', 'shopping-bag', '#FB7185', 10)
  RETURNING id INTO cat_id;
  FOREACH sub IN ARRAY ARRAY[
    'Product Quality','Product Availability','Pricing','Return/Exchange','Staff Knowledge'
  ] LOOP
    INSERT INTO subcategories (category_id, name, default_priority, form_fields)
    VALUES (cat_id, sub, 'medium', standard_form);
  END LOOP;

  -- 11) Special Programs
  INSERT INTO categories (name, icon, color_code, display_order)
  VALUES ('Special Programs', 'star', '#A78BFA', 11)
  RETURNING id INTO cat_id;
  FOREACH sub IN ARRAY ARRAY[
    'Workshop Quality','Private Sessions','Corporate Programs','Special Needs Programs','Challenges & Competitions'
  ] LOOP
    INSERT INTO subcategories (category_id, name, default_priority, form_fields)
    VALUES (cat_id, sub, 'medium', standard_form);
  END LOOP;

  -- 12) Miscellaneous
  INSERT INTO categories (name, icon, color_code, display_order)
  VALUES ('Miscellaneous', 'more-horizontal', '#64748B', 12)
  RETURNING id INTO cat_id;
  FOREACH sub IN ARRAY ARRAY[
    'Noise Disturbance','Policy Changes','Guest Experience','Lost & Found','Nutrition/Wellness Advice','Multi-location Issues','Feedback System'
  ] LOOP
    INSERT INTO subcategories (category_id, name, default_priority, form_fields)
    VALUES (cat_id, sub, 'low', standard_form);
  END LOOP;

END $$;