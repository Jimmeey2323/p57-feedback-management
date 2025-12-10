# Storage Bucket Setup for Supabase

## Quick Setup Instructions

After running the main `database-setup.sql`, you need to create a storage bucket for file attachments.

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **"Create a new bucket"**
4. Bucket name: `attachments`
5. Set as **Public bucket**: No (keep it private)
6. Click **"Create bucket"**

### Option 2: Using SQL

Run this in your Supabase SQL Editor:

```sql
-- Create storage bucket for attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('attachments', 'attachments', false);

-- Set up RLS policies for the attachments bucket
CREATE POLICY "Authenticated users can upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'attachments');

CREATE POLICY "Users can view their uploaded files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'attachments');

CREATE POLICY "Users can delete their uploaded files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'attachments' AND auth.uid()::text = (storage.foldername(name))[1]);
```

### Verify Setup

After creating the bucket, verify it exists:

1. Go to **Storage** in Supabase dashboard
2. You should see an `attachments` bucket
3. Try uploading a test file through the UI

### Bucket Configuration

- **Name**: `attachments`
- **Public**: No (private)
- **File Size Limit**: 10MB (default)
- **Allowed MIME Types**: All (or restrict to: image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.*, application/vnd.ms-excel, text/*)

### Folder Structure

Files will be organized as:
```
attachments/
  └── tickets/
      ├── abc123.jpg
      ├── def456.pdf
      └── ghi789.docx
```

## Troubleshooting

### Error: "Bucket does not exist"
- Go to Storage in Supabase dashboard
- Create the `attachments` bucket manually
- Make sure it's not set as public

### Error: "Permission denied"
- Check RLS policies are enabled
- Verify your user is authenticated
- Run the RLS policy SQL commands above

### File Upload Fails
- Check bucket name is exactly `attachments`
- Verify file size is under 10MB
- Check browser console for detailed error messages
