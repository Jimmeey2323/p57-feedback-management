-- Comprehensive Categories and Subcategories from CSV
-- This script creates all categories and subcategories with proper form_fields structure
-- Run this in Supabase SQL Editor after database-setup.sql

-- WARNING: This will delete all existing tickets and related data
DO $$
DECLARE
  cat_booking_tech UUID;
  cat_customer_service UUID;
  cat_sales_marketing UUID;
  cat_health_safety UUID;
  cat_community_culture UUID;
  cat_retail_merch UUID;
  cat_special_programs UUID;
  cat_miscellaneous UUID;
  
  -- Standard global fields that appear in every ticket
  global_fields JSONB := jsonb_build_array(
    jsonb_build_object('key','ticket_id','label','Ticket ID','type','auto','required',true,'hidden',false,'description','System generated unique ID'),
    jsonb_build_object('key','date_time_reported','label','Date & Time Reported','type','datetime','required',true,'hidden',false,'auto',true,'description','When the issue was reported to staff'),
    jsonb_build_object('key','date_time_incident','label','Date & Time of Incident','type','datetime','required',true,'hidden',false,'description','When the issue actually occurred'),
    jsonb_build_object('key','location','label','Location','type','select','required',true,'hidden',false,'description','Studio location where issue occurred',
      'options',jsonb_build_array('Kwality House Kemps Corner','Kenkre House','South United Football Club','Supreme HQ Bandra','WeWork Prestige Central','WeWork Galaxy','The Studio by Copper + Cloves','Pop-up')),
    jsonb_build_object('key','reported_by_staff','label','Reported By (Staff)','type','select','required',true,'hidden',false,'description','Staff member logging the ticket',
      'options',jsonb_build_array('Akshay Rane','Vahishta Fitter','Zaheer Agarbattiwala','Zahur Shaikh','Nadiya Shaikh','Admin Admin','Shipra Bhika','Imran Shaikh','Tahira Sayyed','Manisha Rathod','Sheetal Kataria','Priyanka Abnave','Api Serou','Prathap Kp','Pavanthika','Santhosh Kumar')),
    jsonb_build_object('key','client_name','label','Client Name','type','text','required',true,'hidden',false,'description','Name of the client reporting issue'),
    jsonb_build_object('key','client_email','label','Client Email','type','email','required',false,'hidden',false,'description','Client email address'),
    jsonb_build_object('key','client_phone','label','Client Phone','type','phone','required',false,'hidden',false,'description','Client contact number'),
    jsonb_build_object('key','client_status','label','Client Status','type','select','required',true,'hidden',false,'description','Client membership status',
      'options',jsonb_build_array('Existing Active','Existing Inactive','New Prospect','Trial Client','Guest (Hosted Class)')),
    jsonb_build_object('key','priority','label','Priority','type','select','required',true,'hidden',false,'description','Urgency level of the issue',
      'options',jsonb_build_array('Low (log only)','Medium (48hrs)','High (24hrs)','Critical (immediate)')),
    jsonb_build_object('key','department_routing','label','Department Routing','type','select','required',true,'hidden',false,'description','Which department should handle this',
      'options',jsonb_build_array('Operations','Facilities','Training','Sales','Client Success','Marketing','Finance','Management')),
    jsonb_build_object('key','issue_description','label','Issue Description','type','textarea','required',true,'hidden',false,'description','Detailed description of the issue','minLength',50),
    jsonb_build_object('key','action_taken_immediately','label','Action Taken Immediately','type','textarea','required',false,'hidden',false,'description','What was done on the spot'),
    jsonb_build_object('key','client_sentiment','label','Client Mood/Sentiment','type','select','required',false,'hidden',false,'description','Client emotional state',
      'options',jsonb_build_array('Calm','Frustrated','Angry','Disappointed','Understanding')),
    jsonb_build_object('key','follow_up_required','label','Follow-up Required','type','radio','required',true,'hidden',false,'description','Does this need additional follow-up','options',jsonb_build_array('Yes','No')),
    jsonb_build_object('key','attachments','label','Attachments','type','file','required',false,'hidden',false,'multiple',true,'description','Supporting documentation')
  );

  -- Standard class/trainer selects used across multiple subcategories
  class_options JSONB := jsonb_build_array('Studio Barre 57','Studio Foundations','Studio Barre 57 Express','Studio Cardio Barre','Studio FIT','Studio Mat 57','Studio SWEAT In 30','Studio Amped Up!','Studio Back Body Blaze','Studio Cardio Barre Plus','Studio Cardio Barre Express','Studio HIIT','Studio Back Body Blaze Express','Studio Recovery','Studio Hosted Class','Studio Trainer''s Choice','Studio Pre/Post Natal','Studio Mat 57 Express','Studio PowerCycle Express','Studio PowerCycle','Studio Strength Lab (Pull)','Studio Strength Lab (Full Body)','Studio Strength Lab (Push)','Studio Strength Lab');
  
  trainer_options JSONB := jsonb_build_array('Anisha Shah','Atulan Purohit','Karanvir Bhatia','Mrigakshi Jaiswal','Reshma Sharma','Karan Bhatia','Pushyank Nahar','Shruti Kulkarni','Janhavi Jain','Rohan Dahima','Kajol Kanchan','Vivaran Dhasmana','Upasna Paranjpe','Richard D''Costa','Pranjali Jain','Saniya Jaiswal','Shruti Suresh','Cauveri Vikrant','Poojitha Bhaskar','Nishanth Raj','Siddhartha Kusuma','Simonelle De Vitre','Kabir Varma','Simran Dutt','Veena Narasimhan','Anmol Sharma','Bret Saldanha','Raunak Khemuka','Chaitanya Nahar','Sovena Shetty');

  package_options JSONB := jsonb_build_array('Barre 1 month Unlimited','Studio 2 Week Unlimited','Studio Single Class','Session','Private Class','Studio 8 Class Package','Studio 10 Class Package','Money Credits','Studio Private Class','Retail','Studio 4 Class Package','Studio 1 Month Unlimited','Studio 3 Month Unlimited','Studio Annual Unlimited','Studio Newcomers 2 For 1','Studio 12 Class Package','Studio 10 Single Class Package','Studio 30 Single Class Package','Studio 20 Single Class Package','Barre 6 month Unlimited','Studio 6 Month Unlimited','Barre 2 week Unlimited','Studio 3 Month Unlimited - Monthly','Gift Card','Newcomer 8 Class Package','Studio 6 Week Unlimited');

  location_options JSONB := jsonb_build_array('Kwality House Kemps Corner','Kenkre House','South United Football Club','Supreme HQ Bandra','WeWork Prestige Central','WeWork Galaxy','The Studio by Copper + Cloves','Pop-up');

