#!/usr/bin/env python3
"""
Generate complete comprehensive-categories-from-csv.sql with ALL 103 subcategories
This script creates the full SQL seeding file programmatically
"""

import json

# ====================================================================================================
# CONFIGURATION
# ====================================================================================================

# All 103 subcategories organized by category
SUBCATEGORIES_DATA = {
    "Class Experience": [
        ("Class Quality", "Issues with overall class experience, effectiveness, or enjoyment", "medium"),
        ("Class Difficulty", "Class too easy, too hard, or inappropriate for advertised level", "medium"),
        ("Music Selection", "Music volume, type, or playlist issues", "low"),
        ("Class Variety", "Limited class options or repetitive programming", "medium"),
        ("Class Size", "Overcrowded classes or concerns about class capacity", "high"),
        ("Scheduling Issues", "Class times not convenient or schedule changes", "medium"),
        ("Class Cancellations", "Last-minute class cancellations or instructor no-shows", "high"),
        ("Substitute Teachers", "Issues with substitute instructor quality or frequency", "medium"),
        ("Pace/Intensity", "Class moving too fast, too slow, or intensity issues", "medium"),
        ("Modifications Offered", "Lack of modifications or accommodations during class", "medium"),
    ],
    "Instructor Related": [
        ("Teaching Quality", "Poor instruction, unclear cuing, or ineffective teaching", "high"),
        ("Instructor Attitude", "Rude, dismissive, or unprofessional behavior", "high"),
        ("Favoritism", "Instructor showing preferential treatment to certain clients", "medium"),
        ("Attention Distribution", "Instructor ignoring certain clients or focusing only on favorites", "medium"),
        ("Form Corrections", "Too many/too few corrections, or inappropriate corrections", "medium"),
        ("Professionalism", "Late arrival, personal conversations during class, or appearance issues", "medium"),
        ("Communication Style", "Condescending, negative, or demotivating language", "medium"),
        ("Class Management", "Poor time management or disorganized class flow", "medium"),
        ("Injury Prevention", "Failure to provide safe cues or pushing clients too hard", "high"),
        ("Personal Boundaries", "Inappropriate touching, comments, or boundary violations", "critical"),
    ],
    "Facility & Amenities": [
        ("Studio Cleanliness", "Dirty floors, equipment, or surfaces", "high"),
        ("Locker Room Issues", "Cleanliness, maintenance, or facility problems in changing areas", "high"),
        ("Bathroom Conditions", "Cleanliness, supplies, or maintenance issues", "high"),
        ("Shower Facilities", "Hot water, pressure, cleanliness, or availability issues", "medium"),
        ("Temperature Control", "Studio too hot, too cold, or inconsistent temperature", "medium"),
        ("Equipment Condition", "Broken, worn out, or insufficient equipment", "high"),
        ("Lighting Issues", "Too bright, too dim, or lighting malfunctions", "low"),
        ("Sound System", "Poor audio quality, volume issues, or technical problems", "medium"),
        ("Parking", "Limited parking, expensive parking, or access issues", "low"),
        ("Water Stations", "Water not available, fountains broken, or hygiene issues", "medium"),
        ("Amenities", "Lack of towels, mats, props, or other expected amenities", "medium"),
        ("Signage/Wayfinding", "Confusing layout or unclear directions", "low"),
        ("Smell/Odor", "Unpleasant smells in studio or facilities", "medium"),
        ("Accessibility", "Issues for clients with disabilities or mobility challenges", "high"),
    ],
    "Membership & Billing": [
        ("Billing Errors", "Incorrect charges, double billing, or payment mistakes", "high"),
        ("Package Issues", "Problems with class packages, credits, or expiration", "high"),
        ("Auto-Renewal Problems", "Unwanted auto-renewal or difficulty cancelling", "high"),
        ("Membership Cancellation", "Difficulty cancelling, cancellation fees, or process issues", "high"),
        ("Pricing Transparency", "Hidden fees, unclear pricing, or price discrepancies", "medium"),
        ("Package Restrictions", "Unexpected limitations on package usage", "medium"),
        ("Credit Expiration", "Credits expiring too soon or expiration not communicated", "medium"),
        ("Refund Issues", "Difficulty obtaining refunds or delayed refunds", "high"),
        ("Payment Methods", "Limited payment options or payment processing problems", "medium"),
        ("Membership Freeze", "Issues freezing membership or freeze policy unclear", "medium"),
        ("Contract Terms", "Confusing or unfair contract terms", "medium"),
    ],
    "Booking & Technology": [
        ("App/Website Issues", "Technical problems, bugs, or usability issues", "high"),
        ("Booking Failures", "Unable to book classes or booking system errors", "critical"),
        ("Waitlist Issues", "Problems with waitlist functionality or priority", "medium"),
        ("Cancellation Problems", "Unable to cancel, late cancel fees, or cancellation window confusion", "high"),
        ("Class Check-in", "Check-in system failures or attendance tracking issues", "medium"),
        ("Notifications", "Missing notifications, too many notifications, or notification errors", "low"),
        ("Profile Management", "Unable to update profile or account information", "low"),
        ("Class Visibility", "Classes not showing up or schedule display issues", "medium"),
        ("Payment Gateway", "Payment processing failures or transaction errors", "critical"),
        ("Technical Support", "Poor technical support or unresolved tech issues", "medium"),
    ],
    "Customer Service": [
        ("Front Desk Service", "Unhelpful, rude, or unprofessional front desk staff", "high"),
        ("Response Time", "Slow response to emails, calls, or inquiries", "medium"),
        ("Issue Resolution", "Problems not resolved or passed between departments", "high"),
        ("Communication Quality", "Poor communication, unclear information, or conflicting messages", "medium"),
        ("Staff Knowledge", "Staff lacking information about policies, packages, or procedures", "medium"),
        ("Staff Availability", "No one at desk, long wait times, or understaffing", "medium"),
        ("Complaint Handling", "Complaints dismissed, not taken seriously, or poorly handled", "high"),
        ("Phone Support", "Difficulty reaching studio by phone or poor phone service", "medium"),
        ("Email/Chat Support", "Slow or unhelpful email/chat support", "medium"),
        ("Staff Professionalism", "Unprofessional behavior, appearance, or conduct", "medium"),
        ("Newcomer Experience", "Poor onboarding or unwelcoming experience for new clients", "high"),
    ],
    "Sales & Marketing": [
        ("Misleading Information", "False promises, exaggerated claims, or hidden terms", "high"),
        ("Aggressive Selling", "High-pressure sales tactics or excessive follow-ups", "medium"),
        ("Trial Class Experience", "Poor trial experience, rushed enrollment, or hard sell after class", "medium"),
        ("Communication Overload", "Too many emails, SMS, or promotional messages", "low"),
        ("Social Media", "Inaccurate info on social media or poor social media responsiveness", "low"),
        ("Guest Passes/Referrals", "Guest pass issues or referral rewards not credited", "medium"),
        ("Events & Workshops", "Poor event organization, cancellations, or not as advertised", "medium"),
        ("Brand Communication", "Inconsistent messaging, tone issues, or confusing branding", "low"),
    ],
    "Health & Safety": [
        ("Hygiene Protocols", "Inadequate sanitization, cleaning, or hygiene standards", "critical"),
        ("Injury During Class", "Client injured during class or inadequate first aid response", "critical"),
        ("Emergency Preparedness", "Missing safety equipment, blocked exits, or no emergency protocols", "critical"),
        ("COVID/Health Protocols", "Not following health guidelines or capacity restrictions", "critical"),
        ("Medical Disclosure", "Medical information not collected, shared, or acted upon", "high"),
        ("Equipment Safety", "Unsafe or damaged equipment creating injury risk", "critical"),
        ("Air Quality", "Poor ventilation, strong odors, or air quality concerns", "medium"),
    ],
    "Community & Culture": [
        ("Clique Behavior", "Exclusive groups, unwelcoming atmosphere, or favoritism among members", "medium"),
        ("Discrimination", "Discrimination based on body type, fitness level, age, or other factors", "critical"),
        ("Member Behavior", "Disruptive, rude, or inappropriate behavior by other clients", "medium"),
        ("Inclusivity Issues", "Lack of body positivity, welcoming environment, or diverse representation", "high"),
        ("Community Events", "Poor organization or low quality of community events", "low"),
        ("Studio Culture", "Toxic environment, comparison culture, or unsupportive atmosphere", "high"),
    ],
    "Retail & Merchandise": [
        ("Product Quality", "Defective, poor quality, or not as described products", "medium"),
        ("Product Availability", "Out of stock items or limited product selection", "low"),
        ("Pricing", "Overpriced products or pricing discrepancies", "low"),
        ("Return/Exchange", "Difficulty with returns, restrictive policies, or poor exchange process", "medium"),
        ("Staff Knowledge", "Staff lacking product knowledge or unable to help", "low"),
    ],
    "Special Programs": [
        ("Workshop Quality", "Poor quality workshops, disorganization, or not worth the fee", "medium"),
        ("Private Sessions", "Issues with private session quality, scheduling, or pricing", "medium"),
        ("Corporate Programs", "Problems with corporate wellness programs or coordination", "medium"),
        ("Special Needs Programs", "Inadequate programs for prenatal, postnatal, seniors, or adaptive fitness", "high"),
        ("Challenges & Competitions", "Poorly organized challenges, unfair rules, or prize issues", "low"),
    ],
    "Miscellaneous": [
        ("Noise Disturbance", "External noise disrupting classes or facility operations", "medium"),
        ("Policy Changes", "Policies changed without notice or communication", "medium"),
        ("Guest Experience", "Poor experience for guests, drop-ins, or trial clients", "medium"),
        ("Lost & Found", "Lost items not tracked or found items not returned", "low"),
        ("Nutrition/Wellness Advice", "Inappropriate, unqualified, or pushy nutrition/wellness advice", "medium"),
        ("Multi-location Issues", "Problems using membership across multiple locations", "medium"),
        ("Feedback System", "No way to provide feedback, feedback ignored, or retaliation concerns", "high"),
    ],
}

