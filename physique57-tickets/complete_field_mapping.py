#!/usr/bin/env python3
"""
Complete Field Mapping Script
Maps fields from fields.csv to subcategories from Sub-Categories.csv
Generates SQL statements to update the database with form_fields JSON
"""

import csv
import json
from collections import defaultdict
from typing import Dict, List, Any

# Field type mappings from CSV to form field types
FIELD_TYPE_MAP = {
    'Text': 'text',
    'Long Text': 'textarea',
    'Dropdown': 'dropdown',
    'Email': 'email',
    'Phone': 'tel',
    'Number': 'number',
    'DateTime': 'datetime',
    'Date': 'date',
    'Time': 'time',
    'Checkbox': 'checkbox',
    'Radio': 'radio',
    'Radio Button': 'radio',
    'Multi-select': 'multiselect',
    'Multi-select Checkbox': 'multiselect',
    'File Upload': 'file',
    'Auto-generated': 'readonly',
}

def parse_options(options_str: str) -> List[str] | None:
    """Parse options from CSV format (pipe-separated)"""
    if not options_str or options_str.strip() in ['', 'N/A', 'Free text', 'Free text entry']:
        return None
    
    # Handle special cases
    if 'list' in options_str.lower():
        return None  # Dynamic lists will be loaded from database
    
    # Split by pipe for dropdown/select options
    if '|' in options_str:
        options = [opt.strip() for opt in options_str.split('|') if opt.strip()]
        return options if options else None
    
    return None

def generate_field_key(label: str) -> str:
    """Generate a camelCase field key from label"""
    # Remove special characters and split into words
    clean = label.replace('/', ' ').replace('(', '').replace(')', '').replace('-', ' ').replace('&', 'and')
    words = [w for w in clean.split() if w]
    
    if not words:
        return 'field'
    
    # Convert to camelCase
    return words[0].lower() + ''.join(word.capitalize() for word in words[1:])

def load_categories_subcategories(csv_path: str) -> Dict[str, List[str]]:
    """Load all categories and their subcategories from fields.csv"""
    category_map = defaultdict(set)
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f, delimiter='\t')
        
        for row in reader:
            category = row['Category'].strip()
            subcategory = row['Sub Category'].strip()
            if category and subcategory:
                category_map[category].add(subcategory)
    
    # Convert sets to sorted lists
    return {cat: sorted(list(subs)) for cat, subs in category_map.items()}

def load_fields_from_csv(csv_path: str) -> Dict[str, List[Dict[str, Any]]]:
    """Load all fields from fields.csv, grouped by subcategory"""
    fields_by_subcategory = defaultdict(list)
    global_fields = []
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f, delimiter='\t')
        
        for row in reader:
            # Extract field information
            label = row['Label'].strip()
            field_type = row['Field Type'].strip()
            options = row['Options/Other Details'].strip()
            subcategory = row['Sub Category'].strip()
            category = row['Category'].strip()
            unique_id = row['Unique ID'].strip()
            description = row['Description'].strip()
            is_required = row['Is Required'].strip().lower() == 'yes'
            is_hidden = row['Is Hidden'].strip().lower() == 'yes'
            
            # Skip hidden fields
            if is_hidden:
                continue
            
            # Map field type
            mapped_type = FIELD_TYPE_MAP.get(field_type, 'text')
            
            # Generate field key
            field_key = generate_field_key(label)
            
            # Parse options
            field_options = parse_options(options)
            
            # Build field object
            field = {
                'id': unique_id,
                'key': field_key,
                'label': label,
                'type': mapped_type,
                'required': is_required,
                'description': description,
            }
            
            # Add options if present
            if field_options:
                field['options'] = field_options
            
            # Add placeholder based on type
            if mapped_type in ['text', 'email', 'tel', 'number']:
                field['placeholder'] = f"Enter {label.lower()}..."
            elif mapped_type == 'textarea':
                field['placeholder'] = f"Provide details for {label.lower()}..."
            elif mapped_type == 'date':
                field['placeholder'] = 'Select date...'
            elif mapped_type == 'datetime':
                field['placeholder'] = 'Select date and time...'
            elif mapped_type == 'time':
                field['placeholder'] = 'Select time...'
            
            # Validation rules
            if mapped_type == 'email':
                field['validation'] = {'type': 'email'}
            elif mapped_type == 'tel':
                field['validation'] = {'type': 'phone'}
            elif mapped_type == 'number':
                field['validation'] = {'type': 'number', 'min': 0}
            
            # Categorize by subcategory
            if subcategory == 'Global':
                global_fields.append(field)
            else:
                key = f"{category}::{subcategory}"
                fields_by_subcategory[key].append(field)
    
    return fields_by_subcategory, global_fields

def generate_sql_updates(fields_map: Dict[str, List[Dict[str, Any]]], output_file: str):
    """Generate SQL UPDATE statements for all subcategories"""
    
    print(f"Generating SQL updates to {output_file}...")
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("-- SQL to update subcategories with form fields\n")
        f.write("-- Generated by complete_field_mapping.py\n")
        f.write("-- Run this in your Supabase SQL editor\n\n")
        f.write("BEGIN;\n\n")
        
        count = 0
        for subcat_key, fields in sorted(fields_map.items()):
            category, subcategory = subcat_key.split('::')
            
            # Create form_fields JSON
            form_fields = {
                'fields': fields
            }
            
            form_fields_json = json.dumps(form_fields, indent=2)
            
            # Escape single quotes for SQL
            form_fields_json_escaped = form_fields_json.replace("'", "''")
            
            f.write(f"-- Update: {subcategory} ({category})\n")
            f.write(f"UPDATE subcategories \n")
            f.write(f"SET form_fields = '{form_fields_json_escaped}'::jsonb\n")
            subcategory_escaped = subcategory.replace("'", "''")
            category_escaped = category.replace("'", "''")
            f.write(f"WHERE name = '{subcategory_escaped}' \n")
            f.write(f"  AND category_id = (SELECT id FROM categories WHERE name = '{category_escaped}');\n\n")
            
            count += 1
        
        f.write("COMMIT;\n\n")
        f.write(f"-- Total subcategories updated: {count}\n")
    
    print(f"✓ SQL file generated: {output_file}")
    print(f"✓ Total subcategories: {count}")

