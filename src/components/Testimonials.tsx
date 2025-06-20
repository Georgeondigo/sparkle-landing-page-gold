
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  message: string;
  avatar_url?: string;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(4);

      if (!error && data) {
        setTestimonials(data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  // Updated testimonials based on provided content
  const fallbackTestimonials: Testimonial[] = [
    {
      id: '1',
      name: "Kimani",
      location: "Car Wash Owner, South-B Nairobi",
      rating: 5,
      message: "Due to its many obvious benefits, our car wash attendants only use the Tiffany Sparkles edgeless cloths on our customer cars now, and we tell them why.",
      avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100"
    },
    {
      id: '2',
      name: "Lucy",
      location: "Lecturer, Kampala",
      rating: 5,
      message: "It's been easy to see that the stainless steel stair banisters, windows and mirror, and my water taps no longer have those water marks after cleaning them.",
      avatar_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=100"
    },
    {
      id: '3',
      name: "Denis",
      location: "Kijabe, Nairobi",
      rating: 5,
      message: "I kept changing car polishes while chasing that lasting shine, but kumbe it was just the improper cloths I was using all along!",
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100"
    },
    {
      id: '4',
      name: "Sarah M.",
      location: "Detailing Enthusiast, Mombasa",
      rating: 5,
      message: "Finally found cloths that work on my expensive jewelry and electronics. The edgeless design really makes all the difference - no more micro-scratches!",
      avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100"
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            Real Results from Real Customers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See why professionals and enthusiasts across East Africa choose Tiffany Sparkles
          </p>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground italic">
              <strong>Warning:</strong> Following our socials may cause new and excessive admiration of shiny surfaces! 😊
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {displayTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="absolute top-4 right-4 text-secondary/20">
                  <Quote size={40} />
                </div>
                
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className="text-secondary fill-current" 
                    />
                  ))}
                </div>
                
                <p className="text-foreground/90 mb-6 leading-relaxed italic text-lg">
                  "{testimonial.message}"
                </p>
                
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonial.avatar_url || `https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=100`} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Media Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-primary mb-4">
            Join Our Clean Club
          </h3>
          <p className="text-muted-foreground mb-6">
            Follow us on social media for more tips, tricks, and that satisfying shine content!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
