# Quick Start Implementation Guide
## Physique 57 India - Ticket Management System

---

## Prerequisites

Before starting development, ensure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- **Supabase** account (free tier is fine for development)
- **OpenAI** API key (for AI features)
- **Code Editor** (VS Code recommended)
- **PostgreSQL** knowledge (basic)

---

## Phase 1: Project Setup (Week 1)

### Day 1-2: Initialize Project

#### 1. Create React + TypeScript Project

```bash
# Create new React app with TypeScript
npx create-react-app physique57-tickets --template typescript

cd physique57-tickets

# Install essential dependencies
npm install @supabase/supabase-js
npm install react-router-dom
npm install @tanstack/react-query
npm install zustand
npm install tailwindcss postcss autoprefixer
npm install react-hook-form
npm install zod
npm install date-fns
npm install lucide-react
npm install recharts
npm install react-hot-toast

# Install dev dependencies
npm install -D @types/node
npm install -D eslint prettier
npm install -D @typescript-eslint/eslint-plugin
```

#### 2. Setup Tailwind CSS

```bash
npx tailwindcss init -p
```

**tailwind.config.js**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
      },
    },
  },
  plugins: [],
}
```

#### 3. Project Folder Structure

```
physique57-tickets/
├── public/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── PrivateRoute.tsx
│   │   ├── dashboard/
│   │   │   ├── DashboardOverview.tsx
│   │   │   ├── MetricCard.tsx
│   │   │   └── TicketVolumeChart.tsx
│   │   ├── tickets/
│   │   │   ├── TicketList.tsx
│   │   │   ├── TicketCard.tsx
│   │   │   ├── TicketDetail.tsx
│   │   │   ├── CreateTicketForm.tsx
│   │   │   └── FilterPanel.tsx
│   │   ├── layout/
│   │   │   ├── MainLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── TopBar.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Select.tsx
│   │       ├── Modal.tsx
│   │       └── Toast.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useTickets.ts
│   │   ├── useNotifications.ts
│   │   └── useAnalytics.ts
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── api.ts
│   │   └── utils.ts
│   ├── stores/
│   │   ├── authStore.ts
│   │   ├── ticketStore.ts
│   │   └── notificationStore.ts
│   ├── types/
│   │   ├── ticket.types.ts
│   │   ├── user.types.ts
│   │   └── api.types.ts
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── TicketsPage.tsx
│   │   ├── AnalyticsPage.tsx
│   │   └── AdminPage.tsx
│   ├── App.tsx
│   └── index.tsx
├── .env.local
├── package.json
└── tsconfig.json
```

### Day 3-5: Supabase Setup

#### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create new project: "Physique57-Tickets"
3. Copy Project URL and API Key

#### 2. Initialize Supabase Client

**src/lib/supabase.ts**
```typescript
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
```

**.env.local**
```
REACT_APP_SUPABASE_URL=your-project-url
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
REACT_APP_OPENAI_API_KEY=your-openai-key
```

#### 3. Create Database Schema

Run these SQL commands in Supabase SQL Editor:

**1. Enable UUID Extension**
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

**2. Create Users Table**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(50) NOT NULL DEFAULT 'team_member',
  team_id UUID REFERENCES teams(id),
  studio_location VARCHAR(100),
  avatar_url TEXT,
  notification_preferences JSONB DEFAULT '{"email": true, "in_app": true}',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**3. Create Teams Table**
```sql
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  lead_user_id UUID REFERENCES users(id),
  escalation_user_id UUID REFERENCES users(id),
  sla_targets JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**4. Create Categories Table**
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  color_code VARCHAR(7),
  display_order INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**5. Create Subcategories Table**