BEGIN
  -- Note: Run database-setup.sql first to create tables
  -- This script only inserts categories and subcategories

  -- ============================================
  -- CATEGORY: Booking & Technology
  -- ============================================
  INSERT INTO categories (name, icon, color_code, display_order, description)
  VALUES ('Booking & Technology', 'laptop', '#EC4899', 1, 'App, website, booking, payment, and tech support issues')
  RETURNING id INTO cat_booking_tech;

  -- App/Website Issues
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_booking_tech, 'App/Website Issues', 'Technical issues with app or website functionality', 'high',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','issue_type','label','Issue Type','type','select','required',true,'options',jsonb_build_array('App Crash','Slow Loading','Login Failed','Feature Not Working','UI Display Error','Session Timeout','Other')),
      jsonb_build_object('key','platform','label','Platform','type','select','required',true,'options',jsonb_build_array('iOS App','Android App','Website (Desktop)','Website (Mobile)')),
      jsonb_build_object('key','device_browser','label','Device/Browser','type','text','required',false,'placeholder','e.g., iPhone 12, Chrome, Safari'),
      jsonb_build_object('key','app_version','label','App Version','type','text','required',false),
      jsonb_build_object('key','error_message','label','Error Message','type','text','required',false,'description','Exact error message displayed'),
      jsonb_build_object('key','steps_to_reproduce','label','Steps to Reproduce','type','textarea','required',true,'description','How to recreate the issue'),
      jsonb_build_object('key','workaround_provided','label','Workaround Provided','type','text','required',false),
      jsonb_build_object('key','client_completed_action','label','Client Able to Complete Action','type','radio','required',true,'options',jsonb_build_array('Yes','No'))
    )
  );

  -- Booking Failures
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_booking_tech, 'Booking Failures', 'Issues with booking classes', 'high',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','booking_failure_type','label','Booking Failure Type','type','select','required',true,'options',jsonb_build_array('Cannot Select Class','Booking Not Confirmed','Double Booking Occurred','Booking Disappeared','Wrong Class Booked','Other')),
      jsonb_build_object('key','class_attempted','label','Class Attempted','type','select','required',true,'options',class_options),
      jsonb_build_object('key','class_datetime','label','Class Date & Time','type','datetime','required',true),
      jsonb_build_object('key','trainer','label','Trainer','type','select','required',true,'options',trainer_options),
      jsonb_build_object('key','client_package_type','label','Client Package Type','type','select','required',true,'options',package_options),
      jsonb_build_object('key','classes_remaining','label','Classes Remaining','type','number','required',true),
      jsonb_build_object('key','booking_manually_completed','label','Booking Manually Completed','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','system_error_code','label','System Error Code','type','text','required',false)
    )
  );

  -- Waitlist Issues
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_booking_tech, 'Waitlist Issues', 'Problems with class waitlists', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','waitlist_issue_type','label','Waitlist Issue Type','type','select','required',true,'options',jsonb_build_array('Not Moving Up','Didn''t Get Notified of Opening','Waitlist Not Available','Spot Given to Someone Else','Waitlist Position Incorrect','Other')),
      jsonb_build_object('key','class_details','label','Class Details','type','select','required',true,'options',class_options),
      jsonb_build_object('key','class_datetime','label','Class Date & Time','type','datetime','required',true),
      jsonb_build_object('key','trainer','label','Trainer','type','select','required',true,'options',trainer_options),
      jsonb_build_object('key','waitlist_position','label','Waitlist Position','type','number','required',true),
      jsonb_build_object('key','when_joined_waitlist','label','When Joined Waitlist','type','datetime','required',true),
      jsonb_build_object('key','spot_became_available','label','Spot Became Available','type','radio','required',true,'options',jsonb_build_array('Yes','No','Unknown')),
      jsonb_build_object('key','client_received_notification','label','Client Received Notification','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','manual_override_done','label','Manual Override Done','type','radio','required',true,'options',jsonb_build_array('Yes','No'))
    )
  );

  -- Cancellation Problems
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_booking_tech, 'Cancellation Problems', 'Issues cancelling bookings', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','cancellation_issue_type','label','Cancellation Issue Type','type','select','required',true,'options',jsonb_build_array('Cannot Cancel in App','Late Cancel Charge Disputed','Cancel Window Confusion','Cancellation Not Processed','Wrong Class Cancelled','No Show Marked Incorrectly','Other')),
      jsonb_build_object('key','class_details','label','Class Details','type','select','required',true,'options',class_options),
      jsonb_build_object('key','class_datetime','label','Class Date & Time','type','datetime','required',true),
      jsonb_build_object('key','cancellation_attempted_when','label','Cancellation Attempted When','type','datetime','required',true),
      jsonb_build_object('key','hours_before_class','label','Hours Before Class','type','number','required',true,'hidden',true,'description','Auto-calculated'),
      jsonb_build_object('key','late_cancel_fee_applied','label','Late Cancel Fee Applied','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','late_cancel_fee_amount','label','Late Cancel Fee Amount','type','number','required',false),
      jsonb_build_object('key','fee_waiver_requested','label','Fee Waiver Requested','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','fee_waiver_reason','label','Fee Waiver Reason','type','text','required',false),
      jsonb_build_object('key','fee_waiver_approved','label','Fee Waiver Approved','type','radio','required',false,'options',jsonb_build_array('Yes','No','Pending')),
      jsonb_build_object('key','cancellation_completed','label','Cancellation Completed','type','radio','required',true,'options',jsonb_build_array('Yes - System','Yes - Manual','No'))
    )
  );

  -- Class Check-in
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_booking_tech, 'Class Check-in', 'Check-in and attendance issues', 'high',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','checkin_issue_type','label','Check-in Issue Type','type','select','required',true,'options',jsonb_build_array('QR Code Not Working','Manual Check-in Delay','Not Marked Present','Marked Absent Despite Attendance','Check-in Terminal Down','Other')),
      jsonb_build_object('key','class_details','label','Class Details','type','select','required',true,'options',class_options),
      jsonb_build_object('key','class_datetime','label','Class Date & Time','type','datetime','required',true),
      jsonb_build_object('key','trainer','label','Trainer','type','select','required',true,'options',trainer_options),
      jsonb_build_object('key','checkin_method_attempted','label','Check-in Method Attempted','type','select','required',true,'options',jsonb_build_array('QR Code Scan','Manual Entry','Front Desk','Self-Service Kiosk')),
      jsonb_build_object('key','client_actually_attended','label','Client Actually Attended','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','attendance_corrected','label','Attendance Corrected','type','radio','required',true,'options',jsonb_build_array('Yes','No','Not Needed')),
      jsonb_build_object('key','class_credit_deducted','label','Class Credit Deducted','type','radio','required',true,'options',jsonb_build_array('Yes','No','Incorrectly')),
      jsonb_build_object('key','credit_correction_needed','label','Credit Correction Needed','type','radio','required',true,'options',jsonb_build_array('Yes','No'))
    )
  );

  -- Notifications
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_booking_tech, 'Notifications', 'Issues with app/email notifications', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','notification_issue_type','label','Notification Issue Type','type','select','required',true,'options',jsonb_build_array('Missing Class Reminder','No Cancellation Alert','Too Many Notifications','Wrong Information in Notification','Notification Delay','Cannot Disable Notifications','Other')),
      jsonb_build_object('key','notification_channel','label','Notification Channel','type','select','required',true,'options',jsonb_build_array('Push Notification','Email','SMS','WhatsApp','In-App')),
      jsonb_build_object('key','expected_notification_type','label','Expected Notification Type','type','select','required',true,'options',jsonb_build_array('Class Reminder','Booking Confirmation','Cancellation Confirmation','Waitlist Update','Class Change Alert','Payment Receipt','Promotional','Other')),
      jsonb_build_object('key','related_class_booking','label','Related Class/Booking','type','text','required',false),
      jsonb_build_object('key','notification_received','label','Notification Received','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','notification_timing','label','Notification Timing','type','select','required',true,'options',jsonb_build_array('On Time','Late','Too Early','Never Received')),
      jsonb_build_object('key','client_preference_updated','label','Client Preference Updated','type','radio','required',true,'options',jsonb_build_array('Yes','No','N/A'))
    )
  );

  -- Profile Management
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_booking_tech, 'Profile Management', 'Issues updating client profile', 'low',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','profile_issue_type','label','Profile Issue Type','type','select','required',true,'options',jsonb_build_array('Cannot Update Phone','Cannot Update Email','Cannot Change Password','Profile Photo Issue','Emergency Contact Issue','Preferences Not Saving','Incorrect Information Displayed','Other')),
      jsonb_build_object('key','field_affected','label','Field Affected','type','select','required',true,'options',jsonb_build_array('Name','Phone Number','Email','Password','Date of Birth','Emergency Contact','Medical Information','Profile Photo','Communication Preferences','Multiple Fields','Other')),
      jsonb_build_object('key','attempted_update','label','Attempted Update','type','text','required',true),
      jsonb_build_object('key','error_encountered','label','Error Encountered','type','text','required',false),
      jsonb_build_object('key','update_completed_manually','label','Update Completed Manually','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','data_accuracy_verified','label','Data Accuracy Verified','type','radio','required',true,'options',jsonb_build_array('Yes','No'))
    )
  );

  -- Class Visibility
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_booking_tech, 'Class Visibility', 'Classes not showing correctly in app/website', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','visibility_issue_type','label','Visibility Issue Type','type','select','required',true,'options',jsonb_build_array('Favorite Instructor Not Showing','Schedule Not Updating','Wrong Studio Displayed','Classes Missing from Schedule','Filter Not Working','Past Classes Still Showing','Other')),
      jsonb_build_object('key','affected_view','label','Affected View','type','select','required',true,'options',jsonb_build_array('All Classes','Favorite Instructors','Specific Location','Specific Class Type','Schedule Calendar','Search Results')),
      jsonb_build_object('key','expected_to_see','label','Expected to See','type','text','required',true),
      jsonb_build_object('key','actually_seeing','label','Actually Seeing','type','text','required',true),
      jsonb_build_object('key','date_range_affected','label','Date Range Affected','type','text','required',false),
      jsonb_build_object('key','filter_settings_used','label','Filter Settings Used','type','text','required',false),
      jsonb_build_object('key','classes_actually_available','label','Classes Actually Available','type','radio','required',true,'options',jsonb_build_array('Yes','No','Unclear'))
    )
  );

  -- Payment Gateway
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_booking_tech, 'Payment Gateway', 'Payment processing issues', 'high',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','payment_issue_type','label','Payment Issue Type','type','select','required',true,'options',jsonb_build_array('Transaction Failed','Amount Deducted But Booking Failed','Duplicate Charge','Payment Method Rejected','Gateway Timeout','Wrong Amount Charged','Refund Not Processed','Other')),
      jsonb_build_object('key','product_type','label','Product Type','type','select','required',true,'options',jsonb_build_array('Memberships','Sessions/Single Classes','Privates','Class Packages','Credits','Retail','Gift Cards','Others')),
      jsonb_build_object('key','package_product','label','Package/Product','type','select','required',true,'options',package_options),
      jsonb_build_object('key','expected_amount','label','Expected Amount','type','number','required',true),
      jsonb_build_object('key','amount_charged','label','Amount Charged','type','number','required',true),
      jsonb_build_object('key','payment_method','label','Payment Method','type','select','required',true,'options',jsonb_build_array('Credit Card','Debit Card','UPI','Net Banking','Wallet','Cash','Other')),
      jsonb_build_object('key','transaction_id','label','Transaction ID','type','text','required',false),
      jsonb_build_object('key','transaction_datetime','label','Transaction Date & Time','type','datetime','required',true),
      jsonb_build_object('key','purchase_completed','label','Purchase Completed','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','refund_required','label','Refund Required','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','refund_amount','label','Refund Amount','type','number','required',false),
      jsonb_build_object('key','refund_processed','label','Refund Processed','type','radio','required',false,'options',jsonb_build_array('Yes','No','Pending'))
    )
  );

  -- Technical Support
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_booking_tech, 'Technical Support', 'Tech support quality issues', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','support_issue_type','label','Support Issue Type','type','select','required',true,'options',jsonb_build_array('No Response to Tech Query','Issue Still Unresolved','Passed Between Departments','Long Resolution Time','No Follow-up','Other')),
      jsonb_build_object('key','original_issue','label','Original Issue','type','text','required',true),
      jsonb_build_object('key','previous_ticket_number','label','Previous Ticket Number','type','text','required',false),
      jsonb_build_object('key','how_long_pending','label','How Long Pending','type','number','required',true,'description','Days since first reported'),
      jsonb_build_object('key','support_channels_used','label','Support Channels Used','type','multiselect','required',true,'options',jsonb_build_array('Phone','Email','Chat','In-Person','Social Media')),
      jsonb_build_object('key','number_of_contacts_made','label','Number of Contacts Made','type','number','required',true),
      jsonb_build_object('key','departments_involved','label','Departments Involved','type','multiselect','required',true,'options',jsonb_build_array('Operations','Facilities','Training','Sales','Client Success','Marketing','Finance','Management')),
      jsonb_build_object('key','current_status_original_issue','label','Current Status of Original Issue','type','select','required',true,'options',jsonb_build_array('Still Unresolved','Partially Resolved','Now Resolved','Unknown'))
    )
  );

  -- ============================================
  -- CATEGORY: Customer Service
  -- ============================================
  INSERT INTO categories (name, icon, color_code, display_order, description)
  VALUES ('Customer Service', 'message-circle', '#6366F1', 2, 'Front desk, communication, and service quality issues')
  RETURNING id INTO cat_customer_service;

  -- Front Desk Service
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_customer_service, 'Front Desk Service', 'Issues with front desk staff service', 'high',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','service_issue_type','label','Service Issue Type','type','select','required',true,'options',jsonb_build_array('Rude Behavior','Unhelpful Attitude','Lack of Product Knowledge','Inattentive/Distracted','Unprofessional Appearance','Not Greeting Clients','Other')),
      jsonb_build_object('key','specific_associate','label','Specific Associate','type','select','required',true,'options',jsonb_build_array('Akshay Rane','Vahishta Fitter','Zaheer Agarbattiwala','Zahur Shaikh','Nadiya Shaikh','Admin Admin','Shipra Bhika','Imran Shaikh','Tahira Sayyed','Manisha Rathod','Sheetal Kataria','Priyanka Abnave','Api Serou','Prathap Kp','Pavanthika','Santhosh Kumar','Prefer Not to Name')),
      jsonb_build_object('key','incident_description','label','Incident Description','type','textarea','required',true),
      jsonb_build_object('key','witness_present','label','Witness Present','type','radio','required',false,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','client_request','label','Client Request','type','text','required',true),
      jsonb_build_object('key','request_fulfilled','label','Request Fulfilled','type','radio','required',true,'options',jsonb_build_array('Yes','No','Partially')),
      jsonb_build_object('key','immediate_action_taken','label','Immediate Action Taken','type','text','required',true),
      jsonb_build_object('key','manager_informed','label','Manager Informed','type','radio','required',true,'options',jsonb_build_array('Yes','No'))
    )
  );

  -- Response Time
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_customer_service, 'Response Time', 'Delayed or no response to client inquiries', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','response_issue_type','label','Response Issue Type','type','select','required',true,'options',jsonb_build_array('Delayed Email Response','Delayed Phone Callback','No Response Received','Automated Response Only','No Follow-up','Other')),
      jsonb_build_object('key','communication_channel','label','Communication Channel','type','select','required',true,'options',jsonb_build_array('Email','Phone Call','WhatsApp','SMS','Social Media DM','In-App Chat')),
      jsonb_build_object('key','initial_contact_date','label','Initial Contact Date','type','datetime','required',true),
      jsonb_build_object('key','response_received_date','label','Response Received Date','type','datetime','required',false),
      jsonb_build_object('key','hours_until_response','label','Hours Until Response','type','number','required',false,'hidden',true),
      jsonb_build_object('key','promised_response_time','label','Promised Response Time','type','text','required',false),
      jsonb_build_object('key','issue_topic','label','Issue Topic','type','text','required',true)
    )
  );

  -- Issue Resolution
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_customer_service, 'Issue Resolution', 'Problems resolving client issues', 'high',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','resolution_issue_type','label','Resolution Issue Type','type','select','required',true,'options',jsonb_build_array('Issue Still Unresolved','Passed Between Departments','No Accountability Taken','Conflicting Solutions Given','Resolution Not Implemented','Other')),
      jsonb_build_object('key','original_issue_category','label','Original Issue Category','type','select','required',true,'options',jsonb_build_array('Booking & Technology','Customer Service','Sales & Marketing','Health & Safety','Billing/Financial','Class/Instructor','Facility','Other')),
      jsonb_build_object('key','original_issue_description','label','Original Issue Description','type','textarea','required',true),
      jsonb_build_object('key','first_reported_date','label','First Reported Date','type','date','required',true),
      jsonb_build_object('key','days_since_first_report','label','Days Since First Report','type','number','required',true,'hidden',true),
      jsonb_build_object('key','departments_contacted','label','Departments Contacted','type','multiselect','required',true,'options',jsonb_build_array('Operations','Facilities','Training','Sales','Client Success','Marketing','Finance','Management')),
      jsonb_build_object('key','number_of_escalations','label','Number of Escalations','type','number','required',true),
      jsonb_build_object('key','promised_resolution_date','label','Promised Resolution Date','type','date','required',false),
      jsonb_build_object('key','current_status','label','Current Status','type','select','required',true,'options',jsonb_build_array('Still Open','Partially Resolved','Resolved But Client Unhappy','Unresolved After Multiple Attempts')),
      jsonb_build_object('key','resolution_blockers','label','Resolution Blockers','type','text','required',false)
    )
  );

  -- Communication Quality
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_customer_service, 'Communication Quality', 'Poor or unclear communication', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','communication_issue_type','label','Communication Issue Type','type','select','required',true,'options',jsonb_build_array('Poor/Unclear Communication','Language Barrier','Incorrect Information Given','Conflicting Information','Information Not Conveyed','Miscommunication','Other')),
      jsonb_build_object('key','communication_channel','label','Communication Channel','type','select','required',true,'options',jsonb_build_array('In-Person','Phone','Email','WhatsApp','SMS','Social Media','In-App')),
      jsonb_build_object('key','information_topic','label','Information Topic','type','text','required',true),
      jsonb_build_object('key','what_was_communicated','label','What Was Communicated','type','textarea','required',true),
      jsonb_build_object('key','what_should_have_been_said','label','What Should Have Been Said','type','textarea','required',true),
      jsonb_build_object('key','impact_on_client','label','Impact on Client','type','select','required',true,'options',jsonb_build_array('No Action Taken','Wrong Action Taken','Financial Loss','Missed Class','Booking Error','Trust Impacted','Other')),
      jsonb_build_object('key','multiple_associates_different_info','label','Multiple Associates Gave Different Info','type','radio','required',true,'options',jsonb_build_array('Yes','No','N/A')),
      jsonb_build_object('key','correction_communicated','label','Correction Communicated','type','radio','required',true,'options',jsonb_build_array('Yes','No'))
    )
  );

  -- Staff Knowledge
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_customer_service, 'Staff Knowledge', 'Staff lacking knowledge to help clients', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','knowledge_gap_type','label','Knowledge Gap Type','type','select','required',true,'options',jsonb_build_array('Class Information Lacking','Membership Details Unknown','Unable to Guide on Packages','Incorrect Policy Information','Doesn''t Know System Process','Product Details Wrong','Other')),
      jsonb_build_object('key','topic_client_asked_about','label','Topic Client Asked About','type','text','required',true),
      jsonb_build_object('key','information_given','label','Information Given','type','text','required',true),
      jsonb_build_object('key','correct_information','label','Correct Information','type','text','required',true),
      jsonb_build_object('key','associate_involved','label','Associate Involved','type','select','required',true,'options',jsonb_build_array('Akshay Rane','Vahishta Fitter','Zaheer Agarbattiwala','Zahur Shaikh','Nadiya Shaikh','Admin Admin','Shipra Bhika','Imran Shaikh','Tahira Sayyed','Manisha Rathod','Sheetal Kataria','Priyanka Abnave','Api Serou','Prathap Kp','Pavanthika','Santhosh Kumar','Multiple Staff','Prefer Not to Name')),
      jsonb_build_object('key','staff_admitted_uncertainty','label','Staff Admitted Uncertainty','type','radio','required',false,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','offered_to_find_out','label','Offered to Find Out','type','radio','required',false,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','client_got_correct_info_eventually','label','Client Got Correct Info Eventually','type','radio','required',true,'options',jsonb_build_array('Yes','No'))
    )
  );

  -- Staff Availability
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_customer_service, 'Staff Availability', 'Staff not available when needed', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','availability_issue_type','label','Availability Issue Type','type','select','required',true,'options',jsonb_build_array('No One at Desk','Long Wait Time','Understaffed During Peak Hours','Staff Took Too Long','Had to Search for Staff','Staff on Personal Call/Break','Other')),
      jsonb_build_object('key','time_of_day','label','Time of Day','type','select','required',true,'options',jsonb_build_array('Early Morning (6-9 AM)','Morning (9-12 PM)','Afternoon (12-5 PM)','Evening (5-8 PM)','Night (8-10 PM)')),
      jsonb_build_object('key','day_of_week','label','Day of Week','type','select','required',true,'options',jsonb_build_array('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday')),
      jsonb_build_object('key','wait_time','label','Wait Time','type','number','required',true,'description','Minutes client waited'),
      jsonb_build_object('key','number_of_clients_waiting','label','Number of Clients Waiting','type','number','required',false),
      jsonb_build_object('key','staff_present','label','Staff Present','type','number','required',false),
      jsonb_build_object('key','client_requirement','label','Client Requirement','type','text','required',true),
      jsonb_build_object('key','eventually_assisted','label','Eventually Assisted','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','client_left_without_assistance','label','Client Left Without Assistance','type','radio','required',true,'options',jsonb_build_array('Yes','No'))
    )
  );

  -- Complaint Handling
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_customer_service, 'Complaint Handling', 'Poor handling of client complaints', 'high',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','complaint_handling_issue','label','Complaint Handling Issue','type','select','required',true,'options',jsonb_build_array('Dismissive Attitude','Defensive Response','No Apology Given','Not Taken Seriously','No Escalation Option Provided','Blamed Client','No Solution Offered','Other')),
      jsonb_build_object('key','original_complaint_category','label','Original Complaint Category','type','select','required',true,'options',jsonb_build_array('Booking & Technology','Customer Service','Sales & Marketing','Health & Safety','Billing/Financial','Class/Instructor','Facility','Other')),
      jsonb_build_object('key','original_complaint_summary','label','Original Complaint Summary','type','textarea','required',true),
      jsonb_build_object('key','who_received_complaint','label','Who Received Complaint','type','select','required',true,'options',jsonb_build_array('Front Desk Staff','Manager','Email Support','Phone Support','Social Media Team','Trainer','Other')),
      jsonb_build_object('key','associate_name','label','Associate Name','type','select','required',false,'options',jsonb_build_array('Akshay Rane','Vahishta Fitter','Zaheer Agarbattiwala','Zahur Shaikh','Nadiya Shaikh','Admin Admin','Shipra Bhika','Imran Shaikh','Tahira Sayyed','Manisha Rathod','Sheetal Kataria','Priyanka Abnave','Api Serou','Prathap Kp','Pavanthika','Santhosh Kumar','Prefer Not to Name')),
      jsonb_build_object('key','response_given','label','Response Given','type','textarea','required',true),
      jsonb_build_object('key','client_felt_heard','label','Client Felt Heard','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','solution_offered','label','Solution Offered','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','escalation_requested','label','Escalation Requested','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','escalation_provided','label','Escalation Provided','type','radio','required',false,'options',jsonb_build_array('Yes','No','N/A'))
    )
  );

  -- Phone Support
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_customer_service, 'Phone Support', 'Issues with phone support', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','phone_support_issue_type','label','Phone Support Issue Type','type','select','required',true,'options',jsonb_build_array('Phone Unreachable','Long Hold Time','Call Disconnected','No Callback Received','Transferred Multiple Times','IVR Issues','Wrong Department','Other')),
      jsonb_build_object('key','phone_number_called','label','Phone Number Called','type','text','required',true),
      jsonb_build_object('key','number_of_attempts','label','Number of Attempts','type','number','required',true),
      jsonb_build_object('key','call_connected','label','Call Connected','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','hold_time','label','Hold Time','type','number','required',false,'description','Minutes on hold'),
      jsonb_build_object('key','call_disconnected','label','Call Disconnected','type','radio','required',false,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','callback_promised','label','Callback Promised','type','radio','required',false,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','callback_received','label','Callback Received','type','radio','required',false,'options',jsonb_build_array('Yes','No','N/A')),
      jsonb_build_object('key','issue_resolved_on_call','label','Issue Resolved on Call','type','radio','required',false,'options',jsonb_build_array('Yes','No','N/A'))
    )
  );

  -- Email/Chat Support
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_customer_service, 'Email/Chat Support', 'Issues with email or chat support', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','support_channel','label','Support Channel','type','select','required',true,'options',jsonb_build_array('Email','In-App Chat','WhatsApp Chat','Website Chat')),
      jsonb_build_object('key','support_issue_type','label','Support Issue Type','type','select','required',true,'options',jsonb_build_array('Very Slow Response','Generic/Template Replies','Issue Not Resolved','No Follow-up','Transferred to Another Channel','Auto-Response Only','Other')),
      jsonb_build_object('key','initial_message_date','label','Initial Message Date','type','datetime','required',true),
      jsonb_build_object('key','response_received_date','label','Response Received Date','type','datetime','required',false),
      jsonb_build_object('key','hours_to_first_response','label','Hours to First Response','type','number','required',true,'hidden',true),
      jsonb_build_object('key','query_topic','label','Query Topic','type','text','required',true),
      jsonb_build_object('key','number_of_exchanges','label','Number of Exchanges','type','number','required',true),
      jsonb_build_object('key','issue_resolved','label','Issue Resolved','type','radio','required',true,'options',jsonb_build_array('Yes','No','Partially')),
      jsonb_build_object('key','response_quality','label','Response Quality','type','select','required',true,'options',jsonb_build_array('Helpful & Complete','Generic/Unhelpful','Wrong Information','Didn''t Address Query','N/A'))
    )
  );

  -- Staff Professionalism
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_customer_service, 'Staff Professionalism', 'Unprofessional staff behavior', 'high',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','professionalism_issue_type','label','Professionalism Issue Type','type','select','required',true,'options',jsonb_build_array('Staff Gossiping','Using Personal Phone','Eating at Desk','Inappropriate Conversations','Unprofessional Attire','Not Focused on Clients','Other')),
      jsonb_build_object('key','behavior_description','label','Behavior Description','type','textarea','required',true),
      jsonb_build_object('key','associate_involved','label','Associate Involved','type','select','required',true,'options',jsonb_build_array('Akshay Rane','Vahishta Fitter','Zaheer Agarbattiwala','Zahur Shaikh','Nadiya Shaikh','Admin Admin','Shipra Bhika','Imran Shaikh','Tahira Sayyed','Manisha Rathod','Sheetal Kataria','Priyanka Abnave','Api Serou','Prathap Kp','Pavanthika','Santhosh Kumar','Multiple Staff','Prefer Not to Name')),
      jsonb_build_object('key','client_directly_impacted','label','Client Directly Impacted','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','impact_description','label','Impact Description','type','text','required',false),
      jsonb_build_object('key','others_present','label','Others Present','type','radio','required',false,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','client_spoke_to_staff_about_it','label','Client Spoke to Staff About It','type','radio','required',false,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','staff_response','label','Staff Response','type','text','required',false)
    )
  );

  -- Newcomer Experience
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_customer_service, 'Newcomer Experience', 'Poor experience for new clients', 'high',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','newcomer_issue_type','label','Newcomer Issue Type','type','select','required',true,'options',jsonb_build_array('No Orientation Provided','Poor Onboarding','Lack of Guidance','Not Welcomed','Studio Tour Not Given','Equipment Explanation Missing','First Class Experience Poor','Other')),
      jsonb_build_object('key','client_first_visit','label','Client''s First Visit','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','trial_class','label','Trial Class','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','class_attended','label','Class Attended','type','select','required',true,'options',class_options),
      jsonb_build_object('key','trainer','label','Trainer','type','select','required',true,'options',trainer_options),
      jsonb_build_object('key','orientation_provided','label','Orientation Provided','type','radio','required',true,'options',jsonb_build_array('Yes - Adequate','Yes - Rushed','No')),
      jsonb_build_object('key','studio_tour_given','label','Studio Tour Given','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','equipment_explained','label','Equipment Explained','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','staff_welcoming','label','Staff Welcoming','type','radio','required',true,'options',jsonb_build_array('Very Welcoming','Somewhat','Not Welcoming')),
      jsonb_build_object('key','what_was_missing','label','What Was Missing','type','textarea','required',true),
      jsonb_build_object('key','likely_to_return','label','Likely to Return','type','select','required',true,'options',jsonb_build_array('Definitely Yes','Probably Yes','Unsure','Probably No','Definitely No'))
    )
  );

  -- ============================================
  -- CATEGORY: Sales & Marketing
  -- ============================================
  INSERT INTO categories (name, icon, color_code, display_order, description)
  VALUES ('Sales & Marketing', 'tag', '#F97316', 3, 'Sales conduct, trials, communication overload, social content, referrals, events, brand communication')
  RETURNING id INTO cat_sales_marketing;

  -- Misleading Information
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_sales_marketing, 'Misleading Information', 'False promises or hidden terms during sales', 'high',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','misleading_info_type','label','Misleading Info Type','type','select','required',true,'options',jsonb_build_array('False Promises About Results','Exaggerated Package Benefits','Pressure Tactics Used','Hidden Terms Not Disclosed','Pricing Misinformation','Contract Terms Misrepresented','Other')),
      jsonb_build_object('key','information_source','label','Information Source','type','select','required',true,'options',jsonb_build_array('Sales Call','Email Campaign','Social Media Ad','Website','In-Person Sales Pitch','WhatsApp Message','Referral Partner','Other')),
      jsonb_build_object('key','sales_associate','label','Sales Associate','type','select','required',false,'options',jsonb_build_array('Akshay Rane','Vahishta Fitter','Zaheer Agarbattiwala','Zahur Shaikh','Nadiya Shaikh','Admin Admin','Shipra Bhika','Imran Shaikh','Tahira Sayyed','Manisha Rathod','Sheetal Kataria','Priyanka Abnave','Api Serou','Prathap Kp','Pavanthika','Santhosh Kumar','Not Applicable','Unknown')),
      jsonb_build_object('key','what_was_claimed','label','What Was Claimed','type','textarea','required',true),
      jsonb_build_object('key','actual_reality','label','Actual Reality','type','textarea','required',true),
      jsonb_build_object('key','product_package_involved','label','Product/Package Involved','type','select','required',true,'options',package_options),
      jsonb_build_object('key','client_made_purchase','label','Client Made Purchase','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','purchase_amount','label','Purchase Amount','type','number','required',false),
      jsonb_build_object('key','refund_requested','label','Refund Requested','type','radio','required',false,'options',jsonb_build_array('Yes','No','N/A')),
      jsonb_build_object('key','client_expectation','label','Client Expectation','type','text','required',true)
    )
  );

  -- Aggressive Selling
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_sales_marketing, 'Aggressive Selling', 'Excessive follow-ups or pressure tactics', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','aggressive_tactic_type','label','Aggressive Tactic Type','type','select','required',true,'options',jsonb_build_array('Excessive Follow-ups','Pressure to Upgrade','Unwanted Sales Calls','Hard Sell During Trial','Multiple Calls Per Day','Guilt Tactics','Time Pressure (limited offer)','Other')),
      jsonb_build_object('key','contact_method','label','Contact Method','type','multiselect','required',true,'options',jsonb_build_array('Phone Calls','WhatsApp Messages','Emails','SMS','In-Person','Social Media DM')),
      jsonb_build_object('key','frequency_of_contact','label','Frequency of Contact','type','select','required',true,'options',jsonb_build_array('Multiple Times Daily','Daily','Every Few Days','Weekly','One-Time But Intense')),
      jsonb_build_object('key','total_contact_attempts','label','Total Contact Attempts','type','number','required',true),
      jsonb_build_object('key','sales_associate','label','Sales Associate','type','select','required',false,'options',jsonb_build_array('Akshay Rane','Vahishta Fitter','Zaheer Agarbattiwala','Zahur Shaikh','Nadiya Shaikh','Admin Admin','Shipra Bhika','Imran Shaikh','Tahira Sayyed','Manisha Rathod','Sheetal Kataria','Priyanka Abnave','Api Serou','Prathap Kp','Pavanthika','Santhosh Kumar','Multiple People','Unknown')),
      jsonb_build_object('key','what_was_being_sold','label','What Was Being Sold','type','select','required',true,'options',package_options),
      jsonb_build_object('key','client_expressed_not_interested','label','Client Expressed Not Interested','type','radio','required',true,'options',jsonb_build_array('Yes - Once','Yes - Multiple Times','No')),
      jsonb_build_object('key','contact_continued_after_decline','label','Contact Continued After Decline','type','radio','required',false,'options',jsonb_build_array('Yes','No','N/A')),
      jsonb_build_object('key','client_made_purchase','label','Client Made Purchase','type','radio','required',true,'options',jsonb_build_array('Yes - Under Pressure','Yes - Willingly','No')),
      jsonb_build_object('key','remove_from_list','label','Client Wants to Be Removed from List','type','radio','required',true,'options',jsonb_build_array('Yes','No'))
    )
  );

  -- Trial Class Experience
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_sales_marketing, 'Trial Class Experience', 'Issues with trial class experiences', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','trial_issue_type','label','Trial Issue Type','type','select','required',true,'options',jsonb_build_array('Poor Trial Experience','No Proper Introduction','Rushed Enrollment','High Pressure Sale After Class','Not Told It Was Trial','Trial Restrictions Not Explained','Other')),
      jsonb_build_object('key','trial_package','label','Trial Package','type','select','required',true,'options',jsonb_build_array('Studio 2 Week Unlimited','Studio Newcomers 2 For 1','Newcomer 8 Class Package','Studio Single Class','Other Trial Offer')),
      jsonb_build_object('key','class_attended','label','Class Attended','type','select','required',true,'options',class_options),
      jsonb_build_object('key','class_date','label','Class Date','type','date','required',true),
      jsonb_build_object('key','trainer','label','Trainer','type','select','required',true,'options',trainer_options),
      jsonb_build_object('key','pre_class_introduction','label','Pre-Class Introduction','type','radio','required',true,'options',jsonb_build_array('Yes - Adequate','Yes - Brief','No')),
      jsonb_build_object('key','instructor_attention','label','Instructor Attention During Class','type','select','required',true,'options',jsonb_build_array('Excellent','Good','Minimal','None')),
      jsonb_build_object('key','sales_pitch_timing','label','Sales Pitch Timing','type','select','required',true,'options',jsonb_build_array('Before Class','Immediately After Class','Later Same Day','Follow-up Call/Message','No Pitch','Other')),
      jsonb_build_object('key','sales_approach_comfort','label','Sales Approach Comfort Level','type','select','required',true,'options',jsonb_build_array('Comfortable','Slightly Pressured','Very Pressured','Not Applicable')),
      jsonb_build_object('key','purchased_membership','label','Purchased Membership','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','likely_to_return','label','Likely to Return','type','select','required',true,'options',jsonb_build_array('Definitely Yes','Probably Yes','Unsure','Probably No','Definitely No'))
    )
  );

  -- Communication Overload
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_sales_marketing, 'Communication Overload', 'Too many messages or irrelevant communications', 'low',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','overload_type','label','Overload Type','type','select','required',true,'options',jsonb_build_array('Too Many Emails','Too Many SMS','Too Many WhatsApp Messages','Spam/Irrelevant Content','Same Message Multiple Channels','Daily Promotional Messages','Other')),
      jsonb_build_object('key','communication_channels','label','Communication Channels','type','multiselect','required',true,'options',jsonb_build_array('Email','SMS','WhatsApp','Phone Calls','Push Notifications','Social Media')),
      jsonb_build_object('key','frequency','label','Frequency','type','select','required',true,'options',jsonb_build_array('Multiple Times Daily','Daily','3-4 Times Per Week','Weekly','Occasional But Inappropriate')),
      jsonb_build_object('key','content_type','label','Content Type','type','multiselect','required',true,'options',jsonb_build_array('Class Promotions','Membership Offers','Event Invites','General Updates','Workshops','Retail Offers','Unrelated Content')),
      jsonb_build_object('key','client_preference','label','Client Preference','type','select','required',true,'options',jsonb_build_array('Wants Less Frequent','Wants Only Relevant Content','Wants Specific Topics Only','Wants to Unsubscribe Completely')),
      jsonb_build_object('key','unsubscribe_attempted','label','Unsubscribe Attempted','type','radio','required',false,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','unsubscribe_successful','label','Unsubscribe Successful','type','radio','required',false,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','preferences_updated','label','Preferences Updated','type','radio','required',true,'options',jsonb_build_array('Yes','No'))
    )
  );

  -- Social Media
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_sales_marketing, 'Social Media', 'Social media related issues', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','social_issue_type','label','Social Media Issue Type','type','select','required',true,'options',jsonb_build_array('Inaccurate Information Posted','Unresponsive to DMs','Poor Engagement','Misleading Content','Inappropriate Content','Wrong Class Timings Shown','Unanswered Comments','Other')),
      jsonb_build_object('key','platform','label','Platform','type','select','required',true,'options',jsonb_build_array('Instagram','Facebook','Twitter/X','LinkedIn','YouTube','Other')),
      jsonb_build_object('key','issue_description','label','Issue Description','type','textarea','required',true),
      jsonb_build_object('key','post_content_url','label','Post/Content URL','type','text','required',false),
      jsonb_build_object('key','client_action_taken','label','Client Action Taken','type','select','required',true,'options',jsonb_build_array('Sent DM','Commented','Tried to Contact Via Post','Filled Form on Page','Clicked Link/Ad','Other')),
      jsonb_build_object('key','response_received','label','Response Received','type','radio','required',true,'options',jsonb_build_array('Yes - Timely','Yes - Delayed','No')),
      jsonb_build_object('key','hours_until_response','label','Hours Until Response','type','number','required',false),
      jsonb_build_object('key','issue_impact','label','Issue Impact','type','select','required',true,'options',jsonb_build_array('Could not Book Class','Wrong Information Received','Missed Opportunity','Trust Impacted','Reputation Concern','Other')),
      jsonb_build_object('key','content_corrected','label','Content Corrected','type','radio','required',false,'options',jsonb_build_array('Yes','No','N/A'))
    )
  );

  -- Guest Passes/Referrals
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_sales_marketing, 'Guest Passes/Referrals', 'Issues with guest passes and referral programs', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','issue_type','label','Issue Type','type','select','required',true,'options',jsonb_build_array('Guest Pass Not Working','Referral Benefit Not Credited','Restrictions Not Mentioned','Referral Link Broken','Guest Pass Expired Early','Credit Amount Wrong','Other')),
      jsonb_build_object('key','program_type','label','Program Type','type','select','required',true,'options',jsonb_build_array('Guest Pass','Referral Reward','Friend Referral','Corporate Partnership','Promotional Pass','Other')),
      jsonb_build_object('key','referring_client_name','label','Referring Client Name','type','text','required',false),
      jsonb_build_object('key','referred_client_name','label','Referred Client Name','type','text','required',true),
      jsonb_build_object('key','pass_code_used','label','Pass/Code Used','type','text','required',false),
      jsonb_build_object('key','expected_benefit','label','Expected Benefit','type','text','required',true),
      jsonb_build_object('key','actual_outcome','label','Actual Outcome','type','text','required',true),
      jsonb_build_object('key','pass_redeemed_successfully','label','Pass Redeemed Successfully','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','credit_benefit_applied','label','Credit/Benefit Applied','type','radio','required',true,'options',jsonb_build_array('Yes','No','Partially')),
      jsonb_build_object('key','expected_credit_amount','label','Expected Credit Amount','type','number','required',false),
      jsonb_build_object('key','actual_credit_amount','label','Actual Credit Amount','type','number','required',false),
      jsonb_build_object('key','issue_resolved','label','Issue Resolved','type','radio','required',true,'options',jsonb_build_array('Yes','No','Pending'))
    )
  );

  -- Events & Workshops
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_sales_marketing, 'Events & Workshops', 'Issues with events and workshops', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','event_issue_type','label','Event Issue Type','type','select','required',true,'options',jsonb_build_array('Poor Organization','Event Cancelled','Misleading Event Details','Registration Issues','Overcrowded','Inadequate Facilities','Trainer/Speaker Issue','Not as Advertised','Other')),
      jsonb_build_object('key','event_name','label','Event Name','type','text','required',true),
      jsonb_build_object('key','event_date','label','Event Date','type','date','required',true),
      jsonb_build_object('key','event_type','label','Event Type','type','select','required',true,'options',jsonb_build_array('Workshop','Masterclass','Special Event','Pop-up Class','Community Event','Wellness Seminar','Other')),
      jsonb_build_object('key','trainer_speaker','label','Trainer/Speaker','type','text','required',false),
      jsonb_build_object('key','registration_method','label','Registration Method','type','select','required',true,'options',jsonb_build_array('Website','App','Phone','Email','In-Person','Social Media')),
      jsonb_build_object('key','registration_successful','label','Registration Successful','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','event_fee','label','Event Fee','type','number','required',false),
      jsonb_build_object('key','event_occurred','label','Event Occurred','type','radio','required',true,'options',jsonb_build_array('Yes - As Scheduled','Yes - Modified','No - Cancelled','No - Postponed')),
      jsonb_build_object('key','cancellation_notice_given','label','Cancellation Notice Given','type','radio','required',false,'options',jsonb_build_array('Yes - Adequate Time','Yes - Short Notice','No')),
      jsonb_build_object('key','event_issue_description','label','Event Issue Description','type','textarea','required',true),
      jsonb_build_object('key','refund_requested','label','Refund Requested','type','radio','required',false,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','refund_processed','label','Refund Processed','type','radio','required',false,'options',jsonb_build_array('Yes','No','Pending','N/A'))
    )
  );

  -- Brand Communication
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_sales_marketing, 'Brand Communication', 'Issues with brand messaging and communication', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','communication_issue_type','label','Communication Issue Type','type','select','required',true,'options',jsonb_build_array('Inconsistent Messaging','Tone Mismatch','Cultural Insensitivity','Confusing Brand Voice','Conflicting Information Across Channels','Inappropriate Content','Other')),
      jsonb_build_object('key','communication_channel','label','Communication Channel','type','multiselect','required',true,'options',jsonb_build_array('Website','Social Media','Email','SMS','In-Studio Signage','Print Materials','App','Other')),
      jsonb_build_object('key','issue_description','label','Issue Description','type','textarea','required',true),
      jsonb_build_object('key','specific_content','label','Specific Content','type','text','required',false),
      jsonb_build_object('key','client_perception','label','Client Perception','type','select','required',true,'options',jsonb_build_array('Offensive','Confusing','Misleading','Inappropriate','Does not Match Brand','Other')),
      jsonb_build_object('key','impact_on_client','label','Impact on Client','type','text','required',true),
      jsonb_build_object('key','content_removed_changed','label','Content Removed/Changed','type','radio','required',false,'options',jsonb_build_array('Yes','No','Not Applicable'))
    )
  );

  -- ============================================
  -- CATEGORY: Health & Safety
  -- ============================================
  INSERT INTO categories (name, icon, color_code, display_order, description)
  VALUES ('Health & Safety', 'shield', '#DC2626', 4, 'Hygiene, injuries, emergency preparedness, COVID protocols, medical disclosure, equipment safety, air quality')
  RETURNING id INTO cat_health_safety;

  -- Hygiene Protocols
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_health_safety, 'Hygiene Protocols', 'Hygiene and cleanliness issues', 'high',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','hygiene_issue_type','label','Hygiene Issue Type','type','multiselect','required',true,'options',jsonb_build_array('Inadequate surface cleaning','Equipment not sanitized','Bathrooms/showers uncleaned','Cleaning supplies depleted','Visible dirt/grime','Unpleasant odors','Other')),
      jsonb_build_object('key','area_affected','label','Area Affected','type','multiselect','required',true,'options',jsonb_build_array('Studio floor','Bathrooms','Showers','Changing rooms','Reception','Equipment storage','Props/equipment','Other')),
      jsonb_build_object('key','class_time_session','label','Class Time/Session','type','text','required',false),
      jsonb_build_object('key','client_complaint_received','label','Client Complaint Received','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','immediate_action_taken','label','Immediate Action Taken','type','textarea','required',false),
      jsonb_build_object('key','cleaning_staff_on_duty','label','Cleaning Staff on Duty','type','text','required',false)
    )
  );

  -- Injury During Class
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_health_safety, 'Injury During Class', 'Client injuries during classes', 'critical',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','injury_type','label','Injury Type','type','select','required',true,'options',jsonb_build_array('Muscle strain','Joint pain','Fall/slip','Equipment-related','Dizziness/fainting','Other')),
      jsonb_build_object('key','body_part_affected','label','Body Part Affected','type','multiselect','required',true,'options',jsonb_build_array('Head','Neck','Shoulder','Back','Hip','Knee','Ankle','Wrist','Other')),
      jsonb_build_object('key','class_type','label','Class Type','type','select','required',true,'options',class_options),
      jsonb_build_object('key','trainer_name','label','Trainer Name','type','select','required',true,'options',trainer_options),
      jsonb_build_object('key','time_into_class','label','Time into Class','type','text','required',false),
      jsonb_build_object('key','first_aid_provided','label','First Aid Provided','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','first_aid_details','label','First Aid Details','type','textarea','required',false),
      jsonb_build_object('key','medical_attention_required','label','Medical Attention Required','type','radio','required',true,'options',jsonb_build_array('Yes','No','Client Declined')),
      jsonb_build_object('key','incident_report_completed','label','Incident Report Completed','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','client_had_disclosed_condition','label','Client Had Disclosed Medical Condition','type','radio','required',true,'options',jsonb_build_array('Yes','No','Unknown')),
      jsonb_build_object('key','medical_condition_details','label','Medical Condition Details','type','text','required',false),
      jsonb_build_object('key','trainer_aware_of_condition','label','Trainer Aware of Condition','type','radio','required',false,'options',jsonb_build_array('Yes','No','N/A')),
      jsonb_build_object('key','contributing_factors','label','Contributing Factors','type','multiselect','required',false,'options',jsonb_build_array('Equipment malfunction','Floor surface','Overcrowding','Inadequate modification offered','Client error','Other')),
      jsonb_build_object('key','witness_present','label','Witness Present','type','radio','required',false,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','witness_names','label','Witness Names','type','text','required',false)
    )
  );

  -- Emergency Preparedness
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_health_safety, 'Emergency Preparedness', 'Emergency preparedness gaps', 'high',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','emergency_prep_issue','label','Emergency Preparedness Issue','type','multiselect','required',true,'options',jsonb_build_array('Fire exits blocked/unmarked','Emergency lighting not functional','First aid kit missing/depleted','Fire extinguisher missing/expired','No emergency protocol displayed','Emergency contact numbers not posted','AED not available/not maintained','Other')),
      jsonb_build_object('key','specific_location_of_issue','label','Specific Location of Issue','type','text','required',true),
      jsonb_build_object('key','risk_level_assessment','label','Risk Level Assessment','type','select','required',true,'options',jsonb_build_array('Low - Minor gap','Medium - Notable concern','High - Serious safety risk','Critical - Immediate hazard')),
      jsonb_build_object('key','immediate_action_taken','label','Immediate Action Taken','type','textarea','required',false),
      jsonb_build_object('key','regulatory_compliance_issue','label','Regulatory Compliance Issue','type','radio','required',false,'options',jsonb_build_array('Yes','No','Unsure'))
    )
  );

  -- COVID/Health Protocols
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_health_safety, 'COVID/Health Protocols', 'Health protocol violations', 'high',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','protocol_violation_type','label','Protocol Violation Type','type','multiselect','required',true,'options',jsonb_build_array('No temperature checks conducted','Overcrowding beyond capacity','Inadequate spacing between clients','Mask policy not enforced','Symptomatic person allowed entry','Contact tracing information not collected','Other')),
      jsonb_build_object('key','class_session_affected','label','Class/Session Affected','type','select','required',false,'options',class_options),
      jsonb_build_object('key','number_of_people_present','label','Number of People Present','type','number','required',false),
      jsonb_build_object('key','studio_capacity_limit','label','Studio Capacity Limit','type','number','required',false),
      jsonb_build_object('key','immediate_action_taken','label','Immediate Action Taken','type','textarea','required',true),
      jsonb_build_object('key','staff_member_responsible','label','Staff Member Responsible','type','text','required',false)
    )
  );

  -- Medical Disclosure
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_health_safety, 'Medical Disclosure', 'Medical disclosure and documentation issues', 'high',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','disclosure_issue_type','label','Disclosure Issue Type','type','multiselect','required',true,'options',jsonb_build_array('Client medical form not collected','Medical condition disclosed but ignored by trainer','No system to flag medical conditions','Medical information not accessible to trainer','Client condition discovered during class','Other')),
      jsonb_build_object('key','medical_condition_involved','label','Medical Condition Involved','type','text','required',false),
      jsonb_build_object('key','trainer_name','label','Trainer Name','type','select','required',false,'options',trainer_options),
      jsonb_build_object('key','when_was_condition_disclosed','label','When Was Condition Disclosed','type','select','required',true,'options',jsonb_build_array('Before first class','During check-in','During class','After incident','Never disclosed')),
      jsonb_build_object('key','was_information_documented','label','Was Information Documented','type','radio','required',true,'options',jsonb_build_array('Yes','No','Unsure')),
      jsonb_build_object('key','trainer_had_access','label','Trainer Had Access to Information','type','radio','required',false,'options',jsonb_build_array('Yes','No','Unsure','N/A')),
      jsonb_build_object('key','impact_on_client','label','Impact on Client','type','select','required',true,'options',jsonb_build_array('No impact','Minor discomfort','Injury/health incident','Client complaint','Other')),
      jsonb_build_object('key','system_improvement_needed','label','System Improvement Needed','type','textarea','required',false)
    )
  );

  -- Equipment Safety
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_health_safety, 'Equipment Safety', 'Unsafe or damaged equipment', 'high',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','equipment_type','label','Equipment Type','type','multiselect','required',true,'options',jsonb_build_array('Barres','Mats','Weights','Resistance bands','Balls','Blocks','Straps','Benches','Cycles','Other')),
      jsonb_build_object('key','safety_issue','label','Safety Issue','type','multiselect','required',true,'options',jsonb_build_array('Broken/damaged','Sharp edges','Unstable/wobbly','Worn out','Missing parts','Improper assembly','Poor maintenance','Other')),
      jsonb_build_object('key','equipment_id_number','label','Equipment ID/Number','type','text','required',false),
      jsonb_build_object('key','has_this_caused_injury','label','Has This Caused Injury','type','radio','required',true,'options',jsonb_build_array('Yes','No','Near miss')),
      jsonb_build_object('key','equipment_removed_from_use','label','Equipment Removed from Use','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','last_safety_check_date','label','Last Safety Check Date','type','date','required',false),
      jsonb_build_object('key','immediate_action_taken','label','Immediate Action Taken','type','textarea','required',true)
    )
  );

  -- Air Quality
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_health_safety, 'Air Quality', 'Air quality and ventilation issues', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','air_quality_issue','label','Air Quality Issue','type','multiselect','required',true,'options',jsonb_build_array('Poor ventilation','Stuffy/stale air','Strong chemical smells','Cleaning product odors','Mold/mildew smell','Excessive humidity','Temperature too hot/cold','Other')),
      jsonb_build_object('key','area_affected','label','Area Affected','type','multiselect','required',true,'options',jsonb_build_array('Main studio','Second studio','Bathrooms','Changing rooms','Reception','Entire facility','Other')),
      jsonb_build_object('key','time_of_day','label','Time of Day','type','text','required',false),
      jsonb_build_object('key','client_complaints_received','label','Client Complaints Received','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','number_of_complaints','label','Number of Complaints','type','number','required',false),
      jsonb_build_object('key','hvac_system_status','label','HVAC System Status','type','select','required',true,'options',jsonb_build_array('Working normally','Not working','Partially working','Unknown')),
      jsonb_build_object('key','temperature_reading','label','Temperature Reading','type','number','required',false),
      jsonb_build_object('key','health_impact_observed','label','Health Impact Observed','type','multiselect','required',false,'options',jsonb_build_array('None','Difficulty breathing','Headaches','Nausea','Eye irritation','Skin irritation','Other')),
      jsonb_build_object('key','immediate_action_taken','label','Immediate Action Taken','type','textarea','required',false)
    )
  );

  -- ============================================
  -- CATEGORY: Community & Culture
  -- ============================================
  INSERT INTO categories (name, icon, color_code, display_order, description)
  VALUES ('Community & Culture', 'users', '#0EA5E9', 5, 'Clique behavior, discrimination, member behavior, inclusivity, community events, studio culture')
  RETURNING id INTO cat_community_culture;

  -- Clique Behavior
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_community_culture, 'Clique Behavior', 'Exclusionary behavior and cliques', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','clique_behavior_observed','label','Clique Behavior Observed','type','multiselect','required',true,'options',jsonb_build_array('Regular members excluding new clients','Reserved spots/areas','Unwelcoming body language','Private conversations excluding others','Trainer showing favoritism','Group monopolizing equipment','Other')),
      jsonb_build_object('key','location_time_observation','label','Location/Time of Observation','type','text','required',true),
      jsonb_build_object('key','trainer_name','label','Trainer Name (if applicable)','type','select','required',false,'options',trainer_options),
      jsonb_build_object('key','specific_members_involved','label','Specific Members Involved','type','text','required',false),
      jsonb_build_object('key','client_who_felt_excluded','label','Client Who Felt Excluded','type','text','required',false),
      jsonb_build_object('key','new_client_impact','label','New Client Impact','type','radio','required',true,'options',jsonb_build_array('Yes - new client affected','No - general observation')),
      jsonb_build_object('key','observed_behavior_details','label','Observed Behavior Details','type','textarea','required',true),
      jsonb_build_object('key','action_taken_at_time','label','Action Taken at Time','type','textarea','required',false)
    )
  );

  -- Discrimination
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_community_culture, 'Discrimination', 'Discriminatory behavior or comments', 'critical',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','type_of_discrimination','label','Type of Discrimination','type','multiselect','required',true,'options',jsonb_build_array('Body type/size','Fitness level','Age','Gender','Appearance','Ability/disability','Socioeconomic status','Other')),
      jsonb_build_object('key','source_of_discrimination','label','Source of Discrimination','type','radio','required',true,'options',jsonb_build_array('Trainer','Staff member','Other client','Multiple sources')),
      jsonb_build_object('key','trainer_staff_name','label','Trainer/Staff Name','type','select','required',false,'options',trainer_options),
      jsonb_build_object('key','specific_incident_description','label','Specific Incident Description','type','textarea','required',true),
      jsonb_build_object('key','verbal_or_nonverbal','label','Verbal or Non-Verbal','type','multiselect','required',true,'options',jsonb_build_array('Verbal comments','Body language','Exclusionary actions','Differential treatment','Other')),
      jsonb_build_object('key','witness_present','label','Witness Present','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','witness_names','label','Witness Names','type','text','required',false),
      jsonb_build_object('key','client_impact','label','Client Impact','type','select','required',true,'options',jsonb_build_array('Client upset but continuing','Client considering leaving','Client left immediately','Client requested refund','Other')),
      jsonb_build_object('key','immediate_action_taken','label','Immediate Action Taken','type','textarea','required',true),
      jsonb_build_object('key','followup_required','label','Follow-up Required','type','radio','required',true,'options',jsonb_build_array('Yes','No'))
    )
  );

  -- Member Behavior
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_community_culture, 'Member Behavior', 'Disruptive or inappropriate member behavior', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','disruptive_behavior_type','label','Disruptive Behavior Type','type','multiselect','required',true,'options',jsonb_build_array('Loud talking during class','Phone usage during class','Late arrival disruption','Early departure disruption','Arguing with staff','Inappropriate conduct','Equipment hogging','Not following studio rules','Other')),
      jsonb_build_object('key','member_name','label','Member Name','type','text','required',true),
      jsonb_build_object('key','member_phone_email','label','Member Phone/Email','type','text','required',false),
      jsonb_build_object('key','class_type','label','Class Type','type','select','required',false,'options',class_options),
      jsonb_build_object('key','trainer_name','label','Trainer Name','type','select','required',false,'options',trainer_options),
      jsonb_build_object('key','frequency_of_behavior','label','Frequency of Behavior','type','select','required',true,'options',jsonb_build_array('First time','Occasional (2-3 times)','Frequent (repeated issue)','Ongoing pattern')),
      jsonb_build_object('key','other_clients_impacted','label','Other Clients Impacted','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','incident_description','label','Incident Description','type','textarea','required',true),
      jsonb_build_object('key','trainer_addressed_behavior','label','Trainer Addressed Behavior','type','radio','required',true,'options',jsonb_build_array('Yes','No','Trainer not aware')),
      jsonb_build_object('key','member_response','label','Member Response','type','select','required',false,'options',jsonb_build_array('Apologetic/cooperative','Defensive','Refused to comply','Argumentative','Left class','Other')),
      jsonb_build_object('key','warning_issued','label','Warning Issued','type','radio','required',false,'options',jsonb_build_array('Yes','No'))
    )
  );

  -- Inclusivity Issues
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_community_culture, 'Inclusivity Issues', 'Lack of inclusivity or welcoming environment', 'high',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','inclusivity_concern','label','Inclusivity Concern','type','multiselect','required',true,'options',jsonb_build_array('Not welcoming to beginners','Lack of body positivity','Judgmental atmosphere','Language/terminology issues','Lack of modifications offered','Assumptions about abilities','Lack of diverse representation','Other')),
      jsonb_build_object('key','source_of_issue','label','Source of Issue','type','radio','required',true,'options',jsonb_build_array('Trainer behavior','Staff behavior','Studio messaging/materials','Other clients','General environment','Multiple sources')),
      jsonb_build_object('key','trainer_name','label','Trainer Name (if applicable)','type','select','required',false,'options',trainer_options),
      jsonb_build_object('key','specific_incident_observation','label','Specific Incident/Observation','type','textarea','required',true),
      jsonb_build_object('key','client_affected','label','Client Affected','type','text','required',false),
      jsonb_build_object('key','client_feedback_verbatim','label','Client Feedback Verbatim','type','textarea','required',false),
      jsonb_build_object('key','impact_on_client','label','Impact on Client','type','select','required',true,'options',jsonb_build_array('Minor discomfort','Client upset','Client considering leaving','Client left/requested refund','Other')),
      jsonb_build_object('key','pattern_or_isolated','label','Pattern or Isolated','type','radio','required',true,'options',jsonb_build_array('Isolated incident','Pattern observed','Multiple reports received'))
    )
  );

  -- Community Events
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_community_culture, 'Community Events', 'Issues with community events', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','event_name','label','Event Name','type','text','required',true),
      jsonb_build_object('key','event_date','label','Event Date','type','date','required',true),
      jsonb_build_object('key','issue_type','label','Issue Type','type','multiselect','required',true,'options',jsonb_build_array('Poor organization','Low attendance','Lack of engagement','Technical problems','Venue issues','Poor communication','Event not inclusive','Not aligned with brand','Other')),
      jsonb_build_object('key','attendance','label','Attendance','type','number','required',false),
      jsonb_build_object('key','expected_attendance','label','Expected Attendance','type','number','required',false),
      jsonb_build_object('key','detailed_description','label','Detailed Description','type','textarea','required',true),
      jsonb_build_object('key','client_feedback_received','label','Client Feedback Received','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','feedback_summary','label','Feedback Summary','type','textarea','required',false),
      jsonb_build_object('key','organizer_responsible_party','label','Organizer/Responsible Party','type','text','required',false)
    )
  );

  -- Studio Culture
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_community_culture, 'Studio Culture', 'Overall studio culture concerns', 'high',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','cultural_issue_type','label','Cultural Issue Type','type','multiselect','required',true,'options',jsonb_build_array('Toxic environment','Comparison culture','Lack of support','Competitive rather than collaborative','Pressure to purchase/upgrade','Emphasis on appearance over wellness','Body shaming language','Other')),
      jsonb_build_object('key','where_issue_manifests','label','Where Issue Manifests','type','multiselect','required',true,'options',jsonb_build_array('In classes','Social media','Front desk interactions','Marketing materials','Trainer communications','Member interactions','Studio-wide','Other')),
      jsonb_build_object('key','trainer_staff_contributing','label','Trainer/Staff Contributing','type','text','required',false),
      jsonb_build_object('key','specific_examples_incidents','label','Specific Examples/Incidents','type','textarea','required',true),
      jsonb_build_object('key','client_feedback_complaints','label','Client Feedback/Complaints','type','textarea','required',false),
      jsonb_build_object('key','number_of_clients_affected','label','Number of Clients Affected','type','select','required',true,'options',jsonb_build_array('Single client','Few clients (2-5)','Multiple clients (6-10)','Many clients (10+)','Widespread concern')),
      jsonb_build_object('key','impact_on_business','label','Impact on Business','type','select','required',true,'options',jsonb_build_array('No visible impact','Clients expressing concern','Clients reducing visits','Clients leaving','Negative reviews/word of mouth','Other')),
      jsonb_build_object('key','duration_of_issue','label','Duration of Issue','type','select','required',true,'options',jsonb_build_array('New concern','Noticed in past month','Ongoing for several months','Long-term pattern'))
    )
  );

  -- ============================================
  -- CATEGORY: Retail & Merchandise
  -- ============================================
  INSERT INTO categories (name, icon, color_code, display_order, description)
  VALUES ('Retail & Merchandise', 'shopping-bag', '#FB7185', 6, 'Product quality/availability, pricing, returns/exchanges, staff knowledge')
  RETURNING id INTO cat_retail_merch;

  -- Product Quality
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_retail_merch, 'Product Quality', 'Product quality and defect issues', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','product_name_type','label','Product Name/Type','type','text','required',true),
      jsonb_build_object('key','product_category','label','Product Category','type','select','required',true,'options',jsonb_build_array('Apparel','Accessories','Equipment','Supplements/Wellness','Gift items','Other')),
      jsonb_build_object('key','quality_issue','label','Quality Issue','type','multiselect','required',true,'options',jsonb_build_array('Defective/broken','Poor material quality','Sizing issues','Color/design defect','Stitching/construction problems','Not as described','Damaged in transit','Other')),
      jsonb_build_object('key','purchase_date','label','Purchase Date','type','date','required',true),
      jsonb_build_object('key','purchase_amount','label','Purchase Amount','type','number','required',true),
      jsonb_build_object('key','resolution_requested','label','Resolution Requested','type','radio','required',true,'options',jsonb_build_array('Refund','Exchange','Store credit','Repair'))
    )
  );

  -- Product Availability
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_retail_merch, 'Product Availability', 'Out of stock or unavailable products', 'low',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','product_requested','label','Product Requested','type','text','required',true),
      jsonb_build_object('key','product_category','label','Product Category','type','select','required',true,'options',jsonb_build_array('Apparel','Accessories','Equipment','Supplements/Wellness','Gift items','Other')),
      jsonb_build_object('key','availability_issue','label','Availability Issue','type','multiselect','required',true,'options',jsonb_build_array('Out of stock','Size unavailable','Color/variant unavailable','Limited selection','Discontinued','Never stocked','Other')),
      jsonb_build_object('key','size_variant_needed','label','Size/Variant Needed','type','text','required',false),
      jsonb_build_object('key','client_wait_time','label','Client Wait Time','type','select','required',false,'options',jsonb_build_array('Willing to wait','Wants notification when available','Needs immediately','Already waited too long','Other')),
      jsonb_build_object('key','frequency_of_request','label','Frequency of Request','type','select','required',true,'options',jsonb_build_array('First time asking','Asked before','Multiple clients requesting','High demand item')),
      jsonb_build_object('key','alternative_offered','label','Alternative Offered','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','alternative_accepted','label','Alternative Accepted','type','radio','required',false,'options',jsonb_build_array('Yes','No','N/A')),
      jsonb_build_object('key','stock_request_submitted','label','Stock Request Submitted','type','radio','required',false,'options',jsonb_build_array('Yes','No'))
    )
  );

  -- Pricing
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_retail_merch, 'Pricing', 'Pricing disputes and issues', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','product_service_name','label','Product/Service Name','type','text','required',true),
      jsonb_build_object('key','pricing_issue','label','Pricing Issue','type','multiselect','required',true,'options',jsonb_build_array('Too expensive','No value for money','Price increased without notice','Hidden charges/fees','Price different than displayed','Competitor pricing lower','Other')),
      jsonb_build_object('key','listed_price','label','Listed Price','type','number','required',false),
      jsonb_build_object('key','charged_price','label','Charged Price','type','number','required',false),
      jsonb_build_object('key','discrepancy_details','label','Discrepancy Details','type','textarea','required',false),
      jsonb_build_object('key','client_expectation','label','Client Expectation','type','textarea','required',true),
      jsonb_build_object('key','competitor_comparison','label','Competitor Comparison','type','text','required',false),
      jsonb_build_object('key','resolution_offered','label','Resolution Offered','type','textarea','required',false),
      jsonb_build_object('key','client_satisfied_with_resolution','label','Client Satisfied with Resolution','type','radio','required',false,'options',jsonb_build_array('Yes','No','Partially'))
    )
  );

  -- Return/Exchange
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_retail_merch, 'Return/Exchange', 'Return and exchange issues', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','product_name','label','Product Name','type','text','required',true),
      jsonb_build_object('key','purchase_date','label','Purchase Date','type','date','required',true),
      jsonb_build_object('key','receipt_available','label','Receipt Available','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','receipt_invoice_number','label','Receipt/Invoice Number','type','text','required',false),
      jsonb_build_object('key','reason_for_return','label','Reason for Return','type','multiselect','required',true,'options',jsonb_build_array('Defective product','Wrong size','Wrong item','Changed mind','Quality issues','Not as expected','Gift return','Other')),
      jsonb_build_object('key','product_condition','label','Product Condition','type','select','required',true,'options',jsonb_build_array('Unused with tags','Unused without tags','Gently used','Heavily used','Damaged')),
      jsonb_build_object('key','client_request_type','label','Client Request Type','type','radio','required',true,'options',jsonb_build_array('Refund','Exchange','Store credit')),
      jsonb_build_object('key','policy_issue','label','Policy Issue','type','multiselect','required',false,'options',jsonb_build_array('Outside return window','No receipt','Item used','Final sale item','Policy not clearly communicated','Policy too restrictive','Other')),
      jsonb_build_object('key','days_since_purchase','label','Days Since Purchase','type','number','required',true),
      jsonb_build_object('key','exception_requested','label','Exception Requested','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','manager_approval','label','Manager Approval','type','radio','required',false,'options',jsonb_build_array('Approved','Denied','Pending')),
      jsonb_build_object('key','resolution_provided','label','Resolution Provided','type','textarea','required',false)
    )
  );

  -- Staff Knowledge
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_retail_merch, 'Staff Knowledge', 'Staff lacking product knowledge', 'low',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','staff_member_name','label','Staff Member Name','type','select','required',false,'options',jsonb_build_array('Akshay Rane','Vahishta Fitter','Zaheer Agarbattiwala','Zahur Shaikh','Nadiya Shaikh','Admin Admin','Shipra Bhika','Imran Shaikh','Tahira Sayyed','Manisha Rathod','Sheetal Kataria','Priyanka Abnave','Api Serou','Prathap Kp','Pavanthika','Santhosh Kumar')),
      jsonb_build_object('key','knowledge_gap_type','label','Knowledge Gap Type','type','multiselect','required',true,'options',jsonb_build_array('Product features','Sizing information','Pricing/promotions','Product availability','Return/exchange policy','Product care instructions','Wrong information given','Unable to answer questions','Other')),
      jsonb_build_object('key','product_topic','label','Product/Topic','type','text','required',true),
      jsonb_build_object('key','client_experience_impact','label','Client Experience Impact','type','select','required',true,'options',jsonb_build_array('Minor inconvenience','Delayed purchase','Wrong purchase made','Client frustrated','Lost sale','Other')),
      jsonb_build_object('key','incorrect_information_given','label','Incorrect Information Given','type','textarea','required',false),
      jsonb_build_object('key','correct_information','label','Correct Information','type','textarea','required',false),
      jsonb_build_object('key','training_need_identified','label','Training Need Identified','type','textarea','required',true),
      jsonb_build_object('key','issue_corrected','label','Issue Corrected','type','radio','required',true,'options',jsonb_build_array('Yes','No'))
    )
  );

  -- ============================================
  -- CATEGORY: Special Programs
  -- ============================================
  INSERT INTO categories (name, icon, color_code, display_order, description)
  VALUES ('Special Programs', 'star', '#A78BFA', 7, 'Workshops, private sessions, corporate programs, special needs, challenges')
  RETURNING id INTO cat_special_programs;

  -- Workshop Quality
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_special_programs, 'Workshop Quality', 'Workshop quality and organization issues', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','workshop_name','label','Workshop Name','type','text','required',true),
      jsonb_build_object('key','workshop_date','label','Workshop Date','type','date','required',true),
      jsonb_build_object('key','instructor_name','label','Instructor Name','type','select','required',true,'options',trainer_options),
      jsonb_build_object('key','quality_issue','label','Quality Issue','type','multiselect','required',true,'options',jsonb_build_array('Poor instruction quality','Disorganized/poorly structured','Overcrowded','Not worth the fee','Content not as advertised','Too basic/advanced','Insufficient time','Poor venue setup','Other')),
      jsonb_build_object('key','number_of_participants','label','Number of Participants','type','number','required',false),
      jsonb_build_object('key','workshop_fee','label','Workshop Fee','type','number','required',false),
      jsonb_build_object('key','client_feedback_summary','label','Client Feedback Summary','type','textarea','required',true),
      jsonb_build_object('key','number_of_complaints','label','Number of Complaints','type','number','required',true),
      jsonb_build_object('key','refund_requested','label','Refund Requested','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','number_requesting_refund','label','Number Requesting Refund','type','number','required',false),
      jsonb_build_object('key','specific_incident_description','label','Specific Incident Description','type','textarea','required',true)
    )
  );

  -- Private Sessions
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_special_programs, 'Private Sessions', 'Private session issues', 'high',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','issue_type','label','Issue Type','type','multiselect','required',true,'options',jsonb_build_array('Instructor unavailability','Last-minute cancellation','Scheduling conflicts','Pricing disputes','Session quality issues','Instructor unprepared','Not customized to client needs','Other')),
      jsonb_build_object('key','trainer_name','label','Trainer Name','type','select','required',true,'options',trainer_options),
      jsonb_build_object('key','session_date_time','label','Session Date/Time','type','datetime','required',true),
      jsonb_build_object('key','client_name','label','Client Name','type','text','required',true),
      jsonb_build_object('key','session_type','label','Session Type','type','select','required',true,'options',jsonb_build_array('Single private','Semi-private (2 clients)','Small group private','Package series','Other')),
      jsonb_build_object('key','cancellation_notice','label','Cancellation Notice','type','select','required',false,'options',jsonb_build_array('No notice','Less than 24hrs','24-48hrs','More than 48hrs','N/A')),
      jsonb_build_object('key','who_cancelled','label','Who Cancelled','type','radio','required',false,'options',jsonb_build_array('Client','Trainer','Studio','N/A')),
      jsonb_build_object('key','cancellation_reason','label','Cancellation Reason','type','textarea','required',false),
      jsonb_build_object('key','session_price','label','Session Price','type','number','required',false),
      jsonb_build_object('key','refund_credit_issued','label','Refund/Credit Issued','type','radio','required',false,'options',jsonb_build_array('Full refund','Partial refund','Credit issued','No compensation','N/A')),
      jsonb_build_object('key','detailed_incident_description','label','Detailed Incident Description','type','textarea','required',true),
      jsonb_build_object('key','rescheduling_attempted','label','Rescheduling Attempted','type','radio','required',false,'options',jsonb_build_array('Yes','No','N/A')),
      jsonb_build_object('key','client_satisfaction','label','Client Satisfaction','type','select','required',true,'options',jsonb_build_array('Satisfied with resolution','Partially satisfied','Unsatisfied','Very upset','Other'))
    )
  );

  -- Corporate Programs
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_special_programs, 'Corporate Programs', 'Corporate program issues', 'high',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','company_name','label','Company Name','type','text','required',true),
      jsonb_build_object('key','program_type','label','Program Type','type','select','required',true,'options',jsonb_build_array('Ongoing weekly classes','One-time workshop','Wellness challenge','Series package','Event','Other')),
      jsonb_build_object('key','issue_type','label','Issue Type','type','multiselect','required',true,'options',jsonb_build_array('Poor coordination','Communication gaps','Unsuitable timing','Wrong location','Lack of customization','Pricing disputes','Low attendance','Content not appropriate','Other')),
      jsonb_build_object('key','program_dates','label','Program Date(s)','type','text','required',true),
      jsonb_build_object('key','trainer_name','label','Trainer Name','type','select','required',false,'options',trainer_options),
      jsonb_build_object('key','number_of_participants_expected','label','Number of Participants Expected','type','number','required',false),
      jsonb_build_object('key','actual_participation','label','Actual Participation','type','number','required',false),
      jsonb_build_object('key','corporate_contact_name','label','Corporate Contact Name','type','text','required',false),
      jsonb_build_object('key','corporate_contact_email','label','Corporate Contact Email','type','email','required',false),
      jsonb_build_object('key','detailed_issue_description','label','Detailed Issue Description','type','textarea','required',true),
      jsonb_build_object('key','company_feedback','label','Company Feedback','type','textarea','required',false),
      jsonb_build_object('key','contract_at_risk','label','Contract at Risk','type','radio','required',true,'options',jsonb_build_array('Yes','No','Unknown'))
    )
  );

  -- Special Needs Programs
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_special_programs, 'Special Needs Programs', 'Special needs and adaptive programs', 'high',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','program_type','label','Program Type','type','multiselect','required',true,'options',jsonb_build_array('Prenatal','Postnatal','Seniors','Injury recovery/rehabilitation','Adaptive fitness','Other special needs')),
      jsonb_build_object('key','issue_type','label','Issue Type','type','multiselect','required',true,'options',jsonb_build_array('Program not offered','Limited availability','Inadequate modifications','Instructor not trained','Unsafe practices','Not accommodating enough','Lack of specialized equipment','Other')),
      jsonb_build_object('key','trainer_name','label','Trainer Name','type','select','required',false,'options',trainer_options),
      jsonb_build_object('key','client_specific_need','label','Client Specific Need','type','textarea','required',true),
      jsonb_build_object('key','modification_requested','label','Modification Requested','type','textarea','required',false),
      jsonb_build_object('key','modification_provided','label','Modification Provided','type','radio','required',false,'options',jsonb_build_array('Yes - adequate','Yes - inadequate','No','N/A')),
      jsonb_build_object('key','trainer_certification_training','label','Trainer Certification/Training','type','radio','required',false,'options',jsonb_build_array('Trainer is certified','Trainer not certified','Unknown')),
      jsonb_build_object('key','safety_concern','label','Safety Concern','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','safety_concern_details','label','Safety Concern Details','type','textarea','required',false),
      jsonb_build_object('key','detailed_incident_description','label','Detailed Incident Description','type','textarea','required',true),
      jsonb_build_object('key','program_demand_assessment','label','Program Demand Assessment','type','select','required',true,'options',jsonb_build_array('Single request','Occasional requests','Frequent requests','High demand','Unknown'))
    )
  );

  -- Challenges & Competitions
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_special_programs, 'Challenges & Competitions', 'Challenge and competition issues', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','challenge_competition_name','label','Challenge/Competition Name','type','text','required',true),
      jsonb_build_object('key','challenge_date_range','label','Challenge Date Range','type','text','required',true),
      jsonb_build_object('key','issue_type','label','Issue Type','type','multiselect','required',true,'options',jsonb_build_array('Poor organization','Unfair rules','Rules not clear','Tracking issues','Communication problems','Prizes not delivered','Wrong winners announced','Lack of engagement','Other')),
      jsonb_build_object('key','number_of_participants','label','Number of Participants','type','number','required',false),
      jsonb_build_object('key','specific_incident_description','label','Specific Incident Description','type','textarea','required',true),
      jsonb_build_object('key','participant_complaints','label','Participant Complaints','type','number','required',false),
      jsonb_build_object('key','prize_reward_issue','label','Prize/Reward Issue','type','radio','required',true,'options',jsonb_build_array('Yes','No','N/A')),
      jsonb_build_object('key','prize_details','label','Prize Details','type','textarea','required',false),
      jsonb_build_object('key','rules_clarity','label','Rules Clarity','type','select','required',false,'options',jsonb_build_array('Very clear','Somewhat clear','Unclear','Contradictory','Changed mid-challenge')),
      jsonb_build_object('key','staff_member_responsible','label','Staff Member Responsible','type','text','required',false),
      jsonb_build_object('key','resolution_required','label','Resolution Required','type','textarea','required',true)
    )
  );

  -- ============================================
  -- CATEGORY: Miscellaneous
  -- ============================================
  INSERT INTO categories (name, icon, color_code, display_order, description)
  VALUES ('Miscellaneous', 'more-horizontal', '#64748B', 8, 'Noise, policy changes, guest experience, lost & found, nutrition advice, multi-location issues, feedback system')
  RETURNING id INTO cat_miscellaneous;

  -- Noise Disturbance
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_miscellaneous, 'Noise Disturbance', 'Noise and disturbance issues', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','noise_source','label','Noise Source','type','multiselect','required',true,'options',jsonb_build_array('Other studio classes','External construction','Street noise','Building maintenance','HVAC system','Music too loud','Equipment noise','Other studio/business in building','Other')),
      jsonb_build_object('key','noise_level_impact','label','Noise Level Impact','type','select','required',true,'options',jsonb_build_array('Minor distraction','Moderate disruption','Unable to hear instructor','Class had to pause','Class cancelled')),
      jsonb_build_object('key','time_of_occurrence','label','Time of Occurrence','type','text','required',true),
      jsonb_build_object('key','frequency','label','Frequency','type','select','required',true,'options',jsonb_build_array('One-time','Occasional','Daily','Ongoing issue')),
      jsonb_build_object('key','class_affected','label','Class Affected','type','select','required',false,'options',class_options),
      jsonb_build_object('key','trainer_name','label','Trainer Name','type','select','required',false,'options',trainer_options),
      jsonb_build_object('key','client_complaints','label','Client Complaints','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','number_of_complaints','label','Number of Complaints','type','number','required',false),
      jsonb_build_object('key','immediate_action_taken','label','Immediate Action Taken','type','textarea','required',false),
      jsonb_build_object('key','building_management_notified','label','Building Management Notified','type','radio','required',false,'options',jsonb_build_array('Yes','No','N/A'))
    )
  );

  -- Policy Changes
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_miscellaneous, 'Policy Changes', 'Policy change communication issues', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','policy_type','label','Policy Type','type','select','required',true,'options',jsonb_build_array('Cancellation policy','Booking policy','Pricing','Membership terms','Class packages','Retail','Studio rules','Other')),
      jsonb_build_object('key','policy_change_description','label','Policy Change Description','type','textarea','required',true),
      jsonb_build_object('key','effective_date','label','Effective Date','type','date','required',true),
      jsonb_build_object('key','communication_issue','label','Communication Issue','type','multiselect','required',true,'options',jsonb_build_array('Not communicated at all','Communicated too late','Insufficient notice','Unclear communication','Only communicated to some clients','Staff not informed','Other')),
      jsonb_build_object('key','client_impact','label','Client Impact','type','multiselect','required',true,'options',jsonb_build_array('Financial impact','Scheduling disruption','Confusion','Frustration','Changed plans based on old policy','Client considering leaving','Other')),
      jsonb_build_object('key','number_of_clients_affected','label','Number of Clients Affected','type','select','required',true,'options',jsonb_build_array('Single client','Few clients (2-5)','Multiple clients (6-10)','Many clients (10+)','All clients')),
      jsonb_build_object('key','client_feedback_summary','label','Client Feedback Summary','type','textarea','required',true),
      jsonb_build_object('key','policy_fairness_concern','label','Policy Fairness Concern','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','fairness_concern_details','label','Fairness Concern Details','type','textarea','required',false),
      jsonb_build_object('key','exception_requests','label','Exception Requests','type','number','required',false)
    )
  );

  -- Guest Experience
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_miscellaneous, 'Guest Experience', 'Guest and visitor experience issues', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','guest_name','label','Guest Name','type','text','required',true),
      jsonb_build_object('key','guest_type','label','Guest Type','type','select','required',true,'options',jsonb_build_array('Hosted class guest','Trial/newcomer','Drop-in','Brought by member','Corporate/event guest','Other')),
      jsonb_build_object('key','hosting_member','label','Hosting Member','type','text','required',false),
      jsonb_build_object('key','issue_type','label','Issue Type','type','multiselect','required',true,'options',jsonb_build_array('Unwelcoming treatment','Complicated check-in process','Unclear policies','Different pricing than expected','Not given proper orientation','Felt rushed','Felt judged','Other')),
      jsonb_build_object('key','staff_member_involved','label','Staff Member Involved','type','select','required',false,'options',jsonb_build_array('Akshay Rane','Vahishta Fitter','Zaheer Agarbattiwala','Zahur Shaikh','Nadiya Shaikh','Admin Admin','Shipra Bhika','Imran Shaikh','Tahira Sayyed','Manisha Rathod','Sheetal Kataria','Priyanka Abnave','Api Serou','Prathap Kp','Pavanthika','Santhosh Kumar')),
      jsonb_build_object('key','trainer_name','label','Trainer Name','type','select','required',false,'options',trainer_options),
      jsonb_build_object('key','guest_feedback','label','Guest Feedback','type','textarea','required',true),
      jsonb_build_object('key','likelihood_to_return','label','Likelihood to Return','type','select','required',false,'options',jsonb_build_array('Will definitely return','Might return','Unlikely to return','Definitely not returning','Unknown')),
      jsonb_build_object('key','likelihood_to_purchase_membership','label','Likelihood to Purchase Membership','type','select','required',false,'options',jsonb_build_array('Interested','Considering','Not interested','Already purchased','Unknown')),
      jsonb_build_object('key','detailed_incident_description','label','Detailed Incident Description','type','textarea','required',true)
    )
  );

  -- Lost & Found
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_miscellaneous, 'Lost & Found', 'Lost and found system issues', 'low',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','issue_type','label','Issue Type','type','radio','required',true,'options',jsonb_build_array('Item lost','Item found','Item claimed','System issue')),
      jsonb_build_object('key','item_description','label','Item Description','type','textarea','required',true),
      jsonb_build_object('key','item_category','label','Item Category','type','select','required',true,'options',jsonb_build_array('Clothing','Jewelry','Phone/electronics','Keys','Wallet/purse','Water bottle','Workout equipment','Other')),
      jsonb_build_object('key','date_lost_found','label','Date Lost/Found','type','date','required',true),
      jsonb_build_object('key','location_in_studio','label','Location in Studio','type','text','required',false),
      jsonb_build_object('key','client_name','label','Client Name','type','text','required',false),
      jsonb_build_object('key','client_contact','label','Client Contact','type','text','required',false),
      jsonb_build_object('key','lost_found_system_issue','label','Lost & Found System Issue','type','multiselect','required',false,'options',jsonb_build_array('No system in place','Items not logged','Items misplaced','No notification sent','Unable to find logged item','Items donated too quickly','Other')),
      jsonb_build_object('key','item_value','label','Item Value','type','select','required',false,'options',jsonb_build_array('Low value (<₹1000)','Medium value (₹1000-5000)','High value (>₹5000)')),
      jsonb_build_object('key','action_taken','label','Action Taken','type','textarea','required',true),
      jsonb_build_object('key','item_status','label','Item Status','type','select','required',true,'options',jsonb_build_array('Still searching','Found and returned','Found awaiting claim','Not found','Donated/disposed','Other'))
    )
  );

  -- Nutrition/Wellness Advice
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_miscellaneous, 'Nutrition/Wellness Advice', 'Inappropriate nutrition or wellness advice', 'high',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','issue_type','label','Issue Type','type','multiselect','required',true,'options',jsonb_build_array('Unqualified advice given','Conflicting information from different staff','Pushy supplement sales','Medical advice given inappropriately','Dietary restrictions ignored','Unsafe recommendations','Other')),
      jsonb_build_object('key','staff_member_trainer','label','Staff Member/Trainer','type','select','required',true,'options',trainer_options),
      jsonb_build_object('key','topic_of_advice','label','Topic of Advice','type','multiselect','required',true,'options',jsonb_build_array('Supplements','Diet/meal plans','Weight loss','Medical condition','Injury recovery','Performance enhancement','General wellness','Other')),
      jsonb_build_object('key','advice_given','label','Advice Given','type','textarea','required',true),
      jsonb_build_object('key','credentials_qualification','label','Credentials/Qualification','type','text','required',false),
      jsonb_build_object('key','client_impact','label','Client Impact','type','multiselect','required',true,'options',jsonb_build_array('No impact','Client confused','Client followed bad advice','Client experienced negative effects','Client complained','Other')),
      jsonb_build_object('key','sales_pressure','label','Sales Pressure','type','radio','required',true,'options',jsonb_build_array('Yes','No','N/A')),
      jsonb_build_object('key','product_being_sold','label','Product Being Sold','type','text','required',false)
    )
  );

  -- Multi-location Issues
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_miscellaneous, 'Multi-location Issues', 'Issues across multiple studio locations', 'medium',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','issue_type','label','Issue Type','type','multiselect','required',true,'options',jsonb_build_array('Credits not transferring','Package not valid at all locations','Different policies across studios','Booking confusion','Inconsistent pricing','Different class offerings','Technology/system issues','Staff gave conflicting info','Other')),
      jsonb_build_object('key','locations_involved','label','Locations Involved','type','multiselect','required',true,'options',location_options),
      jsonb_build_object('key','package_product_type','label','Package/Product Type','type','select','required',true,'options',package_options),
      jsonb_build_object('key','detailed_issue_description','label','Detailed Issue Description','type','textarea','required',true),
      jsonb_build_object('key','client_expectation','label','Client Expectation','type','textarea','required',true),
      jsonb_build_object('key','actual_result','label','Actual Result','type','textarea','required',true),
      jsonb_build_object('key','communication_source','label','Communication Source','type','select','required',false,'options',jsonb_build_array('Website','App','Staff member at location 1','Staff member at location 2','Email','Phone call','Other')),
      jsonb_build_object('key','technology_system_issue','label','Technology/System Issue','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','system_details','label','System Details','type','textarea','required',false),
      jsonb_build_object('key','client_impact','label','Client Impact','type','select','required',true,'options',jsonb_build_array('Unable to book class','Lost credits','Financial loss','Scheduling disruption','Frustration only','Other')),
      jsonb_build_object('key','resolution_required','label','Resolution Required','type','textarea','required',true)
    )
  );

  -- Feedback System
  INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
  VALUES (cat_miscellaneous, 'Feedback System', 'Issues with feedback and complaint systems', 'high',
    global_fields || jsonb_build_array(
      jsonb_build_object('key','feedback_system_issue','label','Feedback System Issue','type','multiselect','required',true,'options',jsonb_build_array('No way to provide feedback','Feedback form not working','Feedback not acknowledged','No response received','Response took too long','Dismissive response','Retaliation for negative feedback','Fear of retaliation','Other')),
      jsonb_build_object('key','feedback_channel_used','label','Feedback Channel Used','type','multiselect','required',true,'options',jsonb_build_array('In-person to staff','Email','Phone','Survey','Social media','Third-party review site','This ticketing system','Other')),
      jsonb_build_object('key','original_feedback_topic','label','Original Feedback Topic','type','select','required',true,'options',jsonb_build_array('Trainer','Class experience','Facilities','Billing','Customer service','Product/retail','Policy','Other')),
      jsonb_build_object('key','original_feedback_date','label','Original Feedback Date','type','date','required',false),
      jsonb_build_object('key','response_received','label','Response Received','type','radio','required',true,'options',jsonb_build_array('Yes','No')),
      jsonb_build_object('key','days_until_response','label','Days Until Response','type','number','required',false),
      jsonb_build_object('key','quality_of_response','label','Quality of Response','type','select','required',false,'options',jsonb_build_array('Helpful and professional','Acknowledged but unhelpful','Dismissive','Defensive','No response','N/A')),
      jsonb_build_object('key','retaliation_concern','label','Retaliation Concern','type','radio','required',true,'options',jsonb_build_array('Yes - suspected','Yes - confirmed','No','N/A')),
      jsonb_build_object('key','retaliation_details','label','Retaliation Details','type','textarea','required',false),
      jsonb_build_object('key','staff_member_involved','label','Staff Member Involved','type','select','required',false,'options',trainer_options),
      jsonb_build_object('key','client_current_status','label','Client Current Status','type','select','required',true,'options',jsonb_build_array('Still active and satisfied','Active but frustrated','Considering leaving','Already left','Other')),
      jsonb_build_object('key','detailed_description','label','Detailed Description','type','textarea','required',true),
      jsonb_build_object('key','improvement_suggestion','label','Improvement Suggestion','type','textarea','required',false)
    )
  );

  RAISE NOTICE 'Categories and subcategories created successfully!';
  RAISE NOTICE 'Total categories: 8 (Booking & Technology, Customer Service, Sales & Marketing, Health & Safety, Community & Culture, Retail & Merchandise, Special Programs, Miscellaneous)';
END $$;