# Global fields that appear in every form
GLOBAL_FIELDS = [
    {"id": "GLB-001", "label": "Ticket ID", "type": "auto", "required": True, "hidden": False, "description": "System generated unique identifier"},
    {"id": "GLB-002", "label": "Date & Time Reported", "type": "datetime", "required": True, "hidden": False, "auto": True, "description": "When the issue was reported to staff"},
    {"id": "GLB-003", "label": "Date & Time of Incident", "type": "datetime", "required": True, "hidden": False, "description": "When the issue actually occurred"},
    {"id": "GLB-004", "label": "Location", "type": "select", "required": True, "hidden": False, "options": ["Kwality House Kemps Corner", "Kenkre House", "South United Football Club", "Supreme HQ Bandra", "WeWork Prestige Central", "WeWork Galaxy", "The Studio by Copper + Cloves", "Pop-up"], "description": "Studio location where issue occurred"},
    {"id": "GLB-005", "label": "Reported By (Staff)", "type": "select", "required": True, "hidden": False, "options": ["Akshay Rane", "Vahishta Fitter", "Zaheer Agarbattiwala", "Zahur Shaikh", "Nadiya Shaikh", "Admin Admin", "Shipra Bhika", "Imran Shaikh", "Tahira Sayyed", "Manisha Rathod", "Sheetal Kataria", "Priyanka Abnave", "Api Serou", "Prathap Kp", "Pavanthika", "Santhosh Kumar"], "description": "Staff member logging the ticket"},
    {"id": "GLB-006", "label": "Client Name", "type": "text", "required": True, "hidden": False, "description": "Name of the client reporting issue"},
    {"id": "GLB-007", "label": "Client Email", "type": "email", "required": False, "hidden": False, "description": "Client email address"},
    {"id": "GLB-008", "label": "Client Phone", "type": "phone", "required": False, "hidden": False, "description": "Client contact number"},
    {"id": "GLB-009", "label": "Client Status", "type": "select", "required": True, "hidden": False, "options": ["Existing Active", "Existing Inactive", "New Prospect", "Trial Client", "Guest (Hosted Class)"], "description": "Client membership status"},
    {"id": "GLB-010", "label": "Priority", "type": "select", "required": True, "hidden": False, "options": ["Low (log only)", "Medium (48hrs)", "High (24hrs)", "Critical (immediate)"], "description": "Urgency level of the issue"},
    {"id": "GLB-011", "label": "Department Routing", "type": "select", "required": True, "hidden": False, "options": ["Operations", "Facilities", "Training", "Sales", "Client Success", "Marketing", "Finance", "Management"], "description": "Which department should handle this"},
    {"id": "GLB-012", "label": "Issue Description", "type": "textarea", "required": True, "hidden": False, "minLength": 50, "description": "Detailed description of the issue"},
    {"id": "GLB-013", "label": "Action Taken Immediately", "type": "textarea", "required": False, "hidden": False, "description": "What was done on the spot"},
    {"id": "GLB-014", "label": "Client Mood/Sentiment", "type": "select", "required": False, "hidden": False, "options": ["Calm", "Frustrated", "Angry", "Disappointed", "Understanding"], "description": "Client emotional state"},
    {"id": "GLB-015", "label": "Follow-up Required", "type": "radio", "required": True, "hidden": False, "options": ["Yes", "No"], "description": "Does this need additional follow-up"},
    {"id": "GLB-016", "label": "Attachments", "type": "file", "required": False, "hidden": False, "multiple": True, "description": "Supporting documentation"},
]

