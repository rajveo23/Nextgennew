-- Complete database setup with 9 form categories
-- Drop existing tables if they exist (for fresh setup)
DROP TABLE IF EXISTS forms CASCADE;
DROP TABLE IF EXISTS form_categories CASCADE;

-- Create form_categories table
CREATE TABLE IF NOT EXISTS form_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'DocumentTextIcon',
  color_gradient TEXT NOT NULL DEFAULT 'from-blue-500 to-blue-700',
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_important_document BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create forms table
CREATE TABLE IF NOT EXISTS forms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES form_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  file_type TEXT NOT NULL DEFAULT 'PDF',
  file_size TEXT NOT NULL,
  file_url TEXT,
  file_path TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert all 9 form categories (6 regular + 3 important documents)
INSERT INTO form_categories (title, description, icon_name, color_gradient, order_index, is_important_document) VALUES
-- Regular Forms (6 categories)
('ISIN Creation Forms', 'Forms required for ISIN creation and listing processes', 'DocumentTextIcon', 'from-blue-500 to-blue-700', 1, false),
('Shareholder Services', 'Forms for shareholder registration and services', 'UserGroupIcon', 'from-green-500 to-green-700', 2, false),
('Transfer Forms', 'Share transfer and transmission forms', 'BanknotesIcon', 'from-orange-500 to-orange-700', 3, false),
('Dividend Forms', 'Forms related to dividend distribution and claims', 'CurrencyDollarIcon', 'from-emerald-500 to-emerald-700', 4, false),
('Corporate Actions', 'Forms for rights issues, bonus shares, and other corporate actions', 'BuildingOfficeIcon', 'from-indigo-500 to-indigo-700', 5, false),
('KYC Documents', 'Know Your Customer forms and identity verification documents', 'IdentificationIcon', 'from-teal-500 to-teal-700', 6, false),

-- Important Documents (3 categories)
('Compliance Forms', 'Regulatory compliance and reporting forms', 'ClipboardDocumentListIcon', 'from-purple-500 to-purple-700', 100, true),
('Investor Charter', 'Rights and responsibilities of investors', 'DocumentTextIcon', 'from-blue-500 to-blue-700', 101, true),
('Regulatory Documents', 'SEBI registration and regulatory compliance documents', 'DocumentTextIcon', 'from-green-500 to-green-700', 102, true);

-- Insert sample forms for regular categories
INSERT INTO forms (category_id, name, file_type, file_size, order_index) 
SELECT 
  fc.id,
  'ISIN Application Form',
  'PDF',
  '125 KB',
  1
FROM form_categories fc 
WHERE fc.title = 'ISIN Creation Forms';

INSERT INTO forms (category_id, name, file_type, file_size, order_index) 
SELECT 
  fc.id,
  'Listing Agreement',
  'PDF',
  '280 KB',
  2
FROM form_categories fc 
WHERE fc.title = 'ISIN Creation Forms';

INSERT INTO forms (category_id, name, file_type, file_size, order_index) 
SELECT 
  fc.id,
  'Shareholder Registration Form',
  'PDF',
  '95 KB',
  1
FROM form_categories fc 
WHERE fc.title = 'Shareholder Services';

INSERT INTO forms (category_id, name, file_type, file_size, order_index) 
SELECT 
  fc.id,
  'Address Change Form',
  'PDF',
  '75 KB',
  2
FROM form_categories fc 
WHERE fc.title = 'Shareholder Services';

INSERT INTO forms (category_id, name, file_type, file_size, order_index) 
SELECT 
  fc.id,
  'Share Transfer Form',
  'PDF',
  '110 KB',
  1
FROM form_categories fc 
WHERE fc.title = 'Transfer Forms';

INSERT INTO forms (category_id, name, file_type, file_size, order_index) 
SELECT 
  fc.id,
  'Transmission Form',
  'PDF',
  '135 KB',
  2
FROM form_categories fc 
WHERE fc.title = 'Transfer Forms';

