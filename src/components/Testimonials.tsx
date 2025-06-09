
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "These microfiber cloths are amazing! They clean my glass surfaces without any streaks. Best purchase I've made for my home.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=100"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      text: "I use Tiffany Sparkles cloths for my car detailing business. Customers always ask what makes the finish so perfect!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100"
    },
    {
      id: 3,
      name: "Sneha Patel",
      location: "Bangalore",
      rating: 5,
      text: "Finally found cloths that don't leave lint on my electronics. The quality is outstanding and they last so long.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100"
    },
    {
      id: 4,
      name: "Modern Home Store",
      location: "Pune",
      rating: 5,
      text: "Our customers love these products. We've been stocking Tiffany Sparkles for 2 years now - excellent quality and reliability.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Tiffany Sparkles for their cleaning needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative overflow-hidden">
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
                
                <p className="text-foreground/90 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonial.avatar} 
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
      </div>
    </section>
  );
};

export default Testimonials;
