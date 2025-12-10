# Complete Category & Subcategory Structure
## With Form Field Definitions for Physique 57 India

---

## Category: Scheduling

### Subcategories with Form Fields

#### 1. Time Change
```json
{
  "id": "time-change",
  "name": "Time Change",
  "default_priority": "medium",
  "estimated_resolution_hours": 4,
  "form_fields": {
    "fields": [
      {
        "id": "current_time",
        "label": "Current Class Time",
        "type": "datetime",
        "required": true
      },
      {
        "id": "requested_time",
        "label": "Requested New Time",
        "type": "datetime",
        "required": true
      },
      {
        "id": "reason",
        "label": "Reason for Change Request",
        "type": "textarea",
        "required": true
      },
      {
        "id": "urgency",
        "label": "How urgent is this?",
        "type": "dropdown",
        "options": ["Not Urgent", "Somewhat Urgent", "Very Urgent"],
        "required": true
      }
    ]
  }
}
```

#### 2. Level Change
```json
{
  "id": "level-change",
  "name": "Level Change",
  "default_priority": "low",
  "estimated_resolution_hours": 8,
  "form_fields": {
    "fields": [
      {
        "id": "current_level",
        "label": "Current Class Level",
        "type": "dropdown",
        "options": ["Beginner", "Intermediate", "Advanced", "All Levels"],
        "required": true
      },
      {
        "id": "requested_level",
        "label": "Requested Level",
        "type": "dropdown",
        "options": ["Beginner", "Intermediate", "Advanced", "All Levels"],
        "required": true
      },
      {
        "id": "reason",
        "label": "Reason for Level Change",
        "type": "textarea",
        "required": true
      }
    ]
  }
}
```

#### 3. Additional Classes
```json
{
  "id": "additional-classes",
  "name": "Additional Classes",
  "default_priority": "low",
  "estimated_resolution_hours": 24,
  "form_fields": {
    "fields": [
      {
        "id": "requested_time_slot",
        "label": "Preferred Time Slot",
        "type": "dropdown",
        "options": ["Early Morning (6-9 AM)", "Morning (9-12 PM)", "Afternoon (12-5 PM)", "Evening (5-8 PM)", "Late Evening (8-10 PM)"],
        "required": true
      },
      {
        "id": "days_preferred",
        "label": "Preferred Days",
        "type": "multiselect",
        "options": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "required": true
      },
      {
        "id": "class_type",
        "label": "Type of Class Requested",
        "type": "text",
        "required": false
      },
      {
        "id": "additional_notes",
        "label": "Additional Notes",
        "type": "textarea",
        "required": false
      }
    ]
  }
}
```

---

## Category: Class Experience

#### 4. Bad Odour
```json
{
  "id": "bad-odour",
  "name": "Bad Odour",
  "default_priority": "high",
  "estimated_resolution_hours": 2,
  "form_fields": {
    "fields": [
      {
        "id": "location",
        "label": "Where is the odour?",
        "type": "dropdown",
        "options": ["Studio Floor", "Locker Room", "Bathroom", "Reception Area", "Hallway", "Equipment Storage"],
        "required": true
      },
      {
        "id": "odour_type",
        "label": "Type of Odour",
        "type": "dropdown",
        "options": ["Musty/Mildew", "Body Odor", "Chemical", "Sewage", "Other"],
        "required": true
      },
      {
        "id": "severity",
        "label": "How severe is it?",
        "type": "rating",
        "scale": 5,
        "required": true
      },
      {
        "id": "when_noticed",
        "label": "When was this first noticed?",
        "type": "datetime",
        "required": true
      },
      {
        "id": "photo",
        "label": "Upload Photo (if applicable)",
        "type": "file",
        "accept": "image/*",
        "required": false
      }
    ]
  }
}
```

#### 5. Audio Issues
```json
{
  "id": "audio-issues",
  "name": "Audio Issues",
  "default_priority": "high",
  "estimated_resolution_hours": 1,
  "form_fields": {
    "fields": [
      {
        "id": "issue_type",
        "label": "What is the audio problem?",
        "type": "dropdown",
        "options": ["No Sound", "Crackling/Static", "Too Loud", "Too Quiet", "Distorted", "Echo", "Intermittent"],
        "required": true
      },
      {
        "id": "affected_area",
        "label": "Which studio/area?",
        "type": "text",
        "required": true
      },
      {
        "id": "during_class",
        "label": "Was this during a class?",
        "type": "radio",
        "options": ["Yes", "No"],
        "required": true
      },
      {
        "id": "class_time",
        "label": "If yes, what time?",
        "type": "datetime",
        "required": false
      }
    ]
  }
}
```