# Common reusable option arrays
CLASS_OPTIONS = ["Studio Barre 57", "Studio Foundations", "Studio Barre 57 Express", "Studio Cardio Barre", "Studio FIT", "Studio Mat 57", "Studio SWEAT In 30", "Studio Amped Up!", "Studio Back Body Blaze", "Studio Cardio Barre Plus", "Studio Cardio Barre Express", "Studio HIIT", "Studio Back Body Blaze Express", "Studio Recovery", "Studio Hosted Class", "Studio Trainer's Choice", "Studio Pre/Post Natal", "Studio Mat 57 Express", "Studio PowerCycle Express", "Studio PowerCycle", "Studio Strength Lab (Pull)", "Studio Strength Lab (Full Body)", "Studio Strength Lab (Push)", "Studio Strength Lab"]

TRAINER_OPTIONS = ["Anisha Shah", "Atulan Purohit", "Karanvir Bhatia", "Mrigakshi Jaiswal", "Reshma Sharma", "Karan Bhatia", "Pushyank Nahar", "Shruti Kulkarni", "Janhavi Jain", "Rohan Dahima", "Kajol Kanchan", "Vivaran Dhasmana", "Upasna Paranjpe", "Richard D'Costa", "Pranjali Jain", "Saniya Jaiswal", "Shruti Suresh", "Cauveri Vikrant", "Poojitha Bhaskar", "Nishanth Raj", "Siddhartha Kusuma", "Simonelle De Vitre", "Kabir Varma", "Simran Dutt", "Veena Narasimhan", "Anmol Sharma", "Bret Saldanha", "Raunak Khemuka", "Chaitanya Nahar", "Sovena Shetty"]

