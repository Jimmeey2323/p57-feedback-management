# Technical Architecture Document
## Physique 57 India - Ticket Management System

---

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend Layer                          │
│  React + TypeScript + Tailwind CSS                         │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  │  Dashboard   │ │ Ticket Mgmt  │ │  Analytics   │       │
│  │   Module     │ │    Module    │ │    Module    │       │
│  └──────────────┘ └──────────────┘ └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                   API Gateway / BFF                         │
│              (Backend for Frontend)                         │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                  Business Logic Layer                       │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐            │
│  │ Ticket     │ │Assignment  │ │Notification│            │
│  │ Service    │ │  Engine    │ │  Service   │            │
│  └────────────┘ └────────────┘ └────────────┘            │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐            │
│  │ Analytics  │ │   AI/ML    │ │Escalation  │            │
│  │  Service   │ │  Service   │ │  Engine    │            │
│  └────────────┘ └────────────┘ └────────────┘            │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                   Data Layer                                │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐            │
│  │ PostgreSQL │ │  File      │ │   Cache    │            │
│  │ (Supabase) │ │  Storage   │ │   (Redis)  │            │
│  └────────────┘ └────────────┘ └────────────┘            │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                External Services                            │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐            │
│  │  OpenAI    │ │  SendGrid  │ │   Slack    │            │
│  │    API     │ │   Email    │ │  Webhooks  │            │
│  └────────────┘ └────────────┘ └────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

### Frontend Components Hierarchy

```
App
├── AuthProvider
│   ├── LoginPage
│   ├── SignupPage
│   └── ForgotPasswordPage
│
├── MainLayout
│   ├── Sidebar
│   │   ├── NavigationMenu
│   │   └── UserProfile
│   ├── TopBar
│   │   ├── SearchBar
│   │   ├── NotificationBell
│   │   └── QuickActions
│   └── ContentArea
│
├── DashboardModule
│   ├── OverviewDashboard
│   │   ├── MetricCards
│   │   ├── TicketVolumeChart
│   │   ├── CategoryDistributionChart
│   │   └── RecentActivityFeed
│   ├── TeamDashboard
│   └── PersonalDashboard
│
├── TicketModule
│   ├── TicketListView
│   │   ├── FilterPanel
│   │   ├── TicketTable
│   │   └── Pagination
│   ├── TicketKanbanView
│   ├── TicketCalendarView
│   ├── TicketDetailView
│   │   ├── TicketHeader
│   │   ├── TicketInfo
│   │   ├── ResponseThread
│   │   ├── ActivityTimeline
│   │   └── ActionButtons
│   ├── CreateTicketForm
│   │   ├── CategorySelector
│   │   ├── DynamicFormFields
│   │   ├── FileUploader
│   │   └── SubmitButton
│   └── EditTicketForm
│
├── AnalyticsModule
│   ├── ReportsPage
│   │   ├── ReportBuilder
│   │   ├── ChartGallery
│   │   └── ExportOptions
│   ├── InsightsPage
│   ├── TrendsPage
│   └── CustomReportPage
│
├── AdminModule
│   ├── UserManagement
│   ├── TeamManagement
│   ├── CategoryManagement
│   ├── RulesConfiguration
│   │   ├── AssignmentRules
│   │   └── EscalationRules
│   └── SystemSettings
│
└── SharedComponents
    ├── Button
    ├── Input
    ├── Select
    ├── Modal
    ├── Toast
    ├── Loader
    ├── EmptyState
    ├── ErrorBoundary
    └── ConfirmDialog
```

---

## Data Flow Diagrams

### 1. Ticket Creation Flow

```
User Action: Create New Ticket
         ↓
[Select Category] → Load Categories from DB
         ↓
[Select Subcategory] → Load Subcategories + Form Fields
         ↓
[Fill Dynamic Form] → Validate Input
         ↓
[Upload Attachments] → Upload to Storage → Get URLs
         ↓
[Submit Ticket]
         ↓
Backend Processing:
    1. Create Ticket Record
    2. Trigger AI Analysis (Async)
       ├── Sentiment Analysis
       ├── Auto-Tagging
       ├── Priority Suggestion
       └── Duplicate Detection
    3. Run Auto-Assignment Rules
       ├── Match Rules by Category/Location/Priority
       ├── Check Team Member Availability
       ├── Calculate Workload
       └── Assign to Best Match
    4. Calculate SLA Due Time
    5. Create Notification Records
    6. Send Email to Assigned Person
    7. Create Ticket History Entry
         ↓
Response: Ticket Created Successfully
         ↓
Redirect to Ticket Detail Page
```

### 2. Auto-Assignment Algorithm Flow

