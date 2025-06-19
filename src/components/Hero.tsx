
import React, { useEffect, useState } from 'react';
import { ArrowDown, MapPin, Star, Sparkles, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OrderNowButton from './OrderNowButton';
import { supabase } from '@/integrations/supabase/client';

interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
}

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<HeroContent>({
    title: 'Tiffany Sparkles',
    subtitle: 'Premium Microfiber Excellence',
    description: 'Experience the ultimate in cleaning technology with our superior microfiber cloths. Designed for modern lifestyles, crafted with precision, and built to last.',
    image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000'
  });

  useEffect(() => {
    setIsVisible(true);
    fetchHeroContent();
  }, []);

  const fetchHeroContent = async () => {
    try {
      const { data, error } = await supabase
        .from('content_sections')
        .select('content')
        .eq('section_name', 'hero')
        .maybeSingle();

      if (!error && data?.content) {
        setContent(data.content as unknown as HeroContent);
      }
    } catch (error) {
      console.error('Error fetching hero content:', error);
      // Keep fallback content if fetch fails
    }
  };

  const scrollToProducts = () => {
    const element = document.getElementById('featured-products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToLocations = () => {
    const element = document.getElementById('locations');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-secondary/5 to-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/85"></div>
        <img 
          src={content.image_url} 
          alt="Premium microfiber cloth background"
          className="w-full h-full object-cover opacity-15"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Brand Badge */}
          <div className="inline-flex items-center space-x-2 bg-secondary/10 border border-secondary/20 rounded-full px-6 py-2 mb-8">
            <Sparkles className="text-secondary" size={16} />
            <span className="text-sm font-medium text-secondary">Premium Quality Since 2009</span>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-8 mb-8">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-secondary fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium text-muted-foreground">4.9/5 Rating</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-border"></div>
            <div className="flex items-center space-x-2">
              <Award className="text-secondary" size={18} />
              <span className="text-sm font-medium text-muted-foreground">10,000+ Happy Customers</span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-4 leading-tight">
              <span className="text-primary">{content.title.split(' ')[0]}</span>
              <br />
              <span className="text-transparent bg-gradient-to-r from-secondary via-secondary to-primary bg-clip-text">
                {content.title.split(' ')[1]}
              </span>
            </h1>
            
            {/* Subtitle with Animation */}
            <div className="relative">
              <p className="text-xl md:text-2xl text-secondary font-medium mb-2">
                {content.subtitle}
              </p>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-foreground/80 mb-4 max-w-4xl mx-auto leading-relaxed">
            {content.description}
          </p>

          {/* Brand Attribution */}
          <p className="text-sm text-muted-foreground mb-12">
            A Premium Brand by <span className="text-secondary font-semibold">Dinesh Gupta Limited</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <OrderNowButton 
              size="lg"
              className="bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground hover:from-secondary/90 hover:to-secondary/80 transform hover:scale-105 transition-all duration-300 shadow-xl px-8 py-4 text-lg font-semibold"
            />
            
            <Button 
              onClick={scrollToProducts}
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-8 py-4 text-lg font-medium"
            >
              View Products
            </Button>
            
            <Button 
              onClick={scrollToLocations}
              variant="ghost"
              size="lg"
              className="text-primary hover:bg-primary/10 transition-all duration-300 px-8 py-4 text-lg font-medium"
            >
              <MapPin className="mr-2" size={20} />
              Find a Store
            </Button>
          </div>

          {/* Enhanced Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-background to-muted/30 border border-muted hover:border-secondary/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-secondary/30 group-hover:to-secondary/20 transition-all duration-300">
                <Shield className="text-secondary" size={24} />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">Superior microfiber technology crafted for excellence</p>
            </div>
            
            <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-background to-muted/30 border border-muted hover:border-secondary/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-secondary/30 group-hover:to-secondary/20 transition-all duration-300">
                <Sparkles className="text-secondary" size={24} />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">Instant Support</h3>
              <p className="text-sm text-muted-foreground">24/7 WhatsApp customer service and assistance</p>
            </div>
            
            <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-background to-muted/30 border border-muted hover:border-secondary/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-secondary/30 group-hover:to-secondary/20 transition-all duration-300">
                <MapPin className="text-secondary" size={24} />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">Nationwide</h3>
              <p className="text-sm text-muted-foreground">Available across India with fast delivery</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs text-muted-foreground">Scroll to explore</span>
            <ArrowDown className="text-secondary" size={24} />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-1 h-20 bg-gradient-to-b from-secondary to-transparent opacity-60 hidden lg:block"></div>
      <div className="absolute top-1/3 right-10 w-1 h-28 bg-gradient-to-b from-secondary to-transparent opacity-60 hidden lg:block"></div>
      <div className="absolute bottom-1/4 left-20 w-1 h-16 bg-gradient-to-t from-secondary to-transparent opacity-60 hidden lg:block"></div>
    </section>
  );
};

export default Hero;
