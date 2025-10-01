-- Migration script to ensure 9 categories exist (without dropping existing data)
-- This script safely adds missing categories and updates existing ones

-- Step 1: Add is_important_document column if it doesn't exist
ALTER TABLE form_categories 
ADD COLUMN IF NOT EXISTS is_important_document BOOLEAN DEFAULT false;

-- Step 2: Add UNIQUE constraint on title if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'form_categories_title_key' 
        AND table_name = 'form_categories'
    ) THEN
        ALTER TABLE form_categories ADD CONSTRAINT form_categories_title_key UNIQUE (title);
    END IF;
END $$;

-- Step 3: Update existing Compliance Forms to be marked as important
UPDATE form_categories 
SET is_important_document = true 
WHERE title ILIKE '%compliance%';

-- Step 4: Insert missing regular form categories (6 total)
INSERT INTO form_categories (title, description, icon_name, color_gradient, order_index, is_important_document, is_active)
VALUES 
('ISIN Creation Forms', 'Forms required for ISIN creation and listing processes', 'DocumentTextIcon', 'from-blue-500 to-blue-700', 1, false, true),
('Shareholder Services', 'Forms for shareholder registration and services', 'UserGroupIcon', 'from-green-500 to-green-700', 2, false, true),
('Transfer Forms', 'Share transfer and transmission forms', 'BanknotesIcon', 'from-orange-500 to-orange-700', 3, false, true),
('Dividend Forms', 'Forms related to dividend distribution and claims', 'CurrencyDollarIcon', 'from-emerald-500 to-emerald-700', 4, false, true),
('Corporate Actions', 'Forms for rights issues, bonus shares, and other corporate actions', 'BuildingOfficeIcon', 'from-indigo-500 to-indigo-700', 5, false, true),
('KYC Documents', 'Know Your Customer forms and identity verification documents', 'IdentificationIcon', 'from-teal-500 to-teal-700', 6, false, true)
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  icon_name = EXCLUDED.icon_name,
  color_gradient = EXCLUDED.color_gradient,
  order_index = EXCLUDED.order_index,
  is_important_document = EXCLUDED.is_important_document,
  is_active = EXCLUDED.is_active;

-- Step 5: Insert missing important document categories (3 total)
INSERT INTO form_categories (title, description, icon_name, color_gradient, order_index, is_important_document, is_active)
VALUES 
('Compliance Forms', 'Regulatory compliance and reporting forms', 'ClipboardDocumentListIcon', 'from-purple-500 to-purple-700', 100, true, true),
('Investor Charter', 'Rights and responsibilities of investors', 'DocumentTextIcon', 'from-blue-500 to-blue-700', 101, true, true),
('Regulatory Documents', 'SEBI registration and regulatory compliance documents', 'DocumentTextIcon', 'from-green-500 to-green-700', 102, true, true)
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  icon_name = EXCLUDED.icon_name,
  color_gradient = EXCLUDED.color_gradient,
  order_index = EXCLUDED.order_index,
  is_important_document = EXCLUDED.is_important_document,
  is_active = EXCLUDED.is_active;

