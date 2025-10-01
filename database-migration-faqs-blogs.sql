-- Migration to add FAQs and Blog Posts tables

-- Create FAQs table
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Blog Posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  author TEXT NOT NULL DEFAULT 'Admin',
  published BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
  publish_date DATE,
  category TEXT DEFAULT 'General',
  views INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample FAQs
INSERT INTO faqs (question, answer, category, order_index) VALUES
('What is a Registrar and Transfer Agent (RTA)?', 'A Registrar and Transfer Agent (RTA) is a SEBI-registered entity that maintains records of shareholders and handles various services like share transfers, dividend payments, and other corporate actions on behalf of companies.', 'RTA Services', 1),
('What are RTAs, depository participants and depositories?', 'RTAs are entities that maintain shareholder records, Depository Participants (DPs) are intermediaries that provide demat services, and Depositories (NSDL/CDSL) are organizations that hold securities in electronic form.', 'RTA Services', 2),
('What is ISIN?', 'ISIN (International Securities Identification Number) is a unique 12-character code that identifies securities. It is mandatory for all securities to be traded or held in demat form and is required for listing on stock exchanges.', 'ISIN Services', 3),
('How long does ISIN creation take?', 'NextGen Registry provides the fastest ISIN creation service in the industry. Typically, ISIN creation takes 3-5 working days from the submission of complete documents, subject to regulatory approvals.', 'ISIN Services', 4),
('What documents are required for ISIN creation?', 'Required documents include company incorporation certificate, MOA & AOA, board resolution, auditor certificate, specimen signatures, and other specific documents based on the type of security.', 'ISIN Services', 5);

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, author, published, status, publish_date, category, tags) VALUES
('Dematerialization Rules for Private Companies', 'dematerialization-rules-for-private-companies', 'In recent years, the Ministry of Corporate Affairs (MCA) has introduced significant changes to the rules governing dematerialization for private companies. These changes are aimed at enhancing transparency, reducing fraud, and streamlining corporate processes.

## Key Changes in Dematerialization Rules

### Mandatory Dematerialization
Private companies are now required to dematerialize their securities in certain circumstances:
- When issuing securities to more than 200 persons
- When securities are transferred to more than 200 persons
- When the company opts for dematerialization voluntarily

### Benefits of Dematerialization
1. **Enhanced Security**: Physical certificates are prone to loss, theft, or damage
2. **Faster Processing**: Electronic transfers are processed much quicker
3. **Cost Effective**: Reduces printing and handling costs
4. **Better Record Keeping**: Automated maintenance of shareholder records

### Compliance Requirements
Companies must ensure:
- Proper board resolutions for dematerialization
- Appointment of RTA for maintaining records
- Regular reconciliation of demat and physical holdings
- Timely reporting to regulatory authorities

## How NextGen Registry Can Help

As a SEBI-registered RTA, NextGen Registry provides comprehensive support for dematerialization:
- Expert guidance on regulatory compliance
- Seamless conversion from physical to electronic form
- Ongoing maintenance of shareholder records
- Regular compliance reporting

For more information on dematerialization services, contact our expert team.', 'A complete guide to the new dematerialization rules for private companies and how they impact your business operations.', 'NextGen Team', true, 'published', '2024-09-22', 'Demat Services', '{"dematerialization", "private companies", "compliance", "MCA rules"}');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_active ON faqs(is_active);
CREATE INDEX IF NOT EXISTS idx_faqs_order ON faqs(order_index);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_publish_date ON blog_posts(publish_date);