```
New Ticket Created
         ↓
Extract: Category, Subcategory, Location, Priority
         ↓
Query Assignment Rules (ORDER BY priority_order)
         ↓
Match Found?
    ├── YES → Get Target Team/User
    └── NO → Use Default Rule (Assign to Team Lead)
         ↓
If User-Specific Assignment:
    Check User Availability
         ├── Available → Assign
         └── Unavailable → Assign to Team Lead
         ↓
If Team Assignment:
    Get All Active Team Members
         ↓
    Calculate Current Workload for Each:
        Active Tickets Count × Priority Weight
         ↓
    Filter by Availability Status
         ↓
    Sort by Workload (Ascending)
         ↓
    Assign to User with Lowest Workload
         ↓
Update Ticket with Assigned User/Team
         ↓
Create Notification
         ↓
Log to Ticket History
```

### 3. Escalation Workflow

```
Background Job (Runs Every 15 Minutes)
         ↓
Query All Active Tickets (status != resolved, closed)
         ↓
For Each Ticket:
    Calculate Time Since Creation
    Calculate Time to SLA Due
         ↓
    Is 50% of SLA Time Passed & No Response?
         ├── YES → Send Reminder to Assigned User
         └── NO → Continue
         ↓
    Is 75% of SLA Time Passed?
         ├── YES → Notify Team Lead
         └── NO → Continue
         ↓
    Is SLA Breached?
         ├── YES → 
         │   1. Mark Ticket as Overdue
         │   2. Escalate to Manager (escalation_level = 1)
         │   3. Send Escalation Email
         │   4. Create Escalation History
         └── NO → Continue
         ↓
    Is Ticket Overdue by 24+ Hours?
         ├── YES →
         │   1. Escalate to Director (escalation_level = 2)
         │   2. Send Critical Alert
         │   3. Add to Daily Executive Report
         └── NO → Continue
         ↓
Log Escalation Actions
         ↓
Update Analytics Cache
```

### 4. Real-Time Notification Flow

```
Event Occurs (Ticket Update, Assignment, Mention, etc.)
         ↓
Create Notification Record in Database
         ↓
Supabase Realtime Broadcasts Change
         ↓
Frontend Subscription Receives Update
         ↓
         ├── In-App: Show Toast Notification
         │            Update Notification Bell Badge
         │            Add to Notification Center
         │
         └── Email: Queue Email Job
                    ├── Check User Email Preferences
                    ├── If Instant → Send Immediately
                    ├── If Digest → Add to Batch Queue
                    └── If Off → Skip Email
                         ↓
Background Email Worker (Processes Queue)
         ↓
Send Email via SendGrid API
         ↓
Log Email Sent Status
```

---

## Database Schema with Relationships

```sql
-- Users have many Tickets (created by)
users (1) ----< (*) tickets.reported_by_user_id

-- Users have many Tickets (assigned to)
users (1) ----< (*) tickets.assigned_to_user_id

-- Teams have many Users
teams (1) ----< (*) users.team_id

-- Teams have many Tickets
teams (1) ----< (*) tickets.assigned_team_id

-- Categories have many Subcategories
categories (1) ----< (*) subcategories.category_id

-- Categories have many Tickets
categories (1) ----< (*) tickets.category_id

-- Subcategories have many Tickets
subcategories (1) ----< (*) tickets.subcategory_id

-- Tickets have many Responses
tickets (1) ----< (*) ticket_responses.ticket_id

-- Tickets have many Attachments
tickets (1) ----< (*) ticket_attachments.ticket_id

-- Tickets have many History Entries
tickets (1) ----< (*) ticket_history.ticket_id

-- Tickets have one AI Analysis Cache
tickets (1) ---- (0..1) ai_analysis_cache.ticket_id

-- Users have many Notifications
users (1) ----< (*) notifications.user_id

-- Tickets trigger many Notifications
tickets (1) ----< (*) notifications.ticket_id
```

---

## API Endpoints Design

### Authentication
```
POST   /auth/login
POST   /auth/signup
POST   /auth/logout
POST   /auth/refresh-token
POST   /auth/forgot-password
POST   /auth/reset-password
```

### Tickets
```
GET    /tickets                     # List tickets with filters
GET    /tickets/:id                 # Get ticket details
POST   /tickets                     # Create new ticket
PATCH  /tickets/:id                 # Update ticket
DELETE /tickets/:id                 # Delete ticket (soft delete)
POST   /tickets/:id/assign          # Assign ticket
POST   /tickets/:id/escalate        # Escalate ticket
POST   /tickets/:id/resolve         # Mark as resolved
POST   /tickets/:id/close           # Close ticket
POST   /tickets/:id/reopen          # Reopen ticket
GET    /tickets/:id/history         # Get ticket history
POST   /tickets/:id/responses       # Add response/comment
GET    /tickets/:id/related         # Get related/similar tickets
POST   /tickets/:id/merge           # Merge with another ticket
POST   /tickets/bulk-update         # Bulk update tickets
POST   /tickets/export              # Export tickets to CSV/PDF
```

