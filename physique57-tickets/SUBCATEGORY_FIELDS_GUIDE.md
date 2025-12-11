# Subcategory Fields Configuration Guide

## Problem
The subcategory-specific fields were not populating in the form because the `subcategories` table's `form_fields` column was not properly configured with field definitions.

## Solution Overview

We've created a Python script that:
1. Reads the CSV file with all field definitions
2. Groups fields by subcategory
3. Generates SQL UPDATE statements to populate the `form_fields` column with proper JSON structures

## Steps to Fix

### 1. Review Generated Files

Two files have been created:

- **`update_subcategory_fields.sql`** - Contains SQL UPDATE statements for all subcategories
- **`field_mappings.json`** - JSON reference showing the field structure

### 2. Apply SQL Updates

**Option A: Apply All at Once (Recommended)**

```bash
# From your terminal, run:
cd /Users/jimmeeygondaa/Feedback\ Form/physique57-tickets

# Connect to Supabase and run the SQL
# You can either:
# 1. Copy the contents of update_subcategory_fields.sql into Supabase SQL Editor
# 2. Or use the Supabase CLI if you have it installed
```

**Option B: Test with One Subcategory First**

Open `update_subcategory_fields.sql` and copy just the first UPDATE statement to test:

```sql
-- Test with App/Website Issues first
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
      "options": ["App Crash", "Slow Loading", "Login Problems", "Feature Not Working", "UI/UX Confusion", "Other"]
    }
    // ... more fields ...
  ]
}'::jsonb
WHERE name = 'App/Website Issues' 
  AND category_id = (SELECT id FROM categories WHERE name = 'Booking & Technology');
```

### 3. Verify the Update

After running the SQL, verify it worked:

```sql
-- Check that form_fields is populated
SELECT 
  s.name as subcategory,
  c.name as category,
  jsonb_array_length(s.form_fields->'fields') as field_count,
  s.form_fields->'fields'->0->>'label' as first_field
FROM subcategories s
JOIN categories c ON s.category_id = c.id
WHERE s.form_fields IS NOT NULL
LIMIT 10;
```

### 4. Test in the Application

1. Start your development server: `npm run dev`
2. Navigate to Create Ticket
3. Select a Category (e.g., "Booking & Technology")
4. Select a Subcategory (e.g., "App/Website Issues")
5. You should now see the **Additional Information** section with subcategory-specific fields

## What Was Fixed

### Frontend Updates

1. **DynamicFieldsGrid.tsx** - Enhanced to support all field types:
   - text
   - textarea
   - dropdown/select
   - number
   - date, time, datetime
   - email, tel
   - checkbox
   - radio
   - multiselect
   - file upload
   - readonly

2. **CreateTicketFormNew.tsx** - Improved field parsing:
   - Better error handling
   - Console logging for debugging
   - Support for multiple field structure formats

### Field Structure

Each subcategory now has a `form_fields` column with this structure:

```json
{
  "fields": [
    {
      "id": "BT-APP-001",
      "key": "issueType",
      "label": "Issue Type",
      "type": "dropdown",
      "required": true,
      "description": "Specific type of technical issue",
      "options": ["App Crash", "Slow Loading", ...],
      "placeholder": "Enter issue type..."
    }
  ]
}
```

## Field Type Mappings

| CSV Field Type | Form Type | Component |
|---|---|---|
| Text | text | Input |
| Long Text | textarea | Textarea |
| Dropdown | dropdown | Select |
| Email | email | Input[type=email] |
| Phone | tel | Input[type=tel] |
| Number | number | Input[type=number] |
| DateTime | datetime | Input[type=datetime-local] |
| Date | date | Input[type=date] |
| Checkbox | checkbox | Checkbox |
| Radio Button | radio | Radio buttons |
| Multi-select | multiselect | Checkbox group |
| File Upload | file | File input |

## Verification Checklist

- [ ] SQL file generated successfully
- [ ] Reviewed SQL statements for your specific subcategories
- [ ] Ran SQL in Supabase SQL Editor
- [ ] Verified form_fields column is populated
- [ ] Tested form in dev environment
- [ ] Confirmed fields appear when selecting subcategories
- [ ] Tested required vs optional fields
- [ ] Tested dropdown options populate correctly
- [ ] Verified data saves to tickets table

## Troubleshooting

### Fields Still Not Showing?

1. **Check browser console** for error messages
2. **Verify subcategory name matches** - Names must match exactly (case-sensitive)
3. **Check form_fields structure** in database:
   ```sql
   SELECT name, form_fields FROM subcategories WHERE name = 'Your Subcategory';
   ```

### Console shows "No fields found"?

- The subcategory's form_fields is NULL or empty
- Run the SQL UPDATE for that specific subcategory

### Dropdown options not showing?

- Check the `options` array in form_fields
- Ensure options are properly formatted as an array of strings

### Data not saving?

- Check that `dynamicFieldData` state is being updated
- Verify the ticket submission includes the dynamic fields in metadata

## Stats

- **Total Subcategories Configured:** 62
- **Total Global Fields:** 16
- **Field Types Supported:** 12

## Next Steps

After applying these changes:

1. Test creating tickets with different subcategories
2. Verify all field types render correctly
3. Ensure data is saved properly to the tickets table
4. Consider adding field validation if needed
5. Update user documentation with new fields

## Support

If you encounter issues:
1. Check the browser console for errors
2. Review the field structure in `field_mappings.json`
3. Verify the SQL was applied correctly in Supabase
4. Test with a simple subcategory first (like App/Website Issues)