def generate_mapping_report(
    fields_map: Dict[str, List[Dict[str, Any]]], 
    global_fields: List[Dict[str, Any]],
    category_map: Dict[str, List[str]],
    output_file: str
):
    """Generate a detailed mapping report"""
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("# Field Mapping Report\n\n")
        f.write(f"Generated: {json.dumps({'timestamp': 'now'})}\n\n")
        
        # Summary statistics
        f.write("## Summary\n\n")
        f.write(f"- Total Categories: {len(category_map)}\n")
        f.write(f"- Total Subcategories: {sum(len(subs) for subs in category_map.values())}\n")
        f.write(f"- Subcategories with Fields: {len(fields_map)}\n")
        f.write(f"- Global Fields: {len(global_fields)}\n")
        total_fields = sum(len(fields) for fields in fields_map.values())
        f.write(f"- Total Mapped Fields: {total_fields}\n\n")
        
        # Categories overview
        f.write("## Categories & Subcategories\n\n")
        for category, subcategories in sorted(category_map.items()):
            f.write(f"### {category}\n")
            for sub in subcategories:
                key = f"{category}::{sub}"
                field_count = len(fields_map.get(key, []))
                status = "✓" if field_count > 0 else "✗"
                f.write(f"- {status} {sub} ({field_count} fields)\n")
            f.write("\n")
        
        # Global fields
        f.write("## Global Fields\n\n")
        f.write("These fields appear in all tickets:\n\n")
        for field in global_fields:
            f.write(f"- **{field['label']}** (`{field['key']}`) - {field['type']}")
            if field['required']:
                f.write(" [Required]")
            f.write(f"\n  - {field['description']}\n")
        f.write("\n")
        
        # Detailed field mapping
        f.write("## Detailed Field Mappings\n\n")
        for subcat_key, fields in sorted(fields_map.items()):
            category, subcategory = subcat_key.split('::')
            f.write(f"### {subcategory} ({category})\n\n")
            f.write(f"**{len(fields)} fields:**\n\n")
            
            for field in fields:
                f.write(f"- **{field['label']}** (`{field['id']}`)\n")
                f.write(f"  - Type: `{field['type']}`\n")
                f.write(f"  - Required: {'Yes' if field['required'] else 'No'}\n")
                f.write(f"  - Description: {field['description']}\n")
                if field.get('options'):
                    f.write(f"  - Options: {', '.join(field['options'][:5])}")
                    if len(field['options']) > 5:
                        f.write(f" ... ({len(field['options'])} total)")
                    f.write("\n")
                f.write("\n")
    
    print(f"✓ Mapping report generated: {output_file}")

def save_json_mapping(fields_map: Dict[str, List[Dict[str, Any]]], global_fields: List[Dict[str, Any]], output_file: str):
    """Save the complete mapping as JSON"""
    
    output = {
        'global_fields': global_fields,
        'subcategory_fields': {k: v for k, v in fields_map.items()}
    }
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2)
    
    print(f"✓ JSON mapping saved: {output_file}")

def main():
    print("=" * 60)
    print("Complete Field Mapping Script")
    print("=" * 60)
    print()
    
    # File paths
    fields_csv = 'public/fields.csv'
    sql_output = 'update_subcategory_fields.sql'
    json_output = 'field_mappings_complete.json'
    report_output = 'FIELD_MAPPING_REPORT.md'
    
    # Load categories and subcategories
    print("📁 Loading categories and subcategories...")
    category_map = load_categories_subcategories(fields_csv)
    print(f"   Found {len(category_map)} categories")
    print(f"   Found {sum(len(subs) for subs in category_map.values())} subcategories")
    print()
    
    # Load fields
    print("📋 Loading fields from CSV...")
    fields_map, global_fields = load_fields_from_csv(fields_csv)
    print(f"   Found {len(global_fields)} global fields")
    print(f"   Found {sum(len(f) for f in fields_map.values())} subcategory-specific fields")
    print(f"   Mapped to {len(fields_map)} subcategories")
    print()
    
    # Generate SQL
    print("🔧 Generating SQL updates...")
    generate_sql_updates(fields_map, sql_output)
    print()
    
    # Save JSON
    print("💾 Saving JSON mapping...")
    save_json_mapping(fields_map, global_fields, json_output)
    print()
    
    # Generate report
    print("📊 Generating mapping report...")
    generate_mapping_report(fields_map, global_fields, category_map, report_output)
    print()
    
    print("=" * 60)
    print("✓ Field mapping complete!")
    print("=" * 60)
    print()
    print("Next steps:")
    print("1. Review the report: FIELD_MAPPING_REPORT.md")
    print("2. Check the JSON: field_mappings_complete.json")
    print("3. Run the SQL: update_subcategory_fields.sql")
    print()

if __name__ == '__main__':
    main()
