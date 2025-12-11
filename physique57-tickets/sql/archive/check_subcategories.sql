SELECT 
  s.id, 
  s.name, 
  c.name as category_name,
  s.form_fields
FROM subcategories s
JOIN categories c ON s.category_id = c.id
WHERE s.is_active = true
LIMIT 5;
