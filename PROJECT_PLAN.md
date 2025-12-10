# Physique 57 India - Smart Ticket Management System
## Comprehensive Implementation Plan

---

## Executive Summary

This document outlines the complete technical architecture, implementation phases, and feature specifications for building a production-ready ticket management and analytics platform for Physique 57 India's internal operations team.

### Key Objectives
1. **Centralized Feedback Management**: Single source of truth for all customer feedback and issues
2. **Intelligent Automation**: AI-powered ticket routing, tagging, and priority assignment
3. **Proactive Tracking**: Automated reminders and escalations with SLA compliance
4. **Actionable Analytics**: Real-time dashboards and comprehensive reporting for data-driven decisions
5. **Easy to Use**: Intuitive interface that reduces friction in ticket creation and management

---

## Technology Stack Recommendation

### Frontend
- **Framework**: React.js with TypeScript (type safety and scalability)
- **UI Library**: Tailwind CSS + shadcn/ui (modern, customizable components)
- **State Management**: React Query + Zustand (efficient data fetching and local state)
- **Charts**: Recharts or Chart.js (powerful visualization)
- **Forms**: React Hook Form (performance and validation)
- **Rich Text**: Lexical or Tiptap (modern rich text editing)

### Backend
- **Primary Database**: Supabase (PostgreSQL with real-time capabilities)
  - Built-in authentication and row-level security
  - Real-time subscriptions for live updates
  - REST and GraphQL APIs
  - File storage for attachments
  - Edge functions for serverless logic
  
**Alternative**: Firebase or traditional Node.js + PostgreSQL if preferred

### AI & Intelligence
- **OpenAI GPT-4**: Text analysis, categorization, sentiment analysis
- **OpenAI Embeddings**: Semantic search and duplicate detection
- **Vector Database**: Pinecone or Supabase pgvector for similarity search

### Notifications
- **Email**: SendGrid or AWS SES
- **In-App**: Supabase Realtime
- **SMS** (optional): Twilio
- **Push Notifications**: Firebase Cloud Messaging

### Hosting & DevOps
- **Frontend**: Vercel or Netlify
- **Backend**: Supabase Cloud (managed) or AWS/DigitalOcean
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry (error tracking) + Mixpanel/PostHog (analytics)

---

## Database Schema Design

### Core Tables

#### 1. users
```sql
- id (uuid, primary key)
- email (unique)
- full_name
- phone
- role (admin, manager, team_lead, team_member)
- team_id (foreign key)
- studio_location
- avatar_url
- notification_preferences (jsonb)
- is_active
- last_login
- created_at
- updated_at
```

#### 2. teams
```sql
- id (uuid, primary key)
- name (Operations, Tech, Customer Service, Trainers, Maintenance, Management)
- description
- lead_user_id (foreign key to users)
- escalation_user_id (foreign key to users)
- sla_targets (jsonb)
- is_active
- created_at
```

#### 3. categories
```sql
- id (uuid, primary key)
- name (Scheduling, Class Experience, Tech Issues, etc.)
- description
- icon
- color_code
- display_order
- is_active
```

#### 4. subcategories
```sql
- id (uuid, primary key)
- category_id (foreign key)
- name (Time Change, Bad Odour, AC Issues, etc.)
- description
- default_team_id (for auto-assignment)
- default_priority (low, medium, high, critical)
- estimated_resolution_hours
- form_fields (jsonb - dynamic field definitions)
- is_active
```

#### 5. tickets
```sql
- id (uuid, primary key)
- ticket_number (unique, auto-generated: TKT-YYYYMMDD-XXXX)
- title
- description (rich text)
- category_id
- subcategory_id
- studio_location
- priority (low, medium, high, critical)
- status (new, assigned, in_progress, pending, resolved, closed, reopened)
-
- customer_name
- customer_membership_id
- customer_phone
- customer_email
- 
- reported_by_user_id (internal staff who created ticket)
- assigned_to_user_id
- assigned_team_id
- 
- form_data (jsonb - answers to subcategory-specific questions)
- ai_tags (array of tags)
- ai_sentiment (positive, neutral, negative, urgent)
- ai_priority_suggestion
- 
- sla_due_at
- first_response_at
- resolved_at
- closed_at
- 
- escalation_level (0, 1, 2, 3)
- escalated_to_user_id
- escalated_at
- 
- time_spent_minutes
- is_overdue
- reopened_count
- 
- created_at
- updated_at
```

