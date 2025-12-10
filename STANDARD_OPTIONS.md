# Standard Options Reference

## Quick Copy-Paste for Form Field Options

### Studio Locations
```json
["Kwality House Kemps Corner", "Kenkre House", "South United Football Club", "Supreme HQ Bandra", "WeWork Prestige Central", "WeWork Galaxy", "The Studio by Copper + Cloves", "Pop-up"]
```

### Trainers (All 30)
```json
["Anisha Shah", "Atulan Purohit", "Karanvir Bhatia", "Mrigakshi Jaiswal", "Reshma Sharma", "Karan Bhatia", "Pushyank Nahar", "Shruti Kulkarni", "Janhavi Jain", "Rohan Dahima", "Kajol Kanchan", "Vivaran Dhasmana", "Upasna Paranjpe", "Richard D'Costa", "Pranjali Jain", "Saniya Jaiswal", "Shruti Suresh", "Cauveri Vikrant", "Poojitha Bhaskar", "Nishanth Raj", "Siddhartha Kusuma", "Simonelle De Vitre", "Kabir Varma", "Simran Dutt", "Veena Narasimhan", "Anmol Sharma", "Bret Saldanha", "Raunak Khemuka", "Chaitanya Nahar", "Sovena Shetty"]
```

### Class Types (All 24)
```json
["Studio Barre 57", "Studio Foundations", "Studio Barre 57 Express", "Studio Cardio Barre", "Studio FIT", "Studio Mat 57", "Studio SWEAT In 30", "Studio Amped Up!", "Studio Back Body Blaze", "Studio Cardio Barre Plus", "Studio Cardio Barre Express", "Studio HIIT", "Studio Back Body Blaze Express", "Studio Recovery", "Studio Hosted Class", "Studio Trainer's Choice", "Studio Pre/Post Natal", "Studio Mat 57 Express", "Studio PowerCycle Express", "Studio PowerCycle", "Studio Strength Lab (Pull)", "Studio Strength Lab (Full Body)", "Studio Strength Lab (Push)", "Studio Strength Lab"]
```

### Membership Packages
```json
["Barre 1 month Unlimited", "Studio 2 Week Unlimited", "Studio Single Class", "Session", "Private Class", "Studio 8 Class Package", "Studio 10 Class Package", "Money Credits", "Studio Private Class", "Retail", "Studio 4 Class Package", "Studio 1 Month Unlimited", "Studio 3 Month Unlimited", "Studio Annual Unlimited", "Studio Newcomers 2 For 1", "Studio 12 Class Package", "Studio 10 Single Class Package", "Studio 30 Single Class Package", "Studio 20 Single Class Package", "Barre 6 month Unlimited", "Studio 6 Month Unlimited", "Barre 2 week Unlimited", "Studio 3 Month Unlimited - Monthly", "Gift Card", "Newcomer 8 Class Package", "Studio 6 Week Unlimited"]
```

### Product Categories
```json
["Memberships", "Sessions/Single Classes", "Privates", "Class Packages", "Credits", "Retail", "Gift Cards", "Others"]
```

### Associates/Staff
```json
["Akshay Rane", "Vahishta Fitter", "Zaheer Agarbattiwala", "Zahur Shaikh", "Nadiya Shaikh", "Admin Admin", "Shipra Bhika", "Imran Shaikh", "Tahira Sayyed", "Manisha Rathod", "Sheetal Kataria", "Priyanka Abnave", "Api Serou", "Prathap Kp", "Pavanthika", "Santhosh Kumar"]
```

### Priority Levels
```json
["Low (log only)", "Medium (48hrs)", "High (24hrs)", "Critical (immediate)"]
```

### Client Status
```json
["Existing Active", "Existing Inactive", "New Prospect", "Trial Client", "Guest (Hosted Class)"]
```

### Issue Categories
```json
["Equipment/Facilities", "Class Experience", "Instructor Performance", "Billing/Payments", "Scheduling/Booking", "Customer Service", "Safety Concern", "Partnership/Collaboration", "Other"]
```

### Department Routing
```json
["Operations", "Facilities", "Training", "Sales", "Client Success", "Marketing", "Finance", "Management"]
```

### Time Slots
```json
["Morning", "Afternoon", "Evening"]
```

### Class Levels
```json
["Beginner", "Intermediate", "Advanced"]
```

### Yes/No Questions
```json
["Yes", "No"]
```

### Satisfaction Levels
```json
["Yes", "No", "Needs Follow-up"]
```

### Accommodation Status
```json
["Yes", "No", "Added to Waitlist"]
```

## Usage in SQL

When creating subcategories, use these as dropdown options:

```sql
{
  "id": "trainer_name",
  "label": "Which trainer?",
  "type": "dropdown",
  "required": true,
  "options": ["Anisha Shah", "Atulan Purohit", "Karanvir Bhatia", ...]
}
```

## Tips for Adding New Subcategories

1. **Use dropdowns for predefined lists** (trainers, locations, classes)
2. **Use dropdowns for Yes/No** questions
3. **Use dropdowns for satisfaction** levels
4. **Use textarea only for** "Additional comments" fields
5. **Keep field IDs** snake_case and descriptive
6. **Mark required fields** appropriately
7. **Add placeholder text** for clarity

## Field Type Guidelines

| Data Type | Use Dropdown When | Use Text When |
|-----------|------------------|---------------|
| Person names | Staff/Trainers | Client names |
| Locations | Studio locations | Street addresses |
| Classes | Class types | Class feedback |
| Yes/No | Always | Never |
| Reasons | Pre-defined list | Custom explanation |
| Dates | Never (use datetime) | - |
| Numbers | Limited range | Open amounts |
| Comments | Never | Always (textarea) |

## Example: Good vs Bad Fields

### ❌ Bad (Text Field)
```json
{
  "id": "trainer",
  "label": "Trainer name",
  "type": "text",
  "required": true
}
```
**Problem:** Users type "anisha", "Anisha", "ANISHA SHAH" - inconsistent data!

### ✅ Good (Dropdown)
```json
{
  "id": "trainer_name",
  "label": "Which trainer did the client request?",
  "type": "dropdown",
  "required": true,
  "options": ["Anisha Shah", "Atulan Purohit", ...]
}
```
**Benefit:** Consistent, analyzable, reportable data!
