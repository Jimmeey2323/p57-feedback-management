# Physique 57 India - Ticket Management System

A comprehensive smart ticket management and analytics platform for internal teams to record, track, and resolve customer feedback and issues.

## 🚀 Features

- **Smart Ticket Creation** - Dynamic forms based on issue category
- **Auto-Assignment** - Intelligent routing to the right team/person  
- **SLA Tracking** - Automated escalation on deadline breach
- **Real-Time Notifications** - In-app and email alerts
- **AI-Powered Tagging** - Automatic categorization and sentiment analysis
- **Analytics Dashboard** - Comprehensive reporting and insights
- **Role-Based Access** - Admin, Manager, Team Lead, Team Member roles
- **Mobile Responsive** - Works on all devices

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Supabase account (free tier works)
- Git

## 🛠️ Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Name it "Physique57-Tickets"
3. Go to **Settings** → **API** and copy your credentials

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:
```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Set Up Database

1. Go to Supabase **SQL Editor**
2. Copy content from `database-setup.sql`
3. Paste and Run

### 5. Create Admin User

In Supabase **Authentication** → **Users** → **Add User**:
- Email: `admin@physique57.com`
- Password: `admin123`

Then run this SQL to create the user profile:
```sql
INSERT INTO users (id, email, full_name, role, is_active)
VALUES ('paste-auth-uuid-here', 'admin@physique57.com', 'Admin User', 'admin', true);
```

### 6. Start Development Server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## 🔐 Login

- Email: `admin@physique57.com`
- Password: `admin123`

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/          # Login, PrivateRoute
│   ├── dashboard/     # Dashboard widgets
│   ├── tickets/       # Ticket components
│   ├── layout/        # Layout components
│   └── ui/            # Reusable UI components
├── hooks/             # Custom React hooks
├── lib/               # Supabase config
├── pages/             # Page components
├── stores/            # Zustand state stores
├── types/             # TypeScript types
└── App.tsx
```

## 🎨 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand + React Query
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Notifications**: React Hot Toast

## 📚 Documentation

- **PROJECT_PLAN.md** - Complete implementation roadmap (10-week plan)
- **TECHNICAL_ARCHITECTURE.md** - System design and architecture
- **QUICK_START_GUIDE.md** - Detailed development guide
- **CATEGORIES_STRUCTURE.md** - All 240+ subcategories with form fields
- **database-setup.sql** - Complete database schema

## 🔧 Development Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner

### `npm run build`
Builds the app for production

## 🚀 Deployment

### Deploy to Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`
5. Deploy

## 🔍 Troubleshooting

### "Supabase credentials not found"
- Check `.env` file exists
- Verify environment variables are set correctly
- Restart dev server after changing `.env`

### "Login failed"
- Ensure user exists in Supabase Auth
- Verify user profile exists in `users` table
- Check RLS policies are set up correctly

### "No tickets showing"
- Verify database tables were created
- Check RLS policies
- Try creating a test ticket

## 🎯 Next Steps

### Phase 1 (Current - Foundation)
- ✅ Project setup complete
- ✅ Authentication system
- ✅ Basic dashboard
- ✅ Database schema

### Phase 2 (Next - Core Features)
- [ ] Ticket creation form with dynamic fields
- [ ] Ticket list and detail views
- [ ] Auto-assignment engine
- [ ] Notification system

### Phase 3 (Advanced Features)
- [ ] Analytics dashboard
- [ ] AI auto-tagging
- [ ] Export and reporting
- [ ] Advanced search and filters

### Phase 4 (Enhancements)
- [ ] Mobile app
- [ ] WhatsApp integration
- [ ] Customer portal
- [ ] Predictive analytics

## 🤝 Contributing

This is an internal project for Physique 57 India. For questions or issues, refer to the documentation files or contact the development team.

## 📄 License

Proprietary - Physique 57 India

---

**Built with ❤️ for Physique 57 India Team**
