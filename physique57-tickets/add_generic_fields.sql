-- Add generic form fields to subcategories that don't have custom fields defined
-- This ensures ALL subcategories have at least some additional fields beyond global fields

BEGIN;

-- Add generic fields to any subcategory that doesn't have form_fields yet
UPDATE subcategories 
SET form_fields = '{
  "fields": [
    {
      "id": "generic-001",
      "key": "specificIssue",
      "label": "Specific Issue Details",
      "type": "textarea",
      "required": true,
      "description": "Please describe the specific issue or concern in detail",
      "placeholder": "Provide a detailed description of what happened, including any relevant context..."
    },
    {
      "id": "generic-002",
      "key": "whenOccurred",
      "label": "When Did This Occur?",
      "type": "datetime",
      "required": false,
      "description": "Date and time when the issue occurred (if different from ticket creation time)"
    },
    {
      "id": "generic-003",
      "key": "locationDetails",
      "label": "Specific Location/Area",
      "type": "text",
      "required": false,
      "description": "Which specific area or location within the studio?",
      "placeholder": "e.g., Main studio, changing room, reception area..."
    },
    {
      "id": "generic-004",
      "key": "peopleInvolved",
      "label": "People Involved",
      "type": "text",
      "required": false,
      "description": "Names of staff members, instructors, or members involved (if applicable)",
      "placeholder": "Enter names..."
    },
    {
      "id": "generic-005",
      "key": "severity",
      "label": "Issue Severity",
      "type": "dropdown",
      "required": true,
      "description": "How severe is this issue?",
      "options": ["Minor - Inconvenience only", "Moderate - Impacts experience", "Significant - Needs immediate attention", "Critical - Safety or major concern"]
    },
    {
      "id": "generic-006",
      "key": "frequencyOccurrence",
      "label": "How Often Does This Occur?",
      "type": "radio",
      "required": false,
      "description": "Is this a recurring issue?",
      "options": ["First time", "Occasionally (2-3 times)", "Frequently (multiple times)", "Ongoing/consistent issue"]
    },
    {
      "id": "generic-007",
      "key": "actionTaken",
      "label": "Immediate Action Taken",
      "type": "textarea",
      "required": false,
      "description": "What immediate actions were taken to address this issue?",
      "placeholder": "Describe any steps taken on the spot to resolve or mitigate the issue..."
    },
    {
      "id": "generic-008",
      "key": "clientResponse",
      "label": "Client Response/Feedback",
      "type": "textarea",
      "required": false,
      "description": "How did the client react? What was their response?",
      "placeholder": "Describe the client's reaction, mood, or any feedback they provided..."
    },
    {
      "id": "generic-009",
      "key": "additionalNotes",
      "label": "Additional Notes",
      "type": "textarea",
      "required": false,
      "description": "Any other relevant information not covered above",
      "placeholder": "Add any other relevant details, observations, or context..."
    }
  ]
}'::jsonb
WHERE form_fields IS NULL OR form_fields = 'null'::jsonb OR form_fields = '{}'::jsonb;

-- Verify how many subcategories were updated
SELECT 
    COUNT(*) as total_updated,
    'Generic fields added' as status
FROM subcategories 
WHERE form_fields IS NOT NULL;

-- Show all subcategories and their field status
SELECT 
    c.name as category,
    s.name as subcategory,
    CASE 
        WHEN s.form_fields IS NULL THEN '❌ No fields'
        WHEN jsonb_array_length(s.form_fields->'fields') = 9 THEN '🔧 Generic fields'
        ELSE '✅ Custom fields (' || jsonb_array_length(s.form_fields->'fields')::text || ')'
    END as field_status
FROM subcategories s
JOIN categories c ON s.category_id = c.id
ORDER BY c.name, s.name;

COMMIT;

-- Instructions:
-- 1. This SQL adds generic fields to any subcategory without custom fields
-- 2. Run this AFTER running update_subcategory_fields.sql
-- 3. Or run this INSTEAD if you want all subcategories to have at least basic fields
-- 4. The generic fields are designed to work for any type of issue/feedback