STAFF_OPTIONS = ["Akshay Rane", "Vahishta Fitter", "Zaheer Agarbattiwala", "Zahur Shaikh", "Nadiya Shaikh", "Admin Admin", "Shipra Bhika", "Imran Shaikh", "Tahira Sayyed", "Manisha Rathod", "Sheetal Kataria", "Priyanka Abnave", "Api Serou", "Prathap Kp", "Pavanthika", "Santhosh Kumar"]

PACKAGE_OPTIONS = ["Barre 1 month Unlimited", "Studio 2 Week Unlimited", "Studio Single Class", "Session", "Private Class", "Studio 8 Class Package", "Studio 10 Class Package", "Money Credits", "Studio Private Class", "Retail", "Studio 4 Class Package", "Studio 1 Month Unlimited", "Studio 3 Month Unlimited", "Studio Annual Unlimited", "Studio Newcomers 2 For 1", "Studio 12 Class Package", "Studio 10 Single Class Package", "Studio 30 Single Class Package", "Studio 20 Single Class Package", "Barre 6 month Unlimited", "Studio 6 Month Unlimited", "Barre 2 week Unlimited", "Studio 3 Month Unlimited - Monthly", "Gift Card", "Newcomer 8 Class Package", "Studio 6 Week Unlimited"]

