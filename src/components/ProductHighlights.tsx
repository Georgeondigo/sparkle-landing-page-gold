
import React, { useEffect, useState } from 'react';
import { Sparkles, Shield, Zap, Award, AlertTriangle, CheckCircle } from 'lucide-react';

const ProductHighlights = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('products');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const problemFeatures = [
    {
      icon: <AlertTriangle className="text-red-500" size={32} />,
      title: "The Problem with Regular Cloths",
      description: "Sewn edges and labels create microscopic roughness that causes swirl marks and light scratches over time."
    },
    {
      icon: <AlertTriangle className="text-red-500" size={32} />,
      title: "Why Your Shine Fades",
      description: "Traditional microfiber cloths have imperfections that gradually damage your car's paint and delicate surfaces."
    }
  ];

  const solutionFeatures = [
    {
      icon: <Sparkles className="text-secondary" size={32} />,
      title: "Ultrasonically Cut",
      description: "Advanced cutting technology creates perfectly smooth edges with zero roughness - the secret to swirl-free cleaning."
    },
    {
      icon: <Shield className="text-secondary" size={32} />,
      title: "No Fraying Ever",
      description: "Sealed edges ensure the cloth maintains its integrity through hundreds of washes without deterioration."
    },
    {
      icon: <Zap className="text-secondary" size={32} />,
      title: "High GSM Density",
      description: "Premium thickness for superior absorption while still folding compact for easy storage and access."
    },
    {
      icon: <Award className="text-secondary" size={32} />,
      title: "Multi-Surface Safe",
      description: "Perfect for paintwork, electronics, jewelry, mirrors, chrome, stainless steel, and all treasured items."
    }
  ];

  return (
    <section id="products" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            The Science Behind Swirl-Free Cleaning
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Developed in Japan, popularized in the USA among car enthusiasts, and perfected by Korean and German manufacturers.
          </p>
        </div>

        {/* Problem Section */}
        <div className={`mb-16 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="max-w-4xl mx-auto relative">
            <img 
              src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2000" 
              alt="Car with swirl marks showing the problem"
              className="w-full h-80 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 to-transparent rounded-2xl"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-2xl font-serif font-semibold text-white mb-2">
                Why Regular Cloths Create Swirls
              </h3>
              <p className="text-white/90">
                Any cloth that isn't flawless will eventually cause the swirls you love to hate
              </p>
            </div>
          </div>
        </div>

        {/* Problem Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {problemFeatures.map((feature, index) => (
            <div 
              key={index}
              className={`text-center p-6 bg-red-50 border border-red-200 rounded-xl shadow-lg transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-red-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-red-800 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Solution Header */}
        <div className={`text-center mb-12 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-secondary mb-4">
            The Tiffany Sparkles Solution
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Edgeless technology eliminates the root cause of swirl marks and scratches
          </p>
        </div>

        {/* Solution Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {solutionFeatures.map((feature, index) => (
            <div 
              key={index}
              className={`text-center p-6 bg-background rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 hover:transform hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 1) * 200 + 600}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Usage Applications */}
        <div className={`bg-gradient-to-br from-secondary/5 to-primary/5 rounded-2xl p-8 shadow-lg transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h3 className="text-2xl font-serif font-semibold text-primary mb-6 text-center">
            Perfect For All Your Treasured Items
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <CheckCircle className="text-secondary mx-auto mb-2" size={24} />
              <p className="text-sm font-medium">Car Paintwork & Detailing</p>
            </div>
            <div>
              <CheckCircle className="text-secondary mx-auto mb-2" size={24} />
              <p className="text-sm font-medium">Electronics & Screens</p>
            </div>
            <div>
              <CheckCircle className="text-secondary mx-auto mb-2" size={24} />
              <p className="text-sm font-medium">Jewelry & Fine China</p>
            </div>
            <div>
              <CheckCircle className="text-secondary mx-auto mb-2" size={24} />
              <p className="text-sm font-medium">Chrome & Steel Fittings</p>
            </div>
            <div>
              <CheckCircle className="text-secondary mx-auto mb-2" size={24} />
              <p className="text-sm font-medium">Mirrors & Glass</p>
            </div>
            <div>
              <CheckCircle className="text-secondary mx-auto mb-2" size={24} />
              <p className="text-sm font-medium">Golf Clubs</p>
            </div>
            <div>
              <CheckCircle className="text-secondary mx-auto mb-2" size={24} />
              <p className="text-sm font-medium">Premium Footwear</p>
            </div>
            <div>
              <CheckCircle className="text-secondary mx-auto mb-2" size={24} />
              <p className="text-sm font-medium">Spectacles & Sunglasses</p>
            </div>
          </div>
          <p className="text-center text-muted-foreground mt-6 italic">
            From your car into the house. Maintain that shine.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductHighlights;
