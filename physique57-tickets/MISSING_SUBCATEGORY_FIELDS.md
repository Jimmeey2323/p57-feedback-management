# Missing Subcategory Field Definitions

## Summary

- **Total Subcategories:** 103
- **With Field Definitions:** 60
- **Missing Definitions:** 43

## Subcategories Missing Field Definitions

The following subcategories from `Sub-Categories.csv` do not have corresponding field definitions in `fields.csv`:

### Class Experience (9 missing)
- Accessibility
- Class Duration
- Class Level Appropriateness
- Class Overcrowding
- Class Pacing
- Class Quality
- Class Scheduling
- Class Variety
- Warm-up/Cool-down

### Instructor Related (6 missing)
- Attention & Correction
- Communication
- Instructor Cancellations
- Knowledge & Expertise
- Personal Boundaries
- Punctuality

### Facility & Amenities (6 missing)
- Changing Room Issues
- Equipment Issues
- Hygiene Supplies
- Lighting & Ambiance
- Seating & Waiting Area
- Storage & Lockers

### Membership & Billing (8 missing)
- Billing Errors
- Contract Terms
- Credits/Class Pack
- Invoice/Receipt
- Membership Cancellation
- Membership Freeze
- Package/Plan Confusion
- Promotional Offers

### Booking & Technology (4 missing)
- Class Check-in
- Class Visibility
- Notifications
- Profile Management

### Customer Service (4 missing)
- Complaint Handling
- Email/Chat Support
- Newcomer Experience
- Staff Professionalism

### Sales & Marketing (2 missing)
- Events & Workshops
- Guest Passes/Referrals

### Community & Culture (1 missing)
- Community Events

### Retail & Merchandise (1 missing)
- Staff Knowledge

### Special Programs (1 missing)
- Special Needs Programs

### Miscellaneous (1 missing)
- Guest Experience

## What This Means

1. **Current State:** The generated SQL (`update_subcategory_fields.sql`) will update 60 subcategories with their custom fields.

2. **For Missing Subcategories:** These 43 subcategories will only show the global fields (like Title, Description, Location, etc.) - no subcategory-specific fields.

3. **User Experience:** When users select one of these 43 subcategories, they won't see the "Additional Information" section with custom fields.

## Options to Fix

### Option 1: Use Global Fields Only (Quickest)
- Accept that these 43 subcategories only use global fields
- Run the current SQL for the 60 that have fields
- Add custom fields later as needed

### Option 2: Add Generic Fields (Recommended)
- Create a default set of fields for the missing subcategories
- Fields like: "Specific Issue", "When Occurred", "Details", etc.
- Can be added to `fields.csv`

### Option 3: Define Custom Fields (Most Complete)
- Create specific field definitions for each of the 43 subcategories
- Tailor fields to each subcategory's needs
- Add to `fields.csv` and regenerate SQL

## Quick Fix SQL

If you want to add basic fields to ALL missing subcategories now:

```sql
-- Add generic fields to subcategories without custom fields
UPDATE subcategories 
SET form_fields = '{
  "fields": [
    {
      "id": "generic-001",
      "key": "specificIssue",
      "label": "Specific Issue",
      "type": "textarea",
      "required": true,
      "description": "Describe the specific issue in detail",
      "placeholder": "Provide details about what happened..."
    },
    {
      "id": "generic-002",
      "key": "whenOccurred",
      "label": "When Did This Occur?",
      "type": "datetime",
      "required": false,
      "description": "Date and time of the incident"
    },
    {
      "id": "generic-003",
      "key": "actionTaken",
      "label": "Immediate Action Taken",
      "type": "textarea",
      "required": false,
      "description": "What was done to address this immediately?",
      "placeholder": "Describe any immediate actions..."
    }
  ]
}'::jsonb
WHERE form_fields IS NULL;
```

## Current Recommendation

**Run the existing SQL** (`update_subcategory_fields.sql`) to update the 60 subcategories that have field definitions. The 43 without definitions will still work - they'll just show the global fields only, which is perfectly functional for collecting basic ticket information.

You can add custom fields to the missing subcategories later as you identify which specific information you need for each category.
