# Setup Checklist for Physique 57 Ticket System

## ✅ Phase 1: Initial Setup (Complete)

- [x] React project created with TypeScript
- [x] Dependencies installed (Supabase, React Router, Tailwind, etc.)
- [x] Project structure set up
- [x] TypeScript types defined
- [x] Tailwind CSS configured
- [x] Environment template created

## 📋 Phase 2: Database Setup (Required Before Running)

### 2.1 Create Supabase Project
- [ ] Go to https://supabase.com
- [ ] Create new project: "Physique57-Tickets"
- [ ] Wait for provisioning (2-3 minutes)
- [ ] Copy Project URL and Anon Key from Settings → API

### 2.2 Configure Environment
- [ ] Copy `.env.example` to `.env`
- [ ] Add `REACT_APP_SUPABASE_URL` 
- [ ] Add `REACT_APP_SUPABASE_ANON_KEY`

### 2.3 Run Database Setup
- [ ] Open Supabase SQL Editor
- [ ] Copy content from `database-setup.sql`
- [ ] Paste and execute
- [ ] Verify all tables created (check Table Editor)
- [ ] Confirm seed data loaded (teams, categories)

### 2.4 Create First User
- [ ] Go to Authentication → Users in Supabase
- [ ] Click "Add User" → "Create New User"
- [ ] Enter email: `admin@physique57.com`
- [ ] Enter password: `admin123`
- [ ] Copy the User UUID
- [ ] Run SQL to add user profile:
```sql
INSERT INTO users (id, email, full_name, role, is_active)
VALUES ('paste-uuid-here', 'admin@physique57.com', 'Admin User', 'admin', true);
```

## 🚀 Phase 3: First Run

### 3.1 Start Application
- [ ] Run `npm start` or `./start.sh`
- [ ] Wait for app to open at http://localhost:3000
- [ ] Should see login page

### 3.2 Test Login
- [ ] Enter email: `admin@physique57.com`
- [ ] Enter password: `admin123`
- [ ] Click "Sign In"
- [ ] Should redirect to dashboard
- [ ] Verify your name appears in welcome message

### 3.3 Verify Dashboard
- [ ] See metric cards (Open Tickets, Resolved, etc.)
- [ ] See quick action buttons
- [ ] No errors in browser console

## 🎯 Phase 4: Add Sample Data (Optional)

### 4.1 Create Test Ticket
- [ ] Click "Create New Ticket" (not functional yet - coming in Phase 2)
- [ ] This feature will be built next

### 4.2 Add Team Members
```sql
-- Run in Supabase SQL Editor
INSERT INTO users (email, full_name, role, team_id, is_active)
VALUES 
  ('manager@physique57.com', 'Manager User', 'manager', (SELECT id FROM teams WHERE name = 'Operations'), true),
  ('support@physique57.com', 'Support User', 'team_member', (SELECT id FROM teams WHERE name = 'Customer Service'), true);
```

### 4.3 Add More Categories Data
- [ ] Review `CATEGORIES_STRUCTURE.md` for complete list
- [ ] Add subcategories for each main category
- [ ] Use provided JSON structure for form_fields

## 🔍 Verification Checklist

### Database Tables Exist
- [ ] `users` table
- [ ] `teams` table
- [ ] `categories` table
- [ ] `subcategories` table
- [ ] `tickets` table
- [ ] `ticket_responses` table
- [ ] `notifications` table
- [ ] `auto_assignment_rules` table

### Seed Data Loaded
- [ ] 6 teams created
- [ ] 13 categories created
- [ ] At least 1 admin user exists

### Application Works
- [ ] Login page loads
- [ ] Can log in successfully
- [ ] Dashboard shows welcome message
- [ ] No console errors
- [ ] Tailwind styles working

### Environment Variables
- [ ] `.env` file exists
- [ ] Supabase URL is set
- [ ] Supabase Anon Key is set
- [ ] No placeholder values

## 🚧 Known Issues / Not Yet Implemented

- ⏳ Ticket creation form (Phase 2)
- ⏳ Ticket list view (Phase 2)
- ⏳ Notifications (Phase 3)
- ⏳ Analytics charts (Phase 3)
- ⏳ AI auto-tagging (Phase 3)
- ⏳ Email integration (Phase 3)

## 📝 Next Development Tasks

### Priority 1: Ticket System (Week 2-3)
1. Build category/subcategory selector
2. Create dynamic form renderer
3. Implement file upload
4. Add ticket creation API
5. Build ticket list view
6. Create ticket detail page

### Priority 2: Auto-Assignment (Week 3-4)
1. Create assignment rule interface
2. Build rule matching engine
3. Implement workload balancing
4. Add manual assignment override
5. Test routing logic

### Priority 3: Notifications (Week 4-5)
1. Set up Supabase Realtime subscriptions
2. Create in-app notification UI
3. Configure SendGrid for emails
4. Build notification preferences
5. Add @mention support

## 🆘 Troubleshooting

### Problem: "Supabase credentials not found"
**Solution**: 
1. Check `.env` file exists in root directory
2. Verify variables start with `REACT_APP_`
3. Restart dev server after changing `.env`

### Problem: "Login failed"
**Solution**:
1. Verify user exists in Supabase Auth (Authentication tab)
2. Check user profile exists in `users` table
3. Ensure RLS policies were created
4. Try resetting password in Supabase

### Problem: "Cannot connect to database"
**Solution**:
1. Check Supabase project is not paused
2. Verify API URL is correct
3. Check network connection
4. Review Supabase project status

### Problem: "Tickets table does not exist"
**Solution**:
1. Go to Supabase Table Editor
2. Check if tables are present
3. Re-run `database-setup.sql` if missing
4. Verify no SQL errors occurred

## 📞 Support

For detailed implementation guides, see:
- `PROJECT_PLAN.md` - Complete roadmap
- `TECHNICAL_ARCHITECTURE.md` - System design
- `QUICK_START_GUIDE.md` - Development guide
- `README.md` - Quick reference

## ✨ Success Criteria

You've successfully completed setup when:
- ✅ Application starts without errors
- ✅ You can log in with admin credentials  
- ✅ Dashboard loads and shows your name
- ✅ No red errors in browser console
- ✅ Database has all tables and seed data

---

**Last Updated**: December 10, 2025
**Status**: Phase 1 Complete ✅
