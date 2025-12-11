-- ====================================================================================================
-- CLEANUP: Remove ALL existing data before running the complete SQL
-- ====================================================================================================
-- Run this FIRST, then run comprehensive-categories-from-csv-COMPLETE.sql

-- Delete all tickets (must be first due to foreign keys)
DELETE FROM tickets;

-- Delete all subcategories (must be before categories)
DELETE FROM subcategories;

-- Delete all categories
DELETE FROM categories;

-- Verify everything is deleted
SELECT 'Categories' as table_name, COUNT(*) as count FROM categories
UNION ALL
SELECT 'Subcategories' as table_name, COUNT(*) as count FROM subcategories
UNION ALL
SELECT 'Tickets' as table_name, COUNT(*) as count FROM tickets;

-- All counts should be 0
