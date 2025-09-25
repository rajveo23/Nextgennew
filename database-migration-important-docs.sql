-- Add is_important_document column to form_categories table
ALTER TABLE form_categories 
ADD COLUMN IF NOT EXISTS is_important_document BOOLEAN DEFAULT false;

-- Update existing categories to mark some as important documents
UPDATE form_categories 
SET is_important_document = true 
WHERE title ILIKE '%charter%' 
   OR title ILIKE '%regulatory%' 
   OR title ILIKE '%compliance%'
   OR title ILIKE '%important%'
   OR title ILIKE '%document%';

-- Insert some sample important document categories if they don't exist
INSERT INTO form_categories (title, description, icon_name, color_gradient, order_index, is_important_document) VALUES
('Investor Charter', 'Rights and responsibilities of investors', 'DocumentTextIcon', 'from-blue-500 to-blue-700', 100, true),
('Regulatory Documents', 'SEBI registration and regulatory compliance documents', 'DocumentTextIcon', 'from-green-500 to-green-700', 101, true),
('Process Guides', 'Step-by-step guides for various RTA processes', 'DocumentTextIcon', 'from-purple-500 to-purple-700', 102, true)
ON CONFLICT (title) DO UPDATE SET 
  is_important_document = EXCLUDED.is_important_document,
  description = EXCLUDED.description,
  icon_name = EXCLUDED.icon_name,
  color_gradient = EXCLUDED.color_gradient;

-- Insert sample forms for important documents
INSERT INTO forms (category_id, name, file_type, file_size, order_index) 
SELECT 
  fc.id,
  'RTA Investor Charter',
  'PDF',
  '245 KB',
  1
FROM form_categories fc 
WHERE fc.title = 'Investor Charter'
ON CONFLICT DO NOTHING;

INSERT INTO forms (category_id, name, file_type, file_size, order_index) 
SELECT 
  fc.id,
  'Grievance Redressal Policy',
  'PDF',
  '180 KB',
  2
FROM form_categories fc 
WHERE fc.title = 'Investor Charter'
ON CONFLICT DO NOTHING;

INSERT INTO forms (category_id, name, file_type, file_size, order_index) 
SELECT 
  fc.id,
  'SEBI Registration Certificate',
  'PDF',
  '320 KB',
  1
FROM form_categories fc 
WHERE fc.title = 'Regulatory Documents'
ON CONFLICT DO NOTHING;

INSERT INTO forms (category_id, name, file_type, file_size, order_index) 
SELECT 
  fc.id,
  'Service Level Agreement',
  'PDF',
  '275 KB',
  2
FROM form_categories fc 
WHERE fc.title = 'Regulatory Documents'
ON CONFLICT DO NOTHING;

INSERT INTO forms (category_id, name, file_type, file_size, order_index) 
SELECT 
  fc.id,
  'ISIN Creation Process Guide',
  'PDF',
  '450 KB',
  1
FROM form_categories fc 
WHERE fc.title = 'Process Guides'
ON CONFLICT DO NOTHING;

INSERT INTO forms (category_id, name, file_type, file_size, order_index) 
SELECT 
  fc.id,
  'Demat Process Guide',
  'PDF',
  '380 KB',
  2
FROM form_categories fc 
WHERE fc.title = 'Process Guides'
ON CONFLICT DO NOTHING;