#### 6. ticket_responses
```sql
- id (uuid, primary key)
- ticket_id (foreign key)
- user_id (foreign key)
- response_text (rich text)
- is_internal_note (boolean - visible only to staff)
- attachments (array)
- response_type (comment, status_change, assignment, escalation)
- created_at
```

#### 7. ticket_attachments
```sql
- id (uuid, primary key)
- ticket_id (foreign key)
- file_name
- file_url
- file_type (image, pdf, video, audio, document)
- file_size
- uploaded_by_user_id
- created_at
```

#### 8. ticket_history
```sql
- id (uuid, primary key)
- ticket_id (foreign key)
- changed_by_user_id (foreign key)
- change_type (status, priority, assignment, escalation, etc.)
- old_value
- new_value
- notes
- created_at
```

#### 9. auto_assignment_rules
```sql
- id (uuid, primary key)
- name
- category_id (nullable - applies to all if null)
- subcategory_id (nullable)
- studio_location (nullable)
- priority (nullable)
- conditions (jsonb - complex rule logic)
- assign_to_team_id
- assign_to_user_id (nullable - can assign to specific user)
- priority_order
- is_active
```

#### 10. escalation_rules
```sql
- id (uuid, primary key)
- name
- trigger_condition (no_response, sla_breach, manual)
- trigger_after_hours
- priority_filter (which priorities this applies to)
- escalate_to_role (team_lead, manager, director)
- escalate_to_user_id (optional specific user)
- notification_template
- is_active
```

#### 11. notifications
```sql
- id (uuid, primary key)
- user_id (foreign key)
- ticket_id (foreign key, nullable)
- notification_type (assignment, reminder, escalation, mention, update)
- title
- message
- is_read
- read_at
- sent_via (email, in_app, sms)
- email_sent
- created_at
```

#### 12. ai_analysis_cache
```sql
- id (uuid, primary key)
- ticket_id (foreign key)
- analysis_type (sentiment, tags, category, priority, duplicate)
- result (jsonb)
- confidence_score
- model_used
- created_at
```

#### 13. analytics_metrics
```sql
- id (uuid, primary key)
- metric_date
- studio_location
- category_id
- team_id
- total_tickets
- resolved_tickets
- avg_resolution_hours
- sla_compliance_rate
- customer_satisfaction_avg
- top_issues (jsonb)
- created_at
```

#### 14. saved_filters
```sql
- id (uuid, primary key)
- user_id (foreign key)
- name
- filter_config (jsonb)
- is_public (visible to all team members)
- created_at
```

#### 15. knowledge_base_articles
```sql
- id (uuid, primary key)
- title
- content
- category_id
- subcategory_id
- tags (array)
- view_count
- helpful_count
- created_by_user_id
- is_published
- created_at
- updated_at
```

---

## Feature Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)

**Week 1: Setup & Authentication**
- Project initialization with React + TypeScript
- Supabase setup and database schema creation
- Authentication system (login, signup, password reset)
- Role-based access control setup
- User profile management
- Team management interface

**Week 2: Core Ticket System**
- Category and subcategory data seeding
- Basic ticket creation form
- Ticket listing view
- Ticket detail view
- Status management
- Basic search and filters

### Phase 2: Intelligence & Automation (Weeks 3-4)

**Week 3: Dynamic Forms & Assignment**
- Dynamic form builder for subcategory-specific fields
- Form field configuration UI for admins
- Auto-assignment rule engine
- Workload balancing algorithm
- Manual assignment override

**Week 4: AI Integration**
- OpenAI API integration
- Auto-tagging implementation
- Sentiment analysis
- Priority prediction
- Duplicate detection
- Category suggestion

### Phase 3: Notifications & Escalations (Weeks 5-6)

**Week 5: Notification System**
- Real-time notification infrastructure
- Email notification templates
- In-app notification center
- User notification preferences
- @mention functionality

**Week 6: SLA & Escalation**
- SLA tracking implementation
- Automatic escalation workflows
- Escalation hierarchy setup
- Reminder system
- Overdue ticket alerts

### Phase 4: Dashboard & Analytics (Weeks 7-8)

**Week 7: Centralized Dashboard**
- Role-specific dashboard layouts
- Status overview cards
- Quick filters and saved views
- Kanban board view
- Calendar view
- Advanced search

**Week 8: Analytics & Reporting**
- Real-time analytics dashboard
- Ticket volume trends charts
- Resolution time metrics
- Team performance reports
- Category distribution analysis
- SLA compliance tracking
- Export to PDF/Excel

