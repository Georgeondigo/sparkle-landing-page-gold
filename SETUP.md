
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

### 2. Supabase Account Setup

#### Create a New Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account or log in
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `tiffany-sparkles` (or your preferred name)
   - **Database Password**: Generate a strong password and save it securely
   - **Region**: Choose the region closest to your users
6. Click "Create new project"
7. Wait for the project to be created (this may take a few minutes)

#### Get Your Project Credentials
After your project is created:
1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Project ID** (the part before `.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...` - keep this secret!)

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Important**: Replace the placeholder values with your actual Supabase credentials.

### 4. Update Supabase Configuration
Update the `supabase/config.toml` file with your project ID:

```toml
project_id = "your-project-id-here"
```

Update `src/integrations/supabase/client.ts` with your credentials:

```typescript
const SUPABASE_URL = "https://your-project-id.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "your-anon-key-here";
```

### 5. Start Development Server
```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

## 🗄️ Database Setup

### Required Database Tables
Run these SQL commands in your Supabase SQL Editor (go to **SQL Editor** in your Supabase dashboard):

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

-- Create site_settings table for general settings
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### Storage Buckets
Create storage buckets for file uploads:

```sql
-- Create storage buckets for CMS images
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('cms-images', 'cms-images', true),
  ('site-assets', 'site-assets', true),
  ('product-images', 'product-images', true),
  ('section-images', 'section-images', true)
ON CONFLICT (id) DO NOTHING;
```

### Row Level Security (RLS)
Enable RLS and create policies:

```sql
-- Enable RLS on all tables
ALTER TABLE public.content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to content (since it's a public website)
CREATE POLICY "Allow public read access" ON public.content_sections FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public read access" ON public.store_locations FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public read access" ON public.contact_settings FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public read access" ON public.testimonials FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "Allow public read access" ON public.faqs FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "Allow public read access" ON public.site_settings FOR SELECT TO anon USING (true);

-- Storage policies for public access
CREATE POLICY "Allow public read access" ON storage.objects 
  FOR SELECT TO anon USING (bucket_id IN ('cms-images', 'site-assets', 'product-images', 'section-images'));

-- Admin policies (for authenticated admin users)
CREATE POLICY "Admin full access" ON public.content_sections FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admin full access" ON public.store_locations FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admin full access" ON public.contact_settings FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admin full access" ON public.testimonials FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admin full access" ON public.faqs FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admin full access" ON public.site_settings FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Allow users to read their own profile
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
```

### Database Functions
Create helpful database functions:

```sql
-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.profiles 
    WHERE id = user_id AND role = 'admin'
  );
$$;

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'user');
  RETURN NEW;
END;
$$;

-- Trigger to automatically create profile for new users
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Sample Data (Optional)
Insert sample data to get started:

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
  '+254712345678',
  'https://instagram.com/tiffanysparkles',
  'https://facebook.com/tiffanysparkles',
  'https://tiktok.com/@tiffanysparkles',
  'info@tiffanysparkles.com',
  '+254 712 345 678',
  'Nairobi, Kenya'
) ON CONFLICT DO NOTHING;

-- Sample store locations
INSERT INTO public.store_locations (name, address, phone, store_type, latitude, longitude) VALUES
('Tiffany Sparkles Nairobi', 'Westgate Mall, Nairobi', '+254 712 345 678', 'Flagship Store', -1.257, 36.8031),
('Tiffany Sparkles Nakuru', 'Nakuru Town, CBD', '+254 712 345 679', 'Retail Partner', -0.28907, 36.05177),
('Tiffany Sparkles Kisumu', 'Kisumu City Center', '+254 712 345 680', 'Authorized Dealer', 0.091702, 32.767956)
ON CONFLICT DO NOTHING;

-- Sample FAQs
INSERT INTO public.faqs (question, answer, order_index) VALUES
('What makes Tiffany Sparkles microfiber cloths special?', 'Our microfiber cloths are made with premium materials that provide superior cleaning power while being gentle on all surfaces. They are edgeless to prevent scratches and swirl marks.', 1),
('How do I care for my microfiber cloths?', 'Simply machine wash in warm water without fabric softener. Air dry or tumble dry on low heat. Avoid bleach and high temperatures.', 2),
('Do you offer bulk discounts?', 'Yes! Contact us for special pricing on bulk orders for businesses and institutions.', 3),
('Where can I buy Tiffany Sparkles products?', 'You can find our products at our retail locations across Kenya or contact us directly via WhatsApp for delivery.', 4)
ON CONFLICT DO NOTHING;

-- Sample testimonials
INSERT INTO public.testimonials (name, message, rating, location) VALUES
('John Kamau', 'These microfiber cloths are amazing! My car has never looked better and no more scratches.', 5, 'Nairobi'),
('Sarah Wanjiku', 'Perfect for cleaning my electronics. No streaks on my phone screen anymore!', 5, 'Nakuru'),
('David Ochieng', 'Great quality and they last forever. Highly recommend for anyone serious about cleaning.', 5, 'Kisumu')
ON CONFLICT DO NOTHING;
```

## 🔐 Authentication Setup

### Configure Authentication Settings
1. Go to **Authentication** → **Settings** in your Supabase dashboard
2. Under **Site URL**, add your development URL: `http://localhost:3000`
3. Under **Redirect URLs**, add: `http://localhost:3000/**`
4. For production, add your deployed URL as well

### Create Your First Admin User
1. Go to **Authentication** → **Users** in your Supabase dashboard
2. Click **Add user** → **Create new user**
3. Enter your email and password
4. After creating the user, run this SQL to make them an admin:

```sql
-- Replace 'your-email@example.com' with your actual email
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

## 🚀 Deployment Setup

### Authentication URL Configuration
When deploying to production:

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL** to your deployed domain (e.g., `https://yourdomain.com`)
3. Add **Redirect URLs**:
   - `https://yourdomain.com/**`
   - `http://localhost:3000/**` (for development)

### Google Maps API (Optional)
If you want to use Google Maps for store locations:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Maps JavaScript API
4. Create credentials (API Key)
5. Add the API key to your Supabase secrets:
   - Go to **Settings** → **Functions** → **Secrets**
   - Add `GOOGLE_MAPS_API_KEY` with your API key

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── admin/           # CMS admin components
│   ├── ui/              # Shadcn UI components
│   └── ...              # Main site components
├── integrations/
│   └── supabase/        # Supabase client & types
├── pages/               # Page components
└── lib/                 # Utility functions
```

## 🔑 Admin Access

1. Create an admin user through the Supabase dashboard
2. Update the user's role to 'admin' using the SQL command above
3. Access the CMS at `/admin/auth` to log in
4. Navigate to `/admin` for the dashboard

## 🚀 Deployment Options

The app can be deployed to:
- **Vercel** (recommended for React apps)
- **Netlify**
- **Any platform supporting React/Vite**

### Environment Variables for Deployment
Make sure to set these environment variables in your deployment platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 📞 Troubleshooting

### Common Issues:

1. **Authentication errors**: Check your Site URL and Redirect URLs in Supabase
2. **Database connection errors**: Verify your environment variables
3. **RLS policy errors**: Make sure you have admin role set correctly
4. **File upload errors**: Check storage bucket permissions

### Getting Help:
- Check the browser console for error messages
- Verify all environment variables are set correctly
- Ensure database tables and policies are created
- Check Supabase logs in the dashboard

## 🔄 Updating the Database Schema

If you need to update the database schema:
1. Make changes through the Supabase SQL Editor
2. Update the TypeScript types by running the Supabase CLI (if available)
3. Test your changes in development before deploying

Remember to always backup your database before making significant changes!