#### 6. Studio Temperature Too Hot/Cold
```json
{
  "id": "studio-temperature",
  "name": "Studio Temperature Too Hot/Cold",
  "default_priority": "high",
  "estimated_resolution_hours": 2,
  "form_fields": {
    "fields": [
      {
        "id": "temperature_issue",
        "label": "Temperature Issue",
        "type": "radio",
        "options": ["Too Hot", "Too Cold", "Fluctuating"],
        "required": true
      },
      {
        "id": "studio_area",
        "label": "Which studio/area?",
        "type": "text",
        "required": true
      },
      {
        "id": "discomfort_level",
        "label": "Level of Discomfort",
        "type": "rating",
        "scale": 5,
        "required": true
      },
      {
        "id": "class_affected",
        "label": "Was a class affected?",
        "type": "radio",
        "options": ["Yes", "No"],
        "required": true
      },
      {
        "id": "time_of_issue",
        "label": "When did this happen?",
        "type": "datetime",
        "required": true
      }
    ]
  }
}
```

---

## Category: Trainer Feedback

#### 7. Trainer Forgot Names
```json
{
  "id": "trainer-forgot-names",
  "name": "Trainer Forgot Names",
  "default_priority": "low",
  "estimated_resolution_hours": 8,
  "form_fields": {
    "fields": [
      {
        "id": "trainer_name",
        "label": "Trainer Name",
        "type": "text",
        "required": true
      },
      {
        "id": "class_date_time",
        "label": "Class Date & Time",
        "type": "datetime",
        "required": true
      },
      {
        "id": "customer_affected",
        "label": "Customer Who Reported",
        "type": "text",
        "required": false
      },
      {
        "id": "additional_details",
        "label": "Additional Details",
        "type": "textarea",
        "required": false
      }
    ]
  }
}
```

#### 8. Class Intensity Too High/Low
```json
{
  "id": "class-intensity",
  "name": "Class Intensity Too High/Low",
  "default_priority": "medium",
  "estimated_resolution_hours": 24,
  "form_fields": {
    "fields": [
      {
        "id": "trainer_name",
        "label": "Trainer Name",
        "type": "text",
        "required": true
      },
      {
        "id": "intensity_issue",
        "label": "Intensity Issue",
        "type": "radio",
        "options": ["Too High", "Too Low", "Inconsistent"],
        "required": true
      },
      {
        "id": "customer_level",
        "label": "Customer Fitness Level",
        "type": "dropdown",
        "options": ["Beginner", "Intermediate", "Advanced"],
        "required": true
      },
      {
        "id": "class_date_time",
        "label": "Class Date & Time",
        "type": "datetime",
        "required": true
      },
      {
        "id": "feedback_details",
        "label": "Detailed Feedback",
        "type": "textarea",
        "required": true
      }
    ]
  }
}
```

---

## Category: Repair and Maintenance

#### 9. AC and HVAC Issues
```json
{
  "id": "ac-hvac-issues",
  "name": "AC and HVAC Issues",
  "default_priority": "critical",
  "estimated_resolution_hours": 4,
  "form_fields": {
    "fields": [
      {
        "id": "issue_type",
        "label": "What is the AC problem?",
        "type": "dropdown",
        "options": ["Not Cooling", "Not Heating", "Strange Noise", "Water Leaking", "Not Turning On", "Bad Smell"],
        "required": true
      },
      {
        "id": "location",
        "label": "Which area is affected?",
        "type": "dropdown",
        "options": ["Studio Floor", "Locker Room", "Reception", "Lounge", "Entire Facility"],
        "required": true
      },
      {
        "id": "severity",
        "label": "How severe is the issue?",
        "type": "rating",
        "scale": 5,
        "required": true
      },
      {
        "id": "first_noticed",
        "label": "When was this first noticed?",
        "type": "datetime",
        "required": true
      },
      {
        "id": "photo_video",
        "label": "Upload Photo or Video",
        "type": "file",
        "accept": "image/*,video/*",
        "required": false
      }
    ]
  }
}
```

