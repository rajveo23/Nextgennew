-- Create clients table for NextGen Registry
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    serial_number INTEGER UNIQUE NOT NULL,
    issuer_client_company_name TEXT NOT NULL,
    type_of_security TEXT NOT NULL,
    isin_of_the_company TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_clients_serial_number ON clients(serial_number);
CREATE INDEX IF NOT EXISTS idx_clients_is_active ON clients(is_active);
CREATE INDEX IF NOT EXISTS idx_clients_type_of_security ON clients(type_of_security);

-- Enable Row Level Security (RLS)
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Create policies for service role access
CREATE POLICY "Allow service role all operations on clients" 
ON clients FOR ALL 
USING (true);

-- Create policy for public read access to active clients
CREATE POLICY "Allow public read active clients" 
ON clients FOR SELECT 
USING (is_active = true);

-- Insert some sample data (optional)
INSERT INTO clients (serial_number, issuer_client_company_name, type_of_security, isin_of_the_company, is_active) VALUES
(1563, 'TIME TODAY MEDIA NETWORK PRIVATE LIMITED', 'EQUITY', 'INE263B04014', true),
(1562, 'SHRIJI POWER & AUTOMATION PRIVATE LIMITED', 'EQUITY', 'INE5ARVY01014', true),
(1561, 'TEEYRA EDUTECH PRIVATE LIMITED', 'EQUITY', 'INE5NKMJ012', true)
ON CONFLICT (serial_number) DO NOTHING;
