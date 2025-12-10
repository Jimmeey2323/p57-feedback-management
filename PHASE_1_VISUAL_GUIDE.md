# 🎨 Phase 1 Visual Guide - New Ticket Form

## Form Structure Overview

```
┌─────────────────────────────────────────────────────────────┐
│  Create New Ticket                                          │
│  Fill out the form below to submit a new support ticket    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  🎯 SELECT ISSUE TYPE                                       │
├─────────────────────────────────────────────────────────────┤
│  Category *          [Select a category ▼]                  │
│  Subcategory *       [Select category first ▼]              │
│                                                             │
│  Ticket Title *      [Brief summary...]                     │
│  Description         [Detailed information...]              │
│                      🤖 Analyzing with AI...                │
│                      💡 AI Suggested Tags:                  │
│                      [Urgent] [Technical] [Billing]         │
│                      💡 AI suggests high priority           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  📋 TICKET INFORMATION                                      │
│  Global fields for all tickets                             │
├─────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────┐│
│  │ • AUTO-GENERATED FIELDS                                ││
│  │                                                        ││
│  │  📅 Date & Time Reported                              ││
│  │  [Jan 15, 2024, 10:30 AM] (disabled)                 ││
│  │                                                        ││
│  │  ⏰ Estimated Closure Date                            ││
│  │  [Jan 16, 2024, 10:30 AM] (disabled, from priority)  ││
│  └────────────────────────────────────────────────────────┘│
│                                                             │
│  REQUIRED INFORMATION *                                     │
│                                                             │
│  🏢 Studio Location *     👤 Associate *                   │
│  [Select location ▼]      [Select associate ▼]             │
│                                                             │
│  🎯 Routing Department *  👨‍💼 Owner *                      │
│  [Operations ▼]           [Select owner ▼]                 │
│                                                             │
│  ⚡ Priority Level *                                        │
│  [Low] [Medium] [High] [Critical]                          │
│  (buttons with colors - currently selected highlighted)    │
│                                                             │
│  🏋️ CLASS INFORMATION (if applicable)                      │
│  Class Name           Class Date & Time                     │
│  [Studio Barre 57]    [2024-01-15T18:00]                   │
│  Class Day            Teacher Name                          │
│  [Monday ▼]           [Instructor name]                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  👤 CUSTOMER INFORMATION                         [▼ Expand] │
│  Optional - Link ticket to a customer                       │
├─────────────────────────────────────────────────────────────┤
│  🔍 Search Customer                                         │
│  [Search by name, email, phone...]                    [🔄]  │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Results:                                              ││
│  │ • John Doe                                            ││
│  │   john@example.com | +91 98765 43210                 ││
│  │   [Active Membership]                                 ││
│  │                                                        ││
│  │ • Jane Smith                                          ││
│  │   jane@example.com | +91 98765 12345                 ││
│  │   [Inactive]                                          ││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  ➕ Customer not found? Add manually                        │
│                                                             │
│  --- AFTER SELECTION ---                                   │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  [JD]  John Doe                          [Remove]     ││
│  │        john@example.com                               ││
│  │                                                        ││
│  │  Phone:        +91 98765 43210    Membership: Active  ││
│  │  Total Books:  25                  Momence ID: 12345  ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  📝 CATEGORY-SPECIFIC DETAILS                               │
│  Fill in the relevant information below                     │
├─────────────────────────────────────────────────────────────┤
│  📝 Issue Type       ⏰ Time of Issue    📞 Phone          │
│  [Equipment ▼]       [14:30]             [+91...]          │
│                                                             │
│  📋 Equipment Name   🔢 Quantity         📅 Purchase Date   │
│  [Reformer]          [2]                 [2024-01-01]      │
│                                                             │
│  📄 Detailed Description of Issue                          │
│  [Multi-line text area spanning full width...]             │
│  [                                                    ]     │
│  [                                                    ]     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                      [Cancel]  [Create ➤]   │
└─────────────────────────────────────────────────────────────┘
```

---

## Color Scheme