### Phase 5: Advanced Features (Weeks 9-10)

**Week 9: Advanced Capabilities**
- Ticket linking and merging
- Internal notes vs customer responses
- Time tracking
- Bulk actions
- Ticket templates
- Knowledge base integration

**Week 10: Polish & Enhancement**
- Mobile responsive design
- Performance optimization
- Security hardening
- Comprehensive testing
- User documentation
- Admin training materials

---

## Detailed Feature Specifications

### 1. Intelligent Ticket Creation

**Dynamic Form System**
- Category selector with visual cards and icons
- Subcategory auto-loads relevant form fields
- Field types supported:
  - Short text (single line)
  - Long text (textarea)
  - Dropdown (single select)
  - Multi-select checkboxes
  - Date/time picker
  - File upload (images, documents, videos)
  - Rating scale (1-5 stars)
  - Yes/No toggle
  - Number input
  - Location/studio selector

**Smart Features**
- Auto-save drafts every 30 seconds
- Duplicate detection while typing
- AI-powered category suggestions based on description
- Quick ticket templates for common issues
- Bulk ticket creation from CSV import
- Customer information auto-complete (if repeat issue)

**Example: "AC and HVAC Issues" Form Fields**
```json
{
  "fields": [
    {
      "id": "location_specific",
      "label": "Which area is affected?",
      "type": "dropdown",
      "required": true,
      "options": ["Studio Floor", "Locker Room", "Reception", "Lounge", "Entire Facility"]
    },
    {
      "id": "temperature_type",
      "label": "Issue Type",
      "type": "radio",
      "required": true,
      "options": ["Too Hot", "Too Cold", "AC Not Working", "Strange Noise", "Bad Smell"]
    },
    {
      "id": "severity",
      "label": "How severe is the issue?",
      "type": "rating",
      "required": true,
      "scale": 5
    },
    {
      "id": "first_noticed",
      "label": "When was this first noticed?",
      "type": "datetime",
      "required": true
    },
    {
      "id": "photo",
      "label": "Upload Photo (optional)",
      "type": "file",
      "accept": "image/*",
      "required": false
    }
  ]
}
```

### 2. Auto-Assignment & Routing Engine

**Assignment Rules Priority**
1. **Exact Match Rules**: Specific subcategory + location + priority
2. **Category Rules**: General category-based assignment
3. **Location Rules**: Studio-specific team assignment
4. **Workload Balancing**: Distribute among available team members
5. **Fallback**: Assign to team lead if no rule matches

**Workload Balancing Algorithm**
- Count active tickets per team member
- Consider ticket priority (critical counts as 3, high as 2, medium as 1)
- Check user availability status
- Factor in historical resolution time per person
- Round-robin for equal workloads

**Example Rules**
- All "Tech Issues" → Tech Team
- All "Trainer Feedback" → Training Manager
- "AC Issues" at South Delhi Studio → Maintenance Team South Delhi
- "Critical" priority tickets → Team Lead directly
- "Brand Feedback" → Marketing Team

### 3. SLA & Escalation Management

**SLA Timelines by Priority**
| Priority | First Response | Resolution Target |
|----------|---------------|-------------------|
| Critical | 1 hour | 4 hours |
| High | 2 hours | 24 hours |
| Medium | 8 hours | 48 hours |
| Low | 24 hours | 5 days |

**Escalation Workflow**
```
Ticket Created → Auto-assigned to Team Member
    ↓ (No response in 50% of SLA)
    Reminder to Assigned Person
    ↓ (No response in 75% of SLA)
    Notify Team Lead
    ↓ (SLA Breach)
    Escalate to Manager + Mark as Overdue
    ↓ (24 hours overdue)
    Escalate to Director + High Priority Alert
```

**Escalation Actions**
- Change ticket priority to next level
- Reassign to escalation hierarchy
- Send urgent notifications
- Add to daily management report
- Block ticket closing until manager reviews

### 4. AI-Powered Intelligence

**Auto-Tagging System**
- Extract keywords using NLP (e.g., "urgent", "unhappy", "safety hazard")
- Categorize sentiment (positive, neutral, negative)
- Detect urgency level from language
- Identify affected departments
- Tag customer type (VIP, regular, new member)
- Location tagging if mentioned

**Sentiment Analysis**
```
"The AC is not working and it's unbearable during class"
→ Sentiment: Negative
→ Urgency: High
→ Tags: #temperature, #comfort, #class-experience
→ Suggested Priority: High
```