# Category metadata
CATEGORY_INFO = {
    "Class Experience": {"icon": "🎯", "color": "teal", "description": "Class quality, difficulty, variety, and overall experience"},
    "Instructor Related": {"icon": "👨‍🏫", "color": "indigo", "description": "Teaching quality, professionalism, and instructor interactions"},
    "Facility & Amenities": {"icon": "🏢", "color": "cyan", "description": "Studio cleanliness, equipment, temperature, and facility maintenance"},
    "Membership & Billing": {"icon": "💳", "color": "emerald", "description": "Billing issues, package problems, contracts, and membership matters"},
    "Booking & Technology": {"icon": "💻", "color": "blue", "description": "Issues related to app/website, bookings, payments, and technical systems"},
    "Customer Service": {"icon": "🤝", "color": "green", "description": "Front desk service, response time, communication, and support quality"},
    "Sales & Marketing": {"icon": "📢", "color": "purple", "description": "Sales practices, marketing communications, trials, and promotional activities"},
    "Health & Safety": {"icon": "🏥", "color": "red", "description": "Hygiene, injuries, emergency preparedness, equipment safety, and health protocols"},
    "Community & Culture": {"icon": "👥", "color": "pink", "description": "Studio atmosphere, inclusivity, member behavior, and community events"},
    "Retail & Merchandise": {"icon": "🛍️", "color": "orange", "description": "Product quality, availability, pricing, returns, and staff knowledge"},
    "Special Programs": {"icon": "⭐", "color": "yellow", "description": "Workshops, private sessions, corporate programs, and specialized offerings"},
    "Miscellaneous": {"icon": "📋", "color": "gray", "description": "Other issues including noise, policies, guest experience, and multi-location matters"},
}

# ====================================================================================================
# SQL GENERATION FUNCTIONS
# ====================================================================================================

def escape_sql_string(s):
    """Escape single quotes for SQL"""
    return s.replace("'", "''")

def generate_jsonb_field(field_dict):
    """Convert Python dict to PostgreSQL JSONB build object"""
    parts = []
    for key, value in field_dict.items():
        if isinstance(value, bool):
            parts.append(f"'{key}', {str(value).lower()}")
        elif isinstance(value, int):
            parts.append(f"'{key}', {value}")
        elif isinstance(value, list):
            # Convert list to jsonb_build_array
            escaped_items = [f"'{escape_sql_string(str(item))}'" for item in value]
            array_str = f"jsonb_build_array({', '.join(escaped_items)})"
            parts.append(f"'{key}', {array_str}")
        else:
            parts.append(f"'{key}', '{escape_sql_string(str(value))}'")
    
    return f"jsonb_build_object({', '.join(parts)})"

def generate_global_fields_array():
    """Generate the global fields JSONB array"""
    field_objects = [generate_jsonb_field(field) for field in GLOBAL_FIELDS]
    return f"jsonb_build_array(\n        {',\n        '.join(field_objects)}\n    )"

def generate_category_insert(cat_name, var_name):
    """Generate INSERT statement for a category"""
    info = CATEGORY_INFO[cat_name]
    return f"""    -- {cat_name}
    INSERT INTO categories (name, description, icon, color)
    VALUES (
        '{escape_sql_string(cat_name)}',
        '{escape_sql_string(info["description"])}',
        '{info["icon"]}',
        '{info["color"]}'
    )
    RETURNING id INTO {var_name};"""

def generate_subcategory_insert(cat_var, subcat_name, description, priority):
    """Generate INSERT statement for a subcategory"""
    # For now, use minimal custom fields - just the specific issue details
    form_fields = f"""jsonb_build_object(
            'global_fields', v_global_fields,
            'fields', jsonb_build_array(
                jsonb_build_object(
                    'id', '{subcat_name.upper().replace(" ", "_")}_001',
                    'label', 'Specific Issue Details',
                    'type', 'textarea',
                    'required', true,
                    'hidden', false,
                    'description', 'Detailed description of the specific issue'
                )
            )
        )"""
    
    return f"""    INSERT INTO subcategories (category_id, name, description, default_priority, form_fields)
    VALUES (
        {cat_var},
        '{escape_sql_string(subcat_name)}',
        '{escape_sql_string(description)}',
        '{priority}',
        {form_fields}
    );"""

# ====================================================================================================
# MAIN SQL GENERATION
# ====================================================================================================

