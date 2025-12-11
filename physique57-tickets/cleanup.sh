#!/bin/bash

# Cleanup script for Physique 57 Tickets project
# Removes unnecessary files and organizes the project structure

echo "🧹 Cleaning up project..."

# Remove backup files
echo "Removing backup files..."
rm -f *.bak
rm -f *.bak.*
rm -f *~

# Remove old/redundant SQL files (keep the main ones)
echo "Organizing SQL files..."
mkdir -p sql/archive
[ -f "comprehensive-categories-from-csv.sql" ] && mv comprehensive-categories-from-csv.sql sql/archive/
[ -f "comprehensive-categories-from-csv-COMPLETE.sql" ] && mv comprehensive-categories-from-csv-COMPLETE.sql sql/archive/
[ -f "check_subcategories.sql" ] && mv check_subcategories.sql sql/archive/
[ -f "test_subcategory_fields.sql" ] && mv test_subcategory_fields.sql sql/archive/
[ -f "subcategories-scheduling.sql" ] && mv subcategories-scheduling.sql sql/archive/
[ -f "cleanup-database.sql" ] && mv cleanup-database.sql sql/archive/

# Remove redundant documentation (keep the essential ones)
echo "Organizing documentation..."
mkdir -p docs/archive
[ -f "FIX_MISSING_SUBCATEGORIES.md" ] && mv FIX_MISSING_SUBCATEGORIES.md docs/archive/
[ -f "FIELDS_FIX_SUMMARY.md" ] && mv FIELDS_FIX_SUMMARY.md docs/archive/
[ -f "FIELDS_FLOW_DIAGRAM.txt" ] && mv FIELDS_FLOW_DIAGRAM.txt docs/archive/

# Remove old Python scripts (keep the main one)
echo "Organizing scripts..."
[ -f "generate_field_mappings.py" ] && rm -f generate_field_mappings.py
[ -f "generate_complete_sql.py" ] && rm -f generate_complete_sql.py

# Remove redundant JSON files
echo "Organizing JSON files..."
[ -f "field_mappings.json" ] && rm -f field_mappings.json
[ -f "field_mappings_full.json" ] && rm -f field_mappings_full.json

# Clean node modules (will be reinstalled when needed)
# Uncomment if you want to do a fresh install
# echo "Cleaning node_modules..."
# rm -rf node_modules

# Clean build artifacts
echo "Cleaning build artifacts..."
rm -rf build

echo "✓ Cleanup complete!"
echo ""
echo "Project structure cleaned. Key files retained:"
echo "  - complete_field_mapping.py (main script)"
echo "  - update_subcategory_fields.sql (generated SQL)"
echo "  - field_mappings_complete.json (complete mapping)"
echo "  - FIELD_MAPPING_REPORT.md (detailed report)"
echo "  - Essential documentation files"
echo ""
echo "Archived files moved to:"
echo "  - sql/archive/"
echo "  - docs/archive/"
