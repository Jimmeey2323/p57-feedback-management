# 🎉 Getting Started - Physique 57 Ticket System

Welcome! This guide will get you up and running in about 15 minutes.

## 📚 What You're Building

A complete ticket management system with:
- ✅ User authentication
- ✅ Role-based access control
- ✅ Dynamic ticket creation forms
- ✅ Auto-assignment to teams
- ✅ Real-time notifications
- ✅ Analytics dashboard
- ✅ AI-powered auto-tagging

## 🎯 Current Status

**Phase 1 Complete** ✅
- React app initialized
- Authentication system ready
- Database schema created
- Basic dashboard built
- Project structure set up

**What's Working Right Now:**
- Login/logout functionality
- Dashboard with placeholder metrics
- User profile management
- Protected routes

**Coming Next (Phase 2):**
- Ticket creation with dynamic forms
- Ticket list and detail views
- Search and filters

---

## ⚡ Quick Setup (5 Steps)

### Step 1: Supabase Setup (3 minutes)

1. **Go to** https://supabase.com
2. **Sign up/Login** (use GitHub for fastest)
3. **Create New Project**:
   - Organization: Your company
   - Name: `Physique57-Tickets`
   - Database Password: (save this!)
   - Region: (choose closest to India)
4. **Wait** for provisioning (~2 min)
5. **Copy credentials**:
   - Go to Settings → API
   - Copy "Project URL" 
   - Copy "anon public" key

### Step 2: Configure Environment (1 minute)

```bash
# In the physique57-tickets directory
cp .env.example .env
```

Edit `.env` file:
```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**: Replace with YOUR actual values from Step 1!

### Step 3: Create Database (5 minutes)

1. **In Supabase**, click **SQL Editor** (left sidebar)
2. **Click** "New Query"
3. **Open** `database-setup.sql` from the project
4. **Copy ALL content** (Cmd+A, Cmd+C)
5. **Paste** into SQL Editor
6. **Click** "Run" (bottom right)
7. **Wait** for all queries to execute (you'll see success messages)

Expected output:
```
CREATE EXTENSION
CREATE TABLE (repeated for each table)
CREATE INDEX (repeated)
CREATE POLICY (repeated)
INSERT (for teams and categories)
```

### Step 4: Create Admin User (2 minutes)

1. **In Supabase**, go to **Authentication** → **Users**
2. **Click** "Add User" → "Create New User"
3. **Enter**:
   - Email: `admin@physique57.com`
   - Password: `admin123`
   - Confirm password: `admin123`
4. **Click** "Create User"
5. **Copy** the User UUID (long string like `abc123...`)
6. **Go back to SQL Editor**, run this:

```sql
INSERT INTO users (id, email, full_name, role, is_active)
VALUES (
  'PASTE-YOUR-UUID-HERE',
  'admin@physique57.com',
  'Admin User',
  'admin',
  true
);
```

### Step 5: Start the App (1 minute)

```bash
npm start
```

Or use the quick start script:
```bash
./start.sh
```

Browser will auto-open to http://localhost:3000

---

## 🔐 First Login

1. You'll see the login page with Physique 57 branding
2. Enter:
   - **Email**: `admin@physique57.com`
   - **Password**: `admin123`
3. Click "Sign In"
4. You'll be redirected to the dashboard
5. Should see: "Welcome back, Admin User!"

---

## 🎨 What You'll See

### Login Page
- Clean, professional design
- Physique 57 branding
- Demo credentials shown (for convenience)

### Dashboard (Currently)
- Welcome message with your name
- 4 metric cards (placeholder data):
  - Open Tickets
  - Resolved Today
  - Avg Response Time
  - SLA Compliance
- Quick action buttons
- Recent tickets section (empty until you create tickets)

---

## 🔧 Verify Everything Works

### ✅ Checklist

Run through this to ensure proper setup:

1. **Environment Variables**
   - [ ] `.env` file exists
   - [ ] Supabase URL is set (starts with `https://`)
   - [ ] Anon key is set (long string)

2. **Database**
   - [ ] Go to Supabase → Table Editor
   - [ ] See 15+ tables listed
   - [ ] `categories` table has 13 rows
   - [ ] `teams` table has 6 rows
   - [ ] `users` table has your admin user

3. **Application**
   - [ ] App starts without errors
   - [ ] Login page loads
   - [ ] Can log in successfully
   - [ ] Dashboard shows your name
   - [ ] Metric cards display
   - [ ] No red errors in browser console (F12)

4. **Authentication**
   - [ ] Can logout (click your name → Logout)
   - [ ] Redirected back to login
   - [ ] Can log back in
   - [ ] Session persists on page refresh

---

## 🐛 Troubleshooting

### Problem: "Module not found" errors
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Problem: "Supabase credentials not found"
```bash
# Check .env file
cat .env

# Should show your credentials
# If not, recreate .env from .env.example
```

### Problem: Can't login / "Invalid credentials"
```sql
-- Check if user exists
SELECT * FROM auth.users WHERE email = 'admin@physique57.com';

-- Check if profile exists  
SELECT * FROM users WHERE email = 'admin@physique57.com';

-- If profile missing, add it:
INSERT INTO users (id, email, full_name, role, is_active)
VALUES ('your-auth-uuid', 'admin@physique57.com', 'Admin', 'admin', true);
```

