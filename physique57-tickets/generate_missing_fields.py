#!/usr/bin/env python3
"""
Generate missing field definitions for the 43 subcategories that don't have custom fields yet.
This will append the new field definitions to fields.csv
"""

import csv

# Define comprehensive field definitions for each missing subcategory
missing_fields = {
    # Class Experience (9 missing)
    "Class Quality": [
        ("CE-CQ-001", "Instructor Name", "Dropdown", "All trainers", "Which instructor taught the class", True),
        ("CE-CQ-002", "Class Type", "Dropdown", "All class types", "Which class format", True),
        ("CE-CQ-003", "Quality Issue Type", "Multi-select Checkbox", "Poor instruction | Unclear cues | Wrong technique demonstrated | Low energy | Music issues | Choreography problems | Rushed transitions | Other", "What aspects had quality issues", True),
        ("CE-CQ-004", "Specific Details", "Long Text", "", "Detailed description of quality issues", True),
        ("CE-CQ-005", "Client Satisfaction Level", "Dropdown", "Very Dissatisfied | Dissatisfied | Neutral | Satisfied | Very Satisfied", "How satisfied was the client", True),
        ("CE-CQ-006", "Would Client Recommend", "Radio Button", "Yes | No | Unsure", "Would they recommend this class", False),
    ],
    
    "Class Scheduling": [
        ("CE-CS-001", "Scheduling Issue Type", "Multi-select Checkbox", "Not enough classes | Timing conflicts | Classes full | Cancellations | Schedule changes | Holiday schedule unclear | Peak hour congestion | Other", "What scheduling issues occurred", True),
        ("CE-CS-002", "Preferred Time Slot", "Text", "", "What time would work better", False),
        ("CE-CS-003", "Class Type Affected", "Dropdown", "All class types | Multiple classes", "Which class types are affected", True),
        ("CE-CS-004", "Frequency of Issue", "Dropdown", "One-time | Weekly | Daily | Ongoing", "How often does this occur", True),
        ("CE-CS-005", "Impact on Client", "Dropdown", "Minor inconvenience | Unable to attend preferred classes | Considering canceling membership | Already reduced visits", "How this impacts the client", True),
    ],
    
    "Class Overcrowding": [
        ("CE-CO-001", "Class Type", "Dropdown", "All class types", "Which class was overcrowded", True),
        ("CE-CO-002", "Instructor Name", "Dropdown", "All trainers", "Who taught the class", True),
        ("CE-CO-003", "Number of Participants", "Number", "", "Approximate number of people", False),
        ("CE-CO-004", "Studio Capacity", "Number", "", "What should be the maximum", False),
        ("CE-CO-005", "Specific Issues", "Multi-select Checkbox", "Not enough space | Equipment shortage | Can't see instructor | Uncomfortable proximity | Can't move freely | Collisions with others | Other", "What problems did overcrowding cause", True),
        ("CE-CO-006", "Client Action", "Dropdown", "Completed class uncomfortably | Left class early | Unable to participate fully | Other", "How did client respond", True),
    ],
    
    "Class Level Appropriateness": [
        ("CE-LA-001", "Class Type", "Dropdown", "All class types", "Which class", True),
        ("CE-LA-002", "Issue Type", "Radio Button", "Too difficult/advanced | Too easy/basic | Mixed levels confusing | Unclear level description", "What was the mismatch", True),
        ("CE-LA-003", "Client Experience Level", "Dropdown", "Complete beginner | Beginner | Intermediate | Advanced | Expert", "Client's fitness level", True),
        ("CE-LA-004", "Modifications Offered", "Radio Button", "Yes - adequate | Yes - inadequate | No modifications offered", "Were modifications provided", True),
        ("CE-LA-005", "Suggested Solution", "Text", "", "What would make this better", False),
    ],
    
    "Class Variety": [
        ("CE-CV-001", "Current Concern", "Multi-select Checkbox", "Limited class formats | Repetitive routines | Same music repeatedly | Lack of new instructors | Need more advanced options | Need more beginner options | Want specialty formats | Other", "What variety is lacking", True),
        ("CE-CV-002", "Requested Format", "Text", "", "What new class format would you like", False),
        ("CE-CV-003", "Frequency Attending", "Dropdown", "1-2 times/week | 3-4 times/week | 5+ times/week | Daily", "How often client attends", False),
        ("CE-CV-004", "How Long Member", "Dropdown", "Less than 1 month | 1-3 months | 3-6 months | 6-12 months | 1+ years", "How long they've been a member", False),
    ],
    
    "Class Duration": [
        ("CE-CD-001", "Class Type", "Dropdown", "All class types", "Which class", True),
        ("CE-CD-002", "Duration Issue", "Radio Button", "Too short | Too long | Rushed transitions | Inadequate warm-up | Inadequate cool-down", "What's the duration problem", True),
        ("CE-CD-003", "Current Duration", "Number", "", "Current class length in minutes", False),
        ("CE-CD-004", "Preferred Duration", "Number", "", "Ideal length in minutes", False),
        ("CE-CD-005", "Specific Feedback", "Long Text", "", "Detailed feedback on pacing", True),
    ],
    
    "Class Pacing": [
        ("CE-CP-001", "Class Type", "Dropdown", "All class types", "Which class", True),
        ("CE-CP-002", "Instructor Name", "Dropdown", "All trainers", "Who taught the class", True),
        ("CE-CP-003", "Pacing Issue", "Multi-select Checkbox", "Too fast overall | Too slow overall | Insufficient rest periods | Transitions too rushed | Unbalanced muscle targeting | Not enough recovery time | Other", "What pacing problems occurred", True),
        ("CE-CP-004", "Client Fitness Level", "Dropdown", "Beginner | Intermediate | Advanced", "Client's fitness level", False),
        ("CE-CP-005", "Impact", "Dropdown", "Couldn't keep up | Got injured | Too easy/boring | Muscle fatigue/soreness | Other", "How did this affect the client", True),
    ],
    
    "Warm-up/Cool-down": [
        ("CE-WC-001", "Class Type", "Dropdown", "All class types", "Which class", True),
        ("CE-WC-002", "Instructor Name", "Dropdown", "All trainers", "Who taught the class", True),
        ("CE-WC-003", "Issue Type", "Radio Button", "No warm-up | Inadequate warm-up | No cool-down | Inadequate cool-down | Rushed stretching", "What was inadequate", True),
        ("CE-WC-004", "Physical Impact", "Text", "", "Did this cause injury or discomfort", False),
        ("CE-WC-005", "Specific Feedback", "Long Text", "", "What should be improved", True),
    ],
    
    # Instructor Related (6 missing)
    "Attention & Correction": [
        ("IR-AC-001", "Instructor Name", "Dropdown", "All trainers", "Which instructor", True),
        ("IR-AC-002", "Class Type", "Dropdown", "All class types", "Which class", True),
        ("IR-AC-003", "Issue Type", "Multi-select Checkbox", "No individual attention | No form corrections | Favoritism observed | Ignoring raised hands | Not checking on beginners | Only helping certain members | Other", "What attention issues occurred", True),
        ("IR-AC-004", "Client Attempted Contact", "Radio Button", "Yes - raised hand | Yes - approached after class | No - afraid to ask | Other", "Did client try to get attention", False),
        ("IR-AC-005", "Impact on Experience", "Dropdown", "Minor frustration | Poor workout form | Risk of injury | Felt ignored | Considering not returning", "How this affected client", True),
    ],
    
    "Communication": [
        ("IR-CM-001", "Instructor Name", "Dropdown", "All trainers", "Which instructor", True),
        ("IR-CM-002", "Communication Issue", "Multi-select Checkbox", "Rude behavior | Dismissive attitude | Condescending tone | Language barrier | Poor English fluency | Poor Hindi fluency | Unclear instructions | Other", "What communication problems occurred", True),
        ("IR-CM-003", "Specific Incident", "Long Text", "", "Describe what was said or done", True),
        ("IR-CM-004", "Witness Present", "Radio Button", "Yes | No", "Were there witnesses", False),
        ("IR-CM-005", "Client Emotional Response", "Dropdown", "Upset | Offended | Frustrated | Angry | Embarrassed | Other", "How client felt", True),
    ],
    
    "Instructor Cancellations": [
        ("IR-IC-001", "Instructor Name", "Dropdown", "All trainers", "Which instructor", True),
        ("IR-IC-002", "Class Type", "Dropdown", "All class types", "Which class was cancelled", True),
        ("IR-IC-003", "Notice Given", "Dropdown", "No notice | Less than 1 hour | 1-3 hours | 3-12 hours | 12-24 hours | More than 24 hours", "How much advance notice", True),
        ("IR-IC-004", "Frequency", "Dropdown", "First time | 2nd time | 3rd time | Frequent pattern", "How often does this instructor cancel", True),
        ("IR-IC-005", "Substitute Provided", "Radio Button", "Yes - good substitute | Yes - poor substitute | No substitute", "Was a replacement instructor offered", True),
        ("IR-IC-006", "Client Impact", "Multi-select Checkbox", "Wasted travel time | Disrupted schedule | Credits/payment issue | Disappointed | Other", "How this impacted the client", True),
    ],
    
    "Knowledge & Expertise": [
        ("IR-KE-001", "Instructor Name", "Dropdown", "All trainers", "Which instructor", True),
        ("IR-KE-002", "Knowledge Gap", "Multi-select Checkbox", "Limited anatomy knowledge | Can't answer technique questions | Incorrect form demonstration | Unsafe cues given | Can't modify for injuries | Inexperienced | Other", "What knowledge issues observed", True),
        ("IR-KE-003", "Specific Example", "Long Text", "", "Describe the incident", True),
        ("IR-KE-004", "Safety Concern", "Radio Button", "Yes | No", "Was there a safety risk", True),
        ("IR-KE-005", "Client Concern Level", "Dropdown", "Minor | Moderate | Serious | Very Serious", "How concerned is the client", True),
    ],
    
    "Personal Boundaries": [
        ("IR-PB-001", "Instructor Name", "Dropdown", "All trainers", "Which instructor", True),
        ("IR-PB-002", "Boundary Issue", "Multi-select Checkbox", "Physical adjustments without asking | Inappropriate touching | Overly personal questions | Unwanted physical contact | Making client uncomfortable | Other", "What boundary was crossed", True),
        ("IR-PB-003", "Incident Description", "Long Text", "", "Describe exactly what happened", True),
        ("IR-PB-004", "Client Gave Consent", "Radio Button", "Not asked | Asked and declined | Asked and agreed but uncomfortable | Other", "Was consent requested", True),
        ("IR-PB-005", "Witness Present", "Radio Button", "Yes | No", "Were others present", False),
        ("IR-PB-006", "Action Requested", "Dropdown", "Verbal warning | Written warning | Retraining required | Do not assign to me again | Other", "What action does client want", True),
    ],
    
    "Punctuality": [
        ("IR-PT-001", "Instructor Name", "Dropdown", "All trainers", "Which instructor", True),
        ("IR-PT-002", "Class Type", "Dropdown", "All class types", "Which class", True),
        ("IR-PT-003", "Punctuality Issue", "Radio Button", "Started late | Ended early | Both started late and ended early | Extended beyond scheduled time", "What was the issue", True),
        ("IR-PT-004", "Minutes Late/Early", "Number", "", "How many minutes", True),
        ("IR-PT-005", "Frequency", "Dropdown", "First time | Occasional | Frequent | Every class", "How often does this occur", True),
        ("IR-PT-006", "Impact", "Text", "", "How this affected clients", False),
    ],
    
    # Facility & Amenities (6 missing)
    "Changing Room Issues": [
        ("FA-CR-001", "Issue Type", "Multi-select Checkbox", "Cleanliness poor | Lockers broken | Insufficient space | No privacy | Missing amenities | Overcrowded | Maintenance needed | Other", "What changing room issues exist", True),
        ("FA-CR-002", "Specific Location", "Text", "", "Which changing room/area", True),
        ("FA-CR-003", "Time Observed", "Dropdown", "Morning | Afternoon | Evening | All day", "When was issue noticed", True),
        ("FA-CR-004", "Photographic Evidence", "Radio Button", "Yes - Attached | No", "Do you have photos", False),
        ("FA-CR-005", "Staff Notified", "Radio Button", "Yes | No", "Was staff informed", True),
    ],
    
    "Equipment Issues": [
        ("FA-EI-001", "Equipment Type", "Multi-select Checkbox", "Weights | Mats | Bands | Balls | Blocks | Barres | Bikes | Benches | Other", "Which equipment has issues", True),
        ("FA-EI-002", "Issue Type", "Multi-select Checkbox", "Broken/damaged | Insufficient quantity | Dirty/unhygienic | Worn out | Missing items | Unsafe | Other", "What's wrong with equipment", True),
        ("FA-EI-003", "Specific Details", "Long Text", "", "Describe the equipment issue", True),
        ("FA-EI-004", "Equipment Removed", "Radio Button", "Yes | No | Unknown", "Was it taken out of use", False),
        ("FA-EI-005", "Safety Risk", "Radio Button", "Yes | No", "Is this a safety concern", True),
    ],
    
    "Hygiene Supplies": [
        ("FA-HS-001", "Missing Items", "Multi-select Checkbox", "Hand wash/soap | Sanitizer | Tissues | Toilet paper | Paper towels | Feminine products | Other", "What supplies are missing", True),
        ("FA-HS-002", "Location", "Multi-select Checkbox", "Washroom | Changing room | Studio floor | Reception | All areas", "Where are supplies missing", True),
        ("FA-HS-003", "Frequency", "Dropdown", "One time | Occasional | Frequent | Always out", "How often are supplies missing", True),
        ("FA-HS-004", "Staff Notified", "Radio Button", "Yes | No", "Was staff informed", True),
    ],
    
    "Lighting & Ambiance": [
        ("FA-LA-001", "Issue Type", "Multi-select Checkbox", "Too bright | Too dim | Lights flickering | Bulbs out | Mirrors dirty/cracked | Sound system issues | No ambiance | Other", "What lighting/ambiance issues", True),
        ("FA-LA-002", "Area Affected", "Multi-select Checkbox", "Main studio | Second studio | Reception | Changing rooms | Washrooms | All areas", "Where is the issue", True),
        ("FA-LA-003", "Impact on Class", "Radio Button", "Couldn't see properly | Distracting | Uncomfortable | Migraine/headache | Other", "How did this affect experience", True),
        ("FA-LA-004", "Staff Aware", "Radio Button", "Yes | No | Unknown", "Does staff know", False),
    ],
    
    "Seating & Waiting Area": [
        ("FA-SW-001", "Issue Type", "Multi-select Checkbox", "Insufficient seating | Uncomfortable seats | Dirty/unclean | Too crowded | No privacy | Poor layout | Other", "What's the issue", True),
        ("FA-SW-002", "Time Noticed", "Dropdown", "Morning | Afternoon | Evening | All times", "When is this a problem", True),
        ("FA-SW-003", "Number of People Waiting", "Number", "", "Approximate number waiting", False),
        ("FA-SW-004", "Suggested Improvement", "Text", "", "What would make this better", False),
    ],
    
    "Storage & Lockers": [
        ("FA-SL-001", "Issue Type", "Multi-select Checkbox", "Insufficient lockers | Broken locks | Lockers too small | No charging points | Can't fit belongings | Locker assignment unclear | Other", "What locker issues exist", True),
        ("FA-SL-002", "Specific Locker Number", "Text", "", "Which locker (if applicable)", False),
        ("FA-SL-003", "Frequency", "Dropdown", "One-time issue | Occasional | Frequent | Always a problem", "How often does this occur", True),
        ("FA-SL-004", "Items Lost/Damaged", "Radio Button", "Yes | No", "Were belongings lost or damaged", True),
    ],
    
    # Membership & Billing (8 missing)
    "Billing Errors": [
        ("MB-BE-001", "Error Type", "Multi-select Checkbox", "Incorrect amount charged | Duplicate charge | Wrong package applied | GST calculation error | Unexpected charge | Other", "What billing error occurred", True),
        ("MB-BE-002", "Expected Amount", "Number", "", "What should have been charged (INR)", True),
        ("MB-BE-003", "Actual Amount", "Number", "", "What was actually charged (INR)", True),
        ("MB-BE-004", "Transaction Date", "Date", "", "When did transaction occur", True),
        ("MB-BE-005", "Invoice Number", "Text", "", "Invoice or receipt number", False),
        ("MB-BE-006", "Resolution Requested", "Radio Button", "Refund | Adjustment | Correction | Explanation", "What resolution is needed", True),
    ],
    
    "Contract Terms": [
        ("MB-CT-001", "Concern Type", "Multi-select Checkbox", "Unclear terms | Disagreement on clause | Lock-in period dispute | Cancellation terms unclear | Auto-renewal issue | Hidden charges | Other", "What contract issue exists", True),
        ("MB-CT-002", "Specific Clause", "Text", "", "Which contract term is unclear/disputed", True),
        ("MB-CT-003", "Contract Date", "Date", "", "When was contract signed", False),
        ("MB-CT-004", "What Client Understood", "Long Text", "", "What did client think the terms were", True),
        ("MB-CT-005", "Requested Action", "Dropdown", "Clarification | Amendment | Contract review | Cancellation | Other", "What does client want", True),
    ],
    
    "Credits/Class Pack": [
        ("MB-CP-001", "Issue Type", "Multi-select Checkbox", "Credits expired | Unused credits | Can't transfer credits | Credit balance incorrect | Pack terms unclear | Other", "What credit/pack issue", True),
        ("MB-CP-002", "Package Type", "Dropdown", "All package types", "Which package/pack", True),
        ("MB-CP-003", "Credits Remaining", "Number", "", "How many credits left", False),
        ("MB-CP-004", "Expiry Date", "Date", "", "When do/did credits expire", False),
        ("MB-CP-005", "Resolution Requested", "Dropdown", "Extension | Refund | Transfer | Freeze | Other", "What solution is needed", True),
    ],
    
    "Invoice/Receipt": [
        ("MB-IR-001", "Issue Type", "Multi-select Checkbox", "Missing invoice | Incorrect details on invoice | GST issues | Wrong amount | Delayed generation | Need duplicate | Other", "What invoice issue", True),
        ("MB-IR-002", "Transaction Date", "Date", "", "Date of transaction", True),
        ("MB-IR-003", "Amount", "Number", "", "Transaction amount (INR)", True),
        ("MB-IR-004", "What's Needed", "Radio Button", "Generate invoice | Correct existing | GST invoice | Duplicate copy | Other", "What is required", True),
        ("MB-IR-005", "Urgency", "Dropdown", "Urgent - tax filing | Urgent - reimbursement | Routine request", "How urgent", False),
    ],
    
    "Membership Cancellation": [
        ("MB-MC-001", "Cancellation Reason", "Dropdown", "Relocating | Financial reasons | Health issues | Switching studios | Service dissatisfaction | Other", "Why cancelling", True),
        ("MB-MC-002", "Difficulty Type", "Multi-select Checkbox", "Can't find cancellation option | Process too complex | Not allowed to cancel | Penalty too high | Refund refused | No response to request | Other", "What's making cancellation difficult", True),
        ("MB-MC-003", "Membership Type", "Dropdown", "All package types", "Current membership", True),
        ("MB-MC-004", "Requested Cancellation Date", "Date", "", "When should membership end", True),
        ("MB-MC-005", "Refund Expected", "Radio Button", "Yes | No | Unsure", "Expecting a refund", False),
        ("MB-MC-006", "Resolution Sought", "Dropdown", "Cancel immediately | Cancel at period end | Partial refund | Full refund | Other", "What outcome is wanted", True),
    ],
    
    "Membership Freeze": [
        ("MB-MF-001", "Freeze Reason", "Dropdown", "Medical/health | Travel | Pregnancy | Temporary relocation | Financial | Other", "Why freeze membership", True),
        ("MB-MF-002", "Freeze Duration Requested", "Dropdown", "1 month | 2 months | 3 months | Longer", "How long to freeze", True),
        ("MB-MF-003", "Issue Type", "Multi-select Checkbox", "Request denied | Process too complicated | Charges during freeze | Can't unfreeze | Freeze terms unclear | Other", "What freeze issue occurred", True),
        ("MB-MF-004", "Current Status", "Radio Button", "Freeze not yet processed | Freeze denied | Freeze active but issues | Other", "Current freeze status", True),
        ("MB-MF-005", "Supporting Documentation", "Radio Button", "Yes - attached | No | Not required", "Do you have supporting docs", False),
    ],
    
    "Package/Plan Confusion": [
        ("MB-PC-001", "Confusion Type", "Multi-select Checkbox", "Unclear package terms | Misleading information | Hidden charges | Validity confusion | Usage limits unclear | Multi-studio access unclear | Other", "What's confusing", True),
        ("MB-PC-002", "Package Name", "Dropdown", "All package types", "Which package", True),
        ("MB-PC-003", "What Client Understood", "Long Text", "", "What did client think package included", True),
        ("MB-PC-004", "Actual Terms", "Long Text", "", "What are the actual terms (if known)", False),
        ("MB-PC-005", "Where Information From", "Dropdown", "Sales rep | Website | Email | Phone call | Social media | Other", "Where did client get info", True),
    ],
    
    "Promotional Offers": [
        ("MB-PO-001", "Offer Type", "Text", "", "Which promotion/offer", True),
        ("MB-PO-002", "Issue Type", "Multi-select Checkbox", "Not honored | Misleading terms | Eligibility dispute | Promo code not working | Discount not applied | Other", "What offer issue occurred", True),
        ("MB-PO-003", "Offer Source", "Dropdown", "Email | SMS | Social media | Website | Sales rep | Referral | Other", "Where did client see offer", True),
        ("MB-PO-004", "Promo Code", "Text", "", "Promo code used (if applicable)", False),
        ("MB-PO-005", "Expected Benefit", "Text", "", "What discount/benefit was expected", True),
        ("MB-PO-006", "What Actually Happened", "Long Text", "", "What occurred instead", True),
    ],
    
    # Booking & Technology (4 missing)
    "Class Check-in": [
        ("BT-CI-001", "Check-in Issue", "Multi-select Checkbox", "QR code not scanning | Manual check-in delays | Attendance not recorded | System error | Staff unavailable to help | Other", "What check-in problem occurred", True),
        ("BT-CI-002", "Class Type", "Dropdown", "All class types", "Which class", True),
        ("BT-CI-003", "Check-in Method Attempted", "Radio Button", "QR code | Manual at desk | App check-in | Other", "How did client try to check in", True),
        ("BT-CI-004", "Result", "Dropdown", "Eventually checked in | Not checked in | Charged for no-show | Other", "What was the outcome", True),
    ],
    
    "Class Visibility": [
        ("BT-CV-001", "Visibility Issue", "Multi-select Checkbox", "Favorite instructors not showing | Schedule not updating | Wrong studio displayed | Classes missing | Filters not working | Other", "What visibility problem exists", True),
        ("BT-CV-002", "Platform", "Dropdown", "iOS App | Android App | Website - Desktop | Website - Mobile", "Where is the issue", True),
        ("BT-CV-003", "Specific Example", "Text", "", "What specifically can't you see", True),
        ("BT-CV-004", "Workaround Found", "Radio Button", "Yes | No", "Did you find another way", False),
    ],
    
    "Notifications": [
        ("BT-NT-001", "Notification Issue", "Multi-select Checkbox", "Missing class reminders | No cancellation alerts | Spam notifications | Too many notifications | Wrong notification content | Notification timing wrong | Other", "What notification problem", True),
        ("BT-NT-002", "Notification Type", "Multi-select Checkbox", "Class reminders | Cancellations | Booking confirmations | Promotional | Waitlist | Other", "Which notifications affected", True),
        ("BT-NT-003", "Platform", "Dropdown", "Push notifications | Email | SMS | All", "Which notification method", True),
        ("BT-NT-004", "Client Preference", "Radio Button", "Want more notifications | Want fewer | Want different content | Want better timing", "What change is wanted", True),
    ],
    
    "Profile Management": [
        ("BT-PM-001", "Profile Issue", "Multi-select Checkbox", "Can't update details | Incorrect information displayed | Photo upload issues | Email change problems | Phone number issues | Password reset problems | Other", "What profile issue exists", True),
        ("BT-PM-002", "Specific Field", "Text", "", "Which profile field has issues", True),
        ("BT-PM-003", "Error Message", "Text", "", "Any error message shown", False),
        ("BT-PM-004", "Platform", "Dropdown", "iOS App | Android App | Website - Desktop | Website - Mobile", "Where is the issue", True),
    ],
    
    # Customer Service (4 missing)
    "Complaint Handling": [
        ("CS-CH-001", "Complaint About", "Text", "", "Original complaint topic", True),
        ("CS-CH-002", "Handling Issue", "Multi-select Checkbox", "Dismissive attitude | Defensive response | No escalation option | Not taken seriously | Blamed customer | No follow-up | Other", "How was complaint mishandled", True),
        ("CS-CH-003", "Who Handled", "Text", "", "Staff member who handled complaint", False),
        ("CS-CH-004", "Date of Original Complaint", "Date", "", "When was complaint first made", True),
        ("CS-CH-005", "Resolution Status", "Dropdown", "Unresolved | Partially resolved | Unsatisfactory resolution | Ignored | Other", "Current status", True),
    ],
    
    "Email/Chat Support": [
        ("CS-EC-001", "Support Issue", "Multi-select Checkbox", "Slow response | Generic replies | Issue unresolved | Multiple follow-ups needed | Transferred repeatedly | No response | Other", "What support issue occurred", True),
        ("CS-EC-002", "Channel Used", "Radio Button", "Email | WhatsApp | Chat on website | Other", "How did you contact support", True),
        ("CS-EC-003", "Original Query Date", "Date", "", "When did you first contact support", True),
        ("CS-EC-004", "Response Time", "Dropdown", "No response yet | Hours | 1 day | 2-3 days | More than 3 days", "How long to get response", True),
        ("CS-EC-005", "Number of Followups", "Number", "", "How many times did you follow up", False),
    ],
    
    "Newcomer Experience": [
        ("CS-NE-001", "Newcomer Type", "Dropdown", "First-time visitor | Trial class | New member", "Client status", True),
        ("CS-NE-002", "Issue Type", "Multi-select Checkbox", "Poor onboarding | No orientation | Lack of guidance | Not welcomed | Felt lost/confused | Too rushed | No studio tour | Other", "What newcomer issues occurred", True),
        ("CS-NE-003", "Who Interacted", "Text", "", "Staff members who helped (or didn't)", False),
        ("CS-NE-004", "Impact on Experience", "Dropdown", "Very negative | Somewhat negative | Neutral | Positive overall despite issue", "How this affected first impression", True),
        ("CS-NE-005", "Likelihood to Return", "Dropdown", "Will not return | Unsure | Will return despite issue | Will return", "Will they come back", True),
    ],
    
    "Staff Professionalism": [
        ("CS-SP-001", "Unprofessional Behavior", "Multi-select Checkbox", "Gossiping | Using personal phone | Eating at desk | Inappropriate conversations | Ignoring clients | Dress code violation | Other", "What unprofessional behavior observed", True),
        ("CS-SP-002", "Staff Member", "Text", "", "Which staff member (if known)", False),
        ("CS-SP-003", "Location", "Dropdown", "Reception | Front desk | Studio floor | Changing room | Other", "Where did this occur", True),
        ("CS-SP-004", "Frequency", "Dropdown", "One-time | Occasional | Frequent | Consistent pattern", "How often is this happening", True),
        ("CS-SP-005", "Impact", "Dropdown", "Minor annoyance | Unprofessional atmosphere | Felt ignored | Other", "How this affected client", True),
    ],
    
    # Sales & Marketing (2 missing)
    "Events & Workshops": [
        ("SM-EW-001", "Event Name", "Text", "", "Which event or workshop", True),
        ("SM-EW-002", "Event Date", "Date", "", "When was/is the event", True),
        ("SM-EW-003", "Issue Type", "Multi-select Checkbox", "Poor organization | Event cancelled | Misleading event details | Registration issues | Quality didn't match promise | Other", "What event issue occurred", True),
        ("SM-EW-004", "Specific Details", "Long Text", "", "Describe what went wrong", True),
        ("SM-EW-005", "Event Fee Paid", "Number", "", "Amount paid (if applicable)", False),
        ("SM-EW-006", "Refund Requested", "Radio Button", "Yes | No", "Requesting a refund", False),
    ],
    
    "Guest Passes/Referrals": [
        ("SM-GR-001", "Issue Type", "Multi-select Checkbox", "Guest pass issues | Referral benefit not credited | Restrictions not mentioned | Can't use pass | Pass expired | Referral code not working | Other", "What guest/referral issue", True),
        ("SM-GR-002", "Pass/Referral Code", "Text", "", "Guest pass number or referral code", False),
        ("SM-GR-003", "When Obtained", "Date", "", "When was pass/referral given", False),
        ("SM-GR-004", "Expected Benefit", "Text", "", "What benefit was promised", True),
        ("SM-GR-005", "What Happened", "Long Text", "", "What actually occurred", True),
    ],
    
    # Community & Culture (1 missing)
    "Community Events": [
        ("CC-CE-001", "Event Name", "Text", "", "Which community event", True),
        ("CC-CE-002", "Event Date", "Date", "", "When was the event", True),
        ("CC-CE-003", "Issue Type", "Multi-select Checkbox", "Poor organization | Low attendance | Lack of engagement | Event cancelled | Doesn't foster community | Too infrequent | Other", "What event issue occurred", True),
        ("CC-CE-004", "Attendance", "Number", "", "How many people attended", False),
        ("CC-CE-005", "Feedback", "Long Text", "", "What could be improved", True),
    ],
    
    # Retail & Merchandise (1 missing)
    "Staff Knowledge": [
        ("RM-SK-001", "Issue Type", "Multi-select Checkbox", "Product features unknown | Sizing info wrong | Pricing unclear | Availability info incorrect | Wrong recommendations | Can't answer questions | Other", "What knowledge gap exists", True),
        ("RM-SK-002", "Product", "Text", "", "Which product were you asking about", True),
        ("RM-SK-003", "Staff Member", "Text", "", "Who provided information", False),
        ("RM-SK-004", "Impact", "Dropdown", "Minor inconvenience | Wrong purchase made | Delayed purchase | Lost sale | Other", "How did this affect client", True),
    ],
    
    # Special Programs (1 missing)
    "Special Needs Programs": [
        ("SP-SN-001", "Program Type", "Multi-select Checkbox", "Prenatal | Postnatal | Seniors | Injury recovery | Adaptive fitness | Other special needs", "Which special needs program", True),
        ("SP-SN-002", "Issue Type", "Multi-select Checkbox", "Program not offered | Limited availability | Inadequate modifications | Instructor not trained | Unsafe practices | Not accommodating enough | Other", "What is the issue", True),
        ("SP-SN-003", "Specific Need", "Long Text", "", "What accommodation is needed", True),
        ("SP-SN-004", "Modification Requested", "Long Text", "", "What modification was needed", False),
        ("SP-SN-005", "Safety Concern", "Radio Button", "Yes | No", "Is there a safety issue", True),
        ("SP-SN-006", "Program Demand", "Dropdown", "Single request | Occasional requests | Frequent requests | High demand", "How often is this requested", False),
    ],
    
    # Miscellaneous (1 missing)
    "Guest Experience": [
        ("MS-GE-001", "Guest Type", "Dropdown", "Hosted class guest | Trial visitor | Drop-in | Brought by member | Corporate guest | Other", "Type of guest", True),
        ("MS-GE-002", "Issue Type", "Multi-select Checkbox", "Poor treatment | Complicated check-in | Unclear policies | Felt unwelcome | Different pricing than expected | Not given orientation | Other", "What guest issue occurred", True),
        ("MS-GE-003", "Hosting Member", "Text", "", "Name of member who brought guest (if applicable)", False),
        ("MS-GE-004", "Staff Involved", "Text", "", "Who interacted with guest", False),
        ("MS-GE-005", "Guest Feedback", "Long Text", "", "What did the guest say", True),
        ("MS-GE-006", "Conversion Likelihood", "Dropdown", "Will join | Considering | Unlikely | Definitely not", "Will guest become member", True),
    ],
}