```sql
CREATE TABLE subcategories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  default_team_id UUID REFERENCES teams(id),
  default_priority VARCHAR(20) DEFAULT 'medium',
  estimated_resolution_hours INTEGER,
  form_fields JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**6. Create Tickets Table**
```sql
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_number VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category_id UUID REFERENCES categories(id),
  subcategory_id UUID REFERENCES subcategories(id),
  studio_location VARCHAR(100),
  priority VARCHAR(20) NOT NULL DEFAULT 'medium',
  status VARCHAR(50) NOT NULL DEFAULT 'new',
  
  customer_name VARCHAR(255),
  customer_membership_id VARCHAR(100),
  customer_phone VARCHAR(20),
  customer_email VARCHAR(255),
  
  reported_by_user_id UUID REFERENCES users(id),
  assigned_to_user_id UUID REFERENCES users(id),
  assigned_team_id UUID REFERENCES teams(id),
  
  form_data JSONB,
  ai_tags TEXT[],
  ai_sentiment VARCHAR(20),
  ai_priority_suggestion VARCHAR(20),
  
  sla_due_at TIMESTAMP WITH TIME ZONE,
  first_response_at TIMESTAMP WITH TIME ZONE,
  resolved_at TIMESTAMP WITH TIME ZONE,
  closed_at TIMESTAMP WITH TIME ZONE,
  
  escalation_level INTEGER DEFAULT 0,
  escalated_to_user_id UUID REFERENCES users(id),
  escalated_at TIMESTAMP WITH TIME ZONE,
  
  time_spent_minutes INTEGER DEFAULT 0,
  is_overdue BOOLEAN DEFAULT false,
  reopened_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_tickets_assigned_user ON tickets(assigned_to_user_id);
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_created_at ON tickets(created_at);
CREATE INDEX idx_tickets_priority ON tickets(priority);
```

**7. Create Other Tables**
```sql
-- Ticket Responses
CREATE TABLE ticket_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  response_text TEXT NOT NULL,
  is_internal_note BOOLEAN DEFAULT false,
  attachments TEXT[],
  response_type VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ticket Attachments
CREATE TABLE ticket_attachments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_type VARCHAR(50),
  file_size INTEGER,
  uploaded_by_user_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ticket History
CREATE TABLE ticket_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
  changed_by_user_id UUID REFERENCES users(id),
  change_type VARCHAR(50) NOT NULL,
  old_value TEXT,
  new_value TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
  notification_type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  sent_via VARCHAR(20),
  email_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**8. Create Auto-Assignment Rules Table**
```sql
CREATE TABLE auto_assignment_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  category_id UUID REFERENCES categories(id),
  subcategory_id UUID REFERENCES subcategories(id),
  studio_location VARCHAR(100),
  priority VARCHAR(20),
  conditions JSONB,
  assign_to_team_id UUID REFERENCES teams(id),
  assign_to_user_id UUID REFERENCES users(id),
  priority_order INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 4. Setup Row-Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Tickets policy
CREATE POLICY "Users can view their assigned tickets"
ON tickets FOR SELECT
USING (
  assigned_to_user_id = auth.uid()
  OR reported_by_user_id = auth.uid()
  OR assigned_team_id IN (
    SELECT team_id FROM users WHERE id = auth.uid()
  )
);

-- Admin can see all
CREATE POLICY "Admins can view all tickets"
ON tickets FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role IN ('admin', 'manager')
  )
);
```

#### 5. Seed Initial Data

```sql
-- Insert Teams
INSERT INTO teams (name, description) VALUES
('Operations', 'Studio operations and facility management'),
('Technical Support', 'IT and technical issues'),
('Customer Service', 'Customer relations and communication'),
('Trainers', 'Trainer-related feedback and training'),
('Maintenance', 'Repairs and facility maintenance'),
('Management', 'Leadership and strategic issues');

-- Insert Categories (from your list)
INSERT INTO categories (name, icon, color_code, display_order) VALUES
('Scheduling', 'calendar', '#3B82F6', 1),
('Class Experience', 'users', '#10B981', 2),
('Trainer Feedback', 'user-check', '#8B5CF6', 3),
('Repair and Maintenance', 'wrench', '#F59E0B', 4),
('Studio Amenities and Facilities', 'building', '#06B6D4', 5),
('Operating Systems', 'cpu', '#EF4444', 6),
('Tech Issues', 'laptop', '#EC4899', 7),
('Pricing and Memberships', 'credit-card', '#14B8A6', 8),
('Customer Service and Communication', 'message-circle', '#6366F1', 9),
('Brand Feedback', 'tag', '#F97316', 10),
('Safety and Security', 'shield', '#DC2626', 11),
('Theft and Lost Items', 'alert-triangle', '#7C3AED', 12),
('Miscellaneous', 'more-horizontal', '#64748B', 13);

-- Insert Sample Subcategories for Scheduling
INSERT INTO subcategories (category_id, name, default_priority, form_fields) 
SELECT 
  id,
  'Time Change',
  'medium',
  '{"fields": [{"id": "requested_time", "label": "Requested Time Change", "type": "datetime", "required": true}, {"id": "reason", "label": "Reason for Change", "type": "textarea", "required": true}]}'
FROM categories WHERE name = 'Scheduling';

-- Continue for all subcategories...
```

---

## Phase 2: Authentication (Day 6-7)

### Implement Login System

**src/lib/auth.ts**
```typescript
import { supabase } from './supabase';

export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};
```

