# Next Steps - Database Setup Complete! ✅

## 1. Create Storage Bucket (2 minutes)
1. Go to your Supabase dashboard → **Storage**
2. Click **"Create a new bucket"**
3. Name: `attachments`
4. Public: **No** (keep private for security)
5. Click **Create bucket**

## 2. Create Your User Profile (1 minute)
Run this in Supabase SQL Editor (replace with your details):

```sql
-- First, get your user ID from Authentication
-- Go to Authentication > Users and copy your UUID

-- Then run this (replace YOUR-UUID and your details):
INSERT INTO users (id, email, full_name, role, is_active) 
VALUES (
  'YOUR-UUID-FROM-SUPABASE-AUTH',
  'your-email@physique57.com',
  'Your Full Name',
  'admin',
  true
);
```

## 3. Verify Subcategories Were Added
Run this query to check:

```sql
SELECT 
  c.name as category,
  s.name as subcategory,
  jsonb_array_length(s.form_fields->'fields') as field_count
FROM subcategories s
JOIN categories c ON c.id = s.category_id
WHERE c.name = 'Scheduling'
ORDER BY s.created_at;
```

You should see 7 subcategories with 7 fields each.

## 4. Test Ticket Creation! 🎯
1. Go to `http://localhost:3000`
2. Login with your credentials
3. Click **"Create New Ticket"**
4. Select Category: **Scheduling**
5. Select Subcategory: **Trainer Preferences**
6. You should see 7 dynamic fields including a dropdown with all 30 trainers!
7. Fill the form and submit

## 5. What You Should See:
- ✅ Dynamic form fields appear based on subcategory selection
- ✅ Trainer dropdown shows all 30 trainer names
- ✅ All fields use dropdowns (data integrity!)
- ✅ File upload works for attachments
- ✅ Ticket appears in the ticket list after creation

## Having Issues?
Check the browser console (F12) for any errors. Common fixes:
- Make sure your .env file has correct Supabase credentials
- Verify the Storage bucket 'attachments' exists
- Ensure your user profile exists in the users table
- Refresh the browser after database changes

## Next Phase - Add More Categories
Once Scheduling works, we'll add the remaining 12 categories with their subcategories following the same pattern!
