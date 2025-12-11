-- Quick Test SQL: Update a few subcategories for testing
-- Run this first to verify the system works before applying all updates

-- 1. App/Website Issues (Booking & Technology)
UPDATE subcategories 
SET form_fields = '{
  "fields": [
    {
      "id": "BT-APP-001",
      "key": "issueType",
      "label": "Issue Type",
      "type": "dropdown",
      "required": true,
      "description": "Specific type of technical issue",
      "options": [
        "App Crash",
        "Slow Loading",
        "Login Problems",
        "Feature Not Working",
        "UI/UX Confusion",
        "Other"
      ],
      "placeholder": "Select issue type..."
    },
    {
      "id": "BT-APP-002",
      "key": "platform",
      "label": "Platform",
      "type": "dropdown",
      "required": true,
      "description": "Which platform had the issue",
      "options": [
        "iOS App",
        "Android App",
        "Website (Desktop)",
        "Website (Mobile)"
      ],
      "placeholder": "Select platform..."
    },
    {
      "id": "BT-APP-003",
      "key": "deviceBrowser",
      "label": "Device/Browser",
      "type": "text",
      "required": false,
      "description": "Device model or browser used",
      "placeholder": "Enter device/browser..."
    },
    {
      "id": "BT-APP-005",
      "key": "errorMessage",
      "label": "Error Message",
      "type": "text",
      "required": false,
      "description": "Exact error message shown",
      "placeholder": "Enter error message..."
    },
    {
      "id": "BT-APP-006",
      "key": "stepsToReproduce",
      "label": "Steps to Reproduce",
      "type": "textarea",
      "required": true,
      "description": "What the client was trying to do",
      "placeholder": "Provide details for steps to reproduce..."
    },
    {
      "id": "BT-APP-007",
      "key": "screenshotAvailable",
      "label": "Screenshot Available",
      "type": "checkbox",
      "required": false,
      "description": "Did client provide screenshot"
    },
    {
      "id": "BT-APP-008",
      "key": "workaroundProvided",
      "label": "Workaround Provided",
      "type": "textarea",
      "required": false,
      "description": "Alternative solution offered",
      "placeholder": "Provide details for workaround provided..."
    }
  ]
}'::jsonb
WHERE name = 'App/Website Issues' 
  AND category_id = (SELECT id FROM categories WHERE name = 'Booking & Technology');

-- 2. Booking Failures (Booking & Technology)
UPDATE subcategories 
SET form_fields = '{
  "fields": [
    {
      "id": "BT-BOOK-001",
      "key": "classAttempted",
      "label": "Class Attempted",
      "type": "dropdown",
      "required": true,
      "description": "Which class they tried to book",
      "options": [
        "Studio Barre 57",
        "Studio Foundations",
        "Studio Cardio Barre",
        "Studio FIT",
        "Studio Mat 57",
        "Studio HIIT"
      ],
      "placeholder": "Select class..."
    },
    {
      "id": "BT-BOOK-003",
      "key": "classDateTime",
      "label": "Class Date & Time",
      "type": "datetime",
      "required": true,
      "description": "When was the class"
    },
    {
      "id": "BT-BOOK-004",
      "key": "failureType",
      "label": "Failure Type",
      "type": "dropdown",
      "required": true,
      "description": "Nature of booking failure",
      "options": [
        "Unable to Book",
        "Booking Not Confirmed",
        "Double Booking",
        "Booking Disappeared",
        "Other"
      ],
      "placeholder": "Select failure type..."
    },
    {
      "id": "BT-BOOK-006",
      "key": "creditsDeducted",
      "label": "Credits Deducted",
      "type": "dropdown",
      "required": true,
      "description": "Were credits charged despite failure",
      "options": [
        "Yes",
        "No",
        "Unknown"
      ],
      "placeholder": "Select option..."
    },
    {
      "id": "BT-BOOK-008",
      "key": "manuallyResolved",
      "label": "Manually Resolved",
      "type": "dropdown",
      "required": true,
      "description": "How was it resolved on the spot",
      "options": [
        "Yes - Added to Class",
        "Yes - Credits Refunded",
        "No - Still Pending"
      ],
      "placeholder": "Select resolution..."
    }
  ]
}'::jsonb
WHERE name = 'Booking Failures' 
  AND category_id = (SELECT id FROM categories WHERE name = 'Booking & Technology');

-- 3. Front Desk Service (Customer Service)
UPDATE subcategories 
SET form_fields = '{
  "fields": [
    {
      "id": "CS-DESK-002",
      "key": "issueType",
      "label": "Issue Type",
      "type": "dropdown",
      "required": true,
      "description": "Nature of service issue",
      "options": [
        "Rude Behavior",
        "Unhelpful Attitude",
        "Lack of Knowledge",
        "Inattentive",
        "Unprofessional Conduct",
        "Other"
      ],
      "placeholder": "Select issue type..."
    },
    {
      "id": "CS-DESK-003",
      "key": "specificIncident",
      "label": "Specific Incident",
      "type": "textarea",
      "required": true,
      "description": "What exactly happened",
      "placeholder": "Provide details..."
    },
    {
      "id": "CS-DESK-004",
      "key": "clientRequest",
      "label": "Client Request/Query",
      "type": "text",
      "required": true,
      "description": "What did client need",
      "placeholder": "Enter request..."
    },
    {
      "id": "CS-DESK-005",
      "key": "requestFulfilled",
      "label": "Request Fulfilled",
      "type": "dropdown",
      "required": true,
      "description": "Was request handled",
      "options": [
        "Yes - Immediately",
        "Yes - After Delay",
        "No - Unable to Fulfill",
        "No - Refused"
      ],
      "placeholder": "Select status..."
    },
    {
      "id": "CS-DESK-006",
      "key": "witnessPresent",
      "label": "Witness Present",
      "type": "dropdown",
      "required": false,
      "description": "Was anyone else present",
      "options": [
        "Yes - Staff",
        "Yes - Other Client",
        "No"
      ],
      "placeholder": "Select option..."
    },
    {
      "id": "CS-DESK-007",
      "key": "apologyGiven",
      "label": "Apology Given",
      "type": "checkbox",
      "required": false,
      "description": "Was client apologized to"
    },
    {
      "id": "CS-DESK-008",
      "key": "escalatedToManager",
      "label": "Escalated to Manager",
      "type": "checkbox",
      "required": false,
      "description": "Was manager involved"
    }
  ]
}'::jsonb
WHERE name = 'Front Desk Service' 
  AND category_id = (SELECT id FROM categories WHERE name = 'Customer Service');

-- Verify the updates
SELECT 
  s.name as subcategory,
  c.name as category,
  jsonb_array_length(s.form_fields->'fields') as field_count,
  s.form_fields->'fields'->0->>'label' as first_field,
  s.form_fields->'fields'->0->>'type' as first_field_type
FROM subcategories s
JOIN categories c ON s.category_id = c.id
WHERE s.form_fields IS NOT NULL
ORDER BY c.name, s.name;