### Categories & Subcategories
```
GET    /categories                  # List all categories
GET    /categories/:id/subcategories # Get subcategories
GET    /subcategories/:id/fields    # Get form fields config
POST   /categories                  # Create category (admin)
PATCH  /categories/:id              # Update category (admin)
POST   /subcategories               # Create subcategory (admin)
PATCH  /subcategories/:id           # Update subcategory (admin)
```

### Users & Teams
```
GET    /users                       # List users
GET    /users/:id                   # Get user details
PATCH  /users/:id                   # Update user
GET    /users/:id/tickets           # Get user's tickets
GET    /teams                       # List teams
GET    /teams/:id                   # Get team details
GET    /teams/:id/members           # Get team members
GET    /teams/:id/tickets           # Get team's tickets
POST   /teams                       # Create team (admin)
PATCH  /teams/:id                   # Update team (admin)
```

### Analytics
```
GET    /analytics/overview          # Dashboard metrics
GET    /analytics/tickets/trends    # Ticket volume over time
GET    /analytics/tickets/by-category # Category distribution
GET    /analytics/tickets/by-status # Status distribution
GET    /analytics/resolution-time   # Average resolution times
GET    /analytics/sla-compliance    # SLA metrics
GET    /analytics/team-performance  # Team performance stats
GET    /analytics/sentiment-trends  # Sentiment analysis trends
POST   /analytics/custom-report     # Generate custom report
GET    /analytics/export            # Export analytics data
```

### Notifications
```
GET    /notifications               # Get user's notifications
PATCH  /notifications/:id/read      # Mark as read
PATCH  /notifications/read-all      # Mark all as read
GET    /notifications/unread-count  # Get unread count
PATCH  /notifications/preferences   # Update notification settings
```

### Admin & Configuration
```
GET    /admin/assignment-rules      # List assignment rules
POST   /admin/assignment-rules      # Create rule
PATCH  /admin/assignment-rules/:id  # Update rule
DELETE /admin/assignment-rules/:id  # Delete rule
GET    /admin/escalation-rules      # List escalation rules
POST   /admin/escalation-rules      # Create rule
PATCH  /admin/escalation-rules/:id  # Update rule
GET    /admin/system-settings       # Get system settings
PATCH  /admin/system-settings       # Update settings
GET    /admin/audit-logs            # Get audit logs
```

### AI Services
```
POST   /ai/analyze-ticket           # Analyze ticket text
POST   /ai/suggest-category         # Suggest category
POST   /ai/detect-duplicates        # Find similar tickets
POST   /ai/sentiment-analysis       # Analyze sentiment
POST   /ai/auto-tag                 # Generate tags
```

### File Management
```
POST   /files/upload                # Upload file
DELETE /files/:id                   # Delete file
GET    /files/:id                   # Get file
```

---

## State Management Architecture

### Using Zustand for Global State

```typescript
// stores/authStore.ts
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

// stores/ticketStore.ts
interface TicketState {
  tickets: Ticket[];
  filters: TicketFilters;
  selectedTicket: Ticket | null;
  isLoading: boolean;
  fetchTickets: (filters?: TicketFilters) => Promise<void>;
  createTicket: (data: CreateTicketDto) => Promise<Ticket>;
  updateTicket: (id: string, data: Partial<Ticket>) => Promise<void>;
  setFilters: (filters: TicketFilters) => void;
}

// stores/notificationStore.ts
interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}
```

### Using React Query for Server State

```typescript
// hooks/useTickets.ts
export const useTickets = (filters?: TicketFilters) => {
  return useQuery({
    queryKey: ['tickets', filters],
    queryFn: () => fetchTickets(filters),
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: true,
  });
};

// hooks/useCreateTicket.ts
export const useCreateTicket = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateTicketDto) => createTicket(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['tickets']);
      toast.success('Ticket created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create ticket');
    },
  });
};
```

---

## Real-Time Features Implementation

### Supabase Realtime Subscriptions

```typescript
// Subscribe to ticket updates
const ticketSubscription = supabase
  .channel('tickets')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'tickets',
      filter: `assigned_to_user_id=eq.${userId}`,
    },
    (payload) => {
      console.log('Ticket updated:', payload);
      // Update local state
      queryClient.invalidateQueries(['tickets']);
    }
  )
  .subscribe();

// Subscribe to notifications
const notificationSubscription = supabase
  .channel('notifications')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'notifications',
      filter: `user_id=eq.${userId}`,
    },
    (payload) => {
      console.log('New notification:', payload);
      // Show toast notification
      toast.info(payload.new.message);
      // Update notification count
      queryClient.invalidateQueries(['notifications']);
    }
  )
  .subscribe();
```

