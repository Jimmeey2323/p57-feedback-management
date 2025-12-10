# 🚀 Ticketing System - Advanced Features Implementation Plan

## ✅ Completed
1. **Momence API Service** (`src/services/momenceAPI.ts`)
   - Customer search by phone/email/name
   - Fetch customer details and bookings
   - Token management and authentication

2. **OpenAI Service** (`src/services/openAIService.ts`)
   - Auto-tagging based on ticket content
   - AI-powered priority calculation
   - Fallback rule-based analysis
   - Estimated closure date calculation

3. **Email Service** (`src/services/emailService.ts`)
   - SendGrid integration
   - Beautiful HTML email templates
   - Ticket creation notifications
   - Multi-recipient support

4. **Environment Variables** (`.env.example`)
   - Momence API credentials
   - OpenAI API key
   - SendGrid configuration

## 🔄 In Progress

### Phase 1: Create Ticket Form Restructure
**Files to Modify:**
- `src/components/tickets/CreateTicketForm.tsx` - Complete rewrite with:
  - Global fields section at top
  - Momence customer search component
  - Modern grid layout for dynamic fields
  - Auto-tagging and priority calculation integration
  - Email notification triggers

**New Components to Create:**
- `src/components/tickets/GlobalFieldsSection.tsx`
- `src/components/tickets/CustomerSearchWidget.tsx`
- `src/components/tickets/DynamicFieldsGrid.tsx`
- `src/components/tickets/PriorityCalculator.tsx`
- `src/components/tickets/TagDisplay.tsx`

### Phase 2: Dashboard Enhancements
**Files to Modify:**
- `src/pages/DashboardPage.tsx` - Remove mock data, add real analytics
- `src/components/dashboard/*` - All dashboard components

**New Components to Create:**
- `src/components/dashboard/AdvancedFilters.tsx`
- `src/components/dashboard/VoiceSearch.tsx`
- `src/components/dashboard/FuzzySearchBar.tsx`
- `src/components/dashboard/RealTimeAnalytics.tsx`
- `src/components/dashboard/TicketMetrics.tsx`

### Phase 3: Ticket List Advanced Features
**Files to Modify:**
- `src/components/tickets/TicketList.tsx`

**Features to Add:**
- Advanced filtering (multi-select, date ranges, fuzzy search)
- Voice search integration
- Bulk actions
- Quick view/edit
- Export functionality

## 📋 Implementation Details

### Global Fields Structure
```typescript
{
  // Auto-filled fields
  dateReported: Date (auto),
  estimatedClosure: Date (calculated from priority),
  ticketNumber: string (auto-generated),
  
  // Required fields
  studioLocation: string (dropdown),
  associate: string (staff member),
  routingDepartment: string (based on category),
  owner: string (assigned person),
  
  // Conditional fields (only for specific categories)
  className?: string,
  classDateTime?: Date,
  classDay?: string,
  teacherName?: string,
  
  // Customer details (optional, searchable)
  customer: {
    id?: string,
    name?: string,
    email?: string,
    phone?: string,
    membershipId?: string,
    membershipStatus?: string
  }
}
```

### Customer Search Flow
1. User types phone/email/name in search box
2. Debounced search to Momence API
3. Display results in dropdown
4. Select customer → auto-populate all fields
5. Option to manually enter if not found

### Auto-Tagging Flow
1. User fills in category, subcategory, description
2. On blur or every 2 seconds, call OpenAI service
3. Display suggested tags (editable)
4. Store tags with ticket

### Priority Calculation
1. Initial priority from subcategory default
2. AI analyzes description + customer sentiment
3. Suggests priority with reasoning
4. User can override
5. Calculate estimated closure date based on priority

### Email Notifications
Trigger emails on ticket creation to:
1. **Assigned Agent** (from routing department)
2. **Owner** (if specified)
3. **Management** (for critical/high priority)

Include in email:
- Ticket number, category, priority
- Customer details
- Description and tags
- Direct link to ticket
- Estimated closure date

## 🎨 Design Requirements

### Global Fields Section
- Card with gradient header
- Auto-filled fields: disabled with subtle highlight
- Required fields: red asterisk
- Conditional fields: show/hide based on category
- Clean 2-column grid on desktop, stack on mobile

### Customer Search Widget
- Search bar with icon
- Loading spinner during search
- Dropdown results with customer details
- "Not found? Add manually" option
- Display selected customer info in card

### Dynamic Fields Grid
- 2-3 column responsive grid
- Field grouping by type
- Smooth animations
- Field validation indicators
- Help text tooltips

### Dashboard
- Dark/light mode support
- Multiple chart types (line, bar, donut)
- Real-time updates
- Export options
- Filter presets
- Saved views

## 🔧 Technical Stack Additions

### New Dependencies Needed
```json
{
  "@sendgrid/mail": "^7.7.0",
  "openai": "^4.20.0",
  "react-select": "^5.8.0",
  "react-datepicker": "^4.21.0",
  "fuse.js": "^7.0.0",
  "chart.js": "^4.4.0",
  "react-chartjs-2": "^5.2.0",
  "date-fns": "^2.30.0",
  "react-hot-toast": "^2.4.1",
  "framer-motion": "^10.16.16"
}
```

### API Endpoints to Create (Supabase Edge Functions)
1. `/api/tickets/create` - Create ticket with email notifications
2. `/api/tickets/analyze` - OpenAI analysis
3. `/api/customers/search` - Momence customer search
4. `/api/analytics/dashboard` - Real-time analytics
5. `/api/email/notify` - Send email notifications

## 📊 Database Schema Updates

### Add to `tickets` table:
```sql
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS ai_priority VARCHAR(20);
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS sentiment VARCHAR(20);
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS urgency_score INTEGER;
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS estimated_closure_date TIMESTAMP;
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS momence_customer_id VARCHAR(100);
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS routing_department VARCHAR(100);
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS owner_user_id UUID REFERENCES users(id);
```

## 🚀 Deployment Checklist

- [ ] Add all environment variables to Vercel
- [ ] Install new dependencies
- [ ] Run database migrations
- [ ] Test Momence API integration
- [ ] Test OpenAI integration
- [ ] Test SendGrid email sending
- [ ] Configure CORS for APIs
- [ ] Set up error monitoring
- [ ] Add rate limiting
- [ ] Performance testing

## 📈 Next Steps

1. **Immediate**: Create new component files
2. **Phase 1**: Implement restructured CreateTicketForm
3. **Phase 2**: Add customer search integration
4. **Phase 3**: Implement AI features
5. **Phase 4**: Add email notifications
6. **Phase 5**: Enhance dashboard
7. **Testing**: Comprehensive testing of all features
8. **Documentation**: Update user guides

---

**Status**: Ready for implementation. All service files created. Need to create components and integrate.

**Estimated Time**: 
- Phase 1-3: 2-3 days
- Phase 4-5: 2 days
- Testing: 1 day
- **Total**: ~1 week for full implementation
