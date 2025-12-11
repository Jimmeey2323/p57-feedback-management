-- Test query to check if subcategories have form_fields populated
-- Run this in Supabase SQL Editor to verify the data

-- Check total subcategories
SELECT 
    COUNT(*) as total_subcategories,
    COUNT(form_fields) as subcategories_with_fields,
    COUNT(*) - COUNT(form_fields) as subcategories_without_fields
FROM subcategories;

-- Check sample subcategories with their form_fields
SELECT 
    c.name as category,
    s.name as subcategory,
    CASE 
        WHEN s.form_fields IS NULL THEN '❌ NULL'
        WHEN jsonb_typeof(s.form_fields) = 'object' THEN 
            '✅ Object with ' || COALESCE(jsonb_array_length(s.form_fields->'fields'), 0)::text || ' fields'
        ELSE '⚠️ Invalid format'
    END as field_status,
    s.form_fields
FROM subcategories s
JOIN categories c ON s.category_id = c.id
ORDER BY c.name, s.name
LIMIT 10;

-- Check specific subcategory (replace with your subcategory name)
SELECT 
    c.name as category,
    s.name as subcategory,
    jsonb_pretty(s.form_fields) as form_fields_json
FROM subcategories s
JOIN categories c ON s.category_id = c.id
WHERE s.name = 'App/Website Issues'
LIMIT 1;

-- Count fields per subcategory
SELECT 
    c.name as category,
    s.name as subcategory,
    COALESCE(jsonb_array_length(s.form_fields->'fields'), 0) as field_count
FROM subcategories s
JOIN categories c ON s.category_id = c.id
WHERE s.form_fields IS NOT NULL
ORDER BY field_count DESC;
