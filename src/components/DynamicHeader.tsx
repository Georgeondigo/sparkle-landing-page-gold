
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface LogoSetting {
  url: string;
  alt: string;
}

const DynamicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logo, setLogo] = useState<LogoSetting>({ url: '', alt: 'Tiffany Sparkles' });

  useEffect(() => {
    fetchLogo();
  }, []);

  const fetchLogo = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('setting_value')
        .eq('setting_key', 'logo')
        .maybeSingle();

      if (!error && data?.setting_value) {
        setLogo(data.setting_value as LogoSetting);
      }
    } catch (error) {
      console.error('Error fetching logo:', error);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Products', id: 'featured-products' },
    { label: 'About', id: 'about' },
    { label: 'Locations', id: 'locations' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            {logo.url ? (
              <img 
                src={logo.url} 
                alt={logo.alt}
                className="h-10 w-auto"
              />
            ) : (
              <div className="text-2xl font-serif font-bold text-primary">
                Tiffany Sparkles
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left py-2 text-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default DynamicHeader;
