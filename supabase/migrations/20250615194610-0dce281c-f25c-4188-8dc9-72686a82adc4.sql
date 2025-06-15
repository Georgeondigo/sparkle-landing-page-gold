
-- Create site_settings table for logo and general site configuration
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Update content_sections table to support multiple images and flexible content
-- (This table already exists, so we'll just add some sample data structure)

-- Create storage buckets for different types of media
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('site-assets', 'site-assets', true),
  ('product-images', 'product-images', true),
  ('section-images', 'section-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for site_settings (admin only for modifications)
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to site settings
CREATE POLICY "Allow public read access to site settings" 
ON public.site_settings FOR SELECT TO anon USING (true);

-- Allow authenticated admin users to modify site settings
CREATE POLICY "Allow admin users to modify site settings" 
ON public.site_settings FOR ALL TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Storage policies for public access to all buckets
CREATE POLICY "Allow public read access to site assets" 
ON storage.objects FOR SELECT TO anon USING (bucket_id = 'site-assets');

CREATE POLICY "Allow public read access to product images" 
ON storage.objects FOR SELECT TO anon USING (bucket_id = 'product-images');

CREATE POLICY "Allow public read access to section images" 
ON storage.objects FOR SELECT TO anon USING (bucket_id = 'section-images');

-- Allow admin users to upload/manage files
CREATE POLICY "Allow admin users to manage site assets" 
ON storage.objects FOR ALL TO authenticated 
USING (
  bucket_id = 'site-assets' AND 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Allow admin users to manage product images" 
ON storage.objects FOR ALL TO authenticated 
USING (
  bucket_id = 'product-images' AND 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Allow admin users to manage section images" 
ON storage.objects FOR ALL TO authenticated 
USING (
  bucket_id = 'section-images' AND 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Insert default logo setting
INSERT INTO public.site_settings (setting_key, setting_value) 
VALUES ('logo', '{"url": "", "alt": "Tiffany Sparkles Logo"}')
ON CONFLICT (setting_key) DO NOTHING;

-- Sample data for content sections with multiple images support
INSERT INTO public.content_sections (section_name, content) 
VALUES 
  ('product_highlights', '{
    "title": "Why Choose Tiffany Sparkles?",
    "description": "Discover the difference that premium microfiber technology makes in your daily cleaning routine.",
    "items": [
      {
        "title": "Superior Cleaning Power",
        "description": "Advanced microfiber technology that captures dirt and dust with unmatched efficiency, leaving surfaces spotless and streak-free.",
        "images": ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400"],
        "type": "feature"
      },
      {
        "title": "Durable & Long-lasting", 
        "description": "Premium quality construction ensures our cloths maintain their effectiveness through hundreds of washes, providing exceptional value.",
        "images": ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400"],
        "type": "feature"
      }
    ]
  }'),
  ('about_section', '{
    "title": "Our Story of Excellence",
    "description": "Tiffany Sparkles represents the pinnacle of microfiber innovation, brought to you by Dinesh Gupta Limited, a trusted name in quality manufacturing for over a decade.",
    "content": "Our journey began with a simple vision: to revolutionize the cleaning industry through superior microfiber technology. Today, we are proud to offer products that combine cutting-edge science with elegant design, making cleaning not just effective, but enjoyable.",
    "images": ["https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2000"],
    "stats": [
      {"number": "15+", "label": "Years in Business", "icon": "Building2"},
      {"number": "1M+", "label": "Happy Customers", "icon": "Users"},
      {"number": "50+", "label": "Industry Awards", "icon": "Award"},
      {"number": "50+", "label": "Countries Served", "icon": "Globe"}
    ]
  }')
ON CONFLICT (section_name) DO NOTHING;