---

## Security Architecture

### Row-Level Security (RLS) Policies

```sql
-- Users can only view tickets assigned to them or their team
CREATE POLICY "Users can view assigned tickets"
ON tickets FOR SELECT
USING (
  assigned_to_user_id = auth.uid()
  OR assigned_team_id IN (
    SELECT team_id FROM users WHERE id = auth.uid()
  )
  OR EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role IN ('admin', 'manager')
  )
);

-- Only ticket creator or assigned user can update
CREATE POLICY "Users can update their tickets"
ON tickets FOR UPDATE
USING (
  reported_by_user_id = auth.uid()
  OR assigned_to_user_id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role IN ('admin', 'manager')
  )
);

-- Only admins can delete tickets
CREATE POLICY "Only admins can delete"
ON tickets FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);
```

### Authentication Flow

```typescript
// JWT Token Structure
{
  "sub": "user-uuid",
  "email": "user@physique57.com",
  "role": "team_member",
  "team_id": "team-uuid",
  "iat": 1234567890,
  "exp": 1234571490
}

// Protected Route Example
function ProtectedRoute({ children, requiredRole }) {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }
  
  return children;
}
```

---

## Performance Optimization Strategies

### 1. Database Optimization
- **Indexing**: Add indexes on frequently queried columns
  ```sql
  CREATE INDEX idx_tickets_assigned_user ON tickets(assigned_to_user_id);
  CREATE INDEX idx_tickets_status ON tickets(status);
  CREATE INDEX idx_tickets_created_at ON tickets(created_at);
  CREATE INDEX idx_tickets_category ON tickets(category_id);
  CREATE INDEX idx_tickets_priority ON tickets(priority);
  ```

- **Materialized Views**: Pre-compute analytics
  ```sql
  CREATE MATERIALIZED VIEW ticket_analytics AS
  SELECT 
    DATE(created_at) as date,
    category_id,
    COUNT(*) as total_tickets,
    AVG(EXTRACT(EPOCH FROM (resolved_at - created_at))/3600) as avg_resolution_hours
  FROM tickets
  WHERE resolved_at IS NOT NULL
  GROUP BY DATE(created_at), category_id;
  ```

### 2. Caching Strategy
- Use Redis for:
  - User session data
  - Analytics dashboard (TTL: 5 minutes)
  - Category/subcategory lists (rarely change)
  - Auto-assignment rules (invalidate on update)

### 3. Frontend Optimization
- Code splitting per route
- Lazy loading components
- Virtual scrolling for long lists
- Debounced search (300ms)
- Optimistic UI updates
- Service worker for offline support

### 4. File Upload Optimization
- Client-side image compression
- Direct upload to S3/Supabase Storage
- Thumbnail generation for images
- Progress indicators
- Chunked upload for large files

---

## Monitoring & Observability

### Key Metrics to Track

**Application Metrics**
- Request/response times (p50, p95, p99)
- Error rates by endpoint
- Database query performance
- Cache hit/miss ratios
- File upload success rates

**Business Metrics**
- Tickets created per day
- Average resolution time
- SLA compliance rate
- Active users
- Most reported issues

**Infrastructure Metrics**
- CPU and memory usage
- Database connections
- Storage usage
- API rate limits

### Error Tracking with Sentry

```typescript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  beforeSend(event, hint) {
    // Filter sensitive data
    if (event.request) {
      delete event.request.cookies;
    }
    return event;
  },
});

// Usage
try {
  await createTicket(data);
} catch (error) {
  Sentry.captureException(error, {
    tags: { feature: 'ticket-creation' },
    extra: { ticketData: data },
  });
}
```

---

## Deployment Architecture

### Development Environment
```
localhost:3000 (Frontend)
localhost:54321 (Supabase Local)
```

### Staging Environment
```
staging.physique57-tickets.com
Supabase Staging Project
SendGrid Test Mode
OpenAI Dev API Key
```

### Production Environment
```
tickets.physique57.com
Supabase Production Project
SendGrid Production
OpenAI Production API Key
CDN: CloudFlare
Monitoring: Sentry + DataDog
```

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run test
      - run: npm run lint

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: build
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v3
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## Disaster Recovery & Business Continuity

### Backup Strategy
- **Database**: Automatic daily backups (retained for 30 days)
- **Files**: S3 versioning enabled
- **Code**: Git version control

### Recovery Plan
- **RTO (Recovery Time Objective)**: 4 hours
- **RPO (Recovery Point Objective)**: 24 hours
- **Failover**: Supabase handles automatic failover
- **Manual Recovery**: Database restore from backup

### High Availability
- Multi-region deployment (if needed)
- Load balancing across instances
- Database replication
- CDN for static assets

---

This architecture provides a scalable, secure, and maintainable foundation for the Physique 57 India ticket management system.
