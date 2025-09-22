-- Fix RLS Policies for NextGen Registry
-- Run this in your Supabase SQL Editor

-- First, let's drop the existing restrictive policies and create new ones

-- Drop existing policies
DROP POLICY IF EXISTS "Allow service role full access on blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow service role full access on faqs" ON faqs;
DROP POLICY IF EXISTS "Allow service role full access on clients" ON clients;
DROP POLICY IF EXISTS "Allow service role full access on contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow service role full access on newsletter_subscriptions" ON newsletter_subscriptions;
DROP POLICY IF EXISTS "Allow service role full access on file_uploads" ON file_uploads;

-- Create new policies that work with service role authentication

-- Blog Posts Policies
CREATE POLICY "Allow service role all operations on blog_posts" ON blog_posts FOR ALL USING (true);
CREATE POLICY "Allow public read published blogs" ON blog_posts FOR SELECT USING (published = true);

-- FAQs Policies  
CREATE POLICY "Allow service role all operations on faqs" ON faqs FOR ALL USING (true);
CREATE POLICY "Allow public read active faqs" ON faqs FOR SELECT USING (is_active = true);

-- Clients Policies
CREATE POLICY "Allow service role all operations on clients" ON clients FOR ALL USING (true);
CREATE POLICY "Allow public read active clients" ON clients FOR SELECT USING (is_active = true);

-- Contact Submissions Policies
CREATE POLICY "Allow service role all operations on contact_submissions" ON contact_submissions FOR ALL USING (true);
CREATE POLICY "Allow public insert contact_submissions" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Newsletter Subscriptions Policies
CREATE POLICY "Allow service role all operations on newsletter_subscriptions" ON newsletter_subscriptions FOR ALL USING (true);
CREATE POLICY "Allow public insert newsletter_subscriptions" ON newsletter_subscriptions FOR INSERT WITH CHECK (true);

-- File Uploads Policies
CREATE POLICY "Allow service role all operations on file_uploads" ON file_uploads FOR ALL USING (true);

-- Alternative: If the above doesn't work, temporarily disable RLS for testing
-- (Uncomment these lines if needed)
-- ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE faqs DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE clients DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE newsletter_subscriptions DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE file_uploads DISABLE ROW LEVEL SECURITY;
