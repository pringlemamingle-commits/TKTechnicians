-- Create storage bucket for service request attachments
INSERT INTO storage.buckets (id, name, public) VALUES ('service-attachments', 'service-attachments', false);

-- Create policies for service attachment uploads
CREATE POLICY "Anyone can upload service attachments" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'service-attachments');

CREATE POLICY "Service attachments are accessible to authenticated users" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'service-attachments');