**src/stores/authStore.ts**
```typescript
import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { login, logout, getCurrentUser } from '../lib/auth';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  
  login: async (email, password) => {
    const { user } = await login(email, password);
    set({ user, isAuthenticated: true });
  },
  
  logout: async () => {
    await logout();
    set({ user: null, isAuthenticated: false });
  },
  
  checkAuth: async () => {
    const user = await getCurrentUser();
    set({ user, isAuthenticated: !!user, isLoading: false });
  },
}));
```

**src/components/auth/LoginForm.tsx**
```typescript
import React, { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Physique 57 - Ticket System
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
```

---

## Phase 3: Ticket Creation (Day 8-10)

### Create Ticket Form with Dynamic Fields

**src/components/tickets/CreateTicketForm.tsx**
```typescript
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCategories, useSubcategories } from '../../hooks/useCategories';
import { useCreateTicket } from '../../hooks/useTickets';

export const CreateTicketForm: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  
  const { data: categories } = useCategories();
  const { data: subcategories } = useSubcategories(selectedCategory);
  const createTicket = useCreateTicket();
  
  const { register, handleSubmit, watch } = useForm();
  
  const subcategory = subcategories?.find(s => s.id === selectedSubcategory);
  const dynamicFields = subcategory?.form_fields?.fields || [];
  
  const onSubmit = async (data: any) => {
    await createTicket.mutateAsync({
      ...data,
      category_id: selectedCategory,
      subcategory_id: selectedSubcategory,
    });
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Ticket</h2>
      
      {/* Category Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">Select Category</option>
          {categories?.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      
      {/* Subcategory Selector */}
      {selectedCategory && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Subcategory</label>
          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Subcategory</option>
            {subcategories?.map(sub => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
            ))}
          </select>
        </div>
      )}
      
      {/* Dynamic Fields */}
      {dynamicFields.map((field: any) => (
        <div key={field.id} className="mb-4">
          <label className="block text-sm font-medium mb-2">
            {field.label}
            {field.required && <span className="text-red-500">*</span>}
          </label>
          
          {field.type === 'text' && (
            <input
              type="text"
              {...register(field.id, { required: field.required })}
              className="w-full px-3 py-2 border rounded-md"
            />
          )}
          
          {field.type === 'textarea' && (
            <textarea
              {...register(field.id, { required: field.required })}
              className="w-full px-3 py-2 border rounded-md"
              rows={4}
            />
          )}
          
          {field.type === 'dropdown' && (
            <select
              {...register(field.id, { required: field.required })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select...</option>
              {field.options.map((opt: string) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          )}
        </div>
      ))}
      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Create Ticket
      </button>
    </form>
  );
};
```

---

## Phase 4: Auto-Assignment (Day 11-12)

### Implement Assignment Logic

**Database Function for Auto-Assignment**
```sql
CREATE OR REPLACE FUNCTION auto_assign_ticket(ticket_id_param UUID)
RETURNS UUID AS $$
DECLARE
  ticket_record RECORD;
  rule_record RECORD;
  assigned_user_id UUID;
BEGIN
  -- Get ticket details
  SELECT * INTO ticket_record FROM tickets WHERE id = ticket_id_param;
  
  -- Find matching assignment rule
  SELECT * INTO rule_record
  FROM auto_assignment_rules
  WHERE is_active = true
    AND (category_id IS NULL OR category_id = ticket_record.category_id)
    AND (subcategory_id IS NULL OR subcategory_id = ticket_record.subcategory_id)
    AND (studio_location IS NULL OR studio_location = ticket_record.studio_location)
    AND (priority IS NULL OR priority = ticket_record.priority)
  ORDER BY priority_order ASC
  LIMIT 1;
  
  -- Assign based on rule
  IF rule_record IS NOT NULL THEN
    IF rule_record.assign_to_user_id IS NOT NULL THEN
      assigned_user_id := rule_record.assign_to_user_id;
    ELSIF rule_record.assign_to_team_id IS NOT NULL THEN
      -- Get user with lowest workload in team
      SELECT id INTO assigned_user_id
      FROM users
      WHERE team_id = rule_record.assign_to_team_id
        AND is_active = true
      ORDER BY (
        SELECT COUNT(*) FROM tickets
        WHERE assigned_to_user_id = users.id
          AND status NOT IN ('resolved', 'closed')
      ) ASC
      LIMIT 1;
    END IF;
    
    -- Update ticket
    UPDATE tickets
    SET assigned_to_user_id = assigned_user_id,
        assigned_team_id = rule_record.assign_to_team_id
    WHERE id = ticket_id_param;
    
    RETURN assigned_user_id;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;
```

---

## Next Steps: Continue with remaining phases...

Would you like me to continue with the remaining implementation guides for:
- Notification System
- Analytics Dashboard
- AI Integration
- Testing & Deployment

Or would you prefer to start building based on what I've provided so far?