-- Step 6: Insert sample forms for new categories (only if they don't exist)

-- ISIN Creation Forms
INSERT INTO forms (category_id, name, file_type, file_size, order_index, is_active) 
SELECT 
  fc.id,
  'ISIN Application Form',
  'PDF',
  '125 KB',
  1,
  true
FROM form_categories fc 
WHERE fc.title = 'ISIN Creation Forms'
AND NOT EXISTS (SELECT 1 FROM forms f WHERE f.category_id = fc.id AND f.name = 'ISIN Application Form');

INSERT INTO forms (category_id, name, file_type, file_size, order_index, is_active) 
SELECT 
  fc.id,
  'Listing Agreement',
  'PDF',
  '280 KB',
  2,
  true
FROM form_categories fc 
WHERE fc.title = 'ISIN Creation Forms'
AND NOT EXISTS (SELECT 1 FROM forms f WHERE f.category_id = fc.id AND f.name = 'Listing Agreement');

-- Shareholder Services
INSERT INTO forms (category_id, name, file_type, file_size, order_index, is_active) 
SELECT 
  fc.id,
  'Shareholder Registration Form',
  'PDF',
  '95 KB',
  1,
  true
FROM form_categories fc 
WHERE fc.title = 'Shareholder Services'
AND NOT EXISTS (SELECT 1 FROM forms f WHERE f.category_id = fc.id AND f.name = 'Shareholder Registration Form');

INSERT INTO forms (category_id, name, file_type, file_size, order_index, is_active) 
SELECT 
  fc.id,
  'Address Change Form',
  'PDF',
  '75 KB',
  2,
  true
FROM form_categories fc 
WHERE fc.title = 'Shareholder Services'
AND NOT EXISTS (SELECT 1 FROM forms f WHERE f.category_id = fc.id AND f.name = 'Address Change Form');

-- Transfer Forms
INSERT INTO forms (category_id, name, file_type, file_size, order_index, is_active) 
SELECT 
  fc.id,
  'Share Transfer Form',
  'PDF',
  '110 KB',
  1,
  true
FROM form_categories fc 
WHERE fc.title = 'Transfer Forms'
AND NOT EXISTS (SELECT 1 FROM forms f WHERE f.category_id = fc.id AND f.name = 'Share Transfer Form');

INSERT INTO forms (category_id, name, file_type, file_size, order_index, is_active) 
SELECT 
  fc.id,
  'Transmission Form',
  'PDF',
  '135 KB',
  2,
  true
FROM form_categories fc 
WHERE fc.title = 'Transfer Forms'
AND NOT EXISTS (SELECT 1 FROM forms f WHERE f.category_id = fc.id AND f.name = 'Transmission Form');

-- Dividend Forms
INSERT INTO forms (category_id, name, file_type, file_size, order_index, is_active) 
SELECT 
  fc.id,
  'Dividend Claim Form',
  'PDF',
  '85 KB',
  1,
  true
FROM form_categories fc 
WHERE fc.title = 'Dividend Forms'
AND NOT EXISTS (SELECT 1 FROM forms f WHERE f.category_id = fc.id AND f.name = 'Dividend Claim Form');

INSERT INTO forms (category_id, name, file_type, file_size, order_index, is_active) 
SELECT 
  fc.id,
  'Unclaimed Dividend Form',
  'PDF',
  '120 KB',
  2,
  true
FROM form_categories fc 
WHERE fc.title = 'Dividend Forms'
AND NOT EXISTS (SELECT 1 FROM forms f WHERE f.category_id = fc.id AND f.name = 'Unclaimed Dividend Form');

-- Corporate Actions
INSERT INTO forms (category_id, name, file_type, file_size, order_index, is_active) 
SELECT 
  fc.id,
  'Rights Issue Application',
  'PDF',
  '165 KB',
  1,
  true
FROM form_categories fc 
WHERE fc.title = 'Corporate Actions'
AND NOT EXISTS (SELECT 1 FROM forms f WHERE f.category_id = fc.id AND f.name = 'Rights Issue Application');

INSERT INTO forms (category_id, name, file_type, file_size, order_index, is_active) 
SELECT 
  fc.id,
  'Bonus Share Form',
  'PDF',
  '145 KB',
  2,
  true
FROM form_categories fc 
WHERE fc.title = 'Corporate Actions'
AND NOT EXISTS (SELECT 1 FROM forms f WHERE f.category_id = fc.id AND f.name = 'Bonus Share Form');

-- KYC Documents
INSERT INTO forms (category_id, name, file_type, file_size, order_index, is_active) 
SELECT 
  fc.id,
  'KYC Form',
  'PDF',
  '200 KB',
  1,
  true
FROM form_categories fc 
WHERE fc.title = 'KYC Documents'
AND NOT EXISTS (SELECT 1 FROM forms f WHERE f.category_id = fc.id AND f.name = 'KYC Form');

INSERT INTO forms (category_id, name, file_type, file_size, order_index, is_active) 
SELECT 
  fc.id,
  'PAN Card Verification',
  'PDF',
  '90 KB',
  2,
  true
FROM form_categories fc 
WHERE fc.title = 'KYC Documents'
AND NOT EXISTS (SELECT 1 FROM forms f WHERE f.category_id = fc.id AND f.name = 'PAN Card Verification');

-- Compliance Forms (additional forms)
INSERT INTO forms (category_id, name, file_type, file_size, order_index, is_active) 
SELECT 
  fc.id,
  'Annual Compliance Report',
  'PDF',
  '350 KB',
  1,
  true
FROM form_categories fc 
WHERE fc.title = 'Compliance Forms'
AND NOT EXISTS (SELECT 1 FROM forms f WHERE f.category_id = fc.id AND f.name = 'Annual Compliance Report');

INSERT INTO forms (category_id, name, file_type, file_size, order_index, is_active) 
SELECT 
  fc.id,
  'Quarterly Filing Form',
  'PDF',
  '220 KB',
  2,
  true
FROM form_categories fc 
WHERE fc.title = 'Compliance Forms'
AND NOT EXISTS (SELECT 1 FROM forms f WHERE f.category_id = fc.id AND f.name = 'Quarterly Filing Form');

-- Investor Charter
INSERT INTO forms (category_id, name, file_type, file_size, order_index, is_active) 
SELECT 
  fc.id,
  'RTA Investor Charter',
  'PDF',
  '245 KB',
  1,
  true
FROM form_categories fc 
WHERE fc.title = 'Investor Charter'
AND NOT EXISTS (SELECT 1 FROM forms f WHERE f.category_id = fc.id AND f.name = 'RTA Investor Charter');

INSERT INTO forms (category_id, name, file_type, file_size, order_index, is_active) 
SELECT 
  fc.id,
  'Grievance Redressal Policy',
  'PDF',
  '180 KB',
  2,
  true
FROM form_categories fc 
WHERE fc.title = 'Investor Charter'
AND NOT EXISTS (SELECT 1 FROM forms f WHERE f.category_id = fc.id AND f.name = 'Grievance Redressal Policy');

-- Regulatory Documents
INSERT INTO forms (category_id, name, file_type, file_size, order_index, is_active) 
SELECT 
  fc.id,
  'SEBI Registration Certificate',
  'PDF',
  '320 KB',
  1,
  true
FROM form_categories fc 
WHERE fc.title = 'Regulatory Documents'
AND NOT EXISTS (SELECT 1 FROM forms f WHERE f.category_id = fc.id AND f.name = 'SEBI Registration Certificate');

INSERT INTO forms (category_id, name, file_type, file_size, order_index, is_active) 
SELECT 
  fc.id,
  'Service Level Agreement',
  'PDF',
  '275 KB',
  2,
  true
FROM form_categories fc 
WHERE fc.title = 'Regulatory Documents'
AND NOT EXISTS (SELECT 1 FROM forms f WHERE f.category_id = fc.id AND f.name = 'Service Level Agreement');

-- Step 7: Create missing indexes
CREATE INDEX IF NOT EXISTS idx_form_categories_important ON form_categories(is_important_document);
CREATE INDEX IF NOT EXISTS idx_form_categories_title ON form_categories(title);

-- Step 8: Verify the count
DO $$ 
DECLARE
    category_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO category_count FROM form_categories WHERE is_active = true;
    RAISE NOTICE 'Total active categories: %', category_count;
    
    IF category_count = 9 THEN
        RAISE NOTICE 'SUCCESS: All 9 categories are now present!';
    ELSE
        RAISE NOTICE 'WARNING: Expected 9 categories but found %', category_count;
    END IF;
END $$;
