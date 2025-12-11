# Field Mapping Report

Generated: {"timestamp": "now"}

## Summary

- Total Categories: 9
- Total Subcategories: 61
- Subcategories with Fields: 62
- Global Fields: 18
- Total Mapped Fields: 936

## Categories & Subcategories

### Booking & Technology
- ✓ App/Website Issues (15 fields)
- ✓ Booking Failures (16 fields)
- ✓ Cancellation Problems (19 fields)
- ✓ Class Check-in (17 fields)
- ✓ Class Visibility (14 fields)
- ✓ Notifications (14 fields)
- ✓ Payment Gateway (22 fields)
- ✓ Profile Management (10 fields)
- ✓ Technical Support (15 fields)
- ✓ Waitlist Issues (17 fields)

### Community & Culture
- ✓ Clique Behavior (8 fields)
- ✓ Community Events (9 fields)
- ✓ Discrimination (10 fields)
- ✓ Inclusivity Issues (8 fields)
- ✓ Member Behavior (11 fields)
- ✓ Studio Culture (8 fields)

### Customer Service
- ✓ Communication Quality (16 fields)
- ✓ Complaint Handling (18 fields)
- ✓ Email/Chat Support (16 fields)
- ✓ Front Desk Service (16 fields)
- ✓ Issue Resolution (18 fields)
- ✓ Newcomer Experience (20 fields)
- ✓ Phone Support (15 fields)
- ✓ Response Time (12 fields)
- ✓ Staff Availability (16 fields)
- ✓ Staff Knowledge (15 fields)
- ✓ Staff Professionalism (14 fields)

### Global
- ✗ Global (0 fields)
- ✓ N/A (17 fields)

### Health & Safety
- ✓ Air Quality (33 fields)
- ✓ COVID/Health Protocols (25 fields)
- ✓ Emergency Preparedness (23 fields)
- ✓ Equipment Safety (21 fields)
- ✓ Hygiene Protocols (26 fields)
- ✓ Injury During Class (51 fields)
- ✓ Medical Disclosure (30 fields)

### Miscellaneous
- ✓ Feedback System (13 fields)
- ✓ Guest Experience (10 fields)
- ✓ Lost & Found (11 fields)
- ✓ Multi-location Issues (11 fields)
- ✓ Noise Disturbance (10 fields)
- ✓ Nutrition/Wellness Advice (7 fields)
- ✓ Policy Changes (10 fields)

### Retail & Merchandise
- ✓ Pricing (9 fields)
- ✓ Product Availability (9 fields)
- ✓ Product Quality (3 fields)
- ✓ Return/Exchange (12 fields)
- ✓ Staff Knowledge (8 fields)

### Sales & Marketing
- ✓ Aggressive Selling (19 fields)
- ✓ Brand Communication (14 fields)
- ✓ Communication Overload (13 fields)
- ✓ Events & Workshops (23 fields)
- ✓ Guest Passes/Referrals (21 fields)
- ✓ Misleading Information (19 fields)
- ✓ Social Media (17 fields)
- ✓ Trial Class Experience (20 fields)

### Special Programs
- ✓ Challenges & Competitions (11 fields)
- ✓ Corporate Programs (12 fields)
- ✓ Private Sessions (13 fields)
- ✓ Special Needs Programs (11 fields)
- ✓ Workshop Quality (11 fields)

## Global Fields

These fields appear in all tickets:

- **Ticket ID** (`ticketId`) - readonly [Required]
  - Unique identifier for each ticket
- **Date & Time Reported** (`dateAndTimeReported`) - datetime [Required]
  - When the issue was reported to staff
- **Date & Time of Incident** (`dateAndTimeOfIncident`) - datetime [Required]
  - When the issue actually occurred
- **Location** (`location`) - dropdown [Required]
  - Studio location where issue occurred
- **Reported By (Staff)** (`reportedByStaff`) - dropdown [Required]
  - Staff member logging the ticket
- **Client Name** (`clientName`) - text [Required]
  - Name of the client reporting issue
- **Client Email** (`clientEmail`) - email
  - Client's email address
- **Client Phone** (`clientPhone`) - tel
  - Client's contact number
- **Client Status** (`clientStatus`) - dropdown [Required]
  - Client's membership status
- **Priority** (`priority`) - dropdown [Required]
  - Urgency level of the issue
- **Department Routing** (`departmentRouting`) - dropdown [Required]
  - Which department should handle this
- **Issue Description** (`issueDescription`) - textarea [Required]
  - Detailed description of the issue
- **Action Taken Immediately** (`actionTakenImmediately`) - textarea
  - What was done on the spot
- **Client Mood/Sentiment** (`clientMoodSentiment`) - dropdown
  - Client's emotional state
- **Follow-up Required** (`followUpRequired`) - checkbox [Required]
  - Does this need additional follow-up
- **Attachments** (`attachments`) - file
  - Supporting documentation
- **Assigned To** (`assignedTo`) - dropdown
  - Associate assigned to resolve
- **Status** (`status`) - dropdown [Required]
  - Current ticket status

## Detailed Field Mappings

###  ()

**3 fields:**

- **Eventually Connecte** (``)
  - Type: `text`
  - Required: No
  - Description: 

- **Observed During** (``)
  - Type: `dropdown`
  - Required: No
  - Description: 
  - Options: Before Class, During Class

- **Client** (``)
  - Type: `text`
  - Required: No
  - Description: 

### Nutrition ()

**1 fields:**

- **Product Being Sold** (``)
  - Type: `text`
  - Required: No
  - Description: 

### App/Website Issues (Booking & Technology)

**15 fields:**

