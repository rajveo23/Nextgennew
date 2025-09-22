-- Storage Policies for NextGen Registry
-- Run these in Supabase SQL Editor after creating buckets

-- Blog Images Bucket Policies
CREATE POLICY "Allow public read access on blog-images" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');
CREATE POLICY "Allow service role upload to blog-images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Allow service role delete from blog-images" ON storage.objects FOR DELETE USING (bucket_id = 'blog-images' AND auth.jwt() ->> 'role' = 'service_role');

-- Company Assets Bucket Policies  
CREATE POLICY "Allow public read access on company-assets" ON storage.objects FOR SELECT USING (bucket_id = 'company-assets');
CREATE POLICY "Allow service role upload to company-assets" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'company-assets' AND auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Allow service role delete from company-assets" ON storage.objects FOR DELETE USING (bucket_id = 'company-assets' AND auth.jwt() ->> 'role' = 'service_role');

-- Client Documents Bucket Policies (Private)
CREATE POLICY "Allow service role full access to client-documents" ON storage.objects FOR ALL USING (bucket_id = 'client-documents' AND auth.jwt() ->> 'role' = 'service_role');
