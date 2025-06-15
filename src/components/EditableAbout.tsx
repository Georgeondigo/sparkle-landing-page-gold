
import React, { useEffect, useState } from 'react';
import { Building2, Users, Award, Globe } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Stat {
  number: string;
  label: string;
  icon: string;
}

interface AboutContent {
  title: string;
  description: string;
  content: string;
  images: string[];
  stats: Stat[];
}

const EditableAbout = () => {
  const [content, setContent] = useState<AboutContent>({
    title: 'Our Story of Excellence',
    description: 'Tiffany Sparkles represents the pinnacle of microfiber innovation, brought to you by Dinesh Gupta Limited, a trusted name in quality manufacturing for over a decade.',
    content: 'Our journey began with a simple vision: to revolutionize the cleaning industry through superior microfiber technology. Today, we are proud to offer products that combine cutting-edge science with elegant design, making cleaning not just effective, but enjoyable.',
    images: ['https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2000'],
    stats: [
      { number: "15+", label: "Years in Business", icon: "Building2" },
      { number: "1M+", label: "Happy Customers", icon: "Users" },
      { number: "50+", label: "Industry Awards", icon: "Award" },
      { number: "50+", label: "Countries Served", icon: "Globe" }
    ]
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchAboutContent();
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('about');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const fetchAboutContent = async () => {
    try {
      const { data, error } = await supabase
        .from('content_sections')
        .select('content')
        .eq('section_name', 'about_section')
        .maybeSingle();

      if (!error && data?.content) {
        setContent(data.content as unknown as AboutContent);
      }
    } catch (error) {
      console.error('Error fetching about content:', error);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="text-secondary" size={28} />;
      case 'Users': return <Users className="text-secondary" size={28} />;
      case 'Award': return <Award className="text-secondary" size={28} />;
      case 'Globe': return <Globe className="text-secondary" size={28} />;
      default: return <Building2 className="text-secondary" size={28} />;
    }
  };

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
              {content.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mb-6"></div>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {content.description}
            </p>
            
            <p className="text-base text-foreground/80 mb-6 leading-relaxed">
              {content.content}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {content.stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center p-4 bg-background rounded-lg shadow-md transition-all duration-500 hover:shadow-lg ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-full mb-2">
                    {getIcon(stat.icon)}
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <div className="relative">
              <img 
                src={content.images[0]} 
                alt={content.title}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-2xl"></div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-background p-6 rounded-xl shadow-xl border-l-4 border-secondary">
                <h4 className="text-lg font-semibold text-primary mb-2">Quality Certified</h4>
                <p className="text-sm text-muted-foreground">
                  ISO 9001:2015 Certified Manufacturing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditableAbout;
