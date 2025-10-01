-- Verification script to check all 9 categories
-- Run this to see the current state of your form_categories table

-- Check total count
SELECT 
    'Total Categories' as type,
    COUNT(*) as count
FROM form_categories 
WHERE is_active = true;

-- Check regular forms count
SELECT 
    'Regular Forms' as type,
    COUNT(*) as count
FROM form_categories 
WHERE is_active = true AND is_important_document = false;

-- Check important documents count
SELECT 
    'Important Documents' as type,
    COUNT(*) as count
FROM form_categories 
WHERE is_active = true AND is_important_document = true;

-- List all categories with details
SELECT 
    title,
    description,
    icon_name,
    color_gradient,
    order_index,
    is_important_document,
    is_active,
    created_at
FROM form_categories 
ORDER BY is_important_document, order_index;

-- Count forms per category
SELECT 
    fc.title as category_title,
    fc.is_important_document,
    COUNT(f.id) as form_count
FROM form_categories fc
LEFT JOIN forms f ON fc.id = f.category_id AND f.is_active = true
WHERE fc.is_active = true
GROUP BY fc.id, fc.title, fc.is_important_document, fc.order_index
ORDER BY fc.is_important_document, fc.order_index;

-- Summary report
SELECT 
    CASE 
        WHEN is_important_document THEN 'Important Documents'
        ELSE 'Regular Forms'
    END as category_type,
    COUNT(*) as category_count,
    STRING_AGG(title, ', ' ORDER BY order_index) as categories
FROM form_categories 
WHERE is_active = true
GROUP BY is_important_document
ORDER BY is_important_document;
