
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  FileText, 
  MessageSquare, 
  MapPin, 
  Phone, 
  ShoppingBag,
  Star,
  HelpCircle,
  Map
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Import admin components
import HeroEditor from '@/components/admin/HeroEditor';
import ProductsEditor from '@/components/admin/ProductsEditor';
import TestimonialsEditor from '@/components/admin/TestimonialsEditor';
import FAQEditor from '@/components/admin/FAQEditor';
import LocationsEditor from '@/components/admin/LocationsEditor';
import ContactEditor from '@/components/admin/ContactEditor';
import MarketingEditor from '@/components/admin/MarketingEditor';
import MapSettingsEditor from '@/components/admin/MapSettingsEditor';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Error signing out');
    } else {
      toast.success('Signed out successfully');
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Tiffany Sparkles Admin</h1>
              <p className="text-muted-foreground">Content Management System</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate('/')}>
                View Site
              </Button>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="hero" className="flex items-center gap-2">
              <FileText size={16} />
              <span className="hidden sm:inline">Hero</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <ShoppingBag size={16} />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="marketing" className="flex items-center gap-2">
              <Settings size={16} />
              <span className="hidden sm:inline">Marketing</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <Star size={16} />
              <span className="hidden sm:inline">Reviews</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle size={16} />
              <span className="hidden sm:inline">FAQ</span>
            </TabsTrigger>
            <TabsTrigger value="locations" className="flex items-center gap-2">
              <MapPin size={16} />
              <span className="hidden sm:inline">Locations</span>
            </TabsTrigger>
            <TabsTrigger value="maps" className="flex items-center gap-2">
              <Map size={16} />
              <span className="hidden sm:inline">Maps</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Phone size={16} />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2" size={20} />
                  Hero Section Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <HeroEditor />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingBag className="mr-2" size={20} />
                  Product Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProductsEditor />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marketing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2" size={20} />
                  Marketing Slider Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MarketingEditor />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="mr-2" size={20} />
                  Customer Testimonials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TestimonialsEditor />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="mr-2" size={20} />
                  FAQ Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FAQEditor />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="locations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2" size={20} />
                  Store Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LocationsEditor />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maps" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Map className="mr-2" size={20} />
                  Google Maps Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MapSettingsEditor />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="mr-2" size={20} />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ContactEditor />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
