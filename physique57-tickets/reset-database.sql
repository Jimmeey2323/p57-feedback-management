-- Quick Reset Script
-- Run this ONLY if you want to completely reset your database
-- WARNING: This will delete ALL data!

-- Drop all tables in reverse order (to handle foreign keys)
DROP TABLE IF EXISTS escalation_rules CASCADE;
DROP TABLE IF EXISTS auto_assignment_rules CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS ticket_history CASCADE;
DROP TABLE IF EXISTS ticket_attachments CASCADE;
DROP TABLE IF EXISTS ticket_responses CASCADE;
DROP TABLE IF EXISTS tickets CASCADE;
DROP TABLE IF EXISTS subcategories CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS teams CASCADE;

-- Drop lookup tables if they exist
DROP TABLE IF EXISTS class_types CASCADE;
DROP TABLE IF EXISTS trainer_list CASCADE;
DROP TABLE IF EXISTS studio_locations CASCADE;

-- Drop sequences
DROP SEQUENCE IF EXISTS ticket_number_seq CASCADE;

-- Now you can run database-setup.sql from scratch