### Section Headers
- **Select Issue Type**: Blue gradient (#3B82F6 → #2563EB)
- **Ticket Information**: Purple gradient (#6366F1 → #EC4899)
- **Customer Information**: Teal gradient (#14B8A6 → #06B6D4)
- **Category-Specific Details**: Purple/Pink gradient (#A855F7 → #EC4899)

### Priority Buttons
- **Low**: Gray (#6B7280) - "log only"
- **Medium**: Blue (#3B82F6) - "48hrs"
- **High**: Orange (#F59E0B) - "24hrs"  
- **Critical**: Red (#EF4444) - "immediate"

### Status Indicators
- **Valid Field**: Green checkmark (✓) (#10B981)
- **Invalid Field**: Red X (✗) (#EF4444)
- **Required**: Red asterisk (*) (#EF4444)
- **Auto-filled**: Gray background (#F3F4F6)

### AI Elements
- **AI Tags**: Indigo badges (#6366F1 background, #4338CA text)
- **AI Suggestion**: Yellow alert box (#FEF3C7 background)
- **Loading**: Indigo spinner (#6366F1)

---

## Interactive Elements

### Buttons
```
┌──────────────┐  Hover →  ┌──────────────┐
│   [Medium]   │           │   [Medium]   │
│              │           │ (scale 1.05) │
└──────────────┘           └──────────────┘
     Normal                    Hover

┌──────────────┐           ┌──────────────┐
│ > [Medium] < │           │   [Medium]   │
│  ring-2      │           │              │
└──────────────┘           └──────────────┘
    Selected                 Unselected
```

### Customer Search
```
[Search customer...]
         ↓ (types "john")
[Search customer: john]  [🔄 Searching...]
         ↓ (debounce 500ms)
┌──────────────────────────────────┐
│ • John Doe                       │ ← Hover: light blue bg
│   john@example.com               │
│   +91 98765 43210                │
│   [Active]                       │
├──────────────────────────────────┤
│ • John Smith                     │
│   ...                            │
└──────────────────────────────────┘
         ↓ (click)
[JD]  John Doe        [Remove]
      john@example.com
      All fields auto-populated ✓
```

### AI Analysis
```
[Description field active]
    User types: "The reformer is broken and making noise..."
    User clicks outside field (blur)
         ↓
[🤖 Analyzing with AI...]  ← Shows for 2-5 seconds
         ↓
✨ AI analysis complete!  ← Toast notification
         ↓
💡 AI Suggested Tags:
[Equipment] [Urgent] [Reformer] [Maintenance]
         ↓
💡 AI suggests high priority for this ticket
(Current: medium)
```

### Form Validation
```
Submit clicked
    ↓
Check required fields
    ↓
┌─────────────────────────┐
│ ⚠️ Please select a      │  ← Toast error
│    studio location      │
└─────────────────────────┘
    ↓
User fills field
    ↓
Green checkmark appears ✓
    ↓
All valid → Form submits
    ↓
┌─────────────────────────┐
│ 🎉 Ticket created       │  ← Toast success
│    successfully!        │
└─────────────────────────┘
    ↓
Navigate to /tickets
```

---

## Animations

### Fade In (0.3s)
- Section cards when form loads
- Dynamic field grid when subcategory selected
- Success/error toasts

### Slide Down (0.2s)
- Conditional class fields when shown
- Customer search dropdown results
- Priority suggestion alert

### Scale (0.15s)
- Button hover effects (1.0 → 1.05)
- Selected priority button (with ring effect)

### Spin (continuous)
- Loading spinner during API calls
- AI analysis indicator

---

## Responsive Breakpoints

### Desktop (≥1024px)
```
[Category]        [Subcategory]
[Location]        [Associate]
[Department]      [Owner]
[Class Name]      [Class Time]
[Field 1]  [Field 2]  [Field 3]
```

### Tablet (768px - 1023px)
```
[Category]        [Subcategory]
[Location]        [Associate]
[Department]      [Owner]
[Class Name]      [Class Time]
[Field 1]         [Field 2]
```

### Mobile (<768px)
```
[Category]
[Subcategory]
[Location]
[Associate]
[Department]
[Owner]
[Class Name]
[Class Time]
[Field 1]
[Field 2]
```

---

## Toast Notifications

### Success (Green)
```
┌─────────────────────────────────┐
│ ✓ Customer search complete      │
│   Found 5 results               │
└─────────────────────────────────┘
Duration: 3 seconds
```

### AI Success (Blue with robot icon)
```
┌─────────────────────────────────┐
│ 🤖 AI analysis complete!        │
│    Review suggested tags        │
└─────────────────────────────────┘
Duration: 4 seconds
```

### Error (Red)
```
┌─────────────────────────────────┐
│ ✗ Please select a category      │
└─────────────────────────────────┘
Duration: 5 seconds
```

### Loading (no icon)
```
┌─────────────────────────────────┐
│ 🔄 Creating ticket...           │
└─────────────────────────────────┘
Duration: Until complete
```

---

## Field States

### Empty Required
```
┌─────────────────────────┐
│ Studio Location *       │
│ [Select location ▼]     │  ← Gray border
└─────────────────────────┘
```

### Filled Valid
```
┌─────────────────────────┐
│ Studio Location * ✓     │
│ [Kemps Corner      ]    │  ← Green border + checkmark
└─────────────────────────┘
```

### Filled Invalid
```
┌─────────────────────────┐
│ Email * ✗               │
│ [not-an-email      ]    │  ← Red border + X
│ ⚠️ Invalid email format  │
└─────────────────────────┘
```

### Disabled Auto-fill
```
┌─────────────────────────┐
│ Date Reported           │
│ [Jan 15, 2024, 10:30]   │  ← Light gray bg, cursor disabled
└─────────────────────────┘
```

---

## Loading States

### Form Loading
```
[Spinning circle]
Loading categories...
```

### Customer Search
```
[Search john...]  [🔄]  ← Spinner in input
```

### AI Analysis
```
Description field
    ↓
[🤖 Analyzing with AI...]
[Spinning indicator]
```

### Form Submission
```
[Creating Ticket]
    ↓
Button shows:
┌───────────────────────┐
│ [🔄] Creating...      │  ← Disabled + spinner
└───────────────────────┘
```

---

## Error Handling

### API Failures
- **Customer Search**: Shows "No results found" (doesn't crash)
- **AI Analysis**: Silent fail, continues without tags
- **Email Send**: Ticket still creates, logs error only

### Validation Errors
- Toast notification with specific field name
- Field highlights in red with X indicator
- Scroll to first error field (automatic)

### Network Errors
```
┌─────────────────────────────────┐
│ ✗ Failed to load categories     │
│   Please refresh the page       │
└─────────────────────────────────┘
```

---

## Accessibility Features

- ✅ Keyboard navigation (Tab through fields)
- ✅ Screen reader labels on all inputs
- ✅ Color contrast WCAG AA compliant
- ✅ Focus indicators on interactive elements
- ✅ Error messages linked to fields
- ✅ Required field indicators (* and aria-required)

---

This visual guide shows exactly how the form looks and behaves in production!