**Duplicate Detection**
- Convert ticket descriptions to embeddings
- Compare with recent tickets (last 30 days)
- Show similar tickets during creation
- Suggest linking or merging
- Auto-tag as "recurring issue" if pattern detected

**Category Prediction**
- Analyze ticket description
- Suggest best matching category and subcategory
- Show confidence score
- Allow manual override
- Learn from corrections over time

### 5. Comprehensive Analytics Dashboard

**Key Metrics (Real-Time)**
- Total Open Tickets
- Tickets Resolved Today
- Average Resolution Time
- SLA Compliance Rate
- Team Performance Scores
- Customer Satisfaction Rating
- Most Common Issues

**Visualization Charts**
1. **Ticket Volume Trends**: Line chart (daily/weekly/monthly)
2. **Category Distribution**: Pie chart or bar chart
3. **Resolution Time by Team**: Horizontal bar chart
4. **SLA Compliance**: Gauge chart with red/yellow/green zones
5. **Peak Hours Heatmap**: When most tickets are created
6. **Sentiment Trend**: Line chart showing positive vs negative over time
7. **Studio Comparison**: Multi-bar chart comparing locations

**Advanced Reports**
- **Team Performance Report**: Resolution time, SLA compliance, customer satisfaction per team/person
- **Trend Analysis**: Identify increasing/decreasing issue categories
- **Root Cause Analysis**: Cluster related tickets to find systemic problems
- **Predictive Insights**: Forecast ticket volume based on historical patterns
- **Customer Journey Report**: Track repeat issues from same customers
- **Training Needs Assessment**: Identify knowledge gaps from ticket types

**Export Options**
- PDF with charts and summary
- Excel with raw data and pivot tables
- CSV for further analysis
- Scheduled email reports (daily, weekly, monthly)

### 6. Notification System

**Notification Triggers**
- New ticket assigned to you
- Ticket updated by customer or team
- Someone mentioned you (@username)
- Ticket approaching SLA deadline
- Ticket escalated to you
- Ticket resolved/closed
- New response on your ticket

**Notification Channels**
- **In-App**: Badge count, notification center, toast messages
- **Email**: Configurable frequency (instant, digest, off)
- **SMS**: Only for critical escalations (optional)
- **Slack/WhatsApp**: Integration for team channels

**Notification Preferences**
Users can customize:
- Which events trigger notifications
- Preferred channels per event type
- Quiet hours (no notifications 10 PM - 8 AM)
- Digest frequency for non-urgent updates

### 7. Advanced Search & Filtering

**Search Fields**
- Ticket number
- Title and description (full-text)
- Customer name, email, membership ID
- Category and subcategory
- Status, priority
- Assigned to, created by
- Date range (created, resolved, closed)
- Studio location
- AI tags
- Custom form field values

**Advanced Filters**
- Boolean operators (AND, OR, NOT)
- Saved filter presets
- Quick filters (My Tickets, Overdue, Unassigned, High Priority)
- Multi-select filters
- Date range picker
- Filter by team or individual

**Saved Searches**
- Save complex filter combinations
- Share with team members
- Schedule as reports
- Set as default view

---

## Security & Compliance

### Row-Level Security (RLS)
- Users can only see tickets assigned to them or their team (unless admin/manager)
- Managers can see all tickets in their department
- Admins have full access
- Audit logs for all data access

### Data Protection
- Encrypt sensitive customer data (phone, email)
- Secure file upload with virus scanning
- Regular database backups (daily)
- GDPR compliance for data deletion requests
- Session timeout after 1 hour of inactivity

### Access Control
- Two-factor authentication for admin roles
- IP whitelist option for corporate network
- Password complexity requirements
- Failed login attempt monitoring
- Role-based permissions (RBAC)

---

## Additional Recommended Features

### 1. **Customer Self-Service Portal** (Future Phase)
- Allow customers to submit tickets directly
- Track their ticket status
- Rate resolution quality
- Browse knowledge base

### 2. **Mobile App** (Future Phase)
- Native iOS/Android app for staff
- Quick ticket creation with voice-to-text
- Push notifications
- Offline mode with sync

### 3. **Chatbot Interface**
- AI chatbot for quick ticket creation
- Natural language processing
- "Report an issue" conversational flow
- Integration with WhatsApp Business API

### 4. **Integration Hub**
- Momence (booking system) - Auto-create tickets for no-shows or cancellations
- Stripe/Razorpay (payment systems) - Payment issue tickets
- Yellow Messenger - Route support queries as tickets
- Google Calendar - Schedule follow-ups
- CRM - Sync customer data