# Read existing fields.csv
existing_fields = []
with open('public/fields.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f, delimiter='\t')
    fieldnames = reader.fieldnames
    for row in reader:
        existing_fields.append(row)

# Append new fields
new_rows = []
for subcategory, fields in missing_fields.items():
    # Get category from existing data
    category = None
    for row in existing_fields:
        if row.get('Sub Category') == subcategory:
            category = row.get('Category')
            break
    
    # Try to match from the mapping
    category_map = {
        "Class Quality": "Class Experience",
        "Class Scheduling": "Class Experience",
        "Class Overcrowding": "Class Experience",
        "Class Level Appropriateness": "Class Experience",
        "Class Variety": "Class Experience",
        "Class Duration": "Class Experience",
        "Class Pacing": "Class Experience",
        "Warm-up/Cool-down": "Class Experience",
        "Attention & Correction": "Instructor Related",
        "Communication": "Instructor Related",
        "Instructor Cancellations": "Instructor Related",
        "Knowledge & Expertise": "Instructor Related",
        "Personal Boundaries": "Instructor Related",
        "Punctuality": "Instructor Related",
        "Changing Room Issues": "Facility & Amenities",
        "Equipment Issues": "Facility & Amenities",
        "Hygiene Supplies": "Facility & Amenities",
        "Lighting & Ambiance": "Facility & Amenities",
        "Seating & Waiting Area": "Facility & Amenities",
        "Storage & Lockers": "Facility & Amenities",
        "Billing Errors": "Membership & Billing",
        "Contract Terms": "Membership & Billing",
        "Credits/Class Pack": "Membership & Billing",
        "Invoice/Receipt": "Membership & Billing",
        "Membership Cancellation": "Membership & Billing",
        "Membership Freeze": "Membership & Billing",
        "Package/Plan Confusion": "Membership & Billing",
        "Promotional Offers": "Membership & Billing",
        "Class Check-in": "Booking & Technology",
        "Class Visibility": "Booking & Technology",
        "Notifications": "Booking & Technology",
        "Profile Management": "Booking & Technology",
        "Complaint Handling": "Customer Service",
        "Email/Chat Support": "Customer Service",
        "Newcomer Experience": "Customer Service",
        "Staff Professionalism": "Customer Service",
        "Events & Workshops": "Sales & Marketing",
        "Guest Passes/Referrals": "Sales & Marketing",
        "Community Events": "Community & Culture",
        "Staff Knowledge": "Retail & Merchandise",
        "Special Needs Programs": "Special Programs",
        "Guest Experience": "Miscellaneous",
    }
    
    category = category_map.get(subcategory, "")
    
    for field_id, label, field_type, options, description, is_required in fields:
        new_row = {
            'Label': label,
            'Field Type': field_type,
            'Options/Other Details': options,
            'Sub Category': subcategory,
            'Category': category,
            'Unique ID': field_id,
            'Description': description,
            'Is Required': 'Yes' if is_required else 'No',
            'Is Hidden': 'No'
        }
        new_rows.append(new_row)

# Write updated fields.csv
with open('public/fields_updated.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames, delimiter='\t')
    writer.writeheader()
    writer.writerows(existing_fields)
    writer.writerows(new_rows)

print(f"✅ Added {len(new_rows)} new field definitions for {len(missing_fields)} subcategories")
print(f"✅ Output saved to: public/fields_updated.csv")
print(f"\nNext steps:")
print(f"1. Review the new file: public/fields_updated.csv")
print(f"2. If satisfied, replace fields.csv: mv public/fields_updated.csv public/fields.csv")
print(f"3. Regenerate SQL: python3 complete_field_mapping.py")