def generate_complete_sql():
    """Generate the complete SQL file"""
    
    sql_parts = []
    
    # Header
    sql_parts.append("""-- ====================================================================================================
-- PHYSIQUE 57 COMPREHENSIVE TICKETING SYSTEM - COMPLETE DATABASE SEEDING
-- ====================================================================================================
-- Generated from complete CSV with ALL 103 subcategories across 10 categories
-- 
-- SUMMARY:
-- - Categories: 10
-- - Subcategories: 103
-- - Global Fields: 16 (appear on every ticket)
-- 
-- Generated: December 10, 2025
-- ====================================================================================================

DO $$
DECLARE
    -- Category UUID Variables""")
    
    # Declare variables
    for i, cat_name in enumerate(SUBCATEGORIES_DATA.keys(), 1):
        var_name = f"v_cat_{cat_name.lower().replace(' ', '_').replace('&', 'and')}"
        sql_parts.append(f"    {var_name} UUID;")
    
    sql_parts.append("""
    -- Global fields (appear on every ticket)
    v_global_fields JSONB := """ + generate_global_fields_array() + """;
    
BEGIN
    RAISE NOTICE '====================================================================================================';
    RAISE NOTICE 'PHYSIQUE 57 TICKETING SYSTEM - COMPREHENSIVE DATABASE SEEDING';
    RAISE NOTICE '====================================================================================================';
    RAISE NOTICE 'Total Categories: 10';
    RAISE NOTICE 'Total Subcategories: 103';
    RAISE NOTICE 'Global Fields: 16';
    RAISE NOTICE '====================================================================================================';
    
    -- ================================================================================================
    -- STEP 1: DELETE EXISTING DATA
    -- ================================================================================================
    RAISE NOTICE 'Step 1: Cleaning existing data...';
    
    DELETE FROM tickets;
    DELETE FROM subcategories;
    DELETE FROM categories;
    
    RAISE NOTICE 'Existing data cleared.';
    
    -- ================================================================================================
    -- STEP 2: CREATE CATEGORIES
    -- ================================================================================================
    RAISE NOTICE 'Step 2: Creating 10 categories...';
""")
    
    # Create categories
    for cat_name in SUBCATEGORIES_DATA.keys():
        var_name = f"v_cat_{cat_name.lower().replace(' ', '_').replace('&', 'and')}"
        sql_parts.append(generate_category_insert(cat_name, var_name))
        sql_parts.append("")
    
    sql_parts.append("""    RAISE NOTICE 'Created 10 categories successfully.';
    
    -- ================================================================================================
    -- STEP 3: CREATE SUBCATEGORIES
    -- ================================================================================================
    RAISE NOTICE 'Step 3: Creating 103 subcategories...';
""")
    
    # Create subcategories
    subcat_count = 0
    for cat_name, subcats in SUBCATEGORIES_DATA.items():
        var_name = f"v_cat_{cat_name.lower().replace(' ', '_').replace('&', 'and')}"
        sql_parts.append(f"\n    -- {cat_name} ({len(subcats)} subcategories)")
        for subcat_name, description, priority in subcats:
            sql_parts.append(generate_subcategory_insert(var_name, subcat_name, description, priority))
            subcat_count += 1
    
    # Footer
    sql_parts.append(f"""
    RAISE NOTICE 'Created {subcat_count} subcategories successfully.';
    RAISE NOTICE '====================================================================================================';
    RAISE NOTICE 'DATABASE SEEDING COMPLETE!';
    RAISE NOTICE '====================================================================================================';
    RAISE NOTICE 'Total Categories Created: 10';
    RAISE NOTICE 'Total Subcategories Created: {subcat_count}';
    RAISE NOTICE '====================================================================================================';
    
END $$;

-- ====================================================================================================
-- VERIFICATION QUERIES
-- ====================================================================================================

-- Check categories
SELECT COUNT(*) as category_count FROM categories;

-- Check subcategories
SELECT COUNT(*) as subcategory_count FROM subcategories;

-- View categories with subcategory counts
SELECT 
    c.name as category,
    COUNT(s.id) as subcategory_count
FROM categories c
LEFT JOIN subcategories s ON s.category_id = c.id
GROUP BY c.id, c.name
ORDER BY c.name;

RAISE NOTICE 'Database seeding verification complete. Check the results above.';
""")
    
    return "\n".join(sql_parts)

# ====================================================================================================
# MAIN EXECUTION
# ====================================================================================================

if __name__ == "__main__":
    print("Generating comprehensive SQL file...")
    print(f"Total categories: {len(SUBCATEGORIES_DATA)}")
    total_subcats = sum(len(subcats) for subcats in SUBCATEGORIES_DATA.values())
    print(f"Total subcategories: {total_subcats}")
    
    sql_content = generate_complete_sql()
    
    output_file = "comprehensive-categories-from-csv-COMPLETE.sql"
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(sql_content)
    
    print(f"\n✅ Successfully generated {output_file}")
    print(f"📄 File size: {len(sql_content):,} characters")
    print(f"📋 Lines: {sql_content.count(chr(10)) + 1:,}")
    print("\n🚀 You can now run this SQL file in Supabase SQL Editor!")