### 5. **Gamification for Team**
- Leaderboard for fastest resolutions
- Badges for milestones (100 tickets resolved, 95% SLA compliance)
- Team performance competitions
- Monthly awards for best performer

### 6. **Predictive Maintenance**
- Analyze patterns in maintenance tickets
- Predict equipment failures before they happen
- Auto-schedule preventive maintenance
- Alert facility team proactively

### 7. **Quality Assurance**
- Random ticket audits by managers
- Quality scoring for resolutions
- Feedback on handling approach
- Training recommendations based on gaps

### 8. **Multi-Language Support**
- Interface in Hindi and English
- Auto-translate tickets if needed
- Language preference per user

### 9. **Voice Notes**
- Record voice notes for ticket descriptions
- Auto-transcribe using AI
- Useful for on-the-go reporting

### 10. **QR Code Quick Actions**
- Print QR codes for equipment
- Scan to instantly create maintenance ticket
- Pre-filled with equipment details

---

## Implementation Considerations

### Scalability
- Database indexing on frequently queried fields
- Caching for analytics queries
- CDN for file attachments
- Load balancing for high traffic
- Queue system for background jobs (email sending, AI analysis)

### Performance Optimization
- Lazy loading for ticket lists
- Pagination (50 tickets per page)
- Debounced search (wait 300ms after typing stops)
- Virtual scrolling for long lists
- Image compression for uploads

### Testing Strategy
- Unit tests for business logic
- Integration tests for API endpoints
- E2E tests for critical user flows
- Load testing for 100+ concurrent users
- User acceptance testing with real staff

### Deployment Strategy
- Staging environment for testing
- Blue-green deployment for zero downtime
- Database migration scripts
- Rollback plan for failed deployments
- Feature flags for gradual rollouts

---

## Critical Questions to Finalize

Before development begins, please confirm:

### 1. **User Base & Scale**
- How many internal staff will use the system daily?
- How many studios/locations currently? Future expansion plans?
- Expected daily ticket volume?
- Number of customers/members in database?

### 2. **Access & Permissions**
- Should customers be able to submit tickets directly, or only internal staff?
- If internal staff only, how do they receive customer feedback? (Phone, WhatsApp, in-person?)
- Should franchise locations have separate instances or shared database with location filters?

### 3. **Integration Requirements**
- Priority integrations: Momence, Stripe, Razorpay, Yellow Messenger?
- Existing CRM system details?
- Email service provider preference (SendGrid, AWS SES, Mailgun)?
- Slack/WhatsApp Business API for notifications?

### 4. **Hosting & Budget**
- Cloud preference: AWS, Google Cloud, or Supabase managed?
- Budget for AI API calls (OpenAI costs ~$0.002 per ticket analysis)?
- Need for dedicated servers or serverless is fine?

### 5. **Customization**
- Are the categories and subcategories finalized or still evolving?
- Need for custom branding (colors, logo, domain)?
- Any specific reporting requirements beyond what's outlined?

### 6. **Timeline & Resources**
- Target launch date?
- Will there be dedicated QA/testing before launch?
- Training plan for staff adoption?

---

## Estimated Timeline & Resources

### Development Timeline
- **Total Duration**: 10-12 weeks for MVP
- **Team Size**: 2-3 developers + 1 designer + 1 PM
- **Post-Launch Support**: Ongoing maintenance and feature additions

### Cost Estimates (Monthly Operational)
- **Hosting (Supabase Pro)**: $25/month (scales with usage)
- **AI API (OpenAI)**: ~$50-200/month (depends on ticket volume)
- **Email Service**: $15-50/month (SendGrid)
- **Monitoring Tools**: $25-50/month
- **Domain & SSL**: $10/year

### Success Metrics (First 3 Months)
- 90%+ staff adoption rate
- 85%+ SLA compliance
- <5 minutes average ticket creation time
- 75%+ AI tagging accuracy
- 4.5+ star internal system rating

---

## Next Steps

1. **Confirm scope and answer critical questions above**
2. **Approve final technology stack and architecture**
3. **Create detailed UI/UX mockups for key screens**
4. **Set up development environment and version control**
5. **Begin Phase 1 development: Database + Authentication**
6. **Weekly progress reviews and iterative feedback**

---

**Document Version**: 1.0  
**Last Updated**: December 10, 2025  
**Prepared For**: Physique 57 India  
**Prepared By**: Development Team

