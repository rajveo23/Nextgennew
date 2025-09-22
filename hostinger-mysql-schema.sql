-- NextGen Registry MySQL Schema for Hostinger
-- Run this in your Hostinger MySQL database

-- Create database (if not exists)
CREATE DATABASE IF NOT EXISTS nextgen_regist;
USE nextgen_regist;

-- Blog Posts Table
CREATE TABLE blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content LONGTEXT NOT NULL,
    excerpt TEXT,
    featured_image_url VARCHAR(500),
    author VARCHAR(100) DEFAULT 'NextGen Registry',
    published BOOLEAN DEFAULT FALSE,
    status ENUM('draft', 'published', 'scheduled') DEFAULT 'draft',
    publish_date DATE,
    category VARCHAR(100),
    views INT DEFAULT 0,
    tags JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_published (published),
    INDEX idx_status (status),
    INDEX idx_category (category)
);

-- FAQs Table
CREATE TABLE faqs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    answer LONGTEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    order_index INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_active (is_active),
    INDEX idx_order (order_index)
);

-- Clients Table
CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    serial_number INT NOT NULL UNIQUE,
    issuer_client_company_name VARCHAR(255) NOT NULL,
    type_of_security VARCHAR(50) NOT NULL,
    isin_of_the_company VARCHAR(20) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_serial (serial_number),
    INDEX idx_active (is_active),
    INDEX idx_isin (isin_of_the_company)
);

-- Contact Submissions Table
CREATE TABLE contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20),
    company VARCHAR(200),
    service VARCHAR(100),
    message LONGTEXT NOT NULL,
    status ENUM('new', 'in_progress', 'resolved', 'closed') DEFAULT 'new',
    source VARCHAR(50) DEFAULT 'website',
    newsletter BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_email (email),
    INDEX idx_created (created_at)
);

-- Newsletter Subscriptions Table
CREATE TABLE newsletter_subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(150) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    source VARCHAR(50) DEFAULT 'website',
    INDEX idx_email (email),
    INDEX idx_active (is_active)
);

-- File Uploads Table
CREATE TABLE file_uploads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT,
    mime_type VARCHAR(100),
    uploaded_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_path (file_path),
    INDEX idx_created (created_at)
);

-- Insert sample data
INSERT INTO blog_posts (title, slug, content, excerpt, author, published, status, publish_date, category, views, tags) VALUES
('MCA Rule 9A: A Breakdown for Private Companies', 'mca-rule-9a-breakdown-for-private-companies', 'Prior to the enforcement of Rule 9A by the Ministry of Corporate Affairs (MCA), dematerialization of shares was merely an optional process for private companies. It was only a mandatory requirement for listed companies and select large companies. However, with the introduction of Rule 9A, the landscape has changed significantly.', 'Prior to the enforcement of Rule 9A by the Ministry of Corporate Affairs (MCA), dematerialization of shares was merely an optional process for private companies.', 'NextGen Registry', TRUE, 'published', '2024-01-15', 'Regulatory Updates', 1250, '["MCA", "Rule 9A", "Dematerialization", "Private Companies"]'),
('Get Expert Tips & Updates On How To Get ISIN For Private Company', 'get-expert-tips-updates-on-how-to-get-isin-for-private-company', 'Getting an ISIN for a private company is a crucial step in the dematerialization process. This comprehensive guide will walk you through the entire process, requirements, and best practices.', 'NextGen Registry provides the best insight on how to get an ISIN for a Private Company. The NextGen Registry blog offers expert tips and keeps you updated.', 'NextGen Registry', TRUE, 'published', '2024-01-10', 'ISIN Services', 890, '["ISIN", "Private Company", "Dematerialization"]');

INSERT INTO faqs (question, answer, category, order_index, is_active) VALUES
('What is ISIN and why do I need it?', 'ISIN (International Securities Identification Number) is a unique 12-character alphanumeric code that identifies a security. It is required for all securities that are traded or held in dematerialized form.', 'ISIN Services', 1, TRUE),
('How long does the ISIN creation process take?', 'The ISIN creation process typically takes 7-10 working days from the date of submission of complete documents, subject to regulatory approvals.', 'ISIN Services', 2, TRUE);

INSERT INTO clients (serial_number, issuer_client_company_name, type_of_security, isin_of_the_company, is_active) VALUES
(1563, 'TIME TODAY MEDIA NETWORK PRIVATE LIMITED', 'EQUITY', 'INE263B04014', TRUE),
(1562, 'SHRIJI POWER & AUTOMATION PRIVATE LIMITED', 'EQUITY', 'INE5ARVY01014', TRUE),
(1561, 'TEEYRA EDUTECH PRIVATE LIMITED', 'EQUITY', 'INE5NKMJ012', TRUE),
(1560, 'FELIX HEALTHCARE PRIVATE LIMITED', 'EQUITY', 'INE5LL901011', TRUE),
(1559, 'MYLO HEALTHCARE PRIVATE LIMITED', 'EQUITY', 'INE5KCZ01016', TRUE);
