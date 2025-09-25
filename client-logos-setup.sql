-- Client Logos Table Setup for NextGen Registry
-- Run this in your Supabase SQL Editor

-- Step 1: Create the client_logos table
CREATE TABLE IF NOT EXISTS client_logos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  company_subtitle VARCHAR(255),
  logo_url TEXT,
  logo_path TEXT,
  website_url TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Create index for better performance
CREATE INDEX IF NOT EXISTS idx_client_logos_active_order ON client_logos(is_active, order_index);

-- Step 3: Enable Row Level Security
ALTER TABLE client_logos ENABLE ROW LEVEL SECURITY;

-- Step 4: Create RLS policies
-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public read access for active client logos" ON client_logos;
DROP POLICY IF EXISTS "Allow authenticated users to manage client logos" ON client_logos;

-- Allow public read access for active logos
CREATE POLICY "Allow public read access for active client logos" ON client_logos
  FOR SELECT USING (is_active = true);

-- Allow authenticated users to manage logos (you can restrict this further)
CREATE POLICY "Allow authenticated users to manage client logos" ON client_logos
  FOR ALL USING (true);

-- Step 5: Insert sample client logos
INSERT INTO client_logos (company_name, company_subtitle, order_index, is_active) VALUES
('SANTUR', 'GROUP', 1, true),
('Ford', 'HARPEET FORD', 2, true),
('SBL', 'BIOTECH', 3, true),
('unity', 'GROUP', 4, true),
('OMAXE', 'LIMITED', 5, true),
('oerlikon', 'balzers', 6, true),
('BuyMe', 'PLATFORM', 7, true),
('GRAVITY', 'CAPITAL', 8, true),
('Compunnel', 'SOFTWARE', 9, true),
('MOBI TRADE', 'TECH', 10, true),
('BJAIN', 'PHARMA', 11, true),
('SUNDAY', 'BRICKS', 12, true)
ON CONFLICT (id) DO NOTHING;

-- Verification query (optional - run this to check if everything worked)
SELECT 
  company_name, 
  company_subtitle, 
  order_index, 
  is_active,
  created_at 
FROM client_logos 
ORDER BY order_index;
