-- Quick test: Add sample form fields to one subcategory for testing
-- Run this to immediately test if the dynamic fields work

BEGIN;

-- Add sample fields to "App/Website Issues" subcategory for testing
UPDATE subcategories 
SET form_fields = '{
  "fields": [
    {
      "id": "test-001",
      "key": "issueType",
      "label": "Issue Type",
      "type": "dropdown",
      "required": true,
      "description": "What type of issue occurred?",
      "options": ["App Crash", "Slow Loading", "Login Problems", "Feature Not Working", "Other"]
    },
    {
      "id": "test-002",
      "key": "deviceType",
      "label": "Device Type",
      "type": "text",
      "required": true,
      "description": "What device were you using?",
      "placeholder": "e.g., iPhone 13, Samsung Galaxy S21"
    },
    {
      "id": "test-003",
      "key": "errorMessage",
      "label": "Error Message",
      "type": "textarea",
      "required": false,
      "description": "Copy and paste any error message you saw",
      "placeholder": "Paste error message here..."
    },
    {
      "id": "test-004",
      "key": "canReproduce",
      "label": "Can you reproduce this issue?",
      "type": "radio",
      "required": true,
      "description": "Can you make it happen again?",
      "options": ["Yes, consistently", "Yes, sometimes", "No, it was one time"]
    }
  ]
}'::jsonb,
updated_at = NOW()
WHERE name = 'App/Website Issues'
  AND category_id = (SELECT id FROM categories WHERE name = 'Booking & Technology');

-- Verify the update
SELECT 
    c.name as category,
    s.name as subcategory,
    jsonb_pretty(s.form_fields) as form_fields
FROM subcategories s
JOIN categories c ON s.category_id = c.id
WHERE s.name = 'App/Website Issues';

COMMIT;

-- Instructions:
-- 1. Run this SQL in your Supabase SQL Editor
-- 2. Refresh your browser
-- 3. Select "Booking & Technology" category
-- 4. Select "App/Website Issues" subcategory
-- 5. You should now see 4 additional fields appear!
