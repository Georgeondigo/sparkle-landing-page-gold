
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Home, Users, MapPin, MessageSquare, HelpCircle, Settings, Image } from 'lucide-react';
import HeroEditor from '@/components/admin/HeroEditor';
import ProductsEditor from '@/components/admin/ProductsEditor';
import TestimonialsEditor from '@/components/admin/TestimonialsEditor';
import FAQEditor from '@/components/admin/FAQEditor';
import LocationsEditor from '@/components/admin/LocationsEditor';
import ContactEditor from '@/components/admin/ContactEditor';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/admin/auth');
        return;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error || profile?.role !== 'admin') {
        navigate('/admin/auth');
        return;
      }

      setUser(session.user);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/admin/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/auth');
  };

  const goToSite = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-serif font-bold text-primary">
                Tiffany Sparkles CMS
              </h1>
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.email}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={goToSite}>
                <Home className="mr-2" size={16} />
                View Site
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2" size={16} />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="hero" className="flex items-center space-x-2">
              <Image size={16} />
              <span className="hidden sm:inline">Hero</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center space-x-2">
              <Users size={16} />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center space-x-2">
              <MessageSquare size={16} />
              <span className="hidden sm:inline">Reviews</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center space-x-2">
              <HelpCircle size={16} />
              <span className="hidden sm:inline">FAQ</span>
            </TabsTrigger>
            <TabsTrigger value="locations" className="flex items-center space-x-2">
              <MapPin size={16} />
              <span className="hidden sm:inline">Stores</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center space-x-2">
              <Settings size={16} />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
              </CardHeader>
              <CardContent>
                <HeroEditor />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Featured Products</CardTitle>
              </CardHeader>
              <CardContent>
                <ProductsEditor />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials">
            <Card>
              <CardHeader>
                <CardTitle>Customer Testimonials</CardTitle>
              </CardHeader>
              <CardContent>
                <TestimonialsEditor />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <FAQEditor />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="locations">
            <Card>
              <CardHeader>
                <CardTitle>Store Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <LocationsEditor />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactEditor />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