#### 10. TFA Malfunction
```json
{
  "id": "tfa-malfunction",
  "name": "TFA Malfunction",
  "default_priority": "high",
  "estimated_resolution_hours": 2,
  "form_fields": {
    "fields": [
      {
        "id": "equipment_number",
        "label": "Equipment ID/Number",
        "type": "text",
        "required": false
      },
      {
        "id": "malfunction_type",
        "label": "What's wrong?",
        "type": "dropdown",
        "options": ["Won't Turn On", "Display Error", "Unusual Noise", "Unstable/Wobbly", "Broken Part", "Other"],
        "required": true
      },
      {
        "id": "location",
        "label": "Studio Location",
        "type": "text",
        "required": true
      },
      {
        "id": "safety_concern",
        "label": "Is this a safety concern?",
        "type": "radio",
        "options": ["Yes", "No"],
        "required": true
      },
      {
        "id": "description",
        "label": "Detailed Description",
        "type": "textarea",
        "required": true
      },
      {
        "id": "photo",
        "label": "Upload Photo",
        "type": "file",
        "accept": "image/*",
        "required": false
      }
    ]
  }
}
```

---

## Category: Tech Issues

#### 11. Momence Issues
```json
{
  "id": "momence-issues",
  "name": "Momence Issues",
  "default_priority": "high",
  "estimated_resolution_hours": 2,
  "form_fields": {
    "fields": [
      {
        "id": "issue_type",
        "label": "What is the Momence issue?",
        "type": "dropdown",
        "options": ["Cannot Login", "Booking Error", "Payment Failed", "Class Not Showing", "Schedule Sync Issue", "Other"],
        "required": true
      },
      {
        "id": "affected_user",
        "label": "Who experienced this?",
        "type": "dropdown",
        "options": ["Customer", "Staff Member"],
        "required": true
      },
      {
        "id": "error_message",
        "label": "Error Message (if any)",
        "type": "textarea",
        "required": false
      },
      {
        "id": "screenshot",
        "label": "Upload Screenshot",
        "type": "file",
        "accept": "image/*",
        "required": false
      },
      {
        "id": "when_occurred",
        "label": "When did this happen?",
        "type": "datetime",
        "required": true
      }
    ]
  }
}
```

#### 12. Laptops Not Functioning
```json
{
  "id": "laptops-not-functioning",
  "name": "Laptops Not Functioning",
  "default_priority": "high",
  "estimated_resolution_hours": 4,
  "form_fields": {
    "fields": [
      {
        "id": "laptop_location",
        "label": "Laptop Location (Desk/Room)",
        "type": "text",
        "required": true
      },
      {
        "id": "issue",
        "label": "What's the problem?",
        "type": "dropdown",
        "options": ["Won't Turn On", "Frozen/Slow", "WiFi Not Connecting", "Software Error", "Hardware Damage", "Other"],
        "required": true
      },
      {
        "id": "business_impact",
        "label": "Is this blocking work?",
        "type": "radio",
        "options": ["Yes - Critical", "Yes - Minor Impact", "No"],
        "required": true
      },
      {
        "id": "description",
        "label": "Problem Description",
        "type": "textarea",
        "required": true
      }
    ]
  }
}
```

---

## Category: Pricing and Memberships

#### 13. Price Transparency
```json
{
  "id": "price-transparency",
  "name": "Price Transparency",
  "default_priority": "medium",
  "estimated_resolution_hours": 8,
  "form_fields": {
    "fields": [
      {
        "id": "pricing_confusion",
        "label": "What pricing information is unclear?",
        "type": "dropdown",
        "options": ["Membership Cost", "Class Pack Pricing", "Add-on Services", "Cancellation Fees", "Hidden Charges", "Other"],
        "required": true
      },
      {
        "id": "customer_name",
        "label": "Customer Name",
        "type": "text",
        "required": false
      },
      {
        "id": "details",
        "label": "Describe the confusion",
        "type": "textarea",
        "required": true
      },
      {
        "id": "where_found",
        "label": "Where did customer see this info?",
        "type": "dropdown",
        "options": ["Website", "App", "In Studio", "Social Media", "Email", "Other"],
        "required": false
      }
    ]
  }
}
```

