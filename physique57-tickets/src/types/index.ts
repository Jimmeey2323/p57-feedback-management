// User and Team Types
export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: 'admin' | 'manager' | 'team_lead' | 'team_member';
  team_id?: string;
  studio_location?: string;
  avatar_url?: string;
  notification_preferences: {
    email: boolean;
    in_app: boolean;
    sms?: boolean;
  };
  is_active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  lead_user_id?: string;
  escalation_user_id?: string;
  sla_targets?: Record<string, any>;
  is_active: boolean;
  created_at: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color_code?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Subcategory {
  id: string;
  category_id: string;
  name: string;
  description?: string;
  default_team_id?: string;
  default_priority: Priority;
  estimated_resolution_hours?: number;
  form_fields?: FormFieldsConfig;
  is_active: boolean;
  created_at: string;
}

// Form Field Types
export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'dropdown' | 'radio' | 'multiselect' | 'datetime' | 'number' | 'rating' | 'file' | 'tel' | 'email';
  required: boolean;
  options?: string[];
  accept?: string;
  scale?: number;
  placeholder?: string;
}

export interface FormFieldsConfig {
  fields: FormField[];
}

// Ticket Types
export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type TicketStatus = 'new' | 'assigned' | 'in_progress' | 'pending' | 'resolved' | 'closed' | 'reopened';

export interface Ticket {
  id: string;
  ticket_number: string;
  title: string;
  description?: string;
  category_id: string;
  subcategory_id: string;
  studio_location?: string;
  priority: Priority;
  status: TicketStatus;
  
  // Customer Info
  customer_name?: string;
  customer_membership_id?: string;
  customer_phone?: string;
  customer_email?: string;
  
  // Assignment
  reported_by_user_id: string;
  assigned_to_user_id?: string;
  assigned_team_id?: string;
  
  // Dynamic Form Data
  form_data?: Record<string, any>;
  
  // AI Analysis
  ai_tags?: string[];
  ai_sentiment?: 'positive' | 'neutral' | 'negative' | 'urgent';
  ai_priority_suggestion?: Priority;
  
  // SLA Tracking
  sla_due_at?: string;
  first_response_at?: string;
  resolved_at?: string;
  closed_at?: string;
  
  // Escalation
  escalation_level: number;
  escalated_to_user_id?: string;
  escalated_at?: string;
  
  // Metrics
  time_spent_minutes: number;
  is_overdue: boolean;
  reopened_count: number;
  
  created_at: string;
  updated_at: string;
  
  // Populated relationships
  category?: Category;
  subcategory?: Subcategory;
  assigned_to?: User;
  reported_by?: User;
  team?: Team;
}

export interface TicketResponse {
  id: string;
  ticket_id: string;
  user_id: string;
  response_text: string;
  is_internal_note: boolean;
  attachments?: string[];
  response_type: 'comment' | 'status_change' | 'assignment' | 'escalation';
  created_at: string;
  user?: User;
}

export interface TicketAttachment {
  id: string;
  ticket_id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  uploaded_by_user_id: string;
  created_at: string;
}

export interface TicketHistory {
  id: string;
  ticket_id: string;
  changed_by_user_id: string;
  change_type: string;
  old_value?: string;
  new_value?: string;
  notes?: string;
  created_at: string;
  changed_by?: User;
}

// Notification Types
export interface Notification {
  id: string;
  user_id: string;
  ticket_id?: string;
  notification_type: 'assignment' | 'reminder' | 'escalation' | 'mention' | 'update' | 'resolved';
  title: string;
  message?: string;
  is_read: boolean;
  read_at?: string;
  sent_via: 'email' | 'in_app' | 'sms';
  email_sent: boolean;
  created_at: string;
  ticket?: Ticket;
}

// Filter Types
export interface TicketFilters {
  status?: TicketStatus[];
  priority?: Priority[];
  category_id?: string;
  subcategory_id?: string;
  assigned_to_user_id?: string;
  assigned_team_id?: string;
  studio_location?: string;
  is_overdue?: boolean;
  search?: string;
  date_from?: string;
  date_to?: string;
}

// Analytics Types
export interface DashboardMetrics {
  total_open: number;
  resolved_today: number;
  avg_resolution_hours: number;
  sla_compliance_rate: number;
  overdue_count: number;
  by_priority: Record<Priority, number>;
  by_status: Record<TicketStatus, number>;
}

export interface TicketTrend {
  date: string;
  count: number;
  resolved: number;
}

export interface CategoryStats {
  category_id: string;
  category_name: string;
  count: number;
  avg_resolution_hours: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// Create/Update DTOs
export interface CreateTicketDto {
  title: string;
  description?: string;
  category_id: string;
  subcategory_id: string;
  studio_location?: string;
  priority: Priority;
  customer_name?: string;
  customer_membership_id?: string;
  customer_phone?: string;
  customer_email?: string;
  form_data?: Record<string, any>;
}

export interface UpdateTicketDto {
  title?: string;
  description?: string;
  priority?: Priority;
  status?: TicketStatus;
  assigned_to_user_id?: string;
  assigned_team_id?: string;
}
