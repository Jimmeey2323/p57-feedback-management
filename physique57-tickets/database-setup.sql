-- Physique 57 India Ticket Management System
-- Database Schema Setup Script
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TEAMS TABLE
-- ============================================
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  lead_user_id UUID,
  escalation_user_id UUID,
  sla_targets JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- USERS TABLE
-- ============================================
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

-- ============================================
-- CATEGORIES TABLE
-- ============================================
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

-- ============================================
-- SUBCATEGORIES TABLE
-- ============================================
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

-- ============================================
-- TICKETS TABLE
-- ============================================
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

-- Create indexes for better query performance
CREATE INDEX idx_tickets_assigned_user ON tickets(assigned_to_user_id);
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_created_at ON tickets(created_at);
CREATE INDEX idx_tickets_priority ON tickets(priority);
CREATE INDEX idx_tickets_category ON tickets(category_id);
CREATE INDEX idx_tickets_team ON tickets(assigned_team_id);

-- ============================================
-- TICKET RESPONSES TABLE
-- ============================================
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

CREATE INDEX idx_responses_ticket ON ticket_responses(ticket_id);

-- ============================================
-- TICKET ATTACHMENTS TABLE
-- ============================================
CREATE TABLE ticket_attachments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL,
  file_type VARCHAR(50),
  file_size INTEGER,
  uploaded_by_user_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TICKET HISTORY TABLE
-- ============================================
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

CREATE INDEX idx_history_ticket ON ticket_history(ticket_id);

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================
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

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);

-- ============================================
-- AUTO ASSIGNMENT RULES TABLE
-- ============================================
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

-- ============================================
-- ESCALATION RULES TABLE
-- ============================================
CREATE TABLE escalation_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  trigger_condition VARCHAR(50),
  trigger_after_hours INTEGER,
  priority_filter VARCHAR(20),
  escalate_to_role VARCHAR(50),
  escalate_to_user_id UUID REFERENCES users(id),
  notification_template TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
ON users FOR SELECT
USING (auth.uid() = id);

-- Users can view tickets assigned to them or their team
CREATE POLICY "Users can view assigned tickets"
ON tickets FOR SELECT
USING (
  assigned_to_user_id = auth.uid()
  OR reported_by_user_id = auth.uid()
  OR assigned_team_id IN (
    SELECT team_id FROM users WHERE id = auth.uid()
  )
  OR EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role IN ('admin', 'manager')
  )
);

-- Admins and managers can see all tickets
CREATE POLICY "Admins can view all tickets"
ON tickets FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role IN ('admin', 'manager')
  )
);

-- Users can create tickets
CREATE POLICY "Users can create tickets"
ON tickets FOR INSERT
WITH CHECK (
  reported_by_user_id = auth.uid()
);

-- Users can update their assigned tickets
CREATE POLICY "Users can update assigned tickets"
ON tickets FOR UPDATE
USING (
  assigned_to_user_id = auth.uid()
  OR reported_by_user_id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role IN ('admin', 'manager')
  )
);

-- Notifications policy
CREATE POLICY "Users can view own notifications"
ON notifications FOR SELECT
USING (user_id = auth.uid());

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to auto-generate ticket number
CREATE OR REPLACE FUNCTION generate_ticket_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.ticket_number := 'TKT-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('ticket_number_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create sequence for ticket numbers
CREATE SEQUENCE ticket_number_seq;

-- Trigger to auto-generate ticket number
CREATE TRIGGER trigger_generate_ticket_number
BEFORE INSERT ON tickets
FOR EACH ROW
EXECUTE FUNCTION generate_ticket_number();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updated_at
CREATE TRIGGER trigger_update_tickets_timestamp
BEFORE UPDATE ON tickets
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_users_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED DATA
-- ============================================

-- Insert Teams
INSERT INTO teams (name, description) VALUES
('Operations', 'Studio operations and facility management'),
('Technical Support', 'IT and technical issues'),
('Customer Service', 'Customer relations and communication'),
('Trainers', 'Trainer-related feedback and training'),
('Maintenance', 'Repairs and facility maintenance'),
('Management', 'Leadership and strategic issues');

-- Insert Categories
INSERT INTO categories (name, icon, color_code, display_order) VALUES
('Scheduling', 'calendar', '#3B82F6', 1),
('Class Experience', 'users', '#10B981', 2),
('Trainer Feedback', 'user-check', '#8B5CF6', 3),
('Repair and Maintenance', 'wrench', '#F59E0B', 4),
('Studio Amenities', 'building', '#06B6D4', 5),
('Operating Systems', 'cpu', '#EF4444', 6),
('Tech Issues', 'laptop', '#EC4899', 7),
('Pricing and Memberships', 'credit-card', '#14B8A6', 8),
('Customer Service', 'message-circle', '#6366F1', 9),
('Brand Feedback', 'tag', '#F97316', 10),
('Safety and Security', 'shield', '#DC2626', 11),
('Theft and Lost Items', 'alert-triangle', '#7C3AED', 12),
('Miscellaneous', 'more-horizontal', '#64748B', 13);

-- Insert Demo User (password: demo123)
-- Note: You'll need to create this user through Supabase Auth first
-- Then insert their profile here with the correct UUID

INSERT INTO users (id, email, full_name, role, is_active) VALUES
('00000000-0000-0000-0000-000000000001', 'demo@physique57.com', 'Demo User', 'admin', true);

-- ============================================
-- INITIAL SETUP COMPLETE
-- ============================================
-- Next steps:
-- 1. Create your first user in Supabase Auth
-- 2. Update the users table with the correct UUID
-- 3. Add subcategories using the CATEGORIES_STRUCTURE.md data
-- 4. Configure auto-assignment rules
-- 5. Start using the application!
