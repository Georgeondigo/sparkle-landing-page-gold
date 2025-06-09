import React, { useEffect, useState } from 'react';
import { ArrowDown, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OrderNowButton from './OrderNowButton';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Wave Background Decoration */}
      <div className="absolute top-0 left-0 right-0 h-32 wave-decoration"></div>
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000" 
          alt="Premium microfiber cloth background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-6 mb-8">
            <div className="flex items-center space-x-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-secondary fill-current" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground ml-2">4.9/5 Rating</span>
            </div>
            <div className="text-sm text-muted-foreground">
              10,000+ Happy Customers
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-primary mb-6 leading-tight">
            Tiffany
            <span className="block text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
              Sparkles
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            Premium Microfiber Excellence
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the ultimate in cleaning technology with our superior microfiber cloths. 
            Designed for modern lifestyles, crafted with precision, and built to last.
          </p>

          {/* Brand Attribution */}
          <p className="text-sm text-muted-foreground mb-12">
            A Premium Brand by <span className="text-secondary font-semibold">Dinesh Gupta Limited</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <OrderNowButton 
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 transform hover:scale-105 transition-all duration-300 shadow-lg"
            />
            
            <Button 
              onClick={scrollToProducts}
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              View Products
            </Button>
            
            <Button 
              onClick={scrollToLocations}
              variant="ghost"
              size="lg"
              className="text-primary hover:bg-primary/10 transition-all duration-300"
            >
              <MapPin className="mr-2" size={18} />
              Find a Store
            </Button>
          </div>

          {/* value propositions section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="text-secondary" size={20} />
              </div>
              <p className="text-sm font-medium text-primary">Premium Quality</p>
              <p className="text-xs text-muted-foreground">Superior microfiber technology</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <OrderNowButton className="text-secondary" size={20} />
              </div>
              <p className="text-sm font-medium text-primary">Instant Support</p>
              <p className="text-xs text-muted-foreground">WhatsApp customer service</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="text-secondary" size={20} />
              </div>
              <p className="text-sm font-medium text-primary">Nationwide</p>
              <p className="text-xs text-muted-foreground">Available across India</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="text-secondary" size={24} />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-2 h-16 bg-gradient-to-b from-secondary to-transparent opacity-60 hidden lg:block"></div>
      <div className="absolute top-1/3 right-10 w-2 h-24 bg-gradient-to-b from-secondary to-transparent opacity-60 hidden lg:block"></div>
    </section>
  );
};

export default Hero;
