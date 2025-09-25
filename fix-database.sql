-- Add the missing column to form_categories table
ALTER TABLE form_categories 
ADD COLUMN IF NOT EXISTS is_important_document BOOLEAN DEFAULT false;

-- Update existing categories to mark some as important documents
UPDATE form_categories 
SET is_important_document = true 
WHERE title ILIKE '%compliance%' 
   OR title ILIKE '%regulatory%' 
   OR title ILIKE '%important%'
   OR title ILIKE '%document%'
   OR title ILIKE '%charter%';

-- Insert sample important document categories
INSERT INTO form_categories (title, description, icon_name, color_gradient, order_index, is_important_document, is_active) VALUES
('Investor Charter', 'Rights and responsibilities of investors', 'DocumentTextIcon', 'from-blue-500 to-blue-700', 100, true, true),
('Regulatory Documents', 'SEBI registration and regulatory compliance documents', 'DocumentTextIcon', 'from-green-500 to-green-700', 101, true, true),
('Process Guides', 'Step-by-step guides for various RTA processes', 'DocumentTextIcon', 'from-purple-500 to-purple-700', 102, true, true)
ON CONFLICT (title) DO UPDATE SET 
  is_important_document = EXCLUDED.is_important_document,
  description = EXCLUDED.description;

-- Insert sample forms for important documents
DO $$
DECLARE
    investor_charter_id UUID;
    regulatory_docs_id UUID;
    process_guides_id UUID;
BEGIN
    -- Get category IDs
    SELECT id INTO investor_charter_id FROM form_categories WHERE title = 'Investor Charter';
    SELECT id INTO regulatory_docs_id FROM form_categories WHERE title = 'Regulatory Documents';
    SELECT id INTO process_guides_id FROM form_categories WHERE title = 'Process Guides';
    
    -- Insert forms for Investor Charter
    IF investor_charter_id IS NOT NULL THEN
        INSERT INTO forms (category_id, name, file_type, file_size, order_index, is_active) VALUES
        (investor_charter_id, 'RTA Investor Charter', 'PDF', '245 KB', 1, true),
        (investor_charter_id, 'Grievance Redressal Policy', 'PDF', '180 KB', 2, true)
        ON CONFLICT (name, category_id) DO NOTHING;
    END IF;
    
    -- Insert forms for Regulatory Documents
    IF regulatory_docs_id IS NOT NULL THEN
        INSERT INTO forms (category_id, name, file_type, file_size, order_index, is_active) VALUES
        (regulatory_docs_id, 'SEBI Registration Certificate', 'PDF', '320 KB', 1, true),
        (regulatory_docs_id, 'Service Level Agreement', 'PDF', '275 KB', 2, true)
        ON CONFLICT (name, category_id) DO NOTHING;
    END IF;
    
    -- Insert forms for Process Guides
    IF process_guides_id IS NOT NULL THEN
        INSERT INTO forms (category_id, name, file_type, file_size, order_index, is_active) VALUES
        (process_guides_id, 'ISIN Creation Process Guide', 'PDF', '450 KB', 1, true),
        (process_guides_id, 'Demat Process Guide', 'PDF', '380 KB', 2, true)
        ON CONFLICT (name, category_id) DO NOTHING;
    END IF;
END $$;
