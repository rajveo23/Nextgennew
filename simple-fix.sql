-- Step 1: Add the missing column
ALTER TABLE form_categories 
ADD COLUMN IF NOT EXISTS is_important_document BOOLEAN DEFAULT false;

-- Step 2: Update existing Compliance Forms to be marked as important
UPDATE form_categories 
SET is_important_document = true 
WHERE title ILIKE '%compliance%';

-- Step 3: Insert new categories (without ON CONFLICT)
-- First check if they exist, if not insert them
INSERT INTO form_categories (title, description, icon_name, color_gradient, order_index, is_important_document, is_active)
SELECT 'Investor Charter', 'Rights and responsibilities of investors', 'DocumentTextIcon', 'from-blue-500 to-blue-700', 100, true, true
WHERE NOT EXISTS (SELECT 1 FROM form_categories WHERE title = 'Investor Charter');

INSERT INTO form_categories (title, description, icon_name, color_gradient, order_index, is_important_document, is_active)
SELECT 'Regulatory Documents', 'SEBI registration and regulatory compliance documents', 'DocumentTextIcon', 'from-green-500 to-green-700', 101, true, true
WHERE NOT EXISTS (SELECT 1 FROM form_categories WHERE title = 'Regulatory Documents');

INSERT INTO form_categories (title, description, icon_name, color_gradient, order_index, is_important_document, is_active)
SELECT 'Process Guides', 'Step-by-step guides for various RTA processes', 'DocumentTextIcon', 'from-purple-500 to-purple-700', 102, true, true
WHERE NOT EXISTS (SELECT 1 FROM form_categories WHERE title = 'Process Guides');
