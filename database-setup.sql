-- Create form_categories table
CREATE TABLE IF NOT EXISTS form_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'DocumentTextIcon',
  color_gradient TEXT NOT NULL DEFAULT 'from-blue-500 to-blue-700',
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
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

-- Insert sample form categories
INSERT INTO form_categories (title, description, icon_name, color_gradient, order_index) VALUES
('ISIN Creation Forms', 'Forms required for ISIN creation and listing processes', 'DocumentTextIcon', 'from-blue-500 to-blue-700', 1),
('Shareholder Services', 'Forms for shareholder registration and services', 'UserGroupIcon', 'from-green-500 to-green-700', 2),
('Compliance Forms', 'Regulatory compliance and reporting forms', 'ClipboardDocumentListIcon', 'from-purple-500 to-purple-700', 3),
('Transfer Forms', 'Share transfer and transmission forms', 'BanknotesIcon', 'from-orange-500 to-orange-700', 4)
ON CONFLICT (id) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_form_categories_active ON form_categories(is_active);
CREATE INDEX IF NOT EXISTS idx_form_categories_order ON form_categories(order_index);
CREATE INDEX IF NOT EXISTS idx_forms_category ON forms(category_id);
CREATE INDEX IF NOT EXISTS idx_forms_active ON forms(is_active);
CREATE INDEX IF NOT EXISTS idx_forms_order ON forms(order_index);
