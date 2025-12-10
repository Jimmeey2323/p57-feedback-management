-- Safe Subcategories Installation
-- Run this to add subcategories to existing database
-- This will NOT create tables, only add subcategories

-- Check if subcategories already exist to avoid duplicates
DO $$
DECLARE
  scheduling_cat_id UUID;
  operations_team_id UUID;
  existing_count INT;
BEGIN
  -- Get IDs
  SELECT id INTO scheduling_cat_id FROM categories WHERE name = 'Scheduling' LIMIT 1;
  SELECT id INTO operations_team_id FROM teams WHERE name = 'Operations' LIMIT 1;

  -- Check if any scheduling subcategories exist
  SELECT COUNT(*) INTO existing_count 
  FROM subcategories 
  WHERE category_id = scheduling_cat_id;

  IF existing_count > 0 THEN
    RAISE NOTICE 'Scheduling subcategories already exist (% found). Skipping...', existing_count;
    RETURN;
  END IF;

  RAISE NOTICE 'Adding Scheduling subcategories...';

  -- Cancellation Policy
  INSERT INTO subcategories (category_id, name, default_team_id, default_priority, estimated_resolution_hours, form_fields) VALUES
  (scheduling_cat_id, 'Cancellation Policy', operations_team_id, 'medium', 24, '{
    "fields": [
      {
        "id": "client_request_cancellation",
        "label": "Did the client request a cancellation?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No"]
      },
      {
        "id": "cancellation_reason",
        "label": "What was the reason for cancellation?",
        "type": "dropdown",
        "required": true,
        "options": ["Schedule Conflict", "Personal Issue", "Injury", "Found Another Class", "Not Interested", "Other"]
      },
      {
        "id": "cancellation_within_timeframe",
        "label": "Was the cancellation done within the permitted timeframe?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No"]
      },
      {
        "id": "cancellation_policy_explained",
        "label": "Was the cancellation policy explained to the client?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No"]
      },
      {
        "id": "refund_credit_request",
        "label": "Did the client request a refund or credit for the cancelled class?",
        "type": "dropdown",
        "required": true,
        "options": ["Refund", "Credit", "No Request"]
      },
      {
        "id": "client_satisfied_cancellation",
        "label": "Was the client satisfied with the cancellation process?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No"]
      },
      {
        "id": "cancellation_additional_comments",
        "label": "Any additional comments from the client regarding cancellation?",
        "type": "textarea",
        "required": false,
        "placeholder": "Enter any additional details..."
      }
    ]
  }');

  -- Time Change
  INSERT INTO subcategories (category_id, name, default_team_id, default_priority, estimated_resolution_hours, form_fields) VALUES
  (scheduling_cat_id, 'Time Change', operations_team_id, 'medium', 24, '{
    "fields": [
      {
        "id": "client_request_time_change",
        "label": "Did the client request a time change for their class?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No"]
      },
      {
        "id": "time_change_reason",
        "label": "What was the reason for the time change request?",
        "type": "dropdown",
        "required": true,
        "options": ["Work Commitments", "Personal Schedule", "Travel", "Family Obligation", "Prefer Different Instructor", "Class Overlap", "No Specific Reason"]
      },
      {
        "id": "requested_time_slot",
        "label": "What time slot did the client request to change to?",
        "type": "dropdown",
        "required": true,
        "options": ["Morning", "Afternoon", "Evening"]
      },
      {
        "id": "requested_time_available",
        "label": "Was the requested time available?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No"]
      },
      {
        "id": "time_change_accommodated",
        "label": "Was the time change accommodated?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No", "Added to Waitlist"]
      },
      {
        "id": "client_satisfied_time_change",
        "label": "Was the client satisfied with the resolution?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No", "Needs Follow-up"]
      },
      {
        "id": "time_change_additional_comments",
        "label": "Any additional comments from the client regarding time change?",
        "type": "textarea",
        "required": false,
        "placeholder": "Enter any additional details..."
      }
    ]
  }');

  -- Level Change
  INSERT INTO subcategories (category_id, name, default_team_id, default_priority, estimated_resolution_hours, form_fields) VALUES
  (scheduling_cat_id, 'Level Change', operations_team_id, 'medium', 24, '{
    "fields": [
      {
        "id": "client_request_level_change",
        "label": "Did the client request a change in class level?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No"]
      },
      {
        "id": "requested_level",
        "label": "What level did the client request to move to?",
        "type": "dropdown",
        "required": true,
        "options": ["Beginner", "Intermediate", "Advanced"]
      },
      {
        "id": "level_change_reason",
        "label": "What was the reason for the level change request?",
        "type": "dropdown",
        "required": true,
        "options": ["Too Easy", "Too Difficult", "Recovering from Injury", "Advised by Instructor", "Personal Preference"]
      },
      {
        "id": "requested_level_available",
        "label": "Was the requested level available?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No"]
      },
      {
        "id": "level_change_accommodated",
        "label": "Was the level change accommodated?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No", "Added to Waitlist"]
      },
      {
        "id": "client_concerns_current_level",
        "label": "Did the client express concerns about the current class level?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No"]
      },
      {
        "id": "level_change_additional_comments",
        "label": "Any additional comments from the client regarding level change?",
        "type": "textarea",
        "required": false,
        "placeholder": "Enter any additional details..."
      }
    ]
  }');

  -- Additional Classes
  INSERT INTO subcategories (category_id, name, default_team_id, default_priority, estimated_resolution_hours, form_fields) VALUES
  (scheduling_cat_id, 'Additional Classes', operations_team_id, 'medium', 24, '{
    "fields": [
      {
        "id": "client_request_additional_classes",
        "label": "Did the client request additional class options?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No"]
      },
      {
        "id": "additional_class_type",
        "label": "What type of additional class was requested?",
        "type": "dropdown",
        "required": true,
        "options": ["Morning", "Evening", "Weekend", "Private Session"]
      },
      {
        "id": "request_related_to_instructor",
        "label": "Was the request related to a specific instructor?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No"]
      },
      {
        "id": "additional_class_reason",
        "label": "What was the reason for requesting additional classes?",
        "type": "dropdown",
        "required": true,
        "options": ["Unavailable Preferred Slots", "Need More Classes", "Want More Variety", "Prefer Specific Trainer", "Need Flexible Options"]
      },
      {
        "id": "additional_class_accommodated",
        "label": "Was the additional class request accommodated?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No", "Added to Waitlist"]
      },
      {
        "id": "client_satisfied_additional_classes",
        "label": "Was the client satisfied with the response?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No", "Needs Follow-up"]
      },
      {
        "id": "additional_classes_comments",
        "label": "Any additional comments from the client regarding additional classes?",
        "type": "textarea",
        "required": false,
        "placeholder": "Enter any additional details..."
      }
    ]
  }');

  -- Trainer Preferences
  INSERT INTO subcategories (category_id, name, default_team_id, default_priority, estimated_resolution_hours, form_fields) VALUES
  (scheduling_cat_id, 'Trainer Preferences', operations_team_id, 'medium', 24, '{
    "fields": [
      {
        "id": "client_request_specific_trainer",
        "label": "Did the client request a specific trainer for their session?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No"]
      },
      {
        "id": "requested_trainer",
        "label": "Which trainer did the client request?",
        "type": "dropdown",
        "required": true,
        "options": ["Anisha Shah", "Atulan Purohit", "Karanvir Bhatia", "Mrigakshi Jaiswal", "Reshma Sharma", "Karan Bhatia", "Pushyank Nahar", "Shruti Kulkarni", "Janhavi Jain", "Rohan Dahima", "Kajol Kanchan", "Vivaran Dhasmana", "Upasna Paranjpe", "Richard D''Costa", "Pranjali Jain", "Saniya Jaiswal", "Shruti Suresh", "Cauveri Vikrant", "Poojitha Bhaskar", "Nishanth Raj", "Siddhartha Kusuma", "Simonelle De Vitre", "Kabir Varma", "Simran Dutt", "Veena Narasimhan", "Anmol Sharma", "Bret Saldanha", "Raunak Khemuka", "Chaitanya Nahar", "Sovena Shetty"]
      },
      {
        "id": "trainer_preference_reason",
        "label": "What was the reason for preferring a specific trainer?",
        "type": "dropdown",
        "required": true,
        "options": ["Teaching Style", "Personal Comfort", "Trainer''s Energy", "Familiarity", "Past Positive Experience"]
      },
      {
        "id": "requested_trainer_available",
        "label": "Was the requested trainer available for the client''s preferred slot?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No"]
      },
      {
        "id": "trainer_preference_accommodated",
        "label": "Was the trainer preference accommodated?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No", "Alternate Option Given"]
      },
      {
        "id": "client_dissatisfaction_trainer",
        "label": "Did the client express dissatisfaction about a particular trainer?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No"]
      },
      {
        "id": "trainer_preference_comments",
        "label": "Any additional comments from the client regarding trainer preferences?",
        "type": "textarea",
        "required": false,
        "placeholder": "Enter any additional details..."
      }
    ]
  }');

  -- Class Capacity Issues
  INSERT INTO subcategories (category_id, name, default_team_id, default_priority, estimated_resolution_hours, form_fields) VALUES
  (scheduling_cat_id, 'Class Capacity Issues', operations_team_id, 'high', 12, '{
    "fields": [
      {
        "id": "client_mention_capacity_concerns",
        "label": "Did the client mention concerns regarding class capacity?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No"]
      },
      {
        "id": "capacity_concern_type",
        "label": "What was the concern about class capacity?",
        "type": "dropdown",
        "required": true,
        "options": ["Overcrowded", "Too Few Participants", "Couldn''t Book Preferred Class"]
      },
      {
        "id": "capacity_affect_experience",
        "label": "How did class capacity affect the client''s experience?",
        "type": "dropdown",
        "required": true,
        "options": ["Couldn''t Move Freely", "Felt Uncomfortable", "No Issue", "Preferred a More Social Setting"]
      },
      {
        "id": "client_on_waitlist",
        "label": "Was the client placed on a waitlist due to capacity issues?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No"]
      },
      {
        "id": "request_alternative_class",
        "label": "Did the client request an alternative class due to capacity issues?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No"]
      },
      {
        "id": "capacity_issue_resolved",
        "label": "Was the issue resolved to the client''s satisfaction?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No"]
      },
      {
        "id": "capacity_comments",
        "label": "Any additional comments from the client regarding class capacity?",
        "type": "textarea",
        "required": false,
        "placeholder": "Enter any additional details..."
      }
    ]
  }');

  -- Waitlist Concerns
  INSERT INTO subcategories (category_id, name, default_team_id, default_priority, estimated_resolution_hours, form_fields) VALUES
  (scheduling_cat_id, 'Waitlist Concerns', operations_team_id, 'medium', 24, '{
    "fields": [
      {
        "id": "difficulty_joining_waitlist",
        "label": "Did the client face difficulty joining a waitlisted class?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No"]
      },
      {
        "id": "waitlist_issue",
        "label": "What was the issue with the waitlist?",
        "type": "dropdown",
        "required": true,
        "options": ["Class Always Full", "Never Moves Up", "Unclear Policy", "Booking System Error"]
      },
      {
        "id": "client_got_spot",
        "label": "Did the client eventually get a spot in the class?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No"]
      },
      {
        "id": "request_alternative_due_waitlist",
        "label": "Did the client request an alternative class due to the waitlist issue?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No"]
      },
      {
        "id": "client_priority_future",
        "label": "Was the client given priority for future classes?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No"]
      },
      {
        "id": "client_dissatisfaction_waitlist",
        "label": "Did the client express dissatisfaction with the waitlist system?",
        "type": "dropdown",
        "required": true,
        "options": ["Yes", "No"]
      },
      {
        "id": "waitlist_comments",
        "label": "Any additional comments from the client regarding waitlist concerns?",
        "type": "textarea",
        "required": false,
        "placeholder": "Enter any additional details..."
      }
    ]
  }');

  RAISE NOTICE '✅ Successfully added 7 Scheduling subcategories with dynamic forms!';
END $$;