### Problem: "Relation does not exist" errors
```bash
# Database wasn't set up properly
# Re-run database-setup.sql in Supabase SQL Editor
```

### Problem: Blank page after login
```bash
# Check browser console (F12)
# Look for errors
# Common issues:
# 1. RLS policies not set up
# 2. User profile missing
# 3. JavaScript error
```

---

## 📖 Understanding the Code

### Key Files

**Authentication**
- `src/stores/authStore.ts` - Authentication state management
- `src/lib/supabase.ts` - Supabase client configuration
- `src/components/auth/LoginForm.tsx` - Login UI
- `src/components/auth/PrivateRoute.tsx` - Route protection

**Dashboard**
- `src/pages/DashboardPage.tsx` - Main dashboard
- `src/App.tsx` - Routing configuration

**UI Components**
- `src/components/ui/Button.tsx` - Reusable button
- `src/components/ui/Input.tsx` - Form inputs

**Types**
- `src/types/index.ts` - TypeScript definitions

### How Authentication Works

1. User enters credentials
2. `authStore.login()` calls Supabase Auth
3. Supabase validates credentials
4. Returns user object
5. Fetch user profile from `users` table
6. Store in Zustand state
7. Redirect to dashboard
8. `PrivateRoute` checks auth status
9. If authenticated, show protected content

### Database Structure

```
teams (6 rows)
  ├── Operations
  ├── Technical Support
  ├── Customer Service
  ├── Trainers
  ├── Maintenance
  └── Management

categories (13 rows)
  ├── Scheduling
  ├── Class Experience
  ├── Trainer Feedback
  ├── Repair and Maintenance
  └── ... (9 more)

users (your admins and staff)
  └── linked to teams

tickets (to be created)
  ├── assigned_to → users
  ├── category → categories
  └── team → teams
```

---

## 🚀 What's Next?

### You Can Now:
- ✅ Access the application
- ✅ Login with admin account
- ✅ View dashboard
- ✅ See the UI design

### Next Development Phase (Week 2-3):

**Ticket Creation Form**
- Select category (dropdown)
- Select subcategory (loads dynamically)
- Dynamic form fields appear based on subcategory
- File uploads
- Customer information fields
- Submit to create ticket

**Ticket List View**
- See all tickets
- Filter by status, priority, category
- Search functionality
- Sort options
- Click to view details

**Ticket Detail Page**
- View full ticket information
- See all responses/comments
- Add new responses
- Update ticket status
- Assign to users/teams
- View history timeline

### How to Continue Development

1. **Review Documentation**:
   - Read `PROJECT_PLAN.md` for full roadmap
   - Check `TECHNICAL_ARCHITECTURE.md` for design details
   - Follow `QUICK_START_GUIDE.md` for code examples

2. **Add Subcategories**:
   - Use `CATEGORIES_STRUCTURE.md` for reference
   - Insert subcategories with form_fields
   - Test dynamic form rendering

3. **Build Ticket Form**:
   - Create `CreateTicketForm.tsx`
   - Implement category selector
   - Build dynamic field renderer
   - Add file upload capability

4. **Test Everything**:
   - Create test tickets
   - Verify auto-assignment works
   - Check notifications fire
   - Test different user roles

---

## 💡 Tips for Development

### Use the Browser Console
Press F12 to open Developer Tools. Watch for:
- Network errors (red in Network tab)
- JavaScript errors (red in Console)
- Supabase queries (see what data is being fetched)

### Test with Different Users
Create multiple users with different roles:
```sql
INSERT INTO users (email, full_name, role, team_id, is_active) VALUES
('manager@physique57.com', 'Manager User', 'manager', (SELECT id FROM teams WHERE name='Operations'), true),
('staff@physique57.com', 'Staff User', 'team_member', (SELECT id FROM teams WHERE name='Customer Service'), true);
```

### Use React DevTools
Install React Developer Tools Chrome extension to:
- Inspect component props
- View state changes
- Debug React issues

### Hot Reload
Changes to code auto-refresh the browser. No need to restart the server for most changes.

---

## 📞 Getting Help

### Documentation Files
- `README.md` - Quick reference
- `PROJECT_PLAN.md` - Complete implementation plan
- `TECHNICAL_ARCHITECTURE.md` - System design
- `SETUP_CHECKLIST.md` - Detailed setup steps
- `CATEGORIES_STRUCTURE.md` - All subcategories and form fields

### Common Resources
- Supabase Docs: https://supabase.com/docs
- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- TypeScript: https://typescriptlang.org

---

## ✅ Success!

If you've made it here and everything is working, congratulations! 🎉

You now have:
- ✅ A working React + TypeScript application
- ✅ Supabase backend configured
- ✅ Authentication system functional
- ✅ Database with proper schema
- ✅ Beautiful UI with Tailwind CSS
- ✅ Foundation for building ticket system

**Time to start building features!** 🚀

---

**Questions?** Review the documentation files or check the troubleshooting section above.

**Ready to code?** Start with creating the ticket form in Phase 2!
