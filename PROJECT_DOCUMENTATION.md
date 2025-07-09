
# Tiffany Sparkles - Project Documentation

## 🌟 Project Overview

Tiffany Sparkles is a modern, responsive business website for a premium microfiber cloth company based in Kenya. The website serves as both a marketing platform and a content management system, showcasing high-quality cleaning products while providing customers with easy ways to connect and purchase.

### 🎯 Business Purpose
- Showcase premium microfiber cleaning cloths
- Build brand trust through customer testimonials
- Provide multiple contact channels for orders
- Display retail partner locations across Kenya
- Enable easy content management for business owners

## 🚀 Key Features

### 🏠 Frontend Features
- **Responsive Hero Section**: Eye-catching banner with call-to-action
- **Product Showcase**: Interactive product highlights with detailed specifications
- **Customer Testimonials**: Social proof through customer reviews
- **Location Finder**: Interactive map showing retail partners across Kenya
- **Contact Integration**: WhatsApp, social media, and email contact options
- **FAQ Section**: Common questions and answers
- **Newsletter Signup**: Customer engagement and marketing
- **Marketing Slider**: Promotional content carousel
- **Privacy Policy**: GDPR-compliant privacy information

### 🔧 Admin Features (CMS)
- **Content Management**: Edit all website sections dynamically
- **Product Management**: Add, edit, and manage product information
- **Testimonials Management**: Moderate and manage customer reviews
- **Location Management**: Add and update retail partner locations
- **FAQ Management**: Maintain frequently asked questions
- **Contact Settings**: Update contact information and social media links
- **Map Settings**: Configure Google Maps integration
- **Marketing Content**: Manage promotional sliders and content

### 🔐 Authentication & Security
- **Supabase Authentication**: Secure login/logout system
- **Role-Based Access**: Admin-only access to CMS features
- **Row Level Security**: Database-level security policies
- **Session Management**: Persistent authentication sessions

## 📋 Technical Stack

### Frontend Technologies
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - High-quality React component library
- **React Router** - Client-side routing
- **React Query (@tanstack/react-query)** - Server state management
- **Lucide React** - Beautiful icon library

### Backend & Database
- **Supabase** - Backend-as-a-Service platform
  - PostgreSQL database
  - Real-time subscriptions
  - Authentication system
  - File storage
  - Row Level Security (RLS)

### Third-Party Integrations
- **Google Maps API** - Interactive location mapping
- **WhatsApp Business API** - Direct customer communication
- **Social Media Integration** - Instagram, Facebook, TikTok links

## 🗄️ Database Schema

### Core Tables

#### `content_sections`
Stores dynamic content for different website sections
```sql
- id: UUID (Primary Key)
- section_name: TEXT (Unique identifier)
- content: JSONB (Flexible content structure)
- created_at, updated_at: TIMESTAMP
```

#### `store_locations`
Retail partner and store location data
```sql
- id: UUID (Primary Key)
- name: TEXT (Store name)
- address: TEXT (Physical address)
- phone: TEXT (Contact number)
- store_type: TEXT (e.g., 'Retail Partner', 'Flagship Store')
- latitude, longitude: NUMERIC (GPS coordinates)
- is_active: BOOLEAN (Visibility control)
- created_at, updated_at: TIMESTAMP
```

#### `testimonials`
Customer reviews and testimonials
```sql
- id: UUID (Primary Key)
- name: TEXT (Customer name)
- message: TEXT (Review content)
- rating: INTEGER (1-5 star rating)
- location: TEXT (Customer location)
- avatar_url: TEXT (Profile image)
- is_active: BOOLEAN (Moderation control)
- created_at, updated_at: TIMESTAMP
```

#### `faqs`
Frequently Asked Questions
```sql
- id: UUID (Primary Key)
- question: TEXT (Question content)
- answer: TEXT (Answer content)
- order_index: INTEGER (Display order)
- is_active: BOOLEAN (Visibility control)
- created_at, updated_at: TIMESTAMP
```

#### `contact_settings`
Business contact information
```sql
- id: UUID (Primary Key)
- whatsapp_number: TEXT
- instagram_url: TEXT
- facebook_url: TEXT
- tiktok_url: TEXT
- email: TEXT
- phone: TEXT
- address: TEXT
- updated_at: TIMESTAMP
```

#### `profiles`
User management and admin roles
```sql
- id: UUID (References auth.users)
- email: TEXT
- role: ENUM ('admin', 'user')
- created_at, updated_at: TIMESTAMP
```

### Storage Buckets
- `cms-images` - CMS uploaded images
- `site-assets` - General website assets
- `product-images` - Product photography
- `section-images` - Section-specific images

## 🏗️ Project Structure

