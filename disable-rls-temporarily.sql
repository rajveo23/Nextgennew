-- Temporarily disable RLS for testing
-- Run this in your Supabase SQL Editor

-- Disable RLS on all tables
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE faqs DISABLE ROW LEVEL SECURITY;
ALTER TABLE clients DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions DISABLE ROW LEVEL SECURITY;
ALTER TABLE file_uploads DISABLE ROW LEVEL SECURITY;

-- This will allow all operations to work
-- You can re-enable RLS later with proper policies
