
# Tiffany Sparkles - Local Development Setup

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Supabase account

### 1. Clone and Install
```bash
git clone <repository-url>
cd tiffany-sparkles
pnpm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Start Development Server
```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

## 🗄️ Supabase Setup

### Database Tables
Run these SQL commands in your Supabase SQL Editor:

```sql
-- Create content_sections table
CREATE TABLE IF NOT EXISTS public.content_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_name TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create store_locations table
CREATE TABLE IF NOT EXISTS public.store_locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT,
  store_type TEXT DEFAULT 'Retail Partner',
  latitude NUMERIC,
  longitude NUMERIC,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create contact_settings table
CREATE TABLE IF NOT EXISTS public.contact_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  whatsapp_number TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  tiktok_url TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  location TEXT,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create FAQs table
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create profiles table for admin users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create site_settings table for logo and general site configuration
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### Storage Buckets
```sql
-- Create storage buckets for different types of media
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('cms-images', 'cms-images', true),
  ('site-assets', 'site-assets', true),
  ('product-images', 'product-images', true),
  ('section-images', 'section-images', true)
ON CONFLICT (id) DO NOTHING;
```

### Row Level Security (RLS)
```sql
-- Enable RLS on all tables
ALTER TABLE public.content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all content (since it's a public website)
CREATE POLICY "Allow public read access" ON public.content_sections FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public read access" ON public.store_locations FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public read access" ON public.contact_settings FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public read access" ON public.testimonials FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "Allow public read access" ON public.faqs FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "Allow public read access to site settings" ON public.site_settings FOR SELECT TO anon USING (true);

-- Allow authenticated admin users to modify all content
CREATE POLICY "Allow admin users to modify content sections" ON public.content_sections FOR ALL TO authenticated 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Allow admin users to modify site settings" ON public.site_settings FOR ALL TO authenticated 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Storage policies for public access to all buckets
CREATE POLICY "Allow public read access to cms images" ON storage.objects FOR SELECT TO anon USING (bucket_id = 'cms-images');
CREATE POLICY "Allow public read access to site assets" ON storage.objects FOR SELECT TO anon USING (bucket_id = 'site-assets');
CREATE POLICY "Allow public read access to product images" ON storage.objects FOR SELECT TO anon USING (bucket_id = 'product-images');
CREATE POLICY "Allow public read access to section images" ON storage.objects FOR SELECT TO anon USING (bucket_id = 'section-images');

-- Allow admin users to upload/manage files
CREATE POLICY "Allow admin users to manage cms images" ON storage.objects FOR ALL TO authenticated 
USING (bucket_id = 'cms-images' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Allow admin users to manage site assets" ON storage.objects FOR ALL TO authenticated 
USING (bucket_id = 'site-assets' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Allow admin users to manage product images" ON storage.objects FOR ALL TO authenticated 
USING (bucket_id = 'product-images' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Allow admin users to manage section images" ON storage.objects FOR ALL TO authenticated 
USING (bucket_id = 'section-images' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
```

### Sample Data
```sql
-- Sample contact settings
INSERT INTO public.contact_settings (
  whatsapp_number, 
  instagram_url, 
  facebook_url, 
  tiktok_url, 
  email, 
  phone, 
  address
) VALUES (
  '+919876543210',
  'https://instagram.com/tiffanysparkles',
  'https://facebook.com/tiffanysparkles',
  'https://tiktok.com/@tiffanysparkles',
  'info@tiffanysparkles.com',
  '+91 98765 43210',
  'Mumbai, India'
);

-- Sample store locations
INSERT INTO public.store_locations (name, address, phone, store_type, latitude, longitude) VALUES
('Premium Homeware Mumbai', '123 Shopping Mall, Bandra West, Mumbai 400050', '+91 98765 43210', 'Retail Partner', 19.0596, 72.8295),
('Quality Essentials Delhi', '456 Market Street, Connaught Place, New Delhi 110001', '+91 98765 43211', 'Authorized Dealer', 28.6139, 77.2090),
('Home Solutions Bangalore', '789 Commercial Complex, MG Road, Bangalore 560001', '+91 98765 43212', 'Retail Partner', 12.9716, 77.5946);

-- Sample FAQs
INSERT INTO public.faqs (question, answer, order_index) VALUES
('What makes Tiffany Sparkles microfiber cloths special?', 'Our microfiber cloths are made with premium materials that provide superior cleaning power while being gentle on all surfaces.', 1),
('How do I care for my microfiber cloths?', 'Simply machine wash in warm water without fabric softener. Air dry or tumble dry on low heat.', 2),
('Do you offer bulk discounts?', 'Yes! Contact us for special pricing on bulk orders for businesses and institutions.', 3);

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
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── admin/           # CMS admin components
│   │   ├── SiteSettingsEditor.tsx      # Logo and site settings
│   │   ├── EnhancedProductsEditor.tsx  # Products with multi-image support
│   │   ├── ProductHighlightsEditor.tsx # Why Choose section editor
│   │   ├── AboutSectionEditor.tsx      # About section editor
│   │   ├── MarketingEditor.tsx         # Marketing slider editor
│   │   ├── ContactEditor.tsx           # Contact settings editor
│   │   └── ...                         # Other admin components
│   ├── ui/              # Shadcn UI components
│   ├── DynamicHeader.tsx               # Header with dynamic logo
│   ├── EnhancedFeaturedProducts.tsx    # Products with image carousels
│   ├── EditableProductHighlights.tsx   # Auto-rotating image highlights
│   ├── EditableAbout.tsx               # Editable about section
│   └── ...              # Other main site components
├── integrations/
│   └── supabase/        # Supabase client & types
├── pages/               # Page components
└── lib/                 # Utility functions
```

## ✨ New Features

### 🎨 Dynamic Logo & Branding
- Upload and manage site logo through admin panel
- Logo automatically displays in header
- Fallback to text when no logo is set

### 🖼️ Multi-Image Products
- Each product supports multiple images
- Image carousel on product cards with navigation
- Horizontal scrolling grid for 3+ products
- Automatic cleanup of deleted images from storage

### 🔄 Auto-Rotating Highlights
- "Why Choose Tiffany Sparkles?" section with multiple images
- Images auto-rotate every 3 seconds
- Fully editable content through admin panel

### 📝 Editable About Section
- Dynamic content management for About section
- Upload and manage multiple images
- Editable statistics with custom icons
- Rich text content editing

### 🛡️ Enhanced Security
- Proper RLS policies for all new tables
- Admin-only access to content management
- Secure file upload and deletion
- Automatic cleanup of orphaned files

### 🗂️ Storage Organization
- Separate buckets for different content types:
  - `site-assets`: Logo and general site assets
  - `product-images`: Product photo galleries
  - `section-images`: About and highlights images
  - `cms-images`: General CMS uploads

### 🔧 Admin Panel Enhancements
- Site Settings Editor for logo management
- Enhanced Products Editor with multi-image support
- Product Highlights Editor with auto-rotation
- About Section Editor with rich content
- Automatic image cleanup on content updates

## 🔑 Admin Access

1. Create an admin user in Supabase Auth
2. Update the user's role in the profiles table:
```sql
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'your-admin-email@example.com';
```

3. Access the CMS at `/admin`

## 🚀 Deployment

The app can be deployed to:
- Vercel (recommended)
- Netlify
- Any platform supporting React/Vite

Make sure to set the environment variables in your deployment platform.

## 📞 Support

For questions or issues:
- Check the console for error messages
- Verify Supabase connection
- Ensure all environment variables are set correctly
- Check storage bucket permissions for file upload issues

## 🎯 Key Improvements

1. **Image Management**: Comprehensive multi-image support with automatic cleanup
2. **Admin Experience**: Enhanced editors with drag-and-drop, image previews, and rich content editing
3. **Performance**: Horizontal scrolling for products, optimized image loading
4. **User Experience**: Auto-rotating highlights, smooth carousels, responsive design
5. **Security**: Proper RLS policies and admin-only content management
6. **Storage Efficiency**: Automatic deletion of unused images to save space