---

## Category: Customer Service and Communication

#### 14. Delay in Response
```json
{
  "id": "delay-in-response",
  "name": "Delay in Response",
  "default_priority": "medium",
  "estimated_resolution_hours": 4,
  "form_fields": {
    "fields": [
      {
        "id": "inquiry_type",
        "label": "Type of Inquiry",
        "type": "dropdown",
        "options": ["Email", "Phone Call", "WhatsApp", "In-Person", "Social Media DM"],
        "required": true
      },
      {
        "id": "when_contacted",
        "label": "When did customer first contact?",
        "type": "datetime",
        "required": true
      },
      {
        "id": "response_time_hours",
        "label": "How long was the delay?",
        "type": "number",
        "required": true
      },
      {
        "id": "customer_details",
        "label": "Customer Name/ID",
        "type": "text",
        "required": false
      },
      {
        "id": "notes",
        "label": "Additional Notes",
        "type": "textarea",
        "required": false
      }
    ]
  }
}
```

---

## Category: Safety and Security

#### 15. Emergency Exits Blocked
```json
{
  "id": "emergency-exits-blocked",
  "name": "Emergency Exits Blocked",
  "default_priority": "critical",
  "estimated_resolution_hours": 1,
  "form_fields": {
    "fields": [
      {
        "id": "exit_location",
        "label": "Which emergency exit?",
        "type": "text",
        "required": true
      },
      {
        "id": "blocked_by",
        "label": "What is blocking it?",
        "type": "dropdown",
        "options": ["Equipment", "Furniture", "Boxes/Storage", "Other"],
        "required": true
      },
      {
        "id": "photo",
        "label": "Upload Photo",
        "type": "file",
        "accept": "image/*",
        "required": true
      },
      {
        "id": "reported_by",
        "label": "Reported By",
        "type": "text",
        "required": true
      },
      {
        "id": "immediate_danger",
        "label": "Is there immediate danger?",
        "type": "radio",
        "options": ["Yes", "No"],
        "required": true
      }
    ]
  }
}
```

---

## Category: Theft and Lost Items

#### 16. Locker Theft
```json
{
  "id": "locker-theft",
  "name": "Locker Theft",
  "default_priority": "critical",
  "estimated_resolution_hours": 2,
  "form_fields": {
    "fields": [
      {
        "id": "locker_number",
        "label": "Locker Number",
        "type": "text",
        "required": true
      },
      {
        "id": "customer_name",
        "label": "Customer Name",
        "type": "text",
        "required": true
      },
      {
        "id": "customer_phone",
        "label": "Customer Phone",
        "type": "tel",
        "required": true
      },
      {
        "id": "items_stolen",
        "label": "Items Stolen",
        "type": "textarea",
        "required": true
      },
      {
        "id": "estimated_value",
        "label": "Estimated Value (₹)",
        "type": "number",
        "required": false
      },
      {
        "id": "time_of_theft",
        "label": "Approximate Time",
        "type": "datetime",
        "required": true
      },
      {
        "id": "police_notified",
        "label": "Police Notified?",
        "type": "radio",
        "options": ["Yes", "No"],
        "required": true
      }
    ]
  }
}
```

---

## Summary

**Total Structure:**
- **13 Main Categories**
- **240+ Subcategories** (as per your original list)
- **Each subcategory has 3-8 dynamic form fields**
- **Form field types**: text, textarea, dropdown, radio, multiselect, datetime, number, rating, file upload

**Priority Assignment Logic:**
- Critical: Safety, theft, AC failures, system outages
- High: Customer impact issues, audio problems, odor
- Medium: Scheduling, feedback, pricing queries
- Low: Minor aesthetic issues, suggestions

**Team Assignment:**
- Operations: Scheduling, amenities
- Tech Support: All tech issues, system problems
- Customer Service: Communication, pricing queries
- Trainers: Trainer feedback
- Maintenance: Repairs, HVAC, plumbing
- Security: Theft, safety concerns
- Management: Brand, strategic issues

Would you like me to:
1. Generate the complete SQL insert script for all 240+ subcategories?
2. Create a JSON file with the full data structure?
3. Build a migration script to seed the database?
4. Start implementing the actual React application?