```
src/
├── components/              # React components
│   ├── admin/              # CMS admin components
│   │   ├── ContactEditor.tsx
│   │   ├── FAQEditor.tsx
│   │   ├── HeroEditor.tsx
│   │   ├── LocationsEditor.tsx
│   │   ├── ProductsEditor.tsx
│   │   └── TestimonialsEditor.tsx
│   ├── ui/                 # Shadcn UI components
│   └── [main-components]   # Website components
│       ├── Header.tsx
│       ├── Hero.tsx
│       ├── FeaturedProducts.tsx
│       ├── Testimonials.tsx
│       ├── ContactSection.tsx
│       ├── InteractiveMap.tsx
│       └── Footer.tsx
├── pages/                  # Page components
│   ├── Index.tsx          # Homepage
│   ├── AdminAuth.tsx      # Login page
│   ├── AdminDashboard.tsx # CMS dashboard
│   ├── PrivacyPolicy.tsx  # Privacy policy
│   └── NotFound.tsx       # 404 page
├── integrations/
│   └── supabase/          # Supabase configuration
│       ├── client.ts      # Supabase client
│       └── types.ts       # Database types
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── main.tsx              # Application entry point
```

## 🎨 Design System

### Color Palette
- **Primary**: Pink/Rose theme (`hsl(var(--primary))`)
- **Secondary**: Complementary accents (`hsl(var(--secondary))`)
- **Neutral**: Grays for text and backgrounds
- **Accent**: Call-to-action elements

### Typography
- **Headings**: Bold, attention-grabbing fonts
- **Body**: Clean, readable sans-serif
- **Responsive**: Scales appropriately across devices

### Components
- **Consistent spacing**: Using Tailwind's spacing scale
- **Interactive elements**: Hover states and animations
- **Mobile-first**: Responsive design principles
- **Accessibility**: WCAG-compliant color contrasts

## 🔌 API Integration

### Supabase Client Configuration
```typescript
// Pre-configured client with authentication
const SUPABASE_URL = "https://rbvexnlawjzgjjazgmgl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJ..."; // Anon key
```

### Data Fetching Patterns
- **React Query**: Cached API calls with automatic refetching
- **Real-time**: Supabase subscriptions for live updates
- **Error Handling**: Consistent error states across components
- **Loading States**: User-friendly loading indicators

## 🛡️ Security Implementation

### Row Level Security (RLS)
- **Public Read Access**: Anonymous users can view content
- **Admin Write Access**: Only authenticated admins can modify data
- **User Isolation**: Users can only access their own data

### Authentication Flow
- **Email/Password**: Standard authentication method
- **Session Persistence**: Automatic login state management
- **Protected Routes**: Admin-only access to CMS features
- **Logout Handling**: Secure session termination

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations
- **Touch-friendly**: Large tap targets
- **Readable text**: Appropriate font sizes
- **Fast loading**: Optimized images and assets
- **WhatsApp integration**: Native mobile communication

## 🚀 Deployment & Hosting

### Recommended Platforms
- **Vercel** - Optimal for React applications
- **Netlify** - Alternative hosting option
- **Custom hosting** - Any platform supporting static sites

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Build Process
```bash
npm install          # Install dependencies
npm run build        # Build for production
npm run preview      # Preview production build
```

## 📊 Performance Considerations

### Optimization Strategies
- **Code Splitting**: Lazy-loaded routes and components
- **Image Optimization**: Responsive images with proper formats
- **Bundle Size**: Tree-shaking and minimal dependencies
- **Caching**: Efficient API caching with React Query

### Monitoring
- **Core Web Vitals**: Performance metrics tracking
- **Error Tracking**: Runtime error monitoring
- **Analytics**: User behavior insights

## 🔧 Development Workflow

### Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Supabase (see SETUP.md)
4. Configure environment variables
5. Run development server: `npm run dev`

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and formatting
- **Component Structure**: Functional components with hooks
- **File Naming**: PascalCase for components, camelCase for utilities

### Testing Strategy
- **Manual Testing**: Cross-browser compatibility
- **Responsive Testing**: Multiple device sizes
- **User Acceptance**: Business owner validation
- **Security Testing**: Authentication and authorization

## 📞 Support & Maintenance

### Content Updates
- **Admin Dashboard**: Self-service content management
- **Regular Backups**: Database backup strategies
- **Version Control**: Git-based change tracking

### Monitoring & Alerts
- **Uptime Monitoring**: Website availability tracking
- **Error Reporting**: Automatic error notifications
- **Performance Monitoring**: Speed and optimization tracking

### Future Enhancements
- **E-commerce Integration**: Online ordering system
- **Advanced Analytics**: Customer behavior tracking
- **Multi-language Support**: Localization for different regions
- **Mobile App**: Native mobile application development

## 🤝 Contributing

### Development Guidelines
1. Follow existing code patterns
2. Write descriptive commit messages
3. Test changes thoroughly
4. Update documentation as needed
5. Maintain responsive design principles

### Issue Reporting
- **Bug Reports**: Include steps to reproduce
- **Feature Requests**: Provide detailed requirements
- **Security Issues**: Report privately to administrators

---

## 📋 Quick Reference

### Important URLs
- **Production Site**: [Your deployed URL]
- **Admin Login**: `/admin/auth`
- **Admin Dashboard**: `/admin`
- **Privacy Policy**: `/privacy-policy`

### Key Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run code linting
```

### Environment Setup
Refer to `SETUP.md` for detailed setup instructions including:
- Supabase account creation
- Database schema setup
- Authentication configuration
- Google Maps API setup
- Deployment configuration

---

*This documentation is maintained alongside the codebase and should be updated when significant changes are made to the project.*