- **Issue Type** (`BT-APP-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Specific type of technical issue
  - Options: App Crash, Slow Loading, Login Problems, Feature Not Working, UI/UX Confusion ... (6 total)

- **Platform** (`BT-APP-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Which platform had the issue
  - Options: iOS App, Android App, Website (Desktop), Website (Mobile)

- **Device/Browser** (`BT-APP-003`)
  - Type: `text`
  - Required: No
  - Description: Device model or browser used

- **Error Message** (`BT-APP-005`)
  - Type: `text`
  - Required: No
  - Description: Exact error message shown

- **Steps to Reproduce** (`BT-APP-006`)
  - Type: `textarea`
  - Required: Yes
  - Description: What the client was trying to do

- **Screenshot Available** (`BT-APP-007`)
  - Type: `checkbox`
  - Required: No
  - Description: Did client provide screenshot

- **Workaround Provided** (`BT-APP-008`)
  - Type: `textarea`
  - Required: No
  - Description: Alternative solution offered

- **Issue Type** (`BT-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Specific technical problem encountered
  - Options: App Crash, Slow Loading, Login Failed, Feature Not Working, UI Display Error ... (7 total)

- **Platform** (`BT-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Where the issue occurred
  - Options: iOS App, Android App, Website (Desktop), Website (Mobile)

- **Device/Browser** (`BT-003`)
  - Type: `text`
  - Required: No
  - Description: Device or browser being used

- **App Version** (`BT-004`)
  - Type: `text`
  - Required: No
  - Description: Current app version

- **Error Message** (`BT-005`)
  - Type: `text`
  - Required: No
  - Description: Any error text shown to user

- **Steps to Reproduce** (`BT-006`)
  - Type: `textarea`
  - Required: Yes
  - Description: How to recreate the issue

- **Workaround Provided** (`BT-007`)
  - Type: `text`
  - Required: No
  - Description: How issue was temporarily resolved

- **Client Able to Complete Action** (`BT-008`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether client completed intended task
  - Options: Yes, No

### Booking Failures (Booking & Technology)

**16 fields:**

- **Class Attempted** (`BT-BOOK-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Which class they tried to book

- **Instructor** (`BT-BOOK-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Instructor for the class

- **Class Date & Time** (`BT-BOOK-003`)
  - Type: `datetime`
  - Required: Yes
  - Description: When was the class

- **Failure Type** (`BT-BOOK-004`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Nature of booking failure
  - Options: Unable to Book, Booking Not Confirmed, Double Booking, Booking Disappeared, Other

- **Credits/Package Used** (`BT-BOOK-005`)
  - Type: `dropdown`
  - Required: No
  - Description: What package client tried to use

- **Credits Deducted** (`BT-BOOK-006`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Were credits charged despite failure
  - Options: Yes, No, Unknown

- **Booking Confirmation Received** (`BT-BOOK-007`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Did they get confirmation email/notification
  - Options: Yes, No, Partial

- **Manually Resolved** (`BT-BOOK-008`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How was it resolved on the spot
  - Options: Yes - Added to Class, Yes - Credits Refunded, No - Still Pending

- **Booking Failure Type** (`BT-009`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of booking failure
  - Options: Cannot Select Class, Booking Not Confirmed, Double Booking Occurred, Booking Disappeared, Wrong Class Booked ... (6 total)

- **Class Attempted** (`BT-010`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Which class client tried to book
  - Options: Studio Barre 57, Studio Foundations, Studio Barre 57 Express, Studio Cardio Barre, Studio FIT ... (24 total)

- **Class Date & Time** (`BT-011`)
  - Type: `datetime`
  - Required: Yes
  - Description: Scheduled class date/time

- **Trainer** (`BT-012`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Instructor for the class
  - Options: Anisha Shah, Atulan Purohit, Karanvir Bhatia, Mrigakshi Jaiswal, Reshma Sharma ... (30 total)

- **Client Package Type** (`BT-013`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Client's current membership/package
  - Options: Barre 1 month Unlimited, Studio 2 Week Unlimited, Studio Single Class, Session, Private Class ... (26 total)

- **Classes Remaining** (`BT-014`)
  - Type: `number`
  - Required: Yes
  - Description: Available class credits

- **Booking Manually Completed** (`BT-015`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether staff manually booked client
  - Options: Yes, No

- **System Error Code** (`BT-016`)
  - Type: `text`
  - Required: No
  - Description: Technical error reference

### Cancellation Problems (Booking & Technology)

**19 fields:**

- **Class to Cancel** (`BT-CANC-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Which class they tried to cancel

- **Instructor** (`BT-CANC-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Instructor name

- **Class Date & Time** (`BT-CANC-003`)
  - Type: `datetime`
  - Required: Yes
  - Description: Scheduled class time

- **Cancellation Attempt Time** (`BT-CANC-004`)
  - Type: `datetime`
  - Required: Yes
  - Description: When they tried to cancel

- **Hours Before Class** (`BT-CANC-005`)
  - Type: `number`
  - Required: Yes
  - Description: Time gap between cancellation attempt and class

- **Issue Type** (`BT-CANC-006`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of cancellation issue
  - Options: Unable to Cancel via App, Late Cancellation Fee Charged, Cancellation Window Unclear, Credits Not Returned, Other

- **Fee Charged** (`BT-CANC-007`)
  - Type: `number`
  - Required: No
  - Description: If late fee was charged

- **Credits Returned** (`BT-CANC-008`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Were credits/classes restored
  - Options: Yes, No, Partial, Unknown

- **Manual Cancellation Done** (`BT-CANC-009`)
  - Type: `checkbox`
  - Required: Yes
  - Description: Did staff cancel manually

- **Cancellation Issue Type** (`BT-026`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of cancellation issue
  - Options: Cannot Cancel in App, Late Cancel Charge Disputed, Cancel Window Confusion, Cancellation Not Processed, Wrong Class Cancelled ... (7 total)

- **Class Details** (`BT-027`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Class to be cancelled
  - Options: Studio Barre 57, Studio Foundations, Studio Barre 57 Express, Studio Cardio Barre, Studio FIT ... (24 total)

- **Class Date & Time** (`BT-028`)
  - Type: `datetime`
  - Required: Yes
  - Description: Scheduled class date/time

- **Cancellation Attempted When** (`BT-029`)
  - Type: `datetime`
  - Required: Yes
  - Description: Timestamp of cancellation attempt

- **Late Cancel Fee Applied** (`BT-031`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether penalty was charged
  - Options: Yes, No

- **Late Cancel Fee Amount** (`BT-032`)
  - Type: `number`
  - Required: No
  - Description: Amount of penalty

- **Fee Waiver Requested** (`BT-033`)
  - Type: `radio`
  - Required: Yes
  - Description: Client asking for fee reversal
  - Options: Yes, No

- **Fee Waiver Reason** (`BT-034`)
  - Type: `text`
  - Required: No
  - Description: Justification for waiver

- **Fee Waiver Approved** (`BT-035`)
  - Type: `radio`
  - Required: No
  - Description: Decision on waiver request
  - Options: Yes, No, Pending

- **Cancellation Completed** (`BT-036`)
  - Type: `radio`
  - Required: Yes
  - Description: How cancellation was processed
  - Options: Yes - System, Yes - Manual, No

### Class Check-in (Booking & Technology)

**17 fields:**

- **Class** (`BT-CHKIN-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Which class

- **Instructor** (`BT-CHKIN-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Instructor name

- **Class Date & Time** (`BT-CHKIN-003`)
  - Type: `datetime`
  - Required: Yes
  - Description: Class date and time

- **Issue Type** (`BT-CHKIN-004`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Check-in problem type
  - Options: QR Code Not Working, QR Code Not Scanning, Manual Check-in Delayed, Attendance Not Recorded, Check-in System Down ... (6 total)

- **Check-in Method Attempted** (`BT-CHKIN-005`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How they tried to check in
  - Options: QR Code Scan, Manual by Staff, Self Check-in Kiosk, Other

- **Successfully Checked In** (`BT-CHKIN-006`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Final outcome
  - Options: Yes - Eventually, No - Attended Without Check-in, No - Did Not Attend

- **Credits Deducted Correctly** (`BT-CHKIN-007`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Was the class correctly charged
  - Options: Yes, No, Unknown

- **Manual Override Required** (`BT-CHKIN-008`)
  - Type: `checkbox`
  - Required: Yes
  - Description: Did staff need to intervene

- **Check-in Issue Type** (`BT-037`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of check-in problem
  - Options: QR Code Not Working, Manual Check-in Delay, Not Marked Present, Marked Absent Despite Attendance, Check-in Terminal Down ... (6 total)

- **Class Details** (`BT-038`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Class attended
  - Options: Studio Barre 57, Studio Foundations, Studio Barre 57 Express, Studio Cardio Barre, Studio FIT ... (24 total)

- **Class Date & Time** (`BT-039`)
  - Type: `datetime`
  - Required: Yes
  - Description: When class occurred

- **Trainer** (`BT-040`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Instructor for the class
  - Options: Anisha Shah, Atulan Purohit, Karanvir Bhatia, Mrigakshi Jaiswal, Reshma Sharma ... (30 total)

- **Check-in Method Attempted** (`BT-041`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How client tried to check in
  - Options: QR Code Scan, Manual Entry, Front Desk, Self-Service Kiosk

- **Client Actually Attended** (`BT-042`)
  - Type: `radio`
  - Required: Yes
  - Description: Confirm physical attendance
  - Options: Yes, No

- **Attendance Corrected** (`BT-043`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether record was fixed
  - Options: Yes, No, Not Needed

- **Class Credit Deducted** (`BT-044`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether class was charged
  - Options: Yes, No, Incorrectly

- **Credit Correction Needed** (`BT-045`)
  - Type: `radio`
  - Required: Yes
  - Description: If credit needs adjustment
  - Options: Yes, No

### Class Visibility (Booking & Technology)

**14 fields:**

- **Issue Type** (`BT-VIS-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Visibility issue type
  - Options: Favorite Instructor Not Showing, Schedule Not Updating, Wrong Studio Display, Missing Classes, Incorrect Times Displayed ... (6 total)

- **Affected Instructor** (`BT-VIS-002`)
  - Type: `dropdown`
  - Required: No
  - Description: If specific to instructor

- **Affected Studio** (`BT-VIS-003`)
  - Type: `dropdown`
  - Required: No
  - Description: If specific to location

- **Affected Date Range** (`BT-VIS-004`)
  - Type: `text`
  - Required: No
  - Description: What dates are not displaying correctly

- **Platform** (`BT-VIS-005`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Where they're seeing the issue
  - Options: iOS App, Android App, Website (Desktop), Website (Mobile)

- **Cache Cleared** (`BT-VIS-006`)
  - Type: `checkbox`
  - Required: No
  - Description: Did client try clearing cache/refreshing

- **Issue Replicated by Staff** (`BT-VIS-007`)
  - Type: `checkbox`
  - Required: No
  - Description: Can staff see the same problem

- **Visibility Issue Type** (`BT-059`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of visibility issue
  - Options: Favorite Instructor Not Showing, Schedule Not Updating, Wrong Studio Displayed, Classes Missing from Schedule, Filter Not Working ... (7 total)

- **Affected View** (`BT-060`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Where issue appears
  - Options: All Classes, Favorite Instructors, Specific Location, Specific Class Type, Schedule Calendar ... (6 total)

- **Expected to See** (`BT-061`)
  - Type: `text`
  - Required: Yes
  - Description: What client expected to view

- **Actually Seeing** (`BT-062`)
  - Type: `text`
  - Required: Yes
  - Description: Current incorrect display

- **Date Range Affected** (`BT-063`)
  - Type: `text`
  - Required: No
  - Description: Timeline of visibility issue

- **Filter Settings Used** (`BT-064`)
  - Type: `text`
  - Required: No
  - Description: Active filter configuration

- **Classes Actually Available** (`BT-065`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether classes exist in system
  - Options: Yes, No, Unclear

### Notifications (Booking & Technology)

**14 fields:**

- **Issue Type** (`BT-NOTIF-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of notification issue
  - Options: Missing Class Reminder, Missing Cancellation Confirmation, Too Many Notifications, Wrong Information in Notification, Notification Delay ... (6 total)

- **Notification Type** (`BT-NOTIF-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Which notification channel
  - Options: Email, SMS, Push Notification, In-App, All Channels

- **Related Class** (`BT-NOTIF-003`)
  - Type: `dropdown`
  - Required: No
  - Description: If related to specific class

- **Expected Notification Time** (`BT-NOTIF-004`)
  - Type: `datetime`
  - Required: No
  - Description: When notification should have arrived

- **Actual Notification Time** (`BT-NOTIF-005`)
  - Type: `datetime`
  - Required: No
  - Description: When notification actually arrived (if late)

- **Client Notification Preference** (`BT-NOTIF-006`)
  - Type: `text`
  - Required: No
  - Description: Client's stated preference

- **Preferences Updated** (`BT-NOTIF-007`)
  - Type: `checkbox`
  - Required: No
  - Description: Were settings adjusted

- **Notification Issue Type** (`BT-046`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of notification issue
  - Options: Missing Class Reminder, No Cancellation Alert, Too Many Notifications, Wrong Information in Notification, Notification Delay ... (7 total)

- **Notification Channel** (`BT-047`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How notification was/should be sent
  - Options: Push Notification, Email, SMS, WhatsApp, In-App

- **Expected Notification Type** (`BT-048`)
  - Type: `dropdown`
  - Required: Yes
  - Description: What notification was expected

- **Related Class/Booking** (`BT-049`)
  - Type: `text`
  - Required: No
  - Description: Associated booking details

- **Notification Received** (`BT-050`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether client got any notification
  - Options: Yes, No

- **Notification Timing** (`BT-051`)
  - Type: `dropdown`
  - Required: Yes
  - Description: When notification arrived
  - Options: On Time, Late, Too Early, Never Received

- **Client Preference Updated** (`BT-052`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether settings were adjusted
  - Options: Yes, No, N/A

### Payment Gateway (Booking & Technology)

**22 fields:**

- **Transaction Type** (`BT-PAY-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: What they were trying to pay for
  - Options: New Purchase, Renewal, Upgrade, Additional Credits, Retail Purchase ... (6 total)

- **Package/Product** (`BT-PAY-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Specific package or product

- **Amount** (`BT-PAY-003`)
  - Type: `number`
  - Required: Yes
  - Description: Transaction amount

- **Payment Method** (`BT-PAY-004`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Payment method attempted
  - Options: Credit Card, Debit Card, UPI, Net Banking, Wallet ... (6 total)

- **Issue Type** (`BT-PAY-005`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of payment issue
  - Options: Transaction Failed, Amount Deducted But Booking Failed, Payment Gateway Timeout, Card Declined, Multiple Charges ... (6 total)

- **Transaction ID** (`BT-PAY-006`)
  - Type: `text`
  - Required: No
  - Description: Payment gateway transaction reference

- **Money Deducted** (`BT-PAY-007`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Was amount charged
  - Options: Yes, No, Unknown

- **Booking Successful** (`BT-PAY-008`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Did booking go through
  - Options: Yes, No, Partial

- **Refund Initiated** (`BT-PAY-009`)
  - Type: `checkbox`
  - Required: No
  - Description: Was refund processed

- **Alternative Payment Accepted** (`BT-PAY-010`)
  - Type: `checkbox`
  - Required: No
  - Description: Was alternate payment method used

- **Payment Issue Type** (`BT-066`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of payment issue
  - Options: Transaction Failed, Amount Deducted But Booking Failed, Duplicate Charge, Payment Method Rejected, Gateway Timeout ... (8 total)

- **Product Type** (`BT-067`)
  - Type: `dropdown`
  - Required: Yes
  - Description: What was being purchased
  - Options: Memberships, Sessions/Single Classes, Privates, Class Packages, Credits ... (8 total)

- **Package/Product** (`BT-068`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Specific package purchased
  - Options: Barre 1 month Unlimited, Studio 2 Week Unlimited, Studio Single Class, Session, Private Class ... (26 total)

- **Expected Amount** (`BT-069`)
  - Type: `number`
  - Required: Yes
  - Description: What should have been charged

- **Amount Charged** (`BT-070`)
  - Type: `number`
  - Required: Yes
  - Description: What was actually charged

- **Payment Method** (`BT-071`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How payment was attempted
  - Options: Credit Card, Debit Card, UPI, Net Banking, Wallet ... (7 total)

- **Transaction ID** (`BT-072`)
  - Type: `text`
  - Required: No
  - Description: Payment reference number

- **Transaction Date & Time** (`BT-073`)
  - Type: `datetime`
  - Required: Yes
  - Description: Timestamp of transaction

- **Purchase Completed** (`BT-074`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether purchase went through
  - Options: Yes, No

- **Refund Required** (`BT-075`)
  - Type: `radio`
  - Required: Yes
  - Description: If money needs to be returned
  - Options: Yes, No

- **Refund Amount** (`BT-076`)
  - Type: `number`
  - Required: No
  - Description: Refund value

- **Refund Processed** (`BT-077`)
  - Type: `radio`
  - Required: No
  - Description: Status of refund
  - Options: Yes, No, Pending

### Profile Management (Booking & Technology)

**10 fields:**

- **Issue Type** (`BT-PROF-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Profile issue type
  - Options: Cannot Update Profile, Incorrect Information Displayed, Cannot Upload Photo, Cannot Change Password, Cannot Update Preferences ... (6 total)

- **Field Affected** (`BT-PROF-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Which profile field has issue
  - Options: Name, Email, Phone, Address, Emergency Contact ... (9 total)

- **Platform** (`BT-PROF-003`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Where they tried to update
  - Options: iOS App, Android App, Website (Desktop), Website (Mobile)

- **Information Corrected** (`BT-PROF-004`)
  - Type: `checkbox`
  - Required: Yes
  - Description: Was profile manually updated by staff

- **Profile Issue Type** (`BT-053`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of profile issue
  - Options: Cannot Update Phone, Cannot Update Email, Cannot Change Password, Profile Photo Issue, Emergency Contact Issue ... (8 total)

- **Field Affected** (`BT-054`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Which profile field has issue
  - Options: Name, Phone Number, Email, Password, Date of Birth ... (11 total)

- **Attempted Update** (`BT-055`)
  - Type: `text`
  - Required: Yes
  - Description: Details of attempted change

- **Error Encountered** (`BT-056`)
  - Type: `text`
  - Required: No
  - Description: What went wrong

- **Update Completed Manually** (`BT-057`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether staff updated it
  - Options: Yes, No

- **Data Accuracy Verified** (`BT-058`)
  - Type: `radio`
  - Required: Yes
  - Description: Profile information confirmed correct
  - Options: Yes, No

### Technical Support (Booking & Technology)

**15 fields:**

- **Support Channel Used** (`BT-TECH-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How client contacted tech support
  - Options: Email, Phone, In-App Chat, Social Media DM, Walk-in

- **Issue Reported to Support** (`BT-TECH-002`)
  - Type: `textarea`
  - Required: Yes
  - Description: What issue they reported

- **Response Time** (`BT-TECH-003`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How quickly support responded
  - Options: Immediate, Within 1 Hour, Within 24 Hours, 24-48 Hours, No Response Yet ... (6 total)

- **Issue Type** (`BT-TECH-004`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Support quality issue
  - Options: No Response, Slow Response, Unresolved, Generic Response, Poor Solution Quality ... (6 total)

- **Previous Ticket Number** (`BT-TECH-005`)
  - Type: `text`
  - Required: No
  - Description: If this is a follow-up

- **Escalation Required** (`BT-TECH-006`)
  - Type: `checkbox`
  - Required: Yes
  - Description: Should this go to tech team lead

- **Temporary Solution Provided** (`BT-TECH-007`)
  - Type: `textarea`
  - Required: No
  - Description: What workaround was offered

- **Support Issue Type** (`BT-078`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of support issue
  - Options: No Response to Tech Query, Issue Still Unresolved, Passed Between Departments, Long Resolution Time, No Follow-up ... (6 total)

- **Original Issue** (`BT-079`)
  - Type: `text`
  - Required: Yes
  - Description: Initial technical complaint

- **Previous Ticket Number** (`BT-080`)
  - Type: `text`
  - Required: No
  - Description: Reference to earlier ticket

- **How Long Pending** (`BT-081`)
  - Type: `number`
  - Required: Yes
  - Description: Duration of unresolved issue

- **Support Channels Used** (`BT-082`)
  - Type: `multiselect`
  - Required: Yes
  - Description: Where client sought help
  - Options: Phone, Email, Chat, In-Person, Social Media

- **Number of Contacts Made** (`BT-083`)
  - Type: `number`
  - Required: Yes
  - Description: Contact attempts count

- **Departments Involved** (`BT-084`)
  - Type: `multiselect`
  - Required: Yes
  - Description: Teams that handled the issue
  - Options: Operations, Facilities, Training, Sales, Client Success ... (8 total)

- **Current Status of Original Issue** (`BT-085`)
  - Type: `dropdown`
  - Required: Yes
  - Description: State of original problem
  - Options: Still Unresolved, Partially Resolved, Now Resolved, Unknown

### Waitlist Issues (Booking & Technology)

**17 fields:**

- **Class** (`BT-WAIT-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Which class waitlist

- **Instructor** (`BT-WAIT-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Instructor name

- **Class Date & Time** (`BT-WAIT-003`)
  - Type: `datetime`
  - Required: Yes
  - Description: Class date and time

- **Issue Type** (`BT-WAIT-004`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Specific waitlist problem

- **Waitlist Position** (`BT-WAIT-005`)
  - Type: `number`
  - Required: No
  - Description: Client's position on waitlist

- **Time on Waitlist** (`BT-WAIT-006`)
  - Type: `text`
  - Required: No
  - Description: How long they've been waiting

- **Spot Opened Up** (`BT-WAIT-007`)
  - Type: `dropdown`
  - Required: No
  - Description: Did spots become available
  - Options: Yes, No, Unknown

- **Resolution** (`BT-WAIT-008`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How was it handled

- **Waitlist Issue Type** (`BT-017`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Specific waitlist problem

- **Class Details** (`BT-018`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Class on waitlist
  - Options: Studio Barre 57, Studio Foundations, Studio Barre 57 Express, Studio Cardio Barre, Studio FIT ... (24 total)

- **Class Date & Time** (`BT-019`)
  - Type: `datetime`
  - Required: Yes
  - Description: Scheduled class date/time

- **Trainer** (`BT-020`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Instructor for the class
  - Options: Anisha Shah, Atulan Purohit, Karanvir Bhatia, Mrigakshi Jaiswal, Reshma Sharma ... (30 total)

- **Waitlist Position** (`BT-021`)
  - Type: `number`
  - Required: Yes
  - Description: Where client was in queue

- **When Joined Waitlist** (`BT-022`)
  - Type: `datetime`
  - Required: Yes
  - Description: Timestamp of joining waitlist

- **Spot Became Available** (`BT-023`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether a spot actually opened
  - Options: Yes, No, Unknown

- **Client Received Notification** (`BT-024`)
  - Type: `radio`
  - Required: Yes
  - Description: If notification was sent/received
  - Options: Yes, No

- **Manual Override Done** (`BT-025`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether staff manually added client
  - Options: Yes, No

### Clique Behavior (Community & Culture)

**8 fields:**

- **Clique Behavior Observed** (`CC_CLQ_001`)
  - Type: `multiselect`
  - Required: Yes
  - Description: What exclusionary behavior occurred
  - Options: Regular members excluding new clients, Reserved spots/areas, Unwelcoming body language, Private conversations excluding others, Trainer showing favoritism ... (7 total)

- **Location/Time of Observation** (`CC_CLQ_002`)
  - Type: `text`
  - Required: Yes
  - Description: When/where did this happen

- **Trainer Name (if applicable)** (`CC_CLQ_003`)
  - Type: `dropdown`
  - Required: No
  - Description: Was trainer involved or aware

- **Specific Members Involved** (`CC_CLQ_004`)
  - Type: `text`
  - Required: No
  - Description: Who exhibited clique behavior

- **Client Who Felt Excluded** (`CC_CLQ_005`)
  - Type: `text`
  - Required: No
  - Description: Who reported feeling unwelcome

- **New Client Impact** (`CC_CLQ_006`)
  - Type: `radio`
  - Required: Yes
  - Description: Did this impact a new member

- **Observed Behavior Details** (`CC_CLQ_007`)
  - Type: `textarea`
  - Required: Yes
  - Description: Detailed description of what happened

- **Action Taken at Time** (`CC_CLQ_008`)
  - Type: `textarea`
  - Required: No
  - Description: What was done to address immediately

### Community Events (Community & Culture)

**9 fields:**

- **Event Name** (`CC_EVT_001`)
  - Type: `text`
  - Required: Yes
  - Description: Which event had issues

- **Event Date** (`CC_EVT_002`)
  - Type: `date`
  - Required: Yes
  - Description: When was the event

- **Issue Type** (`CC_EVT_003`)
  - Type: `multiselect`
  - Required: Yes
  - Description: What went wrong
  - Options: Poor organization, Low attendance, Lack of engagement, Technical problems, Venue issues ... (9 total)

- **Attendance** (`CC_EVT_004`)
  - Type: `number`
  - Required: No
  - Description: Actual turnout

- **Expected Attendance** (`CC_EVT_005`)
  - Type: `number`
  - Required: No
  - Description: How many were expected

- **Detailed Description** (`CC_EVT_006`)
  - Type: `textarea`
  - Required: Yes
  - Description: Full description of problems

- **Client Feedback Received** (`CC_EVT_007`)
  - Type: `radio`
  - Required: Yes
  - Description: Did clients complain

- **Feedback Summary** (`CC_EVT_008`)
  - Type: `textarea`
  - Required: No
  - Description: What did clients say

- **Organizer/Responsible Party** (`CC_EVT_009`)
  - Type: `text`
  - Required: No
  - Description: Who was in charge

### Discrimination (Community & Culture)

**10 fields:**

- **Type of Discrimination** (`CC_DIS_001`)
  - Type: `multiselect`
  - Required: Yes
  - Description: Basis of discriminatory behavior
  - Options: Body type/size, Fitness level, Age, Gender, Appearance ... (8 total)

- **Source of Discrimination** (`CC_DIS_002`)
  - Type: `radio`
  - Required: Yes
  - Description: Who exhibited discriminatory behavior
  - Options: Trainer, Staff member, Other client, Multiple sources

- **Trainer/Staff Name** (`CC_DIS_003`)
  - Type: `dropdown`
  - Required: No
  - Description: Name of person involved

- **Specific Incident Description** (`CC_DIS_004`)
  - Type: `textarea`
  - Required: Yes
  - Description: What exactly happened

- **Verbal or Non-Verbal** (`CC_DIS_005`)
  - Type: `multiselect`
  - Required: Yes
  - Description: How was discrimination expressed
  - Options: Verbal comments, Body language, Exclusionary actions, Differential treatment, Other

- **Witness Present** (`CC_DIS_006`)
  - Type: `radio`
  - Required: Yes
  - Description: Were there witnesses

- **Witness Names** (`CC_DIS_007`)
  - Type: `text`
  - Required: No
  - Description: Who else observed this

- **Client Impact** (`CC_DIS_008`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How did this affect the client
  - Options: Client upset but continuing, Client considering leaving, Client left immediately, Client requested refund, Other

- **Immediate Action Taken** (`CC_DIS_009`)
  - Type: `textarea`
  - Required: Yes
  - Description: What was done immediately

- **Follow-up Required** (`CC_DIS_010`)
  - Type: `radio`
  - Required: Yes
  - Description: Does this need escalation

### Inclusivity Issues (Community & Culture)

**8 fields:**

- **Inclusivity Concern** (`CC_INC_001`)
  - Type: `multiselect`
  - Required: Yes
  - Description: What inclusivity issue was observed
  - Options: Not welcoming to beginners, Lack of body positivity, Judgmental atmosphere, Language/terminology issues, Lack of modifications offered ... (8 total)

- **Source of Issue** (`CC_INC_002`)
  - Type: `radio`
  - Required: Yes
  - Description: Where does issue originate
  - Options: Trainer behavior, Staff behavior, Studio messaging/materials, Other clients, General environment ... (6 total)

- **Trainer Name (if applicable)** (`CC_INC_003`)
  - Type: `dropdown`
  - Required: No
  - Description: Trainer involved if relevant

- **Specific Incident/Observation** (`CC_INC_004`)
  - Type: `textarea`
  - Required: Yes
  - Description: What specifically happened

- **Client Affected** (`CC_INC_005`)
  - Type: `text`
  - Required: No
  - Description: Who experienced this issue

- **Client Feedback Verbatim** (`CC_INC_006`)
  - Type: `textarea`
  - Required: No
  - Description: What did client say

- **Impact on Client** (`CC_INC_007`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Severity of impact
  - Options: Minor discomfort, Client upset, Client considering leaving, Client left/requested refund, Other

- **Pattern or Isolated** (`CC_INC_008`)
  - Type: `radio`
  - Required: Yes
  - Description: Is this a one-time or recurring issue
  - Options: Isolated incident, Pattern observed, Multiple reports received

### Member Behavior (Community & Culture)

**11 fields:**

- **Disruptive Behavior Type** (`CC_MEM_001`)
  - Type: `multiselect`
  - Required: Yes
  - Description: What disruptive behavior occurred
  - Options: Loud talking during class, Phone usage during class, Late arrival disruption, Early departure disruption, Arguing with staff ... (9 total)

- **Member Name** (`CC_MEM_002`)
  - Type: `text`
  - Required: Yes
  - Description: Who exhibited the behavior

- **Member Phone/Email** (`CC_MEM_003`)
  - Type: `text`
  - Required: No
  - Description: Member contact details

- **Class Type** (`CC_MEM_004`)
  - Type: `dropdown`
  - Required: No
  - Description: Which class was affected

- **Trainer Name** (`CC_MEM_005`)
  - Type: `dropdown`
  - Required: No
  - Description: Trainer who was present

- **Frequency of Behavior** (`CC_MEM_006`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Is this a recurring problem
  - Options: First time, Occasional (2-3 times), Frequent (repeated issue), Ongoing pattern

- **Other Clients Impacted** (`CC_MEM_007`)
  - Type: `radio`
  - Required: Yes
  - Description: Did this disturb other members

- **Incident Description** (`CC_MEM_008`)
  - Type: `textarea`
  - Required: Yes
  - Description: Full description of what happened

- **Trainer Addressed Behavior** (`CC_MEM_009`)
  - Type: `radio`
  - Required: Yes
  - Description: Did trainer intervene

- **Member Response** (`CC_MEM_010`)
  - Type: `dropdown`
  - Required: No
  - Description: How did member react when addressed
  - Options: Apologetic/cooperative, Defensive, Refused to comply, Argumentative, Left class ... (6 total)

- **Warning Issued** (`CC_MEM_011`)
  - Type: `radio`
  - Required: No
  - Description: Was member given formal warning

### Studio Culture (Community & Culture)

**8 fields:**

- **Cultural Issue Type** (`CC_CUL_001`)
  - Type: `multiselect`
  - Required: Yes
  - Description: What cultural problem exists
  - Options: Toxic environment, Comparison culture, Lack of support, Competitive rather than collaborative, Pressure to purchase/upgrade ... (8 total)

- **Where Issue Manifests** (`CC_CUL_002`)
  - Type: `multiselect`
  - Required: Yes
  - Description: Where is this issue observed
  - Options: In classes, Social media, Front desk interactions, Marketing materials, Trainer communications ... (8 total)

- **Trainer/Staff Contributing** (`CC_CUL_003`)
  - Type: `text`
  - Required: No
  - Description: Are specific staff perpetuating this

- **Specific Examples/Incidents** (`CC_CUL_004`)
  - Type: `textarea`
  - Required: Yes
  - Description: What are concrete examples

- **Client Feedback/Complaints** (`CC_CUL_005`)
  - Type: `textarea`
  - Required: No
  - Description: What have clients said

- **Number of Clients Affected** (`CC_CUL_006`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How widespread is the concern
  - Options: Single client, Few clients (2-5), Multiple clients (6-10), Many clients (10+), Widespread concern

- **Impact on Business** (`CC_CUL_007`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Business implications
  - Options: No visible impact, Clients expressing concern, Clients reducing visits, Clients leaving, Negative reviews/word of mouth ... (6 total)

- **Duration of Issue** (`CC_CUL_008`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How long has this existed
  - Options: New concern, Noticed in past month, Ongoing for several months, Long-term pattern

### Communication Quality (Customer Service)

**16 fields:**

- **Issue Type** (`CS-COMM-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Communication problem type
  - Options: Poor Communication, Language Barrier, Unclear Information, Conflicting Information, Tone Issues ... (6 total)

- **Communication Channel** (`CS-COMM-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How communication happened
  - Options: In-Person, Phone, Email, WhatsApp, Social Media

- **Staff Member Involved** (`CS-COMM-003`)
  - Type: `dropdown`
  - Required: No
  - Description: Who communicated with client

- **Language Issue** (`CS-COMM-004`)
  - Type: `dropdown`
  - Required: No
  - Description: If language was a barrier
  - Options: English, Hindi, Other, None

- **Topic Discussed** (`CS-COMM-005`)
  - Type: `text`
  - Required: Yes
  - Description: What was being discussed

- **Conflicting Info Source** (`CS-COMM-006`)
  - Type: `text`
  - Required: No
  - Description: If conflicting, who said what

- **Clarification Provided** (`CS-COMM-007`)
  - Type: `checkbox`
  - Required: Yes
  - Description: Was issue clarified immediately

- **Documentation Provided** (`CS-COMM-008`)
  - Type: `checkbox`
  - Required: No
  - Description: Was written clarification given

- **Communication Issue Type** (`CS-027`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of communication problem
  - Options: Poor/Unclear Communication, Language Barrier, Incorrect Information Given, Conflicting Information, Information Not Conveyed ... (7 total)

- **Communication Channel** (`CS-028`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Mode of communication
  - Options: In-Person, Phone, Email, WhatsApp, SMS ... (7 total)

- **Information Topic** (`CS-029`)
  - Type: `text`
  - Required: Yes
  - Description: Subject matter discussed

- **What Was Communicated** (`CS-030`)
  - Type: `textarea`
  - Required: Yes
  - Description: Content of communication

- **What Should Have Been Said** (`CS-031`)
  - Type: `textarea`
  - Required: Yes
  - Description: Accurate information

- **Impact on Client** (`CS-032`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Consequence of miscommunication
  - Options: No Action Taken, Wrong Action Taken, Financial Loss, Missed Class, Booking Error ... (7 total)

- **Multiple Associates Gave Different Info** (`CS-033`)
  - Type: `radio`
  - Required: Yes
  - Description: Conflicting information from team
  - Options: Yes, No, N/A

- **Correction Communicated** (`CS-034`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether client was informed of correct info
  - Options: Yes, No

### Complaint Handling (Customer Service)

**18 fields:**

- **Original Complaint Category** (`CS-COMPL-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: What was the complaint about

- **Issue Type** (`CS-COMPL-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How complaint was mishandled
  - Options: Dismissive Attitude, Defensive Response, No Escalation Option, Not Taken Seriously, Other

- **Staff Member Who Received Complaint** (`CS-COMPL-003`)
  - Type: `dropdown`
  - Required: No
  - Description: Who client complained to

- **Client's Expectation** (`CS-COMPL-004`)
  - Type: `text`
  - Required: No
  - Description: What did client want

- **Response Given** (`CS-COMPL-005`)
  - Type: `textarea`
  - Required: Yes
  - Description: How staff responded

- **Escalation Requested** (`CS-COMPL-006`)
  - Type: `checkbox`
  - Required: No
  - Description: Did client ask for manager

- **Escalation Allowed** (`CS-COMPL-007`)
  - Type: `checkbox`
  - Required: No
  - Description: Was escalation permitted

- **Manager Involvement** (`CS-COMPL-008`)
  - Type: `dropdown`
  - Required: No
  - Description: Did manager get involved
  - Options: Yes - Immediately, Yes - After Delay, No

- **Complaint Handling Issue** (`CS-052`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How complaint was poorly handled
  - Options: Dismissive Attitude, Defensive Response, No Apology Given, Not Taken Seriously, No Escalation Option Provided ... (8 total)

- **Original Complaint Category** (`CS-053`)
  - Type: `dropdown`
  - Required: Yes
  - Description: What was being complained about
  - Options: Booking & Technology, Customer Service, Sales & Marketing, Health & Safety, Billing/Financial ... (8 total)

- **Original Complaint Summary** (`CS-054`)
  - Type: `textarea`
  - Required: Yes
  - Description: The initial complaint

- **Who Received Complaint** (`CS-055`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Who client complained to
  - Options: Front Desk Staff, Manager, Email Support, Phone Support, Social Media Team ... (7 total)

- **Associate Name** (`CS-056`)
  - Type: `dropdown`
  - Required: No
  - Description: Specific person (if known)
  - Options: Akshay Rane, Vahishta Fitter, Zaheer Agarbattiwala, Zahur Shaikh, Nadiya Shaikh ... (17 total)

- **Response Given** (`CS-057`)
  - Type: `textarea`
  - Required: Yes
  - Description: Staff response to complaint

- **Client Felt Heard** (`CS-058`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether client felt acknowledged
  - Options: Yes, No

- **Solution Offered** (`CS-059`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether resolution was provided
  - Options: Yes, No

- **Escalation Requested** (`CS-060`)
  - Type: `radio`
  - Required: Yes
  - Description: Client asked for manager/higher authority
  - Options: Yes, No

- **Escalation Provided** (`CS-061`)
  - Type: `radio`
  - Required: No
  - Description: Whether escalation happened
  - Options: Yes, No, N/A

### Email/Chat Support (Customer Service)

**16 fields:**

- **Channel** (`CS-EMAIL-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Which channel used
  - Options: Email, In-App Chat, WhatsApp, Website Chat

- **Issue Type** (`CS-EMAIL-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Support issue type
  - Options: Slow Response, Generic Reply, Issue Not Resolved, Auto-Reply Only, Other

- **Date Sent** (`CS-EMAIL-003`)
  - Type: `datetime`
  - Required: Yes
  - Description: When client sent message

- **Subject/Topic** (`CS-EMAIL-004`)
  - Type: `text`
  - Required: Yes
  - Description: What was it about

- **Response Time** (`CS-EMAIL-005`)
  - Type: `dropdown`
  - Required: No
  - Description: How long until reply
  - Options: Under 1 Hour, 1-4 Hours, 4-24 Hours, 24-48 Hours, 48+ Hours ... (6 total)

- **Response Quality** (`CS-EMAIL-006`)
  - Type: `dropdown`
  - Required: No
  - Description: Quality of response received
  - Options: Helpful, Generic, Unhelpful, Irrelevant

- **Issue Resolved via Channel** (`CS-EMAIL-007`)
  - Type: `checkbox`
  - Required: No
  - Description: Was it solved through email/chat

- **Escalation to Call/In-Person** (`CS-EMAIL-008`)
  - Type: `checkbox`
  - Required: No
  - Description: Did it need phone/visit

- **Support Channel** (`CS-071`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Which channel was used
  - Options: Email, In-App Chat, WhatsApp Chat, Website Chat

- **Support Issue Type** (`CS-072`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of support issue
  - Options: Very Slow Response, Generic/Template Replies, Issue Not Resolved, No Follow-up, Transferred to Another Channel ... (7 total)

- **Initial Message Date** (`CS-073`)
  - Type: `datetime`
  - Required: Yes
  - Description: First contact timestamp

- **Response Received Date** (`CS-074`)
  - Type: `datetime`
  - Required: No
  - Description: Our response timestamp

- **Query Topic** (`CS-076`)
  - Type: `text`
  - Required: Yes
  - Description: Subject of message

- **Number of Exchanges** (`CS-077`)
  - Type: `number`
  - Required: Yes
  - Description: Message thread length

- **Issue Resolved** (`CS-078`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether query was answered
  - Options: Yes, No, Partially

- **Response Quality** (`CS-079`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Quality of support received
  - Options: Helpful & Complete, Generic/Unhelpful, Wrong Information, Didn't Address Query, N/A

### Front Desk Service (Customer Service)

**16 fields:**

- **Staff Member Involved** (`CS-DESK-001`)
  - Type: `dropdown`
  - Required: No
  - Description: Which staff member

- **Issue Type** (`CS-DESK-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Nature of service issue
  - Options: Rude Behavior, Unhelpful Attitude, Lack of Knowledge, Inattentive, Unprofessional Conduct ... (6 total)

- **Specific Incident** (`CS-DESK-003`)
  - Type: `textarea`
  - Required: Yes
  - Description: What exactly happened

- **Client Request/Query** (`CS-DESK-004`)
  - Type: `text`
  - Required: Yes
  - Description: What did client need

- **Request Fulfilled** (`CS-DESK-005`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Was request handled
  - Options: Yes - Immediately, Yes - After Delay, No - Unable to Fulfill, No - Refused

- **Witness Present** (`CS-DESK-006`)
  - Type: `dropdown`
  - Required: No
  - Description: Was anyone else present
  - Options: Yes - Staff, Yes - Other Client, No

- **Apology Given** (`CS-DESK-007`)
  - Type: `checkbox`
  - Required: No
  - Description: Was client apologized to

- **Escalated to Manager** (`CS-DESK-008`)
  - Type: `checkbox`
  - Required: No
  - Description: Was manager involved

- **Service Issue Type** (`CS-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of service issue
  - Options: Rude Behavior, Unhelpful Attitude, Lack of Product Knowledge, Inattentive/Distracted, Unprofessional Appearance ... (7 total)

- **Specific Associate** (`CS-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Associate involved (if known)
  - Options: Akshay Rane, Vahishta Fitter, Zaheer Agarbattiwala, Zahur Shaikh, Nadiya Shaikh ... (17 total)

- **Incident Description** (`CS-003`)
  - Type: `textarea`
  - Required: Yes
  - Description: What happened during interaction

- **Witness Present** (`CS-004`)
  - Type: `radio`
  - Required: No
  - Description: Were others present
  - Options: Yes, No

- **Client Request** (`CS-005`)
  - Type: `text`
  - Required: Yes
  - Description: Purpose of client interaction

- **Request Fulfilled** (`CS-006`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether client got what they needed
  - Options: Yes, No, Partially

- **Immediate Action Taken** (`CS-007`)
  - Type: `text`
  - Required: Yes
  - Description: Real-time resolution attempt

- **Manager Informed** (`CS-008`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether escalated immediately
  - Options: Yes, No

### Issue Resolution (Customer Service)

**18 fields:**

- **Original Issue** (`CS-RESOL-001`)
  - Type: `textarea`
  - Required: Yes
  - Description: What was the original complaint

- **Date First Reported** (`CS-RESOL-002`)
  - Type: `date`
  - Required: Yes
  - Description: When was it first reported

- **Issue Type** (`CS-RESOL-003`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Resolution problem type
  - Options: Still Unresolved, Passed Between Departments, No Clear Owner, Resolution Inadequate, Other

- **Departments Involved** (`CS-RESOL-004`)
  - Type: `multiselect`
  - Required: No
  - Description: Which teams have handled this
  - Options: Operations, Facilities, Training, Sales, Client Success ... (7 total)

- **Number of Contacts** (`CS-RESOL-005`)
  - Type: `number`
  - Required: No
  - Description: How many times client has followed up

- **Current Status** (`CS-RESOL-006`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Where does it stand now
  - Options: Open, In Progress, Waiting on Client, Waiting on Internal Team, Escalated

- **Resolution Offered** (`CS-RESOL-007`)
  - Type: `textarea`
  - Required: No
  - Description: What solution was proposed

- **Client Satisfied with Resolution** (`CS-RESOL-008`)
  - Type: `dropdown`
  - Required: No
  - Description: Client's acceptance of resolution
  - Options: Yes, No, Partially, Too Early to Tell

- **Compensation Offered** (`CS-RESOL-009`)
  - Type: `text`
  - Required: No
  - Description: Any credits/refund/free class given

- **Resolution Issue Type** (`CS-017`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of resolution problem
  - Options: Issue Still Unresolved, Passed Between Departments, No Accountability Taken, Conflicting Solutions Given, Resolution Not Implemented ... (6 total)

- **Original Issue Category** (`CS-018`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Category of original complaint
  - Options: Booking & Technology, Customer Service, Sales & Marketing, Health & Safety, Billing/Financial ... (8 total)

- **Original Issue Description** (`CS-019`)
  - Type: `textarea`
  - Required: Yes
  - Description: What was the original complaint

- **First Reported Date** (`CS-020`)
  - Type: `date`
  - Required: Yes
  - Description: Initial complaint date

- **Departments Contacted** (`CS-022`)
  - Type: `multiselect`
  - Required: Yes
  - Description: Which teams were involved
  - Options: Operations, Facilities, Training, Sales, Client Success ... (8 total)

- **Number of Escalations** (`CS-023`)
  - Type: `number`
  - Required: Yes
  - Description: Escalation count

- **Promised Resolution Date** (`CS-024`)
  - Type: `date`
  - Required: No
  - Description: When resolution was promised

- **Current Status** (`CS-025`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Present state of issue
  - Options: Still Open, Partially Resolved, Resolved But Client Unhappy, Unresolved After Multiple Attempts

- **Resolution Blockers** (`CS-026`)
  - Type: `text`
  - Required: No
  - Description: Obstacles to solving issue

### Newcomer Experience (Customer Service)

**20 fields:**

- **Client's First Visit Date** (`CS-NEW-001`)
  - Type: `date`
  - Required: Yes
  - Description: When was their first class

- **Issue Type** (`CS-NEW-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Onboarding issue type
  - Options: No Orientation, Poor Onboarding, Lack of Guidance, Not Welcomed, Studio Tour Missing ... (6 total)

- **Staff Who Greeted** (`CS-NEW-003`)
  - Type: `dropdown`
  - Required: No
  - Description: Who welcomed them

- **Orientation Provided** (`CS-NEW-004`)
  - Type: `checkbox`
  - Required: No
  - Description: Did they get facility tour

- **Class Explanation Given** (`CS-NEW-005`)
  - Type: `checkbox`
  - Required: No
  - Description: Was class format explained

- **Equipment Demo Provided** (`CS-NEW-006`)
  - Type: `checkbox`
  - Required: No
  - Description: Did they learn to use equipment

- **Questions Answered** (`CS-NEW-007`)
  - Type: `checkbox`
  - Required: No
  - Description: Were their questions addressed

- **Client's First Class** (`CS-NEW-008`)
  - Type: `dropdown`
  - Required: No
  - Description: Which class they attended

- **Felt Welcomed** (`CS-NEW-009`)
  - Type: `dropdown`
  - Required: No
  - Description: Client's feeling about experience
  - Options: Yes, Somewhat, No

- **Newcomer Issue Type** (`CS-088`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of newcomer issue
  - Options: No Orientation Provided, Poor Onboarding, Lack of Guidance, Not Welcomed, Studio Tour Not Given ... (8 total)

- **Client's First Visit** (`CS-089`)
  - Type: `radio`
  - Required: Yes
  - Description: Was this their very first time
  - Options: Yes, No

- **Trial Class** (`CS-090`)
  - Type: `radio`
  - Required: Yes
  - Description: Was it a trial/intro class
  - Options: Yes, No

- **Class Attended** (`CS-091`)
  - Type: `dropdown`
  - Required: Yes
  - Description: First class type
  - Options: Studio Barre 57, Studio Foundations, Studio Barre 57 Express, Studio Cardio Barre, Studio FIT ... (24 total)

- **Trainer** (`CS-092`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Instructor for first class
  - Options: Anisha Shah, Atulan Purohit, Karanvir Bhatia, Mrigakshi Jaiswal, Reshma Sharma ... (30 total)

- **Orientation Provided** (`CS-093`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether orientation given
  - Options: Yes - Adequate, Yes - Rushed, No

- **Studio Tour Given** (`CS-094`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether shown around
  - Options: Yes, No

- **Equipment Explained** (`CS-095`)
  - Type: `radio`
  - Required: Yes
  - Description: Props/equipment demo given
  - Options: Yes, No

- **Staff Welcoming** (`CS-096`)
  - Type: `radio`
  - Required: Yes
  - Description: How welcoming staff was
  - Options: Very Welcoming, Somewhat, Not Welcoming

- **What Was Missing** (`CS-097`)
  - Type: `textarea`
  - Required: Yes
  - Description: Details of poor experience

- **Likely to Return** (`CS-098`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Client's stated intention
  - Options: Definitely Yes, Probably Yes, Unsure, Probably No, Definitely No

### Phone Support (Customer Service)

**15 fields:**

- **Phone Number Called** (`CS-PHONE-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Which number they called

- **Issue Type** (`CS-PHONE-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Phone support issue
  - Options: No Answer, Long Hold Time, Call Disconnected, No Callback, Wrong Extension ... (6 total)

- **Time of Call** (`CS-PHONE-003`)
  - Type: `datetime`
  - Required: Yes
  - Description: When they called

- **Hold Duration** (`CS-PHONE-004`)
  - Type: `dropdown`
  - Required: No
  - Description: How long they waited
  - Options: Under 2 min, 2-5 min, 5-10 min, 10+ min, No Answer

- **Reason for Call** (`CS-PHONE-005`)
  - Type: `text`
  - Required: Yes
  - Description: What they were calling about

- **Call Attempts** (`CS-PHONE-006`)
  - Type: `number`
  - Required: No
  - Description: How many times they tried

- **Phone Support Issue Type** (`CS-062`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of phone support issue
  - Options: Phone Unreachable, Long Hold Time, Call Disconnected, No Callback Received, Transferred Multiple Times ... (8 total)

- **Phone Number Called** (`CS-063`)
  - Type: `text`
  - Required: Yes
  - Description: Number dialed

- **Number of Attempts** (`CS-064`)
  - Type: `number`
  - Required: Yes
  - Description: Call attempts

- **Call Connected** (`CS-065`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether call went through
  - Options: Yes, No

- **Hold Time** (`CS-066`)
  - Type: `number`
  - Required: No
  - Description: Wait duration

- **Call Disconnected** (`CS-067`)
  - Type: `radio`
  - Required: No
  - Description: Whether call dropped
  - Options: Yes, No

- **Callback Promised** (`CS-068`)
  - Type: `radio`
  - Required: No
  - Description: Staff said they'd call back
  - Options: Yes, No

- **Callback Received** (`CS-069`)
  - Type: `radio`
  - Required: No
  - Description: Whether callback happened
  - Options: Yes, No, N/A

- **Issue Resolved on Call** (`CS-070`)
  - Type: `radio`
  - Required: No
  - Description: Whether problem was solved
  - Options: Yes, No, N/A

### Response Time (Customer Service)

**12 fields:**

- **Communication Channel** (`CS-RESP-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How client was supposed to be contacted
  - Options: Email, Phone Call, WhatsApp, Social Media DM, In-Person Follow-up Promised

- **Initial Contact Date** (`CS-RESP-002`)
  - Type: `datetime`
  - Required: Yes
  - Description: When client first reached out

- **Issue Reported** (`CS-RESP-003`)
  - Type: `textarea`
  - Required: Yes
  - Description: What they were contacting about

- **Response Received** (`CS-RESP-004`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Did they get a response
  - Options: Yes - Late, No Response Yet, Partial Response

- **Actual Response Date** (`CS-RESP-005`)
  - Type: `datetime`
  - Required: No
  - Description: When response was received

- **Follow-up Promised** (`CS-RESP-006`)
  - Type: `checkbox`
  - Required: No
  - Description: Was follow-up commitment made

- **Follow-up Done** (`CS-RESP-007`)
  - Type: `checkbox`
  - Required: No
  - Description: Was follow-up actually done

- **Staff Responsible** (`CS-RESP-008`)
  - Type: `dropdown`
  - Required: No
  - Description: Who was supposed to respond

- **Response Issue Type** (`CS-009`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of response delay
  - Options: Delayed Email Response, Delayed Phone Callback, No Response Received, Automated Response Only, No Follow-up ... (6 total)

- **Communication Channel** (`CS-010`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How client contacted us
  - Options: Email, Phone Call, WhatsApp, SMS, Social Media DM ... (6 total)

- **Initial Contact Date** (`CS-011`)
  - Type: `datetime`
  - Required: Yes
  - Description: Timestamp of first contact

- **Response Received Date** (`CS-012`)
  - Type: `datetime`
  - Required: No
  - Description: Timestamp of our response

### Staff Availability (Customer Service)

**16 fields:**

- **Issue Type** (`CS-AVAIL-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Availability issue type
  - Options: No One at Desk, Long Wait Time, Understaffed, Staff Busy with Other Tasks, Other

- **Time of Day** (`CS-AVAIL-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: When did this occur
  - Options: Morning (6-10am), Midday (10am-2pm), Afternoon (2-6pm), Evening (6-10pm)

- **Wait Time** (`CS-AVAIL-003`)
  - Type: `dropdown`
  - Required: No
  - Description: How long client waited
  - Options: Under 5 min, 5-10 min, 10-15 min, 15+ min

- **Reason for Delay** (`CS-AVAIL-004`)
  - Type: `text`
  - Required: No
  - Description: Why no staff was available

- **Client Need** (`CS-AVAIL-005`)
  - Type: `dropdown`
  - Required: Yes
  - Description: What did client need
  - Options: Check-in Help, Booking Issue, Question, Purchase, Complaint ... (6 total)

- **Peak Hour** (`CS-AVAIL-006`)
  - Type: `checkbox`
  - Required: No
  - Description: Was this during busy time

- **Eventually Served** (`CS-AVAIL-007`)
  - Type: `checkbox`
  - Required: Yes
  - Description: Was client helped eventually

- **Availability Issue Type** (`CS-043`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of availability issue
  - Options: No One at Desk, Long Wait Time, Understaffed During Peak Hours, Staff Took Too Long, Had to Search for Staff ... (7 total)

- **Time of Day** (`CS-044`)
  - Type: `dropdown`
  - Required: Yes
  - Description: When issue occurred
  - Options: Early Morning (6-9 AM), Morning (9-12 PM), Afternoon (12-5 PM), Evening (5-8 PM), Night (8-10 PM)

- **Day of Week** (`CS-045`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Which day
  - Options: Monday, Tuesday, Wednesday, Thursday, Friday ... (7 total)

- **Wait Time** (`CS-046`)
  - Type: `number`
  - Required: Yes
  - Description: Duration of wait

- **Number of Clients Waiting** (`CS-047`)
  - Type: `number`
  - Required: No
  - Description: Queue length

- **Staff Present** (`CS-048`)
  - Type: `number`
  - Required: No
  - Description: Staff count

- **Client Requirement** (`CS-049`)
  - Type: `text`
  - Required: Yes
  - Description: Purpose of seeking assistance

- **Eventually Assisted** (`CS-050`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether client got help
  - Options: Yes, No

- **Client Left Without Assistance** (`CS-051`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether client gave up waiting
  - Options: Yes, No

### Staff Knowledge (Customer Service)

**15 fields:**

- **Staff Member** (`CS-KNOW-001`)
  - Type: `dropdown`
  - Required: No
  - Description: Which staff member

- **Knowledge Gap Area** (`CS-KNOW-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: What they didn't know
  - Options: Class Details, Membership Packages, Billing/Credits, Studio Policies, Instructor Schedules ... (7 total)

- **Client Query** (`CS-KNOW-003`)
  - Type: `text`
  - Required: Yes
  - Description: What was the client's question

- **Incorrect Information Given** (`CS-KNOW-004`)
  - Type: `checkbox`
  - Required: Yes
  - Description: Did staff give wrong info

- **Incorrect Info Details** (`CS-KNOW-005`)
  - Type: `text`
  - Required: No
  - Description: What incorrect info was given

- **Correct Info Provided Later** (`CS-KNOW-006`)
  - Type: `checkbox`
  - Required: No
  - Description: Was it corrected

- **Client Had to Contact Multiple Staff** (`CS-KNOW-007`)
  - Type: `checkbox`
  - Required: No
  - Description: Did client get passed around

- **Knowledge Gap Type** (`CS-035`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of knowledge gap
  - Options: Class Information Lacking, Membership Details Unknown, Unable to Guide on Packages, Incorrect Policy Information, Doesn't Know System Process ... (7 total)

- **Topic Client Asked About** (`CS-036`)
  - Type: `text`
  - Required: Yes
  - Description: Subject of inquiry

- **Information Given** (`CS-037`)
  - Type: `text`
  - Required: Yes
  - Description: Response provided

- **Correct Information** (`CS-038`)
  - Type: `text`
  - Required: Yes
  - Description: Accurate information

- **Associate Involved** (`CS-039`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Who provided information
  - Options: Akshay Rane, Vahishta Fitter, Zaheer Agarbattiwala, Zahur Shaikh, Nadiya Shaikh ... (18 total)

- **Staff Admitted Uncertainty** (`CS-040`)
  - Type: `radio`
  - Required: No
  - Description: Whether staff acknowledged not knowing
  - Options: Yes, No

- **Offered to Find Out** (`CS-041`)
  - Type: `radio`
  - Required: No
  - Description: Whether staff offered to get info
  - Options: Yes, No

- **Client Got Correct Info Eventually** (`CS-042`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether issue was rectified
  - Options: Yes, No

### Staff Professionalism (Customer Service)

**14 fields:**

- **Staff Member** (`CS-PROF-001`)
  - Type: `dropdown`
  - Required: No
  - Description: Which staff member

- **Issue Type** (`CS-PROF-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Professional conduct issue
  - Options: Gossiping, Using Personal Phone, Eating at Desk, Inappropriate Conversation, Unprofessional Attire ... (6 total)

- **Incident Details** (`CS-PROF-003`)
  - Type: `textarea`
  - Required: Yes
  - Description: What happened

- **Client Impact** (`CS-PROF-004`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How it affected client
  - Options: Overheard by Client, Client Had to Wait, Client Felt Uncomfortable, No Direct Impact

- **Witness Present** (`CS-PROF-005`)
  - Type: `dropdown`
  - Required: No
  - Description: Anyone else see this
  - Options: Yes - Staff, Yes - Other Client, No

- **Addressed Immediately** (`CS-PROF-006`)
  - Type: `checkbox`
  - Required: No
  - Description: Was staff spoken to on spot

- **Professionalism Issue Type** (`CS-080`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of unprofessional behavior
  - Options: Staff Gossiping, Using Personal Phone, Eating at Desk, Inappropriate Conversations, Unprofessional Attire ... (7 total)

- **Behavior Description** (`CS-081`)
  - Type: `textarea`
  - Required: Yes
  - Description: What happened

- **Associate Involved** (`CS-082`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Who was involved
  - Options: Akshay Rane, Vahishta Fitter, Zaheer Agarbattiwala, Zahur Shaikh, Nadiya Shaikh ... (18 total)

- **Client Directly Impacted** (`CS-083`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether behavior affected client
  - Options: Yes, No

- **Impact Description** (`CS-084`)
  - Type: `text`
  - Required: No
  - Description: Nature of impact

- **Others Present** (`CS-085`)
  - Type: `radio`
  - Required: No
  - Description: Were other clients there
  - Options: Yes, No

- **Client Spoke to Staff About It** (`CS-086`)
  - Type: `radio`
  - Required: No
  - Description: Whether client addressed it
  - Options: Yes, No

- **Staff Response** (`CS-087`)
  - Type: `text`
  - Required: No
  - Description: Staff reaction

### N/A (Global)

**17 fields:**

- **Ticket ID** (`GLB-001`)
  - Type: `readonly`
  - Required: Yes
  - Description: Unique ticket reference number

- **Date & Time of Incident** (`GLB-002`)
  - Type: `datetime`
  - Required: Yes
  - Description: When the issue occurred

- **Reported By** (`GLB-004`)
  - Type: `text`
  - Required: Yes
  - Description: Name of team member creating ticket

- **Associate Handling** (`GLB-005`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Associate who initially handled the issue
  - Options: Akshay Rane, Vahishta Fitter, Zaheer Agarbattiwala, Zahur Shaikh, Nadiya Shaikh ... (16 total)

- **Client Name** (`GLB-006`)
  - Type: `text`
  - Required: Yes
  - Description: Full name of the client

- **Client Phone** (`GLB-007`)
  - Type: `text`
  - Required: Yes
  - Description: Client contact number

- **Client Email** (`GLB-008`)
  - Type: `email`
  - Required: Yes
  - Description: Client email address

- **Client Status** (`GLB-009`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Current status of the client
  - Options: Existing Active, Existing Inactive, New Prospect, Trial Client, Guest (Hosted Class)

- **Location** (`GLB-010`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Studio location where issue occurred
  - Options: Kwality House Kemps Corner, Kenkre House, South United Football Club, Supreme HQ Bandra, WeWork Prestige Central ... (8 total)

- **Priority Level** (`GLB-011`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Urgency of issue resolution
  - Options: Low (log only), Medium (48hrs), High (24hrs), Critical (immediate)

- **Department Routing** (`GLB-012`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Department responsible for resolution
  - Options: Operations, Facilities, Training, Sales, Client Success ... (8 total)

- **Issue Status** (`GLB-013`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Current status of the ticket
  - Options: Open, In Progress, Pending Client, Resolved, Closed

- **Client Sentiment** (`GLB-014`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Client's emotional state during interaction
  - Options: Very Upset, Frustrated, Neutral, Satisfied, Delighted

- **Follow-up Required** (`GLB-015`)
  - Type: `radio`
  - Required: Yes
  - Description: Does this issue need follow-up contact?
  - Options: Yes, No

- **Follow-up Date** (`GLB-016`)
  - Type: `date`
  - Required: No
  - Description: When to follow up with client

- **Resolution Notes** (`GLB-017`)
  - Type: `textarea`
  - Required: No
  - Description: Actions taken and resolution provided

- **Attachments** (`GLB-018`)
  - Type: `file`
  - Required: No
  - Description: Supporting evidence or documentation

### Air Quality (Health & Safety)

**33 fields:**

- **Issue Type** (`HS-AIR-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Air quality issue type
  - Options: Poor Ventilation, Strong Odors, Chemical Smell, Stuffy Environment, Dust ... (6 total)

- **Area Affected** (`HS-AIR-002`)
  - Type: `multiselect`
  - Required: Yes
  - Description: Where is the issue
  - Options: Studio Floor, Changing Room, Washroom, Reception, Entire Facility

- **Odor Source** (`HS-AIR-003`)
  - Type: `dropdown`
  - Required: No
  - Description: What's causing the smell
  - Options: Cleaning Products, Mold/Mildew, Sewage, Sweat/Body Odor, Unknown ... (6 total)

- **Observed During** (`HS-AIR-004`)
  - Type: `dropdown`
  - Required: Yes
  - Description: When is it noticeable
  - Options: Morning Classes, Afternoon Classes, Evening Classes, All Day

- **Class** (`HS-AIR-005`)
  - Type: `dropdown`
  - Required: No
  - Description: Specific class if applicable

- **Class Date & Time** (`HS-AIR-006`)
  - Type: `datetime`
  - Required: Yes
  - Description: When observed

- **Temperature** (`HS-AIR-007`)
  - Type: `dropdown`
  - Required: No
  - Description: Temperature at the time
  - Options: Too Hot, Too Cold, Normal

- **AC/Ventilation On** (`HS-AIR-008`)
  - Type: `checkbox`
  - Required: No
  - Description: Was system running

- **Client Health Impact** (`HS-AIR-009`)
  - Type: `dropdown`
  - Required: No
  - Description: How it affected client
  - Options: None, Mild Discomfort, Breathing Difficulty, Headache, Nausea ... (6 total)

- **Multiple Clients Affected** (`HS-AIR-010`)
  - Type: `checkbox`
  - Required: No
  - Description: Did others complain too

- **Immediate Action Taken** (`HS-AIR-011`)
  - Type: `textarea`
  - Required: Yes
  - Description: What was done

- **Facilities Team Notified** (`HS-AIR-012`)
  - Type: `checkbox`
  - Required: Yes
  - Description: Was maintenance informed

- **Air Quality Issue Type** (`HS-065`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of air quality issue
  - Options: Poor Ventilation, Strong Odors, Chemical Smells, Stuffy Environment, Mold/Mildew Smell ... (9 total)

- **Specific Concern** (`HS-066`)
  - Type: `textarea`
  - Required: Yes
  - Description: Description of issue

- **Area Affected** (`HS-067`)
  - Type: `multiselect`
  - Required: Yes
  - Description: Where issue present
  - Options: Studio Floor, Change Rooms, Showers, Restrooms, Waiting Area ... (6 total)

- **When Noticed** (`HS-068`)
  - Type: `dropdown`
  - Required: Yes
  - Description: When detected
  - Options: Upon Entry, During Class, After Class, Throughout Visit

- **Class Attended** (`HS-069`)
  - Type: `dropdown`
  - Required: No
  - Description: Associated class
  - Options: Studio Barre 57, Studio Foundations, Studio Barre 57 Express, Studio Cardio Barre, Studio FIT ... (25 total)

- **Temperature Issue** (`HS-070`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Temperature comfort
  - Options: Too Hot, Too Cold, Fluctuating, Not Applicable

- **Health Impact** (`HS-071`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Effect on client
  - Options: No Impact, Mild Discomfort, Breathing Difficulty, Headache, Nausea ... (7 total)

- **Ventilation System Operating** (`HS-072`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether AC/ventilation on
  - Options: Yes, No, Unclear

- **Windows/Doors Open** (`HS-073`)
  - Type: `radio`
  - Required: No
  - Description: Natural ventilation
  - Options: Yes, No, N/A

- **Reported to Staff** (`HS-074`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether staff informed
  - Options: Yes, No

- **Staff Response** (`HS-075`)
  - Type: `text`
  - Required: No
  - Description: Staff action

- **Issue Persistent** (`HS-076`)
  - Type: `radio`
  - Required: Yes
  - Description: Frequency of issue
  - Options: First Time Noticed, Recurring Issue, Ongoing Problem

- **Air Quality Issue** (`HS_AIR_001`)
  - Type: `multiselect`
  - Required: Yes
  - Description: What air quality issue exists
  - Options: Poor ventilation, Stuffy/stale air, Strong chemical smells, Cleaning product odors, Mold/mildew smell ... (8 total)

- **Area Affected** (`HS_AIR_002`)
  - Type: `multiselect`
  - Required: Yes
  - Description: Where is air quality poor
  - Options: Main studio, Second studio, Bathrooms, Changing rooms, Reception ... (7 total)

- **Time of Day** (`HS_AIR_003`)
  - Type: `text`
  - Required: No
  - Description: When is issue most noticeable

- **Client Complaints Received** (`HS_AIR_004`)
  - Type: `radio`
  - Required: Yes
  - Description: Have clients reported this

- **Number of Complaints** (`HS_AIR_005`)
  - Type: `number`
  - Required: No
  - Description: Volume of complaints

- **HVAC System Status** (`HS_AIR_006`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Status of ventilation system
  - Options: Working normally, Not working, Partially working, Unknown

- **Temperature Reading** (`HS_AIR_007`)
  - Type: `number`
  - Required: No
  - Description: Actual temperature if relevant

- **Health Impact Observed** (`HS_AIR_008`)
  - Type: `multiselect`
  - Required: No
  - Description: Physical symptoms reported
  - Options: None, Difficulty breathing, Headaches, Nausea, Eye irritation ... (7 total)

- **Immediate Action Taken** (`HS_AIR_009`)
  - Type: `textarea`
  - Required: No
  - Description: Steps taken to improve air quality

### COVID/Health Protocols (Health & Safety)

**25 fields:**

- **Issue Type** (`HS-COVID-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Health protocol issue
  - Options: Not Following Guidelines, No Temperature Checks, Overcrowding Beyond Capacity, No Social Distancing, Other

- **Current Protocol in Place** (`HS-COVID-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: What protocols should be followed
  - Options: Temperature Checks, Capacity Limits, Mask Requirements, Social Distancing, Enhanced Cleaning ... (6 total)

- **Protocol Not Followed** (`HS-COVID-003`)
  - Type: `multiselect`
  - Required: Yes
  - Description: Which protocols were violated

- **Class** (`HS-COVID-004`)
  - Type: `dropdown`
  - Required: No
  - Description: Which class if applicable

- **Class Date & Time** (`HS-COVID-005`)
  - Type: `datetime`
  - Required: Yes
  - Description: When observed

- **Number of People Present** (`HS-COVID-006`)
  - Type: `number`
  - Required: No
  - Description: How many in studio

- **Maximum Capacity** (`HS-COVID-007`)
  - Type: `number`
  - Required: No
  - Description: What's the limit

- **Staff Responsible** (`HS-COVID-008`)
  - Type: `dropdown`
  - Required: No
  - Description: Who should have enforced

- **Client Concern Level** (`HS-COVID-009`)
  - Type: `dropdown`
  - Required: No
  - Description: How concerned was client
  - Options: Low, Medium, High, Refused to Attend

- **Corrective Action** (`HS-COVID-010`)
  - Type: `textarea`
  - Required: Yes
  - Description: What was done

- **Protocol Issue Type** (`HS-035`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of protocol violation
  - Options: Not Following Current Guidelines, No Temperature Checks, Overcrowding, Social Distancing Not Maintained, Mask Policy Not Enforced ... (7 total)

- **Current Health Guidelines Applicable** (`HS-036`)
  - Type: `text`
  - Required: Yes
  - Description: Expected protocols

- **Observed Violation** (`HS-037`)
  - Type: `textarea`
  - Required: Yes
  - Description: Specific violation details

- **Class Attended** (`HS-038`)
  - Type: `dropdown`
  - Required: No
  - Description: Associated class
  - Options: Studio Barre 57, Studio Foundations, Studio Barre 57 Express, Studio Cardio Barre, Studio FIT ... (25 total)

- **Number of People in Class** (`HS-039`)
  - Type: `number`
  - Required: Yes
  - Description: Class size

- **Studio Capacity Limit** (`HS-040`)
  - Type: `number`
  - Required: Yes
  - Description: Capacity limit

- **Staff Enforcing Protocols** (`HS-041`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether staff monitoring
  - Options: Yes - Strictly, Yes - Loosely, No

- **Client Raised Concern with Staff** (`HS-042`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether reported on-site
  - Options: Yes, No

- **Staff Response** (`HS-043`)
  - Type: `text`
  - Required: No
  - Description: Staff action taken

- **Protocol Violation Type** (`HS_COV_001`)
  - Type: `multiselect`
  - Required: Yes
  - Description: Which protocols were not followed
  - Options: No temperature checks conducted, Overcrowding beyond capacity, Inadequate spacing between clients, Mask policy not enforced, Symptomatic person allowed entry ... (7 total)

- **Class/Session Affected** (`HS_COV_002`)
  - Type: `dropdown`
  - Required: No
  - Description: Which class had protocol issues

- **Number of People Present** (`HS_COV_003`)
  - Type: `number`
  - Required: No
  - Description: How many people were in space

- **Studio Capacity Limit** (`HS_COV_004`)
  - Type: `number`
  - Required: No
  - Description: What is the capacity limit

- **Immediate Action Taken** (`HS_COV_005`)
  - Type: `textarea`
  - Required: Yes
  - Description: Steps taken to address violation

- **Staff Member Responsible** (`HS_COV_006`)
  - Type: `text`
  - Required: No
  - Description: Who was managing check-in/protocols

### Emergency Preparedness (Health & Safety)

**23 fields:**

- **Issue Type** (`HS-EMER-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Emergency prep issue
  - Options: No Fire Exit Signs, Missing First Aid Kit, No Emergency Protocol, Blocked Emergency Exit, No Fire Extinguisher ... (6 total)

- **Specific Location** (`HS-EMER-002`)
  - Type: `text`
  - Required: Yes
  - Description: Where in the studio

- **Safety Equipment Missing** (`HS-EMER-003`)
  - Type: `multiselect`
  - Required: No
  - Description: What is missing

- **Observed By** (`HS-EMER-004`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Who noticed this
  - Options: Client, Staff, Instructor, Inspector

- **Safety Risk Level** (`HS-EMER-005`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How serious is the risk
  - Options: Low, Medium, High, Critical

- **Immediate Correction Possible** (`HS-EMER-006`)
  - Type: `checkbox`
  - Required: No
  - Description: Can this be fixed immediately

- **Action Taken** (`HS-EMER-007`)
  - Type: `textarea`
  - Required: Yes
  - Description: What was done

- **Facilities Team Notified** (`HS-EMER-008`)
  - Type: `checkbox`
  - Required: Yes
  - Description: Was facilities team informed

- **Compliance Issue** (`HS-EMER-009`)
  - Type: `checkbox`
  - Required: No
  - Description: Is this a legal/code violation

- **Emergency Prep Issue Type** (`HS-027`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of preparedness issue
  - Options: Fire Exits Not Marked, Fire Extinguisher Missing/Expired, First Aid Kit Missing, No Emergency Protocols Visible, Emergency Lighting Not Working ... (8 total)

- **Specific Issue** (`HS-028`)
  - Type: `textarea`
  - Required: Yes
  - Description: What is missing/wrong

- **Location in Studio** (`HS-029`)
  - Type: `text`
  - Required: Yes
  - Description: Specific location

- **Safety Equipment Affected** (`HS-030`)
  - Type: `multiselect`
  - Required: Yes
  - Description: Which safety items
  - Options: Fire Extinguisher, First Aid Kit, AED, Emergency Exits, Emergency Lighting ... (8 total)

- **Immediate Risk** (`HS-031`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Level of urgency
  - Options: Critical - High Risk, Moderate - Should Be Addressed Soon, Low - Precautionary

- **Staff Aware of Issue** (`HS-032`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether team knows
  - Options: Yes, No

- **Client Concern** (`HS-033`)
  - Type: `text`
  - Required: Yes
  - Description: Client's safety concern

- **Photo Evidence** (`HS-034`)
  - Type: `radio`
  - Required: No
  - Description: Supporting images
  - Options: Yes - Attached, No

- **Emergency Preparedness Issue** (`HS_EMP_001`)
  - Type: `multiselect`
  - Required: Yes
  - Description: What emergency preparedness gap exists
  - Options: Fire exits blocked/unmarked, Emergency lighting not functional, First aid kit missing/depleted, Fire extinguisher missing/expired, No emergency protocol displayed ... (8 total)

- **Specific Location of Issue** (`HS_EMP_002`)
  - Type: `text`
  - Required: Yes
  - Description: Where exactly is the issue

- **Photographic Evidence** (`HS_EMP_003`)
  - Type: `file`
  - Required: No
  - Description: Visual documentation

- **Risk Level Assessment** (`HS_EMP_004`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Staff assessment of risk severity
  - Options: Low - Minor gap, Medium - Notable concern, High - Serious safety risk, Critical - Immediate hazard

- **Immediate Action Taken** (`HS_EMP_005`)
  - Type: `textarea`
  - Required: No
  - Description: What was done to mitigate immediately

- **Regulatory Compliance Issue** (`HS_EMP_006`)
  - Type: `radio`
  - Required: No
  - Description: Does this violate safety regulations

### Equipment Safety (Health & Safety)

**21 fields:**

- **Equipment Type** (`HS-EQUIP-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: What equipment
  - Options: Weights, Resistance Bands, Mat, Barre, Ball ... (7 total)

- **Issue Type** (`HS-EQUIP-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Safety issue type
  - Options: Unsafe/Damaged, No Safety Check, Sharp Edges, Unstable, Broken ... (7 total)

- **Equipment ID/Description** (`HS-EQUIP-003`)
  - Type: `text`
  - Required: No
  - Description: Specific equipment identifier

- **Equipment Issue Type** (`HS-055`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of equipment issue
  - Options: Unsafe/Damaged Equipment, No Safety Checks Visible, Sharp Edges, Unstable Props, Equipment Malfunction ... (8 total)

- **Equipment Type** (`HS-056`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Which equipment
  - Options: Free Weights, Resistance Bands, Exercise Balls, Barre, Reformer ... (10 total)

- **Specific Equipment Details** (`HS-057`)
  - Type: `text`
  - Required: Yes
  - Description: Equipment identification

- **Safety Concern Description** (`HS-058`)
  - Type: `textarea`
  - Required: Yes
  - Description: What makes it unsafe

- **Injury Occurred** (`HS-059`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether someone got hurt
  - Options: Yes, No - Precautionary

- **Injury Details** (`HS-060`)
  - Type: `text`
  - Required: No
  - Description: Injury information

- **Equipment In Use** (`HS-061`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether being used
  - Options: Yes - During Class, No - Discovered Before Use

- **Reported to Trainer/Staff** (`HS-062`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether staff informed
  - Options: Yes, No

- **Equipment Removed from Use** (`HS-063`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether taken out of service
  - Options: Yes, No, Don't Know

- **Photo Evidence** (`HS-064`)
  - Type: `radio`
  - Required: No
  - Description: Supporting images
  - Options: Yes - Attached, No

- **Equipment Type** (`HS_EQP_001`)
  - Type: `multiselect`
  - Required: Yes
  - Description: Which equipment has safety issues
  - Options: Barres, Mats, Weights, Resistance bands, Balls ... (10 total)

- **Safety Issue** (`HS_EQP_002`)
  - Type: `multiselect`
  - Required: Yes
  - Description: What is the safety concern
  - Options: Broken/damaged, Sharp edges, Unstable/wobbly, Worn out, Missing parts ... (8 total)

- **Equipment ID/Number** (`HS_EQP_003`)
  - Type: `text`
  - Required: No
  - Description: Identifier for specific equipment

- **Photographic Evidence** (`HS_EQP_004`)
  - Type: `file`
  - Required: No
  - Description: Visual documentation of issue

- **Has This Caused Injury** (`HS_EQP_005`)
  - Type: `radio`
  - Required: Yes
  - Description: Did someone get hurt

- **Equipment Removed from Use** (`HS_EQP_006`)
  - Type: `radio`
  - Required: Yes
  - Description: Was it taken out of circulation

- **Last Safety Check Date** (`HS_EQP_007`)
  - Type: `date`
  - Required: No
  - Description: Date of last safety inspection

- **Immediate Action Taken** (`HS_EQP_008`)
  - Type: `textarea`
  - Required: Yes
  - Description: What was done immediately

### Hygiene Protocols (Health & Safety)

**26 fields:**

- **Issue Type** (`HS-HYG-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Hygiene issue type
  - Options: Inadequate Sanitization, No Mask Enforcement, Poor Surface Cleaning, Unclean Equipment, Other

- **Area Affected** (`HS-HYG-002`)
  - Type: `multiselect`
  - Required: Yes
  - Description: Where was hygiene issue
  - Options: Studio Floor, Equipment, Changing Room, Washroom, Reception ... (7 total)

- **Specific Equipment** (`HS-HYG-003`)
  - Type: `text`
  - Required: No
  - Description: Which equipment if applicable

- **Class Time** (`HS-HYG-004`)
  - Type: `datetime`
  - Required: Yes
  - Description: When was this observed

- **Observed By** (`HS-HYG-005`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Who noticed the issue
  - Options: Client, Staff, Instructor

- **Sanitization Frequency** (`HS-HYG-006`)
  - Type: `dropdown`
  - Required: No
  - Description: Issue with cleaning schedule
  - Options: Not Done, Insufficient, Not After Each Class, Other

- **Immediate Action Taken** (`HS-HYG-007`)
  - Type: `textarea`
  - Required: Yes
  - Description: What was done immediately

- **Staff Notified** (`HS-HYG-008`)
  - Type: `checkbox`
  - Required: Yes
  - Description: Was cleaning staff informed

- **Photo Evidence** (`HS-HYG-009`)
  - Type: `checkbox`
  - Required: No
  - Description: Was photo taken

- **Hygiene Issue Type** (`HS-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of hygiene concern
  - Options: Inadequate Sanitization, No Mask Enforcement, Surface Cleaning Poor, Dirty Equipment, Restroom Hygiene ... (8 total)

- **Area Affected** (`HS-002`)
  - Type: `multiselect`
  - Required: Yes
  - Description: Where issue observed
  - Options: Studio Floor, Equipment, Restrooms, Showers, Change Rooms ... (10 total)

- **Specific Observation** (`HS-003`)
  - Type: `textarea`
  - Required: Yes
  - Description: What was observed

- **Time of Observation** (`HS-004`)
  - Type: `dropdown`
  - Required: Yes
  - Description: When observed
  - Options: Before Class, During Class, After Class, Between Classes, Off-Peak Hours

- **Class Attended** (`HS-005`)
  - Type: `dropdown`
  - Required: No
  - Description: Associated class if any
  - Options: Studio Barre 57, Studio Foundations, Studio Barre 57 Express, Studio Cardio Barre, Studio FIT ... (25 total)

- **Cleaning Staff Visible** (`HS-006`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether cleaning happening
  - Options: Yes, No

- **Sanitization Supplies Available** (`HS-007`)
  - Type: `radio`
  - Required: Yes
  - Description: Hand sanitizer/wipes present
  - Options: Yes, No, Limited

- **Issue Reported to Staff** (`HS-008`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether client informed staff
  - Options: Yes, No

- **Immediate Action Taken** (`HS-009`)
  - Type: `text`
  - Required: No
  - Description: Staff response

- **Photo Evidence** (`HS-010`)
  - Type: `radio`
  - Required: No
  - Description: Whether photos provided
  - Options: Yes - Attached, No

- **Hygiene Issue Type** (`HS_HYG_001`)
  - Type: `multiselect`
  - Required: Yes
  - Description: Specific hygiene concerns observed
  - Options: Inadequate surface cleaning, Equipment not sanitized, Bathrooms/showers uncleaned, Cleaning supplies depleted, Visible dirt/grime ... (7 total)

- **Area Affected** (`HS_HYG_002`)
  - Type: `multiselect`
  - Required: Yes
  - Description: Which areas have hygiene issues
  - Options: Studio floor, Bathrooms, Showers, Changing rooms, Reception ... (8 total)

- **Class Time/Session** (`HS_HYG_003`)
  - Type: `text`
  - Required: No
  - Description: When was the issue observed

- **Photographic Evidence** (`HS_HYG_004`)
  - Type: `file`
  - Required: No
  - Description: Visual documentation of issue

- **Client Complaint Received** (`HS_HYG_005`)
  - Type: `radio`
  - Required: Yes
  - Description: Did a client report this directly?

- **Immediate Action Taken** (`HS_HYG_006`)
  - Type: `textarea`
  - Required: No
  - Description: What was done immediately to address

- **Cleaning Staff on Duty** (`HS_HYG_007`)
  - Type: `text`
  - Required: No
  - Description: Who was responsible for cleaning at time

### Injury During Class (Health & Safety)

**51 fields:**

- **Injured Person** (`HS-INJ-001`)
  - Type: `text`
  - Required: Yes
  - Description: Who was injured

- **Injured Person Contact** (`HS-INJ-002`)
  - Type: `tel`
  - Required: Yes
  - Description: Contact number

- **Class** (`HS-INJ-003`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Which class

- **Instructor** (`HS-INJ-004`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Instructor teaching

- **Class Date & Time** (`HS-INJ-005`)
  - Type: `datetime`
  - Required: Yes
  - Description: When injury occurred

- **Injury Type** (`HS-INJ-006`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of injury
  - Options: Muscle Strain, Sprain, Fall, Equipment-Related, Collision with Another Client ... (7 total)

- **Body Part Affected** (`HS-INJ-007`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Where on body
  - Options: Head, Neck, Shoulder, Arm, Hand ... (12 total)

- **Injury Severity** (`HS-INJ-008`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How severe
  - Options: Minor (continued class), Moderate (stopped class), Serious (medical attention needed), Critical (emergency services)

- **Cause of Injury** (`HS-INJ-009`)
  - Type: `textarea`
  - Required: Yes
  - Description: What caused the injury

- **Pre-existing Condition** (`HS-INJ-010`)
  - Type: `checkbox`
  - Required: No
  - Description: Did client have prior injury

- **Pre-existing Condition Details** (`HS-INJ-011`)
  - Type: `text`
  - Required: No
  - Description: Details of prior condition

- **First Aid Administered** (`HS-INJ-012`)
  - Type: `checkbox`
  - Required: Yes
  - Description: Was first aid given

- **First Aid Details** (`HS-INJ-013`)
  - Type: `textarea`
  - Required: No
  - Description: What first aid was provided

- **Medical Professional Called** (`HS-INJ-014`)
  - Type: `checkbox`
  - Required: Yes
  - Description: Was doctor/ambulance called

- **Incident Report Filed** (`HS-INJ-015`)
  - Type: `checkbox`
  - Required: Yes
  - Description: Was formal report created

- **Witness Present** (`HS-INJ-016`)
  - Type: `multiselect`
  - Required: No
  - Description: Who witnessed
  - Options: Instructor, Other Clients, Staff, None

- **Witness Details** (`HS-INJ-017`)
  - Type: `text`
  - Required: No
  - Description: Witness information

- **Client Continued Class** (`HS-INJ-018`)
  - Type: `checkbox`
  - Required: No
  - Description: Did they finish class

- **Follow-up Required** (`HS-INJ-019`)
  - Type: `checkbox`
  - Required: Yes
  - Description: Does client need follow-up

- **Management Notified** (`HS-INJ-020`)
  - Type: `checkbox`
  - Required: Yes
  - Description: Was management informed

- **Injury Type** (`HS-011`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of injury
  - Options: Muscle Strain, Joint Pain, Fall/Slip, Equipment Related, Overexertion ... (7 total)

- **Injury Severity** (`HS-012`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How serious
  - Options: Minor - No Medical Attention, Moderate - First Aid Given, Serious - Medical Attention Sought, Severe - Emergency Services Called

- **Body Part Affected** (`HS-013`)
  - Type: `text`
  - Required: Yes
  - Description: Location of injury

- **Class Type** (`HS-014`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Which class
  - Options: Studio Barre 57, Studio Foundations, Studio Barre 57 Express, Studio Cardio Barre, Studio FIT ... (24 total)

- **Class Date & Time** (`HS-015`)
  - Type: `datetime`
  - Required: Yes
  - Description: Injury timestamp

- **Trainer** (`HS-016`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Instructor
  - Options: Anisha Shah, Atulan Purohit, Karanvir Bhatia, Mrigakshi Jaiswal, Reshma Sharma ... (30 total)

- **How Injury Occurred** (`HS-017`)
  - Type: `textarea`
  - Required: Yes
  - Description: Incident details

- **Modification Offered** (`HS-018`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether trainer gave modifications
  - Options: Yes - Before Injury, Yes - After Injury, No

- **First Aid Provided** (`HS-019`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether first aid given
  - Options: Yes - Adequate, Yes - Inadequate, No

- **First Aid Kit Available** (`HS-020`)
  - Type: `radio`
  - Required: Yes
  - Description: First aid supplies present
  - Options: Yes, No, Don't Know

- **Medical Professional Consulted** (`HS-021`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether doctor seen
  - Options: Yes - Immediately, Yes - Later, No

- **Incident Report Completed** (`HS-022`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether formal report made
  - Options: Yes, No

- **Client Has Pre-existing Condition** (`HS-023`)
  - Type: `radio`
  - Required: Yes
  - Description: Medical history relevant
  - Options: Yes - Disclosed, Yes - Not Disclosed, No

- **Pre-existing Condition Details** (`HS-024`)
  - Type: `text`
  - Required: No
  - Description: Medical condition

- **Witness Present** (`HS-025`)
  - Type: `radio`
  - Required: No
  - Description: Others saw incident
  - Options: Yes, No

- **Witness Name** (`HS-026`)
  - Type: `text`
  - Required: No
  - Description: Witness identity

- **Injury Type** (`HS_INJ_001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of injury sustained
  - Options: Muscle strain, Joint pain, Fall/slip, Equipment-related, Dizziness/fainting ... (6 total)

- **Body Part Affected** (`HS_INJ_002`)
  - Type: `multiselect`
  - Required: Yes
  - Description: Which body part was injured
  - Options: Head, Neck, Shoulder, Back, Hip ... (9 total)

- **Class Type** (`HS_INJ_003`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Which class was in session
  - Options: Studio Barre 57, Studio Foundations, Studio Barre 57 Express, Studio Cardio Barre, Studio FIT ... (24 total)

- **Trainer Name** (`HS_INJ_004`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Instructor leading the class
  - Options: Anisha Shah, Atulan Purohit, Karanvir Bhatia, Mrigakshi Jaiswal, Reshma Sharma ... (30 total)

- **Time into Class** (`HS_INJ_005`)
  - Type: `text`
  - Required: No
  - Description: When during class did injury occur

- **First Aid Provided** (`HS_INJ_006`)
  - Type: `radio`
  - Required: Yes
  - Description: Was first aid administered

- **First Aid Details** (`HS_INJ_007`)
  - Type: `textarea`
  - Required: No
  - Description: What first aid was provided

- **Medical Attention Required** (`HS_INJ_008`)
  - Type: `radio`
  - Required: Yes
  - Description: Did client need/seek medical help

- **Incident Report Completed** (`HS_INJ_009`)
  - Type: `radio`
  - Required: Yes
  - Description: Was formal incident report filed

- **Client Had Disclosed Medical Condition** (`HS_INJ_010`)
  - Type: `radio`
  - Required: Yes
  - Description: Did client have known health issues

- **Medical Condition Details** (`HS_INJ_011`)
  - Type: `text`
  - Required: No
  - Description: What condition was disclosed

- **Trainer Aware of Condition** (`HS_INJ_012`)
  - Type: `radio`
  - Required: No
  - Description: Was trainer informed before class

- **Contributing Factors** (`HS_INJ_013`)
  - Type: `multiselect`
  - Required: No
  - Description: What may have contributed to injury
  - Options: Equipment malfunction, Floor surface, Overcrowding, Inadequate modification offered, Client error ... (6 total)

- **Witness Present** (`HS_INJ_014`)
  - Type: `radio`
  - Required: No
  - Description: Were there witnesses

- **Witness Names** (`HS_INJ_015`)
  - Type: `text`
  - Required: No
  - Description: Who witnessed the incident

### Medical Disclosure (Health & Safety)

**30 fields:**

- **Issue Type** (`HS-MED-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Medical disclosure issue
  - Options: Medical Form Not Collected, Disclosed Condition Ignored, No Medical Waiver, Staff Unaware of Condition, Other

- **Client Name** (`HS-MED-002`)
  - Type: `text`
  - Required: Yes
  - Description: Which client

- **Medical Condition** (`HS-MED-003`)
  - Type: `text`
  - Required: No
  - Description: What condition (general terms)

- **Condition Disclosed** (`HS-MED-004`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Was condition disclosed
  - Options: Yes - In Writing, Yes - Verbally, No

- **Date Disclosed** (`HS-MED-005`)
  - Type: `date`
  - Required: No
  - Description: When was it disclosed

- **Disclosed To** (`HS-MED-006`)
  - Type: `dropdown`
  - Required: No
  - Description: Who was told

- **Information in System** (`HS-MED-007`)
  - Type: `checkbox`
  - Required: Yes
  - Description: Is it in client profile

- **Instructor Informed** (`HS-MED-008`)
  - Type: `checkbox`
  - Required: No
  - Description: Does instructor know

- **Modifications Offered** (`HS-MED-009`)
  - Type: `checkbox`
  - Required: No
  - Description: Were alternatives provided

- **Incident Occurred** (`HS-MED-010`)
  - Type: `checkbox`
  - Required: Yes
  - Description: Did this lead to an incident

- **Action Required** (`HS-MED-011`)
  - Type: `textarea`
  - Required: Yes
  - Description: What needs to happen

- **Disclosure Issue Type** (`HS-044`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of disclosure issue
  - Options: Not Asked for Medical History, Health Form Not Collected, Disclosed Condition Ignored, No Follow-up on Medical Info, Trainer Not Informed of Condition ... (7 total)

- **Medical Information Status** (`HS-045`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Status of medical info
  - Options: Never Collected, Collected But Not Reviewed, Collected But Not Shared with Trainer, Incomplete Form, Other

- **Client Has Medical Condition** (`HS-046`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether client has condition
  - Options: Yes, No

- **Condition Type** (`HS-047`)
  - Type: `dropdown`
  - Required: No
  - Description: Category of condition
  - Options: Cardiovascular, Respiratory, Musculoskeletal, Pregnancy/Post-Partum, Neurological ... (9 total)

- **Condition Disclosed to Studio** (`HS-048`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether studio informed
  - Options: Yes - Verbally, Yes - In Writing, No

- **When Disclosed** (`HS-049`)
  - Type: `date`
  - Required: No
  - Description: Disclosure date

- **Trainer Awareness** (`HS-050`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether trainer knew
  - Options: Yes - Confirmed, Should Be But Unsure, No

- **Modifications Offered** (`HS-051`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether accommodations made
  - Options: Yes, No, Not Applicable

- **Safety Concern** (`HS-052`)
  - Type: `text`
  - Required: Yes
  - Description: Risk assessment

- **Incident Occurred** (`HS-053`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether something happened
  - Options: Yes, No - Precautionary Report

- **Incident Details** (`HS-054`)
  - Type: `textarea`
  - Required: No
  - Description: Incident description

- **Disclosure Issue Type** (`HS_MED_001`)
  - Type: `multiselect`
  - Required: Yes
  - Description: What medical disclosure issue occurred
  - Options: Client medical form not collected, Medical condition disclosed but ignored by trainer, No system to flag medical conditions, Medical information not accessible to trainer, Client condition discovered during class ... (6 total)

- **Medical Condition Involved** (`HS_MED_002`)
  - Type: `text`
  - Required: No
  - Description: What condition was relevant

- **Trainer Name** (`HS_MED_003`)
  - Type: `dropdown`
  - Required: No
  - Description: Trainer involved (if applicable)

- **When Was Condition Disclosed** (`HS_MED_004`)
  - Type: `dropdown`
  - Required: Yes
  - Description: When did client share information
  - Options: Before first class, During check-in, During class, After incident, Never disclosed

- **Was Information Documented** (`HS_MED_005`)
  - Type: `radio`
  - Required: Yes
  - Description: Is it in client's record

- **Trainer Had Access to Information** (`HS_MED_006`)
  - Type: `radio`
  - Required: No
  - Description: Could trainer see medical notes

- **Impact on Client** (`HS_MED_007`)
  - Type: `dropdown`
  - Required: Yes
  - Description: What was the consequence
  - Options: No impact, Minor discomfort, Injury/health incident, Client complaint, Other

- **System Improvement Needed** (`HS_MED_008`)
  - Type: `textarea`
  - Required: No
  - Description: What process changes are needed

### Feedback System (Miscellaneous)

**13 fields:**

- **Feedback System Issue** (`MS_FDB_001`)
  - Type: `multiselect`
  - Required: Yes
  - Description: What feedback system problem exists
  - Options: No way to provide feedback, Feedback form not working, Feedback not acknowledged, No response received, Response took too long ... (9 total)

- **Feedback Channel Used** (`MS_FDB_002`)
  - Type: `multiselect`
  - Required: Yes
  - Description: How did client try to give feedback
  - Options: In-person to staff, Email, Phone, Survey, Social media ... (8 total)

- **Original Feedback Topic** (`MS_FDB_003`)
  - Type: `dropdown`
  - Required: Yes
  - Description: What was feedback about
  - Options: Trainer, Class experience, Facilities, Billing, Customer service ... (8 total)

- **Original Feedback Date** (`MS_FDB_004`)
  - Type: `date`
  - Required: No
  - Description: When did client provide feedback

- **Response Received** (`MS_FDB_005`)
  - Type: `radio`
  - Required: Yes
  - Description: Was feedback acknowledged

- **Days Until Response** (`MS_FDB_006`)
  - Type: `number`
  - Required: No
  - Description: Response time

- **Quality of Response** (`MS_FDB_007`)
  - Type: `dropdown`
  - Required: No
  - Description: How was feedback handled
  - Options: Helpful and professional, Acknowledged but unhelpful, Dismissive, Defensive, No response ... (6 total)

- **Retaliation Concern** (`MS_FDB_008`)
  - Type: `radio`
  - Required: Yes
  - Description: Was there retaliation
  - Options: Yes - suspected, Yes - confirmed, No, N/A

- **Retaliation Details** (`MS_FDB_009`)
  - Type: `textarea`
  - Required: No
  - Description: What happened

- **Staff Member Involved** (`MS_FDB_010`)
  - Type: `dropdown`
  - Required: No
  - Description: Who handled feedback poorly

- **Client Current Status** (`MS_FDB_011`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How has this affected relationship
  - Options: Still active and satisfied, Active but frustrated, Considering leaving, Already left, Other

- **Detailed Description** (`MS_FDB_012`)
  - Type: `textarea`
  - Required: Yes
  - Description: Complete description

- **Improvement Suggestion** (`MS_FDB_013`)
  - Type: `textarea`
  - Required: No
  - Description: What would make this better

### Guest Experience (Miscellaneous)

**10 fields:**

- **Guest Name** (`MS_GST_001`)
  - Type: `text`
  - Required: Yes
  - Description: Who was the guest

- **Guest Type** (`MS_GST_002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of guest
  - Options: Hosted class guest, Trial/newcomer, Drop-in, Brought by member, Corporate/event guest ... (6 total)

- **Hosting Member** (`MS_GST_003`)
  - Type: `text`
  - Required: No
  - Description: Which member hosted (if applicable)

- **Issue Type** (`MS_GST_004`)
  - Type: `multiselect`
  - Required: Yes
  - Description: What was problematic
  - Options: Unwelcoming treatment, Complicated check-in process, Unclear policies, Different pricing than expected, Not given proper orientation ... (8 total)

- **Staff Member Involved** (`MS_GST_005`)
  - Type: `dropdown`
  - Required: No
  - Description: Who interacted with guest

- **Trainer Name** (`MS_GST_006`)
  - Type: `dropdown`
  - Required: No
  - Description: Which trainer led class

- **Guest Feedback** (`MS_GST_007`)
  - Type: `textarea`
  - Required: Yes
  - Description: Guest's comments

- **Likelihood to Return** (`MS_GST_008`)
  - Type: `dropdown`
  - Required: No
  - Description: Will they come back
  - Options: Will definitely return, Might return, Unlikely to return, Definitely not returning, Unknown

- **Likelihood to Purchase Membership** (`MS_GST_009`)
  - Type: `dropdown`
  - Required: No
  - Description: Conversion likelihood
  - Options: Interested, Considering, Not interested, Already purchased, Unknown

- **Detailed Incident Description** (`MS_GST_010`)
  - Type: `textarea`
  - Required: Yes
  - Description: Complete description

### Lost & Found (Miscellaneous)

**11 fields:**

- **Issue Type** (`MS_LST_001`)
  - Type: `radio`
  - Required: Yes
  - Description: Type of lost & found issue
  - Options: Item lost, Item found, Item claimed, System issue

- **Item Description** (`MS_LST_002`)
  - Type: `textarea`
  - Required: Yes
  - Description: What is the item

- **Item Category** (`MS_LST_003`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of item
  - Options: Clothing, Jewelry, Phone/electronics, Keys, Wallet/purse ... (8 total)

- **Date Lost/Found** (`MS_LST_004`)
  - Type: `date`
  - Required: Yes
  - Description: Date of loss/discovery

- **Location in Studio** (`MS_LST_005`)
  - Type: `text`
  - Required: No
  - Description: Specific location

- **Client Name** (`MS_LST_006`)
  - Type: `text`
  - Required: No
  - Description: Owner of item

- **Client Contact** (`MS_LST_007`)
  - Type: `text`
  - Required: No
  - Description: How to reach client

- **Lost & Found System Issue** (`MS_LST_008`)
  - Type: `multiselect`
  - Required: No
  - Description: What system problem exists
  - Options: No system in place, Items not logged, Items misplaced, No notification sent, Unable to find logged item ... (7 total)

- **Item Value** (`MS_LST_009`)
  - Type: `dropdown`
  - Required: No
  - Description: Approximate value
  - Options: Low value (<₹1000), Medium value (₹1000-5000), High value (>₹5000)

- **Action Taken** (`MS_LST_010`)
  - Type: `textarea`
  - Required: Yes
  - Description: Steps taken to resolve

- **Item Status** (`MS_LST_011`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Current status of item
  - Options: Still searching, Found and returned, Found awaiting claim, Not found, Donated/disposed ... (6 total)

### Multi-location Issues (Miscellaneous)

**11 fields:**

- **Issue Type** (`MS_MLT_001`)
  - Type: `multiselect`
  - Required: Yes
  - Description: What multi-location problem exists
  - Options: Credits not transferring, Package not valid at all locations, Different policies across studios, Booking confusion, Inconsistent pricing ... (9 total)

- **Locations Involved** (`MS_MLT_002`)
  - Type: `multiselect`
  - Required: Yes
  - Description: Which studios are involved

- **Package/Product Type** (`MS_MLT_003`)
  - Type: `dropdown`
  - Required: Yes
  - Description: What package/product

- **Detailed Issue Description** (`MS_MLT_004`)
  - Type: `textarea`
  - Required: Yes
  - Description: Complete description

- **Client Expectation** (`MS_MLT_005`)
  - Type: `textarea`
  - Required: Yes
  - Description: Client's understanding

- **Actual Result** (`MS_MLT_006`)
  - Type: `textarea`
  - Required: Yes
  - Description: Reality vs expectation

- **Communication Source** (`MS_MLT_007`)
  - Type: `dropdown`
  - Required: No
  - Description: Where did client get info
  - Options: Website, App, Staff member at location 1, Staff member at location 2, Email ... (7 total)

- **Technology/System Issue** (`MS_MLT_008`)
  - Type: `radio`
  - Required: Yes
  - Description: Is this a tech problem

- **System Details** (`MS_MLT_009`)
  - Type: `textarea`
  - Required: No
  - Description: Tech problem specifics

- **Client Impact** (`MS_MLT_010`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How was client affected
  - Options: Unable to book class, Lost credits, Financial loss, Scheduling disruption, Frustration only ... (6 total)

- **Resolution Required** (`MS_MLT_011`)
  - Type: `textarea`
  - Required: Yes
  - Description: How to fix this

### Noise Disturbance (Miscellaneous)

**10 fields:**

- **Noise Source** (`MS_NOI_001`)
  - Type: `multiselect`
  - Required: Yes
  - Description: Where is noise coming from
  - Options: Other studio classes, External construction, Street noise, Building maintenance, HVAC system ... (9 total)

- **Noise Level Impact** (`MS_NOI_002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Severity of disruption
  - Options: Minor distraction, Moderate disruption, Unable to hear instructor, Class had to pause, Class cancelled

- **Time of Occurrence** (`MS_NOI_003`)
  - Type: `text`
  - Required: Yes
  - Description: When does noise occur

- **Frequency** (`MS_NOI_004`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How often does this happen
  - Options: One-time, Occasional, Daily, Ongoing issue

- **Class Affected** (`MS_NOI_005`)
  - Type: `dropdown`
  - Required: No
  - Description: Which class was disrupted

- **Trainer Name** (`MS_NOI_006`)
  - Type: `dropdown`
  - Required: No
  - Description: Trainer who reported/experienced

- **Client Complaints** (`MS_NOI_007`)
  - Type: `radio`
  - Required: Yes
  - Description: Did clients complain

- **Number of Complaints** (`MS_NOI_008`)
  - Type: `number`
  - Required: No
  - Description: Volume of complaints

- **Immediate Action Taken** (`MS_NOI_009`)
  - Type: `textarea`
  - Required: No
  - Description: Steps taken immediately

- **Building Management Notified** (`MS_NOI_010`)
  - Type: `radio`
  - Required: No
  - Description: Was landlord/building informed

### Nutrition/Wellness Advice (Miscellaneous)

**7 fields:**

- **Issue Type** (`MS_NUT_001`)
  - Type: `multiselect`
  - Required: Yes
  - Description: What nutrition/wellness issue occurred
  - Options: Unqualified advice given, Conflicting information from different staff, Pushy supplement sales, Medical advice given inappropriately, Dietary restrictions ignored ... (7 total)

- **Staff Member/Trainer** (`MS_NUT_002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Who gave the advice

- **Topic of Advice** (`MS_NUT_003`)
  - Type: `multiselect`
  - Required: Yes
  - Description: What was advice about
  - Options: Supplements, Diet/meal plans, Weight loss, Medical condition, Injury recovery ... (8 total)

- **Advice Given** (`MS_NUT_004`)
  - Type: `textarea`
  - Required: Yes
  - Description: Details of advice provided

- **Credentials/Qualification** (`MS_NUT_005`)
  - Type: `text`
  - Required: No
  - Description: Advisor's qualifications

- **Client Impact** (`MS_NUT_006`)
  - Type: `multiselect`
  - Required: Yes
  - Description: How did this affect client
  - Options: No impact, Client confused, Client followed bad advice, Client experienced negative effects, Client complained ... (6 total)

- **Sales Pressure** (`MS_NUT_007`)
  - Type: `radio`
  - Required: Yes
  - Description: Was there pressure to buy products

### Policy Changes (Miscellaneous)

**10 fields:**

- **Policy Type** (`MS_POL_001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Which policy changed
  - Options: Cancellation policy, Booking policy, Pricing, Membership terms, Class packages ... (8 total)

- **Policy Change Description** (`MS_POL_002`)
  - Type: `textarea`
  - Required: Yes
  - Description: Details of new policy

- **Effective Date** (`MS_POL_003`)
  - Type: `date`
  - Required: Yes
  - Description: Implementation date

- **Communication Issue** (`MS_POL_004`)
  - Type: `multiselect`
  - Required: Yes
  - Description: What was the communication problem
  - Options: Not communicated at all, Communicated too late, Insufficient notice, Unclear communication, Only communicated to some clients ... (7 total)

- **Client Impact** (`MS_POL_005`)
  - Type: `multiselect`
  - Required: Yes
  - Description: How did this affect clients
  - Options: Financial impact, Scheduling disruption, Confusion, Frustration, Changed plans based on old policy ... (7 total)

- **Number of Clients Affected** (`MS_POL_006`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How many were impacted
  - Options: Single client, Few clients (2-5), Multiple clients (6-10), Many clients (10+), All clients

- **Client Feedback Summary** (`MS_POL_007`)
  - Type: `textarea`
  - Required: Yes
  - Description: Summary of client reactions

- **Policy Fairness Concern** (`MS_POL_008`)
  - Type: `radio`
  - Required: Yes
  - Description: Is policy itself unfair

- **Fairness Concern Details** (`MS_POL_009`)
  - Type: `textarea`
  - Required: No
  - Description: Explanation of fairness issue

- **Exception Requests** (`MS_POL_010`)
  - Type: `number`
  - Required: No
  - Description: Volume of exception requests

### Pricing (Retail & Merchandise)

**9 fields:**

- **Product/Service Name** (`RM_PRC_001`)
  - Type: `text`
  - Required: Yes
  - Description: Product or service with pricing issue

- **Pricing Issue** (`RM_PRC_002`)
  - Type: `multiselect`
  - Required: Yes
  - Description: What is the pricing concern
  - Options: Too expensive, No value for money, Price increased without notice, Hidden charges/fees, Price different than displayed ... (7 total)

- **Listed Price** (`RM_PRC_003`)
  - Type: `number`
  - Required: No
  - Description: What was the advertised price

- **Charged Price** (`RM_PRC_004`)
  - Type: `number`
  - Required: No
  - Description: What client was charged

- **Discrepancy Details** (`RM_PRC_005`)
  - Type: `textarea`
  - Required: No
  - Description: Why prices don't match

- **Client Expectation** (`RM_PRC_006`)
  - Type: `textarea`
  - Required: Yes
  - Description: Client's pricing expectation

- **Competitor Comparison** (`RM_PRC_007`)
  - Type: `text`
  - Required: No
  - Description: Competitor pricing reference

- **Resolution Offered** (`RM_PRC_008`)
  - Type: `textarea`
  - Required: No
  - Description: How was issue addressed

- **Client Satisfied with Resolution** (`RM_PRC_009`)
  - Type: `radio`
  - Required: No
  - Description: Was client happy with outcome

### Product Availability (Retail & Merchandise)

**9 fields:**

- **Product Requested** (`RM_AVL_001`)
  - Type: `text`
  - Required: Yes
  - Description: What product is unavailable

- **Product Category** (`RM_AVL_002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of product
  - Options: Apparel, Accessories, Equipment, Supplements/Wellness, Gift items ... (6 total)

- **Availability Issue** (`RM_AVL_003`)
  - Type: `multiselect`
  - Required: Yes
  - Description: Why is product unavailable
  - Options: Out of stock, Size unavailable, Color/variant unavailable, Limited selection, Discontinued ... (7 total)

- **Size/Variant Needed** (`RM_AVL_004`)
  - Type: `text`
  - Required: No
  - Description: What specifically is needed

- **Client Wait Time** (`RM_AVL_005`)
  - Type: `dropdown`
  - Required: No
  - Description: Client's urgency
  - Options: Willing to wait, Wants notification when available, Needs immediately, Already waited too long, Other

- **Frequency of Request** (`RM_AVL_006`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How often is this requested
  - Options: First time asking, Asked before, Multiple clients requesting, High demand item

- **Alternative Offered** (`RM_AVL_007`)
  - Type: `radio`
  - Required: Yes
  - Description: Was alternative suggested

- **Alternative Accepted** (`RM_AVL_008`)
  - Type: `radio`
  - Required: No
  - Description: Did client accept alternative

- **Stock Request Submitted** (`RM_AVL_009`)
  - Type: `radio`
  - Required: No
  - Description: Was restock request made

### Product Quality (Retail & Merchandise)

**3 fields:**

- **Product Name/Type** (`RM_QUA_001`)
  - Type: `text`
  - Required: Yes
  - Description: Which product has quality issues

- **Product Category** (`RM_QUA_002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of product
  - Options: Apparel, Accessories, Equipment, Supplements/Wellness, Gift items ... (6 total)

- **Quality Issue** (`RM_QUA_003`)
  - Type: `multiselect`
  - Required: No
  - Description: What is wrong with
  - Options: Defective/broken, Poor material quality, Sizing issues, Color/design defect, Stitching/construction problems ... (8 total)

### Return/Exchange (Retail & Merchandise)

**12 fields:**

- **Product Name** (`RM_RET_001`)
  - Type: `text`
  - Required: Yes
  - Description: What product is being returned

- **Purchase Date** (`RM_RET_002`)
  - Type: `date`
  - Required: Yes
  - Description: Original purchase date

- **Receipt Available** (`RM_RET_003`)
  - Type: `radio`
  - Required: Yes
  - Description: Does client have receipt

- **Receipt/Invoice Number** (`RM_RET_004`)
  - Type: `text`
  - Required: No
  - Description: Receipt identifier

- **Reason for Return** (`RM_RET_005`)
  - Type: `multiselect`
  - Required: Yes
  - Description: Why is product being returned
  - Options: Defective product, Wrong size, Wrong item, Changed mind, Quality issues ... (8 total)

- **Product Condition** (`RM_RET_006`)
  - Type: `dropdown`
  - Required: Yes
  - Description: State of product
  - Options: Unused with tags, Unused without tags, Gently used, Heavily used, Damaged

- **Client Request Type** (`RM_RET_007`)
  - Type: `radio`
  - Required: Yes
  - Description: What does client want
  - Options: Refund, Exchange, Store credit

- **Policy Issue** (`RM_RET_008`)
  - Type: `multiselect`
  - Required: No
  - Description: What's preventing return/exchange
  - Options: Outside return window, No receipt, Item used, Final sale item, Policy not clearly communicated ... (7 total)

- **Days Since Purchase** (`RM_RET_009`)
  - Type: `number`
  - Required: Yes
  - Description: How long ago was purchase

- **Exception Requested** (`RM_RET_010`)
  - Type: `radio`
  - Required: Yes
  - Description: Is client asking to override policy

- **Manager Approval** (`RM_RET_011`)
  - Type: `radio`
  - Required: No
  - Description: Has manager authorized exception

- **Resolution Provided** (`RM_RET_012`)
  - Type: `textarea`
  - Required: No
  - Description: How was this resolved

### Staff Knowledge (Retail & Merchandise)

**8 fields:**

- **Staff Member Name** (`RM_STF_001`)
  - Type: `dropdown`
  - Required: No
  - Description: Which staff member lacked knowledge

- **Knowledge Gap Type** (`RM_STF_002`)
  - Type: `multiselect`
  - Required: Yes
  - Description: What information was missing
  - Options: Product features, Sizing information, Pricing/promotions, Product availability, Return/exchange policy ... (9 total)

- **Product/Topic** (`RM_STF_003`)
  - Type: `text`
  - Required: Yes
  - Description: What was the question about

- **Client Experience Impact** (`RM_STF_004`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How did this affect client
  - Options: Minor inconvenience, Delayed purchase, Wrong purchase made, Client frustrated, Lost sale ... (6 total)

- **Incorrect Information Given** (`RM_STF_005`)
  - Type: `textarea`
  - Required: No
  - Description: Details of misinformation

- **Correct Information** (`RM_STF_006`)
  - Type: `textarea`
  - Required: No
  - Description: What was the correct answer

- **Training Need Identified** (`RM_STF_007`)
  - Type: `textarea`
  - Required: Yes
  - Description: What does staff need to learn

- **Issue Corrected** (`RM_STF_008`)
  - Type: `radio`
  - Required: Yes
  - Description: Was client given correct info later

### Aggressive Selling (Sales & Marketing)

**19 fields:**

- **Sales Staff Member** (`SM-AGG-001`)
  - Type: `dropdown`
  - Required: No
  - Description: Who contacted client

- **Issue Type** (`SM-AGG-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of aggressive selling
  - Options: Excessive Follow-ups, Pressure to Upgrade, Unwanted Sales Calls, Sales During Class Time, Hard Sell Tactics ... (6 total)

- **Contact Method** (`SM-AGG-003`)
  - Type: `multiselect`
  - Required: Yes
  - Description: How client was contacted
  - Options: Phone Calls, WhatsApp, Email, In-Person, SMS

- **Frequency** (`SM-AGG-004`)
  - Type: `dropdown`
  - Required: No
  - Description: How often contacted
  - Options: Daily, Multiple Times Daily, Weekly, After Each Class, Other

- **Product/Package Pushed** (`SM-AGG-005`)
  - Type: `dropdown`
  - Required: No
  - Description: What they were selling

- **Client Status** (`SM-AGG-006`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Client's membership status
  - Options: Existing Active, Existing Inactive, Trial Client, New Prospect

- **Client Requested to Stop** (`SM-AGG-007`)
  - Type: `checkbox`
  - Required: No
  - Description: Did client ask them to stop

- **Contact Continued After Request** (`SM-AGG-008`)
  - Type: `checkbox`
  - Required: No
  - Description: Did follow-ups continue anyway

- **Client Added to Do Not Contact** (`SM-AGG-009`)
  - Type: `checkbox`
  - Required: No
  - Description: Was preference updated

- **Aggressive Tactic Type** (`SM-011`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of aggressive approach
  - Options: Excessive Follow-ups, Pressure to Upgrade, Unwanted Sales Calls, Hard Sell During Trial, Multiple Calls Per Day ... (8 total)

- **Contact Method** (`SM-012`)
  - Type: `multiselect`
  - Required: Yes
  - Description: How client was contacted
  - Options: Phone Calls, WhatsApp Messages, Emails, SMS, In-Person ... (6 total)

- **Frequency of Contact** (`SM-013`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How often contacted
  - Options: Multiple Times Daily, Daily, Every Few Days, Weekly, One-Time But Intense

- **Total Contact Attempts** (`SM-014`)
  - Type: `number`
  - Required: Yes
  - Description: Contact count

- **Sales Associate** (`SM-015`)
  - Type: `dropdown`
  - Required: No
  - Description: Who was selling
  - Options: Akshay Rane, Vahishta Fitter, Zaheer Agarbattiwala, Zahur Shaikh, Nadiya Shaikh ... (18 total)

- **What Was Being Sold** (`SM-016`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Product being pushed
  - Options: Barre 1 month Unlimited, Studio 2 Week Unlimited, Studio Single Class, Session, Private Class ... (26 total)

- **Client Expressed Not Interested** (`SM-017`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether client declined
  - Options: Yes - Once, Yes - Multiple Times, No

- **Contact Continued After Decline** (`SM-018`)
  - Type: `radio`
  - Required: No
  - Description: Selling continued despite no
  - Options: Yes, No, N/A

- **Client Made Purchase** (`SM-019`)
  - Type: `radio`
  - Required: Yes
  - Description: Purchase outcome
  - Options: Yes - Under Pressure, Yes - Willingly, No

- **Client Wants to Be Removed from List** (`SM-020`)
  - Type: `radio`
  - Required: Yes
  - Description: Opt-out requested
  - Options: Yes, No

### Brand Communication (Sales & Marketing)

**14 fields:**

- **Issue Type** (`SM-BRAND-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Brand communication issue
  - Options: Inconsistent Messaging, Tone Mismatch, Cultural Insensitivity, Inappropriate Content, Confusing Branding ... (6 total)

- **Communication Channel** (`SM-BRAND-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Where issue was seen
  - Options: Social Media, Email, Website, In-Studio Signage, Print Material ... (6 total)

- **Specific Content** (`SM-BRAND-003`)
  - Type: `text`
  - Required: No
  - Description: What content was problematic

- **Issue Details** (`SM-BRAND-004`)
  - Type: `textarea`
  - Required: Yes
  - Description: Explain the issue

- **Cultural/Sensitivity Concern** (`SM-BRAND-005`)
  - Type: `checkbox`
  - Required: No
  - Description: Is this a sensitivity issue

- **Client Reaction** (`SM-BRAND-006`)
  - Type: `dropdown`
  - Required: No
  - Description: How client felt
  - Options: Offended, Confused, Disappointed, Concerned, Other

- **Flagged to Marketing Team** (`SM-BRAND-007`)
  - Type: `checkbox`
  - Required: Yes
  - Description: Was marketing team notified

- **Communication Issue Type** (`SM-073`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of communication issue
  - Options: Inconsistent Messaging, Tone Mismatch, Cultural Insensitivity, Confusing Brand Voice, Conflicting Information Across Channels ... (7 total)

- **Communication Channel** (`SM-074`)
  - Type: `multiselect`
  - Required: Yes
  - Description: Where issue appeared
  - Options: Website, Social Media, Email, SMS, In-Studio Signage ... (8 total)

- **Issue Description** (`SM-075`)
  - Type: `textarea`
  - Required: Yes
  - Description: What was problematic

- **Specific Content** (`SM-076`)
  - Type: `text`
  - Required: No
  - Description: Specific messaging

- **Client Perception** (`SM-077`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How client perceived it
  - Options: Offensive, Confusing, Misleading, Inappropriate, Doesn't Match Brand ... (6 total)

- **Impact on Client** (`SM-078`)
  - Type: `text`
  - Required: Yes
  - Description: Client reaction

- **Content Removed/Changed** (`SM-079`)
  - Type: `radio`
  - Required: No
  - Description: Whether corrected
  - Options: Yes, No, Not Applicable

### Communication Overload (Sales & Marketing)

**13 fields:**

- **Issue Type** (`SM-OVER-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of overload
  - Options: Too Many Emails, Too Many SMS, Spam Messages, Irrelevant Offers, Duplicate Messages ... (6 total)

- **Communication Channel** (`SM-OVER-002`)
  - Type: `multiselect`
  - Required: Yes
  - Description: Which channels
  - Options: Email, SMS, WhatsApp, Push Notifications

- **Frequency** (`SM-OVER-003`)
  - Type: `dropdown`
  - Required: No
  - Description: How often receiving messages
  - Options: Multiple Times Daily, Daily, Several Times Weekly, Weekly

- **Content Type** (`SM-OVER-004`)
  - Type: `multiselect`
  - Required: No
  - Description: What kind of messages
  - Options: Promotional Offers, Class Reminders, New Classes, Events, General Updates ... (6 total)

- **Relevance** (`SM-OVER-005`)
  - Type: `dropdown`
  - Required: No
  - Description: How relevant to client
  - Options: All Irrelevant, Mostly Irrelevant, Some Relevant, Mostly Relevant

- **Unsubscribe Attempted** (`SM-OVER-006`)
  - Type: `checkbox`
  - Required: No
  - Description: Did they try to unsubscribe

- **Unsubscribe Successful** (`SM-OVER-007`)
  - Type: `checkbox`
  - Required: No
  - Description: Did unsubscribe work

- **Preferences Updated** (`SM-OVER-008`)
  - Type: `checkbox`
  - Required: Yes
  - Description: Were communication settings changed

- **Overload Type** (`SM-032`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of communication excess
  - Options: Too Many Emails, Too Many SMS, Too Many WhatsApp Messages, Spam/Irrelevant Content, Same Message Multiple Channels ... (7 total)

- **Communication Channels** (`SM-033`)
  - Type: `multiselect`
  - Required: Yes
  - Description: Which channels used
  - Options: Email, SMS, WhatsApp, Phone Calls, Push Notifications ... (6 total)

- **Frequency** (`SM-034`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How often contacted
  - Options: Multiple Times Daily, Daily, 3-4 Times Per Week, Weekly, Occasional But Inappropriate

- **Content Type** (`SM-035`)
  - Type: `multiselect`
  - Required: Yes
  - Description: What messages were about
  - Options: Class Promotions, Membership Offers, Event Invites, General Updates, Workshops ... (7 total)

- **Client Preference** (`SM-036`)
  - Type: `dropdown`
  - Required: Yes
  - Description: What client wants
  - Options: Wants Less Frequent, Wants Only Relevant Content, Wants Specific Topics Only, Wants to Unsubscribe Completely

### Events & Workshops (Sales & Marketing)

**23 fields:**

- **Event Name** (`SM-EVENT-001`)
  - Type: `text`
  - Required: Yes
  - Description: Name of event/workshop

- **Event Date** (`SM-EVENT-002`)
  - Type: `date`
  - Required: Yes
  - Description: Scheduled date

- **Event Location** (`SM-EVENT-003`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Where it was held

- **Issue Type** (`SM-EVENT-004`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Event issue type
  - Options: Poor Organization, Event Cancelled, Misleading Details, Registration Issues, Overcrowded ... (6 total)

- **Client Registered** (`SM-EVENT-005`)
  - Type: `checkbox`
  - Required: Yes
  - Description: Did they sign up

- **Registration Fee Paid** (`SM-EVENT-006`)
  - Type: `number`
  - Required: No
  - Description: If paid, how much

- **Notice Period for Cancellation** (`SM-EVENT-007`)
  - Type: `text`
  - Required: No
  - Description: How much notice for cancellation

- **Refund Offered** (`SM-EVENT-008`)
  - Type: `checkbox`
  - Required: No
  - Description: Was refund provided

- **Alternative Offered** (`SM-EVENT-009`)
  - Type: `textarea`
  - Required: No
  - Description: What alternative was given

- **Event Details Mismatch** (`SM-EVENT-010`)
  - Type: `textarea`
  - Required: No
  - Description: What was different from advertised

- **Event Issue Type** (`SM-060`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of event issue
  - Options: Poor Organization, Event Cancelled, Misleading Event Details, Registration Issues, Overcrowded ... (9 total)

- **Event Name** (`SM-061`)
  - Type: `text`
  - Required: Yes
  - Description: Event title

- **Event Date** (`SM-062`)
  - Type: `date`
  - Required: Yes
  - Description: Event date

- **Event Type** (`SM-063`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Category of event
  - Options: Workshop, Masterclass, Special Event, Pop-up Class, Community Event ... (7 total)

- **Trainer/Speaker** (`SM-064`)
  - Type: `text`
  - Required: No
  - Description: Event leader

- **Registration Method** (`SM-065`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How client registered
  - Options: Website, App, Phone, Email, In-Person ... (6 total)

- **Registration Successful** (`SM-066`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether booking worked
  - Options: Yes, No

- **Event Fee** (`SM-067`)
  - Type: `number`
  - Required: No
  - Description: Event price

- **Event Occurred** (`SM-068`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether event happened
  - Options: Yes - As Scheduled, Yes - Modified, No - Cancelled, No - Postponed

- **Cancellation Notice Given** (`SM-069`)
  - Type: `radio`
  - Required: No
  - Description: If cancelled, notice period
  - Options: Yes - Adequate Time, Yes - Short Notice, No

- **Event Issue Description** (`SM-070`)
  - Type: `textarea`
  - Required: Yes
  - Description: Problem specifics

- **Refund Requested** (`SM-071`)
  - Type: `radio`
  - Required: No
  - Description: Client wants refund
  - Options: Yes, No

- **Refund Processed** (`SM-072`)
  - Type: `radio`
  - Required: No
  - Description: Refund status
  - Options: Yes, No, Pending, N/A

### Guest Passes/Referrals (Sales & Marketing)

**21 fields:**

- **Issue Type** (`SM-GUEST-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Guest pass/referral issue
  - Options: Guest Pass Not Working, Referral Benefit Not Credited, Restrictions Not Mentioned, Pass Expired Early, Other

- **Referral Type** (`SM-GUEST-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of referral program
  - Options: Guest Pass, Friend Referral, Corporate Partnership, Influencer/Ambassador, Other

- **Pass/Code Provided** (`SM-GUEST-003`)
  - Type: `text`
  - Required: No
  - Description: Code or pass number

- **Referred Client Name** (`SM-GUEST-004`)
  - Type: `text`
  - Required: No
  - Description: Who was referred (if applicable)

- **Referring Client** (`SM-GUEST-005`)
  - Type: `text`
  - Required: No
  - Description: Who gave the referral

- **Benefit Expected** (`SM-GUEST-006`)
  - Type: `text`
  - Required: No
  - Description: What benefit was promised

- **Benefit Received** (`SM-GUEST-007`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Was benefit given
  - Options: Yes, No, Partial

- **Terms Clearly Communicated** (`SM-GUEST-008`)
  - Type: `dropdown`
  - Required: No
  - Description: Were restrictions explained
  - Options: Yes, No, Unclear

- **Resolution** (`SM-GUEST-009`)
  - Type: `textarea`
  - Required: No
  - Description: How was it resolved

- **Issue Type** (`SM-048`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of referral/guest pass issue
  - Options: Guest Pass Not Working, Referral Benefit Not Credited, Restrictions Not Mentioned, Referral Link Broken, Guest Pass Expired Early ... (7 total)

- **Program Type** (`SM-049`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Which program
  - Options: Guest Pass, Referral Reward, Friend Referral, Corporate Partnership, Promotional Pass ... (6 total)

- **Referring Client Name** (`SM-050`)
  - Type: `text`
  - Required: No
  - Description: Referrer name

- **Referred Client Name** (`SM-051`)
  - Type: `text`
  - Required: Yes
  - Description: Referee name

- **Pass/Code Used** (`SM-052`)
  - Type: `text`
  - Required: No
  - Description: Reference code

- **Expected Benefit** (`SM-053`)
  - Type: `text`
  - Required: Yes
  - Description: Expected reward

- **Actual Outcome** (`SM-054`)
  - Type: `text`
  - Required: Yes
  - Description: Actual result

- **Pass Redeemed Successfully** (`SM-055`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether pass worked
  - Options: Yes, No

- **Credit/Benefit Applied** (`SM-056`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether reward given
  - Options: Yes, No, Partially

- **Expected Credit Amount** (`SM-057`)
  - Type: `number`
  - Required: No
  - Description: Expected value

- **Actual Credit Amount** (`SM-058`)
  - Type: `number`
  - Required: No
  - Description: Actual value

- **Issue Resolved** (`SM-059`)
  - Type: `radio`
  - Required: Yes
  - Description: Resolution status
  - Options: Yes, No, Pending

### Misleading Information (Sales & Marketing)

**19 fields:**

- **Sales Staff Member** (`SM-MISL-001`)
  - Type: `dropdown`
  - Required: No
  - Description: Who did the sales pitch

- **Issue Type** (`SM-MISL-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of misleading info
  - Options: False Promise, Exaggerated Benefits, Hidden Terms, Pressure Tactics, Incorrect Package Info ... (6 total)

- **What Was Promised** (`SM-MISL-003`)
  - Type: `textarea`
  - Required: Yes
  - Description: What client was told

- **What Was Actually True** (`SM-MISL-004`)
  - Type: `textarea`
  - Required: Yes
  - Description: What the reality is

- **Package/Product Sold** (`SM-MISL-005`)
  - Type: `dropdown`
  - Required: Yes
  - Description: What package was purchased

- **Sale Date** (`SM-MISL-006`)
  - Type: `date`
  - Required: Yes
  - Description: When purchase was made

- **Written Documentation** (`SM-MISL-007`)
  - Type: `dropdown`
  - Required: No
  - Description: Was anything in writing
  - Options: Yes - Contract/Email, No - Verbal Only

- **Client Seeking** (`SM-MISL-008`)
  - Type: `dropdown`
  - Required: Yes
  - Description: What does client want
  - Options: Refund, Package Change, Clarification, Complaint Only

- **Resolution Offered** (`SM-MISL-009`)
  - Type: `textarea`
  - Required: No
  - Description: How was it resolved

- **Misleading Info Type** (`SM-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of misleading information
  - Options: False Promises About Results, Exaggerated Package Benefits, Pressure Tactics Used, Hidden Terms Not Disclosed, Pricing Misinformation ... (7 total)

- **Information Source** (`SM-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Where information came from
  - Options: Sales Call, Email Campaign, Social Media Ad, Website, In-Person Sales Pitch ... (8 total)

- **Sales Associate** (`SM-003`)
  - Type: `dropdown`
  - Required: No
  - Description: Who provided information
  - Options: Akshay Rane, Vahishta Fitter, Zaheer Agarbattiwala, Zahur Shaikh, Nadiya Shaikh ... (18 total)

- **What Was Claimed** (`SM-004`)
  - Type: `textarea`
  - Required: Yes
  - Description: The misleading statement

- **Actual Reality** (`SM-005`)
  - Type: `textarea`
  - Required: Yes
  - Description: Correct information

- **Product/Package Involved** (`SM-006`)
  - Type: `dropdown`
  - Required: Yes
  - Description: What was being sold
  - Options: Barre 1 month Unlimited, Studio 2 Week Unlimited, Studio Single Class, Session, Private Class ... (27 total)

- **Client Made Purchase** (`SM-007`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether client bought it
  - Options: Yes, No

- **Purchase Amount** (`SM-008`)
  - Type: `number`
  - Required: No
  - Description: Transaction value

- **Refund Requested** (`SM-009`)
  - Type: `radio`
  - Required: No
  - Description: Client wants money back
  - Options: Yes, No, N/A

- **Client Expectation** (`SM-010`)
  - Type: `text`
  - Required: Yes
  - Description: Client's understanding

### Social Media (Sales & Marketing)

**17 fields:**

- **Platform** (`SM-SOC-001`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Which social platform
  - Options: Instagram, Facebook, Twitter/X, LinkedIn, YouTube ... (6 total)

- **Issue Type** (`SM-SOC-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Social media issue type
  - Options: Inaccurate Information, Unresponsive to DMs, Poor Engagement, Outdated Information, Misleading Posts ... (6 total)

- **Specific Post/Content** (`SM-SOC-003`)
  - Type: `text`
  - Required: No
  - Description: Link or details of content

- **Inaccuracy Details** (`SM-SOC-004`)
  - Type: `textarea`
  - Required: No
  - Description: What information was wrong

- **Client Contacted Via DM** (`SM-SOC-005`)
  - Type: `checkbox`
  - Required: No
  - Description: Did they send direct message

- **DM Response Time** (`SM-SOC-006`)
  - Type: `dropdown`
  - Required: No
  - Description: How long until reply
  - Options: Under 1 Hour, 1-24 Hours, 24-48 Hours, No Response

- **Issue Resolved Via Social** (`SM-SOC-007`)
  - Type: `checkbox`
  - Required: No
  - Description: Was it handled on social media

- **Directed to Other Channel** (`SM-SOC-008`)
  - Type: `checkbox`
  - Required: No
  - Description: Were they asked to call/email

- **Social Media Issue Type** (`SM-039`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of social media issue
  - Options: Inaccurate Information Posted, Unresponsive to DMs, Poor Engagement, Misleading Content, Inappropriate Content ... (8 total)

- **Platform** (`SM-040`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Which platform
  - Options: Instagram, Facebook, Twitter/X, LinkedIn, YouTube ... (6 total)

- **Issue Description** (`SM-041`)
  - Type: `textarea`
  - Required: Yes
  - Description: What happened

- **Post/Content URL** (`SM-042`)
  - Type: `text`
  - Required: No
  - Description: Reference link

- **Client Action Taken** (`SM-043`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How client engaged
  - Options: Sent DM, Commented, Tried to Contact Via Post, Filled Form on Page, Clicked Link/Ad ... (6 total)

- **Response Received** (`SM-044`)
  - Type: `radio`
  - Required: Yes
  - Description: Whether client got response
  - Options: Yes - Timely, Yes - Delayed, No

- **Hours Until Response** (`SM-045`)
  - Type: `number`
  - Required: No
  - Description: Response time

- **Issue Impact** (`SM-046`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Effect of issue
  - Options: Couldn't Book Class, Wrong Information Received, Missed Opportunity, Trust Impacted, Reputation Concern ... (6 total)

- **Content Corrected** (`SM-047`)
  - Type: `radio`
  - Required: No
  - Description: Whether post was fixed
  - Options: Yes, No, N/A

### Trial Class Experience (Sales & Marketing)

**20 fields:**

- **Trial Class Date** (`SM-TRIAL-001`)
  - Type: `date`
  - Required: Yes
  - Description: When was trial class

- **Class Attended** (`SM-TRIAL-002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Which class

- **Instructor** (`SM-TRIAL-003`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Who taught

- **Issue Type** (`SM-TRIAL-004`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Trial experience issue
  - Options: Poor Experience, No Introduction, Rushed Enrollment, Hard Sell After Class, No Follow-up ... (6 total)

- **Pre-Class Orientation** (`SM-TRIAL-005`)
  - Type: `checkbox`
  - Required: No
  - Description: Was orientation given

- **Met with Sales After** (`SM-TRIAL-006`)
  - Type: `checkbox`
  - Required: No
  - Description: Did they meet sales staff

- **Pressure to Purchase** (`SM-TRIAL-007`)
  - Type: `dropdown`
  - Required: No
  - Description: Level of sales pressure
  - Options: No Pressure, Mild, Moderate, High Pressure

- **Purchased Package** (`SM-TRIAL-008`)
  - Type: `checkbox`
  - Required: No
  - Description: Did they buy membership

- **Would Recommend Trial** (`SM-TRIAL-009`)
  - Type: `dropdown`
  - Required: No
  - Description: Would they recommend to others
  - Options: Yes, Maybe, No

- **Trial Issue Type** (`SM-021`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of trial issue
  - Options: Poor Trial Experience, No Proper Introduction, Rushed Enrollment, High Pressure Sale After Class, Not Told It Was Trial ... (7 total)

- **Trial Package** (`SM-022`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Which trial offer
  - Options: Studio 2 Week Unlimited, Studio Newcomers 2 For 1, Newcomer 8 Class Package, Studio Single Class, Other Trial Offer

- **Class Attended** (`SM-023`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Trial class type
  - Options: Studio Barre 57, Studio Foundations, Studio Barre 57 Express, Studio Cardio Barre, Studio FIT ... (24 total)

- **Class Date** (`SM-024`)
  - Type: `date`
  - Required: Yes
  - Description: Date of trial

- **Trainer** (`SM-025`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Instructor
  - Options: Anisha Shah, Atulan Purohit, Karanvir Bhatia, Mrigakshi Jaiswal, Reshma Sharma ... (30 total)

- **Pre-Class Introduction** (`SM-026`)
  - Type: `radio`
  - Required: Yes
  - Description: Was intro provided
  - Options: Yes - Adequate, Yes - Brief, No

- **Instructor Attention During Class** (`SM-027`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Instructor support level
  - Options: Excellent, Good, Minimal, None

- **Sales Pitch Timing** (`SM-028`)
  - Type: `dropdown`
  - Required: Yes
  - Description: When sales approach happened
  - Options: Before Class, Immediately After Class, Later Same Day, Follow-up Call/Message, No Pitch ... (6 total)

- **Sales Approach Comfort Level** (`SM-029`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How client felt about sales
  - Options: Comfortable, Slightly Pressured, Very Pressured, Not Applicable

- **Purchased Membership** (`SM-030`)
  - Type: `radio`
  - Required: Yes
  - Description: Conversion outcome
  - Options: Yes, No

- **Likely to Return** (`SM-031`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Return likelihood
  - Options: Definitely Yes, Probably Yes, Unsure, Probably No, Definitely No

### Challenges & Competitions (Special Programs)

**11 fields:**

- **Challenge/Competition Name** (`SP_CHL_001`)
  - Type: `text`
  - Required: Yes
  - Description: Which challenge had issues

- **Challenge Date Range** (`SP_CHL_002`)
  - Type: `text`
  - Required: Yes
  - Description: When did challenge run

- **Issue Type** (`SP_CHL_003`)
  - Type: `multiselect`
  - Required: Yes
  - Description: What went wrong
  - Options: Poor organization, Unfair rules, Rules not clear, Tracking issues, Communication problems ... (9 total)

- **Number of Participants** (`SP_CHL_004`)
  - Type: `number`
  - Required: No
  - Description: Total participants

- **Specific Incident Description** (`SP_CHL_005`)
  - Type: `textarea`
  - Required: Yes
  - Description: Full description of problems

- **Participant Complaints** (`SP_CHL_006`)
  - Type: `number`
  - Required: No
  - Description: Volume of complaints

- **Prize/Reward Issue** (`SP_CHL_007`)
  - Type: `radio`
  - Required: Yes
  - Description: Was there a prize problem

- **Prize Details** (`SP_CHL_008`)
  - Type: `textarea`
  - Required: No
  - Description: Prize specifics

- **Rules Clarity** (`SP_CHL_009`)
  - Type: `dropdown`
  - Required: No
  - Description: How clear were rules
  - Options: Very clear, Somewhat clear, Unclear, Contradictory, Changed mid-challenge

- **Staff Member Responsible** (`SP_CHL_010`)
  - Type: `text`
  - Required: No
  - Description: Who was in charge

- **Resolution Required** (`SP_CHL_011`)
  - Type: `textarea`
  - Required: Yes
  - Description: How to fix this

### Corporate Programs (Special Programs)

**12 fields:**

- **Company Name** (`SP_CRP_001`)
  - Type: `text`
  - Required: Yes
  - Description: Which company is this for

- **Program Type** (`SP_CRP_002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of corporate program
  - Options: Ongoing weekly classes, One-time workshop, Wellness challenge, Series package, Event ... (6 total)

- **Issue Type** (`SP_CRP_003`)
  - Type: `multiselect`
  - Required: Yes
  - Description: What went wrong
  - Options: Poor coordination, Communication gaps, Unsuitable timing, Wrong location, Lack of customization ... (9 total)

- **Program Date(s)** (`SP_CRP_004`)
  - Type: `text`
  - Required: Yes
  - Description: When did program occur

- **Trainer Name** (`SP_CRP_005`)
  - Type: `dropdown`
  - Required: No
  - Description: Which trainer was involved

- **Number of Participants Expected** (`SP_CRP_006`)
  - Type: `number`
  - Required: No
  - Description: Expected participant count

- **Actual Participation** (`SP_CRP_007`)
  - Type: `number`
  - Required: No
  - Description: How many actually attended

- **Corporate Contact Name** (`SP_CRP_008`)
  - Type: `text`
  - Required: No
  - Description: Who is company contact

- **Corporate Contact Email** (`SP_CRP_009`)
  - Type: `email`
  - Required: No
  - Description: Contact email

- **Detailed Issue Description** (`SP_CRP_010`)
  - Type: `textarea`
  - Required: Yes
  - Description: Complete description

- **Company Feedback** (`SP_CRP_011`)
  - Type: `textarea`
  - Required: No
  - Description: Corporate client's feedback

- **Contract at Risk** (`SP_CRP_012`)
  - Type: `radio`
  - Required: Yes
  - Description: Is relationship in jeopardy

### Private Sessions (Special Programs)

**13 fields:**

- **Issue Type** (`SP_PRV_001`)
  - Type: `multiselect`
  - Required: Yes
  - Description: What private session issue occurred
  - Options: Instructor unavailability, Last-minute cancellation, Scheduling conflicts, Pricing disputes, Session quality issues ... (8 total)

- **Trainer Name** (`SP_PRV_002`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Which trainer was involved

- **Session Date/Time** (`SP_PRV_003`)
  - Type: `datetime`
  - Required: Yes
  - Description: When was session scheduled/held

- **Client Name** (`SP_PRV_004`)
  - Type: `text`
  - Required: Yes
  - Description: Who booked the private

- **Session Type** (`SP_PRV_005`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Type of private session
  - Options: Single private, Semi-private (2 clients), Small group private, Package series, Other

- **Cancellation Notice** (`SP_PRV_006`)
  - Type: `dropdown`
  - Required: No
  - Description: How much notice was given
  - Options: No notice, Less than 24hrs, 24-48hrs, More than 48hrs, N/A

- **Who Cancelled** (`SP_PRV_007`)
  - Type: `radio`
  - Required: No
  - Description: Who initiated cancellation
  - Options: Client, Trainer, Studio, N/A

- **Cancellation Reason** (`SP_PRV_008`)
  - Type: `textarea`
  - Required: No
  - Description: Why was session cancelled

- **Session Price** (`SP_PRV_009`)
  - Type: `number`
  - Required: No
  - Description: What was charged

- **Refund/Credit Issued** (`SP_PRV_010`)
  - Type: `radio`
  - Required: No
  - Description: How was client compensated
  - Options: Full refund, Partial refund, Credit issued, No compensation, N/A

- **Detailed Incident Description** (`SP_PRV_011`)
  - Type: `textarea`
  - Required: Yes
  - Description: Complete description

- **Rescheduling Attempted** (`SP_PRV_012`)
  - Type: `radio`
  - Required: No
  - Description: Was rescheduling offered

- **Client Satisfaction** (`SP_PRV_013`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Client's satisfaction level
  - Options: Satisfied with resolution, Partially satisfied, Unsatisfied, Very upset, Other

### Special Needs Programs (Special Programs)

**11 fields:**

- **Program Type** (`SP_SPC_001`)
  - Type: `multiselect`
  - Required: Yes
  - Description: Which special needs program
  - Options: Prenatal, Postnatal, Seniors, Injury recovery/rehabilitation, Adaptive fitness ... (6 total)

- **Issue Type** (`SP_SPC_002`)
  - Type: `multiselect`
  - Required: Yes
  - Description: What is the issue
  - Options: Program not offered, Limited availability, Inadequate modifications, Instructor not trained, Unsafe practices ... (8 total)

- **Trainer Name** (`SP_SPC_003`)
  - Type: `dropdown`
  - Required: No
  - Description: Trainer involved

- **Client Specific Need** (`SP_SPC_004`)
  - Type: `textarea`
  - Required: Yes
  - Description: Client's specific requirements

- **Modification Requested** (`SP_SPC_005`)
  - Type: `textarea`
  - Required: No
  - Description: What did client ask for

- **Modification Provided** (`SP_SPC_006`)
  - Type: `radio`
  - Required: No
  - Description: Was modification offered
  - Options: Yes - adequate, Yes - inadequate, No, N/A

- **Trainer Certification/Training** (`SP_SPC_007`)
  - Type: `radio`
  - Required: No
  - Description: Does trainer have relevant training
  - Options: Trainer is certified, Trainer not certified, Unknown

- **Safety Concern** (`SP_SPC_008`)
  - Type: `radio`
  - Required: Yes
  - Description: Was there a safety issue

- **Safety Concern Details** (`SP_SPC_009`)
  - Type: `textarea`
  - Required: No
  - Description: What was unsafe

- **Detailed Incident Description** (`SP_SPC_010`)
  - Type: `textarea`
  - Required: Yes
  - Description: Complete description

- **Program Demand Assessment** (`SP_SPC_011`)
  - Type: `dropdown`
  - Required: Yes
  - Description: How often is this requested
  - Options: Single request, Occasional requests, Frequent requests, High demand, Unknown

### Workshop Quality (Special Programs)

**11 fields:**

- **Workshop Name** (`SP_WRK_001`)
  - Type: `text`
  - Required: Yes
  - Description: Which workshop had issues

- **Workshop Date** (`SP_WRK_002`)
  - Type: `date`
  - Required: Yes
  - Description: When was workshop held

- **Instructor Name** (`SP_WRK_003`)
  - Type: `dropdown`
  - Required: Yes
  - Description: Who led the workshop

- **Quality Issue** (`SP_WRK_004`)
  - Type: `multiselect`
  - Required: Yes
  - Description: What was problematic
  - Options: Poor instruction quality, Disorganized/poorly structured, Overcrowded, Not worth the fee, Content not as advertised ... (9 total)

- **Number of Participants** (`SP_WRK_005`)
  - Type: `number`
  - Required: No
  - Description: Workshop attendance

- **Workshop Fee** (`SP_WRK_006`)
  - Type: `number`
  - Required: No
  - Description: Price charged

- **Client Feedback Summary** (`SP_WRK_007`)
  - Type: `textarea`
  - Required: Yes
  - Description: What did attendees say

- **Number of Complaints** (`SP_WRK_008`)
  - Type: `number`
  - Required: Yes
  - Description: Volume of negative feedback

- **Refund Requested** (`SP_WRK_009`)
  - Type: `radio`
  - Required: Yes
  - Description: Did anyone ask for money back

- **Number Requesting Refund** (`SP_WRK_010`)
  - Type: `number`
  - Required: No
  - Description: Volume of refund requests

- **Specific Incident Description** (`SP_WRK_011`)
  - Type: `textarea`
  - Required: Yes
  - Description: Full description of problems