INSERT INTO forms (category_id, name, file_type, file_size, order_index) 
SELECT 
  fc.id,
  'Dividend Claim Form',
  'PDF',
  '85 KB',
  1
FROM form_categories fc 
WHERE fc.title = 'Dividend Forms';

INSERT INTO forms (category_id, name, file_type, file_size, order_index) 
SELECT 
  fc.id,
  'Unclaimed Dividend Form',
  'PDF',
  '120 KB',
  2
FROM form_categories fc 
WHERE fc.title = 'Dividend Forms';

INSERT INTO forms (category_id, name, file_type, file_size, order_index) 
SELECT 
  fc.id,
  'Rights Issue Application',
  'PDF',
  '165 KB',
  1
FROM form_categories fc 
WHERE fc.title = 'Corporate Actions';

INSERT INTO forms (category_id, name, file_type, file_size, order_index) 
SELECT 
  fc.id,
  'Bonus Share Form',
  'PDF',
  '145 KB',
  2
FROM form_categories fc 
WHERE fc.title = 'Corporate Actions';

INSERT INTO forms (category_id, name, file_type, file_size, order_index) 
SELECT 
  fc.id,
  'KYC Form',
  'PDF',
  '200 KB',
  1
FROM form_categories fc 
WHERE fc.title = 'KYC Documents';

INSERT INTO forms (category_id, name, file_type, file_size, order_index) 
SELECT 
  fc.id,
  'PAN Card Verification',
  'PDF',
  '90 KB',
  2
FROM form_categories fc 
WHERE fc.title = 'KYC Documents';

-- Insert sample forms for important documents
INSERT INTO forms (category_id, name, file_type, file_size, order_index) 
SELECT 
  fc.id,
  'Annual Compliance Report',
  'PDF',
  '350 KB',
  1
FROM form_categories fc 
WHERE fc.title = 'Compliance Forms';

INSERT INTO forms (category_id, name, file_type, file_size, order_index) 
SELECT 
  fc.id,
  'Quarterly Filing Form',
  'PDF',
  '220 KB',
  2
FROM form_categories fc 
WHERE fc.title = 'Compliance Forms';

INSERT INTO forms (category_id, name, file_type, file_size, order_index) 
SELECT 
  fc.id,
  'RTA Investor Charter',
  'PDF',
  '245 KB',
  1
FROM form_categories fc 
WHERE fc.title = 'Investor Charter';

INSERT INTO forms (category_id, name, file_type, file_size, order_index) 
SELECT 
  fc.id,
  'Grievance Redressal Policy',
  'PDF',
  '180 KB',
  2
FROM form_categories fc 
WHERE fc.title = 'Investor Charter';

INSERT INTO forms (category_id, name, file_type, file_size, order_index) 
SELECT 
  fc.id,
  'SEBI Registration Certificate',
  'PDF',
  '320 KB',
  1
FROM form_categories fc 
WHERE fc.title = 'Regulatory Documents';

INSERT INTO forms (category_id, name, file_type, file_size, order_index) 
SELECT 
  fc.id,
  'Service Level Agreement',
  'PDF',
  '275 KB',
  2
FROM form_categories fc 
WHERE fc.title = 'Regulatory Documents';

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_form_categories_active ON form_categories(is_active);
CREATE INDEX IF NOT EXISTS idx_form_categories_order ON form_categories(order_index);
CREATE INDEX IF NOT EXISTS idx_form_categories_important ON form_categories(is_important_document);
CREATE INDEX IF NOT EXISTS idx_forms_category ON forms(category_id);
CREATE INDEX IF NOT EXISTS idx_forms_active ON forms(is_active);
CREATE INDEX IF NOT EXISTS idx_forms_order ON forms(order_index);

-- Enable RLS (Row Level Security) if needed
ALTER TABLE form_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE forms ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on form_categories" ON form_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access on forms" ON forms FOR SELECT USING (true);

-- Grant permissions
GRANT SELECT ON form_categories TO anon, authenticated;
GRANT SELECT ON forms TO anon, authenticated;
GRANT ALL ON form_categories TO service_role;
GRANT ALL ON forms TO service_role;
