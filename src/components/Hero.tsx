
import React, { useEffect, useState } from 'react';
import { ArrowDown, MapPin, Star, Sparkles, Shield, Award, ChevronRight } from 'lucide-react';
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
    subtitle: 'You\'ve already bought the shine. Maintain it, right?',
    description: 'You clean and polish your car regularly, yet it still shows up with swirls and light scratches. Why? Because of the cloth you\'re using. Our edgeless microfiber cloths eliminate swirls and scratches forever.',
    image_url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2000'
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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-secondary/5">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-secondary/20 to-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-secondary/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-secondary/20 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Image with Enhanced Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background/98 via-background/95 to-background/90"></div>
        <img 
          src={content.image_url} 
          alt="Car maintenance and cleaning"
          className="w-full h-full object-cover opacity-8"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/30"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className={`transition-all duration-1200 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          {/* Enhanced Brand Badge */}
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-secondary/15 to-primary/10 backdrop-blur-sm border border-secondary/30 rounded-full px-8 py-3 mb-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Sparkles className="text-secondary animate-pulse" size={20} />
            <span className="text-sm font-semibold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              Made in EU • Now in East Africa
            </span>
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
          </div>

          {/* Enhanced Problem Statement */}
          <div className="mb-12">
            <p className="text-xl md:text-3xl text-muted-foreground font-medium mb-8 italic leading-relaxed max-w-4xl mx-auto">
              {content.subtitle}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mb-8"></div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold mb-6 leading-tight">
              <span className="text-primary drop-shadow-sm">{content.title.split(' ')[0]}</span>
              <br />
              <span className="text-transparent bg-gradient-to-r from-secondary via-secondary/80 to-primary bg-clip-text animate-shimmer">
                {content.title.split(' ')[1]}
              </span>
            </h1>
            
            {/* Enhanced Subtitle with floating animation */}
            <div className="relative mb-8">
              <p className="text-2xl md:text-3xl text-secondary font-medium mb-3 animate-float">
                Edgeless Microfiber Excellence
              </p>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-60"></div>
            </div>
          </div>

          {/* Enhanced Description */}
          <div className="mb-8">
            <p className="text-lg md:text-2xl text-foreground/90 mb-6 max-w-5xl mx-auto leading-relaxed font-light">
              {content.description}
            </p>
            <p className="text-sm text-muted-foreground/80 font-medium tracking-wide">
              From Japan • Perfected in Korea & Germany • Now in East Africa
            </p>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <OrderNowButton 
              size="lg"
              className="group bg-gradient-to-r from-secondary via-secondary to-secondary/90 text-secondary-foreground hover:from-secondary/90 hover:to-secondary transform hover:scale-110 transition-all duration-500 shadow-2xl px-10 py-5 text-xl font-bold rounded-2xl border-2 border-secondary/20 hover:border-secondary/40"
            />
            
            <Button 
              onClick={scrollToProducts}
              variant="outline"
              size="lg"
              className="group border-3 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 px-10 py-5 text-xl font-semibold rounded-2xl hover:shadow-xl hover:scale-105"
            >
              <span className="flex items-center">
                See the Science
                <Sparkles className="ml-2 group-hover:rotate-12 transition-transform duration-300" size={20} />
              </span>
            </Button>
            
            <Button 
              onClick={scrollToLocations}
              variant="ghost"
              size="lg"
              className="group text-primary hover:bg-primary/15 transition-all duration-500 px-10 py-5 text-xl font-medium rounded-2xl hover:shadow-lg"
            >
              <MapPin className="mr-2 group-hover:bounce transition-all duration-300" size={22} />
              Find Stockist
            </Button>
          </div>

          {/* Enhanced Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              {
                icon: <Shield size={28} />,
                title: "Zero Swirls",
                description: "Ultrasonically cut edges eliminate scratches and swirl marks",
                gradient: "from-blue-500/20 to-blue-600/10"
              },
              {
                icon: <Sparkles size={28} />,
                title: "Lint-Free",
                description: "No fraying, no lint, pristine results every time",
                gradient: "from-secondary/20 to-secondary/10"
              },
              {
                icon: <Award size={28} />,
                title: "Multi-Use",
                description: "Perfect for cars, electronics, jewelry, and fine surfaces",
                gradient: "from-purple-500/20 to-purple-600/10"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`group text-center p-8 rounded-3xl bg-gradient-to-br ${feature.gradient} backdrop-blur-sm border border-white/20 hover:border-secondary/40 transition-all duration-500 hover:transform hover:scale-110 hover:shadow-2xl cursor-pointer`}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:from-secondary/40 group-hover:to-secondary/20 transition-all duration-500 group-hover:rotate-12">
                  <div className="text-secondary group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-3 group cursor-pointer" onClick={scrollToProducts}>
            <span className="text-sm text-muted-foreground font-medium group-hover:text-secondary transition-colors duration-300">
              Discover the technology
            </span>
            <div className="animate-bounce group-hover:animate-pulse">
              <ArrowDown className="text-secondary group-hover:scale-125 transition-transform duration-300" size={28} />
            </div>
            <div className="w-0.5 h-8 bg-gradient-to-b from-secondary to-transparent group-hover:h-12 transition-all duration-500"></div>
          </div>
        </div>
      </div>

      {/* Enhanced Decorative Elements */}
      <div className="absolute top-1/4 left-8 w-2 h-24 bg-gradient-to-b from-secondary via-secondary/60 to-transparent opacity-70 hidden lg:block animate-pulse"></div>
      <div className="absolute top-1/3 right-8 w-2 h-32 bg-gradient-to-b from-secondary via-secondary/60 to-transparent opacity-70 hidden lg:block animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 left-16 w-2 h-20 bg-gradient-to-t from-secondary via-secondary/60 to-transparent opacity-70 hidden lg:block animate-pulse" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default Hero;
